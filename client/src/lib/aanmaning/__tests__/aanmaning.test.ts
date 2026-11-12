import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { berekenWettelijkeInterest, berekenConsumentWachttermijn, isWerkdag } from "@shared/wettelijke-interest";
import { collectProCtaVanToepassing } from "@shared/collectpro";
import { stelBriefOp, sjablonenVoorRegime } from "../brief-teksten";
import { genereerAanmaningPdf } from "../pdf-generator";
import type { BriefGegevens } from "../types";

// Rekenvoorbeeld uit de opdracht: €5.000 B2B, 90 dagen in het eerste semester 2026 → €129,45 interest + €40 forfait.
const B2B_90_DAGEN = berekenWettelijkeInterest({
  hoofdsom: 5000,
  van: new Date(2026, 0, 15),
  tot: new Date(2026, 3, 15), // 90 dagen later
  regime: "handel",
});

const basisGegevens = (sjabloon: BriefGegevens["sjabloon"]): BriefGegevens => ({
  sjabloon,
  schuldeiser: {
    naam: "Hazier BV",
    adres: "Blijde-Inkomststraat 16\n9000 Gent",
    ondernemingsnummer: "0672.948.386",
    email: "info@hazier.be",
  },
  schuldenaar: { naam: "Klant NV", adres: "Stationsstraat 1\n2000 Antwerpen" },
  factuurnummer: "2026/015",
  factuurdatum: new Date(2025, 11, 15),
  vervaldag: new Date(2026, 0, 14),
  omschrijving: "websiteonderhoud januari 2026",
  betaalrekening: "BE68 5390 0754 7034",
  briefdatum: new Date(2026, 3, 15),
  termijnDagen: 8,
  herinneringKanaal: "post",
  herinneringVerzonden: new Date(2026, 3, 15),
});

describe("rekenvoorbeeld €5.000 B2B 90 dagen S1 2026", () => {
  it("geeft €129,45 interest en €40 forfait", () => {
    expect(B2B_90_DAGEN.dagen).toBe(90);
    expect(B2B_90_DAGEN.interest).toBeCloseTo(129.45, 2);
    expect(B2B_90_DAGEN.forfait).toBe(40);
    expect(B2B_90_DAGEN.totaal).toBeCloseTo(5169.45, 2);
  });
});

describe("briefteksten", () => {
  it("B2B-aanmaning vermeldt interest van rechtswege, forfait en totaal", () => {
    const brief = stelBriefOp(basisGegevens("b2b-aanmaning"), B2B_90_DAGEN);
    const tekst = brief.alineas.join(" ");
    expect(tekst).toContain("wet van 2 augustus 2002");
    expect(tekst).toContain("van rechtswege");
    expect(tekst).toContain("€40");
    expect(tekst).toContain("€129,45");
    expect(tekst).toContain("€5.169,45");
    expect(tekst).toContain("BE68 5390 0754 7034");
    expect(brief.bijlage?.rijen).toHaveLength(1);
    expect(brief.bijlage?.rijen[0].interest).toBe("€129,45");
    expect(brief.voettekst.join(" ")).toContain("geen juridisch advies");
  });

  it("ingebrekestelling noemt de termijn en de uiterste betaaldatum", () => {
    const brief = stelBriefOp(basisGegevens("b2b-ingebrekestelling"), B2B_90_DAGEN);
    const tekst = brief.alineas.join(" ");
    expect(tekst).toContain("in gebreke");
    expect(tekst).toContain("binnen 8 kalenderdagen");
    expect(tekst).toContain("23 april 2026");
  });

  it("consumentenherinnering rekent geen kosten aan en noemt de 14-dagentermijn met startdatum", () => {
    const berekening = berekenWettelijkeInterest({
      hoofdsom: 800,
      van: new Date(2026, 4, 5),
      tot: new Date(2026, 5, 5),
      regime: "consument",
    });
    const brief = stelBriefOp(basisGegevens("consument-eerste-herinnering"), berekening);
    const tekst = brief.alineas.join(" ");
    expect(tekst).toContain("kosteloze eerste herinnering");
    expect(tekst).toContain("geen kosten of interest");
    expect(tekst).toContain("14 kalenderdagen");
    // Verzonden per post op woensdag 15 april 2026 → derde werkdag = zaterdag 18 april 2026.
    expect(tekst).toContain("begint op 18 april 2026");
    expect(tekst).toContain("schadebeding in onze algemene voorwaarden");
    expect(tekst).toContain("€80,00"); // plafond: 65 + 5% van 300
    expect(brief.bijlage?.titel).toContain("indicatieve");
  });

  it("biedt per regime enkel de passende sjablonen aan", () => {
    expect(sjablonenVoorRegime("handel")).toEqual(["b2b-aanmaning", "b2b-ingebrekestelling"]);
    expect(sjablonenVoorRegime("consument")).toEqual(["consument-eerste-herinnering"]);
    expect(sjablonenVoorRegime("burgerlijk")).toEqual([]);
  });
});

describe("wachttermijn consument (art. XIX.2 WER)", () => {
  it("telt werkdagen zonder zondagen en feestdagen", () => {
    expect(isWerkdag(new Date(2026, 6, 21))).toBe(false); // nationale feestdag
    expect(isWerkdag(new Date(2026, 3, 6))).toBe(false); // paasmaandag 2026
    expect(isWerkdag(new Date(2026, 3, 11))).toBe(true); // zaterdag telt als werkdag
    // Verzonden donderdag 2 april 2026: vr 3, za 4 (zo 5 en paasmaandag 6 tellen niet), di 7 → start 7 april.
    const t = berekenConsumentWachttermijn(new Date(2026, 3, 2), "post");
    expect(t.start).toEqual(new Date(2026, 3, 7));
    expect(t.uiterlijkeBetaaldag).toEqual(new Date(2026, 3, 21));
  });

  it("start de dag na een elektronische verzending", () => {
    const t = berekenConsumentWachttermijn(new Date(2026, 3, 2), "elektronisch");
    expect(t.start).toEqual(new Date(2026, 3, 3));
  });
});

describe("CollectPro-CTA", () => {
  it("enkel bij B2B en boven €500 of meer dan 30 dagen", () => {
    expect(collectProCtaVanToepassing({ regime: "handel", hoofdsom: 5000, dagen: 90 })).toBe(true);
    expect(collectProCtaVanToepassing({ regime: "handel", hoofdsom: 300, dagen: 45 })).toBe(true);
    expect(collectProCtaVanToepassing({ regime: "handel", hoofdsom: 300, dagen: 10 })).toBe(false);
    expect(collectProCtaVanToepassing({ regime: "consument", hoofdsom: 5000, dagen: 90 })).toBe(false);
    expect(collectProCtaVanToepassing({ regime: "burgerlijk", hoofdsom: 5000, dagen: 90 })).toBe(false);
  });
});

describe("PDF-generatie", () => {
  const uitvoerMap = process.env.AANMANING_PDF_UITVOER;

  it.each(["b2b-aanmaning", "b2b-ingebrekestelling", "consument-eerste-herinnering"] as const)(
    "genereert een PDF met bijlage voor %s",
    async (sjabloon) => {
      const berekening =
        sjabloon === "consument-eerste-herinnering"
          ? berekenWettelijkeInterest({ hoofdsom: 800, van: new Date(2026, 4, 5), tot: new Date(2026, 5, 5), regime: "consument" })
          : B2B_90_DAGEN;
      const pdf = await genereerAanmaningPdf(basisGegevens(sjabloon), berekening);
      expect(pdf.paginas).toBeGreaterThanOrEqual(2);
      expect(pdf.bytes.byteLength).toBeGreaterThan(2000);
      expect(pdf.bytes.byteLength).toBeLessThan(200_000);
      expect(pdf.base64.length).toBeGreaterThan(0);
      expect(pdf.bestandsnaam.endsWith(".pdf")).toBe(true);
      if (uitvoerMap) {
        fs.mkdirSync(uitvoerMap, { recursive: true });
        fs.writeFileSync(path.join(uitvoerMap, pdf.bestandsnaam), Buffer.from(pdf.bytes));
      }
    },
  );
});
