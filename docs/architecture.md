# Growth OS architecture

1. **Dashboard (apps/dashboard)**
   - Next.js 16 / App Router for KPIs, prompt versions, agent audit logs, queue management, and approval flows.
   - Talks to the API (internal `GROWTH_API_KEY` authentication) to fetch content ideas, publishing queues, agent runs, and analytics rollups.

2. **API service (apps/api)**
   - Express + Zod guards: exposes health, metrics, prompt-run intake, publish queue mutations, engagement drafts, and analytics summaries.
   - Connects to Prisma client in `packages/db` (which implements typed helpers for products, content ideas/assets, publish queue rows, engagement tasks, analytics, agent runs, prompt versions).
   - Stores platform-specific metadata, approval timestamps, and audit references (prompt version IDs, risk flags).

3. **Worker (apps/worker)**
   - Responsible for scheduling agent modules (`packages/agents`) via pluggable runners (script writer, product mapper, etc.).
   - Reads active prompt version IDs from `packages/prompt-registry` and logs executions to `agent_runs` with dry-run support.
   - Polls publishing queue and engagement drafts, performing retry-safe logic with failure counters, approval/compliance gates, external IDs, and structured queue event logs.
   - Streams analytics events (views, CTR, revenue) into `analytics_daily`, `top_hook_report`, and other rollups via typed ingestion adapters for Instagram, TikTok, and YouTube.

4. **Shared packages**
   - `packages/agents`: defines agent names, inputs/outputs, risk flags, dry-run toggles, and auditing helpers that record runs to `agent_runs`.
   - `packages/platform-clients`: contains credential-aware publishing and analytics adapters for Instagram, TikTok, and YouTube, with safe fallbacks whenever approval or configuration is incomplete.
   - `packages/prompt-registry`: stores prompt versions, activation toggles, rollback helpers, and is referenced by both API (for UI) and worker (for execution reviews).
   - `packages/db`: central Prisma client instance, typed helpers, and seed utilities for `products`, `content_ideas`, `content_assets`, `publish_queue`, `engagement_tasks`, `analytics_daily`, `agent_runs`, and `prompt_versions`.

5. **Database**
   - PostgreSQL schema enforces normalized tables for product mappings, content assets, publish scheduling, engagement tasks, prompt versions, analytics, and agent runs.
   - Indexes cover frequent queries for `status`, `platform`, `createdAt`, and `productSlug` to keep dashboards performant.
   - `prisma/migrations` (SQL) capture schema changes for audit and rollback.

6. **Observability, audit logs, compliance**
   - Every agent run references an active `prompt_version` and writes metadata to `agent_runs` for printing execution intent and artifacts.
   - Publishing queue and engagement tasks include `approvalRequired`, `approvalDecision`, `riskScore`, and `complianceCheckPassed` fields so UI gates risky actions.
   - Analytics ingestion writes daily rollups (`analytics_daily`) and highlights (`top hooks/products/platforms`, `underperforming_content`) so humans adjust strategy with data proof.
