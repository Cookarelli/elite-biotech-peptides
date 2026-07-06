import type { AgentDefinition } from '../types';

export interface ContentPlannerInputPayload {
  productName: string;
  collection: string;
  platform: string;
  focusMetric: string;
}

export interface ContentPlannerOutput {
  ideaTitle: string;
  angle: string;
  recommendedCTA: string;
}

export const contentPlannerDefinition: AgentDefinition<ContentPlannerInputPayload, ContentPlannerOutput> = {
  agentName: 'content-planner',
  description: 'Maps product/collection context into conversion-oriented content ideas.',
  run: async ({ input, dryRun }) => {
    const { productName, collection, platform, focusMetric } = input.payload;
    const ideaTitle = `${productName} insight for ${platform}`;
    const angle = `Position ${collection} to lift ${focusMetric}`;
    const recommendedCTA = `Explore the ${collection} collection on EliteBiotechPeptides.com`;

    return {
      summary: dryRun ? `Dry plan for ${ideaTitle}` : `Plan staged for ${ideaTitle}`,
      artifacts: { ideaTitle, angle, recommendedCTA },
      riskScore: 3,
      status: dryRun ? 'dry-run' : 'pending-approval'
    };
  },
  fixtures: [
    {
      id: 'linkedin-dry',
      description: 'Dry-run planning for LinkedIn conversion hook.',
      input: {
        payload: {
          productName: 'Modular Peptide Stack',
          collection: 'Performance',
          platform: 'LinkedIn',
          focusMetric: 'CTR'
        },
        dryRun: true
      },
      expected: {
        summary: 'Dry plan for Modular Peptide Stack insight for LinkedIn'
      }
    }
  ]
};
