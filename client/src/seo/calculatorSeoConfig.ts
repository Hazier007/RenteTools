export type SiloCategory = "Sparen" | "Lenen" | "Beleggen" | "Planning";

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
  category: SiloCategory;
  pageTitle: string;
  breadcrumbTitle: string;
  faqs: FaqItem[];
  authorityLinks: AuthorityLink[];
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
  "hoogste-spaarrente-belgie": {
    category: "Sparen",
    pageTitle: "Hoogste Spaarrente België",
    breadcrumbTitle: "Hoogste Spaarrente",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "deposito-calculator": {
    category: "Sparen",
    pageTitle: "Deposito Calculator",
    breadcrumbTitle: "Deposito Calculator",
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
    category: "Sparen",
    pageTitle: "Samengestelde Interest Berekenen",
    breadcrumbTitle: "Samengestelde Interest",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "doelspaarcalculator": {
    category: "Sparen",
    pageTitle: "Doelspaar Calculator",
    breadcrumbTitle: "Doelspaar Calculator",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.testAankoop]
  },
  "spaarrekening-vergelijker": {
    category: "Sparen",
    pageTitle: "Spaarrekening Vergelijker",
    breadcrumbTitle: "Spaarrekening Vergelijker",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "kinderrekening-calculator": {
    category: "Sparen",
    pageTitle: "Kinderrekening Calculator",
    breadcrumbTitle: "Kinderrekening",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.testAankoop]
  },
  "kasbon-calculator": {
    category: "Sparen",
    pageTitle: "Kasbon Calculator",
    breadcrumbTitle: "Kasbon Calculator",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma]
  },
  "termijnrekening-calculator": {
    category: "Sparen",
    pageTitle: "Termijnrekening Calculator",
    breadcrumbTitle: "Termijnrekening",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.testAankoop]
  },
  "groepssparen-calculator": {
    category: "Sparen",
    pageTitle: "Groepssparen Calculator",
    breadcrumbTitle: "Groepssparen",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.fodFinancien, defaultAuthorityLinks.fsma]
  },
  "loyalty-bonus-calculator": {
    category: "Sparen",
    pageTitle: "Getrouwheidspremie Calculator",
    breadcrumbTitle: "Getrouwheidspremie",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma]
  },
  "vakantiegeld-sparen-calculator": {
    category: "Sparen",
    pageTitle: "Vakantiegeld Sparen Calculator",
    breadcrumbTitle: "Vakantiegeld Sparen",
    faqs: defaultFaqsBySilo.Sparen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.testAankoop]
  },
  "hypothecaire-lening-berekenen": {
    category: "Lenen",
    pageTitle: "Hypothecaire Lening Berekenen",
    breadcrumbTitle: "Hypothecaire Lening",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "woningkrediet-simulator": {
    category: "Lenen",
    pageTitle: "Woningkrediet Simulator",
    breadcrumbTitle: "Woningkrediet Simulator",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "persoonlijke-lening-berekenen": {
    category: "Lenen",
    pageTitle: "Persoonlijke Lening Berekenen",
    breadcrumbTitle: "Persoonlijke Lening",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "autolening-berekenen": {
    category: "Lenen",
    pageTitle: "Autolening Berekenen",
    breadcrumbTitle: "Autolening",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "lening-herfinancieren": {
    category: "Lenen",
    pageTitle: "Lening Herfinancieren",
    breadcrumbTitle: "Lening Herfinancieren",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "schuldenconsolidatie-calculator": {
    category: "Lenen",
    pageTitle: "Schuldenconsolidatie Calculator",
    breadcrumbTitle: "Schuldenconsolidatie",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "kredietcapaciteit-calculator": {
    category: "Lenen",
    pageTitle: "Kredietcapaciteit Calculator",
    breadcrumbTitle: "Kredietcapaciteit",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma]
  },
  "kredietvergelijker-belgie": {
    category: "Lenen",
    pageTitle: "Kredietvergelijker België",
    breadcrumbTitle: "Kredietvergelijker",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "doorlopend-krediet-calculator": {
    category: "Lenen",
    pageTitle: "Doorlopend Krediet Calculator",
    breadcrumbTitle: "Doorlopend Krediet",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "kredietkaart-calculator": {
    category: "Lenen",
    pageTitle: "Kredietkaart Calculator",
    breadcrumbTitle: "Kredietkaart Kosten",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "leasingkrediet-calculator": {
    category: "Lenen",
    pageTitle: "Leasingkrediet Calculator",
    breadcrumbTitle: "Leasingkrediet",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "voorschot-calculator": {
    category: "Lenen",
    pageTitle: "Voorschot Calculator",
    breadcrumbTitle: "Voorschot Berekenen",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.nbb]
  },
  "studieschuld-calculator": {
    category: "Lenen",
    pageTitle: "Studieschuld Calculator",
    breadcrumbTitle: "Studieschuld",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "groepslening-calculator": {
    category: "Lenen",
    pageTitle: "Groepslening Calculator",
    breadcrumbTitle: "Groepslening",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "wettelijke-rentevoet-belgie": {
    category: "Lenen",
    pageTitle: "Wettelijke Rentevoet België",
    breadcrumbTitle: "Wettelijke Rentevoet",
    faqs: defaultFaqsBySilo.Lenen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fodFinancien]
  },
  "beleggingsrente-calculator": {
    category: "Beleggen",
    pageTitle: "Beleggingsrente Calculator",
    breadcrumbTitle: "Beleggingsrente",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.fodFinancien, defaultAuthorityLinks.testAankoop]
  },
  "aandelen-calculator": {
    category: "Beleggen",
    pageTitle: "Aandelen Calculator",
    breadcrumbTitle: "Aandelen Calculator",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.fodFinancien]
  },
  "etf-calculator": {
    category: "Beleggen",
    pageTitle: "ETF Calculator",
    breadcrumbTitle: "ETF Calculator",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.fodFinancien]
  },
  "obligatie-calculator": {
    category: "Beleggen",
    pageTitle: "Obligatie Calculator",
    breadcrumbTitle: "Obligatie Calculator",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fsma]
  },
  "cryptocurrency-calculator": {
    category: "Beleggen",
    pageTitle: "Cryptocurrency Calculator",
    breadcrumbTitle: "Cryptocurrency",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.fodFinancien]
  },
  "dollar-cost-averaging-calculator": {
    category: "Beleggen",
    pageTitle: "Dollar Cost Averaging Calculator",
    breadcrumbTitle: "Dollar Cost Averaging",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "portfolio-diversificatie-calculator": {
    category: "Beleggen",
    pageTitle: "Portfolio Diversificatie Calculator",
    breadcrumbTitle: "Portfolio Diversificatie",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "reit-calculator": {
    category: "Beleggen",
    pageTitle: "REIT Calculator",
    breadcrumbTitle: "REIT Calculator",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.fodFinancien]
  },
  "belgische-beleggingsfiscaliteit-calculator": {
    category: "Beleggen",
    pageTitle: "Belgische Beleggingsfiscaliteit",
    breadcrumbTitle: "Beleggingsfiscaliteit",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fodFinancien, defaultAuthorityLinks.fsma]
  },
  "roerende-voorheffing-calculator": {
    category: "Beleggen",
    pageTitle: "Roerende Voorheffing Calculator",
    breadcrumbTitle: "Roerende Voorheffing",
    faqs: defaultFaqsBySilo.Beleggen,
    authorityLinks: [defaultAuthorityLinks.fodFinancien, defaultAuthorityLinks.fsma]
  },
  "pensioensparen-calculator": {
    category: "Planning",
    pageTitle: "Pensioensparen Calculator",
    breadcrumbTitle: "Pensioensparen",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.fodFinancien, defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "pensioen-calculator": {
    category: "Planning",
    pageTitle: "Pensioen Calculator",
    breadcrumbTitle: "Pensioen Calculator",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.fodFinancien, defaultAuthorityLinks.fsma]
  },
  "fire-calculator": {
    category: "Planning",
    pageTitle: "FIRE Calculator",
    breadcrumbTitle: "FIRE Calculator",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "noodfonds-calculator": {
    category: "Planning",
    pageTitle: "Noodfonds Calculator",
    breadcrumbTitle: "Noodfonds",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "budget-planner": {
    category: "Planning",
    pageTitle: "Budget Planner",
    breadcrumbTitle: "Budget Planner",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.testAankoop]
  },
  "belastingplanning-calculator": {
    category: "Planning",
    pageTitle: "Belastingplanning Calculator",
    breadcrumbTitle: "Belastingplanning",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.fodFinancien, defaultAuthorityLinks.fsma]
  },
  "levensverzekeraar-calculator": {
    category: "Planning",
    pageTitle: "Levensverzekeraar Calculator",
    breadcrumbTitle: "Levensverzekering",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.fsma, defaultAuthorityLinks.testAankoop]
  },
  "eindejaarsbonus-calculator": {
    category: "Planning",
    pageTitle: "Eindejaarsbonus Calculator",
    breadcrumbTitle: "Eindejaarsbonus",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.fodFinancien]
  },
  "inflatie-calculator-belgie": {
    category: "Planning",
    pageTitle: "Inflatie Calculator België",
    breadcrumbTitle: "Inflatie Calculator",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fodFinancien]
  },
  "geldontwaarding-calculator": {
    category: "Planning",
    pageTitle: "Geldontwaarding Calculator",
    breadcrumbTitle: "Geldontwaarding",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fodFinancien]
  },
  "reele-rente-berekenen": {
    category: "Planning",
    pageTitle: "Reële Rente Berekenen",
    breadcrumbTitle: "Reële Rente",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.fodFinancien]
  },
  "rentevoet-vergelijker": {
    category: "Planning",
    pageTitle: "Rentevoet Vergelijker",
    breadcrumbTitle: "Rentevoet Vergelijker",
    faqs: defaultFaqsBySilo.Planning,
    authorityLinks: [defaultAuthorityLinks.nbb, defaultAuthorityLinks.testAankoop]
  }
};

export function getSeoConfig(pageSlug: string): CalculatorSeoConfig | null {
  return calculatorSeoConfigs[pageSlug] || null;
}
