import type { CalculatorEducationalContent } from "./types";

// Rekenvoorbeeld: €25.000 aan 4,9% JKP op 60 maanden → €470,64/maand, kost
// €3.238,18; met €5.000 voorschot (€20.000) → €376,51/maand, kost €2.590,54;
// €25.000 op 48 maanden → €574,60/maand, kost €2.580,83. Het JKP van 4,9% is
// een illustratie, geen markttarief.

export const autoleningBerekenenContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat berekent de autolening-calculator?",
      blocks: [
        {
          kind: "p",
          text: "Een autolening is een lening op afbetaling met een bestemming: het geld dient om een nieuwe of tweedehandswagen, een motor of een ander voertuig te kopen, en u bewijst dat met de bestelbon of factuur. Deze calculator berekent uw maandlast, de totale terugbetaling en de kostprijs van het krediet op basis van de aankoopprijs, uw voorschot of inruilwaarde, de looptijd en het jaarlijks kostenpercentage (JKP). U kunt ook een slottermijn (ballon) invullen om een ballonlening met een klassieke autolening te vergelijken.",
        },
        {
          kind: "p",
          text: "Autoleningtarieven verschillen per kredietgever en vaak ook naargelang de wagen nieuw, recent of ouder is, en of hij elektrisch of hybride is. De tool rekent met het JKP dat u invult; vergelijk de offertes van uw bank, een online kredietgever en de financiering van de concessiehouder.",
        },
      ],
    },
    {
      heading: "De formule voor uw maandlast",
      blocks: [
        {
          kind: "formula",
          text: "Maandlast = (aankoopprijs − voorschot) × i ÷ (1 − (1 + i)^−n)   waarbij i = JKP ÷ 12 en n = looptijd in maanden",
        },
        {
          kind: "p",
          text: "Bij een ballonlening betaalt u maandelijks alleen interest plus een deel van het kapitaal, en op het einde in één keer de slottermijn (meestal de verwachte restwaarde van de wagen). De maandlast is lager, maar de totale interest hoger, omdat een groot deel van het kapitaal de hele looptijd blijft openstaan.",
        },
      ],
    },
    {
      heading: "Rekenvoorbeeld: een wagen van €25.000 financieren",
      blocks: [
        {
          kind: "p",
          text: "U financiert €25.000 op 60 maanden aan een JKP van 4,9%. De maandlast bedraagt €470,64, u betaalt in totaal €28.238,18 terug en de lening kost u €3.238,18. Betaalt u €5.000 voorschot (of ruilt u uw oude wagen in voor dat bedrag), dan leent u €20.000: de maandlast daalt naar €376,51 en de kost naar €2.590,54.",
        },
        {
          kind: "p",
          text: "Kiest u voor de volledige €25.000 maar op 48 maanden, dan stijgt de maandlast naar €574,60 en daalt de totale kost naar €2.580,83. Een jaar korter lenen bespaart hier dus ruim €650 interest. Vergelijk steeds de totale kost, en vergeet niet dat een wagen snel in waarde daalt: een looptijd die langer is dan de tijd dat u de wagen houdt, laat u aflossen op iets dat u al verkocht hebt.",
        },
      ],
    },
    {
      heading: "Wettelijk kader: de autolening als consumentenkrediet",
      blocks: [
        {
          kind: "ul",
          items: [
            "Een autolening valt onder de regels voor consumentenkrediet in Boek VII van het Wetboek van economisch recht: verplicht SECCI-informatieblad, vermelding van het JKP en een wettelijk maximaal JKP per kredietbedrag, vastgelegd door de FOD Economie en halfjaarlijks herzien.",
            "U hebt 14 kalenderdagen herroepingsrecht na ondertekening van het kredietcontract.",
            "Vervroegd terugbetalen kan altijd; de vergoeding is beperkt tot 1% van het terugbetaalde kapitaal (resterende looptijd langer dan een jaar) of 0,5% (korter dan een jaar).",
            "Omdat het krediet een bestemming heeft, vraagt de kredietgever de bestelbon of factuur en betaalt hij soms rechtstreeks aan de verkoper. Kredietgevers hanteren vaak een lager tarief voor nieuwe en recente wagens dan voor oudere tweedehandswagens, en een apart tarief voor elektrische of hybride wagens.",
            "De kredietgever raadpleegt vóór toekenning de Centrale voor kredieten aan particulieren van de Nationale Bank; de lening wordt daar geregistreerd.",
            "Een financiering via de concessiehouder is ook een consumentenkrediet met dezelfde bescherming. Bij een 0%-financiering zit de kost vaak in een hogere aankoopprijs of een kleinere korting: vergelijk de totale prijs inclusief financiering.",
          ],
        },
        {
          kind: "p",
          text: "Bronnen: FOD Economie (consumentenkrediet en maximale JKP's), Nationale Bank van België (Centrale voor kredieten aan particulieren), Wikifin van de FSMA (een wagen kopen en financieren) en de gewestelijke belastingdiensten (belasting op inverkeerstelling en verkeersbelasting).",
        },
      ],
    },
    {
      heading: "Kosten die bovenop de lening komen",
      blocks: [
        {
          kind: "p",
          text: "De maandlast van de lening is maar een deel van wat een wagen kost. Reken daarnaast op de eenmalige belasting op de inverkeerstelling (BIV) en de jaarlijkse verkeersbelasting, die per gewest verschillen en afhangen van vermogen, brandstof en CO2-uitstoot; op de verplichte BA-verzekering en een eventuele omnium; en op onderhoud, banden, keuring en brandstof of laadkosten. Een autolening vergelijken doet u dus best op het totale maandbudget voor de wagen, niet alleen op de aflossing.",
        },
      ],
    },
    {
      heading: "Veelgemaakte fouten bij een autolening",
      blocks: [
        {
          kind: "ul",
          items: [
            "Alleen de maandlast vergelijken en de totale kost of het JKP negeren.",
            "Een 0%-financiering van de verkoper aanvaarden zonder te vragen welke korting u krijgt bij contante betaling of een banklening.",
            "Langer lenen dan u de wagen zult houden, waardoor u bij verkoop nog een openstaand saldo moet aflossen.",
            "Een ballonlening kiezen voor de lage maandlast zonder te plannen hoe u de slottermijn betaalt.",
            "Verzekering, BIV, verkeersbelasting en onderhoud niet in het maandbudget opnemen.",
            "Het verschil in tarief tussen nieuwe en tweedehandswagens niet checken: voor een oudere wagen kan een persoonlijke lening zonder bestemming soms even goedkoop zijn.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Hoeveel kost een autolening van 25.000 euro per maand?",
      answer:
        "Aan een JKP van 4,9% op 60 maanden betaalt u €470,64 per maand en €3.238,18 interest in totaal. Op 48 maanden is dat €574,60 per maand en €2.580,83 interest. Met €5.000 voorschot leent u €20.000 en daalt de maandlast op 60 maanden naar €376,51. Vul het JKP uit uw offerte in de calculator in voor uw situatie.",
    },
    {
      question: "Is een autolening voor een tweedehandswagen duurder dan voor een nieuwe wagen?",
      answer:
        "Vaak wel. Veel kredietgevers hanteren hun laagste tarief voor nieuwe wagens en wagens tot ongeveer twee of drie jaar oud, en een hoger tarief voor oudere tweedehandswagens. Sommige banken bieden ook een voordeliger tarief voor elektrische of hybride wagens. Vergelijk voor een oudere wagen ook een persoonlijke lening zonder bestemming.",
    },
    {
      question: "Hoeveel voorschot moet ik betalen bij een autolening?",
      answer:
        "Er is geen wettelijk minimum; u kunt de volledige aankoopprijs financieren als uw terugbetalingscapaciteit dat toelaat. Een voorschot of inruilwaarde van 10% tot 20% verlaagt wel uw maandlast en de totale interest, en beperkt het risico dat het openstaande saldo hoger ligt dan de waarde van de wagen.",
    },
    {
      question: "Wat is een ballonlening voor een auto?",
      answer:
        "Een autolening waarbij u maandelijks een lager bedrag betaalt en op het einde in één keer een grote slottermijn (de ballon), meestal gelijk aan de verwachte restwaarde van de wagen. U kunt die slottermijn betalen, de wagen verkopen of herfinancieren. De maandlast is lager, maar de totale interest ligt hoger dan bij een klassieke autolening.",
    },
    {
      question: "Autolening of private lease: wat is voordeliger?",
      answer:
        "Bij een autolening wordt u eigenaar en betaalt u interest; na de looptijd is de wagen van u. Bij private lease huurt u de wagen voor een vast maandbedrag dat vaak verzekering, onderhoud en belastingen omvat, maar u bouwt geen eigendom op en betaalt bij inlevering voor extra kilometers of schade. Vergelijk de totale kost over dezelfde periode, inclusief de restwaarde van de wagen bij een lening.",
    },
    {
      question: "Kan ik mijn autolening vervroegd terugbetalen?",
      answer:
        "Ja, geheel of gedeeltelijk, op elk moment. De kredietgever mag maximaal 1% van het vervroegd terugbetaalde kapitaal aanrekenen als de resterende looptijd langer is dan een jaar, en 0,5% als ze korter is. Verkoopt u de wagen vóór het einde van de lening, dan betaalt u met de opbrengst het saldo af en stopt het contract.",
    },
  ],
};
