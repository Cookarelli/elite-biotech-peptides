# Local setup

## Prerequisites
- Node.js 20.x (match `engines` that the repo already targets).
- PostgreSQL or Supabase (use `DATABASE_URL`/`DIRECT_URL`).
- `npm` or `corepack` available via the workspace root.

## Bootstrap
1. `npm install`
2. `cp .env.example .env.local` (and fill in secrets / Supabase keys).
3. `npm run db:generate`
4. `npm run db:push` (or `prisma migrate dev --name init` when a test database is attached).
5. `npm run seed` (seeds sample products & content ideas for product mapping demos).

## Platform credentials
- Instagram publishing/insights: set `INSTAGRAM_ENABLED=true`, `INSTAGRAM_ACCESS_TOKEN`, and `INSTAGRAM_IG_USER_ID`.
- YouTube publishing/analytics: set `YOUTUBE_ENABLED=true`, `YOUTUBE_ACCESS_TOKEN`, and `YOUTUBE_CHANNEL_ID`.
- TikTok publishing/analytics: set `TIKTOK_ENABLED=true` and `TIKTOK_ACCESS_TOKEN`.
- The worker keeps adapters in a blocked-safe state until those values exist and queue rows are human approved.
- YouTube publishing expects a local upload path in `publish_queue.attemptDetails.sourceFilePath`; Instagram and TikTok can pull from a public `mediaUrl`.

## Running services
- Dashboard: `npm run dashboard:dev`
- API: `npm run api:dev`
- Worker (background): `npm run worker:dev`

Each service loads `.env.local`, so variables like `WORKER_INTERVAL_MS` and `GROWTH_API_KEY` can be tuned per environment.

## Fixtures & tests (work in progress)
- `packages/agents` should include fixture files under `__fixtures__` or `__tests__` for each agent name so dry-run behavior can be verified.
- `packages/db` exposes `seedProducts` and `seedContentIdeas` helpers that the worker/tests can reuse.
