import {
  B2B_FORFAIT_EUR,
  BRON_LABEL,
  CONSUMENT_WACHTTERMIJN_DAGEN,
  WETTELIJKE_VERMELDINGEN,
  berekenConsumentWachttermijn,
  consumentMaxVoetTekst,
  formatPercent,
  getActueleRentevoeten,
  type InterestBerekening,
} from "@shared/wettelijke-interest";
import type { BriefBijlage, BriefGegevens, BriefInhoud, BriefSjabloon } from "./types";

export const eur = (n: number) =>
  `€${n.toLocaleString("nl-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const datumKort = (d: Date) =>
  d.toLocaleDateString("nl-BE", { day: "2-digit", month: "2-digit", year: "numeric" });

export const datumLang = (d: Date) => d.toLocaleDateString("nl-BE", { day: "numeric", month: "long", year: "numeric" });

export const SJABLOON_LABELS: Record<BriefSjabloon, { titel: string; toelichting: string }> = {
  "b2b-aanmaning": {
    titel: "Aanmaning aan een onderneming",
    toelichting: `Wet 2 augustus 2002: interest van rechtswege + forfait van €${B2B_FORFAIT_EUR} + redelijke invorderingskosten.`,
  },
  "b2b-ingebrekestelling": {
    titel: "Ingebrekestelling (laatste herinnering)",
    toelichting: "Formele laatste herinnering met betaaltermijn, vóór u de factuur uit handen geeft.",
  },
  "consument-eerste-herinnering": {
    titel: "Kosteloze eerste herinnering aan een consument",
    toelichting: `Boek XIX WER: geen kosten of interest in deze brief, wel de termijn van ${CONSUMENT_WACHTTERMIJN_DAGEN} dagen en de startdatum ervan.`,
  },
};

export function sjablonenVoorRegime(regime: InterestBerekening["regime"]): BriefSjabloon[] {
  if (regime === "handel") return ["b2b-aanmaning", "b2b-ingebrekestelling"];
  if (regime === "consument") return ["consument-eerste-herinnering"];
  return [];
}

function regels(tekst: string): string[] {
  return tekst
    .split(/\r?\n/)
    .map((r) => r.trim())
    .filter(Boolean);
}

function afzenderRegels(g: BriefGegevens): string[] {
  const s = g.schuldeiser;
  const out = [s.naam.trim() || "[Naam schuldeiser]", ...regels(s.adres)];
  if (s.ondernemingsnummer?.trim()) out.push(`Ondernemingsnummer ${s.ondernemingsnummer.trim()}`);
  if (s.email?.trim()) out.push(s.email.trim());
  if (s.telefoon?.trim()) out.push(s.telefoon.trim());
  return out;
}

function geadresseerdeRegels(g: BriefGegevens): string[] {
  const s = g.schuldenaar;
  const out = [s.naam.trim() || "[Naam schuldenaar]", ...regels(s.adres)];
  if (s.ondernemingsnummer?.trim()) out.push(`Ondernemingsnummer ${s.ondernemingsnummer.trim()}`);
  return out;
}

function plaatsUitAdres(adres: string): string {
  const laatste = regels(adres).pop() ?? "";
  // "9000 Gent" → "Gent"
  return laatste.replace(/^\d{4}\s+/, "").trim();
}

function veiligeBestandsnaam(deel: string): string {
  return deel
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function dagInterest(b: InterestBerekening): number {
  const laatste = b.periodes[b.periodes.length - 1];
  const voet = laatste ? laatste.rentevoet : getActueleRentevoeten().handelS2;
  return (b.hoofdsom * (voet / 100)) / 365;
}

function voetenTekst(b: InterestBerekening): string {
  const uniek = Array.from(new Set(b.periodes.map((p) => formatPercent(p.rentevoet))));
  if (uniek.length === 0) return formatPercent(getActueleRentevoeten().handelS1);
  if (uniek.length === 1) return `${uniek[0]} per jaar`;
  return `${uniek.slice(0, -1).join(", ")} en ${uniek[uniek.length - 1]} per jaar, volgens de periode`;
}

function factuurOmschrijving(g: BriefGegevens): string {
  const nr = g.factuurnummer.trim() || "[factuurnummer]";
  const datum = g.factuurdatum ? ` van ${datumLang(g.factuurdatum)}` : "";
  return `factuur ${nr}${datum}`;
}

function voettekst(): string[] {
  return [
    `Modelbrief gegenereerd op Interesten.be (uitgave Bart Deblock / Hazier) met de wettelijke interestvoeten van de ${BRON_LABEL}.`,
    WETTELIJKE_VERMELDINGEN.disclaimer,
  ];
}

function bijlageBerekening(b: InterestBerekening, opties: { indicatief: boolean }): BriefBijlage {
  const fiscaal = b.regime === "fiscaal";
  const rijen = b.periodes.map((p) => ({
    periode: p.label,
    dagen: fiscaal ? "1 maand" : String(p.dagen),
    voet: formatPercent(p.rentevoet),
    interest: eur(p.interest),
  }));

  const totalen: BriefBijlage["totalen"] = [
    { label: "Hoofdsom", bedrag: eur(b.hoofdsom) },
    { label: `Nalatigheidsinterest (${b.dagen} dagen)`, bedrag: eur(b.interest) },
  ];
  if (b.forfait > 0) {
    totalen.push({ label: `Forfaitaire schadevergoeding (wet 2 augustus 2002, art. 6)`, bedrag: eur(b.forfait) });
  }
  totalen.push({ label: opties.indicatief ? "Indicatief totaal na de termijn" : "Totaal verschuldigd", bedrag: eur(b.totaal), vet: true });

  const noten = [
    `Berekening: enkelvoudige interest, hoofdsom × interestvoet × dagen ÷ 365, per periode tegen de voet die toen gold. Periode van ${datumKort(b.van)} tot ${datumKort(b.tot)} (betaaldag niet meegerekend).`,
    `Bij latere betaling loopt de interest verder met ongeveer ${eur(dagInterest(b))} per dag tegen de huidige voet.`,
    `Interestvoeten: ${BRON_LABEL}.`,
  ];
  if (b.regime === "consument" && b.plafond !== null) {
    noten.push(
      `${WETTELIJKE_VERMELDINGEN.consumentPlafond} Voor dit saldo is dat maximaal ${eur(b.plafond)} (art. XIX.4 WER).`,
    );
    if (b.interest > b.plafond) {
      noten.push(`De berekende interest (${eur(b.interest)}) overschrijdt dat plafond; er mag niet meer dan ${eur(b.plafond)} aangerekend worden.`);
    }
  }

  return {
    titel: opties.indicatief
      ? "Bijlage: indicatieve berekening (vandaag niet verschuldigd)"
      : "Bijlage: berekening van de nalatigheidsinterest",
    intro: opties.indicatief
      ? [
          `Deze tabel toont ter informatie wat bij niet-betaling na de wettelijke termijn aangerekend kan worden, en enkel als onze algemene voorwaarden dat voorzien. Op de datum van deze herinnering is alleen de hoofdsom van ${eur(b.hoofdsom)} verschuldigd.`,
        ]
      : [],
    kolommen: ["Periode", fiscaal ? "Maand" : "Dagen", "Interestvoet", "Interest"],
    rijen,
    totalen,
    noten,
  };
}

function b2bAanmaning(g: BriefGegevens, b: InterestBerekening): BriefInhoud {
  const nr = g.factuurnummer.trim() || "[factuurnummer]";
  const vervaldag = g.vervaldag ? datumLang(g.vervaldag) : "[vervaldag]";
  const iban = g.betaalrekening.trim() || "[IBAN]";
  const forfaitZin =
    b.forfait > 0
      ? ` Daarnaast is op grond van artikel 6 van dezelfde wet een forfaitaire vergoeding van €${B2B_FORFAIT_EUR} verschuldigd voor onze eigen invorderingskosten, onverminderd ons recht op een redelijke schadeloosstelling voor alle andere invorderingskosten die dit forfait overschrijden.`
      : "";

  return {
    bestandsnaam: `aanmaning-${veiligeBestandsnaam(nr)}.pdf`,
    afzender: afzenderRegels(g),
    geadresseerde: geadresseerdeRegels(g),
    plaatsDatum: `${plaatsUitAdres(g.schuldeiser.adres) || "[Plaats]"}, ${datumLang(g.briefdatum)}`,
    betreft: `Aanmaning: onbetaalde ${factuurOmschrijving(g)}, vervallen op ${vervaldag}`,
    aanhef: "Geachte heer, mevrouw,",
    alineas: [
      `Uit onze boekhouding blijkt dat ${factuurOmschrijving(g)} ten bedrage van ${eur(b.hoofdsom)} tot op heden onbetaald is gebleven. De vervaldag van deze factuur was ${vervaldag}.`,
      `Overeenkomstig de wet van 2 augustus 2002 betreffende de bestrijding van de betalingsachterstand bij handelstransacties is vanaf de dag na de vervaldag van rechtswege en zonder ingebrekestelling een interest verschuldigd tegen de wettelijke interestvoet voor handelstransacties (${voetenTekst(b)}).${forfaitZin}`,
      `Op ${datumLang(g.briefdatum)} bedraagt het verschuldigde bedrag daardoor: hoofdsom ${eur(b.hoofdsom)}, nalatigheidsinterest tot ${datumKort(b.tot)} ${eur(b.interest)}${
        b.forfait > 0 ? `, forfaitaire schadevergoeding ${eur(b.forfait)}` : ""
      }; samen ${eur(b.totaal)}. De berekening per periode vindt u in de bijlage.`,
      `Wij verzoeken u het totaalbedrag van ${eur(b.totaal)} binnen 8 kalenderdagen over te schrijven op rekening ${iban} met vermelding van het factuurnummer ${nr}. Hebt u intussen al betaald, dan mag u deze brief als niet verzonden beschouwen; bezorg ons in dat geval graag uw betalingsbewijs.`,
      `Blijft betaling uit, dan ontvangt u een formele ingebrekestelling en behouden wij ons het recht voor de invordering zonder verdere verwittiging uit handen te geven. De verder lopende interest en alle bijkomende invorderingskosten komen dan te uwen laste.`,
    ],
    slot: ["Met vriendelijke groeten,", "", g.schuldeiser.naam.trim() || "[Naam schuldeiser]"],
    bijlage: bijlageBerekening(b, { indicatief: false }),
    voettekst: voettekst(),
  };
}

function b2bIngebrekestelling(g: BriefGegevens, b: InterestBerekening): BriefInhoud {
  const nr = g.factuurnummer.trim() || "[factuurnummer]";
  const vervaldag = g.vervaldag ? datumLang(g.vervaldag) : "[vervaldag]";
  const iban = g.betaalrekening.trim() || "[IBAN]";
  const termijn = Math.max(1, Math.round(g.termijnDagen ?? 8));
  const uiterlijk = new Date(g.briefdatum.getFullYear(), g.briefdatum.getMonth(), g.briefdatum.getDate() + termijn);

  return {
    bestandsnaam: `ingebrekestelling-${veiligeBestandsnaam(nr)}.pdf`,
    afzender: afzenderRegels(g),
    geadresseerde: geadresseerdeRegels(g),
    plaatsDatum: `${plaatsUitAdres(g.schuldeiser.adres) || "[Plaats]"}, ${datumLang(g.briefdatum)}`,
    betreft: `Ingebrekestelling en laatste herinnering: ${factuurOmschrijving(g)}, vervallen op ${vervaldag}`,
    aanhef: "Geachte heer, mevrouw,",
    alineas: [
      `Ondanks onze eerdere herinnering blijft ${factuurOmschrijving(g)} ten bedrage van ${eur(b.hoofdsom)}, met vervaldag ${vervaldag}, onbetaald. Met deze brief stellen wij u formeel in gebreke.`,
      `Overeenkomstig de wet van 2 augustus 2002 betreffende de bestrijding van de betalingsachterstand bij handelstransacties loopt sinds de dag na de vervaldag van rechtswege een interest tegen de wettelijke interestvoet voor handelstransacties (${voetenTekst(b)})${
        b.forfait > 0
          ? `, en is daarbovenop de forfaitaire vergoeding van €${B2B_FORFAIT_EUR} voor invorderingskosten verschuldigd (artikel 6). Wij behouden ons het recht voor een redelijke schadeloosstelling te vorderen voor alle invorderingskosten die dit forfait overschrijden.`
          : "."
      }`,
      `Op ${datumLang(g.briefdatum)} is in totaal ${eur(b.totaal)} verschuldigd: hoofdsom ${eur(b.hoofdsom)}, nalatigheidsinterest tot ${datumKort(b.tot)} ${eur(b.interest)}${
        b.forfait > 0 ? ` en forfaitaire schadevergoeding ${eur(b.forfait)}` : ""
      }. De berekening per periode vindt u in de bijlage.`,
      `Wij verzoeken u voor de laatste maal dit bedrag te betalen binnen ${termijn} kalenderdagen na de datum van deze brief, dus uiterlijk op ${datumLang(uiterlijk)}, op rekening ${iban} met vermelding van het factuurnummer ${nr}.`,
      `Bij gebreke aan tijdige en volledige betaling geven wij het dossier zonder verdere verwittiging door voor minnelijke en, indien nodig, gerechtelijke invordering. De interest loopt intussen verder met ongeveer ${eur(dagInterest(b))} per dag, en alle bijkomende kosten van invordering komen te uwen laste.`,
      `Betwist u deze factuur, laat het ons dan binnen dezelfde termijn schriftelijk en gemotiveerd weten.`,
    ],
    slot: ["Hoogachtend,", "", g.schuldeiser.naam.trim() || "[Naam schuldeiser]"],
    bijlage: bijlageBerekening(b, { indicatief: false }),
    voettekst: voettekst(),
  };
}

function consumentEersteHerinnering(g: BriefGegevens, b: InterestBerekening): BriefInhoud {
  const nr = g.factuurnummer.trim() || "[factuurnummer]";
  const vervaldag = g.vervaldag ? datumLang(g.vervaldag) : "[vervaldag]";
  const iban = g.betaalrekening.trim() || "[IBAN]";
  const kanaal = g.herinneringKanaal ?? "post";
  const verzonden = g.herinneringVerzonden ?? g.briefdatum;
  const termijn = berekenConsumentWachttermijn(verzonden, kanaal);
  const actueel = getActueleRentevoeten();
  const maxVoet = termijn.start.getMonth() < 6 ? actueel.handelS1 : actueel.handelS2;
  const plafond = b.plafond ?? 0;
  const omschrijving = g.omschrijving?.trim() || "[omschrijving van het product of de dienst]";
  const contact = [g.schuldeiser.email?.trim(), g.schuldeiser.telefoon?.trim()].filter(Boolean).join(" of ");

  return {
    bestandsnaam: `eerste-herinnering-${veiligeBestandsnaam(nr)}.pdf`,
    afzender: afzenderRegels(g),
    geadresseerde: geadresseerdeRegels(g),
    plaatsDatum: `${plaatsUitAdres(g.schuldeiser.adres) || "[Plaats]"}, ${datumLang(g.briefdatum)}`,
    betreft: `Herinnering: openstaande ${factuurOmschrijving(g)}`,
    aanhef: "Geachte heer, mevrouw,",
    alineas: [
      `Volgens onze gegevens is ${factuurOmschrijving(g)} voor ${omschrijving}, ten bedrage van ${eur(b.hoofdsom)} en opeisbaar sinds ${vervaldag}, nog niet betaald. Mogelijk is dit aan uw aandacht ontsnapt.`,
      `Dit is een kosteloze eerste herinnering: wij rekenen u hiervoor geen kosten of interest aan. Overeenkomstig Boek XIX van het Wetboek van economisch recht beschikt u over een termijn van ten minste ${CONSUMENT_WACHTTERMIJN_DAGEN} kalenderdagen om het openstaande saldo van ${eur(b.hoofdsom)} te betalen. Die termijn begint op ${datumLang(termijn.start)}${
        kanaal === "elektronisch"
          ? " (de kalenderdag na de elektronische verzending van deze herinnering)"
          : " (de derde werkdag na de verzending van deze herinnering per post)"
      } en loopt tot en met ${datumLang(termijn.uiterlijkeBetaaldag)}.`,
      `Wij vragen u het bedrag van ${eur(b.hoofdsom)} vóór het einde van die termijn over te schrijven op rekening ${iban} met vermelding van het factuurnummer ${nr}. Hebt u intussen al betaald, dan mag u deze brief als niet verzonden beschouwen.`,
      `Blijft betaling na die termijn uit, dan kunnen wij overeenkomstig het schadebeding in onze algemene voorwaarden verwijlinterest en een forfaitaire schadevergoeding aanrekenen. ${consumentMaxVoetTekst(
        termijn.start.getFullYear(),
        maxVoet,
      )} Interest en kosten samen zijn voor dit saldo wettelijk beperkt tot maximaal ${eur(plafond)} (art. XIX.4 WER). Een indicatieve berekening vindt u ter informatie in de bijlage.`,
      `Hebt u vragen over deze factuur of lukt betalen in één keer niet, neem dan contact met ons op${contact ? ` via ${contact}` : ""}; dan zoeken we samen een oplossing.`,
    ],
    slot: ["Met vriendelijke groeten,", "", g.schuldeiser.naam.trim() || "[Naam schuldeiser]"],
    bijlage: bijlageBerekening(b, { indicatief: true }),
    voettekst: voettekst(),
  };
}

/** Stelt de volledige briefinhoud op; zuivere functie zonder DOM of PDF-afhankelijkheid. */
export function stelBriefOp(gegevens: BriefGegevens, berekening: InterestBerekening): BriefInhoud {
  switch (gegevens.sjabloon) {
    case "b2b-aanmaning":
      return b2bAanmaning(gegevens, berekening);
    case "b2b-ingebrekestelling":
      return b2bIngebrekestelling(gegevens, berekening);
    case "consument-eerste-herinnering":
      return consumentEersteHerinnering(gegevens, berekening);
  }
}
