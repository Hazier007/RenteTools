# CAL-606 Stage-1 Cutoff Decision Template

Date: 2026-05-09
Cutoff: 18:00 Europe/Brussels (CEST, UTC+2)
Owner: GrowthOps
Related: #41, #42, #43, #47

## Purpose
Provide a zero-latency decision path at cutoff time:
- Path A: data complete -> activate 24h fast-lane
- Path B: data incomplete -> escalate and keep blocked state

## Cutoff checklist
At 18:00 CEST, verify for stage-1 sites (`interesten`, `huurrendementcalculator`, `goedkoopstroom`):
- [ ] Files delivered and location referenced
- [ ] 56-day window present
- [ ] Required columns present (GA4/AdSense/Affiliate/Leadgen as applicable)
- [ ] Date format and EUR checks pass

## Path A (Go): stage-1 complete
If all checks pass:
1. Post activation update on #41 and #47
2. Start 24h intake sprint immediately (runbook in `cal-606-24h-intake-sprint-2026-05-08.md`)
3. Notify #43 that baseline intake is in progress

Suggested status line:
- `✅ stage-1 complete, fast-lane activated, 24h handoff ETA: <timestamp +24h>`

## Path B (No-Go): stage-1 incomplete
If one or more checks fail:
1. Keep #41/#42/#43/#47 in blocked state
2. Post missing owner/site matrix
3. Escalate pilot-window risk to board

Missing matrix format:
- `site`
- `missing_pack_type` (GA4 / AdSense / Affiliate / Leadgen)
- `missing_or_invalid_reason`
- `owner`
- `new_expected_delivery`

Suggested status line:
- `🚧 blocked — stage-1 incomplete at cutoff; escalation triggered with missing matrix`

## Next-day recovery rule
If Path B triggered:
- First action next business hour: collect committed delivery times per missing item
- Recompute earliest feasible pilot lock-in window
- Post revised ETA on #41 + #47
