import type { CalculatorEducationalContent } from "./types";

// Rekenvoorbeeld: €250.000 aan 3% vast → 25 jaar: €1.185,53/maand, €105.658,49
// interest; 20 jaar: €1.386,49/maand, €82.758,56 interest. De rentevoet van 3% is
// een illustratie, geen marktrente. Registratierechten 2026: Vlaanderen 2% (enige
// eigen woning, sinds 1 januari 2025) / 12%; Wallonië 3% (eigen woning, sinds
// 1 januari 2025) / 12,5%; Brussel 12,5% met abattement op de eerste €200.000.

export const hypothecaireLeningBerekenenContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat berekent de hypotheek-calculator?",
      blocks: [
        {
          kind: "p",
          text: "Met deze calculator berekent u de maandlast van een hypothecaire lening in België, de totale interest over de looptijd en het effect van looptijd, rentevoet en eigen inbreng. U vult het ontleende bedrag, de rentevoet en de looptijd in en ziet meteen wat u elke maand afbetaalt, hoeveel daarvan kapitaal en hoeveel interest is, en wat de lening u in totaal kost. Daarnaast schat de tool de aankoopkosten die bovenop de prijs komen: registratierechten, notariskosten en de kosten van de hypothecaire inschrijving.",
        },
        {
          kind: "p",
          text: "De tool rekent met de rentevoet die u invult. Hypotheekrentes verschillen per bank, per looptijd, per quotiteit en per dossier, en veranderen met de marktrente. Vraag offertes bij minstens drie kredietgevers of raadpleeg Wikifin (FSMA) voor de gemiddelde tarieven, en reken ze hier door.",
        },
      ],
    },
    {
      heading: "De formule achter uw maandlast",
      blocks: [
        {
          kind: "p",
          text: "Bijna alle Belgische woonkredieten zijn annuïteitenleningen: u betaalt elke maand hetzelfde bedrag, waarvan het aandeel interest daalt en het aandeel kapitaal stijgt. De maandlast volgt uit de annuïteitenformule:",
        },
        {
          kind: "formula",
          text: "Maandlast = kapitaal × i ÷ (1 − (1 + i)^−n)   waarbij i = jaarrente ÷ 12 en n = looptijd in maanden",
        },
        {
          kind: "p",
          text: "Bij een lineaire aflossing betaalt u elke maand hetzelfde stuk kapitaal plus interest op het resterende saldo; de maandlast begint hoger en daalt. In totaal betaalt u minder interest dan bij een annuïteit, maar de eerste jaren wegen zwaarder op uw budget. Banken bieden in België vooral annuïteiten aan.",
        },
      ],
    },
    {
      heading: "Rekenvoorbeeld: €250.000 lenen aan 3% vast",
      blocks: [
        {
          kind: "p",
          text: "U leent €250.000 op 25 jaar aan een vaste rentevoet van 3%. De maandlast bedraagt €1.185,53. Over de volledige looptijd betaalt u €355.658,49 terug, waarvan €105.658,49 interest. Kiest u voor 20 jaar, dan stijgt de maandlast naar €1.386,49, maar daalt de totale interest naar €82.758,56. Vijf jaar korter lenen kost u dus €200 per maand extra en bespaart €22.900 aan interest.",
        },
        {
          kind: "p",
          text: "Een half procent rente maakt een groot verschil: dezelfde lening aan 3,5% op 25 jaar kost €1.251,56 per maand en €125.467,68 interest, bijna €20.000 meer dan aan 3%. Daarom loont het om offertes te vergelijken en te onderhandelen over quotiteit en bijproducten.",
        },
      ],
    },
    {
      heading: "Aankoopkosten bovenop de prijs: registratierechten, notaris en hypotheek",
      blocks: [
        {
          kind: "ul",
          items: [
            "Vlaanderen: 2% verkooprecht voor de aankoop van uw enige eigen woning waar u binnen drie jaar gaat wonen (sinds 1 januari 2025), 12% voor andere woningen en bouwgrond. Op een woning van €300.000 is dat €6.000 in plaats van €36.000.",
            "Wallonië: 3% voor de enige eigen woning (sinds 1 januari 2025), 12,5% in de andere gevallen.",
            "Brussel: 12,5%, met een abattement (vrijstelling) op de eerste €200.000 voor de eigen woning als de aankoopprijs niet hoger is dan €600.000.",
            "Nieuwbouw: 21% btw op de constructie in plaats van registratierechten (6% in bepaalde gevallen van sloop en heropbouw).",
            "Notariskosten: het ereloon van de notaris is wettelijk vastgelegd en degressief, plus administratieve aktekosten. Reken op de aankoopakte én een aparte kredietakte.",
            "Hypothecaire inschrijving: 1% registratierecht op het ingeschreven bedrag plus 0,3% hypotheekrecht, bovenop het ereloon voor de kredietakte. Banken schrijven doorgaans 110% van het kredietbedrag in.",
          ],
        },
        {
          kind: "p",
          text: "Bronnen: Vlaamse Belastingdienst, Service public de Wallonie Finances, Brussel Fiscaliteit (registratierechten), notaris.be (ereloon en aktekosten) en Wikifin van de FSMA (werking van het woonkrediet).",
        },
      ],
    },
    {
      heading: "Wettelijk kader: quotiteit, afbetalingslast en variabele rente",
      blocks: [
        {
          kind: "ul",
          items: [
            "Hypothecair krediet valt onder Boek VII van het Wetboek van economisch recht. De kredietgever moet u vóór het contract een ESIS-informatieblad bezorgen met alle kosten en het jaarlijks kostenpercentage (JKP).",
            "De Nationale Bank van België vraagt banken sinds 2020 om in principe maximaal 90% van de aankoopprijs te lenen (quotiteit). Voor een deel van de starters mag dat tot 100%, voor verhuurvastgoed is 80% de norm. Hoe hoger de quotiteit, hoe hoger meestal de rentevoet.",
            "Banken toetsen uw afbetalingslast: de som van uw kredietlasten blijft doorgaans onder 33% tot 40% van uw netto-inkomen, met een minimum aan resterend budget.",
            "Een variabele rentevoet mag in België maximaal verdubbelen ten opzichte van de startrente, en de verlaging moet even groot kunnen zijn als de verhoging. De herziening volgt de referte-indexen die maandelijks in het Belgisch Staatsblad verschijnen.",
            "Een schuldsaldoverzekering is niet wettelijk verplicht, maar de bank stelt ze meestal als voorwaarde. U mag ze bij een andere verzekeraar afsluiten; de bank mag daarvoor hooguit haar rentekorting intrekken.",
          ],
        },
      ],
    },
    {
      heading: "Veelgemaakte fouten bij het berekenen van een hypotheek",
      blocks: [
        {
          kind: "ul",
          items: [
            "Alleen de maandlast vergelijken en niet het JKP, waarin dossierkosten en verplichte verzekeringen zitten.",
            "De aankoopkosten (registratierechten, notaris, hypotheekkosten) niet in de eigen inbreng meerekenen: die worden zelden mee ontleend.",
            "Zo lang mogelijk lenen om de maandlast te drukken zonder te zien hoeveel interest dat in totaal kost.",
            "Variabel lenen zonder te berekenen of u de maandlast nog kunt dragen als de rente verdubbelt.",
            "De schuldsaldoverzekering en de brandverzekering vergeten in het maandbudget.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Hoeveel kan ik lenen voor een huis in België?",
      answer:
        "Dat hangt af van twee grenzen. De bank leent volgens de richtlijn van de Nationale Bank in principe maximaal 90% van de aankoopprijs (quotiteit), al mag een deel van de starters tot 100% gaan. Daarnaast mag uw totale afbetalingslast doorgaans niet boven 33% tot 40% van uw netto-inkomen uitkomen. De kredietcapaciteit-calculator op deze site rekent beide grenzen voor u uit.",
    },
    {
      question: "Wat kost een hypothecaire lening van 250.000 euro per maand?",
      answer:
        "Aan 3% vast op 25 jaar betaalt u €1.185,53 per maand en in totaal €105.658,49 interest. Op 20 jaar wordt dat €1.386,49 per maand en €82.758,56 interest. Aan 3,5% op 25 jaar stijgt de maandlast naar €1.251,56. Vul de rentevoet uit uw offerte in de calculator in voor uw exacte maandlast.",
    },
    {
      question: "Hoeveel bedragen de registratierechten in Vlaanderen in 2026?",
      answer:
        "2% op de aankoop van uw enige eigen woning waar u binnen drie jaar uw hoofdverblijfplaats vestigt (tarief sinds 1 januari 2025), en 12% voor een tweede woning, een opbrengsteigendom of bouwgrond. Op een woning van €300.000 betaalt u dus €6.000 aan 2% tegenover €36.000 aan 12%. In Wallonië geldt 3% voor de eigen woning, in Brussel 12,5% met een abattement op de eerste €200.000.",
    },
    {
      question: "Hoeveel eigen inbreng heb ik nodig voor een hypothecaire lening?",
      answer:
        "Reken op minstens 10% van de aankoopprijs plus alle aankoopkosten. Voor een woning van €300.000 in Vlaanderen is dat ongeveer €30.000 eigen inbreng plus €6.000 registratierechten, notariskosten voor aankoop- en kredietakte en 1,3% hypotheekkosten op het ingeschreven bedrag. Starters kunnen bij sommige banken tot 100% van de prijs lenen, maar de kosten blijven eigen inbreng.",
    },
    {
      question: "Vaste of variabele rentevoet: wat kies ik best?",
      answer:
        "Een vaste rentevoet geeft zekerheid over uw maandlast voor de volledige looptijd. Een variabele rentevoet start meestal lager, maar kan wettelijk tot het dubbele stijgen. Kies variabel alleen als u de maandlast bij een verdubbelde rente nog comfortabel kunt dragen, en vergelijk altijd het JKP van beide offertes.",
    },
    {
      question: "Welke kosten komen bovenop de aankoopprijs van een woning?",
      answer:
        "Registratierechten (2% tot 12,5% afhankelijk van het gewest en het type woning) of 21% btw bij nieuwbouw, het ereloon en de aktekosten van de notaris voor de aankoopakte en de kredietakte, 1% registratierecht en 0,3% hypotheekrecht op de hypothecaire inschrijving, dossierkosten van de bank en de schattingskosten. Samen loopt dat op tot 5% à 15% van de prijs.",
    },
  ],
};
