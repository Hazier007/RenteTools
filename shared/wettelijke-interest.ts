// Wettelijke interestvoeten in België.
//
// Bron: Belgisch Staatsblad / FOD Financiën – Algemene Administratie van de
// Thesaurie (niet de Nationale Bank). De burgerlijke voet en de fiscale voet
// worden elk jaar in januari bekendgemaakt, de voet voor handelstransacties
// elk semester (januari en juli).
//
// Bijwerken: voeg een nieuwe regel toe zodra de voet in het Staatsblad staat.
// Alle helpers vallen terug op de laatst bekende periode, zodat de site nooit
// een verzonnen cijfer toont voor een jaar dat nog niet gepubliceerd is.

export type InterestRegime = "burgerlijk" | "handel" | "consument" | "fiscaal";

export interface JaarRentevoet {
  jaar: number;
  rentevoet: number; // in procent per jaar
}

export interface SemesterRentevoet {
  jaar: number;
  semester: 1 | 2;
  rentevoet: number; // in procent per jaar
}

/** Wettelijke interestvoet in burgerlijke en sociale zaken (wet 5 mei 1865, art. 2). */
export const WETTELIJKE_RENTEVOET_BURGERLIJK: JaarRentevoet[] = [
  { jaar: 2006, rentevoet: 7 },
  { jaar: 2007, rentevoet: 6 },
  { jaar: 2008, rentevoet: 7 },
  { jaar: 2009, rentevoet: 5.5 },
  { jaar: 2010, rentevoet: 3.25 },
  { jaar: 2011, rentevoet: 3.75 },
  { jaar: 2012, rentevoet: 4.25 },
  { jaar: 2013, rentevoet: 2.75 },
  { jaar: 2014, rentevoet: 2.75 },
  { jaar: 2015, rentevoet: 2.5 },
  { jaar: 2016, rentevoet: 2.25 },
  { jaar: 2017, rentevoet: 2 },
  { jaar: 2018, rentevoet: 2 },
  { jaar: 2019, rentevoet: 2 },
  { jaar: 2020, rentevoet: 1.75 },
  { jaar: 2021, rentevoet: 1.75 },
  { jaar: 2022, rentevoet: 1.5 },
  { jaar: 2023, rentevoet: 5.25 },
  { jaar: 2024, rentevoet: 5.75 },
  { jaar: 2025, rentevoet: 4.5 },
  { jaar: 2026, rentevoet: 4.5 },
];

/**
 * Interestvoet bij betalingsachterstand in handelstransacties
 * (wet 2 augustus 2002, art. 5: ECB-referentievoet + 8 procentpunten,
 * afgerond naar boven op een half procentpunt, per semester).
 */
export const WETTELIJKE_RENTEVOET_HANDEL: SemesterRentevoet[] = [
  { jaar: 2019, semester: 1, rentevoet: 8 },
  { jaar: 2019, semester: 2, rentevoet: 8 },
  { jaar: 2020, semester: 1, rentevoet: 8 },
  { jaar: 2020, semester: 2, rentevoet: 8 },
  { jaar: 2021, semester: 1, rentevoet: 8 },
  { jaar: 2021, semester: 2, rentevoet: 8 },
  { jaar: 2022, semester: 1, rentevoet: 8 },
  { jaar: 2022, semester: 2, rentevoet: 8 },
  { jaar: 2023, semester: 1, rentevoet: 10.5 },
  { jaar: 2023, semester: 2, rentevoet: 12 },
  { jaar: 2024, semester: 1, rentevoet: 12.5 },
  { jaar: 2024, semester: 2, rentevoet: 12.5 },
  { jaar: 2025, semester: 1, rentevoet: 11.5 },
  { jaar: 2025, semester: 2, rentevoet: 10.5 },
  { jaar: 2026, semester: 1, rentevoet: 10.5 },
  { jaar: 2026, semester: 2, rentevoet: 10.5 },
];

/** Fiscale nalatigheidsinterest (art. 414 WIB92) – wettelijk minimum 4% sinds 2018. */
export const WETTELIJKE_RENTEVOET_FISCAAL: JaarRentevoet[] = [
  { jaar: 2018, rentevoet: 4 },
  { jaar: 2019, rentevoet: 4 },
  { jaar: 2020, rentevoet: 4 },
  { jaar: 2021, rentevoet: 4 },
  { jaar: 2022, rentevoet: 4 },
  { jaar: 2023, rentevoet: 4 },
  { jaar: 2024, rentevoet: 4 },
  { jaar: 2025, rentevoet: 4 },
  { jaar: 2026, rentevoet: 4 },
];

/** Fiscale moratoriuminterest (wat de fiscus u betaalt bij laattijdige terugbetaling). */
export const FISCALE_MORATORIUMINTEREST = 2;

/** Btw: nalatigheidsinterest / moratoriuminterest, per jaar, sinds 1 januari 2023. */
export const BTW_NALATIGHEIDSINTEREST = 8;
export const BTW_MORATORIUMINTEREST = 6;

/** Interestvoet in sociale zaken (RSZ-bijdragen). */
export const RSZ_INTERESTVOET = 7;

/** Forfaitaire schadevergoeding per factuur bij handelstransacties (wet 2 augustus 2002, art. 6). */
export const B2B_FORFAIT_EUR = 40;

/** Maximale contractuele betalingstermijn tussen ondernemingen (sinds 1 februari 2022). */
export const B2B_MAX_BETALINGSTERMIJN_DAGEN = 60;
/** Wettelijke betalingstermijn zonder afspraak. */
export const B2B_STANDAARD_BETALINGSTERMIJN_DAGEN = 30;

/** Boek XIX WER: wachttermijn na de kosteloze eerste herinnering aan een consument. */
export const CONSUMENT_WACHTTERMIJN_DAGEN = 14;

export const BRON_LABEL = "FOD Financiën – Algemene Administratie van de Thesaurie / Belgisch Staatsblad";

export const LAATST_BEKENDE_JAAR = WETTELIJKE_RENTEVOET_BURGERLIJK[WETTELIJKE_RENTEVOET_BURGERLIJK.length - 1].jaar;

export function getBurgerlijkeRentevoet(jaar: number): JaarRentevoet {
  const exact = WETTELIJKE_RENTEVOET_BURGERLIJK.find((r) => r.jaar === jaar);
  if (exact) return exact;
  // Voor jaren vóór 2006 of na het laatst gepubliceerde jaar: dichtstbijzijnde bekende voet.
  const sorted = [...WETTELIJKE_RENTEVOET_BURGERLIJK].sort((a, b) => a.jaar - b.jaar);
  if (jaar < sorted[0].jaar) return sorted[0];
  return sorted[sorted.length - 1];
}

export function getHandelsRentevoet(jaar: number, semester: 1 | 2): SemesterRentevoet {
  const exact = WETTELIJKE_RENTEVOET_HANDEL.find((r) => r.jaar === jaar && r.semester === semester);
  if (exact) return exact;
  const sorted = [...WETTELIJKE_RENTEVOET_HANDEL].sort(
    (a, b) => a.jaar * 10 + a.semester - (b.jaar * 10 + b.semester),
  );
  if (jaar * 10 + semester < sorted[0].jaar * 10 + sorted[0].semester) return sorted[0];
  return sorted[sorted.length - 1];
}

export function getFiscaleRentevoet(jaar: number): JaarRentevoet {
  const exact = WETTELIJKE_RENTEVOET_FISCAAL.find((r) => r.jaar === jaar);
  if (exact) return exact;
  const sorted = [...WETTELIJKE_RENTEVOET_FISCAAL].sort((a, b) => a.jaar - b.jaar);
  if (jaar < sorted[0].jaar) return sorted[0];
  return sorted[sorted.length - 1];
}

/** Actuele voeten voor het laatst gepubliceerde jaar (voor titels, meta's en SSR-tekst). */
export function getActueleRentevoeten() {
  const jaar = LAATST_BEKENDE_JAAR;
  return {
    jaar,
    burgerlijk: getBurgerlijkeRentevoet(jaar).rentevoet,
    handelS1: getHandelsRentevoet(jaar, 1).rentevoet,
    handelS2: getHandelsRentevoet(jaar, 2).rentevoet,
    fiscaal: getFiscaleRentevoet(jaar).rentevoet,
  };
}

/**
 * Plafond op schadebeding (interest + kosten samen) bij consumentenschulden,
 * Boek XIX WER art. XIX.4, van toepassing sinds 1 september 2023.
 */
export function berekenBoekXIXPlafond(openstaandSaldo: number): number {
  if (openstaandSaldo <= 0) return 0;
  if (openstaandSaldo <= 150) return 20;
  if (openstaandSaldo <= 500) return 30 + 0.1 * (openstaandSaldo - 150);
  return Math.min(2000, 65 + 0.05 * (openstaandSaldo - 500));
}

/** 4.5 → "4,5%", 5.25 → "5,25%", 4 → "4%". */
export function formatPercent(value: number): string {
  return `${value.toLocaleString("nl-BE", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}%`;
}

export interface InterestPeriode {
  van: Date;
  tot: Date; // exclusief
  dagen: number;
  rentevoet: number;
  interest: number;
  label: string;
}

export interface InterestBerekening {
  regime: InterestRegime;
  hoofdsom: number;
  van: Date;
  tot: Date;
  dagen: number;
  periodes: InterestPeriode[];
  interest: number;
  forfait: number;
  plafond: number | null;
  totaal: number;
  maanden?: number; // enkel fiscaal
}

const MS_PER_DAG = 24 * 60 * 60 * 1000;

function dagenTussen(a: Date, b: Date): number {
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((utcB - utcA) / MS_PER_DAG);
}

function startVanVolgendePeriode(d: Date, regime: InterestRegime): Date {
  if (regime === "handel" || regime === "consument") {
    // Semesters: 1 januari en 1 juli.
    return d.getMonth() < 6 ? new Date(d.getFullYear(), 6, 1) : new Date(d.getFullYear() + 1, 0, 1);
  }
  return new Date(d.getFullYear() + 1, 0, 1);
}

function rentevoetVoorDatum(d: Date, regime: InterestRegime): { rentevoet: number; label: string } {
  const jaar = d.getFullYear();
  if (regime === "handel" || regime === "consument") {
    const semester: 1 | 2 = d.getMonth() < 6 ? 1 : 2;
    const r = getHandelsRentevoet(jaar, semester);
    return { rentevoet: r.rentevoet, label: `${semester === 1 ? "1e" : "2e"} semester ${jaar}` };
  }
  if (regime === "fiscaal") {
    const r = getFiscaleRentevoet(jaar);
    return { rentevoet: r.rentevoet, label: `${jaar}` };
  }
  const r = getBurgerlijkeRentevoet(jaar);
  return { rentevoet: r.rentevoet, label: `${jaar}` };
}

/**
 * Enkelvoudige interest (hoofdsom × voet × dagen / 365), opgesplitst per
 * jaar (burgerlijk) of per semester (handel/consument) zodat elke periode
 * tegen haar eigen voet wordt gerekend. Fiscale interest wordt per volle
 * kalendermaand gerekend (art. 414 WIB92).
 *
 * `van` is de eerste dag waarop interest loopt, `tot` is de dag van betaling
 * (zelf niet meegerekend).
 */
export function berekenWettelijkeInterest(params: {
  hoofdsom: number;
  van: Date;
  tot: Date;
  regime: InterestRegime;
  metForfait?: boolean;
}): InterestBerekening {
  const { hoofdsom, regime } = params;
  const van = new Date(params.van.getFullYear(), params.van.getMonth(), params.van.getDate());
  const tot = new Date(params.tot.getFullYear(), params.tot.getMonth(), params.tot.getDate());
  const totaalDagen = Math.max(0, dagenTussen(van, tot));

  const periodes: InterestPeriode[] = [];
  let interest = 0;
  let maanden: number | undefined;

  if (hoofdsom > 0 && totaalDagen > 0) {
    if (regime === "fiscaal") {
      // Per kalendermaand: elke volledige maand tussen de start- en betaalmaand.
      const startMaand = new Date(van.getFullYear(), van.getMonth(), 1);
      const eindMaand = new Date(tot.getFullYear(), tot.getMonth(), 1);
      maanden = Math.max(
        0,
        (eindMaand.getFullYear() - startMaand.getFullYear()) * 12 + (eindMaand.getMonth() - startMaand.getMonth()),
      );
      let cursor = new Date(startMaand);
      for (let i = 0; i < maanden; i++) {
        const volgende = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
        const { rentevoet } = rentevoetVoorDatum(cursor, regime);
        const bedrag = (hoofdsom * rentevoet) / 100 / 12;
        periodes.push({
          van: cursor,
          tot: volgende,
          dagen: dagenTussen(cursor, volgende),
          rentevoet,
          interest: bedrag,
          label: cursor.toLocaleDateString("nl-BE", { month: "long", year: "numeric" }),
        });
        interest += bedrag;
        cursor = volgende;
      }
    } else {
      let cursor = new Date(van);
      while (cursor < tot) {
        const grens = startVanVolgendePeriode(cursor, regime);
        const einde = grens < tot ? grens : tot;
        const dagen = dagenTussen(cursor, einde);
        const { rentevoet, label } = rentevoetVoorDatum(cursor, regime);
        const bedrag = (hoofdsom * (rentevoet / 100) * dagen) / 365;
        periodes.push({ van: cursor, tot: einde, dagen, rentevoet, interest: bedrag, label });
        interest += bedrag;
        cursor = einde;
      }
    }
  }

  const forfait = regime === "handel" && params.metForfait !== false && hoofdsom > 0 ? B2B_FORFAIT_EUR : 0;
  const plafond = regime === "consument" ? berekenBoekXIXPlafond(hoofdsom) : null;

  return {
    regime,
    hoofdsom,
    van,
    tot,
    dagen: totaalDagen,
    periodes,
    interest,
    forfait,
    plafond,
    totaal: hoofdsom + interest + forfait,
    maanden,
  };
}

// ---------------------------------------------------------------------------
// Wettelijke vermeldingen: één bron van waarheid voor de uitleg op de site
// (client/src/seo/calculator-content/wettelijke-rentevoet-belgie.ts) en de
// briefsjablonen van de aanmaningsgenerator (client/src/lib/aanmaning).
// Wijzig een tekst hier, en hij verandert op beide plaatsen.
// ---------------------------------------------------------------------------

export const WETTELIJKE_VERMELDINGEN = {
  /** Wet 2 augustus 2002, art. 4: betalingstermijn tussen ondernemingen. */
  b2bBetalingstermijn:
    "Betalingstermijn: 30 kalenderdagen na ontvangst van de factuur als er niets is afgesproken. Contractueel mag de termijn maximaal 60 dagen bedragen (sinds 1 februari 2022); een langere termijn is nietig.",
  /** Wet 2 augustus 2002, art. 5: interest van rechtswege. */
  b2bInterestVanRechtswege:
    "De interest loopt van rechtswege vanaf de dag na de vervaldag. Een ingebrekestelling is niet nodig, al is een herinnering in de praktijk wel aan te raden.",
  /** Wet 2 augustus 2002, art. 6: forfait en redelijke invorderingskosten. */
  b2bForfait: `Forfaitaire schadevergoeding: €${B2B_FORFAIT_EUR} per onbetaalde factuur, van rechtswege, bovenop de interest. Daarnaast kunt u een redelijke vergoeding vragen voor hogere invorderingskosten, zoals de kosten van een incassobureau of advocaat.`,
  /** Boek XIX WER, art. XIX.2: kosteloze eerste herinnering en wachttermijn. */
  consumentEersteHerinnering: `Verkoopt u aan particulieren, dan gelden sinds 1 september 2023 strengere regels. Eerst stuurt u een kosteloze eerste herinnering. Daarna krijgt de consument ${CONSUMENT_WACHTTERMIJN_DAGEN} kalenderdagen de tijd om te betalen. Die termijn start de derde werkdag na verzending per post, of de dag na verzending bij een elektronische herinnering. Pas daarna mogen interest en een schadebeding aangerekend worden, en alleen als uw algemene voorwaarden dat voorzien.`,
  /** Boek XIX WER, art. XIX.4: plafond op interest plus kosten. */
  consumentPlafond:
    "Plafond op interest plus kosten samen: €20 bij een saldo tot en met €150; €30 plus 10% op de schijf van €150,01 tot €500; €65 plus 5% op het bedrag boven €500, met een absoluut maximum van €2.000.",
  /** Boek XIX WER, art. XIX.8: sanctie bij ontbrekende of foute eerste herinnering. */
  consumentGeenSchadebeding:
    "Is de eerste herinnering niet of niet correct verstuurd, dan is geen enkel schadebeding verschuldigd (art. XIX.8 WER).",
  /** Algemene disclaimer, letterlijk hergebruikt in de voettekst van elke modelbrief. */
  disclaimer:
    "Deze tool geeft algemene informatie en rekenhulp, geen juridisch advies: laat bij betwisting of grote bedragen uw berekening nakijken door een advocaat, gerechtsdeurwaarder of incassopartner.",
} as const;

/** Boek XIX WER, art. XIX.4: de verwijlinterest voor consumenten mag de referentievoet voor handelstransacties niet overschrijden. */
export function consumentMaxVoetTekst(jaar: number, voet: number): string {
  return `De verwijlinterest mag nooit hoger zijn dan de referentie-interestvoet voor handelstransacties (${formatPercent(voet)} in ${jaar}).`;
}

// ---------------------------------------------------------------------------
// Wachttermijn na de eerste herinnering aan een consument (art. XIX.2 WER).
// "Werkdag" volgens art. I.1 WER: alle kalenderdagen behalve zondagen en
// wettelijke feestdagen (zaterdag telt dus wel als werkdag).
// ---------------------------------------------------------------------------

export type HerinneringKanaal = "post" | "elektronisch";

function paasdatum(jaar: number): Date {
  // Anoniem gregoriaans algoritme (Meeus/Jones/Butcher).
  const a = jaar % 19;
  const b = Math.floor(jaar / 100);
  const c = jaar % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const maand = Math.floor((h + l - 7 * m + 114) / 31); // 3 = maart, 4 = april
  const dag = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(jaar, maand - 1, dag);
}

function plusDagen(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

function zelfdeDag(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/** Belgische wettelijke feestdagen voor een jaar. */
export function belgischeFeestdagen(jaar: number): Date[] {
  const pasen = paasdatum(jaar);
  return [
    new Date(jaar, 0, 1), // Nieuwjaar
    plusDagen(pasen, 1), // Paasmaandag
    new Date(jaar, 4, 1), // Dag van de Arbeid
    plusDagen(pasen, 39), // O.L.H. Hemelvaart
    plusDagen(pasen, 50), // Pinkstermaandag
    new Date(jaar, 6, 21), // Nationale feestdag
    new Date(jaar, 7, 15), // O.L.V. Hemelvaart
    new Date(jaar, 10, 1), // Allerheiligen
    new Date(jaar, 10, 11), // Wapenstilstand
    new Date(jaar, 11, 25), // Kerstmis
  ];
}

export function isWerkdag(d: Date): boolean {
  if (d.getDay() === 0) return false;
  return !belgischeFeestdagen(d.getFullYear()).some((f) => zelfdeDag(f, d));
}

export interface ConsumentWachttermijn {
  /** Eerste dag van de termijn van 14 kalenderdagen. */
  start: Date;
  /** Laatste dag waarop de consument nog kosteloos kan betalen (start + 14 dagen, dus ten minste 14 volle kalenderdagen). */
  uiterlijkeBetaaldag: Date;
  /** Eerste dag waarop interest en schadebeding mogen lopen (indien de voorwaarden dat voorzien). */
  interestVanaf: Date;
}

/**
 * Art. XIX.2 WER: de termijn van 14 kalenderdagen gaat in op de derde werkdag
 * na verzending van de herinnering per post, of op de kalenderdag na een
 * elektronische verzending.
 */
export function berekenConsumentWachttermijn(verzonden: Date, kanaal: HerinneringKanaal): ConsumentWachttermijn {
  const basis = new Date(verzonden.getFullYear(), verzonden.getMonth(), verzonden.getDate());
  let start: Date;
  if (kanaal === "elektronisch") {
    start = plusDagen(basis, 1);
  } else {
    let cursor = basis;
    let werkdagen = 0;
    while (werkdagen < 3) {
      cursor = plusDagen(cursor, 1);
      if (isWerkdag(cursor)) werkdagen++;
    }
    start = cursor;
  }
  const uiterlijkeBetaaldag = plusDagen(start, CONSUMENT_WACHTTERMIJN_DAGEN);
  return { start, uiterlijkeBetaaldag, interestVanaf: plusDagen(uiterlijkeBetaaldag, 1) };
}
