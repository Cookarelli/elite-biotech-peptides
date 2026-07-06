import { NAV_ITEMS } from './layout';
import { fetchDashboardData, type DashboardResponse } from '../lib/api';

const fallbackData: DashboardResponse = {
  generatedAt: new Date('2026-04-03T12:00:00.000Z').toISOString(),
  overview: {
    totalIdeas: 8,
    approvedIdeas: 8,
    queuedPublishing: 3,
    pendingApprovalQueue: 1,
    activePrompts: 5,
    recentRuns: 5,
    topPlatform: 'instagram'
  },
  analytics: {
    date: new Date('2026-04-03T00:00:00.000Z').toISOString(),
    topHook: {
      hook: 'age-related recovery curiosity',
      platform: 'instagram',
      views: 18420
    },
    topProduct: {
      productId: 'fallback',
      productName: 'BPC-157',
      productSlug: 'bpc-157',
      metricName: 'revenue',
      metricValue: 2480
    },
    topPlatform: {
      platform: 'instagram',
      metricName: 'conversions',
      metricValue: 27
    },
    underperforming: [
      {
        title: 'Why sleep ruins everything when it slips',
        metricName: 'CTR',
        threshold: 4
      }
    ],
    totals: [
      {
        platform: 'instagram',
        _sum: { ctr: 15.3, conversions: 27, linkClicks: 295, views: 33930, revenue: 4420 }
      },
      {
        platform: 'tiktok',
        _sum: { ctr: 7.4, conversions: 12, linkClicks: 142, views: 13880, revenue: 1710 }
      },
      {
        platform: 'youtube',
        _sum: { ctr: 5.3, conversions: 6, linkClicks: 75, views: 15960, revenue: 870 }
      }
    ]
  },
  ideas: [
    {
      id: 'idea-1',
      title: 'Why recovery feels slower after 30',
      angle: 'age-related recovery curiosity',
      platform: 'instagram',
      status: 'approved',
      riskScore: 2,
      approvalDecision: 'approved',
      productName: 'BPC-157',
      productSlug: 'bpc-157',
      productCanonicalUrl: 'https://elitebiotechpeptides.com/products/bpc-157',
      funnelStage: 'top',
      notes: 'Audience=men-30-plus-fitness'
    },
    {
      id: 'idea-2',
      title: 'What people are quietly researching for recovery',
      angle: 'insider curiosity',
      platform: 'tiktok',
      status: 'approved',
      riskScore: 2,
      approvalDecision: 'approved',
      productName: 'Recovery Collection',
      productSlug: 'recovery',
      productCanonicalUrl: 'https://elitebiotechpeptides.com/collections/recovery',
      funnelStage: 'top',
      notes: 'Audience=biohackers'
    },
    {
      id: 'idea-3',
      title: 'The reason gym progress stalls',
      angle: 'performance plateau',
      platform: 'youtube',
      status: 'approved',
      riskScore: 3,
      approvalDecision: 'approved',
      productName: 'Performance Collection',
      productSlug: 'performance',
      productCanonicalUrl: 'https://elitebiotechpeptides.com/collections/performance',
      funnelStage: 'top',
      notes: 'Audience=gym-goers'
    }
  ],
  assets: [
    {
      id: 'asset-1',
      mediaType: 'short-form-video',
      platform: 'instagram',
      copy: 'Why recovery feels slower after 30 :: age-related recovery curiosity',
      confidenceScore: 80,
      assetVersion: 'v1',
      productName: 'BPC-157',
      contentIdeaTitle: 'Why recovery feels slower after 30',
      queueStatus: 'scheduled'
    },
    {
      id: 'asset-2',
      mediaType: 'caption-pack',
      platform: 'tiktok',
      copy: 'What people are quietly researching for recovery :: insider curiosity',
      confidenceScore: 81,
      assetVersion: 'v2',
      productName: 'Recovery Collection',
      contentIdeaTitle: 'What people are quietly researching for recovery',
      queueStatus: 'pending'
    }
  ],
  publishQueue: [
    {
      id: 'queue-1',
      platform: 'instagram',
      scheduledAt: new Date('2026-04-04T14:00:00.000Z').toISOString(),
      status: 'scheduled',
      retryCount: 0,
      approvalDecision: 'approved',
      failureReason: null,
      externalUrl: 'https://www.instagram.com/p/elite-growth-os-1/',
      contentIdeaTitle: 'Why recovery feels slower after 30',
      productName: 'BPC-157'
    },
    {
      id: 'queue-2',
      platform: 'tiktok',
      scheduledAt: new Date('2026-04-04T18:00:00.000Z').toISOString(),
      status: 'pending',
      retryCount: 1,
      approvalDecision: 'pending',
      failureReason: 'Awaiting final human approval',
      externalUrl: null,
      contentIdeaTitle: 'What people are quietly researching for recovery',
      productName: 'Recovery Collection'
    }
  ],
  engagements: [
    {
      id: 'eng-1',
      inboundThreadId: 'ig-inbound-384',
      type: 'reply',
      status: 'pending',
      riskScore: 2,
      approvalDecision: 'pending',
      responseChannel: 'instagram',
      draftCopy:
        'Thanks for reaching out. We can point you to our recovery collection so you can review options directly.'
    },
    {
      id: 'eng-2',
      inboundThreadId: 'tt-inbound-388',
      type: 'dm',
      status: 'approved',
      riskScore: 3,
      approvalDecision: 'approved',
      responseChannel: 'tiktok',
      draftCopy:
        'Happy to help. Our performance collection is the cleanest place to browse depending on your training goals.'
    }
  ],
  prompts: [
    {
      id: 'prompt-1',
      agentName: 'content_planner',
      versionLabel: 'v1',
      active: true,
      createdAt: new Date('2026-04-03T12:00:00.000Z').toISOString()
    },
    {
      id: 'prompt-2',
      agentName: 'script_writer',
      versionLabel: 'v1',
      active: true,
      createdAt: new Date('2026-04-03T12:00:00.000Z').toISOString()
    }
  ],
  runs: [
    {
      id: 'run-1',
      agentName: 'content_planner',
      summary: 'Seeded high-intent recovery and performance ideas.',
      dryRun: true,
      status: 'completed',
      createdAt: new Date('2026-04-03T12:00:00.000Z').toISOString(),
      promptVersionLabel: 'v1'
    },
    {
      id: 'run-2',
      agentName: 'analytics_summarizer',
      summary: 'Rolled up daily analytics and generated report tables.',
      dryRun: false,
      status: 'completed',
      createdAt: new Date('2026-04-03T12:05:00.000Z').toISOString(),
      promptVersionLabel: 'v1'
    }
  ]
};

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

function formatDate(value?: string | null) {
  if (!value) return 'No date';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(value));
}

function formatCompactNumber(value?: number | null) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value ?? 0);
}

function Badge({
  children,
  tone = 'slate'
}: {
  children: React.ReactNode;
  tone?: 'slate' | 'green' | 'amber' | 'red' | 'blue';
}) {
  return (
    <span
      className={cx(
        'inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]',
        tone === 'green' && 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
        tone === 'amber' && 'border-amber-300/30 bg-amber-300/10 text-amber-100',
        tone === 'red' && 'border-rose-300/30 bg-rose-300/10 text-rose-100',
        tone === 'blue' && 'border-sky-300/30 bg-sky-300/10 text-sky-100',
        tone === 'slate' && 'border-white/10 bg-white/5 text-slate-200'
      )}
    >
      {children}
    </span>
  );
}

function SectionCard({
  id,
  title,
  eyebrow,
  children
}: {
  id: string;
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70 shadow-[0_24px_80px_rgba(15,23,42,0.45)] backdrop-blur"
    >
      <div className="border-b border-white/10 bg-white/[0.03] px-6 py-5">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  detail
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-5">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-300">{label}</p>
      <p className="mt-3 text-4xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-300">{detail}</p>
    </article>
  );
}

export default async function Page() {
  const liveData = await fetchDashboardData().catch(() => null);
  const data = liveData ?? fallbackData;

  return (
    <div className="space-y-8">
      <section
        id={NAV_ITEMS[0].id}
        className="overflow-hidden rounded-[32px] border border-cyan-400/20 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_35%),linear-gradient(135deg,_rgba(15,23,42,0.98),_rgba(2,6,23,0.92))] px-6 py-7 shadow-[0_30px_120px_rgba(8,47,73,0.35)]"
      >
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl space-y-3">
            <Badge tone={liveData ? 'green' : 'amber'}>
              {liveData ? 'Live database connected' : 'Using fallback preview data'}
            </Badge>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Elite Biotech growth operations in one command center.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-200">
              Track mapped content, see what is queued for Instagram, TikTok, and YouTube, and keep risky work behind human approval before anything moves out.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 xl:w-[420px]">
            <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Top hook</p>
              <p className="mt-2 text-lg font-semibold text-white">
                {data.analytics.topHook?.hook ?? 'No hook yet'}
              </p>
              <p className="mt-1 text-sm text-slate-300">
                {formatCompactNumber(data.analytics.topHook?.views)} views
              </p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Top product</p>
              <p className="mt-2 text-lg font-semibold text-white">
                {data.analytics.topProduct?.productName ?? 'No product yet'}
              </p>
              <p className="mt-1 text-sm text-slate-300">
                {data.analytics.topProduct?.metricName ?? 'metric'} {formatCompactNumber(data.analytics.topProduct?.metricValue)}
              </p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Updated</p>
              <p className="mt-2 text-lg font-semibold text-white">{formatDate(data.generatedAt)}</p>
              <p className="mt-1 text-sm text-slate-300">
                Best platform {data.overview.topPlatform ?? 'not enough data'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Mapped Ideas"
            value={String(data.overview.totalIdeas)}
            detail={`${data.overview.approvedIdeas} approved and ready for scripting`}
          />
          <MetricCard
            label="Queued Posts"
            value={String(data.overview.queuedPublishing)}
            detail={`${data.overview.pendingApprovalQueue} queue items still need human sign-off`}
          />
          <MetricCard
            label="Prompt Versions"
            value={String(data.overview.activePrompts)}
            detail="Active prompt registry entries available to agents"
          />
          <MetricCard
            label="Agent Runs"
            value={String(data.overview.recentRuns)}
            detail="Recent runs logged for auditability and dry-run review"
          />
        </div>
      </section>

      <SectionCard id="content-ideas" title="Content Ideas" eyebrow="Mapped Hooks">
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {data.ideas.map((idea) => (
            <article
              key={idea.id}
              className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_12px_40px_rgba(15,23,42,0.22)]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="blue">{idea.platform}</Badge>
                <Badge tone={idea.approvalDecision === 'approved' ? 'green' : 'amber'}>
                  {idea.approvalDecision}
                </Badge>
                <Badge tone={idea.riskScore >= 4 ? 'red' : 'slate'}>risk {idea.riskScore}</Badge>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{idea.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{idea.angle}</p>
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Mapped product</p>
                <p className="mt-2 text-base font-semibold text-white">{idea.productName}</p>
                <p className="text-sm text-cyan-200">{idea.productSlug}</p>
                <p className="mt-1 text-sm text-slate-400">{idea.productCanonicalUrl}</p>
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-400">
                Funnel {idea.funnelStage ?? 'unspecified'}
              </p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard id="assets" title="Content Assets" eyebrow="Script Inventory">
        <div className="grid gap-4 lg:grid-cols-2">
          {data.assets.map((asset) => (
            <article key={asset.id} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
                    {asset.mediaType}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">{asset.contentIdeaTitle}</p>
                </div>
                <Badge tone="slate">{asset.platform}</Badge>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{asset.copy}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone="green">{asset.productName}</Badge>
                <Badge tone="blue">confidence {asset.confidenceScore}</Badge>
                <Badge tone={asset.queueStatus === 'scheduled' ? 'green' : 'amber'}>
                  {asset.queueStatus ?? 'unqueued'}
                </Badge>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard id="publish-queue" title="Publish Queue" eyebrow="Scheduling">
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {data.publishQueue.map((job) => (
            <article key={job.id} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between gap-3">
                <Badge tone="blue">{job.platform}</Badge>
                <Badge
                  tone={
                    job.status === 'scheduled' ? 'green' : job.status === 'failed' ? 'red' : 'amber'
                  }
                >
                  {job.status}
                </Badge>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{job.contentIdeaTitle}</h3>
              <p className="mt-1 text-sm text-slate-300">{job.productName}</p>
              <p className="mt-4 text-sm text-slate-400">Scheduled {formatDate(job.scheduledAt)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone={job.approvalDecision === 'approved' ? 'green' : 'amber'}>
                  {job.approvalDecision}
                </Badge>
                <Badge tone={job.retryCount > 0 ? 'amber' : 'slate'}>retries {job.retryCount}</Badge>
              </div>
              {job.failureReason ? (
                <p className="mt-4 rounded-2xl border border-rose-300/20 bg-rose-300/10 p-3 text-sm text-rose-100">
                  {job.failureReason}
                </p>
              ) : null}
              {job.externalUrl ? (
                <a
                  className="mt-4 inline-flex text-sm font-medium text-cyan-200 hover:text-cyan-100"
                  href={job.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View external post
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard id="engagement" title="Engagement" eyebrow="Inbound Only">
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {data.engagements.map((engagement) => (
            <article key={engagement.id} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between gap-3">
                <Badge tone="slate">{engagement.type}</Badge>
                <Badge tone={engagement.approvalDecision === 'approved' ? 'green' : 'amber'}>
                  {engagement.approvalDecision}
                </Badge>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{engagement.inboundThreadId}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{engagement.draftCopy}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone={engagement.riskScore >= 4 ? 'red' : 'blue'}>risk {engagement.riskScore}</Badge>
                <Badge tone="slate">{engagement.responseChannel ?? 'unassigned'}</Badge>
                <Badge tone={engagement.status === 'completed' ? 'green' : 'amber'}>
                  {engagement.status}
                </Badge>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard id="analytics" title="Analytics" eyebrow="Daily Performance">
        <div className="grid gap-4 xl:grid-cols-[1.5fr,1fr]">
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Top hook</p>
              <p className="mt-3 text-xl font-semibold text-white">
                {data.analytics.topHook?.hook ?? 'No data'}
              </p>
              <p className="mt-2 text-sm text-slate-300">
                {data.analytics.topHook?.platform ?? 'unknown'} • {formatCompactNumber(data.analytics.topHook?.views)} views
              </p>
            </article>
            <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Top product</p>
              <p className="mt-3 text-xl font-semibold text-white">
                {data.analytics.topProduct?.productName ?? 'No data'}
              </p>
              <p className="mt-2 text-sm text-slate-300">
                {data.analytics.topProduct?.metricName ?? 'metric'} • {formatCompactNumber(data.analytics.topProduct?.metricValue)}
              </p>
            </article>
            <article className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Best platform</p>
              <p className="mt-3 text-xl font-semibold text-white">
                {data.analytics.topPlatform?.platform ?? 'No data'}
              </p>
              <p className="mt-2 text-sm text-slate-300">
                {data.analytics.topPlatform?.metricName ?? 'metric'} • {formatCompactNumber(data.analytics.topPlatform?.metricValue)}
              </p>
            </article>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Underperformers</p>
            <div className="mt-4 space-y-3">
              {data.analytics.underperforming?.length ? (
                data.analytics.underperforming.map((item) => (
                  <div
                    key={`${item.title}-${item.metricName}`}
                    className="rounded-2xl border border-amber-300/15 bg-amber-300/10 p-4"
                  >
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-amber-100">
                      {item.metricName} threshold {item.threshold}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-300">No underperformers flagged yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.analytics.totals?.map((row) => (
            <article key={row.platform} className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold text-white">{row.platform}</p>
                <Badge tone="blue">rollup</Badge>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Views</p>
                  <p className="text-xl font-semibold text-white">{formatCompactNumber(row._sum.views)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">CTR</p>
                  <p className="text-xl font-semibold text-white">{row._sum.ctr ?? 0}%</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Conversions</p>
                  <p className="text-xl font-semibold text-white">{row._sum.conversions ?? 0}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Clicks</p>
                  <p className="text-xl font-semibold text-white">{formatCompactNumber(row._sum.linkClicks)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard id="prompt-versions" title="Prompt Versions" eyebrow="Registry">
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {data.prompts.map((prompt) => (
            <article key={prompt.id} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between gap-3">
                <Badge tone="slate">{prompt.agentName}</Badge>
                <Badge tone={prompt.active ? 'green' : 'slate'}>
                  {prompt.active ? 'active' : 'inactive'}
                </Badge>
              </div>
              <p className="mt-4 text-2xl font-semibold text-white">{prompt.versionLabel}</p>
              <p className="mt-2 text-sm text-slate-400">Created {formatDate(prompt.createdAt)}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard id="agent-runs" title="Agent Runs" eyebrow="Audit Log">
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {data.runs.map((run) => (
            <article key={run.id} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between gap-3">
                <Badge tone="slate">{run.agentName}</Badge>
                <Badge tone={run.dryRun ? 'amber' : 'green'}>{run.dryRun ? 'dry-run' : 'live'}</Badge>
              </div>
              <p className="mt-4 text-lg font-semibold text-white">{run.summary}</p>
              <p className="mt-2 text-sm text-slate-300">
                Prompt {run.promptVersionLabel ?? 'n/a'} • {run.status ?? 'unknown'}
              </p>
              <p className="mt-3 text-sm text-slate-400">{formatDate(run.createdAt)}</p>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
