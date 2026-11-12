import type { CalculatorEducationalContent } from "./types";

// Rekenvoorbeeld: resterend kapitaal €180.000, 15 jaar resterend. Oud 4%:
// €1.331,44/maand; nieuw 3%: €1.243,05/maand; verschil €88,39 × 180 = €15.910,44.
// Wederbeleggingsvergoeding = max. 3 maanden interest = €1.800. De rentevoeten
// zijn illustratief; de notariskosten van €2.500 zijn een voorbeeldbedrag.

export const leningHerfinancierenContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat berekent de herfinancieringscalculator?",
      blocks: [
        {
          kind: "p",
          text: "Een lening herfinancieren betekent uw bestaande krediet vervroegd terugbetalen met een nieuw krediet aan een lagere rentevoet, bij dezelfde of bij een andere bank. Deze calculator berekent of dat loont: u vult het resterende kapitaal, de resterende looptijd, uw huidige rentevoet en de voorgestelde nieuwe rentevoet in, plus de kosten. De tool toont de nieuwe maandlast, de totale besparing over de resterende looptijd en het moment waarop u de kosten hebt terugverdiend.",
        },
        {
          kind: "p",
          text: "Herfinancieren is in België vooral interessant voor hypothecaire kredieten, omdat de wet de kost van vervroegde terugbetaling plafonneert. Voor een persoonlijke lening of autolening is de vergoeding nog lager, maar het rentevoordeel meestal kleiner.",
        },
      ],
    },
    {
      heading: "De formule: besparing min kosten",
      blocks: [
        {
          kind: "formula",
          text: "Nettobesparing = (oude maandlast − nieuwe maandlast) × resterende maanden − wederbeleggingsvergoeding − dossierkosten − notaris- en hypotheekkosten",
        },
        {
          kind: "p",
          text: "De oude en de nieuwe maandlast berekent u met de annuïteitenformule op hetzelfde resterende kapitaal en dezelfde resterende looptijd. Verlengt u de looptijd, dan daalt de maandlast extra, maar betaalt u in totaal vaak meer interest; vergelijk daarom altijd ook de som van alle toekomstige betalingen, niet alleen de maandlast.",
        },
      ],
    },
    {
      heading: "Rekenvoorbeeld: €180.000 herfinancieren van 4% naar 3%",
      blocks: [
        {
          kind: "p",
          text: "Uw woonkrediet heeft nog €180.000 openstaand kapitaal en 15 jaar te lopen aan 4% vast. De maandlast is €1.331,44. Een andere bank biedt 3% vast op dezelfde 15 jaar: de maandlast wordt €1.243,05. U bespaart €88,39 per maand, ofwel €15.910,44 over de resterende 180 maanden.",
        },
        {
          kind: "p",
          text: "Daar staan kosten tegenover. De wederbeleggingsvergoeding is wettelijk beperkt tot drie maanden interest op het terugbetaalde kapitaal: €180.000 × 4% ÷ 4 = €1.800. Omdat u van bank verandert, komt daar een nieuwe kredietakte bij met notariskosten, 1% registratierecht en 0,3% hypotheekrecht op de nieuwe inschrijving en de handlichting van de oude; stel in dit voorbeeld €2.500. De nettobesparing is dan €15.910 − €1.800 − €2.500 = ongeveer €11.600. De kosten zijn na ongeveer 49 maanden terugverdiend.",
        },
      ],
    },
    {
      heading: "Wettelijk kader voor herfinanciering in België",
      blocks: [
        {
          kind: "ul",
          items: [
            "Bij een hypothecair krediet met onroerende bestemming mag de wederbeleggingsvergoeding maximaal drie maanden interest bedragen op het vervroegd terugbetaalde kapitaal (Boek VII Wetboek van economisch recht). U hebt altijd het recht om vervroegd terug te betalen.",
            "Bij een consumentenkrediet (persoonlijke lening, autolening) is de vergoeding beperkt tot 1% van het terugbetaalde kapitaal als de resterende looptijd meer dan een jaar is, en 0,5% als ze korter is.",
            "Interne herfinanciering bij uw eigen bank vraagt geen nieuwe notariële akte: de bank past de rentevoet aan in een onderhandse bijakte en rekent dossierkosten en de wederbeleggingsvergoeding aan.",
            "Externe herfinanciering bij een andere bank vraagt wel een nieuwe hypothecaire inschrijving: notariskosten voor de kredietakte, 1% registratierecht en 0,3% hypotheekrecht op het ingeschreven bedrag, plus de kosten van de handlichting van de oude hypotheek.",
            "De nieuwe bank vraagt meestal een nieuwe schuldsaldoverzekering of de overdracht van uw bestaande polis, en kan een nieuwe schatting van de woning laten uitvoeren.",
          ],
        },
        {
          kind: "p",
          text: "Bronnen: FOD Economie (Boek VII WER, vervroegde terugbetaling en wederbeleggingsvergoeding), notaris.be (kosten van kredietakte en handlichting) en Wikifin van de FSMA (herfinancieren van een woonkrediet).",
        },
      ],
    },
    {
      heading: "Wanneer loont herfinancieren?",
      blocks: [
        {
          kind: "ul",
          items: [
            "Het renteverschil is minstens 1 procentpunt bij een externe herfinanciering, of ongeveer 0,5 procentpunt bij een interne herfinanciering zonder notariskosten.",
            "Er blijven nog minstens 10 jaar en een voldoende groot kapitaal over: de besparing zit in de interest op het resterende saldo, en die is het grootst in de eerste helft van de looptijd.",
            "De terugverdientijd van de kosten is korter dan de periode dat u zeker in de woning blijft.",
            "U wilt tegelijk uw looptijd aanpassen of meerdere kredieten samenvoegen; reken dan de totale toekomstige kost van beide scenario's.",
          ],
        },
      ],
    },
    {
      heading: "Veelgemaakte fouten bij herfinancieren",
      blocks: [
        {
          kind: "ul",
          items: [
            "Alleen naar de lagere maandlast kijken terwijl de looptijd verlengd wordt: de totale interest kan dan stijgen.",
            "De notaris- en hypotheekkosten van een externe herfinanciering vergeten, waardoor een klein renteverschil toch verlies oplevert.",
            "Niet eerst een tegenvoorstel vragen aan de eigen bank, die vaak intern kan herzien zonder akte.",
            "De oude schuldsaldoverzekering opzeggen vóór de nieuwe is aanvaard.",
            "Herfinancieren in de laatste jaren van de lening, wanneer u vooral kapitaal en nog weinig interest afbetaalt.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Wanneer is het herfinancieren van mijn hypotheek interessant?",
      answer:
        "Als de nettobesparing positief is: het renteverschil maal het resterende kapitaal en de resterende looptijd moet groter zijn dan de wederbeleggingsvergoeding plus de dossier-, notaris- en hypotheekkosten. Als vuistregel: minstens 1 procentpunt verschil en nog minstens 10 jaar te lopen bij een andere bank, of ongeveer 0,5 procentpunt bij uw eigen bank. De calculator rekent het exact uit.",
    },
    {
      question: "Hoeveel bedraagt de wederbeleggingsvergoeding bij een hypothecaire lening?",
      answer:
        "Maximaal drie maanden interest op het kapitaal dat u vervroegd terugbetaalt, berekend aan de rentevoet van uw lopende krediet. Op €180.000 aan 4% is dat €180.000 × 4% ÷ 4 = €1.800. Dit plafond staat in Boek VII van het Wetboek van economisch recht en geldt voor elk hypothecair krediet met onroerende bestemming.",
    },
    {
      question: "Wat kost een herfinanciering bij een andere bank?",
      answer:
        "Naast de wederbeleggingsvergoeding betaalt u een nieuwe kredietakte bij de notaris, 1% registratierecht en 0,3% hypotheekrecht op het nieuw ingeschreven bedrag, de handlichting van de oude hypotheek en dossierkosten bij de nieuwe bank. Vraag een gedetailleerde kostenraming aan de notaris vóór u beslist; de tool laat u dat bedrag invullen.",
    },
    {
      question: "Kan ik mijn lening herfinancieren bij mijn eigen bank?",
      answer:
        "Ja. Bij een interne herfinanciering past uw bank de rentevoet aan via een onderhandse bijakte, zonder nieuwe notariële akte of hypothecaire inschrijving. U betaalt dan alleen de wederbeleggingsvergoeding (maximaal drie maanden interest) en dossierkosten. Vraag altijd eerst dit voorstel; het is de goedkoopste route als het renteverschil beperkt is.",
    },
    {
      question: "Hoeveel bespaar ik met herfinancieren?",
      answer:
        "In het voorbeeld van €180.000 met 15 jaar resterend daalt de maandlast van €1.331,44 (4%) naar €1.243,05 (3%): €88,39 per maand of €15.910 over de looptijd. Na aftrek van €1.800 wederbeleggingsvergoeding en €2.500 notaris- en hypotheekkosten blijft ongeveer €11.600 netto over. Uw eigen besparing hangt af van kapitaal, looptijd en renteverschil.",
    },
    {
      question: "Kan ik ook een persoonlijke lening of autolening herfinancieren?",
      answer:
        "Ja. Bij een consumentenkrediet mag de kredietgever maximaal 1% van het vervroegd terugbetaalde kapitaal aanrekenen als de resterende looptijd langer is dan een jaar, en 0,5% als ze korter is. Omdat deze leningen korter lopen en het kapitaal kleiner is, is de besparing meestal beperkt; vergelijk het JKP van het nieuwe krediet met uw huidige rentevoet.",
    },
  ],
};
