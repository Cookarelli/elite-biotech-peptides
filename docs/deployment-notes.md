# Deployment notes

## Production checklist
1. Ensure staging/prod Postgres URL is in `DATABASE_URL` and `DIRECT_URL` (read/write vs migration-only).
2. Run `prisma migrate deploy` before starting API/worker.
3. Activate required prompt versions via dashboard (each agent references active prompt before running).
4. Populate `HUMAN_APPROVER_EMAILS` with current marketing lead(s) so approvals route to the right inbox.
5. Configure Supabase (or analytics endpoint) so `WORKER` can write daily rollups and the dashboard can read them.

## Observability
- Worker logs include `WORKER_LOG_LEVEL` and tick-based instrumentation; push them into a centralized log sink (CloudWatch, Logflare, etc.).
- `agent_runs` records, prompt IDs, and `publish_queue.failures` should be surfaced to the dashboard or alerting tool for approvals and troubleshooting.
- Analytics ingestion should feed into `analytics_daily`, which is queried for KPI cards and `top_hook`/`underperforming content` insights.

## Safe growth guardrails in prod
- No automation should skip compliance: `publisher` and `engagement-assistant` entries remain in `pending` with `approval_required` until a human toggles `approved`.
- Failures in `publish_queue` increment `retry_count`; worker retries are exponential but never trigger undisclosed actions.
- For emergencies, rollback prompt versions via `packages/prompt-registry` and document the reverted ID in the approval log.
