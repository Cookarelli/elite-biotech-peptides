const API_BASE = process.env.NEXT_PUBLIC_GROWTH_API_URL ?? 'http://localhost:4000';
const API_KEY = process.env.GROWTH_API_KEY ?? '';

export interface DashboardResponse {
  generatedAt: string;
  overview: {
    totalIdeas: number;
    approvedIdeas: number;
    queuedPublishing: number;
    pendingApprovalQueue: number;
    activePrompts: number;
    recentRuns: number;
    topPlatform: string | null;
  };
  analytics: {
    date?: string | null;
    topHook?: {
      hook: string;
      platform: string;
      views: number;
    } | null;
    topProduct?: {
      productId?: string | null;
      productName?: string | null;
      productSlug?: string | null;
      metricName?: string;
      metricValue?: number;
    } | null;
    topPlatform?: {
      platform: string;
      metricName: string;
      metricValue: number;
    } | null;
    underperforming?: { title: string; metricName?: string; threshold?: number }[];
    totals?: {
      platform: string;
      _sum: {
        ctr?: number | null;
        conversions?: number | null;
        linkClicks?: number | null;
        views?: number | null;
        revenue?: number | null;
      };
    }[];
  };
  ideas: Array<{
    id: string;
    title: string;
    angle: string;
    platform: string;
    status: string;
    riskScore: number;
    approvalDecision: string;
    productName: string;
    productSlug: string;
    productCanonicalUrl: string | null;
    funnelStage?: string | null;
    notes?: string | null;
  }>;
  assets: Array<{
    id: string;
    mediaType: string;
    platform: string;
    copy: string;
    confidenceScore: number;
    assetVersion?: string | null;
    productName: string;
    contentIdeaTitle: string;
    queueStatus?: string | null;
  }>;
  publishQueue: Array<{
    id: string;
    platform: string;
    scheduledAt: string;
    status: string;
    retryCount: number;
    approvalDecision: string;
    failureReason?: string | null;
    externalUrl?: string | null;
    contentIdeaTitle: string;
    productName: string;
  }>;
  engagements: Array<{
    id: string;
    inboundThreadId: string;
    type: string;
    status: string;
    riskScore: number;
    approvalDecision: string;
    responseChannel?: string | null;
    draftCopy: string;
  }>;
  prompts: Array<{
    id: string;
    agentName: string;
    versionLabel: string;
    active: boolean;
    createdAt: string;
  }>;
  runs: Array<{
    id: string;
    agentName: string;
    summary: string;
    dryRun: boolean;
    status?: string | null;
    createdAt: string;
    promptVersionLabel?: string | null;
  }>;
}

async function fetcher<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'x-growth-api-key': API_KEY
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  return res.json();
}

export async function fetchDashboardData() {
  return fetcher<DashboardResponse>('/v1/dashboard');
}
