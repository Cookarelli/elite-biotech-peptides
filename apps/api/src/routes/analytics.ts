import { Router } from 'express';
import { getPrisma } from '@elite-biotech/db';
import { requireGrowthApiKey } from '../middleware/auth';

const router = Router();

type TopHookReportRow = {
  hook: string;
  platform: string;
  metricValue: number;
  generatedAt: Date;
};

type TopProductReportWithProduct = {
  productId: string | null;
  metricName: string;
  metricValue: number;
  generatedAt: Date;
  product: {
    name: string;
    slug: string;
  } | null;
};

type TopPlatformReportRow = {
  platform: string;
  metricName: string;
  metricValue: number;
  generatedAt: Date;
};

type UnderperformingContentRow = {
  metricName: string;
  threshold: number;
  contentIdea: {
    title: string;
  } | null;
};

type DashboardIdeaRow = {
  id: string;
  title: string;
  angle: string;
  platform: string;
  status: string;
  riskScore: number;
  approvalDecision: string;
  productName: string | null;
  productSlug: string | null;
  productCanonicalUrl: string | null;
  contentCategory: string | null;
  humanNotes: string | null;
  product: {
    name: string;
    canonicalUrl: string | null;
  } | null;
};

type DashboardAssetRow = {
  id: string;
  mediaType: string;
  platform: string;
  copy: string | null;
  confidenceScore: number | null;
  assetVersion: string | null;
  product: {
    name: string;
  } | null;
  contentIdea: {
    title: string;
  };
  publishQueue: Array<{
    status: string;
  }>;
};

type DashboardPublishQueueRow = {
  id: string;
  platform: string;
  scheduledAt: Date | null;
  status: string;
  retryCount: number;
  approvalDecision: string;
  failureReason: string | null;
  externalUrl: string | null;
  contentAsset: {
    contentIdea: {
      title: string;
    };
    product: {
      name: string;
    } | null;
  };
};

type DashboardEngagementRow = {
  id: string;
  inboundThreadId: string;
  type: string;
  status: string;
  riskScore: number;
  approvalDecision: string;
  responseChannel: string | null;
  draftCopy: string | null;
};

type DashboardPromptRow = {
  id: string;
  agentName: string;
  versionLabel: string;
  active: boolean;
  createdAt: Date;
};

type DashboardRunRow = {
  id: string;
  agentName: string;
  summary: string | null;
  dryRun: boolean;
  status: string | null;
  createdAt: Date;
  promptVersion: {
    versionLabel: string;
  } | null;
};

router.use(requireGrowthApiKey);

function mapHook(row: TopHookReportRow | null) {
  if (!row) return null;
  return {
    hook: row.hook,
    platform: row.platform,
    views: row.metricValue,
    generatedAt: row.generatedAt
  };
}

function mapProduct(row: TopProductReportWithProduct | null) {
  if (!row) return null;
  return {
    productId: row.productId,
    productName: row.product?.name ?? 'Unknown',
    productSlug: row.product?.slug ?? null,
    metricName: row.metricName,
    metricValue: row.metricValue,
    generatedAt: row.generatedAt
  };
}

function mapPlatform(row: TopPlatformReportRow | null) {
  if (!row) return null;
  return {
    platform: row.platform,
    metricName: row.metricName,
    metricValue: row.metricValue,
    generatedAt: row.generatedAt
  };
}

async function buildAnalyticsOverview() {
  const prisma = await getPrisma();
  const last = await prisma.analyticsDaily.findMany({ orderBy: { date: 'desc' }, take: 1 });
  const date = last[0]?.date;

  if (!date) {
    return {
      date: null,
      topHook: null,
      topProduct: null,
      topPlatform: null,
      underperforming: [],
      totals: []
    };
  }

  const [topHook, topProduct, topPlatform, underperforming, dailyTotals] = await Promise.all([
    prisma.topHookReport.findFirst({
      where: { date },
      orderBy: { generatedAt: 'desc' }
    }),
    prisma.topProductReport.findFirst({
      where: { date },
      include: { product: true },
      orderBy: { generatedAt: 'desc' }
    }),
    prisma.topPlatformReport.findFirst({
      where: { date },
      orderBy: { generatedAt: 'desc' }
    }),
    prisma.underperformingContentReport.findMany({
      where: { date },
      include: { contentIdea: true }
    }),
    prisma.analyticsDaily.groupBy({
      by: ['platform'],
      where: { date },
      _sum: { ctr: true, conversions: true, linkClicks: true, views: true, revenue: true }
    })
  ]);

  return {
    date,
    topHook: mapHook(topHook),
    topProduct: mapProduct(topProduct),
    topPlatform: mapPlatform(topPlatform),
    underperforming: underperforming.map((row: UnderperformingContentRow) => ({
      title: row.contentIdea?.title ?? 'Unknown',
      metricName: row.metricName,
      threshold: row.threshold
    })),
    totals: dailyTotals
  };
}

router.get('/analytics/overview', async (_req, res) => {
  res.json(await buildAnalyticsOverview());
});

router.get('/dashboard', async (_req, res) => {
  const prisma = await getPrisma();
  const [
    analytics,
    ideas,
    assets,
    publishQueue,
    engagements,
    prompts,
    runs,
    totalIdeas,
    approvedIdeas,
    queuedPublishing,
    pendingApprovalQueue,
    activePrompts
  ] = await Promise.all([
    buildAnalyticsOverview(),
    prisma.contentIdea.findMany({
      take: 6,
      orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
      include: { product: true }
    }),
    prisma.contentAsset.findMany({
      take: 6,
      orderBy: { updatedAt: 'desc' },
      include: {
        product: true,
        contentIdea: true,
        publishQueue: {
          orderBy: { scheduledAt: 'asc' },
          take: 1
        }
      }
    }),
    prisma.publishQueue.findMany({
      take: 6,
      orderBy: [{ scheduledAt: 'asc' }, { createdAt: 'desc' }],
      include: {
        contentAsset: {
          include: {
            contentIdea: true,
            product: true
          }
        }
      }
    }),
    prisma.engagementTask.findMany({
      take: 6,
      orderBy: { updatedAt: 'desc' }
    }),
    prisma.promptVersion.findMany({
      take: 6,
      orderBy: [{ active: 'desc' }, { createdAt: 'desc' }]
    }),
    prisma.agentRun.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { promptVersion: true }
    }),
    prisma.contentIdea.count(),
    prisma.contentIdea.count({
      where: { status: 'approved' }
    }),
    prisma.publishQueue.count({
      where: {
        status: {
          in: ['pending', 'scheduled']
        }
      }
    }),
    prisma.publishQueue.count({
      where: { approvalDecision: 'pending' }
    }),
    prisma.promptVersion.count({ where: { active: true } })
  ]);

  res.json({
    generatedAt: new Date().toISOString(),
    overview: {
      totalIdeas,
      approvedIdeas,
      queuedPublishing,
      pendingApprovalQueue,
      activePrompts,
      recentRuns: runs.length,
      topPlatform: analytics.topPlatform?.platform ?? null
    },
    analytics,
    ideas: ideas.map((idea: DashboardIdeaRow) => ({
      id: idea.id,
      title: idea.title,
      angle: idea.angle,
      platform: idea.platform,
      status: idea.status,
      riskScore: idea.riskScore,
      approvalDecision: idea.approvalDecision,
      productName: idea.product?.name ?? idea.productName,
      productSlug: idea.productSlug,
      productCanonicalUrl: idea.productCanonicalUrl ?? idea.product?.canonicalUrl ?? null,
      funnelStage: idea.contentCategory,
      notes: idea.humanNotes
    })),
    assets: assets.map((asset: DashboardAssetRow) => ({
      id: asset.id,
      mediaType: asset.mediaType,
      platform: asset.platform,
      copy: asset.copy,
      confidenceScore: asset.confidenceScore,
      assetVersion: asset.assetVersion,
      productName: asset.product?.name ?? 'Unknown',
      contentIdeaTitle: asset.contentIdea.title,
      queueStatus: asset.publishQueue[0]?.status ?? null
    })),
    publishQueue: publishQueue.map((job: DashboardPublishQueueRow) => ({
      id: job.id,
      platform: job.platform,
      scheduledAt: job.scheduledAt,
      status: job.status,
      retryCount: job.retryCount,
      approvalDecision: job.approvalDecision,
      failureReason: job.failureReason,
      externalUrl: job.externalUrl,
      contentIdeaTitle: job.contentAsset.contentIdea.title,
      productName: job.contentAsset.product?.name ?? 'Unknown'
    })),
    engagements: engagements.map((task: DashboardEngagementRow) => ({
      id: task.id,
      inboundThreadId: task.inboundThreadId,
      type: task.type,
      status: task.status,
      riskScore: task.riskScore,
      approvalDecision: task.approvalDecision,
      responseChannel: task.responseChannel,
      draftCopy: task.draftCopy
    })),
    prompts: prompts.map((prompt: DashboardPromptRow) => ({
      id: prompt.id,
      agentName: prompt.agentName,
      versionLabel: prompt.versionLabel,
      active: prompt.active,
      createdAt: prompt.createdAt
    })),
    runs: runs.map((run: DashboardRunRow) => ({
      id: run.id,
      agentName: run.agentName,
      summary: run.summary,
      dryRun: run.dryRun,
      status: run.status,
      createdAt: run.createdAt,
      promptVersionLabel: run.promptVersion?.versionLabel ?? null
    }))
  });
});

export default router;
