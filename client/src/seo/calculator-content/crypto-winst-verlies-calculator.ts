import type { CalculatorEducationalContent } from "./types";

export const cryptoWinstVerliesCalculatorContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat doet de Crypto Winst/Verlies Calculator?",
      blocks: [
        {
          kind: "p",
          text: "De Crypto Winst/Verlies Calculator berekent uw werkelijke rendement op cryptocurrency-transacties in België — inclusief aankoop- en verkoopkosten, en uitgedrukt zowel in EUR-bedragen als in percentages ROI. De tool toont uw cost basis volgens FIFO (first-in-first-out), uw break-even prijs, en het exact moment waarop u winst maakt na alle kosten. Onmisbaar voor wie zicht wil op zijn portefeuilleprestaties en — minstens even belangrijk in België — wie weet wil hebben in welk fiscaal vakje (privébeheer, speculatief of beroepsmatig) zijn winst hoort.",
        },
      ],
    },
    {
      heading: "Hoe werkt het?",
      blocks: [
        {
          kind: "p",
          text: "De calculator gebruikt de standaard ROI-formules met expliciete handling van transactiekosten:",
        },
        {
          kind: "formula",
          text: "Netto winst = (Verkoopprijs × Hoeveelheid × (1 − verkoopfee%)) − (Aankoopprijs × Hoeveelheid × (1 + aankoopfee%))",
        },
        {
          kind: "formula",
          text: "ROI % = (Netto winst ÷ Totale aankoopkost) × 100",
        },
        {
          kind: "formula",
          text: "Break-even prijs = Aankoopprijs × (1 + aankoopfee% + verkoopfee%) / (1 − verkoopfee%)",
        },
        {
          kind: "p",
          text: "U voert in: aankoopprijs, aankoophoeveelheid, aankoopfee% (typisch 0,1-1% afhankelijk van exchange), verkoopprijs en verkoopfee%. De tool berekent:",
        },
        {
          kind: "ul",
          items: [
            "Netto winst of verlies in EUR.",
            "ROI % na alle kosten.",
            "Break-even prijs — minimum verkoopkoers om quitte te spelen.",
            "Cost basis FIFO voor wie meerdere lots gespreid in tijd heeft aangekocht.",
          ],
        },
        {
          kind: "p",
          text: "Voorbeeld: 1 BTC gekocht aan €40.000 met 0,5% fee en verkocht aan €55.000 met 0,5% fee = bruto winst van €15.000, netto ±€14.500 (≈36% ROI). Voor portefeuilles met veel transacties is een gedisciplineerde FIFO-administratie essentieel — exchanges leveren CSV-exports, vergeet die niet te bewaren voor uw boekhouding en eventuele controle door de FOD Financiën.",
        },
      ],
    },
    {
      heading: "Belgisch fiscaal kader",
      blocks: [
        {
          kind: "p",
          text: "België behandelt crypto-meerwaarden volgens drie regimes, beoordeeld per individueel dossier door de FOD Financiën:",
        },
        {
          kind: "ul",
          items: [
            "Normaal beheer (\"goede huisvader\"): 0% personenbelasting op meerwaarden. Vereist: lange-termijn buy-and-hold, beperkte transacties, geen krediet of leverage.",
            "Speculatief: 33% diverse inkomsten (Art. 90 1° WIB92). Triggers: hoge frequentie, korte holding periods, leveraged trading.",
            "Beroepsmatig: progressieve personenbelasting tot 50% + sociale bijdragen. Triggers: trading als hoofdinkomen, georganiseerde structuur.",
          ],
        },
        {
          kind: "p",
          text: "Sinds 2023 geldt de DAC8-richtlijn: Belgische en buitenlandse exchanges met Belgische klanten rapporteren transacties automatisch aan de FOD Financiën vanaf 2026. Een voorafgaande beslissing bij de Dienst Voorafgaande Beslissingen (DVB) biedt rechtszekerheid over uw regime. Verliezen zijn in privé-beheer niet aftrekbaar; bij speculatief regime alleen binnen dezelfde categorie diverse inkomsten van hetzelfde belastingjaar.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Hoe bereken ik mijn cost basis bij meerdere aankopen?",
      answer:
        "Met FIFO (first-in-first-out): de oudste aankopen worden als eerste verkocht voor fiscale doeleinden. Houd alle aankoopprijzen en hoeveelheden bij — exchange-CSV's zijn de bron van waarheid.",
    },
    {
      question: "Tellen transactiekosten mee voor de Belgische fiscus?",
      answer:
        "Ja. Aankoop- en verkoopkosten verlagen uw belastbare meerwaarde in alle drie de regimes. Bewaar dus elke fee-bevestiging.",
    },
    {
      question: "Wanneer ben ik \"speculatief\" volgens de FOD Financiën?",
      answer:
        "Er is geen vaste numerieke drempel — de DVB kijkt naar het geheel van indicatoren: frequentie, omvang versus inkomen, gebruik van krediet, professionele tools, holding period. Ruwweg geldt: meer dan een handvol transacties per jaar, gecombineerd met korte holding periods of leverage, leunt richting speculatief.",
    },
    {
      question: "Moet ik mijn crypto aangeven in de personenbelasting?",
      answer:
        "Het bezit zelf niet (geen vermogensbelasting in België), maar gerealiseerde meerwaarden wel zodra het regime \"speculatief\" of \"beroepsmatig\" is. Buitenlandse exchange-rekeningen moeten sowieso aan het Centraal Aanspreekpunt (CAP) van de Nationale Bank gemeld worden, ongeacht het bedrag.",
    },
    {
      question: "Wat met staking, lending en airdrops?",
      answer:
        "Inkomsten uit staking en lending worden doorgaans als roerende inkomsten beschouwd (30% roerende voorheffing). Airdrops zonder tegenprestatie kunnen onder diverse inkomsten vallen. Voor DeFi-constructies is een DVB-ruling aangeraden.",
    },
  ],
};
