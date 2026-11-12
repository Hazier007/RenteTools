// CollectPro.be: minnelijke invordering en factuuropvolging voor kmo's.
// Interesten.be en CollectPro.be hebben dezelfde oprichter (Bart Deblock);
// die band vermelden we bij elke verwijzing. Dit bestand is de enige plek
// waar de CTA-regel en de disclosure-tekst staan, zodat pagina, e-mail en
// documentatie nooit uit elkaar lopen.

import type { InterestRegime } from "./wettelijke-interest";

export const COLLECTPRO_URL = "https://collectpro.be";
export const COLLECTPRO_NAAM = "CollectPro.be";
export const COLLECTPRO_CTA_LABEL = "Laat deze factuur innen via CollectPro.be";
export const COLLECTPRO_DISCLOSURE =
  "Transparantie: CollectPro.be en Interesten.be hebben dezelfde oprichter (Bart Deblock).";

/** Drempels waarboven een onbetaalde B2B-factuur de moeite is om uit handen te geven. */
export const COLLECTPRO_MIN_HOOFDSOM_EUR = 500;
export const COLLECTPRO_MIN_VERTRAGING_DAGEN = 30;

export interface CollectProCtaInput {
  regime: InterestRegime;
  hoofdsom: number;
  dagen: number;
}

/**
 * De CTA naar CollectPro tonen we enkel bij facturen tussen ondernemingen
 * (regime "handel"): minnelijke invordering van consumentenschulden door een
 * derde valt onder Boek XIX, titel 2 WER (inschrijving bij de FOD Economie),
 * dus daar verwijzen we niet door. Bovendien enkel als het bedrag of de
 * vertraging groot genoeg is om de stap te rechtvaardigen.
 */
export function collectProCtaVanToepassing({ regime, hoofdsom, dagen }: CollectProCtaInput): boolean {
  if (regime !== "handel") return false;
  if (!(hoofdsom > 0) || !(dagen > 0)) return false;
  return hoofdsom > COLLECTPRO_MIN_HOOFDSOM_EUR || dagen > COLLECTPRO_MIN_VERTRAGING_DAGEN;
}
