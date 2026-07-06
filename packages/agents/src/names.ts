import { z } from 'zod';

export const agentNameSchema = z.enum([
  'content-planner',
  'script-writer',
  'product-mapper',
  'publisher',
  'engagement-assistant',
  'analytics-summarizer',
  'compliance-checker'
]);
