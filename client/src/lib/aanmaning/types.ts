import type { HerinneringKanaal, InterestBerekening } from "@shared/wettelijke-interest";

/**
 * De drie briefsjablonen van de aanmaningsgenerator.
 * - b2b-aanmaning: eerste aanmaning aan een onderneming (wet 2 augustus 2002).
 * - b2b-ingebrekestelling: laatste herinnering met termijn, vóór invordering.
 * - consument-eerste-herinnering: kosteloze eerste herinnering (Boek XIX WER).
 */
export type BriefSjabloon = "b2b-aanmaning" | "b2b-ingebrekestelling" | "consument-eerste-herinnering";

export interface Partij {
  naam: string;
  /** Meerdere regels toegestaan (straat, postcode gemeente). */
  adres: string;
  ondernemingsnummer?: string;
  email?: string;
  telefoon?: string;
}

export interface BriefGegevens {
  sjabloon: BriefSjabloon;
  schuldeiser: Partij;
  schuldenaar: Partij;
  factuurnummer: string;
  factuurdatum: Date | null;
  vervaldag: Date | null;
  /** Omschrijving van het product of de dienst (verplicht in de consumentenherinnering, art. XIX.2 WER). */
  omschrijving?: string;
  /** IBAN waarop betaald moet worden. */
  betaalrekening: string;
  briefdatum: Date;
  /** Enkel ingebrekestelling: aantal kalenderdagen om alsnog te betalen. */
  termijnDagen?: number;
  /** Enkel consument: hoe en wanneer de herinnering verzonden wordt (bepaalt de start van de 14 dagen). */
  herinneringKanaal?: HerinneringKanaal;
  herinneringVerzonden?: Date;
}

export interface BijlageRij {
  periode: string;
  dagen: string;
  voet: string;
  interest: string;
}

export interface BriefBijlage {
  titel: string;
  intro: string[];
  kolommen: [string, string, string, string];
  rijen: BijlageRij[];
  totalen: Array<{ label: string; bedrag: string; vet?: boolean }>;
  noten: string[];
}

/** Platte, lettertype-onafhankelijke briefinhoud; de PDF-renderer zet dit om. */
export interface BriefInhoud {
  bestandsnaam: string;
  afzender: string[];
  geadresseerde: string[];
  plaatsDatum: string;
  betreft: string;
  aanhef: string;
  alineas: string[];
  slot: string[];
  bijlage: BriefBijlage | null;
  voettekst: string[];
}

export interface BriefInput {
  gegevens: BriefGegevens;
  berekening: InterestBerekening;
}
