import type { Prisma } from '../../../node_modules/.prisma/client/client';
import type { Platform as PlatformEnum } from '../../../node_modules/.prisma/client/enums';
import { getPrisma } from './client';

type Platform = PlatformEnum;

export interface AnalyticsDailyPayload {
  date: Date;
  platform: Platform;
  contentIdeaId?: string;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  profileVisits?: number;
  linkClicks?: number;
  ctr?: number;
  conversions?: number;
  revenue?: Prisma.Decimal | number;
}

export async function ingestDailyAnalytics(payload: AnalyticsDailyPayload) {
  const prisma = await getPrisma();
  await prisma.analyticsDaily.create({
    data: {
      date: payload.date,
      platform: payload.platform,
      contentIdeaId: payload.contentIdeaId,
      views: payload.views ?? 0,
      likes: payload.likes ?? 0,
      comments: payload.comments ?? 0,
      shares: payload.shares ?? 0,
      profileVisits: payload.profileVisits ?? 0,
      linkClicks: payload.linkClicks ?? 0,
      ctr: payload.ctr ?? 0,
      conversions: payload.conversions ?? 0,
      revenue: payload.revenue ?? 0
    }
  });
}

export interface AnalyticsSummary {
  topHook?: string;
  topProduct?: string;
  topPlatform?: string;
  underperforming?: string[];
}

type AnalyticsSummaryRow = {
  contentIdeaId?: string | null;
  views: number;
  ctr: number;
  conversions: number;
  revenue: Prisma.Decimal | number;
  platform: Platform;
  contentIdea?: {
    title?: string | null;
    angle?: string | null;
    product?: {
      id: string;
      name: string;
    } | null;
  } | null;
};

export async function refreshAnalyticsSummaries(date: Date) {
  const prisma = await getPrisma();
  const targetDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const rows = (await prisma.analyticsDaily.findMany({
    where: { date: targetDate },
    include: { contentIdea: { include: { product: true } } }
  })) as AnalyticsSummaryRow[];

  if (!rows.length) {
    return null;
  }

  await prisma.topHookReport.deleteMany({ where: { date: targetDate } });
  await prisma.topProductReport.deleteMany({ where: { date: targetDate } });
  await prisma.topPlatformReport.deleteMany({ where: { date: targetDate } });
  await prisma.underperformingContentReport.deleteMany({ where: { date: targetDate } });

  const hookRow = rows.reduce((best, cur) => (cur.views > (best?.views ?? -1) ? cur : best), undefined as typeof rows[number] | undefined);
  if (hookRow) {
    await prisma.topHookReport.create({
      data: {
        date: targetDate,
        hook: hookRow.contentIdea?.angle ?? hookRow.contentIdeaId ?? 'Unknown',
        metricValue: hookRow.views,
        platform: hookRow.platform,
        ...(hookRow.contentIdeaId
          ? {
              contentIdea: {
                connect: { id: hookRow.contentIdeaId }
              }
            }
          : {})
      }
    });
  }

  const productTotals = new Map<string, { revenue: number; productName: string; productId?: string }>();
  for (const row of rows) {
    const product = row.contentIdea?.product;
    if (!product) continue;
    const key = product.id;
    const current = productTotals.get(key) ?? { revenue: 0, productName: product.name, productId: key };
    current.revenue += Number(row.revenue ?? 0);
    productTotals.set(key, current);
  }
  const topProduct = Array.from(productTotals.values()).sort((a, b) => b.revenue - a.revenue)[0];
  if (topProduct) {
    await prisma.topProductReport.create({
      data: {
        date: targetDate,
        metricName: 'revenue',
        metricValue: Math.round(topProduct.revenue),
        ...(topProduct.productId
          ? {
              product: {
                connect: { id: topProduct.productId }
              }
            }
          : {})
      }
    });
  }

  const platformTotals = rows.reduce((acc, row) => {
    const entry = acc.get(row.platform) ?? { conversions: 0 };
    entry.conversions += row.conversions ?? 0;
    acc.set(row.platform, entry);
    return acc;
  }, new Map<Platform, { conversions: number }>());
  const topPlatform = Array.from(platformTotals.entries()).sort((a, b) => b[1].conversions - a[1].conversions)[0];
  if (topPlatform) {
    await prisma.topPlatformReport.create({
      data: {
        date: targetDate,
        platform: topPlatform[0],
        metricName: 'conversions',
        metricValue: topPlatform[1].conversions
      }
    });
  }

  const underperforming = rows
    .filter((row) => row.ctr < 4 || (row.views ?? 0) < 100)
    .slice(0, 3)
    .map((row) => row.contentIdea?.title ?? row.contentIdeaId ?? 'Unknown');
  for (const entry of underperforming) {
    const contentIdeaId = rows.find((row) => row.contentIdea?.title === entry)?.contentIdeaId;
    await prisma.underperformingContentReport.create({
      data: {
        date: targetDate,
        metricName: 'CTR',
        metricValue: 0,
        threshold: 4,
        ...(contentIdeaId
          ? {
              contentIdea: {
                connect: { id: contentIdeaId }
              }
            }
          : {})
      }
    });
  }

  return {
    topHook: hookRow?.contentIdea?.angle ?? hookRow?.contentIdeaId ?? 'Unknown',
    topProduct: topProduct?.productName,
    topPlatform: topPlatform?.[0],
    underperforming
  } as AnalyticsSummary;
}
