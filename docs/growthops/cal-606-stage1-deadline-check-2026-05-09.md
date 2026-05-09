# CAL-606 Stage-1 Deadline Check

Date: 2026-05-09
Owner: GrowthOps
Related: #41, #42, #43, #47

## Stage-1 SLA target
- Deadline: 2026-05-09 18:00 Europe/Brussels (CEST, UTC+2)
- Required sites: `interesten`, `huurrendementcalculator`, `goedkoopstroom`

## Data visibility check (repo-level)
Repository check performed on `Hazier007/RenteTools` for expected export naming patterns:
- `ga4_56d`
- `adsense_56d`
- `_affiliate_56d_`
- `leadgen_56d`

Result at this check: **no matching export files found in repository**.

Note:
- This check only validates what is available in-repo.
- If exports were shared outside repo (mail/drive/private attachments), they still need to be registered and validated against the contract before stage-1 can be marked complete.

## Stage-1 readiness matrix
- `interesten` — status: pending
- `huurrendementcalculator` — status: pending
- `goedkoopstroom` — status: pending

## Go/no-go rule at deadline
If complete valid stage-1 packs are not registered by 2026-05-09 18:00 CEST:
1. Keep #41/#42/#47 in blocked state
2. Trigger escalation with missing owner/site matrix
3. Move pilot launch window to next feasible slot after data intake

## Immediate next action
- Board + site owners: deliver/confirm stage-1 export packs and location reference
- GrowthOps: run 24h intake sprint immediately after valid handoff
