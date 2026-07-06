import type { AgentDefinition } from '../types';

export interface ScriptWriterInputPayload {
  ideaTitle: string;
  tone: 'authoritative' | 'friendly' | 'educational';
  platform: string;
  callToAction: string;
}

export interface ScriptWriterOutput {
  script: string;
  caption: string;
  hooks: string[];
}

export const scriptWriterDefinition: AgentDefinition<ScriptWriterInputPayload, ScriptWriterOutput> = {
  agentName: 'script-writer',
  description: 'Turns approved content ideas into platform-specific scripts and captions.',
  run: async ({ input }) => {
    const { ideaTitle, tone, platform, callToAction } = input.payload;
    const script = `${tone} narrative for ${ideaTitle} to match ${platform}`;
    const caption = `${ideaTitle} · ${callToAction}`;
    const hooks = [
      `${platform} hook 1 highlights ${ideaTitle}`,
      `${platform} hook 2 calls out Elite Biotech Peptides`
    ];

    return {
      summary: `Script ready for ${ideaTitle} on ${platform}`,
      artifacts: { script, caption, hooks },
      riskScore: 2,
      status: 'draft-script'
    };
  },
  fixtures: [
    {
      id: 'friendly-tiktok',
      description: 'Builds a friendly TikTok script for a stack idea.',
      input: {
        payload: {
          ideaTitle: 'Modular Stack momentum',
          tone: 'friendly',
          platform: 'TikTok',
          callToAction: 'Tap the link to evaluate the stack'
        }
      },
      expected: {
        summary: 'Script ready for Modular Stack momentum on TikTok'
      }
    }
  ]
};
