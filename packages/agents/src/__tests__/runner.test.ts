import { afterEach, describe, expect, it, vi } from 'vitest';
import { createAgentRunner } from '../runner';
import { contentPlannerDefinition } from '../definitions/contentPlanner';
import * as promptRegistry from '@elite-biotech/prompt-registry';

const mockPrompt = {
  id: 'prompt-001',
  agentName: 'content-planner',
  versionLabel: 'baseline',
  content: 'baseline prompt',
  active: true,
  createdAt: new Date().toISOString()
};

describe('Agent runner', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('logs runs with prompt metadata', async () => {
    vi.spyOn(promptRegistry, 'getActivePrompt').mockReturnValue(mockPrompt);
    const log = vi.fn(async () => {});
    const runner = createAgentRunner(contentPlannerDefinition, { logAgentRun: log });

    const output = await runner({
      payload: {
        productName: 'Modular Peptide Stack',
        collection: 'Performance',
        platform: 'LinkedIn',
        focusMetric: 'CTR'
      },
      dryRun: true
    });

    expect(output.summary).toBe('Dry plan for Modular Peptide Stack insight for LinkedIn');
    expect(log).toHaveBeenCalledWith(
      expect.objectContaining({ agentName: 'content-planner', promptVersionId: 'prompt-001', dryRun: true })
    );
  });

  it('executes fixtures without throwing', async () => {
    const runner = createAgentRunner(contentPlannerDefinition, { logAgentRun: async () => {} });
    for (const fixture of contentPlannerDefinition.fixtures ?? []) {
      const result = await runner(fixture.input);
      if (fixture.expected.summary) {
        expect(result.summary).toBe(fixture.expected.summary);
      }
    }
  });
});
