import type { CalculatorEducationalContent } from "./types";

export const noodfondsCalculatorContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat doet de Noodfonds Calculator?",
      blocks: [
        {
          kind: "p",
          text: "De Noodfonds Calculator berekent hoe groot uw financiële buffer moet zijn om onverwachte tegenslagen op te vangen — werkverlies, ziekte, een defecte verwarmingsketel of onverwachte herstellingen. De tool houdt rekening met uw vaste maandelijkse uitgaven, gezinssituatie, werkzekerheid en inkomensbron (single, dubbel, freelance) en geeft u een persoonlijk aanbevolen spaarbedrag, plus een tijdslijn voor wanneer u dat doel haalt op basis van uw huidige spaartempo. Ideaal voor wie financiële gemoedsrust wil zonder te overdrijven met overbodig grote reserves.",
        },
      ],
    },
    {
      heading: "Hoe werkt het?",
      blocks: [
        {
          kind: "p",
          text: "Het basisprincipe is eenvoudig:",
        },
        {
          kind: "formula",
          text: "Aanbevolen noodfonds = Vaste maandelijkse uitgaven × Aantal aanbevolen maanden",
        },
        {
          kind: "p",
          text: "De aanbevolen periode (3 tot 12 maanden) wordt aangepast op basis van uw risicoprofiel:",
        },
        {
          kind: "ul",
          items: [
            "Basis: 3 maanden voor tweeverdieners met stabiele tewerkstelling.",
            "+2 maanden voor singles of eenverdieners (geen vangnet via partner).",
            "+3 maanden voor zelfstandigen of freelancers (variabel inkomen, geen werkloosheidsuitkering).",
            "+1 tot 2 maanden bij lage werkzekerheid (tijdelijk contract, krimpende sector).",
            "+1 maand met kinderen ten laste.",
          ],
        },
        {
          kind: "p",
          text: "De calculator vertaalt dit ook naar tijd-tot-doel: (Aanbevolen bedrag − Huidige reserve) ÷ Maandelijks spaarbedrag = Aantal maanden. Voorbeeld: een Belgisch tweeverdienergezin met €2.600 vaste uitgaven en hoge werkzekerheid heeft een buffer van €7.800 nodig (3 maanden). Een freelancer met dezelfde uitgaven mikt op €15.600 (6 maanden) of meer.",
        },
      ],
    },
    {
      heading: "Belgisch fiscaal kader",
      blocks: [
        {
          kind: "p",
          text: "Een noodfonds moet liquide zijn — direct beschikbaar zonder boetes. De gereglementeerde Belgische spaarrekening is hiervoor de standaardkeuze: rente is gedeeltelijk vrijgesteld (€1.020 per persoon in 2026) en geld is direct opvraagbaar. Termijnrekeningen, kasbons en Tak 21-verzekeringen zijn ongeschikt: een vroegtijdige opname kost rente of een uitstapboete. Beleggingen (ETF's, aandelen) zijn ook af te raden voor het noodfonds — bij een crash kan u net moeten verkopen wanneer de markt daalt. Voor een buffer boven €100.000 is het verstandig om te spreiden over twee Belgische banken: het Belgisch depositogarantiestelsel dekt maximaal €100.000 per persoon per bank bij faillissement.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Hoe groot moet mijn noodfonds minimaal zijn?",
      answer:
        "Voor de meeste Belgische gezinnen: minimaal 3 maanden vaste uitgaven (huur of hypotheek, voeding, energie, verzekeringen, transport). Singles, freelancers of mensen met lage werkzekerheid: 6 maanden of meer.",
    },
    {
      question: "Op welke rekening zet ik mijn noodfonds?",
      answer:
        "Op een gereglementeerde Belgische spaarrekening. Direct beschikbaar, gedeeltelijk belastingvrij, en gedekt door het depositogarantiestelsel tot €100.000 per bank. Vermijd termijnrekeningen of beleggingen voor dit specifieke doel.",
    },
    {
      question: "Wat als ik nog geen noodfonds heb?",
      answer:
        "Begin klein: mik eerst op €1.000-€2.000 als startbuffer voor onmiddellijke noodgevallen. Bouw daarna geleidelijk op tot het volledige aanbevolen bedrag, met een vast maandelijks spaarbedrag.",
    },
    {
      question: "Tellen schulden mee in de berekening?",
      answer:
        "Ja — vaste afbetalingen (hypotheek, autolening, persoonlijke lening) horen bij uw maandelijkse vaste uitgaven, want die moeten ook tijdens werkverlies doorbetaald worden.",
    },
    {
      question: "Mag ik mijn noodfonds gebruiken voor geplande grote uitgaven?",
      answer:
        "Nee. Voor geplande uitgaven (vakantie, nieuwe wagen) gebruikt u de Doelspaarcalculator. Het noodfonds blijft uitsluitend gereserveerd voor onverwachte gebeurtenissen.",
    },
  ],
};
