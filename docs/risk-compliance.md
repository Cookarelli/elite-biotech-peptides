# Risk & compliance boundaries

## Human-in-the-loop philosophy
- Every agent run is logged under `agent_runs` with prompt version, dry-run flag, and risk flags so reviewers can inspect decisions.
- High-risk rows (risk score >= 7) stay in `content_ideas`/`publish_queue` until an approver listed in `HUMAN_APPROVER_EMAILS` sets the approval flag.
- Publication or engagement drafts explicitly show `approval_required`, `complianceCheckPassed`, and `approved_by` fields before any outgoing action.

## Disallowed patterns
- No mass unsolicited DMs or comment spam. Engagement drafts only trigger in response to inbound conversations.
- No blind outbound link dropping; every content idea maps to a product page or approved collection before being scheduled.
- No automated rate-limit evasion; failures are recorded in `publish_queue.failures` with retry-safe logic.

## Guardrails
- `compliance-checker` reviews scripts, captions, and engagement drafts for policy violations before `publisher` or `engagement-assistant` escalates to `approved`.
- `prompt_versions` must be actively toggled by a human reviewer (UI has activation toggle and rollback helpers) so prompts cannot drift unnoticed.
- Audit logs capture `agent_runs`, `approval_decisions`, and `prompt_versions` references for every publish/engagement event so one can trace decisions back to prompts and approvals.
- Platform adapters stay blocked until the queue row is both `approvalDecision=approved` and `complianceCheckPassed=true`; blocked rows remain pending and are logged with human-readable reasons instead of being force retried.
- Real platform publishing requires first-party credentials only. The system does not implement rate-limit evasion, scraping workarounds, cookie theft, mass posting shortcuts, or unaudited bypasses for Instagram, TikTok, or YouTube APIs.
