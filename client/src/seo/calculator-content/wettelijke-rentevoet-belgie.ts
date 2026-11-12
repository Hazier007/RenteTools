import type { CalculatorEducationalContent } from "./types";
import {
  WETTELIJKE_RENTEVOET_BURGERLIJK,
  WETTELIJKE_RENTEVOET_HANDEL,
  FISCALE_MORATORIUMINTEREST,
  BTW_NALATIGHEIDSINTEREST,
  BTW_MORATORIUMINTEREST,
  RSZ_INTERESTVOET,
  B2B_FORFAIT_EUR,
  BRON_LABEL,
  getActueleRentevoeten,
  formatPercent,
} from "../../../../shared/wettelijke-interest";

const actueel = getActueleRentevoeten();
const jaar = actueel.jaar;
const volgendJaar = jaar + 1;

const eur = (n: number) =>
  `€${n.toLocaleString("nl-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// Rekenvoorbeeld: factuur van €5.000, 90 dagen te laat, handelstransactie.
const voorbeeldHoofdsom = 5000;
const voorbeeldDagen = 90;
const voorbeeldInterest = (voorbeeldHoofdsom * (actueel.handelS1 / 100) * voorbeeldDagen) / 365;

const historiekBurgerlijk = [...WETTELIJKE_RENTEVOET_BURGERLIJK]
  .sort((a, b) => b.jaar - a.jaar)
  .map((r) => `${r.jaar}: ${formatPercent(r.rentevoet)}`);

const historiekHandel = [...WETTELIJKE_RENTEVOET_HANDEL]
  .sort((a, b) => b.jaar * 10 + b.semester - (a.jaar * 10 + a.semester))
  .map(
    (r) =>
      `${r.semester === 1 ? "1 januari – 30 juni" : "1 juli – 31 december"} ${r.jaar}: ${formatPercent(r.rentevoet)}`,
  );

export const wettelijkeRentevoetBelgieContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: `Wettelijke interestvoet ${jaar} in België: de actuele cijfers`,
      blocks: [
        {
          kind: "p",
          text: `In ${jaar} bedraagt de wettelijke interestvoet in burgerlijke en sociale zaken ${formatPercent(actueel.burgerlijk)} per jaar. Voor betalingsachterstand bij handelstransacties tussen ondernemingen (wet van 2 augustus 2002) geldt ${formatPercent(actueel.handelS1)} in het eerste semester en ${formatPercent(actueel.handelS2)} in het tweede semester van ${jaar}. De fiscale nalatigheidsinterest (art. 414 WIB92) blijft ${formatPercent(actueel.fiscaal)}. Deze voeten worden bekendgemaakt door de ${BRON_LABEL}, niet door de Nationale Bank.`,
        },
        {
          kind: "ul",
          items: [
            `Wettelijke interestvoet burgerlijke zaken ${jaar}: ${formatPercent(actueel.burgerlijk)} per jaar (heel het jaar)`,
            `Interestvoet handelstransacties (B2B) ${jaar}: ${formatPercent(actueel.handelS1)} (1e semester) en ${formatPercent(actueel.handelS2)} (2e semester)`,
            `Fiscale nalatigheidsinterest: ${formatPercent(actueel.fiscaal)} per jaar; moratoriuminterest (fiscus betaalt u): ${formatPercent(FISCALE_MORATORIUMINTEREST)}`,
            `Btw: ${formatPercent(BTW_NALATIGHEIDSINTEREST)} nalatigheidsinterest en ${formatPercent(BTW_MORATORIUMINTEREST)} moratoriuminterest (sinds 1 januari 2023)`,
            `Sociale zaken (RSZ): ${formatPercent(RSZ_INTERESTVOET)} per jaar`,
            `Interestvoet ${volgendJaar}: nog niet gepubliceerd; verschijnt in januari ${volgendJaar} in het Belgisch Staatsblad`,
          ],
        },
      ],
    },
    {
      heading: "Welke interestvoet geldt voor uw situatie?",
      blocks: [
        {
          kind: "p",
          text: "België kent niet één wettelijke interest, maar vier regimes. Welke voet u mag aanrekenen (of moet betalen) hangt af van wie de schuldenaar is en waarover de schuld gaat.",
        },
        {
          kind: "ul",
          items: [
            `Handelstransacties (onderneming aan onderneming of aan een overheid): de interestvoet van de wet van 2 augustus 2002, ${formatPercent(actueel.handelS1)} in ${jaar}. De interest loopt van rechtswege vanaf de dag na de vervaldag, zonder ingebrekestelling, en er komt een forfait van €${B2B_FORFAIT_EUR} per factuur bovenop.`,
            `Consumenten (Boek XIX Wetboek Economisch Recht, sinds 1 september 2023): interest mag pas lopen na een kosteloze eerste herinnering en een wachttermijn van 14 kalenderdagen. De verwijlinterest mag niet hoger zijn dan de referentievoet voor handelstransacties, en interest plus kosten samen zijn geplafonneerd.`,
            `Burgerlijke zaken (particulieren onderling, huur, schadevergoedingen, lonen): de wettelijke interestvoet van ${formatPercent(actueel.burgerlijk)}. Interest loopt in principe pas vanaf de ingebrekestelling (aanmaning), tenzij de wet of het contract anders bepaalt.`,
            `Fiscale schulden (inkomstenbelastingen): ${formatPercent(actueel.fiscaal)} nalatigheidsinterest, berekend per kalendermaand en niet per dag. Voor btw geldt ${formatPercent(BTW_NALATIGHEIDSINTEREST)}.`,
          ],
        },
      ],
    },
    {
      heading: "Hoe berekent u nalatigheidsinterest op een factuur?",
      blocks: [
        {
          kind: "p",
          text: "Wettelijke interest is enkelvoudige interest: u rekent op de hoofdsom, niet op eerder vervallen interest. De formule is dezelfde voor elk regime, alleen de voet en de startdatum verschillen. Loopt de achterstand over meerdere jaren of semesters, dan rekent u elke periode tegen haar eigen voet en telt u de deelbedragen op.",
        },
        {
          kind: "formula",
          text: "Interest = hoofdsom × (interestvoet ÷ 100) × aantal dagen ÷ 365",
        },
        {
          kind: "p",
          text: `Voorbeeld: een factuur van ${eur(voorbeeldHoofdsom)} aan een andere onderneming wordt ${voorbeeldDagen} dagen na de vervaldag betaald, volledig in het eerste semester van ${jaar}. De interest bedraagt ${eur(voorbeeldHoofdsom)} × ${(actueel.handelS1 / 100).toLocaleString("nl-BE", { minimumFractionDigits: 3 })} × ${voorbeeldDagen} ÷ 365 = ${eur(voorbeeldInterest)}. Daarbovenop komt het forfait van €${B2B_FORFAIT_EUR}, zodat de schuldenaar in totaal ${eur(voorbeeldHoofdsom + voorbeeldInterest + B2B_FORFAIT_EUR)} betaalt.`,
        },
        {
          kind: "p",
          text: "De calculator bovenaan deze pagina doet die opsplitsing per periode automatisch: u kiest het regime, vult de hoofdsom, de startdatum en de betaaldatum in en krijgt de interest per jaar of per semester, het forfait en het totaalbedrag.",
        },
      ],
    },
    {
      heading: "Betalingsachterstand bij handelstransacties (B2B): de regels",
      blocks: [
        {
          kind: "ul",
          items: [
            "Betalingstermijn: 30 kalenderdagen na ontvangst van de factuur als er niets is afgesproken. Contractueel mag de termijn maximaal 60 dagen bedragen (sinds 1 februari 2022); een langere termijn is nietig.",
            "De interest loopt van rechtswege vanaf de dag na de vervaldag. Een ingebrekestelling is niet nodig, al is een herinnering in de praktijk wel aan te raden.",
            `Forfaitaire schadevergoeding: €${B2B_FORFAIT_EUR} per onbetaalde factuur, van rechtswege, bovenop de interest. Daarnaast kunt u een redelijke vergoeding vragen voor hogere invorderingskosten, zoals de kosten van een incassobureau of advocaat.`,
            `De voet wordt elk semester herzien: de ECB-referentievoet van 1 januari of 1 juli, plus 8 procentpunten, afgerond naar boven op een half procentpunt. In ${jaar} komt dat uit op ${formatPercent(actueel.handelS1)} en ${formatPercent(actueel.handelS2)}.`,
          ],
        },
      ],
    },
    {
      heading: "Onbetaalde factuur van een consument: Boek XIX WER",
      blocks: [
        {
          kind: "p",
          text: "Verkoopt u aan particulieren, dan gelden sinds 1 september 2023 strengere regels. Eerst stuurt u een kosteloze eerste herinnering. Daarna krijgt de consument 14 kalenderdagen de tijd om te betalen. Die termijn start de derde werkdag na verzending per post, of de dag na verzending bij een elektronische herinnering. Pas daarna mogen interest en een schadebeding aangerekend worden, en alleen als uw algemene voorwaarden dat voorzien.",
        },
        {
          kind: "ul",
          items: [
            "Plafond op interest plus kosten samen: €20 bij een saldo tot en met €150; €30 plus 10% op de schijf van €150,01 tot €500; €65 plus 5% op het bedrag boven €500, met een absoluut maximum van €2.000.",
            `De verwijlinterest mag nooit hoger zijn dan de referentie-interestvoet voor handelstransacties (${formatPercent(actueel.handelS1)} in ${jaar}).`,
            "Is de eerste herinnering niet of niet correct verstuurd, dan is geen enkel schadebeding verschuldigd (art. XIX.8 WER).",
          ],
        },
      ],
    },
    {
      heading: `Historiek wettelijke interestvoet 2006–${jaar} (burgerlijke zaken)`,
      blocks: [
        {
          kind: "p",
          text: "Sinds 2007 wordt de wettelijke interestvoet elk jaar herberekend op basis van de 12-maands Euribor van december van het voorgaande jaar, verhoogd met 2 procentpunten en afgerond op een kwart procentpunt. Dat verklaart de sprong van 1,5% in 2022 naar 5,25% in 2023.",
        },
        {
          kind: "ul",
          items: historiekBurgerlijk,
        },
      ],
    },
    {
      heading: "Historiek interestvoet handelstransacties per semester",
      blocks: [
        {
          kind: "ul",
          items: historiekHandel,
        },
      ],
    },
    {
      heading: "Bronnen en actualisering",
      blocks: [
        {
          kind: "p",
          text: `De cijfers op deze pagina komen uit de berichten van de ${BRON_LABEL}. De burgerlijke en fiscale voet verschijnen in januari, de voet voor handelstransacties in januari en juli. Zodra een nieuwe voet gepubliceerd is, wordt de rekenmotor van deze pagina bijgewerkt; de versie die u nu gebruikt bevat alle voeten tot en met ${actueel.handelS2 === actueel.handelS1 ? `het tweede semester van ${jaar}` : `${jaar}`}. Deze tool geeft algemene informatie en rekenhulp, geen juridisch advies: laat bij betwisting of grote bedragen uw berekening nakijken door een advocaat, gerechtsdeurwaarder of incassopartner.`,
        },
      ],
    },
  ],
  faqs: [
    {
      question: `Wat is de wettelijke interestvoet in ${jaar}?`,
      answer: `De wettelijke interestvoet in burgerlijke en sociale zaken bedraagt ${formatPercent(actueel.burgerlijk)} voor heel ${jaar}. Voor handelstransacties tussen ondernemingen geldt ${formatPercent(actueel.handelS1)} in het eerste en ${formatPercent(actueel.handelS2)} in het tweede semester. De fiscale nalatigheidsinterest is ${formatPercent(actueel.fiscaal)}.`,
    },
    {
      question: "Wie bepaalt de wettelijke interestvoet in België?",
      answer: `De voeten worden berekend en bekendgemaakt door de FOD Financiën (Algemene Administratie van de Thesaurie) via een bericht in het Belgisch Staatsblad. De Nationale Bank publiceert ze niet; zij levert enkel de ECB- en Euribor-referentiecijfers waarop de berekening steunt.`,
    },
    {
      question: "Hoeveel interest mag ik aanrekenen op een onbetaalde factuur aan een ander bedrijf?",
      answer: `De interestvoet van de wet van 2 augustus 2002: ${formatPercent(actueel.handelS1)} per jaar in ${jaar}. De interest loopt automatisch vanaf de dag na de vervaldag, zonder ingebrekestelling. U mag daarbovenop een forfait van €${B2B_FORFAIT_EUR} per factuur aanrekenen plus een redelijke vergoeding voor extra invorderingskosten.`,
    },
    {
      question: "Mag ik een consument dezelfde interest aanrekenen als een bedrijf?",
      answer: `Nee. Bij consumenten (Boek XIX WER) moet u eerst een gratis herinnering sturen en 14 kalenderdagen wachten. De interest mag maximaal de referentievoet voor handelstransacties bedragen (${formatPercent(actueel.handelS1)} in ${jaar}) en interest plus kosten samen zijn geplafonneerd: €20 tot €150 saldo, €30 + 10% tot €500, €65 + 5% daarboven, met een maximum van €2.000.`,
    },
    {
      question: "Vanaf wanneer begint wettelijke interest te lopen?",
      answer: "Bij handelstransacties vanaf de dag na de vervaldag van de factuur, van rechtswege. Bij consumenten pas na de kosteloze eerste herinnering en de wachttermijn van 14 kalenderdagen. In burgerlijke zaken (art. 5.240 BW) in principe vanaf de ingebrekestelling, tenzij de wet of het contract de interest van rechtswege laat lopen.",
    },
    {
      question: "Hoe wordt fiscale nalatigheidsinterest berekend?",
      answer: `De fiscale nalatigheidsinterest op inkomstenbelastingen bedraagt ${formatPercent(actueel.fiscaal)} per jaar en wordt per kalendermaand berekend, niet per dag. Een deel van een maand telt daarbij als een volledige maand. Betaalt de fiscus u te laat terug, dan ontvangt u ${formatPercent(FISCALE_MORATORIUMINTEREST)} moratoriuminterest.`,
    },
    {
      question: `Is de wettelijke interestvoet ${volgendJaar} al bekend?`,
      answer: `Nog niet. De FOD Financiën publiceert de voet voor ${volgendJaar} in januari ${volgendJaar} in het Belgisch Staatsblad, samen met de voet voor handelstransacties voor het eerste semester. Deze pagina wordt dan meteen bijgewerkt. Tot die publicatie rekent u voor achterstand in ${volgendJaar} voorlopig met de laatst bekende voet.`,
    },
    {
      question: "Is er btw verschuldigd op nalatigheidsinterest?",
      answer: "Nee. Nalatigheidsinterest en het forfait van €40 zijn een schadevergoeding voor laattijdige betaling, geen vergoeding voor een levering of dienst. Ze vallen daarom buiten de btw.",
    },
  ],
};
