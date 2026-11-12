import type { CalculatorEducationalContent } from "./types";

// Wettelijke pensioenleeftijd: 66 jaar sinds 1 februari 2025, 67 jaar vanaf
// 1 februari 2030. Vervroegd pensioen: 63 jaar met 42 loopbaanjaren, 61 met 43,
// 60 met 44. Volledige loopbaan = 45 jaar. Rekenvoorbeeld 4%-regel: tekort
// €900/maand = €10.800/jaar → €270.000 kapitaal (3,5%: €308.571).

export const pensioenCalculatorContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat berekent de pensioen-calculator?",
      blocks: [
        {
          kind: "p",
          text: "Deze pensioen-calculator brengt uw toekomstig pensioeninkomen samen uit de drie pijlers: het wettelijk pensioen, het aanvullend pensioen via uw werkgever (groepsverzekering of pensioenfonds) en uw eigen pensioensparen. U vult uw huidige leeftijd, gewenste pensioenleeftijd, verwacht wettelijk pensioen en uw opgebouwde reserves in. De tool berekent uw vervangingsratio (pensioeninkomen gedeeld door uw laatste inkomen), het maandelijkse tekort en het kapitaal dat u nodig hebt om dat tekort te dichten.",
        },
        {
          kind: "p",
          text: "Het exacte bedrag van uw wettelijk pensioen vindt u op mypension.be, het officiële portaal van de Federale Pensioendienst. Neem dat cijfer als vertrekpunt; de calculator vult aan wat u zelf moet opbouwen.",
        },
      ],
    },
    {
      heading: "Hoe wordt het wettelijk pensioen in België berekend?",
      blocks: [
        {
          kind: "p",
          text: "Het wettelijk pensioen van een werknemer wordt per loopbaanjaar opgebouwd. Voor elk jaar neemt de Federale Pensioendienst uw brutoloon van dat jaar, herwaardeert het naar vandaag, begrenst het tot het loonplafond en past er 60% (alleenstaande) of 75% (gezinspensioen) op toe. Het resultaat wordt gedeeld door 45, het aantal jaren van een volledige loopbaan.",
        },
        {
          kind: "formula",
          text: "Wettelijk pensioen per jaar = Σ over alle loopbaanjaren van (geherwaardeerd en begrensd brutojaarloon × 60% of 75%) ÷ 45",
        },
        {
          kind: "p",
          text: "Een voorbeeld: één loopbaanjaar met een geherwaardeerd brutoloon van €36.000 levert als alleenstaande 36.000 × 60% ÷ 45 = €480 pensioen per jaar op, ofwel €40 per maand. Vijfenveertig zulke jaren geven €21.600 bruto per jaar. Omdat het loonplafond hogere lonen afkapt, daalt de vervangingsratio sterk voor wie meer verdient: het wettelijk pensioen vervangt bij hogere inkomens vaak minder dan de helft van het laatste loon.",
        },
      ],
    },
    {
      heading: "Pensioenleeftijd en vervroegd pensioen",
      blocks: [
        {
          kind: "ul",
          items: [
            "De wettelijke pensioenleeftijd is 66 jaar sinds 1 februari 2025 en wordt 67 jaar vanaf 1 februari 2030.",
            "Vervroegd pensioen kan vanaf 63 jaar met 42 loopbaanjaren, vanaf 61 jaar met 43 loopbaanjaren en vanaf 60 jaar met 44 loopbaanjaren.",
            "Een volledige loopbaan telt 45 jaar. Elk jaar minder verlaagt uw pensioen met ongeveer 1/45ste.",
            "Langer werken dan uw vroegst mogelijke pensioendatum kan recht geven op een pensioenbonus. De precieze voorwaarden en bedragen vindt u op mypension.be.",
          ],
        },
      ],
    },
    {
      heading: "Rekenvoorbeeld: hoeveel kapitaal hebt u nodig?",
      blocks: [
        {
          kind: "p",
          text: "Stel dat u na uw pensioen €2.500 netto per maand wilt besteden en mypension.be een wettelijk pensioen van €1.600 netto raamt. Het tekort is €900 per maand of €10.800 per jaar. Volgens de 4%-regel hebt u dan een kapitaal van €10.800 ÷ 4% = €270.000 nodig op uw pensioendatum. Rekent u voorzichtiger met 3,5%, dan wordt dat €308.571.",
        },
        {
          kind: "p",
          text: "Hoe bouwt u dat op? Wie 30 jaar lang €300 per maand belegt aan gemiddeld 5% per jaar, komt uit op ongeveer €249.678. Een groepsverzekering van uw werkgever of pensioensparen (€1.050 of €1.350 per jaar met belastingvermindering) vullen de rest aan. De calculator rekent dit voor u door, met uw eigen cijfers en inflatieverwachting.",
        },
      ],
    },
    {
      heading: "De drie pensioenpijlers en hun belasting",
      blocks: [
        {
          kind: "ul",
          items: [
            "Eerste pijler: het wettelijk pensioen, uitbetaald door de Federale Pensioendienst en belast als vervangingsinkomen in de personenbelasting, met een belastingvermindering voor pensioenen.",
            "Tweede pijler: het aanvullend pensioen via de werkgever (groepsverzekering, pensioenfonds, VAPZ voor zelfstandigen). Het kapitaal wordt afzonderlijk belast: 10% op werknemersbijdragen; op werkgeversbijdragen 10% als u tot de wettelijke pensioenleeftijd werkt of een volledige loopbaan hebt, anders 16,5% tot 20% afhankelijk van uw leeftijd. Daarbovenop komen een RIZIV-bijdrage van 3,55% en een solidariteitsbijdrage tot 2%.",
            "Derde pijler: pensioensparen (€1.050 aan 30% of €1.350 aan 25% belastingvermindering in 2026) en langetermijnsparen, met een eindbelasting van 8% op uw 60ste.",
            "Vierde pijler: vrij sparen en beleggen zonder fiscaal voordeel, maar ook zonder voorwaarden over leeftijd of opname.",
          ],
        },
        {
          kind: "p",
          text: "Bronnen: Federale Pensioendienst (mypension.be, berekening en pensioenleeftijd), FOD Financiën (belasting van pensioenkapitalen) en Wikifin van de FSMA (de pensioenpijlers uitgelegd).",
        },
      ],
    },
    {
      heading: "Veelgemaakte fouten bij pensioenplanning",
      blocks: [
        {
          kind: "ul",
          items: [
            "Rekenen met uw huidige uitgaven zonder inflatie: aan 2% inflatie kost hetzelfde leven over 25 jaar 64% meer.",
            "Het wettelijk pensioen schatten op basis van uw laatste loon in plaats van op mypension.be te kijken; het loonplafond drukt het pensioen van hogere inkomens.",
            "De belasting op het kapitaal van de groepsverzekering en het pensioensparen vergeten in het eindbedrag.",
            "Pas na 50 beginnen: de helft van een pensioenkapitaal komt doorgaans uit de laatste tien jaar samengestelde interest, maar alleen als de eerste twintig jaar al gelopen zijn.",
            "Alleen op de eerste pijler vertrouwen terwijl die voor middeninkomens zelden meer dan 60% tot 70% van het laatste nettoloon vervangt.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Wat is de wettelijke pensioenleeftijd in België?",
      answer:
        "66 jaar sinds 1 februari 2025. Vanaf 1 februari 2030 wordt dat 67 jaar. Wie geboren is vanaf 1964 gaat dus in principe op 67 met pensioen. Vervroegd pensioen blijft mogelijk vanaf 60 tot 63 jaar als u voldoende loopbaanjaren hebt.",
    },
    {
      question: "Wanneer kan ik vervroegd met pensioen?",
      answer:
        "Vanaf 63 jaar als u 42 loopbaanjaren hebt, vanaf 61 jaar met 43 loopbaanjaren en vanaf 60 jaar met 44 loopbaanjaren. Uw vroegst mogelijke pensioendatum staat op mypension.be. Vervroegd stoppen betekent wel minder loopbaanjaren en dus een lager pensioen.",
    },
    {
      question: "Hoeveel pensioen krijg ik later?",
      answer:
        "Dat hangt af van uw aantal loopbaanjaren, uw geherwaardeerde lonen en uw gezinssituatie: per jaar telt 60% (alleenstaande) of 75% (gezin) van het begrensde loon, gedeeld door 45. Het enige betrouwbare cijfer is uw persoonlijke raming op mypension.be; gebruik dat bedrag als invoer in de calculator.",
    },
    {
      question: "Hoeveel kapitaal heb ik nodig voor mijn pensioen?",
      answer:
        "Bereken eerst uw maandelijks tekort (gewenst inkomen min wettelijk en aanvullend pensioen) en vermenigvuldig het jaarbedrag met 25 (de 4%-regel) of met 28,5 voor een voorzichtiger opnamepercentage van 3,5%. Een tekort van €900 per maand vraagt zo €270.000 tot €308.571 kapitaal op uw pensioendatum.",
    },
    {
      question: "Wat is de 4%-regel en werkt ze in België?",
      answer:
        "De 4%-regel zegt dat u elk jaar 4% van uw startkapitaal kunt opnemen, jaarlijks aangepast aan de inflatie, met een grote kans dat het kapitaal minstens 30 jaar meegaat. Ze is gebaseerd op Amerikaanse marktgegevens. Voor België rekent u beter met 3% tot 3,5%, omdat de roerende voorheffing van 30% op interesten en dividenden het nettorendement verlaagt.",
    },
    {
      question: "Hoe wordt mijn aanvullend pensioen (groepsverzekering) belast?",
      answer:
        "Het kapitaal uit werkgeversbijdragen wordt belast aan 10% als u werkt tot de wettelijke pensioenleeftijd of een volledige loopbaan van 45 jaar hebt; stopt u vroeger, dan geldt 16,5% tot 20% afhankelijk van uw leeftijd. Het kapitaal uit eigen bijdragen wordt belast aan 10%. Daarbovenop komen een RIZIV-bijdrage van 3,55% en een solidariteitsbijdrage van 0% tot 2%, plus gemeentebelasting.",
    },
  ],
};
