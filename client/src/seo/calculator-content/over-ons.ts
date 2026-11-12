import type { CalculatorEducationalContent } from "./types";

// Inhoud van /over-ons en /contact die ook server-side in de HTML wordt
// gezet (E-E-A-T: wie, waarom, methodologie, bronnen, updatebeleid,
// disclaimer en contact). Houd dit in lijn met client/src/pages/over-ons.tsx.
export const overOnsContent: CalculatorEducationalContent = {
  sections: [
    {
      heading: "Wat is Interesten.be?",
      blocks: [
        {
          kind: "p",
          text: "Interesten.be is een onafhankelijke Belgische site met gratis rekentools rond interesten: wettelijke interest en nalatigheidsinterest op onbetaalde facturen, spaarrente en roerende voorheffing, samengestelde interest, leningen en financiële planning. Alle tools zijn afgestemd op de Belgische wetgeving en fiscaliteit, werken zonder registratie en bewaren geen persoonlijke gegevens.",
        },
      ],
    },
    {
      heading: "Wie zit erachter?",
      blocks: [
        {
          kind: "p",
          text: "Interesten.be wordt gebouwd en onderhouden door Bart Deblock, ondernemer uit Vlaanderen, webbouwer via Hazier.be en medeoprichter van CollectPro.be, een dienst voor factuuropvolging en minnelijke invordering voor kmo's. Die combinatie van webtechnologie en dagelijkse praktijk met onbetaalde facturen is de basis van de tools op deze site. Voor de volledigheid: Interesten.be en CollectPro.be hebben dezelfde eigenaar. Waar we naar CollectPro verwijzen, zeggen we dat uitdrukkelijk; de rekentools en de uitleg zelf blijven neutraal.",
        },
      ],
    },
    {
      heading: "Methodologie en bronnen",
      blocks: [
        {
          kind: "p",
          text: "Elke calculator vertrekt van de officiële cijfers en de wettelijke rekenregels, niet van schattingen. De belangrijkste bronnen die we gebruiken:",
        },
        {
          kind: "ul",
          items: [
            "Wettelijke interestvoet, interestvoet voor handelstransacties en fiscale interestvoeten: berichten van de FOD Financiën (Algemene Administratie van de Thesaurie) in het Belgisch Staatsblad.",
            "Regels voor onbetaalde facturen: wet van 2 augustus 2002 betreffende de bestrijding van de betalingsachterstand bij handelstransacties en Boek XIX van het Wetboek van Economisch Recht (FOD Economie).",
            "Roerende voorheffing en vrijstelling op spaarrente: Wetboek van de Inkomstenbelastingen 1992 en de jaarlijkse geïndexeerde bedragen van de FOD Financiën.",
            "Spaar- en kredietrentes: tarievenbladen van de banken zelf, aangevuld met Wikifin (FSMA) en de Nationale Bank van België voor referentierentes (Euribor, ECB).",
          ],
        },
        {
          kind: "p",
          text: "Rentevoeten die bij wet veranderen (januari en juli) werken we bij zodra ze in het Staatsblad verschijnen. Spaartarieven controleren we periodiek. Elke pagina vermeldt het jaar of semester waarop de cijfers betrekking hebben, zodat u altijd weet met welke versie u rekent. Ziet u een fout of een verouderd cijfer? Meld het via info@interesten.be, dan passen we het aan.",
        },
      ],
    },
    {
      heading: "Disclaimer",
      blocks: [
        {
          kind: "p",
          text: "De informatie en de berekeningen op Interesten.be zijn algemeen en informatief. Ze vormen geen financieel, fiscaal, juridisch of beleggingsadvies en vervangen geen advies op maat van een bank, boekhouder, advocaat of gerechtsdeurwaarder. Resultaten hangen af van de gegevens die u invoert; controleer ze vóór u beslissingen neemt of bedragen aanrekent aan derden. Interesten.be is niet aansprakelijk voor schade die voortvloeit uit het gebruik van de tools of de inhoud.",
        },
      ],
    },
    {
      heading: "Contact",
      blocks: [
        {
          kind: "p",
          text: "Vragen, suggesties, een fout gespot of een voorstel tot samenwerking? Mail naar info@interesten.be. We antwoorden normaal binnen twee werkdagen. Interesten.be is een uitgave van Bart Deblock (Hazier.be), België.",
        },
      ],
    },
  ],
  faqs: [],
};
