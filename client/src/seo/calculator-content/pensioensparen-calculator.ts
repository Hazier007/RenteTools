import type { CalculatorEducationalContent } from "./types";

// Pensioensparen 2026: €1.050 aan 30% (max. €315 vermindering) of €1.350 aan 25%
// (max. €337,50). Eindbelasting 8% op 60 jaar (anticipatieve heffing), 33% bij
// opname vóór 60. Rekenvoorbeeld: 30 stortingen van €1.050 aan 4% (begin van het
// jaar) = €61.244,75; fictieve kapitalisatie aan 4,75% = €70.013,57 → 8% = €5.601.

export const pensioensparenCalculatorContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat berekent de pensioensparen-calculator?",
      blocks: [
        {
          kind: "p",
          text: "Pensioensparen is de derde pensioenpijler: u stort elk jaar een bedrag in een pensioenspaarfonds of pensioenspaarverzekering en krijgt daarvoor een belastingvermindering. Deze calculator berekent uw jaarlijkse belastingvoordeel bij een storting van €1.050 of €1.350, het kapitaal dat u opbouwt tot uw 65ste bij een gekozen rendement, en de eindbelasting van 8% die op uw 60ste verjaardag wordt ingehouden.",
        },
        {
          kind: "p",
          text: "De tool helpt u vooral bij één keuze die jaarlijks terugkomt: stort u €1.050 aan 30% of €1.350 aan 25%? En wat levert een extra tien jaar sparen op? Het rendement zelf is niet gegarandeerd bij een fonds; vul daarom meerdere scenario's in.",
        },
      ],
    },
    {
      heading: "Hoe wordt het belastingvoordeel berekend?",
      blocks: [
        {
          kind: "formula",
          text: "Storting ≤ €1.050: belastingvermindering = storting × 30%   |   Storting van €1.050,01 tot €1.350: belastingvermindering = storting × 25%",
        },
        {
          kind: "p",
          text: "Wie het standaardplafond van €1.050 stort, krijgt €315 terug. Wie bewust kiest voor het verhoogde plafond van €1.350, krijgt €337,50 terug, dus €22,50 meer voor €300 extra inleg. Let op de dode zone: stort u tussen €1.050 en €1.260, dan valt uw volledige storting onder het tarief van 25% en krijgt u minder terug dan bij exact €1.050. Pas vanaf €1.260 (25% × €1.260 = €315) haalt u het standaardvoordeel weer in.",
        },
        {
          kind: "p",
          text: "De vermindering wordt verrekend met de belasting die u verschuldigd bent. Omdat ook de aanvullende gemeentebelasting daalt, ligt het werkelijke voordeel een paar procent hoger dan 30% of 25%. Betaalt u weinig of geen belasting, dan krijgt u het verschil niet uitbetaald: de vermindering is niet terugbetaalbaar.",
        },
      ],
    },
    {
      heading: "Rekenvoorbeeld: 30 jaar lang €1.050 per jaar",
      blocks: [
        {
          kind: "p",
          text: "U start op 35 jaar en stort elk jaar in januari €1.050 in een pensioenspaarfonds dat gemiddeld 4% per jaar oplevert. Na 30 jaar hebt u €31.500 gestort en is uw kapitaal gegroeid tot ongeveer €61.245. Daarbovenop kreeg u 30 keer €315 belastingvermindering, samen €9.450. Uw werkelijke inleg was dus €22.050.",
        },
        {
          kind: "p",
          text: "Op uw 60ste verjaardag houdt de instelling de eindbelasting van 8% in. Voor een fonds wordt die niet op het werkelijke kapitaal berekend, maar op uw stortingen fictief gekapitaliseerd aan 4,75% per jaar. In dit voorbeeld komt dat neer op ongeveer €70.000 belastbare basis en dus ongeveer €5.600 eindbelasting. Stortingen tussen uw 60ste en 64ste geven nog recht op belastingvermindering en worden niet meer belast.",
        },
      ],
    },
    {
      heading: "Wettelijk en fiscaal kader pensioensparen 2026",
      blocks: [
        {
          kind: "ul",
          items: [
            "Maximumbedragen 2026: €1.050 (belastingvermindering 30%) of €1.350 (belastingvermindering 25%). Voor het verhoogde plafond moet u uitdrukkelijk kiezen bij uw bank of verzekeraar.",
            "U kunt starten vanaf 18 jaar en stortingen geven recht op vermindering tot en met het jaar waarin u 64 wordt.",
            "U mag per jaar maar voor één pensioenspaarrekening of -verzekering een vermindering vragen. Twee contracten in hetzelfde jaar: slechts één telt.",
            "Eindbelasting: 8% anticipatieve heffing op uw 60ste verjaardag, of op de tiende verjaardag van het contract als u het na uw 55ste afsloot. Voor een fonds berekend op de stortingen aan 4,75% fictief rendement, voor een Tak 21-verzekering op de gewaarborgde reserve zonder winstdeelname.",
            "Neemt u het kapitaal op vóór uw 60ste, dan betaalt u 33% belasting plus gemeentebelasting, tenzij u met wettelijk pensioen gaat.",
            "Op de premies van een pensioenspaarverzekering is geen premietaks van 2% verschuldigd, in tegenstelling tot een gewone Tak 21-spaarverzekering.",
          ],
        },
        {
          kind: "p",
          text: "Bronnen: FOD Financiën (belastingvermindering pensioensparen, art. 145/8 en 145/9 WIB92, anticipatieve heffing), Wikifin van de FSMA (pensioensparen en de drie pijlers) en de fiche 281.60 die uw instelling jaarlijks bezorgt.",
        },
      ],
    },
    {
      heading: "Pensioenspaarfonds of pensioenspaarverzekering?",
      blocks: [
        {
          kind: "p",
          text: "Een pensioenspaarfonds belegt in aandelen en obligaties; het rendement is niet gegarandeerd en kan negatief zijn, maar lag historisch hoger. Een pensioenspaarverzekering (Tak 21) geeft een gewaarborgde rentevoet plus een eventuele winstdeelname; het kapitaal is beschermd. Het belastingvoordeel is in beide gevallen identiek. Wie meer dan vijftien jaar van zijn pensioen zit, kiest vaak een fonds en schakelt later over naar een defensiever fonds of een verzekering.",
        },
      ],
    },
    {
      heading: "Veelgemaakte fouten bij pensioensparen",
      blocks: [
        {
          kind: "ul",
          items: [
            "Een bedrag tussen €1.050 en €1.260 storten: u krijgt dan minder belastingvermindering dan bij exact €1.050.",
            "Vergeten dat stortingen na het jaar waarin u 64 wordt geen vermindering meer geven.",
            "In hetzelfde jaar op twee contracten storten en denken dat beide meetellen.",
            "Het contract pas na uw 55ste openen zonder te weten dat de eindbelasting dan pas na tien jaar valt.",
            "Het kapitaal vóór 60 opnemen en 33% in plaats van 8% betalen.",
            "De vermindering niet in de aangifte terugvinden: controleer code 1361/2361 aan de hand van fiche 281.60.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Hoeveel mag ik storten voor pensioensparen in 2026?",
      answer:
        "Maximaal €1.050 voor een belastingvermindering van 30% (€315), of maximaal €1.350 voor een vermindering van 25% (€337,50). Voor het verhoogde plafond moet u uitdrukkelijk kiezen bij uw bank of verzekeraar; anders blokkeert zij stortingen boven €1.050.",
    },
    {
      question: "Hoeveel belastingvoordeel krijg ik met pensioensparen?",
      answer:
        "30% van uw storting tot €1.050, dus maximaal €315 per jaar. Kiest u voor het plafond van €1.350, dan krijgt u 25% op de volledige storting, dus maximaal €337,50. Omdat ook uw gemeentebelasting daalt, ligt het werkelijke voordeel iets hoger. U moet wel voldoende belasting betalen: de vermindering wordt niet terugbetaald.",
    },
    {
      question: "Is €1.350 storten beter dan €1.050?",
      answer:
        "Alleen als u de volle €1.350 stort: dan krijgt u €337,50 in plaats van €315, dus €22,50 extra voor €300 meer inleg. Stort u tussen €1.050 en €1.260, dan krijgt u minder terug dan bij €1.050, omdat het tarief van 25% dan op uw volledige storting geldt. Het extra kapitaal groeit wel mee tot uw pensioen.",
    },
    {
      question: "Hoeveel belasting betaal ik bij uitbetaling van mijn pensioensparen?",
      answer:
        "8% anticipatieve heffing, ingehouden op uw 60ste verjaardag (of tien jaar na de start als u na uw 55ste begon). Voor een pensioenspaarfonds wordt die berekend op uw stortingen fictief gekapitaliseerd aan 4,75%, niet op het werkelijke kapitaal. Neemt u het geld vóór 60 op, dan betaalt u 33% plus gemeentebelasting.",
    },
    {
      question: "Tot welke leeftijd kan ik pensioensparen?",
      answer:
        "U kunt starten vanaf 18 jaar en stortingen geven recht op belastingvermindering tot en met het jaar waarin u 64 wordt. Stortingen na uw 60ste verjaardag blijven fiscaal voordelig en worden niet meer belast, omdat de eindbelasting van 8% al op uw 60ste is ingehouden.",
    },
    {
      question: "Pensioenspaarfonds of pensioenspaarverzekering: wat is het verschil?",
      answer:
        "Een fonds belegt in aandelen en obligaties zonder gegarandeerd rendement; een verzekering (Tak 21) biedt een gewaarborgde rentevoet met kapitaalbescherming en eventuele winstdeelname. Het belastingvoordeel is identiek. Een fonds past bij een lange horizon, een verzekering bij wie geen koersschommelingen wil of dicht bij zijn pensioen zit.",
    },
  ],
};
