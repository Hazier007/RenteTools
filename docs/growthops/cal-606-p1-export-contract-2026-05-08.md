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

## Delivery SLA (staged)
### Stage 1: Fast-lane pilot intake
- Deadline: **2026-05-09 18:00 Europe/Brussels (CEST, UTC+2)**
- Required sites for stage 1:
  1. interesten
  2. huurrendementcalculator
  3. goedkoopstroom

### Stage 2: Full P1 completion
- Deadline: **2026-05-12 end of day Europe/Brussels**
- Required sites: all 6 P1 sites

## After delivery (GrowthOps actions)
### After stage 1 (within 24h)
1. Compute provisional baseline for 3 fast-lane sites (`RPV`, `RPM`, `CTR`, `CVR`, `EPC`)
2. Lock first 3 pilot pages and variants
3. Publish pilot handoff brief for implementation lanes

### After stage 2 (within 24h)
1. Compute complete P1 baseline table for all 6 sites
2. Re-rank pilot rollout priority on full data
3. Publish board-ready baseline snapshot + next rollout actions

## Escalation rule
- If stage 1 is missed (after 2026-05-09 18:00 CEST), escalate risk of next-week pilot window loss.
- If stage 2 is missed (after 2026-05-12 EOD), mark status blocked and freeze new monetization launches until baseline is complete.
