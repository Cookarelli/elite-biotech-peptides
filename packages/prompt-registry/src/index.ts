import { z } from 'zod';

export const promptVersionSchema = z.object({
  id: z.string(),
  agentName: z.string(),
  versionLabel: z.string(),
  content: z.string(),
  active: z.boolean(),
  createdAt: z.string()
});

export type PromptVersion = z.infer<typeof promptVersionSchema>;

const promptRegistry: PromptVersion[] = [
  {
    id: 'prompt-001',
    agentName: 'content-planner',
    versionLabel: 'kpi-queue-v1',
    content: 'Build LinkedIn-friendly hooks that map to product collections.',
    active: true,
    createdAt: new Date().toISOString()
  }
];

export function listPromptVersions(agentName?: string) {
  return agentName
    ? promptRegistry.filter((item) => item.agentName === agentName)
    : [...promptRegistry];
}

export function getActivePrompt(agentName: string) {
  return promptRegistry.find((item) => item.agentName === agentName && item.active);
}

export function getPromptVersionById(id: string) {
  return promptRegistry.find((item) => item.id === id);
}

export function registerPromptVersion(prompt: PromptVersion) {
  promptRegistry.push({
    ...prompt,
    createdAt: new Date().toISOString()
  });
  return prompt;
}

export function setActivePrompt(agentName: string, id: string) {
  for (const entry of promptRegistry) {
    if (entry.agentName !== agentName) continue;
    entry.active = entry.id === id;
  }
  return getActivePrompt(agentName);
}

export function rollbackPrompt(agentName: string) {
  const versions = promptRegistry
    .filter((item) => item.agentName === agentName)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  if (versions.length < 2) {
    return versions[0];
  }
  const previous = versions[1];
  return setActivePrompt(agentName, previous.id);
}
