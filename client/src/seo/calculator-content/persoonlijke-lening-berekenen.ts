import type { CalculatorEducationalContent } from "./types";

// Rekenvoorbeeld: €10.000 aan 6,5% JKP → 48 maanden: €237,15/maand, totaal
// €11.383,18 (kost €1.383,18); 60 maanden: €195,66/maand, totaal €11.739,69
// (kost €1.739,69). Het JKP van 6,5% is een illustratie, geen markttarief.

export const persoonlijkeLeningBerekenenContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat berekent de persoonlijke-leningcalculator?",
      blocks: [
        {
          kind: "p",
          text: "Een persoonlijke lening is in België een lening op afbetaling: u leent een vast bedrag, betaalt het terug in vaste maandelijkse aflossingen over een vaste looptijd, en de rentevoet ligt vast voor de hele duur. Deze calculator berekent uw maandlast, de totale terugbetaling en de totale kostprijs van het krediet op basis van het bedrag, de looptijd en het jaarlijks kostenpercentage (JKP) uit de offerte van de kredietgever.",
        },
        {
          kind: "p",
          text: "U gebruikt de tool het best om offertes te vergelijken: vul van elke kredietgever het JKP in en kijk naar de totale kost, niet alleen naar de maandlast. Een lagere maandlast door een langere looptijd betekent bijna altijd een hogere totale kost.",
        },
      ],
    },
    {
      heading: "JKP versus rentevoet, en de formule voor de maandlast",
      blocks: [
        {
          kind: "p",
          text: "De debetrentevoet is de interest op het ontleende kapitaal. Het jaarlijks kostenpercentage (JKP) omvat daarbovenop alle verplichte kosten, zoals dossierkosten, en is het wettelijke vergelijkingscijfer dat elke kredietgever moet vermelden. Vergelijk leningen dus altijd op JKP. De maandlast van een lening op afbetaling volgt uit de annuïteitenformule:",
        },
        {
          kind: "formula",
          text: "Maandlast = kapitaal × i ÷ (1 − (1 + i)^−n)   waarbij i = JKP ÷ 12 en n = looptijd in maanden   |   Totale kost = maandlast × n − kapitaal",
        },
      ],
    },
    {
      heading: "Rekenvoorbeeld: €10.000 lenen op 48 of 60 maanden",
      blocks: [
        {
          kind: "p",
          text: "U leent €10.000 aan een JKP van 6,5%. Op 48 maanden betaalt u €237,15 per maand, in totaal €11.383,18. De lening kost u dus €1.383,18. Kiest u 60 maanden, dan daalt de maandlast naar €195,66, maar stijgt de totale terugbetaling naar €11.739,69. Die twaalf maanden extra ademruimte kosten €356,51 meer interest.",
        },
        {
          kind: "p",
          text: "De vuistregel: kies de kortste looptijd waarvan u de maandlast comfortabel kunt dragen. Vervroegd terugbetalen is altijd toegelaten en kost in België weinig, dus bij twijfel kunt u een iets langere looptijd nemen en sneller aflossen zodra het kan.",
        },
      ],
    },
    {
      heading: "Wettelijk kader: consumentenkrediet in België",
      blocks: [
        {
          kind: "ul",
          items: [
            "Een persoonlijke lening is een consumentenkrediet onder Boek VII van het Wetboek van economisch recht. De kredietgever moet u vooraf een gestandaardiseerd informatieblad (SECCI) geven met het JKP, de totale kost en alle voorwaarden.",
            "De FOD Economie legt per kredietbedrag een maximaal JKP vast. Die wettelijke maxima worden halfjaarlijks herzien op basis van referte-indexen; een kredietgever mag er nooit boven gaan.",
            "U hebt een herroepingsrecht van 14 kalenderdagen na ondertekening, zonder motivering en zonder kosten, behalve de interest voor de dagen dat u het geld had.",
            "Vervroegd terugbetalen is altijd mogelijk. De vergoeding is wettelijk beperkt tot 1% van het terugbetaalde kapitaal als de resterende looptijd langer is dan een jaar, en 0,5% als ze korter is.",
            "Vóór hij een krediet toekent, moet de kredietgever de Centrale voor kredieten aan particulieren van de Nationale Bank raadplegen. Elke lening wordt daar geregistreerd; een betalingsachterstand van drie maanden leidt tot een negatieve registratie die uw latere kredietaanvragen bemoeilijkt.",
            "De interest op een persoonlijke lening is fiscaal niet aftrekbaar; alleen voor bepaalde kredieten met onroerende bestemming bestaan gewestelijke voordelen.",
          ],
        },
        {
          kind: "p",
          text: "Bronnen: FOD Economie (consumentenkrediet, maximale JKP's en herroepingsrecht), Nationale Bank van België (Centrale voor kredieten aan particulieren) en Wikifin van de FSMA (lenen op afbetaling).",
        },
      ],
    },
    {
      heading: "Persoonlijke lening, doorlopend krediet of kredietkaart?",
      blocks: [
        {
          kind: "p",
          text: "Voor een eenmalige, geplande uitgave zoals een renovatie, een huwelijk of het samenvoegen van kleinere schulden is een lening op afbetaling meestal de goedkoopste vorm van consumentenkrediet: vaste rente, vaste einddatum, geen verleiding om bij te lenen. Een doorlopend krediet of kredietopening (ook via een kredietkaart) heeft een variabele rente die doorgaans hoger ligt en geen vaste einddatum, waardoor de totale kost snel oploopt als u enkel het minimum terugbetaalt.",
        },
      ],
    },
    {
      heading: "Veelgemaakte fouten bij een persoonlijke lening",
      blocks: [
        {
          kind: "ul",
          items: [
            "De debetrentevoet vergelijken in plaats van het JKP, waardoor dossierkosten buiten beeld blijven.",
            "De looptijd verlengen om de maandlast te drukken en zo honderden euro's extra interest betalen.",
            "Een lening nemen voor een bedrag dat u binnen enkele maanden toch zou kunnen sparen.",
            "Het herroepingsrecht van 14 dagen niet kennen en een overhaaste ondertekening niet terugdraaien.",
            "Meerdere kredietaanvragen tegelijk indienen zonder te weten dat elke toekenning in de Centrale voor kredieten aan particulieren verschijnt.",
            "Een promotioneel tarief dat alleen geldt voor een specifieke bestemming (bijvoorbeeld energiezuinige renovatie) verwarren met het standaardtarief.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Wat is het verschil tussen JKP en rentevoet bij een persoonlijke lening?",
      answer:
        "De rentevoet (debetrentevoet) is enkel de interest op het geleende kapitaal. Het jaarlijks kostenpercentage (JKP) telt daar alle verplichte kosten bij, zoals dossierkosten, en drukt de totale kost uit als één jaarlijks percentage. Kredietgevers zijn verplicht het JKP te vermelden; vergelijk leningen dus altijd op JKP.",
    },
    {
      question: "Hoeveel kost een persoonlijke lening van 10.000 euro?",
      answer:
        "Aan een JKP van 6,5% betaalt u op 48 maanden €237,15 per maand en €1.383,18 interest in totaal. Op 60 maanden is dat €195,66 per maand en €1.739,69 interest. Het JKP in uw offerte kan hoger of lager liggen; vul het in de calculator in voor uw exacte maandlast en totale kost.",
    },
    {
      question: "Hoeveel mag ik maximaal lenen met een persoonlijke lening?",
      answer:
        "De wet legt geen maximumbedrag op; de kredietgever bepaalt het op basis van uw inkomen, uw vaste lasten en uw bestaande kredieten in de Centrale voor kredieten aan particulieren. De meeste banken gaan voor een lening op afbetaling zonder bestemming tot enkele tienduizenden euro's, met looptijden tot ongeveer 84 maanden. Uw totale kredietlasten blijven best onder een derde van uw netto-inkomen.",
    },
    {
      question: "Kan ik mijn persoonlijke lening vervroegd terugbetalen?",
      answer:
        "Ja, altijd, geheel of gedeeltelijk. De kredietgever mag een vergoeding vragen van maximaal 1% van het vervroegd terugbetaalde kapitaal als de lening nog meer dan een jaar loopt, of 0,5% als de resterende looptijd korter is dan een jaar. Op €5.000 vervroegd terugbetalen is dat hoogstens €50.",
    },
    {
      question: "Wat is de maximale rente voor een lening op afbetaling in België?",
      answer:
        "De FOD Economie legt wettelijke maximale jaarlijkse kostenpercentages vast per schijf van het kredietbedrag. Ze worden halfjaarlijks aangepast aan de marktrente en gepubliceerd in het Belgisch Staatsblad. Geen enkele kredietgever mag boven dat maximum gaan; de actuele tabel vindt u op de website van de FOD Economie.",
    },
    {
      question: "Word ik geregistreerd bij de Nationale Bank als ik een lening afsluit?",
      answer:
        "Ja. Elk consumentenkrediet wordt geregistreerd in de Centrale voor kredieten aan particulieren van de Nationale Bank van België, ook als u correct terugbetaalt. Dat is een positieve registratie. Pas bij een achterstand van drie maandelijkse aflossingen volgt een negatieve registratie, die blijft staan tot een jaar na regularisatie. U kunt uw eigen gegevens gratis raadplegen bij de Nationale Bank.",
    },
  ],
};
