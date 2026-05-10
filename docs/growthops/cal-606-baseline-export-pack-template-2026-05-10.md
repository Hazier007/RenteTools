# CAL-606 Baseline Export Pack Template

Date: 2026-05-10  
Owner: GrowthOps  
Applies to: P1 first (`interesten`, `huurrendementcalculator`, `registratiekosten`, `btw-calculator`, `kmvergoeding`, `goedkoopstroom`), then P2/P3

## 1) Doel

Standaardiseer de data-aanlevering zodat baseline-berekening direct kan starten zonder extra mappingrondes.

## 2) Verwachte mapstructuur

Gebruik exact deze structuur per aanlevering:

`cal-606-export-pack/{site}/{source_file}.csv`

Voorbeeld:
- `cal-606-export-pack/interesten/ga4.csv`
- `cal-606-export-pack/interesten/adsense.csv`
- `cal-606-export-pack/interesten/affiliate.csv`
- `cal-606-export-pack/interesten/leadgen.csv`

## 3) Verplichte CSV schema's

### 3.1 `ga4.csv`
Header:
`date,landing_page,device,sessions,engaged_sessions`

Rules:
- `date`: `YYYY-MM-DD`
- `device`: `desktop|mobile|tablet`
- `sessions` en `engaged_sessions`: integers >= 0

### 3.2 `adsense.csv`
Header:
`date,page,ad_unit,impressions,clicks,estimated_revenue_eur`

Rules:
- `estimated_revenue_eur`: decimal met punt (`12.34`)
- `impressions`, `clicks`: integers >= 0

### 3.3 `affiliate.csv`
Header:
`date,partner,campaign,clicks,conversions,commission_eur,subid`

Rules:
- `partner`: bv. `tradetracker`, `daisycon`, `awin`
- `commission_eur`: decimal met punt
- `subid`: leeg toegestaan, maar kolom moet bestaan

### 3.4 `leadgen.csv` (indien van toepassing)
Header:
`date,partner,leads_sent,leads_approved,payout_eur`

Rules:
- Als site geen leadgen heeft: lever leeg bestand met alleen header
- `payout_eur`: decimal met punt

## 4) Databereik en filters

1. Per bestand: laatste 56 dagen.
2. Timezone: `Europe/Brussels`.
3. Geen geaggregeerde weektotalen in plaats van dagdata; dagdata is verplicht.

## 5) Snelle QA-check voor upload

1. Header exact gelijk aan template.
2. Geen extra kolommen.
3. Geen valuta-symbolen in numerieke velden (`EUR`, `€` niet toestaan).
4. Geen duizendtalseparatoren in cijfers (`1,234` niet toestaan).
5. Bestand opent correct als UTF-8.

## 6) Handoff note (verplicht meegeven)

Voeg 1 korte notitie toe bij de upload:

`site={site};owner={name};period_start={YYYY-MM-DD};period_end={YYYY-MM-DD};known_gaps={none|beschrijving}`

## 7) Wat GrowthOps doet na ontvangst

1. Schema-validatie en datacleaning.
2. Baselineberekening per P1 site: `RPV`, `CTR`, `CVR`, `EPC`, `RPM`.
3. Pilotpagina-selectie en TradeTracker campagne-mapping.
4. Board update met go/no-go en volgende 7-dagen acties.
