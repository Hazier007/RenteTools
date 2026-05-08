# CAL-606 P1 Baseline Export Contract (GrowthOps)

Date: 2026-05-08
Owner: GrowthOps (Monetization & Revenue Operations)
Status: Active unblock contract

## Why this exists
Baseline validation is currently blocked because P1 data packs are missing. Without these exports, we cannot calculate reliable `RPV`, `RPM`, affiliate `CTR/CVR/EPC`, or make go/no-go decisions on pilots.

## Scope
This contract defines exactly what each P1 site owner must deliver so Analyst + GrowthOps can finalize baseline and lock pilot pages.

P1 sites:
1. interesten (RenteTools)
2. huurrendementcalculator
3. registratiekosten
4. btw-calculator
5. kmvergoeding
6. goedkoopstroom

## Reporting window
- Last 56 full days
- Timezone: Europe/Brussels
- Aggregation: daily

## Required export packs per P1 site

### A) GA4 export (CSV)
Required columns:
- `date`
- `landing_page`
- `sessions`
- `users`
- `engaged_sessions`
- `avg_engagement_time_seconds`
- `device_category`
- `source_medium`

### B) AdSense export (CSV)
Required columns:
- `date`
- `page_path` (or URL)
- `ad_unit_name` (if available)
- `impressions`
- `clicks`
- `ctr`
- `estimated_earnings_eur`
- `page_rpm`

### C) Affiliate export(s) (CSV, per network)
Required columns:
- `date`
- `program_name`
- `campaign_id`
- `clicks`
- `conversions`
- `commission_eur`
- `status` (approved/pending/rejected)
- `subid` or `placement_id` (if available)

### D) Lead-gen export (CSV, if applicable)
Required columns:
- `date`
- `partner_name`
- `leads_sent`
- `leads_accepted`
- `leads_rejected`
- `payout_eur`
- `revenue_eur`

## Data quality acceptance checks
A pack is accepted only when:
- Full 56-day window is present (no partial date range)
- All required columns are included
- Currency values are in EUR
- Date format is consistent (YYYY-MM-DD)
- No mixed site data in a single file

## File naming convention
Use this exact naming pattern:
- `{site}_ga4_56d_YYYY-MM-DD.csv`
- `{site}_adsense_56d_YYYY-MM-DD.csv`
- `{site}_{network}_affiliate_56d_YYYY-MM-DD.csv`
- `{site}_leadgen_56d_YYYY-MM-DD.csv`

Example:
- `interesten_ga4_56d_2026-05-08.csv`

## Delivery SLA
- P1 target deadline: 2026-05-12 (end of day Europe/Brussels)

## After delivery (GrowthOps actions)
Within 24h after all P1 packs are valid:
1. Compute baseline KPI table per site (`RPV`, `RPM`, `CTR`, `CVR`, `EPC`)
2. Select first 3 pilot pages with highest commercial intent
3. Publish pilot launch brief with guardrails (UX/CWV/policy)

## Escalation rule
If P1 packs are still incomplete after 2026-05-12:
- Mark status as blocked
- Escalate to board with missing owner/site matrix
- Freeze new monetization launches until baseline is complete
