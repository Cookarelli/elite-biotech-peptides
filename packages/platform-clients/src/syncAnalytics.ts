import { getPrisma, refreshAnalyticsSummaries } from '@elite-biotech/db';
import type { PlatformAdapter } from './adapters';
import type { PlatformName } from './config';

export interface SyncPlatformAnalyticsOptions {
  adapters: Partial<Record<PlatformName, PlatformAdapter>>;
  lookbackDays?: number;
  limit?: number;
}

export interface SyncPlatformAnalyticsReport {
  scanned: number;
  synced: number;
  skipped: number;
  refreshedDates: string[];
  items: Array<{
    queueId: string;
    platform: PlatformName;
    status: 'synced' | 'skipped';
    reason?: string;
  }>;
}

function toDayStart(value: Date) {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()));
}

export async function syncPlatformAnalytics(
  options: SyncPlatformAnalyticsOptions
): Promise<SyncPlatformAnalyticsReport> {
  const prisma = await getPrisma();
  const now = new Date();
  const lookbackDays = options.lookbackDays ?? 7;
  const since = new Date(now);
  since.setUTCDate(now.getUTCDate() - lookbackDays);

  const queueRows = await prisma.publishQueue.findMany({
    where: {
      status: 'sent',
      updatedAt: { gte: since }
    },
    orderBy: { updatedAt: 'desc' },
    take: options.limit ?? 20,
    include: {
      contentAsset: {
        include: {
          contentIdea: true
        }
      }
    }
  });

  const report: SyncPlatformAnalyticsReport = {
    scanned: queueRows.length,
    synced: 0,
    skipped: 0,
    refreshedDates: [],
    items: []
  };

  const refreshedDates = new Set<string>();

  for (const row of queueRows) {
    const adapter = options.adapters[row.platform as PlatformName];
    if (!adapter || !row.externalId) {
      report.skipped += 1;
      report.items.push({
        queueId: row.id,
        platform: row.platform as PlatformName,
        status: 'skipped',
        reason: !adapter ? 'No adapter registered.' : 'No externalId on publish queue row.'
      });
      continue;
    }

    const snapshot = await adapter.fetchAnalytics({
      platform: row.platform as PlatformName,
      externalId: row.externalId ?? undefined,
      externalUrl: row.externalUrl ?? undefined,
      publishedAt: row.updatedAt.toISOString(),
      metadata: {
        queueId: row.id
      }
    });

    if (!snapshot || !row.contentAsset.contentIdeaId) {
      report.skipped += 1;
      report.items.push({
        queueId: row.id,
        platform: row.platform as PlatformName,
        status: 'skipped',
        reason: !snapshot ? 'No analytics snapshot available.' : 'Queue item is not linked to a content idea.'
      });
      continue;
    }

    const analyticsDate = toDayStart(now);
    const existing = await prisma.analyticsDaily.findFirst({
      where: {
        date: analyticsDate,
        platform: row.platform,
        contentIdeaId: row.contentAsset.contentIdeaId
      }
    });

    const nextData = {
      date: analyticsDate,
      platform: row.platform,
      contentIdeaId: row.contentAsset.contentIdeaId,
      views: snapshot.views ?? existing?.views ?? 0,
      likes: snapshot.likes ?? existing?.likes ?? 0,
      comments: snapshot.comments ?? existing?.comments ?? 0,
      shares: snapshot.shares ?? existing?.shares ?? 0,
      profileVisits: snapshot.profileVisits ?? existing?.profileVisits ?? 0,
      linkClicks: snapshot.linkClicks ?? existing?.linkClicks ?? 0,
      conversions: snapshot.conversions ?? existing?.conversions ?? 0,
      revenue: snapshot.revenue ?? Number(existing?.revenue ?? 0),
      ctr:
        typeof snapshot.ctr === 'number'
          ? snapshot.ctr
          : snapshot.views && snapshot.linkClicks
            ? Number(((snapshot.linkClicks / snapshot.views) * 100).toFixed(2))
            : existing?.ctr ?? 0
    };

    if (existing) {
      await prisma.analyticsDaily.update({
        where: { id: existing.id },
        data: nextData
      });
    } else {
      await prisma.analyticsDaily.create({
        data: nextData
      });
    }

    const dateKey = analyticsDate.toISOString();
    refreshedDates.add(dateKey);
    report.synced += 1;
    report.items.push({
      queueId: row.id,
      platform: row.platform as PlatformName,
      status: 'synced'
    });
  }

  for (const dateKey of refreshedDates) {
    await refreshAnalyticsSummaries(new Date(dateKey));
  }

  report.refreshedDates = [...refreshedDates];
  return report;
}
