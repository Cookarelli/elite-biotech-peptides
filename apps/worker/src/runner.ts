import dotenv from 'dotenv';
import pino from 'pino';
import {
  createPlatformAdapters,
  processPublishQueue,
  readPlatformEnvironment,
  syncPlatformAnalytics,
  type PublishQueueEvent
} from '@elite-biotech/platform-clients';

dotenv.config({ path: '../../.env.local' });
dotenv.config({ path: '../../.env' });

const logger = pino({ level: process.env.WORKER_LOG_LEVEL ?? 'info' });
const platformEnvironment = readPlatformEnvironment(process.env);
const adapters = createPlatformAdapters(platformEnvironment);

function logQueueEvent(event: PublishQueueEvent) {
  const payload = {
    queueId: event.queueId,
    platform: event.platform,
    status: event.status,
    ...event.details
  };

  switch (event.type) {
    case 'queue.job.failed':
      logger.error(payload, event.message);
      return;
    case 'queue.job.blocked':
      logger.warn(payload, event.message);
      return;
    default:
      logger.info(payload, event.message);
  }
}

async function executeTick() {
  const startedAt = new Date().toISOString();
  logger.info(
    {
      startedAt,
      intervalMs: Number(process.env.WORKER_INTERVAL_MS ?? 60000),
      adapterHealth: Object.fromEntries(
        Object.entries(adapters).map(([platform, adapter]) => [platform, adapter.getHealth()])
      )
    },
    'Worker tick started'
  );

  try {
    const queueReport = await processPublishQueue({
      adapters,
      limit: Number(process.env.WORKER_PUBLISH_LIMIT ?? 5),
      maxRetries: Number(process.env.WORKER_MAX_RETRIES ?? 3),
      defaultDryRun: process.env.WORKER_DEFAULT_DRY_RUN === 'true',
      onEvent: logQueueEvent
    });

    logger.info(
      {
        scanned: queueReport.scanned,
        attempted: queueReport.attempted,
        sent: queueReport.sent,
        blocked: queueReport.blocked,
        failed: queueReport.failed
      },
      'Publish queue tick completed'
    );

    const analyticsReport = await syncPlatformAnalytics({
      adapters,
      lookbackDays: Number(process.env.WORKER_ANALYTICS_LOOKBACK_DAYS ?? 7),
      limit: Number(process.env.WORKER_ANALYTICS_LIMIT ?? 10)
    });

    logger.info(
      {
        scanned: analyticsReport.scanned,
        synced: analyticsReport.synced,
        skipped: analyticsReport.skipped,
        refreshedDates: analyticsReport.refreshedDates
      },
      'Platform analytics sync completed'
    );
  } catch (error) {
    logger.error({ error }, 'Worker tick failed');
  }
}

const intervalMs = Number(process.env.WORKER_INTERVAL_MS ?? 60000);

void executeTick();
setInterval(() => {
  void executeTick();
}, intervalMs);

logger.info('Elite Growth worker started');
