import type { CalculatorEducationalContent } from "./types";

export const voorschotCalculatorContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat doet de Voorschot Calculator?",
      blocks: [
        {
          kind: "p",
          text: "De Voorschot Calculator berekent kosten en haalbaarheid van kortlopende voorschotten en overbruggingskredieten in België. Een voorschot — ook wel cash advance, bridge loan of overbruggingskrediet genoemd — overbrugt een tijdelijke liquiditeitskloof: bijvoorbeeld tussen verkoop van uw oude woning en aankoop van uw nieuwe, of voor zelfstandigen die op een uitstaande factuur wachten. Deze tool toont u de totale kost, maandelijkse rentelast en break-even-punt zodat u kunt beoordelen of een voorschot werkelijk goedkoper is dan een alternatief.",
        },
      ],
    },
    {
      heading: "Hoe werkt het?",
      blocks: [
        {
          kind: "p",
          text: "Voor kortlopende voorschotten (3-12 maanden) berekent de calculator de eenvoudige interestformule:",
        },
        {
          kind: "formula",
          text: "Totale rentekost = Hoofdsom × JKP × (Looptijd in maanden ÷ 12)",
        },
        {
          kind: "p",
          text: "Voor overbruggingskredieten (typisch 6-24 maanden) komt daar vaak een vaste dossierkost en eventuele expertise- of notariskost bij. U voert in: gewenst voorschotbedrag, JKP, looptijd in maanden en eventuele eenmalige kosten. De tool toont:",
        },
        {
          kind: "ul",
          items: [
            "Totale interestkost over de looptijd.",
            "Maandelijkse rentelast (kapitaal blijft staan, alleen rente wordt periodiek betaald — typisch voor overbruggingskredieten).",
            "All-in JKP inclusief dossierkosten en eventuele commissies.",
            "Break-even versus alternatieven (bv. spaargeld inzetten of een persoonlijke lening).",
          ],
        },
        {
          kind: "p",
          text: "Voorbeeld: een overbruggingskrediet van €100.000 op 5,5% JKP voor 9 maanden kost ±€4.125 aan rente. Een cash advance van €2.000 op een kredietkaart op 18% JKP voor 3 maanden kost ±€90 — relatief duur per euro, maar overzichtelijk in absolute waarde.",
        },
      ],
    },
    {
      heading: "Belgisch fiscaal kader",
      blocks: [
        {
          kind: "p",
          text: "Overbruggingskredieten op vastgoed vallen onder de hypothecaire kredietwetgeving (Boek VII Wetboek Economisch Recht), kortlopende voorschotten op consumentengoederen onder de Wet op het Consumentenkrediet. Beide worden geregistreerd bij de Centrale voor Kredieten aan Particulieren zodra het bedrag boven €200 ligt. Hypothecaire overbruggingskredieten zijn in België doorgaans niet fiscaal aftrekbaar voor de gezinswoning sinds de regionalisering van de woonbonus, tenzij de uiteindelijke nieuwe lening wel onder een specifiek gewestelijk fiscaal regime valt — controleer dit bij Vlaams Belastingdienst, Bruxelles Fiscalité of SPW Fiscalité naargelang gewest. Voor zelfstandigen en KMO's: rente op een professioneel voorschot (bv. om een uitstaande klantfactuur te overbruggen) is wel aftrekbaar als beroepskost. Cash advances op kredietkaarten worden vrijwel nooit fiscaal erkend en hebben de hoogste JKP's op de Belgische kredietmarkt — vaak 15-25%.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Wat is het verschil tussen een voorschot en een overbruggingskrediet?",
      answer:
        "Een voorschot is meestal kortlopend (3-12 maanden) en overbrugt een tijdelijke kasvraag. Een overbruggingskrediet is een specifiek type voorschot dat de periode tussen verkoop en aankoop van vastgoed overbrugt — typisch 6-24 maanden, met de oude woning als onderpand.",
    },
    {
      question: "Hoe lang mag een overbruggingskrediet duren?",
      answer:
        "Belgische banken hanteren doorgaans 12 tot 24 maanden, met soms een verlengingsmogelijkheid van 6 maanden. Loopt het krediet langer dan voorzien, dan stijgt de rente meestal en kan een herfinanciering verplicht worden.",
    },
    {
      question: "Welke documenten heb ik nodig voor een overbruggingskrediet?",
      answer:
        "Verkoopovereenkomst van uw oude woning of een schatting van een erkend vastgoedmakelaar, aankoopovereenkomst van de nieuwe woning, recente loonfiches of inkomensbewijzen, en een notariële volmacht voor het hypotheekdossier.",
    },
    {
      question: "Wat als mijn oude woning niet binnen de looptijd verkocht raakt?",
      answer:
        "Dan wordt het voorschot bij vervaldag opeisbaar. Bij goede communicatie met de bank zijn een verlenging of een omzetting in een klassieke hypothecaire lening mogelijk — maar tegen vaak hogere rente. Begin het verkoopproces dus liefst vóór de aanvraag van het overbruggingskrediet.",
    },
    {
      question: "Is een cash advance op mijn kredietkaart een goed alternatief?",
      answer:
        "Zelden. Cash advance JKP's liggen in België typisch tussen 15% en 25% en starten vaak vanaf dag 1 (geen renteloze periode). Een persoonlijke lening op 6-8% JKP is bij gelijke looptijd vrijwel altijd goedkoper.",
    },
  ],
};
