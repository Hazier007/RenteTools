# CAL-606 Stage-1 Missing Pack Escalation Matrix

Date: 2026-05-10  
Owner: GrowthOps  
Context: Stage-1 remains blocked until missing export packs are delivered and validated.

## 1) Sites still missing (stage-1)

1. `interesten` (RenteTools)
2. `huurrendementcalculator`
3. `goedkoopstroom`

## 2) Minimum required files per missing site

- `ga4.csv`
- `adsense.csv`
- `affiliate.csv`
- `leadgen.csv` (or header-only if not applicable)

Schema reference:
- `docs/growthops/cal-606-baseline-export-pack-template-2026-05-10.md`

## 3) Escalation matrix

| Site | Unblock owner | Hard deadline | Escalation if missed | GrowthOps action after arrival |
|---|---|---|---|---|
| interesten | Board + site owner | 2026-05-12 18:00 Europe/Brussels | escalate in #42 + direct mail reminder | validate within 2h, include in baseline batch |
| huurrendementcalculator | Board + site owner | 2026-05-12 18:00 Europe/Brussels | escalate in #42 + direct mail reminder | validate within 2h, include in baseline batch |
| goedkoopstroom | Board + site owner | 2026-05-12 18:00 Europe/Brussels | escalate in #42 + direct mail reminder | validate within 2h, include in baseline batch |

## 4) Validation SLA after handoff

1. Format/schema validation: <= 2h after receipt.
2. Baseline KPI rollup update: <= 24h after first complete P1 batch.
3. Pilot lock-in handoff (#47): immediately after validated baseline.

## 5) No-go rule

If one or more of the 3 missing stage-1 packs are still missing at cutoff:
- Keep partnerpilot in blocked state.
- Publish explicit no-go rationale with owner/action in #42.
- Re-open data handoff window with next concrete cutoff timestamp.
