import type { CalculatorEducationalContent } from "./types";

export const doelspaarcalculatorContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat doet de Doelspaarcalculator?",
      blocks: [
        {
          kind: "p",
          text: "De Doelspaarcalculator helpt u meerdere financiële doelen tegelijk plannen — van een nieuwe wagen tot een droomvakantie of de aanbetaling op een woning. Deze tool berekent voor elk doel hoeveel u maandelijks opzij moet leggen om het binnen uw gewenste tijdslijn te halen, en helpt u prioriteiten stellen wanneer uw spaarbudget beperkt is. Ideaal voor wie een gestructureerd spaarplan wil opbouwen in plaats van willekeurig te sparen zonder helder eindresultaat.",
        },
      ],
    },
    {
      heading: "Hoe werkt het?",
      blocks: [
        {
          kind: "p",
          text: "De calculator gebruikt de standaardformule voor doelsparen:",
        },
        {
          kind: "formula",
          text: "Maandelijks bedrag = (Doelbedrag − Huidig spaartegoed) ÷ Aantal maanden tot deadline",
        },
        {
          kind: "p",
          text: "Voor doelen die rente opbrengen op een spaarrekening past de tool de toekomstige-waardeformule met samengestelde interest toe: M = D × i ÷ ((1+i)ⁿ − 1), waarbij D het doelbedrag is, i de maandelijkse rente, en n het aantal maanden.",
        },
        {
          kind: "p",
          text: "U voert per doel het streefbedrag, de deadline en eventueel een huidig saldo in. De calculator toont vervolgens het maandelijks vereiste spaarbedrag en sorteert uw doelen op urgentie en haalbaarheid. Wanneer uw totale maandelijkse spaarcapaciteit ontoereikend is voor alle doelen samen, signaleert de tool dit en kunt u kiezen om deadlines te verschuiven, doelbedragen aan te passen of doelen tijdelijk te pauzeren. Realistische voorbeelden: €25.000 voor een wagen over 5 jaar = ±€385/maand zonder rente, of ±€365/maand bij 2,5% spaarrente.",
        },
      ],
    },
    {
      heading: "Belgisch fiscaal kader",
      blocks: [
        {
          kind: "p",
          text: "Voor doelsparen op een gereglementeerde Belgische spaarrekening is de eerste schijf interest belastingvrij: in 2026 bedraagt de vrijstelling €1.020 interest per persoon per jaar (gehuwden en wettelijk samenwonenden mogen die vrijstelling per partner toepassen). Boven dat plafond geldt 15% roerende voorheffing. Voor termijnrekeningen, kasbons en spaarverzekeringen Tak 21 ligt de heffing op 30% roerende voorheffing. Tak 21-spaarverzekeringen zijn pas vrijgesteld na 8 jaar en 1 dag looptijd (of bij overlijden). Voor langere doelen (>8 jaar) — bijvoorbeeld een woningaankoop of pensioenaanvulling — kan een gemengde strategie met spaarrekening + Tak 21 fiscaal interessant zijn. Voor korte doelen (<3 jaar) blijft een gewone spaarrekening doorgaans het eenvoudigst en meest liquide.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Hoeveel doelen kan ik tegelijk plannen?",
      answer:
        "Er is geen technisch maximum, maar in de praktijk werken de meeste Belgische gezinnen het best met 3-5 actieve spaardoelen. Te veel doelen versnippert uw maandbudget en maakt elk doel traag haalbaar.",
    },
    {
      question: "Met welke spaarrente moet ik rekenen?",
      answer:
        "Voor gereglementeerde Belgische spaarrekeningen ligt de gemiddelde rente in 2026 tussen 1,5% en 3,5%. Voor termijnrekeningen op 1-3 jaar tot 3,75%. Reken voor doelen onder de 2 jaar best zonder rendement, want de getrouwheidspremie krijgt u dan niet volledig.",
    },
    {
      question: "Wat als mijn maandbudget niet alle doelen dekt?",
      answer:
        "De calculator markeert dit en stelt drie oplossingen voor: (1) deadlines verlengen, (2) niet-essentiële doelen pauzeren, of (3) prioriteit geven aan doelen met de hoogste urgentie (bv. noodfonds eerst).",
    },
    {
      question: "Tellen werkgeversbonus en vakantiegeld mee?",
      answer:
        "Ja, in de \"extra storting\"-velden. Eindejaarspremie en vakantiegeld zijn ideale boosters voor langetermijndoelen die anders te zwaar wegen op uw maandbudget.",
    },
  ],
};
