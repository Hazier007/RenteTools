import type { CalculatorEducationalContent } from "./types";

// Fiscale cijfers 2026: vrijstelling €1.020 per persoon (€2.040 voor gehuwden en
// wettelijk samenwonenden), bevroren tot en met 2030; 15% roerende voorheffing
// boven de vrijstelling op een gereglementeerde spaarrekening. Bankrentes worden
// hier bewust niet als cijfer vermeld: die wijzigen te vaak en horen in de tool.

export const hoogsteSpaarrenteBelgieContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat berekent deze spaarrente-calculator?",
      blocks: [
        {
          kind: "p",
          text: "Met deze calculator berekent u hoeveel interest een Belgische spaarrekening u oplevert. U vult uw spaarbedrag, de basisrente en de getrouwheidspremie van uw bank in, kiest een looptijd en ziet meteen de bruto-interest, de eventuele roerende voorheffing en het nettobedrag dat op uw rekening komt. Zo vergelijkt u twee spaarrekeningen op wat echt telt: de netto-opbrengst na twaalf maanden, niet het hoogste cijfer in de reclame.",
        },
        {
          kind: "p",
          text: "De tool publiceert zelf geen banktarieven. Spaarrentes veranderen meerdere keren per jaar en verschillen per bank, per rekeningtype en soms per klantgroep. U haalt de actuele basisrente en getrouwheidspremie uit het informatiedocument van de bank of uit de onafhankelijke spaarrekening-vergelijker van Wikifin (FSMA) en rekent ze hier door.",
        },
      ],
    },
    {
      heading: "Hoe werkt een gereglementeerde spaarrekening: basisrente en getrouwheidspremie",
      blocks: [
        {
          kind: "p",
          text: "Een gereglementeerde spaarrekening heeft in België verplicht twee rentecomponenten. De basisrente krijgt u op elke euro voor elke dag dat die op de rekening staat. De getrouwheidspremie krijgt u alleen op bedragen die twaalf opeenvolgende maanden op dezelfde rekening blijven staan. Haalt u geld af vóór die twaalf maanden voorbij zijn, dan verliest u de premie op dat bedrag.",
        },
        {
          kind: "formula",
          text: "Interest na 12 maanden = saldo × basisrente + (saldo dat 12 maanden bleef staan) × getrouwheidspremie",
        },
        {
          kind: "ul",
          items: [
            "De basisrente wordt één keer per jaar uitbetaald, met valutadatum 1 januari.",
            "De getrouwheidspremie wordt na verwerving uitbetaald op de eerste dag van het volgende kwartaal (1 januari, 1 april, 1 juli of 1 oktober).",
            "De wet begrenst de verhouding tussen beide: de getrouwheidspremie mag niet hoger zijn dan 50% van de maximale basisrente en niet lager dan 25% van de aangeboden basisrente (art. 2 KB/WIB92).",
            "Binnen dezelfde bank mag u tot drie keer per jaar minstens €500 overschrijven tussen twee gereglementeerde spaarrekeningen zonder de opgebouwde getrouwheidsperiode te verliezen.",
          ],
        },
      ],
    },
    {
      heading: "Rekenvoorbeeld: wat levert €15.000 spaargeld op?",
      blocks: [
        {
          kind: "p",
          text: "Stel dat u €15.000 een volledig jaar op een spaarrekening laat staan met een basisrente van 1% en een getrouwheidspremie van 1,5%. De basisrente brengt €150 op, de getrouwheidspremie €225. Samen is dat €375 bruto. Omdat dat bedrag onder de vrijstelling van €1.020 blijft, houdt de bank geen roerende voorheffing in en ontvangt u de volle €375.",
        },
        {
          kind: "p",
          text: "Tweede voorbeeld: €60.000 aan een gecombineerde rente van 2% levert €1.200 interest op. Daarvan is €1.020 vrijgesteld. Op de resterende €180 houdt de bank 15% roerende voorheffing in, dus €27. Netto blijft €1.173 over. Bij 2% totale rente begint u pas boven ongeveer €51.000 spaargeld per persoon roerende voorheffing te betalen; bij 2,5% ligt die grens rond €40.800.",
        },
      ],
    },
    {
      heading: "Fiscaal kader 2026: vrijstelling en 15% roerende voorheffing",
      blocks: [
        {
          kind: "ul",
          items: [
            "Op een gereglementeerde spaarrekening is in 2026 de eerste €1.020 interest per persoon per jaar vrijgesteld. Gehuwden en wettelijk samenwonenden met een gemeenschappelijke rekening hebben samen recht op €2.040. Het bedrag is bevroren tot en met 2030 en wordt dus niet geïndexeerd.",
            "Boven de vrijstelling houdt de bank 15% roerende voorheffing in, niet het gewone tarief van 30%.",
            "De bank past de vrijstelling per rekening toe. Hebt u spaarrekeningen bij verschillende banken en overschrijdt de som van de interesten de vrijstelling, dan moet u het surplus zelf aangeven in de personenbelasting (codes 1151/2151).",
            "Een termijnrekening, kasbon, obligatie of niet-gereglementeerde spaarrekening valt buiten de vrijstelling: daarop betaalt u 30% roerende voorheffing vanaf de eerste euro.",
            "Uw spaargeld is beschermd door de Belgische depositogarantie tot €100.000 per persoon en per bank (Garantiefonds, FOD Financiën).",
          ],
        },
        {
          kind: "p",
          text: "Bronnen: FOD Financiën (vrijstelling en tarieven roerende voorheffing), Wikifin van de FSMA (werking en vergelijking van spaarrekeningen) en het Garantiefonds voor financiële diensten (depositobescherming).",
        },
      ],
    },
    {
      heading: "Hoe vindt u de hoogste spaarrente in België?",
      blocks: [
        {
          kind: "p",
          text: "De hoogste spaarrente is zelden de hoogste basisrente. Een bank kan een hoge getrouwheidspremie combineren met een lage basisrente, of omgekeerd. Vergelijk daarom altijd de som van beide, en enkel als u zeker weet dat u het geld twaalf maanden laat staan. Spaart u voor iets dat binnen het jaar betaald moet worden, dan telt alleen de basisrente.",
        },
        {
          kind: "ul",
          items: [
            "Controleer de voorwaarden: sommige rekeningen geven de hoogste rente alleen tot een maximumsaldo, alleen voor nieuwe klanten of alleen bij maandelijks sparen.",
            "Gebruik de spaarrekening-vergelijker van Wikifin (FSMA): die toont alle gereglementeerde spaarrekeningen met basisrente, getrouwheidspremie en voorwaarden, zonder commerciële rangschikking.",
            "Vraag het wettelijk verplichte informatiedocument van de spaarrekening op: daarin staan de rente, de kosten en de voorwaarden op één pagina.",
            "Reken het resultaat na in deze calculator: twee rekeningen met dezelfde totale rente kunnen een ander nettoresultaat geven zodra u boven de vrijstelling komt.",
          ],
        },
      ],
    },
    {
      heading: "Veelgemaakte fouten bij het vergelijken van spaarrentes",
      blocks: [
        {
          kind: "ul",
          items: [
            "De getrouwheidspremie meetellen voor geld dat u binnen het jaar nodig hebt: die premie krijgt u dan niet.",
            "Alleen naar het totale rentepercentage kijken en de vrijstelling vergeten: boven €1.020 interest per persoon weegt 15% roerende voorheffing op het surplus.",
            "Van bank veranderen vlak voor de twaalf maanden voorbij zijn, waardoor u de volledige getrouwheidspremie van dat jaar verliest.",
            "Promorentes voor nieuwe klanten verwarren met de rente die u na de actieperiode krijgt.",
            "Meer dan €100.000 bij één bank aanhouden zonder te weten dat de depositogarantie daar stopt.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Wat is de hoogste spaarrente in België op dit moment?",
      answer:
        "Dat verandert meerdere keren per jaar en hangt af van de voorwaarden (maximumsaldo, nieuwe klanten, maandelijks sparen). Raadpleeg de spaarrekening-vergelijker van Wikifin (FSMA) voor de actuele basisrentes en getrouwheidspremies van alle banken, en reken de twee of drie beste rekeningen hier door op nettobasis.",
    },
    {
      question: "Hoeveel interest krijg ik op 10.000 euro spaargeld?",
      answer:
        "Bij een gecombineerde rente van 2% (basisrente plus getrouwheidspremie) krijgt u na twaalf maanden €200 interest op €10.000. Omdat dat onder de vrijstelling van €1.020 blijft, is het volledige bedrag belastingvrij. Bij 1% totale rente is het €100, bij 3% €300. Vul uw eigen rente in de calculator in voor het exacte bedrag.",
    },
    {
      question: "Wanneer krijg ik de getrouwheidspremie op mijn spaarrekening?",
      answer:
        "U verwerft de getrouwheidspremie op geld dat twaalf opeenvolgende maanden op dezelfde spaarrekening blijft staan. De premie wordt daarna uitbetaald op de eerste dag van het volgende kwartaal. Stort u op 15 maart, dan is de premie verworven op 15 maart van het jaar erna en wordt ze op 1 april uitbetaald.",
    },
    {
      question: "Is spaarrente belastingvrij in België?",
      answer:
        "Gedeeltelijk. Op een gereglementeerde spaarrekening is in 2026 de eerste €1.020 interest per persoon vrijgesteld (€2.040 voor gehuwden en wettelijk samenwonenden). Boven dat bedrag houdt de bank 15% roerende voorheffing in. De vrijstelling is bevroren tot en met 2030.",
    },
    {
      question: "Verlies ik mijn getrouwheidspremie als ik van spaarrekening verander?",
      answer:
        "Verandert u van bank, dan verliest u de getrouwheidspremie op het overgeschreven bedrag als de twaalf maanden nog niet voorbij zijn. Binnen dezelfde bank mag u tot drie keer per jaar minstens €500 overschrijven tussen twee gereglementeerde spaarrekeningen zonder de opgebouwde getrouwheidsperiode te verliezen.",
    },
    {
      question: "Is een termijnrekening beter dan een spaarrekening met hoge rente?",
      answer:
        "Niet automatisch. Op een termijnrekening betaalt u 30% roerende voorheffing vanaf de eerste euro, terwijl spaarrente tot €1.020 per persoon belastingvrij is en daarboven aan 15% wordt belast. Een termijnrekening aan 3% bruto levert netto 2,1% op; een spaarrekening aan 2,5% binnen de vrijstelling levert netto 2,5% op. Vergelijk altijd op nettobasis.",
    },
  ],
};
