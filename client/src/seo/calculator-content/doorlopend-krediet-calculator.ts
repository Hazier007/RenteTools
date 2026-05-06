import type { CalculatorEducationalContent } from "./types";

export const doorlopendKredietCalculatorContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat doet de Doorlopend Krediet Calculator?",
      blocks: [
        {
          kind: "p",
          text: "De Doorlopend Krediet Calculator berekent de werkelijke kostprijs van een revolving credit of kredietlijn in België. Anders dan een persoonlijke lening met een vast aflossingsschema laat een doorlopend krediet u herhaaldelijk geld opnemen tot een afgesproken kredietlimiet — handig voor onverwachte uitgaven, maar potentieel duur door variabele rentes van doorgaans 7% tot 12% JKP. Deze tool toont u hoeveel u maandelijks betaalt, hoeveel rente u over de looptijd kwijt bent, en hoe lang het duurt om volledig af te lossen bij verschillende terugbetalingsritmes.",
        },
      ],
    },
    {
      heading: "Hoe werkt het?",
      blocks: [
        {
          kind: "p",
          text: "De calculator berekent uw maandlast op basis van openstaand saldo, JKP en gewenste terugbetalingstermijn. De Belgische standaardformule voor een revolving credit is:",
        },
        {
          kind: "formula",
          text: "Maandlast = (Saldo × i) ÷ (1 − (1+i)⁻ⁿ)",
        },
        {
          kind: "p",
          text: "waarbij i de maandelijkse rente is (JKP ÷ 12) en n het aantal maanden. JKP — het Jaarlijks Kostenpercentage — is de wettelijk verplichte all-in maatstaf in België: rente, dossierkosten en eventuele verzekeringspremies samen. Vergelijk altijd op JKP, niet op nominale rente.",
        },
        {
          kind: "p",
          text: "Voer uw kredietlimiet, opgenomen bedrag, JKP en gewenste maandlast of looptijd in. De tool toont:",
        },
        {
          kind: "ul",
          items: [
            "Totale interestkost over de looptijd.",
            "Maandlast bij gekozen termijn.",
            "Aflossingstijd bij minimale aflossing versus versnelde terugbetaling.",
          ],
        },
        {
          kind: "p",
          text: "Voorbeeld: een opgenomen saldo van €5.000 op 10% JKP terugbetaald aan €150/maand kost u ±€1.234 aan rente en duurt ±42 maanden. Bij €250/maand: ±€678 rente, ±23 maanden. Versnelde aflossing scheelt vaak honderden euro's.",
        },
      ],
    },
    {
      heading: "Belgisch fiscaal kader",
      blocks: [
        {
          kind: "p",
          text: "Doorlopende kredieten vallen onder de Wet op het Consumentenkrediet (Boek VII Wetboek Economisch Recht). Elke kredietopening boven €200 wordt geregistreerd bij de Centrale voor Kredieten aan Particulieren (CKP) bij de Nationale Bank — die registratie blijft 12 maanden na volledige terugbetaling zichtbaar voor andere kredietverstrekkers en kan toekomstige hypotheek- of leningaanvragen beïnvloeden. De rente op consumentenkredieten is in België niet fiscaal aftrekbaar voor privégebruik. Wettelijke maxima op JKP worden door de FOD Economie per kwartaal gepubliceerd; voor revolving credits ligt dat plafond doorgaans rond 11-13%. Vergelijk altijd minstens drie aanbieders en wantrouw tarieven die boven het wettelijk maximum uitkomen — dat is per definitie illegaal.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Wat is het verschil met een persoonlijke lening?",
      answer:
        "Een persoonlijke lening heeft een vast bedrag, vaste maandlast en vaste einddatum. Een doorlopend krediet is een herbruikbare kredietlijn met variabele rente: u kunt herhaaldelijk opnemen tot de limiet, en de rente kan tijdens de looptijd wijzigen.",
    },
    {
      question: "Is een doorlopend krediet duurder dan een persoonlijke lening?",
      answer:
        "Meestal wel. Persoonlijke leningen in België zitten in 2026 typisch tussen 4% en 8% JKP; doorlopende kredieten tussen 7% en 12% JKP. Voor een gepland eenmalig project is een persoonlijke lening doorgaans goedkoper.",
    },
    {
      question: "Wat gebeurt er als ik enkel het minimum aflos?",
      answer:
        "Bij minimale aflossing dekt u soms amper de maandelijkse rente. Het saldo daalt traag of niet, en de totale rentekost loopt sterk op. Reken altijd door wat u écht betaalt over de volledige looptijd.",
    },
    {
      question: "Komt mijn kredietlijn op de zwarte lijst van de Nationale Bank?",
      answer:
        "Elke kredietopening wordt geregistreerd bij de CKP — dat is geen \"zwarte lijst\", maar een neutrale registratie. Een betalingsachterstand van meer dan drie maanden komt wél op de negatieve lijst en blijft daar tot 1 jaar na regularisatie zichtbaar.",
    },
    {
      question: "Mag ik vervroegd terugbetalen zonder boete?",
      answer:
        "Voor consumentenkredieten onder €75.000 is een vergoeding van maximaal 0,5% (of 1% bij looptijd >1 jaar) van het vervroegd terugbetaalde bedrag toegelaten. Voor revolving credits is vervroegde terugbetaling vaak boetevrij — controleer uw contract.",
    },
  ],
};
