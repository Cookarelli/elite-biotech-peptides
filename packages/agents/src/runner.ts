import { getActivePrompt, getPromptVersionById } from '@elite-biotech/prompt-registry';
import type {
  AgentDefinition,
  AgentInput,
  AgentRunLogger,
  AgentRunPayloadRecord,
  AgentRunner,
  AgentRunnerOptions
} from './types';

const defaultLogger: AgentRunLogger = async (payload) => {
  const { recordAgentRun } = await import('@elite-biotech/db');
  await recordAgentRun(payload);
};

export function createAgentRunner<I, O>(
  definition: AgentDefinition<I, O>,
  options?: AgentRunnerOptions
): AgentRunner<I, O> {
  const logger = options?.logAgentRun ?? defaultLogger;

  return async (input: AgentInput<I>) => {
    const dryRun = input.dryRun ?? false;
    const prompt = input.promptVersionId
      ? getPromptVersionById(input.promptVersionId)
      : getActivePrompt(definition.agentName);

    const result = await definition.run({ input, promptVersion: prompt ?? null, dryRun });

    const payloadRecord: AgentRunPayloadRecord = {
      agentName: definition.agentName,
      promptVersionId: prompt?.id ?? input.promptVersionId,
      payload: input.payload as unknown as Record<string, unknown>,
      output: result as unknown as Record<string, unknown>,
      summary: result.summary,
      dryRun,
      riskScore: result.riskScore,
      source: input.source,
      status: result.status,
      artifacts: result.artifacts as Record<string, unknown> | undefined,
      notes: result.notes
    };

    await logger(payloadRecord);
    return result;
  };
}
