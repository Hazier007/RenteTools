// Dag 0-e-mail van de aanmaningsflow: de PDF als bijlage, een korte samenvatting
// en, enkel bij B2B-facturen die groot of oud genoeg zijn, de CTA naar CollectPro.
// De teksten voor dag 7 en dag 14 (Resend Broadcasts) staan in
// docs/email-sequentie-aanmaning.md.
import { z } from "zod";
import {
  COLLECTPRO_CTA_LABEL,
  COLLECTPRO_DISCLOSURE,
  COLLECTPRO_URL,
  collectProCtaVanToepassing,
} from "../../shared/collectpro";
import { WETTELIJKE_VERMELDINGEN } from "../../shared/wettelijke-interest";

export const aanmaningLeadSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  bedrijfsnaam: z.string().trim().max(120).optional().default(""),
  type: z.enum(["onderneming", "zelfstandige", "particulier"]),
  sjabloon: z.enum(["b2b-aanmaning", "b2b-ingebrekestelling", "consument-eerste-herinnering"]),
  regime: z.enum(["handel", "consument", "burgerlijk", "fiscaal"]),
  hoofdsom: z.number().min(0).max(100_000_000),
  dagen: z.number().int().min(0).max(36_500),
  interest: z.number().min(0),
  forfait: z.number().min(0),
  totaal: z.number().min(0),
  bestandsnaam: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,80}\.pdf$/, "ongeldige bestandsnaam"),
  /** Base64 van de PDF; ruim onder de JSON-limiet van 1 MB. */
  pdfBase64: z
    .string()
    .min(100)
    .max(900_000)
    .regex(/^[A-Za-z0-9+/]+={0,2}$/, "ongeldige base64"),
  toestemming: z.literal(true),
  /** Honeypot: echte gebruikers laten dit leeg. */
  website: z.string().max(0).optional().default(""),
});

export type AanmaningLead = z.infer<typeof aanmaningLeadSchema>;

const eur = (n: number) => `€${n.toLocaleString("nl-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const SJABLOON_NAAM: Record<AanmaningLead["sjabloon"], string> = {
  "b2b-aanmaning": "aanmaning aan een onderneming",
  "b2b-ingebrekestelling": "ingebrekestelling (laatste herinnering)",
  "consument-eerste-herinnering": "kosteloze eerste herinnering aan een consument",
};

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function toonCollectProInMail(lead: AanmaningLead): boolean {
  if (lead.type === "particulier") return false;
  return collectProCtaVanToepassing({ regime: lead.regime, hoofdsom: lead.hoofdsom, dagen: lead.dagen });
}

export interface MailInhoud {
  subject: string;
  html: string;
  text: string;
}

export function bouwDag0Mail(lead: AanmaningLead): MailInhoud {
  const sjabloon = SJABLOON_NAAM[lead.sjabloon];
  const consument = lead.sjabloon === "consument-eerste-herinnering";
  const cta = toonCollectProInMail(lead);
  const paginaUrl = "https://interesten.be/lenen/wettelijke-rentevoet-belgie";

  const samenvattingRegels: string[] = [`Hoofdsom: ${eur(lead.hoofdsom)}`];
  if (!consument) {
    samenvattingRegels.push(`Nalatigheidsinterest (${lead.dagen} dagen): ${eur(lead.interest)}`);
    if (lead.forfait > 0) samenvattingRegels.push(`Forfaitaire schadevergoeding: ${eur(lead.forfait)}`);
    samenvattingRegels.push(`Totaal verschuldigd: ${eur(lead.totaal)}`);
  } else {
    samenvattingRegels.push("In deze eerste herinnering rekent u geen kosten of interest aan (Boek XIX WER).");
  }

  const tips = consument
    ? [
        "Verstuur de herinnering per e-mail of per post en bewaar het bewijs van verzending: de termijn van 14 dagen start pas daarna.",
        "Interest en kosten zijn alleen mogelijk als uw algemene voorwaarden een schadebeding bevatten; zo niet, is niets extra verschuldigd.",
        WETTELIJKE_VERMELDINGEN.consumentGeenSchadebeding,
      ]
    : [
        "Verstuur de brief per e-mail én per post (een ingebrekestelling liefst aangetekend) en bewaar het bewijs.",
        "Noteer de uiterste betaaldatum in uw agenda en reken bij latere betaling de interest opnieuw uit op Interesten.be.",
        WETTELIJKE_VERMELDINGEN.b2bForfait,
      ];

  const subject = consument
    ? `Uw eerste herinnering (PDF) staat klaar`
    : `Uw ${sjabloon} met interestberekening (PDF)`;

  const ctaHtml = cta
    ? `
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0;border:1px solid #d9dee7;border-radius:8px;width:100%">
        <tr><td style="padding:20px 22px;font-family:Arial,Helvetica,sans-serif;color:#1f2430">
          <p style="margin:0 0 8px;font-size:17px;font-weight:bold">Blijft deze factuur onbetaald?</p>
          <p style="margin:0 0 14px;font-size:15px;line-height:1.5">Bij ${eur(lead.hoofdsom)} en ${lead.dagen} dagen vertraging loont het om de invordering uit handen te geven. CollectPro.be volgt uw factuur minnelijk op, no cure no pay: betaalt de klant niet, dan betaalt u niets.</p>
          <p style="margin:0 0 14px"><a href="${COLLECTPRO_URL}?utm_source=interesten&amp;utm_medium=email&amp;utm_campaign=aanmaning-dag0" style="display:inline-block;background:#1d4ed8;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:6px;font-weight:bold;font-size:15px">${escapeHtml(COLLECTPRO_CTA_LABEL)}</a></p>
          <p style="margin:0;font-size:12px;color:#6b7280">${escapeHtml(COLLECTPRO_DISCLOSURE)}</p>
        </td></tr>
      </table>`
    : "";

  const ctaText = cta
    ? `\nBlijft deze factuur onbetaald?\nBij ${eur(lead.hoofdsom)} en ${lead.dagen} dagen vertraging loont het om de invordering uit handen te geven. CollectPro.be volgt uw factuur minnelijk op, no cure no pay.\n${COLLECTPRO_CTA_LABEL}: ${COLLECTPRO_URL}\n${COLLECTPRO_DISCLOSURE}\n`
    : "";

  const html = `<!doctype html>
<html lang="nl"><body style="margin:0;padding:0;background:#f4f6fa">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f4f6fa;padding:24px 0">
<tr><td align="center">
<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;background:#ffffff;border-radius:10px;padding:32px;font-family:Arial,Helvetica,sans-serif;color:#1f2430">
  <tr><td>
    <p style="margin:0 0 6px;font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:.04em">Interesten.be</p>
    <h1 style="margin:0 0 18px;font-size:22px;line-height:1.3">Uw ${escapeHtml(sjabloon)} staat klaar</h1>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.55">Dag,</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.55">In bijlage vindt u de PDF <strong>${escapeHtml(lead.bestandsnaam)}</strong>, gegenereerd met de wettelijke interestvoeten van de FOD Financiën. Controleer de gegevens, onderteken en verstuur.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:18px 0;background:#f8fafc;border-radius:8px;width:100%"><tr><td style="padding:16px 18px;font-size:14px;line-height:1.7">
      ${samenvattingRegels.map((r) => `<div>${escapeHtml(r)}</div>`).join("")}
    </td></tr></table>
    <p style="margin:18px 0 8px;font-size:15px;font-weight:bold">Drie praktische tips</p>
    <ul style="margin:0 0 18px;padding-left:20px;font-size:14px;line-height:1.6">
      ${tips.map((t) => `<li style="margin-bottom:6px">${escapeHtml(t)}</li>`).join("")}
    </ul>
    ${ctaHtml}
    <p style="margin:0 0 14px;font-size:14px;line-height:1.55">Wilt u de berekening aanpassen? Dat kan altijd opnieuw op <a href="${paginaUrl}" style="color:#1d4ed8">${paginaUrl.replace("https://", "")}</a>.</p>
    <p style="margin:24px 0 0;font-size:12px;line-height:1.5;color:#6b7280">${escapeHtml(WETTELIJKE_VERMELDINGEN.disclaimer)}</p>
    <p style="margin:12px 0 0;font-size:12px;line-height:1.5;color:#6b7280">U ontvangt deze e-mail omdat u op Interesten.be een modelbrief aanvroeg en toestemming gaf voor enkele praktische e-mails over onbetaalde facturen. Uitschrijven kan door te antwoorden op deze e-mail of via de link in elke volgende e-mail. Interesten.be is een uitgave van Bart Deblock (Hazier), Blijde-Inkomststraat 16, 9000 Gent.</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;

  const text = [
    `Uw ${sjabloon} staat klaar`,
    "",
    "Dag,",
    "",
    `In bijlage vindt u de PDF ${lead.bestandsnaam}, gegenereerd met de wettelijke interestvoeten van de FOD Financiën. Controleer de gegevens, onderteken en verstuur.`,
    "",
    ...samenvattingRegels,
    "",
    "Drie praktische tips:",
    ...tips.map((t) => `- ${t}`),
    ctaText,
    `Berekening aanpassen: ${paginaUrl}`,
    "",
    WETTELIJKE_VERMELDINGEN.disclaimer,
    "",
    "U ontvangt deze e-mail omdat u op Interesten.be een modelbrief aanvroeg en toestemming gaf voor enkele praktische e-mails over onbetaalde facturen. Uitschrijven kan door te antwoorden op deze e-mail of via de link in elke volgende e-mail. Interesten.be is een uitgave van Bart Deblock (Hazier), Blijde-Inkomststraat 16, 9000 Gent.",
  ].join("\n");

  return { subject, html, text };
}
