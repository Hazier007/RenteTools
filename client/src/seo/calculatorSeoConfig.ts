export type SiloCategory = "Sparen" | "Lenen" | "Beleggen" | "Planning" | "Overige";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AuthorityLink {
  title: string;
  url: string;
  description: string;
}

export interface CalculatorSeoConfig {
  slug: string;
  category: SiloCategory | "Overige";
  pageTitle: string;
  breadcrumbTitle: string;
  metaTitle: string;
  metaDescription: string;
  faqs: FaqItem[];
  authorityLinks: AuthorityLink[];
  previewImage?: string;
}

const defaultAuthorityLinks = {
  nbb: {
    title: "Nationale Bank van België (NBB)",
    url: "https://www.nbb.be",
    description: "Officiële rentevoeten en financiële statistieken"
  },
  fsma: {
    title: "FSMA - Financiële Diensten en Markten",
    url: "https://www.fsma.be",
    description: "Consumentenbescherming en toezicht financiële producten"
  },
  fodFinancien: {
    title: "FOD Financiën",
    url: "https://financien.belgium.be",
    description: "Belastinginformatie en fiscale regelgeving"
  },
  testAankoop: {
    title: "Test-Aankoop Vergelijker",
    url: "https://www.test-aankoop.be/invest",
    description: "Onafhankelijke vergelijkingen financiële producten"
  }
};

const defaultFaqsBySilo: Record<SiloCategory, FaqItem[]> = {
  Overige: [],
  Sparen: [
    {
      question: "Hoeveel interest krijg ik op een spaarrekening?",
      answer: "De gemiddelde spaarrente in België ligt rond 1,5-2,5%. Dit bestaat uit een basisrente en getrouwheidspremie. De getrouwheidspremie krijgt u na 12 maanden trouw blijven bij dezelfde bank."
    },
    {
      question: "Tot welk bedrag is spaarrente belastingvrij?",
      answer: "In 2025 is spaarrente belastingvrij tot 980 euro per jaar. Boven dit bedrag betaalt u 30% roerende voorheffing over het meerdere."
    },
    {
      question: "Wat is de hoogste spaarrente in België?",
      answer: "De hoogste gecombineerde rentes liggen momenteel tussen 2% en 2,5% voor nieuwe klanten. Let wel op voorwaarden zoals maximumbedragen en looptijden."
    },
    {
      question: "Hoe wordt samengestelde interest berekend?",
      answer: "Bij samengestelde interest wordt de interest van vorige periodes mee opgenomen in de berekening. Hierdoor groeit uw spaargeld exponentieel in plaats van lineair."
    }
  ],
  Lenen: [
    {
      question: "Hoeveel kan ik maximaal lenen?",
      answer: "In België kunt u maximaal lenen tot 90% van de waarde van de woning (LTV). Uw maandlast mag niet hoger zijn dan 33% van uw netto inkomen."
    },
    {
      question: "Wat is de laagste leningrente in België?",
      answer: "De laagste hypotheekrente begint rond 2,5% voor korte looptijden. Voor vaste rentes van 20-25 jaar liggen de tarieven tussen 2,8% en 3,5%."
    },
    {
      question: "Kan ik mijn lening herfinancieren?",
      answer: "Ja, herfinancieren kan voordeliger zijn als de rentes zijn gedaald. Let wel op vervroegde terugbetalingskosten bij uw huidige bank, meestal 3-6 maanden interest."
    },
    {
      question: "Wat zijn de kosten van een lening?",
      answer: "Naast de interest betaalt u ook notariskosten, registratierechten, brandverzekering en eventueel schuldsaldoverzekering. Totaal ongeveer 10-15% van de leensom."
    }
  ],
  Beleggen: [
    {
      question: "Hoeveel belasting betaal ik op beleggingswinst?",
      answer: "In België betaalt u 30% roerende voorheffing op dividenden en interesten. Meerwaarden op aandelen zijn belastingvrij, tenzij u speculatief belegt (binnen 6 maanden)."
    },
    {
      question: "Wat is een veilig rendement bij beleggen?",
      answer: "Historisch gezien leveren gediversifieerde aandelenportefeuilles gemiddeld 7-9% per jaar op. Obligaties geven 2-4%. Houd rekening met inflatie en kosten."
    },
    {
      question: "Hoe vaak moet ik herbalanceren?",
      answer: "Experts adviseren jaarlijks uw portefeuille te herbalanceren naar uw doelallocatie. Bij grote marktschommelingen (>10%) kan tussentijds herbalanceren zinvol zijn."
    },
    {
      question: "Zijn ETF's beter dan individuele aandelen?",
      answer: "ETF's bieden directe diversificatie tegen lage kosten. Voor beginners zijn breed gespreide ETF's vaak veiliger dan individuele aandelen."
    }
  ],
  Planning: [
    {
      question: "Hoeveel moet ik sparen voor mijn pensioen?",
      answer: "Financiële adviseurs raden aan om 15-20% van uw bruto-inkomen te sparen voor pensioen. Via pensioensparen krijgt u tot 30% belastingvoordeel."
    },
    {
      question: "Wat is de 4%-regel voor pensioen?",
      answer: "De 4%-regel stelt dat u jaarlijks 4% van uw pensioenspaarpot kunt opnemen zonder deze uit te putten. Voor €500.000 is dat €20.000 per jaar."
    },
    {
      question: "Wanneer kan ik met pensioen?",
      answer: "De wettelijke pensioenleeftijd in België is 65-67 jaar (stijgt geleidelijk). Vervroegd pensioen is mogelijk vanaf 60 jaar met voldoende loopbaanjaren."
    },
    {
      question: "Hoeveel noodfonds moet ik hebben?",
      answer: "Experts adviseren 3-6 maanden vaste kosten als noodfonds. Voor een gezin met €3.000/maand kosten betekent dit €9.000-€18.000."
    }
  ]
};

export const calculatorSeoConfigs: Record<string, CalculatorSeoConfig> = {
  "home": {
    slug: "home",
    category: "Overige",
    pageTitle: "Interesten.be - 57+ Gratis Financiële Calculators België",
    breadcrumbTitle: "Home",
    metaTitle: "Interesten.be - 57+ Gratis Financiële Calculators België",
    metaDescription: "Bereken spaarrente, leningen, hypotheken en beleggingen met 57+ gratis tools. Actuele Belgische rentes en fiscaliteit. 100% gratis, geen verborgen kosten.",
    faqs: [],
    authorityLinks: []
  },
  "hoogste-spaarrente-belgie": {
    slug: "hoogste-spaarrente-belgie",
    category: "Sparen",
    pageTitle: "Hoogste Spaarrente België",
    breadcrumbTitle: "Hoogste Spaarrente",
    metaTitle: "Hoogste Spaarrente België 2025 - Vergelijk Spaarrekeningen",
    metaDescription: "Vind de hoogste spaarrente in België. Vergelijk basisrente + getrouwheidspremie van alle banken. Actuele tarieven tot 2,5% in 2025.",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "deposito-calculator": {
    slug: "deposito-calculator",
    category: "Sparen",
    pageTitle: "Deposito Calculator",
    breadcrumbTitle: "Deposito Calculator",
    metaTitle: "Deposito Calculator België - Termijnrekening Rente Berekenen",
    metaDescription: "Bereken uw deposito opbrengst in België. Vergelijk termijnrekening tarieven van 1,5% tot 3,5%. Inclusief roerende voorheffing berekening.",
    faqs: [
      {
        question: "Wat is een termijnrekening of deposito?",
        answer: "Een deposito is een spaarproduct waarbij u een bedrag vastzet voor een bepaalde periode (1-12 maanden). In ruil krijgt u een vaste, vaak hogere rente dan op een gewone spaarrekening."
      },
      {
        question: "Hoeveel rente geeft een deposito?",
        answer: "Depositotarieven variëren van 1,5% tot 3,5%, afhankelijk van het bedrag en de looptijd. Langere looptijden geven meestal hogere rentes."
      },
      {
        question: "Kan ik tussentijds aan mijn geld?",
        answer: "Nee, bij een deposito zit uw geld vast voor de gekozen periode. Vroegtijdig opnemen betekent vaak boetes en verlies van interest."
      },
      {
        question: "Is een deposito belastbaar?",
        answer: "Ja, u betaalt 30% roerende voorheffing op de interest. De vrijstelling van €980 per jaar geldt alleen voor gewone spaarrekeningen."
      }
    ],
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "samengestelde-interest-berekenen": {
    slug: "samengestelde-interest-berekenen",
    category: "Sparen",
    pageTitle: "Samengestelde Interest Berekenen",
    breadcrumbTitle: "Samengestelde Interest",
    metaTitle: "Samengestelde Interest Berekenen - Compound Interest België",
    metaDescription: "Bereken samengestelde interest op uw spaargeld. Zie hoe uw vermogen exponentieel groeit met compound interest. Gratis calculator voor België.",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "doelspaarcalculator": {
    slug: "doelspaarcalculator",
    category: "Sparen",
    pageTitle: "Doelspaar Calculator",
    breadcrumbTitle: "Doelspaar Calculator",
    metaTitle: "Doelspaarcalculator België - Meerdere Spaardoelen Beheren",
    metaDescription: "Plan al uw spaardoelen tegelijk. Bereken hoeveel u maandelijks moet sparen voor auto, vakantie, noodfonds en meer. Smart goal planning.",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.testAankoop]
  },
  "spaarrekening-vergelijker": {
    slug: "spaarrekening-vergelijker",
    category: "Sparen",
    pageTitle: "Spaarrekening Vergelijker",
    breadcrumbTitle: "Spaarrekening Vergelijker",
    metaTitle: "Spaarrekening Vergelijker België 2025 - Beste Rentes",
    metaDescription: "Vergelijk alle Belgische spaarrekeningen. Basisrente, getrouwheidspremie en voorwaarden van alle banken. Vind de beste spaarrente 2025.",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "kinderrekening-calculator": {
    slug: "kinderrekening-calculator",
    category: "Sparen",
    pageTitle: "Kinderrekening Calculator",
    breadcrumbTitle: "Kinderrekening",
    metaTitle: "Kinderrekening Calculator België - Sparen voor Kinderen",
    metaDescription: "Bereken hoeveel u moet sparen voor uw kinderen. Kinderrekening rentes tot 2,5% in België. Start vandaag met sparen voor hun toekomst.",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.testAankoop]
  },
  "kasbon-calculator": {
    slug: "kasbon-calculator",
    category: "Sparen",
    pageTitle: "Kasbon Calculator",
    breadcrumbTitle: "Kasbon Calculator",
    metaTitle: "Kasbon Calculator België - Staatsbons & Kasbons Vergelijken",
    metaDescription: "Bereken rendement van kasbons en staatsbons in België. Vergelijk looptijden van 1-10 jaar. Vaste rente en belastingvoordelen berekenen.",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma]
  },
  "termijnrekening-calculator": {
    slug: "termijnrekening-calculator",
    category: "Sparen",
    pageTitle: "Termijnrekening Calculator",
    breadcrumbTitle: "Termijnrekening",
    metaTitle: "Termijnrekening Calculator België - Vaste Rente Berekenen",
    metaDescription: "Bereken uw termijnrekening opbrengst. Vaste rente tot 3,5% op termijndeposito's in België. Vergelijk looptijden van 1-12 maanden.",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.testAankoop]
  },
  "groepssparen-calculator": {
    slug: "groepssparen-calculator",
    category: "Sparen",
    pageTitle: "Groepssparen Calculator",
    breadcrumbTitle: "Groepssparen",
    metaTitle: "Groepssparen Calculator België - Aanvullend Pensioen Berekenen",
    metaDescription: "Bereken uw groepsverzekering opbrengst. Werkgeversbijdrage + belastingvoordeel tot 30%. Optimaliseer uw aanvullend pensioen in België.",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.fodFinancien, defaultAuthorityLinks.fsma]
  },
  "loyalty-bonus-calculator": {
    slug: "loyalty-bonus-calculator",
    category: "Sparen",
    pageTitle: "Getrouwheidspremie Calculator",
    breadcrumbTitle: "Getrouwheidspremie",
    metaTitle: "Getrouwheidspremie Calculator - Loyalty Bonus Optimaliseren",
    metaDescription: "Maximaliseer uw getrouwheidspremie op spaarrekeningen. Bereken wanneer u uw loyalty bonus krijgt. Optimaliseer uw spaarstrategie België.",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma]
  },
  "vakantiegeld-sparen-calculator": {
    slug: "vakantiegeld-sparen-calculator",
    category: "Sparen",
    pageTitle: "Vakantiegeld Sparen Calculator",
    breadcrumbTitle: "Vakantiegeld Sparen",
    metaTitle: "Vakantiegeld Sparen Calculator België - Droomvakantie Plannen",
    metaDescription: "Spaar slim voor uw vakantie. Bereken hoeveel u maandelijks moet sparen voor uw droomreis. Vakantiebudget planner voor België.",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.testAankoop]
  },
  "hypothecaire-lening-berekenen": {
    slug: "hypothecaire-lening-berekenen",
    category: "Lenen",
    pageTitle: "Hypothecaire Lening Berekenen",
    breadcrumbTitle: "Hypothecaire Lening",
    metaTitle: "Hypothecaire Lening Berekenen België - Maandlast Calculator",
    metaDescription: "Bereken uw hypotheek maandlast en totale kosten. Vaste en variabele rente vanaf 2,5%. Inclusief notaris en registratierechten.",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "woningkrediet-simulator": {
    slug: "woningkrediet-simulator",
    category: "Lenen",
    pageTitle: "Woningkrediet Simulator",
    breadcrumbTitle: "Woningkrediet Simulator",
    metaTitle: "Woningkrediet Simulator België - Hoeveel Kan Ik Lenen 2025",
    metaDescription: "Simuleer uw woningkrediet in België. Bereken leencapaciteit, maandlast en vergelijk vaste vs variabele rente. Tot 90% LTV mogelijk.",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "persoonlijke-lening-berekenen": {
    slug: "persoonlijke-lening-berekenen",
    category: "Lenen",
    pageTitle: "Persoonlijke Lening Berekenen",
    breadcrumbTitle: "Persoonlijke Lening",
    metaTitle: "Persoonlijke Lening Berekenen België - Consumentenkrediet",
    metaDescription: "Bereken uw persoonlijke lening kosten. Tarieven van 3-8% op consumptieleningen in België. Vergelijk maandlasten en totale kosten.",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "autolening-berekenen": {
    slug: "autolening-berekenen",
    category: "Lenen",
    pageTitle: "Autolening Berekenen",
    breadcrumbTitle: "Autolening",
    metaTitle: "Autolening Berekenen België - Autokredieten Vergelijken",
    metaDescription: "Bereken uw autolening met rentes vanaf 2,9%. Vergelijk autokredieten en financieringsopties in België. Bereken maandlast en TAEG.",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "lening-herfinancieren": {
    slug: "lening-herfinancieren",
    category: "Lenen",
    pageTitle: "Lening Herfinancieren",
    breadcrumbTitle: "Lening Herfinancieren",
    metaTitle: "Lening Herfinancieren België - Hypotheek Oversluiten 2025",
    metaDescription: "Bereken of herfinancieren voordelig is. Vergelijk nieuwe rente met vervroegde terugbetalingskosten. Bespaar tot €10.000+ in België.",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "schuldenconsolidatie-calculator": {
    slug: "schuldenconsolidatie-calculator",
    category: "Lenen",
    pageTitle: "Schuldenconsolidatie Calculator",
    breadcrumbTitle: "Schuldenconsolidatie",
    metaTitle: "Schuldenconsolidatie Calculator België - Leningen Samenvoegen",
    metaDescription: "Voeg al uw leningen samen tot één lening. Bereken besparing en lagere maandlast. Schuldhulp en consolidatie oplossingen voor België.",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "kredietcapaciteit-calculator": {
    slug: "kredietcapaciteit-calculator",
    category: "Lenen",
    pageTitle: "Kredietcapaciteit Calculator",
    breadcrumbTitle: "Kredietcapaciteit",
    metaTitle: "Kredietcapaciteit Calculator België - Hoeveel Kan Ik Lenen",
    metaDescription: "Bereken hoeveel u kunt lenen op basis van uw inkomen. 33%-regel voor maandlasten. Ontdek uw maximale leenbedrag in België.",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma]
  },
  "kredietvergelijker-belgie": {
    slug: "kredietvergelijker-belgie",
    category: "Lenen",
    pageTitle: "Kredietvergelijker België",
    breadcrumbTitle: "Kredietvergelijker",
    metaTitle: "Kredietvergelijker België 2025 - Beste Leningrentes",
    metaDescription: "Vergelijk alle kredieten in België. Persoonlijke leningen, autokredieten en hypotheken. Vind de laagste rente en beste voorwaarden.",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "doorlopend-krediet-calculator": {
    slug: "doorlopend-krediet-calculator",
    category: "Lenen",
    pageTitle: "Doorlopend Krediet Calculator",
    breadcrumbTitle: "Doorlopend Krediet",
    metaTitle: "Doorlopend Krediet Calculator België - Revolving Credit",
    metaDescription: "Bereken kosten van doorlopend krediet. Rentes van 7-12% op kredietlijnen in België. Vergelijk met persoonlijke leningen.",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "kredietkaart-calculator": {
    slug: "kredietkaart-calculator",
    category: "Lenen",
    pageTitle: "Kredietkaart Calculator",
    breadcrumbTitle: "Kredietkaart Kosten",
    metaTitle: "Kredietkaart Calculator België - Rente & Kosten Berekenen",
    metaDescription: "Bereken kredietkaart kosten en rente in België. Vergelijk jaarlijkse kosten, transactiekosten en rentes tot 18%. Bespaar op creditcards.",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "leasingkrediet-calculator": {
    slug: "leasingkrediet-calculator",
    category: "Lenen",
    pageTitle: "Leasingkrediet Calculator",
    breadcrumbTitle: "Leasingkrediet",
    metaTitle: "Leasingkrediet Calculator België - Financial vs Operational",
    metaDescription: "Vergelijk financial en operational leasing in België. Bereken maandlast, restwaarde en totale kosten. Autoleasing calculator voor bedrijven.",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "voorschot-calculator": {
    slug: "voorschot-calculator",
    category: "Lenen",
    pageTitle: "Voorschot Calculator",
    breadcrumbTitle: "Voorschot Berekenen",
    metaTitle: "Voorschot Calculator België - Cash Advance & Bridge Loans",
    metaDescription: "Bereken voorschot kosten en overbruggingskrediet. Korte termijn financiering in België. Cash advance rentes en voorwaarden vergelijken.",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.nbb]
  },
  "studieschuld-calculator": {
    slug: "studieschuld-calculator",
    category: "Lenen",
    pageTitle: "Studieschuld Calculator",
    breadcrumbTitle: "Studieschuld",
    metaTitle: "Studieschuld Calculator België - Studielening Terugbetalen",
    metaDescription: "Bereken uw studieschuld aflossing. Studieleningen rentes 2-4% in België. Ontdek aflossingsplan en totale kosten van studeren.",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "groepslening-calculator": {
    slug: "groepslening-calculator",
    category: "Lenen",
    pageTitle: "Groepslening Calculator",
    breadcrumbTitle: "Groepslening",
    metaTitle: "Groepslening Calculator België - Samen Lenen met Familie",
    metaDescription: "Bereken groepslening met vrienden of familie. Verdeel kosten eerlijk, beheer risicos en simuleer verschillende scenario's voor gezamenlijk lenen.",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "wettelijke-rentevoet-belgie": {
    slug: "wettelijke-rentevoet-belgie",
    category: "Lenen",
    pageTitle: "Wettelijke Rentevoet België",
    breadcrumbTitle: "Wettelijke Rentevoet",
    metaTitle: "Wettelijke Rentevoet België 2025 - Actuele Tarieven NBB",
    metaDescription: "Actuele wettelijke interest in België. Bereken vertragingsinterest op facturen en schulden. Officiële NBB tarieven 2025.",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fodFinancien]
  },
  "beleggingsrente-calculator": {
    slug: "beleggingsrente-calculator",
    category: "Beleggen",
    pageTitle: "Beleggingsrente Calculator",
    breadcrumbTitle: "Beleggingsrente",
    metaTitle: "Beleggingsrente Calculator België - Rendement Berekenen",
    metaDescription: "Bereken uw beleggingsrendement inclusief dividenden en kosten. Compound interest op aandelen en ETFs. Verwacht rendement 7-9% per jaar.",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.fodFinancien, defaultAuthorityLinks.testAankoop]
  },
  "aandelen-calculator": {
    slug: "aandelen-calculator",
    category: "Beleggen",
    pageTitle: "Aandelen Calculator",
    breadcrumbTitle: "Aandelen Calculator",
    metaTitle: "Aandelen Calculator België - Dividend Yield & Waardering",
    metaDescription: "Bereken dividend yield, P/E ratio en aandelenwaardering. Analyseer Belgische en internationale aandelen. Inclusief 30% roerende voorheffing.",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.fodFinancien]
  },
  "etf-calculator": {
    slug: "etf-calculator",
    category: "Beleggen",
    pageTitle: "ETF Calculator",
    breadcrumbTitle: "ETF Calculator",
    metaTitle: "ETF Calculator België - Index Fondsen Vergelijken 2025",
    metaDescription: "Vergelijk ETF kosten en rendement. IWDA, VWCE en andere populaire index trackers. Bereken TER impact en verwacht rendement voor België.",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.fodFinancien]
  },
  "obligatie-calculator": {
    slug: "obligatie-calculator",
    category: "Beleggen",
    pageTitle: "Obligatie Calculator",
    breadcrumbTitle: "Obligatie Calculator",
    metaTitle: "Obligatie Calculator België - Yield to Maturity & Duration",
    metaDescription: "Bereken obligatie rendement, duration en prijs. Staatsobligaties en bedrijfsobligaties vergelijken. YTM calculator voor België.",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma]
  },
  "cryptocurrency-calculator": {
    slug: "cryptocurrency-calculator",
    category: "Beleggen",
    pageTitle: "Cryptocurrency Calculator",
    breadcrumbTitle: "Cryptocurrency",
    metaTitle: "Cryptocurrency Calculator België - Crypto Portfolio Analyse",
    metaDescription: "Bereken crypto rendement en risico. Bitcoin, Ethereum en altcoins analyseren. Belgische belastingregels voor crypto (33% meerwaarde).",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.fodFinancien]
  },
  "dollar-cost-averaging-calculator": {
    slug: "dollar-cost-averaging-calculator",
    category: "Beleggen",
    pageTitle: "Dollar Cost Averaging Calculator",
    breadcrumbTitle: "Dollar Cost Averaging",
    metaTitle: "Dollar Cost Averaging Calculator België - Periodiek Beleggen",
    metaDescription: "Bereken voordelen van periodiek beleggen (DCA). Verminder risico door maandelijks te beleggen. Historische DCA resultaten voor België.",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "portfolio-diversificatie-calculator": {
    slug: "portfolio-diversificatie-calculator",
    category: "Beleggen",
    pageTitle: "Portfolio Diversificatie Calculator",
    breadcrumbTitle: "Portfolio Diversificatie",
    metaTitle: "Portfolio Diversificatie Calculator - Asset Allocatie België",
    metaDescription: "Optimaliseer uw portfolio allocatie. Bereken risico-rendement verhouding en ideale verdeling aandelen/obligaties. Modern portfolio theory.",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "reit-calculator": {
    slug: "reit-calculator",
    category: "Beleggen",
    pageTitle: "REIT Calculator",
    breadcrumbTitle: "REIT Calculator",
    metaTitle: "REIT Calculator België - Vastgoed Beleggingsfondsen",
    metaDescription: "Bereken rendement van REITs en vastgoedfondsen. Dividend yield, NAV en FFO analyse. Belgische fiscaliteit op vastgoedbeleggingen.",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.fodFinancien]
  },
  "belgische-beleggingsfiscaliteit-calculator": {
    slug: "belgische-beleggingsfiscaliteit-calculator",
    category: "Beleggen",
    pageTitle: "Belgische Beleggingsfiscaliteit",
    breadcrumbTitle: "Beleggingsfiscaliteit",
    metaTitle: "Belgische Beleggingsfiscaliteit Calculator - Roerende Voorheffing",
    metaDescription: "Bereken belasting op beleggingen in België. 30% roerende voorheffing op dividenden, TOB-taks op transacties. Optimaliseer uw fiscaliteit.",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fodFinancien, defaultAuthorityLinks.fsma]
  },
  "roerende-voorheffing-calculator": {
    slug: "roerende-voorheffing-calculator",
    category: "Beleggen",
    pageTitle: "Roerende Voorheffing Calculator",
    breadcrumbTitle: "Roerende Voorheffing",
    metaTitle: "Roerende Voorheffing Calculator België - 30% Belasting",
    metaDescription: "Bereken roerende voorheffing op dividenden en interest. 30% belasting op beleggingsinkomsten in België. Vrijstelling €980 spaarrente.",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fodFinancien, defaultAuthorityLinks.fsma]
  },
  "pensioensparen-calculator": {
    slug: "pensioensparen-calculator",
    category: "Planning",
    pageTitle: "Pensioensparen Calculator",
    breadcrumbTitle: "Pensioensparen",
    metaTitle: "Pensioensparen Calculator België - Belastingvoordeel 30%",
    metaDescription: "Bereken uw pensioensparen voordeel. Tot 30% belastingvermindering op €1.020 (Pijler 3). Optimaliseer uw aanvullend pensioen in België.",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.fodFinancien, defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "pensioen-calculator": {
    slug: "pensioen-calculator",
    category: "Planning",
    pageTitle: "Pensioen Calculator",
    breadcrumbTitle: "Pensioen Calculator",
    metaTitle: "Pensioen Calculator België - Bereken Uw Pensioenkapitaal",
    metaDescription: "Bereken hoeveel u nodig heeft voor pensioen. 4%-regel en wettelijk pensioen in België. Plan uw financiële vrijheid vanaf 60-67 jaar.",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.fodFinancien, defaultAuthorityLinks.fsma]
  },
  "fire-calculator": {
    slug: "fire-calculator",
    category: "Planning",
    pageTitle: "FIRE Calculator",
    breadcrumbTitle: "FIRE Calculator",
    metaTitle: "FIRE Calculator België - Financial Independence Retire Early",
    metaDescription: "Bereken wanneer u financieel onafhankelijk wordt. FIRE beweging in België: Lean, Regular, Fat & Coast FIRE. Vroeg met pensioen calculator.",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "noodfonds-calculator": {
    slug: "noodfonds-calculator",
    category: "Planning",
    pageTitle: "Noodfonds Calculator",
    breadcrumbTitle: "Noodfonds",
    metaTitle: "Noodfonds Calculator België - Emergency Fund Berekenen",
    metaDescription: "Bereken uw ideale noodfonds. 3-6 maanden vaste kosten opzij zetten. Financiële zekerheid en bescherming tegen onverwachte uitgaven.",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "budget-planner": {
    slug: "budget-planner",
    category: "Planning",
    pageTitle: "Budget Planner",
    breadcrumbTitle: "Budget Planner",
    metaTitle: "Budget Planner België - Maandelijks Budget Beheren",
    metaDescription: "Plan uw maandelijks budget. 50/30/20 regel voor uitgaven. Vaste kosten, sparen en discretionaire uitgaven optimaliseren in België.",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.testAankoop]
  },
  "belastingplanning-calculator": {
    slug: "belastingplanning-calculator",
    category: "Planning",
    pageTitle: "Belastingplanning Calculator",
    breadcrumbTitle: "Belastingplanning",
    metaTitle: "Belastingplanning Calculator België - Fiscaal Optimaliseren",
    metaDescription: "Optimaliseer uw Belgische belastingen. Pensioensparen, groepsverzekering en fiscale aftrekposten. Bespaar tot €1.000+ per jaar.",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.fodFinancien, defaultAuthorityLinks.fsma]
  },
  "levensverzekeraar-calculator": {
    slug: "levensverzekeraar-calculator",
    category: "Planning",
    pageTitle: "Levensverzekeraar Calculator",
    breadcrumbTitle: "Levensverzekering",
    metaTitle: "Levensverzekering Calculator België - Tak 21 & Tak 23",
    metaDescription: "Bereken levensverzekering opbrengst. Tak 21 (gewaarborgd) vs Tak 23 (beleggingsverzekering). Vergelijk rendementen en belastingvoordelen.",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "eindejaarsbonus-calculator": {
    slug: "eindejaarsbonus-calculator",
    category: "Planning",
    pageTitle: "Eindejaarsbonus Calculator",
    breadcrumbTitle: "Eindejaarsbonus",
    metaTitle: "Eindejaarsbonus Calculator België - 13de Maand Optimaliseren",
    metaDescription: "Bereken netto eindejaarsbonus na belastingen. 13de maand optimalisatie en belasting in België. Maximaliseer uw eindejaarspremie.",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.fodFinancien]
  },
  "inflatie-calculator-belgie": {
    slug: "inflatie-calculator-belgie",
    category: "Planning",
    pageTitle: "Inflatie Calculator België",
    breadcrumbTitle: "Inflatie Calculator",
    metaTitle: "Inflatie Calculator België 2025 - Koopkracht Berekenen",
    metaDescription: "Bereken impact van inflatie op uw koopkracht. Actuele inflatiecijfers België 2-4%. Zie hoe prijsstijgingen uw vermogen aantasten.",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fodFinancien]
  },
  "geldontwaarding-calculator": {
    slug: "geldontwaarding-calculator",
    category: "Planning",
    pageTitle: "Geldontwaarding Calculator",
    breadcrumbTitle: "Geldontwaarding",
    metaTitle: "Geldontwaarding Calculator - Vermogen Erosie Berekenen",
    metaDescription: "Bereken geldontwaarding door inflatie. Zie hoe uw spaargeld in waarde daalt. Bescherm vermogen tegen inflatie in België.",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fodFinancien]
  },
  "reele-rente-berekenen": {
    slug: "reele-rente-berekenen",
    category: "Planning",
    pageTitle: "Reële Rente Berekenen",
    breadcrumbTitle: "Reële Rente",
    metaTitle: "Reële Rente Berekenen - Nominale Rente Min Inflatie",
    metaDescription: "Bereken reële rente (nominaal minus inflatie). Ontdek of uw spaarrente inflatie verslaat. Realistisch rendement berekenen voor België.",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fodFinancien]
  },
  "rentevoet-vergelijker": {
    slug: "rentevoet-vergelijker",
    category: "Planning",
    pageTitle: "Rentevoet Vergelijker",
    breadcrumbTitle: "Rentevoet Vergelijker",
    metaTitle: "Rentevoet Vergelijker België - Vast vs Variabel 2025",
    metaDescription: "Vergelijk vaste en variabele rentevoeten. Spaarrentes, hypotheekrentes en beleggingsrendementen in België. Vind de beste rente.",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.testAankoop]
  },
  "over-ons": {
    slug: "over-ons",
    category: "Overige",
    pageTitle: "Over Ons",
    breadcrumbTitle: "Over Ons",
    metaTitle: "Over Interesten.be - Financiële Calculators België",
    metaDescription: "Interesten.be helpt u slimme financiële beslissingen nemen met gratis calculators voor sparen, lenen, beleggen en planning in België.",
    faqs: defaultFaqsBySilo.Overige,
    authorityLinks: []
  },
  "privacy": {
    slug: "privacy",
    category: "Overige",
    pageTitle: "Privacy",
    breadcrumbTitle: "Privacy",
    metaTitle: "Privacy & Cookie Policy - Interesten.be",
    metaDescription: "Privacy policy en cookie informatie van Interesten.be. Lees hoe wij omgaan met uw gegevens.",
    faqs: defaultFaqsBySilo.Overige,
    authorityLinks: []
  },
  "voorwaarden": {
    slug: "voorwaarden",
    category: "Overige",
    pageTitle: "Algemene Voorwaarden",
    breadcrumbTitle: "Voorwaarden",
    metaTitle: "Algemene Voorwaarden - Interesten.be",
    metaDescription: "Algemene voorwaarden en disclaimer voor het gebruik van Interesten.be calculators en informatie.",
    faqs: defaultFaqsBySilo.Overige,
    authorityLinks: []
  },
  "sitemap": {
    slug: "sitemap",
    category: "Overige",
    pageTitle: "Sitemap",
    breadcrumbTitle: "Sitemap",
    metaTitle: "Sitemap - Alle Calculators Interesten.be",
    metaDescription: "Volledig overzicht van alle financiële calculators en pagina's op Interesten.be voor België.",
    faqs: defaultFaqsBySilo.Overige,
    authorityLinks: []
  },
  "admin": {
    slug: "admin",
    category: "Overige",
    pageTitle: "Admin",
    breadcrumbTitle: "Admin",
    metaTitle: "Admin Panel - Interesten.be",
    metaDescription: "Beheer panel voor Interesten.be",
    faqs: defaultFaqsBySilo.Overige,
    authorityLinks: []
  },
  "sparen": {
    slug: "sparen",
    category: "Sparen",
    pageTitle: "Spaarrekening Calculators België",
    breadcrumbTitle: "Sparen",
    metaTitle: "Spaarrekening Calculators België - 11+ Gratis Tools",
    metaDescription: "Vergelijk de beste spaarrekeningen, deposito's en termijnrekeningen in België. Bereken uw rendement met onze gratis tools.",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "lenen": {
    slug: "lenen",
    category: "Lenen",
    pageTitle: "Lening Calculators België",
    breadcrumbTitle: "Lenen",
    metaTitle: "Lening Calculators België - Hypotheek & Krediet",
    metaDescription: "Bereken uw hypotheek, autolening of persoonlijke lening. Vergelijk rentes en vind de beste kredietvoorwaarden.",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "beleggen": {
    slug: "beleggen",
    category: "Beleggen",
    pageTitle: "Beleggings Calculators België",
    breadcrumbTitle: "Beleggen",
    metaTitle: "Beleggings Calculators België - Aandelen, ETF, Crypto",
    metaDescription: "Bereken rendement op aandelen, ETF's, obligaties en crypto. Optimaliseer uw beleggingsportefeuille.",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.fodFinancien, defaultAuthorityLinks.testAankoop]
  },
  "planning": {
    slug: "planning",
    category: "Planning",
    pageTitle: "Financiële Planning Tools",
    breadcrumbTitle: "Planning",
    metaTitle: "Financiële Planning Tools - Pensioen & FIRE",
    metaDescription: "Plan uw pensioen, budget en financiële toekomst. FIRE calculator, noodfonds en belastingplanning.",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.fodFinancien, defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma]
  },
  "overige": {
    slug: "overige",
    category: "Overige",
    pageTitle: "Informatie & Support",
    breadcrumbTitle: "Informatie",
    metaTitle: "Informatie - Interesten.be",
    metaDescription: "Meer informatie over Interesten.be, privacy beleid en gebruiksvoorwaarden.",
    faqs: [],
    authorityLinks: []
  }
};

export const calculatorsByCategory: Record<SiloCategory, string[]> = {
  Sparen: [
    "hoogste-spaarrente-belgie",
    "deposito-calculator",
    "samengestelde-interest-berekenen",
    "doelspaarcalculator",
    "spaarrekening-vergelijker",
    "kinderrekening-calculator",
    "kasbon-calculator",
    "termijnrekening-calculator",
    "groepssparen-calculator",
    "loyalty-bonus-calculator",
    "vakantiegeld-sparen-calculator"
  ],
  Lenen: [
    "hypothecaire-lening-berekenen",
    "woningkrediet-simulator",
    "persoonlijke-lening-berekenen",
    "autolening-berekenen",
    "lening-herfinancieren",
    "schuldenconsolidatie-calculator",
    "kredietcapaciteit-calculator",
    "kredietvergelijker-belgie",
    "doorlopend-krediet-calculator",
    "kredietkaart-calculator",
    "leasingkrediet-calculator",
    "voorschot-calculator",
    "studieschuld-calculator",
    "groepslening-calculator",
    "wettelijke-rentevoet-belgie"
  ],
  Beleggen: [
    "beleggingsrente-calculator",
    "aandelen-calculator",
    "etf-calculator",
    "obligatie-calculator",
    "cryptocurrency-calculator",
    "dollar-cost-averaging-calculator",
    "portfolio-diversificatie-calculator",
    "reit-calculator",
    "belgische-beleggingsfiscaliteit-calculator",
    "roerende-voorheffing-calculator"
  ],
  Planning: [
    "pensioensparen-calculator",
    "pensioen-calculator",
    "fire-calculator",
    "noodfonds-calculator",
    "budget-planner",
    "belastingplanning-calculator",
    "levensverzekeraar-calculator",
    "eindejaarsbonus-calculator",
    "inflatie-calculator-belgie",
    "geldontwaarding-calculator",
    "reele-rente-berekenen",
    "rentevoet-vergelijker"
  ],
  Overige: [
    "over-ons",
    "privacy",
    "voorwaarden",
    "sitemap",
    "admin"
  ]
};

export function getSeoConfig(pageSlug: string): CalculatorSeoConfig | null {
  return calculatorSeoConfigs[pageSlug] || null;
}
