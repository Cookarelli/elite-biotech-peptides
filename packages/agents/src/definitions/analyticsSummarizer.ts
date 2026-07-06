import type { AgentDefinition } from '../types';

export interface AnalyticsMetric {
  label: string;
  value: number;
  platform: string;
}

export interface AnalyticsSummarizerInputPayload {
  dailyMetrics: AnalyticsMetric[];
}

export interface AnalyticsSummarizerOutput {
  topHook: string;
  topPlatform: string;
  underperforming: string[];
}

export const analyticsSummarizerDefinition: AgentDefinition<AnalyticsSummarizerInputPayload, AnalyticsSummarizerOutput> = {
  agentName: 'analytics-summarizer',
  description: 'Summarizes daily analytics into top hooks/platforms and underperformers.',
  run: async ({ input }) => {
    const { dailyMetrics } = input.payload;
    const sorted = [...dailyMetrics].sort((a, b) => b.value - a.value);
    const top = sorted[0] ?? { label: 'No data', value: 0, platform: 'n/a' };
    const underperforming = sorted.slice(-2).map((metric) => `${metric.label} on ${metric.platform}`);

    return {
      summary: `Top hook ${top.label} (${top.platform})`,
      artifacts: {
        topHook: top.label,
        topPlatform: top.platform,
        underperforming
      },
      status: 'summarized'
    };
  },
  fixtures: [
    {
      id: 'daily-recap',
      description: 'Highlights top metric and underperformers.',
      input: {
        payload: {
          dailyMetrics: [
            { label: 'CTR spike', value: 72, platform: 'LinkedIn' },
            { label: 'Recovery reel', value: 42, platform: 'Instagram' },
            { label: 'Executive short', value: 28, platform: 'YouTube' }
          ]
        }
      },
      expected: {
        summary: 'Top hook CTR spike (LinkedIn)'
      }
    }
  ]
};
