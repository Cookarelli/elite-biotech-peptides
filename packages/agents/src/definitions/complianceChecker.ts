import type { AgentDefinition } from '../types';

export interface ComplianceCheckerInputPayload {
  text: string;
  riskScore: number;
  flags: string[];
}

export interface ComplianceCheckerOutput {
  complianceCheckPassed: boolean;
  severity: 'low' | 'medium' | 'high';
  notes: string[];
}

export const complianceCheckerDefinition: AgentDefinition<ComplianceCheckerInputPayload, ComplianceCheckerOutput> = {
  agentName: 'compliance-checker',
  description: 'Reviews drafts for policy issues and assigns compliance state.',
  run: async ({ input }) => {
    const { riskScore, flags } = input.payload;
    const hasClaim = flags.includes('unverified-claim');
    const fail = riskScore >= 5 || hasClaim;
    const severity: ComplianceCheckerOutput['severity'] = fail ? 'high' : 'low';
    const notes = fail
      ? ['Flagged for human review: risk threshold exceeded.']
      : ['Clear to proceed.'];

    return {
      summary: fail ? 'Compliance flagged' : 'Compliance cleared',
      artifacts: { notes, complianceCheckPassed: !fail, severity },
      riskScore,
      status: fail ? 'flagged' : 'cleared',
      notes: notes.join(' ')
    };
  },
  fixtures: [
    {
      id: 'high-risk',
      description: 'Flags a draft with high risk score.',
      input: {
        payload: {
          text: 'Claims that peptides cure all ailments',
          riskScore: 7,
          flags: ['unverified-claim']
        }
      },
      expected: {
        summary: 'Compliance flagged'
      }
    }
  ]
};
