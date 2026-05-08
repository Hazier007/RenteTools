# CAL-606 TradeTracker Pilot Runbook

Date: 2026-05-08  
Owner: GrowthOps (Monetization & Revenue Operations)  
Scope: Belgian calculator portfolio (13+ sites)

## 1) Objective

Launch and validate TradeTracker as an incremental affiliate revenue channel without harming UX, SEO, AdSense compliance, or GDPR posture.

Primary business outcome:
- Increase affiliate revenue contribution to portfolio MRR with a repeatable rollout playbook.

Primary measurement outcome:
- Produce reliable baseline + pilot deltas for CTR, CVR, EPC, and revenue per 1,000 sessions.

## 2) Why TradeTracker for this portfolio

Based on TradeTracker Belgium/NL publisher documentation and pages:
- TradeTracker states it has **500+ online advertisers in Belgium**.
- Publisher-side capabilities include **campaign search, deep linking, widgets/tools, API access, and real-time reporting**.
- Multi-site management and dashboard-level reporting are available, relevant for a portfolio setup.

Operational implication:
- Fit is strongest for our cross-site calculator model because campaign discovery + deep links + multi-site reporting can be standardized and reused.

## 3) Baseline first (must complete before reading pilot impact)

Baseline window: last 56 days.

Required baseline dataset (weekly + page-level):
- Sessions by URL (and device split)
- Existing affiliate outbound clicks by URL and placement
- Affiliate conversions and revenue by partner
- Revenue per visitor (RPV) by site and portfolio aggregate
- Revenue per 1,000 sessions (channel-level)

Core formulas:
- `RPV = total_revenue / sessions`
- `Affiliate CTR = affiliate_clicks / sessions`
- `Affiliate CVR = conversions / affiliate_clicks`
- `EPC = affiliate_revenue / affiliate_clicks`
- `Affiliate RPM_sessions = (affiliate_revenue / sessions) * 1000`

Data model (minimum fields):
- `date_week`
- `site`
- `url`
- `device`
- `sessions`
- `affiliate_clicks`
- `affiliate_conversions`
- `affiliate_revenue_eur`
- `affiliate_partner`
- `placement_id`
- `cta_variant`

## 4) Pilot design (14 days)

### Pilot pages (start narrow)
Choose 3 calculators with highest commercial intent and stable traffic:
- Finance intent page (e.g., lending/savings comparison)
- Energy savings page
- Mobility cost page

### Experiment A: Result-state CTA module
Hypothesis:
- Adding a contextual affiliate CTA directly under calculator results increases affiliate CTR by >= 20%.

Primary KPI:
- Affiliate CTR

Guardrails:
- No significant drop in engagement rate (>3% relative)
- No significant increase in bounce/quick back behavior
- No Core Web Vitals regression (especially CLS/INP)

### Experiment B: Deep-link precision
Hypothesis:
- Deep-linking to product-relevant landing pages improves CVR vs generic merchant landing pages.

Primary KPI:
- Affiliate CVR

Secondary KPI:
- EPC

Guardrails:
- No added layout shift or intrusive UI patterns

### Experiment C: Copy intent test
Hypothesis:
- Action-oriented but neutral copy outperforms generic copy by >= 15% CTR.

Variants:
- Control: neutral informational CTA
- Variant: action-oriented CTA with explicit value proposition

Primary KPI:
- Outbound CTR

Guardrails:
- Maintain trust language and clear disclosure

## 5) Placement and UX rules

- Keep affiliate modules visually distinct from navigation and from AdSense ad units.
- Never place affiliate CTAs where users can confuse them with mandatory calculator actions.
- Keep spacing to reduce accidental interaction risk.
- Use clear disclosure labels near affiliate module.
- Mobile-first check: avoid sticky patterns that degrade reading or calculator completion.

## 6) Compliance checklist (ship gate)

### AdSense
- No deceptive adjacency between calculator controls and ads.
- No language encouraging ad clicks.
- Ad labels must follow allowed wording and clear separation.

### GDPR / EEA-UK-CH consent
- Use a certified CMP/TCF-compliant setup for Google ad stack where required.
- Ensure tracking behavior is consistent with consent state.
- Keep partner disclosures and privacy references up to date.

## 7) TradeTracker partner qualification scorecard

Use this scorecard per candidate campaign before launch:
- Vertical fit (finance/energy/mobility)
- GEO + language fit (NL-BE / FR-BE)
- Commission model (CPL/CPS/hybrid)
- Expected payout and target EPC
- Cookie window + attribution logic
- Approval/reversal behavior expectations
- Conversion friction (steps to complete)
- Tracking robustness (subID, reporting cadence, API/export usability)
- Compliance constraints (claim restrictions, copy restrictions)
- Payment terms and threshold

Scoring:
- 1-5 per criterion
- Launch only campaigns with weighted score >= 3.5/5 and no red-flag compliance blockers.

## 8) Reporting cadence and decision logic

Weekly GrowthOps report format:
- Baseline vs current (RPV, affiliate RPM, CTR, CVR, EPC)
- Active experiments and status
- Guardrail status (UX/SEO/compliance)
- Winner/loser decisions
- Next 7-day actions

Scale rule:
- Scale to next 3-5 pages only if:
  - CTR uplift >= 15% and
  - EPC non-negative trend and
  - no guardrail breach

Stop rule:
- Pause any variant with:
  - Significant engagement regression, or
  - Compliance risk signal, or
  - Negative EPC after minimum sample threshold

## 9) Implementation checklist (next actions)

Week 1:
- Activate TradeTracker publisher setup for all portfolio domains.
- Build campaign shortlist (min 15 candidates, 5 per priority vertical).
- Map `placement_id` + `cta_variant` convention across sites.
- Launch Experiment A/B/C on 3 pilot pages.

Week 2:
- Review first 7-day data (directional only).
- Iterate copy and deep-link targets.
- Keep only top-performing campaign-page pairs.

Week 3 (if gates pass):
- Scale winners to next page cluster.
- Standardize template blocks for repeat rollout.

## 10) Risks and mitigations

Risk: High click volume but low conversion quality.  
Mitigation: Prioritize EPC and accepted conversions over raw CTR.

Risk: UX degradation from aggressive monetization blocks.  
Mitigation: Run only one major monetization change per pilot page at a time; enforce CWV and engagement guardrails.

Risk: Compliance drift across 13+ sites.  
Mitigation: Single rollout checklist + periodic policy audit before scaling.

---

## Source notes (reviewed on 2026-05-08)

- TradeTracker publisher pages (BE-NL / BE-FR / features), including statements about Belgium advertiser scale, deep linking, widgets/tools, API, and reporting.
- Google AdSense Help policy pages for ad placement, invalid traffic/accidental clicks, and EU consent requirements.
