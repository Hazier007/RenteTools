import type { CalculatorEducationalContent } from "./types";

export const leasingkredietCalculatorContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat doet de Leasingkrediet Calculator?",
      blocks: [
        {
          kind: "p",
          text: "De Leasingkrediet Calculator vergelijkt financial leasing (huurkoop, met optie tot eigendom) en operational leasing (gewoon huren, geen eigendom) voor wagens, machines en bedrijfsmaterieel in België. De tool berekent maandlasten, restwaarde, totale kost over de looptijd, en de fiscale impact — zodat u kunt bepalen welke vorm het meest voordelig is voor uw situatie. Onmisbaar voor zelfstandigen, KMO-zaakvoerders en particulieren die overwegen te leasen in plaats van te kopen of een klassieke autolening af te sluiten.",
        },
      ],
    },
    {
      heading: "Hoe werkt het?",
      blocks: [
        {
          kind: "p",
          text: "De calculator gebruikt twee scenarioformules. Voor financial leasing met optionele aankoop op het einde geldt een vereenvoudigde maandformule:",
        },
        {
          kind: "formula",
          text: "Maandlast = (Aankoopprijs − Restwaarde) ÷ Looptijd × (1 + i)",
        },
        {
          kind: "p",
          text: "Voor operational leasing is de maandlast doorgaans hoger, omdat de leasingmaatschappij ook risico, onderhoud en eventueel verzekering inrekent — maar u betaalt geen restwaarde op het einde en heeft geen eigendomsrisico.",
        },
        {
          kind: "p",
          text: "U voert in: aankoopprijs of catalogusprijs, gewenste looptijd (typisch 36-60 maanden), restwaarde percentage, JKP/leasingfactor, en BTW-status (particulier of onderneming met BTW-aftrek). De tool toont vervolgens:",
        },
        {
          kind: "ul",
          items: [
            "Maandlast in beide scenario's.",
            "Totale kost over de looptijd inclusief eventuele aankoopoptie.",
            "Vergelijking met klassieke autolening bij dezelfde aankoopprijs.",
            "BTW-recuperatiebedrag voor BTW-plichtige ondernemingen.",
          ],
        },
        {
          kind: "p",
          text: "Voorbeeld: een bedrijfswagen van €40.000 over 48 maanden met 30% restwaarde komt bij financial lease op ±€680/maand (ex BTW), bij operational lease op ±€790/maand all-in (incl. onderhoud).",
        },
      ],
    },
    {
      heading: "Belgisch fiscaal kader",
      blocks: [
        {
          kind: "p",
          text: "Leasing in België valt onder strikte FSMA-regelgeving — leasingmaatschappijen moeten geregistreerd zijn. Voor bedrijfswagens geldt de fiscale aftrekbaarheid op CO₂-basis: sinds 2026 is voor nieuwe verbrandingsmotoren de aftrekbaarheid sterk afgebouwd (typisch 0-50% afhankelijk van datum bestelling en CO₂-uitstoot), terwijl 100% elektrische bedrijfswagens nog volledig (100%) aftrekbaar zijn — die laatste tarieven worden vanaf 2027 ook geleidelijk afgebouwd volgens de federale klimaattransitie. Voor BTW-plichtige ondernemingen is de BTW op leasing recupereerbaar tot maximaal 50% (gemengd zakelijk/privé-gebruik) of 100% (zuiver zakelijk en aangetoond met rittenadministratie). Voordeel alle aard (VAA) bij privégebruik wordt jaarlijks bepaald op basis van cataloguswaarde, leeftijd en CO₂. Voor financial leasing wordt het materieel typisch op uw balans geactiveerd; bij operational leasing blijft het off-balance, wat KMO's helpt om hun balansratio's te verbeteren.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Wat is het verschil tussen financial en operational leasing?",
      answer:
        "Bij financial leasing huurt u met de bedoeling om eigenaar te worden — er is een aankoopoptie aan het einde (vaak 1-15% van de oorspronkelijke prijs). Bij operational leasing huurt u zonder eigendomsambitie; de wagen of het materieel keert terug naar de leasingmaatschappij.",
    },
    {
      question: "Wat is een leasingfactor?",
      answer:
        "De leasingfactor is een Belgische sectorstandaard: het maandelijks leasingbedrag uitgedrukt als percentage van de cataloguswaarde. Een factor van 1,75% op een wagen van €40.000 = €700/maand. Vergelijk leasingaanbiedingen vooral op leasingfactor en op de JKP-equivalent, niet op het brute maandbedrag alleen.",
    },
    {
      question: "Is leasen voordeliger dan kopen?",
      answer:
        "Voor zelfstandigen en BTW-plichtige ondernemingen vaak wel, dankzij BTW-aftrek en gespreide kosten. Voor particulieren: zelden — een klassieke autolening of contante aankoop is doorgaans goedkoper over de volledige eigendomsperiode.",
    },
    {
      question: "Wat als ik vroegtijdig de leasing wil stopzetten?",
      answer:
        "Vroegtijdige stopzetting kost een vergoeding op basis van resterende looptijd en restwaarde. Bij operational leasing is dat doorgaans 50-80% van de resterende huurfactuur. Lees uw contract goed vóór te tekenen.",
    },
    {
      question: "Tellen onderhoudskosten mee in operational lease?",
      answer:
        "Vaak wel — het is precies het kenmerk van full operational lease (FOL): all-in maandlast inclusief onderhoud, banden, verzekering en pechbijstand. Vraag de exacte servicelijst op vóór te ondertekenen.",
    },
  ],
};
