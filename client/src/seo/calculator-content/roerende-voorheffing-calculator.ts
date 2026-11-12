import type { CalculatorEducationalContent } from "./types";

// Tarieven 2026: 30% standaardtarief roerende voorheffing; 15% op interest van een
// gereglementeerde spaarrekening boven de vrijstelling van €1.020 per persoon
// (€2.040 voor gehuwden en wettelijk samenwonenden), bevroren tot en met 2030.
// De dividendvrijstelling wordt bewust zonder bedrag beschreven: het bedrag wordt
// per inkomstenjaar door de FOD Financiën vastgelegd.

export const roerendeVoorheffingCalculatorContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat berekent de roerende-voorheffingcalculator?",
      blocks: [
        {
          kind: "p",
          text: "Roerende voorheffing is de belasting die uw bank of beursmakelaar aan de bron inhoudt op interesten en dividenden. Deze calculator berekent hoeveel u in 2026 betaalt op uw spaarrente, uw dividenden en de interest van termijnrekeningen, kasbons en obligaties. U vult de bruto-inkomsten per categorie in en ziet de ingehouden voorheffing, het nettobedrag en het effect van de vrijstelling op spaarrente.",
        },
        {
          kind: "p",
          text: "De tool past de twee tarieven toe die in België gelden: 30% als standaardtarief en 15% op de interest van een gereglementeerde spaarrekening boven de vrijstelling. Zo ziet u meteen waarom €1.000 dividend netto minder oplevert dan €1.000 spaarrente.",
        },
      ],
    },
    {
      heading: "De tarieven van de roerende voorheffing in 2026",
      blocks: [
        {
          kind: "ul",
          items: [
            "Interest op een gereglementeerde spaarrekening: 0% op de eerste €1.020 per persoon per jaar (€2.040 voor gehuwden en wettelijk samenwonenden op een gemeenschappelijke rekening), daarboven 15%. De vrijstelling is bevroren tot en met 2030.",
            "Dividenden van Belgische en buitenlandse aandelen, fondsen en ETF's: 30%.",
            "Interest op termijnrekeningen, kasbons, obligaties, niet-gereglementeerde spaarrekeningen en zichtrekeningen: 30% vanaf de eerste euro.",
            "Tak 21-spaarverzekeringen: 30% op een fictief rendement van 4,75% als u binnen de eerste acht jaar geld opneemt; na acht jaar en één dag is de opbrengst vrijgesteld van roerende voorheffing.",
            "Kapitaliserende fondsen die meer dan 10% in schuldvorderingen beleggen: 30% op de interestcomponent van de meerwaarde bij verkoop (de zogenaamde Reynderstaks, art. 19bis WIB92).",
          ],
        },
        {
          kind: "formula",
          text: "Voorheffing spaarrekening = max(0, interest − 1.020) × 15%   |   Voorheffing dividenden en overige interest = bruto-inkomen × 30%",
        },
      ],
    },
    {
      heading: "Rekenvoorbeeld: spaarrente, dividend en termijnrekening in één jaar",
      blocks: [
        {
          kind: "p",
          text: "Stel dat u als alleenstaande in 2026 €1.500 interest ontvangt op uw spaarrekening, €1.000 dividend op aandelen en €800 interest op een termijnrekening. Op de spaarrente is €1.020 vrijgesteld; op de resterende €480 houdt de bank 15% in, dus €72. Op het dividend houdt uw makelaar 30% in, dus €300. Op de termijnrekening gaat eveneens 30% af, dus €240.",
        },
        {
          kind: "p",
          text: "In totaal betaalt u €612 roerende voorheffing op €3.300 bruto-inkomsten, een gemiddeld tarief van 18,5%. Van de €1.500 spaarrente blijft €1.428 over, van het dividend €700 en van de termijnrente €560. Het voorbeeld toont waarom de volgorde van sparen ertoe doet: eerst de vrijstelling op de spaarrekening benutten, dan pas producten aan 30%.",
        },
      ],
    },
    {
      heading: "Belgisch fiscaal kader: bevrijdend, aangifte en terugvordering",
      blocks: [
        {
          kind: "ul",
          items: [
            "De roerende voorheffing is in principe bevrijdend: inkomsten waarop de voorheffing correct is ingehouden, hoeft u niet meer aan te geven in de personenbelasting.",
            "De bank past de vrijstelling van €1.020 per spaarrekening toe. Hebt u rekeningen bij meerdere banken en overschrijdt de totale spaarinterest de vrijstelling, dan moet u het surplus zelf aangeven (codes 1151/2151); de fiscus belast het dan aan 15%.",
            "Op dividenden van gewone aandelen bestaat een vrijstelling voor de eerste schijf per persoon. De bank houdt de 30% toch in; u vraagt de te veel betaalde voorheffing terug via uw belastingaangifte (codes 1437/2437). Het bedrag van die schijf wordt per inkomstenjaar vastgelegd door de FOD Financiën.",
            "Buitenlandse dividenden worden vaak dubbel belast: eerst bronheffing in het land van de uitgever, daarna 30% Belgische voorheffing op het saldo. Dubbelbelastingverdragen laten soms toe een deel van de buitenlandse bronheffing terug te vragen.",
            "Meerwaarden vielen tot eind 2025 buiten de roerende voorheffing. Vanaf 2026 is er een afzonderlijke heffing op gerealiseerde meerwaarden op financiële activa (de zogenaamde solidariteitsbijdrage). Die staat los van de roerende voorheffing en zit niet in deze calculator; raadpleeg de FOD Financiën voor de actuele regels.",
          ],
        },
        {
          kind: "p",
          text: "Bronnen: FOD Financiën (tarieven roerende voorheffing, vrijstellingen en aangiftecodes), Wikifin van de FSMA (belasting op sparen en beleggen) en het Wetboek van de inkomstenbelastingen 1992 (art. 21, 171 en 269 WIB92).",
        },
      ],
    },
    {
      heading: "Veelgemaakte fouten rond roerende voorheffing",
      blocks: [
        {
          kind: "ul",
          items: [
            "Denken dat de vrijstelling van €1.020 op alle interest geldt: ze geldt alleen voor gereglementeerde spaarrekeningen, niet voor termijnrekeningen, kasbons of obligaties.",
            "De vrijstelling per rekening laten toepassen bij meerdere banken en het surplus niet aangeven: dat is een aangifteplicht, geen keuze.",
            "De dividendvrijstelling vergeten terug te vragen in de aangifte: de bank houdt de voorheffing altijd in, de teruggave moet u zelf aanvragen.",
            "Brutorendementen vergelijken tussen een spaarrekening (15% boven de vrijstelling) en een termijnrekening (30% vanaf de eerste euro).",
            "Geld uit een Tak 21-verzekering halen vóór de achtste verjaardag van het contract en zo 30% voorheffing op een fictief rendement van 4,75% betalen.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Hoeveel roerende voorheffing betaal ik op spaarrente in 2026?",
      answer:
        "Op een gereglementeerde spaarrekening is de eerste €1.020 interest per persoon per jaar vrijgesteld (€2.040 voor gehuwden en wettelijk samenwonenden). Op het deel daarboven houdt de bank 15% roerende voorheffing in. De vrijstelling is bevroren tot en met 2030. Ontvangt u €1.500 interest, dan betaalt u 15% op €480, dus €72.",
    },
    {
      question: "Wat is het tarief van de roerende voorheffing op dividenden?",
      answer:
        "30%, zowel op dividenden van Belgische als van buitenlandse aandelen, fondsen en ETF's. Op €1.000 bruto dividend blijft €700 netto over. Voor gewone aandelen bestaat een vrijstelling op de eerste schijf dividenden per persoon, die u via uw belastingaangifte (codes 1437/2437) terugvraagt.",
    },
    {
      question: "Moet ik roerende voorheffing aangeven in mijn belastingaangifte?",
      answer:
        "Meestal niet: de voorheffing is bevrijdend, dus inkomsten waarop ze correct is ingehouden hoeft u niet aan te geven. Uitzonderingen: spaarinterest boven €1.020 verspreid over meerdere banken (codes 1151/2151), buitenlandse rekeningen waarop geen Belgische voorheffing is ingehouden, en de dividendvrijstelling die u wilt terugvragen.",
    },
    {
      question: "Kan ik roerende voorheffing op dividenden terugkrijgen?",
      answer:
        "Gedeeltelijk. Op de eerste schijf dividenden van gewone aandelen geldt een vrijstelling per persoon; de ingehouden 30% daarop vraagt u terug via codes 1437/2437 van uw aangifte. Bij buitenlandse dividenden kunt u via het dubbelbelastingverdrag soms een deel van de buitenlandse bronheffing recupereren, maar de Belgische 30% blijft verschuldigd.",
    },
    {
      question: "Geldt de vrijstelling van €1.020 per spaarrekening of per persoon?",
      answer:
        "Per persoon en per jaar. De bank past ze gemakshalve per rekening toe, maar hebt u meerdere spaarrekeningen bij verschillende banken en overschrijdt de som van de interesten €1.020, dan moet u het surplus zelf aangeven. Gehuwden en wettelijk samenwonenden hebben samen recht op €2.040.",
    },
    {
      question: "Betaal ik roerende voorheffing op een termijnrekening of staatsbon?",
      answer:
        "Ja, 30% vanaf de eerste euro, zonder vrijstelling. De bank of het Agentschap van de Schuld houdt de voorheffing in bij de uitbetaling van de interest. De eenjarige Staatsbon van september 2023 was een uitzondering met 15%; latere staatsbons volgen opnieuw het tarief van 30%.",
    },
  ],
};
