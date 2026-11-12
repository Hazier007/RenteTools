import type { CalculatorEducationalContent } from "./types";

// Termijnrekening (deposito): vaste rente, vaste looptijd, 30% roerende voorheffing
// vanaf de eerste euro (geen vrijstelling). Depositogarantie €100.000 per persoon
// en per bank. Banktarieven staan bewust niet als cijfer in deze tekst.

export const depositoCalculatorContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat berekent de deposito-calculator?",
      blocks: [
        {
          kind: "p",
          text: "Een deposito of termijnrekening is een spaarproduct waarbij u een bedrag voor een vaste looptijd vastzet tegen een vaste rente. Deze calculator berekent wat dat oplevert: de bruto-interest per jaar of op de eindvervaldag, de roerende voorheffing van 30% die de bank inhoudt en het nettobedrag dat u uiteindelijk ontvangt. U kiest zelf of de interest jaarlijks wordt uitbetaald of gekapitaliseerd tot het einde van de looptijd.",
        },
        {
          kind: "p",
          text: "De tool rekent met de rente die u invult. Termijnrekeningtarieven verschillen per bank, per looptijd en per instapmoment, en veranderen mee met de marktrente. Haal het actuele tarief uit het aanbod van uw bank of uit de vergelijker van Wikifin (FSMA) en reken hier na wat er netto overblijft.",
        },
      ],
    },
    {
      heading: "Hoe wordt de opbrengst van een termijnrekening berekend?",
      blocks: [
        {
          kind: "p",
          text: "Bij jaarlijkse uitbetaling is de berekening enkelvoudig: elk jaar krijgt u dezelfde interest op het oorspronkelijke kapitaal. Kiest u voor kapitalisatie, dan wordt de interest bij het kapitaal gevoegd en brengt hij het jaar erna zelf interest op.",
        },
        {
          kind: "formula",
          text: "Jaarlijkse uitbetaling: interest = kapitaal × rentevoet × looptijd in jaren | Kapitalisatie: eindkapitaal = kapitaal × (1 + rentevoet)^looptijd | Netto = bruto × 0,70",
        },
        {
          kind: "p",
          text: "De factor 0,70 komt van de roerende voorheffing van 30%. Een termijnrekening aan 3% bruto levert dus netto 2,1% op. Bij een looptijd korter dan een jaar rekent de bank de interest pro rata: zes maanden aan 3% geeft 1,5% bruto op het kapitaal.",
        },
      ],
    },
    {
      heading: "Rekenvoorbeeld: €20.000 op een termijnrekening van 2 jaar aan 3%",
      blocks: [
        {
          kind: "p",
          text: "U zet €20.000 twee jaar vast aan 3% met jaarlijkse uitbetaling. Elk jaar brengt de rekening €600 bruto op. De bank houdt 30% roerende voorheffing in, dus €180, en stort €420 netto. Na twee jaar hebt u €840 netto interest ontvangen en krijgt u uw €20.000 terug.",
        },
        {
          kind: "p",
          text: "Met kapitalisatie wordt het eerste jaar €600 bij het kapitaal gevoegd. Het tweede jaar brengt €20.600 aan 3% €618 op. In totaal is dat €1.218 bruto, of €852,60 netto na 30% roerende voorheffing. Het verschil met jaarlijkse uitbetaling is klein op twee jaar, maar groeit bij langere looptijden.",
        },
      ],
    },
    {
      heading: "Fiscaal en wettelijk kader voor deposito's in België",
      blocks: [
        {
          kind: "ul",
          items: [
            "Op de interest van een termijnrekening houdt de bank 30% roerende voorheffing in vanaf de eerste euro. De vrijstelling van €1.020 (2026) geldt alleen voor gereglementeerde spaarrekeningen, niet voor deposito's.",
            "De roerende voorheffing is bevrijdend: u hoeft de interest niet meer aan te geven in uw belastingaangifte.",
            "Eén uitzondering bevestigt de regel: op de eenjarige Staatsbon van september 2023 gold een verlaagd tarief van 15%. Latere staatsbons volgen opnieuw het gewone tarief van 30%.",
            "Uw deposito valt onder de Belgische depositogarantie: tot €100.000 per persoon en per bank, voor spaarrekeningen, zichtrekeningen en termijnrekeningen samen (Garantiefonds, FOD Financiën).",
            "Een termijnrekening is in principe niet vervroegd opzegbaar. Laat de bank het toch toe, dan rekent zij meestal een vergoeding aan of betaalt zij een lagere rente. Lees de voorwaarden vóór u tekent.",
          ],
        },
        {
          kind: "p",
          text: "Bronnen: FOD Financiën (roerende voorheffing en vrijstelling), Garantiefonds voor financiële diensten (depositobescherming), Wikifin van de FSMA (werking van termijnrekeningen en kasbons) en het Federaal Agentschap van de Schuld (staatsbons).",
        },
      ],
    },
    {
      heading: "Termijnrekening of spaarrekening: wanneer is wat interessanter?",
      blocks: [
        {
          kind: "p",
          text: "Het fiscale verschil bepaalt vaak de uitkomst. Op €10.000 levert een termijnrekening aan 3% bruto €210 netto op. Een gereglementeerde spaarrekening aan 2,5% levert €250 op, zolang u onder de vrijstelling van €1.020 blijft. De termijnrekening wint pas als haar brutorente minstens 43% hoger ligt dan de spaarrente (3% bruto is 2,1% netto, dus de spaarrekening moet onder 2,1% zitten).",
        },
        {
          kind: "ul",
          items: [
            "Kies een termijnrekening voor geld dat u zeker niet nodig hebt tijdens de looptijd en waarvoor u de rente wilt vastklikken, bijvoorbeeld als u een rentedaling verwacht.",
            "Kies een spaarrekening voor uw noodfonds en voor bedragen waarvan de interest onder de vrijstelling blijft: daar is het nettorendement doorgaans hoger.",
            "Spreid grote bedragen over looptijden (een rentetrap): zo komt elk jaar een deel vrij dat u opnieuw tegen de dan geldende rente kunt beleggen.",
          ],
        },
      ],
    },
    {
      heading: "Veelgemaakte fouten bij deposito's",
      blocks: [
        {
          kind: "ul",
          items: [
            "De brutorente vergelijken met de rente van een spaarrekening zonder de 30% roerende voorheffing mee te rekenen.",
            "Geld vastzetten dat u binnen de looptijd nodig hebt: vervroegd opvragen is vaak onmogelijk of kost een vergoeding.",
            "Vergeten dat de depositogarantie per bank geldt en per persoon stopt bij €100.000, inclusief uw andere rekeningen bij die bank.",
            "De eindvervaldag niet in de agenda zetten: sommige banken verlengen automatisch tegen het dan geldende, mogelijk lagere tarief.",
            "Kapitalisatie en jaarlijkse uitbetaling door elkaar halen bij het vergelijken van offertes met verschillende looptijden.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Hoeveel brengt een termijnrekening van 10.000 euro op?",
      answer:
        "Dat hangt af van de rente en de looptijd. Aan 3% bruto brengt €10.000 per jaar €300 bruto op. Na 30% roerende voorheffing blijft €210 netto over. Op twee jaar met jaarlijkse uitbetaling is dat €420 netto, met kapitalisatie iets meer. Vul het tarief van uw bank in de calculator in voor het exacte bedrag.",
    },
    {
      question: "Hoeveel roerende voorheffing betaal ik op een termijnrekening?",
      answer:
        "30% op de volledige interest, vanaf de eerste euro. De bank houdt dat bedrag automatisch in en stort het door aan de fiscus; u hoeft de interest daarna niet meer aan te geven. De vrijstelling van €1.020 en het tarief van 15% gelden alleen voor gereglementeerde spaarrekeningen.",
    },
    {
      question: "Kan ik mijn termijnrekening vervroegd opzeggen?",
      answer:
        "In principe niet: u verbindt zich voor de volledige looptijd. Veel banken laten vervroegde opvraging toe in uitzonderlijke situaties, maar rekenen dan een vergoeding aan of herrekenen de interest tegen een lagere rente. Kijk vóór u tekent in de voorwaarden wat uw bank precies toestaat.",
    },
    {
      question: "Is mijn geld op een termijnrekening veilig als de bank failliet gaat?",
      answer:
        "Ja, tot €100.000 per persoon en per bank. Het Belgische Garantiefonds dekt termijnrekeningen, spaarrekeningen en zichtrekeningen samen. Hebt u meer dan €100.000 bij één bank, spreid dan over meerdere banken of zet het surplus op naam van uw partner.",
    },
    {
      question: "Wat is het verschil tussen een termijnrekening, een kasbon en een staatsbon?",
      answer:
        "Alle drie zijn vastrentende producten met een vaste looptijd en 30% roerende voorheffing. Een termijnrekening is een rekening bij uw bank; een kasbon is een schuldbewijs van een bank, vaak voor langere looptijden; een staatsbon is een lening aan de Belgische Staat die u inschrijft via de bank of het Federaal Agentschap van de Schuld. Staatsbons vallen niet onder het Garantiefonds maar zijn gewaarborgd door de Staat zelf.",
    },
    {
      question: "Wanneer is een termijnrekening interessanter dan een spaarrekening?",
      answer:
        "Als de netto-opbrengst hoger is. Reken de termijnrente maal 0,70 (na 30% roerende voorheffing) en vergelijk met de totale spaarrente (basisrente plus getrouwheidspremie), die tot €1.020 interest per persoon belastingvrij is. Een termijnrekening aan 3% (2,1% netto) is pas beter dan een spaarrekening die onder 2,1% totale rente zit, of wanneer u met uw spaarinterest de vrijstelling toch al overschrijdt.",
    },
  ],
};
