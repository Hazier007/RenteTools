import type { CalculatorEducationalContent } from "./types";
import {
  B2B_FORFAIT_EUR,
  BRON_LABEL,
  CONSUMENT_WACHTTERMIJN_DAGEN,
  getActueleRentevoeten,
  formatPercent,
} from "../../../../shared/wettelijke-interest";

const actueel = getActueleRentevoeten();

// Korte, crawlbare uitleg voor de homepage: dezelfde positionering als de hero
// in client/src/pages/home.tsx (interesten berekenen, met de wettelijke interest
// als eerste tool en een B2B-blok voor onbetaalde facturen).

export const homeContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Interesten berekenen in België: welke interest zoekt u?",
      blocks: [
        {
          kind: "p",
          text: `Interesten.be bundelt gratis calculators voor elke vorm van interest die in België telt. De wettelijke interestvoet bedraagt in ${actueel.jaar} ${formatPercent(actueel.burgerlijk)}; voor laattijdig betaalde facturen tussen ondernemingen geldt ${formatPercent(actueel.handelS1)} in het eerste en ${formatPercent(actueel.handelS2)} in het tweede semester, en voor belastingschulden ${formatPercent(actueel.fiscaal)}. Daarnaast rekent u hier uw spaarrente, samengestelde interest, roerende voorheffing en de maandlast van een lening door, telkens met de Belgische regels en cijfers.`,
        },
        {
          kind: "ul",
          items: [
            `Wettelijke interest en nalatigheidsinterest: per regime (burgerlijk, handelstransacties, consument, fiscaal), opgesplitst per jaar of semester, inclusief het forfait van €${B2B_FORFAIT_EUR}. Bron: ${BRON_LABEL}.`,
            "Spaarinteresten: basisrente en getrouwheidspremie, de vrijstelling van €1.020 per persoon en 15% roerende voorheffing daarboven (2026).",
            "Samengestelde interest en reële rente: hoe uw kapitaal groeit en wat inflatie en roerende voorheffing daarvan afhalen.",
            "Leningen: maandlast en totale interest van een hypothecaire lening, persoonlijke lening of autolening, en of herfinancieren loont.",
          ],
        },
      ],
    },
    {
      heading: `Onbetaalde factuur? Bereken de nalatigheidsinterest en het €${B2B_FORFAIT_EUR}-forfait`,
      blocks: [
        {
          kind: "p",
          text: `Betaalt een zakelijke klant uw factuur te laat, dan mag u van rechtswege nalatigheidsinterest aanrekenen vanaf de dag na de vervaldag (wet van 2 augustus 2002), plus een forfaitaire schadevergoeding van €${B2B_FORFAIT_EUR} per factuur. De calculator rekent de interest per semester tegen de voet die toen gold en levert een bedrag dat u in uw aanmaning kunt opnemen. Voor consumenten gelden strengere regels: eerst een kosteloze herinnering, dan ${CONSUMENT_WACHTTERMIJN_DAGEN} kalenderdagen wachten, en een plafond op interest en kosten samen (Boek XIX WER).`,
        },
        {
          kind: "p",
          text: "Blijft de factuur na uw aanmaning onbetaald, dan kan CollectPro.be de minnelijke invordering voor kmo's overnemen. Transparantie: CollectPro.be en Interesten.be hebben dezelfde oprichter.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Welke interesten kan ik op Interesten.be berekenen?",
      answer: `Wettelijke interest en nalatigheidsinterest op facturen en schulden (burgerlijk, handelstransacties, consument en fiscaal), spaarrente met vrijstelling en roerende voorheffing, samengestelde interest, reële rente na inflatie en de interest op hypothecaire, persoonlijke en autoleningen. Alle tools zijn gratis en rekenen met de Belgische regels van ${actueel.jaar}.`,
    },
    {
      question: "Hoeveel interest mag ik aanrekenen op een onbetaalde factuur?",
      answer: `Aan een onderneming: de interestvoet voor handelstransacties, ${formatPercent(actueel.handelS1)} in het eerste semester van ${actueel.jaar}, van rechtswege vanaf de dag na de vervaldag, plus €${B2B_FORFAIT_EUR} forfait per factuur. Aan een consument: pas na een gratis herinnering en ${CONSUMENT_WACHTTERMIJN_DAGEN} kalenderdagen, met een plafond op interest en kosten. Aan een particulier in burgerlijke zaken: de wettelijke interestvoet van ${formatPercent(actueel.burgerlijk)} vanaf de ingebrekestelling.`,
    },
    {
      question: "Zijn de calculators gratis en anoniem?",
      answer: "Ja. Alle calculators zijn gratis, u hoeft geen account aan te maken en uw invoer wordt niet opgeslagen. Interesten.be geeft algemene informatie en rekenhulp, geen financieel, fiscaal of juridisch advies.",
    },
    {
      question: "Waar komen de cijfers vandaan?",
      answer: `De wettelijke interestvoeten komen uit de berichten van de ${BRON_LABEL}. Fiscale bedragen zoals de vrijstelling op spaarrente komen van de FOD Financiën, de werking van spaar- en kredietproducten van Wikifin (FSMA) en de FOD Economie. Op elke calculatorpagina staan de bronnen vermeld.`,
    },
  ],
};
