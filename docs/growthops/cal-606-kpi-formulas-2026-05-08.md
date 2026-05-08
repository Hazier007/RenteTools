# CAL-606 KPI Formula Sheet

Date: 2026-05-08
Scope: Baseline + pilot measurement for monetization decisions

## Revenue KPIs
- `Total Revenue (€) = AdSense Revenue + Affiliate Revenue + Leadgen Revenue`
- `RPV (€) = Total Revenue / Sessions`
- `Revenue per 1,000 sessions (€) = (Total Revenue / Sessions) * 1000`

## AdSense KPIs
- `Page RPM (€) = (AdSense Revenue / Pageviews) * 1000`
- `Ad CTR (%) = Clicks / Impressions * 100`
- `Ad Revenue Share (%) = AdSense Revenue / Total Revenue * 100`

## Affiliate KPIs
- `Affiliate CTR (%) = Affiliate Outbound Clicks / Sessions * 100`
- `Affiliate CVR (%) = Conversions / Affiliate Outbound Clicks * 100`
- `EPC (€) = Affiliate Revenue / Affiliate Outbound Clicks`
- `Affiliate Revenue per 1,000 sessions (€) = (Affiliate Revenue / Sessions) * 1000`

## Lead-gen KPIs
- `Lead Submit Rate (%) = Leads Submitted / Sessions * 100`
- `Lead Acceptance Rate (%) = Leads Accepted / Leads Submitted * 100`
- `Revenue per Accepted Lead (€) = Leadgen Revenue / Leads Accepted`
- `Leadgen Revenue per 1,000 sessions (€) = (Leadgen Revenue / Sessions) * 1000`

## Experiment uplift calculations
- `Absolute Uplift = Test Metric - Control Metric`
- `Relative Uplift (%) = (Test - Control) / Control * 100`

## Guardrail KPIs (must remain stable)
- `Engagement time` (no material deterioration)
- `Bounce/engagement rate` (no material deterioration)
- `Core Web Vitals (LCP/INP/CLS)` (no regression beyond agreed noise band)

## Decision rules (default)
- Scale winner when:
  - Relative uplift on primary KPI >= 10%
  - Guardrails pass
  - Result is consistent for minimum 14 days
- Stop/rework when:
  - Uplift < 0
  - Or guardrail breach is observed

## Notes
- Always compare same traffic mix window (weekday/weekday, device split stable)
- Keep consent-policy scope identical between control and test variants
