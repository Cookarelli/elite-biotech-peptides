# elite-growth-os

A production-ready growth operations system for EliteBiotechPeptides.com. This monorepo stitches together a Next.js dashboard, API surface, worker runtime, observability tooling, and modular agents that cover content planning, publishing, engagement, analytics, and product mapping while keeping humans in the loop.

## Tech stack
- **Monorepo** orchestrated via npm workspaces (`apps/*`, `packages/*`).
- **Apps**: Dashboard (Next.js 16), API (Express + Prisma), Worker (ts-node + cron-style ticks).
- **Packages**: Shared utilities, Prisma-backed DB helpers, agent contracts, platform adapters, prompt registry.
- **Database**: PostgreSQL via Prisma with schema/migrations for products, content ideas/assets, publish queue, analytics, prompt versions, engagement tasks, and agent runs.

## Repo layout
- `apps/dashboard` – internal admin cockpit for KPIs, approvals, prompts, and audit logs.
- `apps/api` – REST surface for queueing agent runs, fetching analytics, managing prompts, and exposing publish/engagement APIs.
- `apps/worker` – scheduled/background orchestrator for agent execution, analytics ingestion, and retry-safe queue polling.
- `packages/agents` – strongly typed agent contracts, run helpers, risk metadata, dry-run support.
- `packages/db` – Prisma client exports, typed seed helpers, and helpers for product/content lookups.
- `packages/platform-clients` – stubbed platform adapters that can be replaced by TikTok/IG/YT clients.
- `packages/prompt-registry` – utilities for prompt versioning, activation toggles, and rollbacks.
- `packages/shared` – pre-existing billing/catalog helpers shared with the storefront experience.
- `prisma` – schema + migrations for content, analytics, prompts, and audit logs.
- `scripts/seed-growth-os.ts` – sample seed data for products and content ideas.
- `docs/` – living documentation for architecture, agents, compliance, setup, and deployments.

## Getting started (local)
1. `npm install`
2. `cp .env.example .env.local`
3. `npm run db:generate`
4. `npm run db:push` (or `prisma migrate dev` if a dev database is attached)
5. `npm run seed`
6. Run the apps you need:
   - `npm run dashboard:dev`
   - `npm run api:dev`
   - `npm run worker:dev`

## Key scripts
- `npm run dev` – legacy storefront dev server.
- `npm run dashboard:dev` – growth ops dashboard.
- `npm run api:dev` – Express API for queues and prompts.
- `npm run worker:dev` – long-running worker tick.
- `npm run seed` – seed products + content ideas into the new schema.
- `npm run lint` – repo linting (includes dashboard + api directories).
- `npm run db:*` – Prisma helpers.

## Environment variables
Keep `.env.local` out of source control and populate the list below:

| Name | Description |
| --- | --- |
| `DATABASE_URL` | Postgres URL used by Prisma (read-write). |
| `DIRECT_URL` | Dedicated URL for Prisma CLI tasks if different (migration/seed). |
| `SUPABASE_URL` | Optional Supabase project for ingest/analytics streaming. |
| `SUPABASE_ANON_KEY` | Supabase anon key for dashboard reads (if used). |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional browser-safe Supabase project URL for dashboard integrations. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | Optional browser-safe Supabase publishable key. |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key for worker writes/ingestion. |
| `NEXT_PUBLIC_SITE_URL` | Public storefront URL (used by prompts for canonical links). |
| `NEXT_PUBLIC_COMPANY_NAME` | Brand name for UI/analytics contexts. |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Support email for dashboards/alerts. |
| `NEXT_PUBLIC_PROCUREMENT_EMAIL` | Procurement contact referenced by content/product teams. |
| `GROWTH_API_PORT` | Express API port (defaults to `4000`). |
| `GROWTH_API_KEY` | Optional key to authenticate internal automation calls. |
| `WORKER_INTERVAL_MS` | Milliseconds between worker ticks (default `60000`). |
| `WORKER_LOG_LEVEL` | Worker logger level (`info`, `warn`, `debug`). |
| `HUMAN_APPROVER_EMAILS` | CSV of allowed approvers for risky content. |
| `PAYPAL_*`, `RESEND_*`, `TWILIO_*` | Existing commerce/notification keys retained for the storefront.

Notes:
- Prisma now auto-loads `.env.local` and `.env` from the repo root, so `npm run db:push` works without manual `export` commands.
- If your database password contains characters like `@`, `%`, `!`, `:` or `/`, URL-encode it inside `DATABASE_URL` and `DIRECT_URL`.

## Documentation & processes
- [`docs/architecture.md`](./docs/architecture.md) – data flow, observability, approval gates.
- [`docs/agent-responsibilities.md`](./docs/agent-responsibilities.md) – each agent, inputs, outputs, test fixtures.
- [`docs/risk-compliance.md`](./docs/risk-compliance.md) – policy-safe tactics, approval steps, audit logging.
- [`docs/local-setup.md`](./docs/local-setup.md) – developer onboarding + fixture guidance.
- [`docs/deployment-notes.md`](./docs/deployment-notes.md) – production checklist, database/perf notes.

## Observability & governance
- All runs are persisted via `agent_runs` and reference active `prompt_versions` to support audits, rollback, and dry-run reviews.
- Publishing queue rows capture platform, scheduled date, external IDs, failure metadata, and human approval metadata before dispatch.
- Engagement drafts are scored/risk-rated and blocked from approval until a compliance check passes.
- Analytics imports feed daily rollups, top hook/product/platform reports, and underperforming content alerts so humans steer content adjustments.

For more detail on responsibilities, compliance boundaries, and deployment notes follow the docs directory above.
