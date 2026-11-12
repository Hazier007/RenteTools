import type { CalculatorEducationalContent } from "./types";

// Rekenvoorbeelden zijn exact berekend met de formule FV = PV × (1 + r)^t en
// de annuïteitenformule voor periodieke stortingen; bedragen afgerond op de cent.

export const samengesteldeInterestBerekenenContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat berekent deze samengestelde-interestcalculator?",
      blocks: [
        {
          kind: "p",
          text: "Samengestelde interest, ook rente op rente of compound interest genoemd, betekent dat de interest die u verdient bij uw kapitaal wordt gevoegd en het jaar erna zelf interest opbrengt. Deze calculator toont hoe een startkapitaal en eventuele periodieke stortingen groeien over een gekozen looptijd, bij een gekozen rentevoet en kapitalisatiefrequentie. U ziet het eindkapitaal, het totaal aan ontvangen interest en het verschil met enkelvoudige interest.",
        },
        {
          kind: "p",
          text: "De tool is bedoeld om scenario's te vergelijken: wat verandert er als u vijf jaar vroeger begint, €50 per maand meer stort of 1% meer rendement haalt? Dat zijn de drie hefbomen van samengestelde interest, en de looptijd is er veruit de krachtigste van.",
        },
      ],
    },
    {
      heading: "De formule voor samengestelde interest",
      blocks: [
        {
          kind: "formula",
          text: "Eindkapitaal = startkapitaal × (1 + r ÷ n)^(n × t)   waarbij r = jaarlijkse rentevoet, n = aantal kapitalisaties per jaar, t = looptijd in jaren",
        },
        {
          kind: "p",
          text: "Stort u elke maand een vast bedrag, dan komt daar de formule voor een reeks stortingen bij:",
        },
        {
          kind: "formula",
          text: "Eindkapitaal stortingen = maandbedrag × ((1 + i)^m − 1) ÷ i   waarbij i = r ÷ 12 en m = aantal maanden",
        },
        {
          kind: "p",
          text: "Bij enkelvoudige interest groeit uw geld lineair: elk jaar dezelfde interest op het startkapitaal. Bij samengestelde interest groeit het exponentieel, omdat de basis waarop de interest wordt berekend elk jaar groter wordt. Op korte termijn is het verschil klein; na twintig of dertig jaar is het enorm.",
        },
      ],
    },
    {
      heading: "Rekenvoorbeelden met Belgische cijfers",
      blocks: [
        {
          kind: "p",
          text: "€10.000 aan 3% per jaar, jaarlijks gekapitaliseerd: na 10 jaar €13.439,16, na 20 jaar €18.061,11 en na 30 jaar €24.272,62. Met enkelvoudige interest zou u na 10 jaar op €13.000 zitten; het verschil van €439 is de interest op uw interest. Na 30 jaar is dat verschil al €5.272.",
        },
        {
          kind: "p",
          text: "€100 per maand aan 4% per jaar, maandelijks gekapitaliseerd: na 20 jaar hebt u €24.000 gestort en staat er €36.677,46. Na 30 jaar hebt u €36.000 gestort en staat er €69.404,94. De laatste tien jaar leveren meer op dan de eerste twintig samen, en dat is precies het punt van vroeg beginnen.",
        },
        {
          kind: "p",
          text: "Kapitalisatiefrequentie weegt minder zwaar dan vaak gedacht: €10.000 aan 3% wordt na 10 jaar €13.439,16 bij jaarlijkse en €13.493,54 bij maandelijkse kapitalisatie. Een verschil van €54. De rentevoet en de looptijd bepalen het resultaat, niet de frequentie.",
        },
      ],
    },
    {
      heading: "Samengestelde interest op een Belgische spaarrekening",
      blocks: [
        {
          kind: "ul",
          items: [
            "Op een gereglementeerde spaarrekening wordt de basisrente één keer per jaar gekapitaliseerd, met valutadatum 1 januari. De getrouwheidspremie wordt uitbetaald op de eerste dag van het kwartaal na verwerving en brengt vanaf dan zelf basisrente op.",
            "Tot €1.020 interest per persoon per jaar (2026, bevroren tot en met 2030) betaalt u geen roerende voorheffing; daarboven houdt de bank 15% in. Op termijnrekeningen, kasbons en obligaties geldt 30% vanaf de eerste euro.",
            "Roerende voorheffing remt het sneeuwbaleffect: een brutorente van 3% wordt na 30% voorheffing 2,1% netto. Over 20 jaar groeit €10.000 dan tot €15.153,57 in plaats van €18.061,11.",
            "Inflatie doet hetzelfde met uw koopkracht. Trek de inflatie af van de nettorente om de reële groei te kennen; de reële-rentecalculator op deze site doet dat voor u.",
          ],
        },
        {
          kind: "p",
          text: "Bronnen: FOD Financiën (roerende voorheffing en vrijstelling spaarrekeningen), Wikifin van de FSMA (werking van basisrente en getrouwheidspremie) en Statbel (inflatiecijfers).",
        },
      ],
    },
    {
      heading: "De regel van 72",
      blocks: [
        {
          kind: "p",
          text: "Wilt u snel weten hoelang het duurt voor uw geld verdubbelt? Deel 72 door de rentevoet. Aan 3% duurt een verdubbeling ongeveer 24 jaar, aan 6% ongeveer 12 jaar en aan 8% ongeveer 9 jaar. De regel is een benadering die goed werkt tussen 2% en 10%. Ze toont meteen waarom 1% extra rendement over een hele loopbaan zo zwaar weegt.",
        },
      ],
    },
    {
      heading: "Veelgemaakte fouten bij het berekenen van samengestelde interest",
      blocks: [
        {
          kind: "ul",
          items: [
            "Rekenen met brutorendement en de roerende voorheffing vergeten: het netto-eindkapitaal ligt bij 30% voorheffing fors lager.",
            "Een rendement van 7% of 8% invullen voor een spaarrekening: zulke percentages horen bij beleggingen met koersrisico, niet bij gewaarborgd sparen.",
            "De jaarlijkse rentevoet door 12 delen en dan maandelijks kapitaliseren alsof dat de bankpraktijk is; Belgische spaarrekeningen kapitaliseren de basisrente jaarlijks.",
            "Inflatie negeren: 2% nominale groei bij 2% inflatie is 0% reële groei.",
            "Te laat beginnen omdat het bedrag klein lijkt: de looptijd is de belangrijkste factor, niet het startbedrag.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Wat is samengestelde interest (rente op rente)?",
      answer:
        "Samengestelde interest is interest die niet alleen op uw startkapitaal wordt berekend, maar ook op de interest die u eerder al ontving en liet staan. Daardoor groeit uw kapitaal exponentieel in plaats van lineair. Het effect is klein in de eerste jaren en wordt pas groot na tien tot twintig jaar.",
    },
    {
      question: "Hoe bereken ik samengestelde interest zelf?",
      answer:
        "Gebruik de formule eindkapitaal = startkapitaal × (1 + r)^t, met r de jaarlijkse rentevoet als decimaal en t de looptijd in jaren. Voor €5.000 aan 2% gedurende 8 jaar: 5.000 × 1,02^8 = €5.858,30. Voor maandelijkse stortingen gebruikt u de annuïteitenformule; de calculator hierboven doet beide berekeningen voor u.",
    },
    {
      question: "Hoe vaak wordt interest gekapitaliseerd op een Belgische spaarrekening?",
      answer:
        "De basisrente wordt één keer per jaar gekapitaliseerd, met valutadatum 1 januari. De getrouwheidspremie wordt per kwartaal uitbetaald op geld dat twaalf maanden op de rekening stond en brengt vanaf dan zelf basisrente op. Termijnrekeningen kapitaliseren meestal jaarlijks of op de eindvervaldag.",
    },
    {
      question: "Wat is de regel van 72?",
      answer:
        "Een vuistregel om te schatten hoelang het duurt voor uw kapitaal verdubbelt: deel 72 door de rentevoet. Aan 3% duurt verdubbelen ongeveer 24 jaar, aan 6% ongeveer 12 jaar. De regel is een benadering die het best werkt voor rentevoeten tussen 2% en 10%.",
    },
    {
      question: "Houdt deze calculator rekening met roerende voorheffing?",
      answer:
        "U kunt zelf een netto- of brutorendement invullen. Voor een termijnrekening, kasbon of obligatie vermenigvuldigt u de brutorente met 0,70 (30% roerende voorheffing). Voor een gereglementeerde spaarrekening is de interest tot €1.020 per persoon per jaar (2026) vrijgesteld en geldt daarboven 15%.",
    },
    {
      question: "Hoeveel wordt 10.000 euro na 20 jaar met samengestelde interest?",
      answer:
        "Aan 2% groeit €10.000 in 20 jaar tot €14.859,47, aan 3% tot €18.061,11 en aan 4% tot €21.911,23, telkens bij jaarlijkse kapitalisatie en vóór belasting. Aan 3% bruto maar 2,1% netto (na 30% roerende voorheffing) komt u uit op €15.153,57.",
    },
  ],
};
