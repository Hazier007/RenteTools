# CAL-606 Fast-Lane 24h Execution Playbook

Date: 2026-05-10  
Owner: GrowthOps  
Trigger: first complete and valid stage-1 data handoff for P1 sites

## 1) Doel

Binnen 24 uur na geldige stage-1 intake:
1. baseline valideren
2. pilotpagina's locken
3. partnerpilot handoff starten zonder extra wachtronde

## 2) Trigger criteria (go signal)

Alle onderstaande voorwaarden moeten true zijn:

1. P1 export packs ontvangen voor:
- `interesten`
- `huurrendementcalculator`
- `goedkoopstroom`

2. Files aanwezig per site:
- `ga4.csv`
- `adsense.csv`
- `affiliate.csv`
- `leadgen.csv` (of header-only indien n/a)

3. Schema-validatie geslaagd volgens:
- `docs/growthops/cal-606-baseline-export-pack-template-2026-05-10.md`

## 3) T+0 tot T+24 timeline

### T+0h - T+2h: Intake + QA gate

1. Controleer headers, datums, numerieke velden, missing columns.
2. Log per site: `valid|invalid` + foutoorzaak.
3. Als invalid: immediate correction request met concrete fixlist.

Output:
- intake verdict per site
- corrected re-upload request (indien nodig)

### T+2h - T+8h: Baseline calculation

1. Bereken per site:
- `RPV = total_revenue / sessions`
- `Affiliate CTR = affiliate_clicks / sessions`
- `Affiliate CVR = conversions / affiliate_clicks`
- `EPC = affiliate_revenue / affiliate_clicks`
- `RPM = (revenue / sessions) * 1000`

2. Split per device en top landing pages.

Output:
- baseline table per P1 site
- top 3 candidate pages per site voor pilot

### T+8h - T+16h: Pilot lock-in decision

1. Selecteer 3 pilotpagina's (hoogste intent, stabiel verkeer).
2. Match per pagina 1 primaire partnerflow.
3. Definieer per pagina:
- CTA variant
- placement id
- guardrails (UX/SEO/compliance)

Output:
- lock-in matrix: page x partner x CTA x tracking

### T+16h - T+24h: Launch handoff

1. Publiceer handoff note voor implementatieflow (#47).
2. Zet go/no-go per pagina op basis van baseline confidence.
3. Plan first 7-day checkpoint met exact KPI slice.

Output:
- implementation-ready handoff
- first checkpoint agenda

## 4) Hard stop conditions

Stop fast-lane en blijf blocked als:

1. Minstens 1 van de 3 stage-1 sites geen geldig pack heeft.
2. Affiliate data incompleet is voor baseline CTR/CVR/EPC.
3. Consent/compliance context ontbreekt voor pilot pages.

## 5) Reporting format

Gebruik dit vaste format in issue updates:

1. `Input status:` complete|partial|invalid
2. `Baseline status:` done|in progress|blocked
3. `Pilot lock-in status:` done|in progress|blocked
4. `Unblock owner/action:` expliciet met datum/tijd

## 6) Link met actieve dependencies

- Baseline dependency: #43
- Fast-lane lock-in dependency: #47
- Current parent issue: #42
