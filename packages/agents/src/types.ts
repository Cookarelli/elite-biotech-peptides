import { z } from 'zod';
import type { PromptVersion } from '@elite-biotech/prompt-registry';
import { agentNameSchema } from './names';

export type AgentName = z.infer<typeof agentNameSchema>;

export interface AgentInput<TPayload = Record<string, unknown>> {
  payload: TPayload;
  dryRun?: boolean;
  promptVersionId?: string;
  source?: string;
}

export interface AgentOutput<TArtifacts = Record<string, unknown>> {
  summary: string;
  artifacts?: TArtifacts;
  riskScore?: number;
  status?: string;
  notes?: string;
}

export interface AgentFixture<I, O> {
  id: string;
  description: string;
  input: AgentInput<I>;
  expected: Partial<AgentOutput<O>>;
}

export interface AgentDefinition<I, O> {
  agentName: AgentName;
  description?: string;
  run(context: AgentExecutionContext<I>): Promise<AgentOutput<O>>;
  fixtures?: AgentFixture<I, O>[];
}

export interface AgentExecutionContext<I> {
  input: AgentInput<I>;
  promptVersion?: PromptVersion | null;
  dryRun: boolean;
}

export interface AgentRunPayloadRecord {
  agentName: AgentName;
  promptVersionId?: string;
  payload: Record<string, unknown>;
  output: Record<string, unknown>;
  summary: string;
  dryRun?: boolean;
  riskScore?: number;
  source?: string;
  status?: string;
  artifacts?: Record<string, unknown>;
  notes?: string;
}

export type AgentRunLogger = (payload: AgentRunPayloadRecord) => Promise<void>;

export interface AgentRunnerOptions {
  logAgentRun?: AgentRunLogger;
}

export type AgentRunner<I, O> = (input: AgentInput<I>) => Promise<AgentOutput<O>>;
