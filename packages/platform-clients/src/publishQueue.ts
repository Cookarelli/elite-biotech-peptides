import { getPrisma } from '@elite-biotech/db';
import type { PublishJob, PlatformAdapter } from './adapters';
import type { PlatformName } from './config';

export interface SchedulePublishJobOptions {
  platform: PlatformName;
  contentAssetId: string;
  scheduledAt: Date;
  approvalRequired?: boolean;
  approvedBy?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface ProcessPublishQueueOptions {
  adapters: Partial<Record<PlatformName, PlatformAdapter>>;
  limit?: number;
  maxRetries?: number;
  defaultDryRun?: boolean;
  onEvent?: (event: PublishQueueEvent) => void | Promise<void>;
}

export interface PublishQueueEvent {
  type:
    | 'queue.scan.started'
    | 'queue.scan.completed'
    | 'queue.job.blocked'
    | 'queue.job.dispatching'
    | 'queue.job.succeeded'
    | 'queue.job.failed';
  queueId?: string;
  platform?: PlatformName;
  status?: string;
  message: string;
  details?: Record<string, unknown>;
}

interface AttemptRecord {
  attemptNumber: number;
  attemptedAt: string;
  message: string;
  status: 'blocked' | 'succeeded' | 'failed';
}

type PublishQueueJobRecord = {
  id: string;
  platform: PlatformName;
  scheduledAt: Date;
  status: string;
  approvalRequired: boolean;
  approvalDecision: string;
  complianceCheckPassed: boolean;
  retryCount: number | null;
  attemptDetails: unknown;
  contentAssetId: string;
  contentAsset: {
    canonicalUrl?: string | null;
    copy: string;
    mediaType: string;
    product?: {
      canonicalUrl?: string | null;
    } | null;
    contentIdea: {
      title: string;
      productCanonicalUrl?: string | null;
    };
  };
};

type PublishQueuePrisma = {
  publishQueue: {
    create(args: unknown): Promise<unknown>;
    findFirst(args: unknown): Promise<unknown>;
    findMany(args: unknown): Promise<PublishQueueJobRecord[]>;
    update(args: unknown): Promise<unknown>;
  };
};

export interface ProcessPublishQueueReport {
  scanned: number;
  attempted: number;
  sent: number;
  blocked: number;
  failed: number;
  jobs: Array<{
    queueId: string;
    platform: PlatformName;
    outcome: 'sent' | 'blocked' | 'failed';
    message: string;
  }>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function normalizeMetadata(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

function buildPublishJob(job: PublishQueueJobRecord, defaultDryRun = false): PublishJob {
  const metadata = normalizeMetadata(job.attemptDetails);
  const mediaUrl =
    typeof metadata.mediaUrl === 'string'
      ? metadata.mediaUrl
      : typeof job.contentAsset.canonicalUrl === 'string'
        ? job.contentAsset.canonicalUrl
        : undefined;
  const sourceFilePath =
    typeof metadata.sourceFilePath === 'string' ? metadata.sourceFilePath : undefined;
  const title =
    typeof metadata.title === 'string' ? metadata.title : job.contentAsset.contentIdea.title;
  const description =
    typeof metadata.description === 'string' ? metadata.description : job.contentAsset.copy;

  return {
    id: job.id,
    platform: job.platform as PlatformName,
    scheduledAt: job.scheduledAt.toISOString(),
    contentId: job.contentAssetId,
    dryRun: defaultDryRun || metadata.dryRun === true,
    title,
    description,
    caption: typeof metadata.caption === 'string' ? metadata.caption : job.contentAsset.copy,
    mediaType: job.contentAsset.mediaType,
    mediaUrl,
    sourceFilePath,
    externalReferenceUrl:
      job.contentAsset.contentIdea.productCanonicalUrl ??
      job.contentAsset.product?.canonicalUrl ??
      undefined,
    metadata
  };
}

async function emitEvent(
  callback: ProcessPublishQueueOptions['onEvent'],
  event: PublishQueueEvent
) {
  if (!callback) return;
  await callback(event);
}

async function markBlocked(
  prisma: PublishQueuePrisma,
  job: PublishQueueJobRecord,
  message: string,
  onEvent?: ProcessPublishQueueOptions['onEvent']
) {
  const previousAttempts = Array.isArray(job.attemptDetails) ? job.attemptDetails : [];
  const attemptLog: AttemptRecord = {
    attemptNumber: job.retryCount ?? 0,
    attemptedAt: new Date().toISOString(),
    message,
    status: 'blocked'
  };

  await prisma.publishQueue.update({
    where: { id: job.id },
    data: {
      status: 'pending',
      failureReason: message,
      attemptDetails: [...previousAttempts, attemptLog]
    }
  });

  await emitEvent(onEvent, {
    type: 'queue.job.blocked',
    queueId: job.id,
    platform: job.platform as PlatformName,
    status: 'pending',
    message
  });
}

export async function schedulePublishJob(options: SchedulePublishJobOptions) {
  const prisma = (await getPrisma()) as unknown as PublishQueuePrisma;
  return prisma.publishQueue.create({
    data: {
      platform: options.platform,
      scheduledAt: options.scheduledAt,
      status: 'pending',
      approvalRequired: options.approvalRequired ?? true,
      approvedBy: options.approvedBy,
      failureReason: options.notes,
      attemptDetails: options.metadata,
      contentAssetId: options.contentAssetId
    }
  });
}

export async function processPublishQueue(
  options: ProcessPublishQueueOptions
): Promise<ProcessPublishQueueReport> {
  const prisma = (await getPrisma()) as unknown as PublishQueuePrisma;
  const limit = options.limit ?? 5;
  const maxRetries = options.maxRetries ?? 3;
  const now = new Date();

  await emitEvent(options.onEvent, {
    type: 'queue.scan.started',
    message: 'Scanning publish queue for ready jobs.',
    details: {
      limit,
      maxRetries,
      scanTime: now.toISOString()
    }
  });

  const jobs = await prisma.publishQueue.findMany({
    where: {
      scheduledAt: { lte: now },
      status: { in: ['pending', 'scheduled'] }
    },
    orderBy: { scheduledAt: 'asc' },
    take: limit,
    include: {
      contentAsset: {
        include: {
          product: true,
          contentIdea: true
        }
      }
    }
  });

  const report: ProcessPublishQueueReport = {
    scanned: jobs.length,
    attempted: 0,
    sent: 0,
    blocked: 0,
    failed: 0,
    jobs: []
  };

  for (const job of jobs) {
    const adapter = options.adapters[job.platform as PlatformName];
    const publishJob = buildPublishJob(job, options.defaultDryRun);

    if (!adapter) {
      report.blocked += 1;
      report.jobs.push({
        queueId: job.id,
        platform: job.platform as PlatformName,
        outcome: 'blocked',
        message: 'No platform adapter registered.'
      });
      await markBlocked(prisma, job, 'No platform adapter registered.', options.onEvent);
      continue;
    }

    if (job.approvalRequired && job.approvalDecision !== 'approved') {
      report.blocked += 1;
      report.jobs.push({
        queueId: job.id,
        platform: job.platform as PlatformName,
        outcome: 'blocked',
        message: 'Awaiting human approval.'
      });
      await markBlocked(prisma, job, 'Awaiting human approval.', options.onEvent);
      continue;
    }

    if (!job.complianceCheckPassed) {
      report.blocked += 1;
      report.jobs.push({
        queueId: job.id,
        platform: job.platform as PlatformName,
        outcome: 'blocked',
        message: 'Compliance review has not passed.'
      });
      await markBlocked(prisma, job, 'Compliance review has not passed.', options.onEvent);
      continue;
    }

    const health = adapter.getHealth();
    if (!health.configured) {
      const message = `Adapter not configured: ${health.issues.join(' ')}`;
      report.blocked += 1;
      report.jobs.push({
        queueId: job.id,
        platform: job.platform as PlatformName,
        outcome: 'blocked',
        message
      });
      await markBlocked(prisma, job, message, options.onEvent);
      continue;
    }

    report.attempted += 1;
    const attemptNumber = (job.retryCount ?? 0) + 1;
    await prisma.publishQueue.update({
      where: { id: job.id },
      data: {
        status: 'scheduled',
        attemptDetails: {
          ...normalizeMetadata(job.attemptDetails),
          lastDispatchedAt: now.toISOString()
        }
      }
    });

    await emitEvent(options.onEvent, {
      type: 'queue.job.dispatching',
      queueId: job.id,
      platform: job.platform as PlatformName,
      status: 'scheduled',
      message: 'Dispatching approved queue item.',
      details: {
        attemptNumber,
        dryRun: publishJob.dryRun,
        mediaUrl: publishJob.mediaUrl,
        sourceFilePath: publishJob.sourceFilePath
      }
    });

    try {
      const result = await adapter.publish(publishJob);
      const previousAttempts = Array.isArray(job.attemptDetails) ? job.attemptDetails : [];

      await prisma.publishQueue.update({
        where: { id: job.id },
        data: {
          status: 'sent',
          externalId: result.externalId,
          externalUrl: result.externalUrl,
          attemptDetails: [
            ...previousAttempts,
            {
              attemptNumber,
              attemptedAt: now.toISOString(),
              message: 'Dispatch succeeded',
              status: 'succeeded',
              adapterMetadata: result.metadata ?? null
            }
          ],
          failureReason: null,
          failurePayload: null,
          lastFailureAt: null,
          retryCount: attemptNumber
        }
      });

      report.sent += 1;
      report.jobs.push({
        queueId: job.id,
        platform: job.platform as PlatformName,
        outcome: 'sent',
        message: 'Dispatch succeeded.'
      });

      await emitEvent(options.onEvent, {
        type: 'queue.job.succeeded',
        queueId: job.id,
        platform: job.platform as PlatformName,
        status: 'sent',
        message: 'Queue item dispatched successfully.',
        details: {
          attemptNumber,
          externalId: result.externalId,
          externalUrl: result.externalUrl
        }
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      const previousAttempts = Array.isArray(job.attemptDetails) ? job.attemptDetails : [];
      const shouldFail = attemptNumber >= maxRetries;
      const nextStatus = shouldFail ? 'failed' : 'pending';

      await prisma.publishQueue.update({
        where: { id: job.id },
        data: {
          status: nextStatus,
          retryCount: attemptNumber,
          failureReason: message,
          failurePayload: {
            error: message
          },
          lastFailureAt: new Date(),
          attemptDetails: [
            ...previousAttempts,
            {
              attemptNumber,
              attemptedAt: new Date().toISOString(),
              message,
              status: 'failed'
            }
          ]
        }
      });

      report.failed += 1;
      report.jobs.push({
        queueId: job.id,
        platform: job.platform as PlatformName,
        outcome: 'failed',
        message
      });

      await emitEvent(options.onEvent, {
        type: 'queue.job.failed',
        queueId: job.id,
        platform: job.platform as PlatformName,
        status: nextStatus,
        message,
        details: {
          attemptNumber,
          maxRetries,
          willRetry: !shouldFail
        }
      });
    }
  }

  await emitEvent(options.onEvent, {
    type: 'queue.scan.completed',
    message: 'Publish queue scan completed.',
    details: report as unknown as Record<string, unknown>
  });

  return report;
}
