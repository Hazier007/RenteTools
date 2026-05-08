# CAL-606 TradeTracker - Board To-Do Per Site

Date: 2026-05-08  
Owner: GrowthOps  
Scope: Portfolio monetization rollout after AdSense approvals

## 1) Wat ik nodig heb per site (minimum export pack)

Per site graag 1 map met deze 4 exports over de laatste 56 dagen:

1. `ga4.csv`
- `date`, `landing_page`, `device`, `sessions`, `engaged_sessions`

2. `adsense.csv`
- `date`, `page`, `ad_unit`, `impressions`, `clicks`, `estimated_revenue_eur`

3. `affiliate.csv`
- `date`, `partner`, `campaign`, `clicks`, `conversions`, `commission_eur`, `subid` (indien beschikbaar)

4. `leadgen.csv` (indien van toepassing)
- `date`, `partner`, `leads_sent`, `leads_approved`, `payout_eur`

## 2) Per-site board checklist

Legenda prioriteit:
- `P1` = eerst in TradeTracker pilot
- `P2` = na validatie pilot
- `P3` = alleen schalen als EPC positief blijft

| Site | Repo | Prioriteit | Monetization focus | Wat ik nu nodig heb | Status |
|---|---|---|---|---|---|
| interesten.be | RenteTools | P1 | Finance affiliate + lead gen + AdSense | volledige 4-file export pack + top 20 URLs met hoogste intent | Waiting on board |
| huurrendementcalculator.be | huurrendementcalculator | P1 | Finance/real-estate affiliate + AdSense | volledige 4-file export pack | Waiting on board |
| registratiekosten.be | registratiekosten | P1 | Finance/mortgage referral + AdSense | volledige 4-file export pack | Waiting on board |
| btw-calculator.be | btw-calculator | P1 | Finance/business tools affiliate + AdSense | volledige 4-file export pack | Waiting on board |
| kmvergoeding.be | kmvergoeding | P1 | Mobility affiliate + AdSense | volledige 4-file export pack | Waiting on board |
| loonberekening.be | loonberekening | P2 | Finance/payroll affiliate + AdSense | volledige 4-file export pack | Waiting on board |
| goedkoopstroom.be | goedkoopstroom | P1 | Energy lead gen + affiliate + AdSense | volledige 4-file export pack + huidige energie-partnerdata | Waiting on board |
| iban-validator.be | iban-validator | P2 | Utility + light affiliate + AdSense | minimaal `ga4.csv` + `adsense.csv`, plus affiliate indien aanwezig | Waiting on board |
| datumberekenen.be | datumberekenen | P3 | Utility/SEO + AdSense first | minimaal `ga4.csv` + `adsense.csv` | Waiting on board |
| kleurcodes.be | kleurcodes | P3 | Utility/SEO + AdSense first | minimaal `ga4.csv` + `adsense.csv` | Waiting on board |
| zwangerschapscalculator.be | zwangerschapscalculator | P2 | Family vertical (lead gen test) + AdSense | volledige 4-file export pack (leadgen optioneel) | Waiting on board |
| buitendrogen.be | buitendrogen | P3 | Seasonal utility + AdSense first | minimaal `ga4.csv` + `adsense.csv` | Waiting on board |
| airfryertijden.be | airfryertijden | P3 | Content affiliate + AdSense | volledige 4-file export pack (affiliate focus) | Waiting on board |

## 3) Board acties deze week

1. Eigenaar per site bevestigen (1 persoon die exports aanlevert).
2. Voor elke site de 56-dagen export pack uploaden (zelfde schema als hierboven).
3. P1 sites eerst aanleveren: `interesten`, `huurrendementcalculator`, `registratiekosten`, `btw-calculator`, `kmvergoeding`, `goedkoopstroom`.
4. P2/P3 sites binnen 3 werkdagen daarna.

## 4) Wat ik direct doe zodra P1 pack binnen is

1. Baseline benchmark per P1 site berekenen: `RPV`, affiliate `CTR`, `CVR`, `EPC`, channel `RPM`.
2. TradeTracker campagne shortlist per P1 site mappen (finance/energy/mobility fit).
3. Pilot livezetten op 3 hoog-intent pagina's met guardrails uit de runbook.
4. Eerste weekly board report posten met go/no-go per site cluster.

## 5) Daisycon update - extra taken

1. Bevestig dat alle P1 sites correct gekoppeld zijn in het Daisycon publisher-account.
2. Deel per P1 site de tracking-aanpak (`subid`-conventie + placement mapping).
3. Selecteer per vertical minimaal 3 actieve campagnes (finance, energy, mobility).
4. Lever per campagne de kernvoorwaarden: payout model, cookie window, reversal policy.
5. Markeer campagnes met compliance-risico of beperkte claim-toestemming vooraf.

## 6) Communication cadence

1. Board ontvangt een wekelijkse mail-samenvatting met open taken en blockers.
2. Ad-hoc update per mail zodra P1 baseline compleet is.
3. Elke mail bevat expliciet: owner, deadline, afhankelijkheid, volgende actie.

## 7) Definition of done voor deze fase

- Voor alle 13 sites staat de export pack compleet.
- Voor alle P1 sites staat baseline berekend en pilot-ready.
- Board kan op data beslissen welke P2/P3 sites versneld worden opgeschaald.
