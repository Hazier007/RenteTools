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
