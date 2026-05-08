# CAL-606 Fast-Lane: 24h Intake Sprint Runbook

Date: 2026-05-08
Owner: GrowthOps
Issue: #47
Parents: #41, #42

## Objective
When fast-lane P1 data arrives, complete intake -> pilot lock-in -> cross-functional handoff within 24 hours.

## Activation trigger
Sprint starts when all Stage-1 packs are delivered and pass data-quality checks:
- interesten
- huurrendementcalculator
- goedkoopstroom

## 0-24h execution timeline

### H+0 to H+2: Intake + QC
- Validate files against export contract (`cal-606-p1-export-contract-2026-05-08.md`)
- Confirm 56-day window, required columns, EUR currency, date format
- Log missing fields and reject invalid packs immediately

### H+2 to H+8: Baseline computation
- Compute per-site baseline:
  - `RPV`
  - `RPM`
  - affiliate `CTR`
  - affiliate `CVR`
  - `EPC`
- Fill weekly rollup template (`templates/cal-606-weekly-kpi-rollup-template.csv`)
- Flag any metric with unreliable denominator (low sample warnings)

### H+8 to H+14: Pilot page lock-in
Select 3 pilot pages (1 per vertical):
- Finance page candidate from `interesten`
- Mobility page candidate from `huurrendementcalculator` (or mapped mobility-intent page)
- Energy page candidate from `goedkoopstroom`

Selection criteria (ranked):
1. Commercial intent strength
2. Session volume sufficiency
3. Existing UX stability (low CWV risk)
4. Partner relevance fit

### H+14 to H+20: Partner short-list freeze
Freeze max 3 partners (phase 1):
- 1 primary + 1 fallback per vertical
- Include risk flags:
  - tracking reliability risk
  - policy/disclosure risk
  - conversion friction risk

### H+20 to H+24: Handoff package
Publish one handoff block for CTO/CMO/UXDesigner containing:
- Final pilot pages + rationale
- Variant labels (`cta_variant`, `placement_id`)
- Disclosure requirements per partner type
- Guardrails (CWV + engagement + policy)
- Go-live readiness status

## Deliverables checklist
- [ ] 24h baseline snapshot for stage-1 sites
- [ ] 3 final pilot pages locked
- [ ] Partner shortlist frozen (max 3)
- [ ] Handoff package posted for CTO/CMO/UXDesigner

## Guardrails
- No launch without consent-safe tracking
- No launch without disclosure copy in place
- No scope expansion beyond first 3 pilots before first 14-day readout

## Escalation path
If sprint cannot close inside 24h:
- Mark blocker with owner + missing input
- Escalate in #47 and #41 immediately
- Keep pilot scope frozen (no ad-hoc additions)
