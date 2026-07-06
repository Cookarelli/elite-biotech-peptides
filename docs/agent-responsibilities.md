# Agent responsibilities

| Agent | Input | Output | Risk controls / notes |
| --- | --- | --- | --- |
| **content-planner** | Platform briefs, product inventory, previous idea performance | Content idea records tied to product slugs, platform, risk score | Requires approval before pushing to publish queue; references prompt_versions agent-run log; dry runs stored for reviewer comments |
| **script-writer** | Approved content idea, tone guide, product mapping | Draft script/caption with CTA, SEO hooks, compliance flags | Must respect human-provided prompt versions; stops if compliance-checker returns risk >= 7 | 
| **product-mapper** | Content idea + product catalog | Assignment to product page or collection, canonical URL, angle text | Verifies product slug exists; writes mapping to `content_assets`; includes confidence metadata |
| **publisher** | Approved queue item, platform schedule | Platform publish request, stubbed adapter invocation, external ID | Works through `packages/platform-clients`; logs failures, respects rate limits, no mass unsolicited outreach |
| **engagement-assistant** | Inbound conversation metadata | Reply/comment/DM drafts with approval_required flag, risk_score | Comments limited to inbound replies; DMs only for existing inbound threads; compliance checks must pass before approval |
| **analytics-summarizer** | `analytics_daily` rollups, platform metrics | Top hook/product/platform reports, underperforming content callouts | Stores derived tables/indicators for dashboard; backward-looking data only |
| **compliance-checker** | Draft text, queue item, risk profile | Boolean `complianceCheckPassed`, notes, severity score | Flagged runs require human approver tick; references global policy doc; no automation for spammy patterns |

## Testing guidance
- Each agent module should include fixtures under `packages/agents/__tests__` (not yet created) to verify input/output shape and risk gating.
- Dry-run mode should be exercised via mocked `prompt_versions` entries and `agent_runs` logging.
- Compliance-checker should run before `publisher` and `engagement-assistant` moves from `pending` to `approved`.
