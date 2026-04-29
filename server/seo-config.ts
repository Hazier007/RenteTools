import { calculatorRegistry, type CalculatorCategory } from "../shared/calculator-registry";
import { doelspaarcalculatorContent } from "../client/src/seo/calculator-content/doelspaarcalculator";
import { noodfondsCalculatorContent } from "../client/src/seo/calculator-content/noodfonds-calculator";
import { reeleRenteBerekenenContent } from "../client/src/seo/calculator-content/reele-rente-berekenen";
import { doorlopendKredietCalculatorContent } from "../client/src/seo/calculator-content/doorlopend-krediet-calculator";
import { leasingkredietCalculatorContent } from "../client/src/seo/calculator-content/leasingkrediet-calculator";
import { voorschotCalculatorContent } from "../client/src/seo/calculator-content/voorschot-calculator";
import { cryptoWinstVerliesCalculatorContent } from "../client/src/seo/calculator-content/crypto-winst-verlies-calculator";
import type { EducationalSection } from "../client/src/seo/calculator-content/types";
import { blogPosts } from "../client/src/data/blogPosts";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoConfig {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  pageTitle?: string;
  faqs?: FaqItem[];
  educationalSections?: EducationalSection[];
  robots?: string;
  ogImage?: string;
}

export type SiloCategory = "Home" | "Sparen" | "Lenen" | "Beleggen" | "Planning" | "Overige";

function getCurrentMonth(): string {
  const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
  return months[new Date().getMonth()];
}

function getCurrentYear(): number {
  return new Date().getFullYear();
}

function getCurrentDateLabel(): string {
  return `${getCurrentMonth()} ${getCurrentYear()}`;
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const slugToCategory: Record<string, SiloCategory> = {
  "home": "Home",
  "hoogste-spaarrente-belgie": "Sparen",
  "deposito-calculator": "Sparen",
  "samengestelde-interest-berekenen": "Sparen",
  "doelspaarcalculator": "Sparen",
  "spaarrekening-vergelijker": "Sparen",
  "kinderrekening-calculator": "Sparen",
  "kasbon-calculator": "Sparen",
  "termijnrekening-calculator": "Sparen",
  "groepssparen-calculator": "Sparen",
  "loyalty-bonus-calculator": "Sparen",
  "vakantiegeld-sparen-calculator": "Sparen",
  "sparen": "Sparen",
  "hypothecaire-lening-berekenen": "Lenen",
  "woningkrediet-simulator": "Lenen",
  "persoonlijke-lening-berekenen": "Lenen",
  "autolening-berekenen": "Lenen",
  "lening-herfinancieren": "Lenen",
  "schuldenconsolidatie-calculator": "Lenen",
  "kredietcapaciteit-calculator": "Lenen",
  "kredietvergelijker-belgie": "Lenen",
  "doorlopend-krediet-calculator": "Lenen",
  "kredietkaart-calculator": "Lenen",
  "leasingkrediet-calculator": "Lenen",
  "voorschot-calculator": "Lenen",
  "studieschuld-calculator": "Lenen",
  "groepslening-calculator": "Lenen",
  "wettelijke-rentevoet-belgie": "Lenen",
  "lenen": "Lenen",
  "beleggingsrente-calculator": "Beleggen",
  "aandelen-calculator": "Beleggen",
  "etf-calculator": "Beleggen",
  "obligatie-calculator": "Beleggen",
  "cryptocurrency-calculator": "Beleggen",
  "crypto-belasting-calculator": "Beleggen",
  "staking-apy-calculator": "Beleggen",
  "crypto-winst-verlies-calculator": "Beleggen",
  "dollar-cost-averaging-calculator": "Beleggen",
  "portfolio-diversificatie-calculator": "Beleggen",
  "reit-calculator": "Beleggen",
  "belgische-beleggingsfiscaliteit-calculator": "Beleggen",
  "roerende-voorheffing-calculator": "Beleggen",
  "beleggen": "Beleggen",
  "pensioensparen-calculator": "Planning",
  "pensioen-calculator": "Planning",
  "fire-calculator": "Planning",
  "noodfonds-calculator": "Planning",
  "budget-planner": "Planning",
  "belastingplanning-calculator": "Planning",
  "levensverzekeraar-calculator": "Planning",
  "eindejaarsbonus-calculator": "Planning",
  "planning": "Planning",
  "inflatie-calculator-belgie": "Overige",
  "geldontwaarding-calculator": "Overige",
  "reele-rente-berekenen": "Overige",
  "rentevoet-vergelijker": "Overige",
  "over-ons": "Overige",
  "privacy": "Overige",
  "privacybeleid": "Overige",
  "voorwaarden": "Overige",
  "contact": "Overige",
  "sitemap": "Overige",
  "blog": "Overige",
  "nieuws": "Overige",
  "overige": "Overige",
};

const categoryToPrettyName: Record<SiloCategory, string> = {
  "Home": "Home",
  "Sparen": "Sparen",
  "Lenen": "Lenen",
  "Beleggen": "Beleggen",
  "Planning": "Planning",
  "Overige": "Overige",
};

const categoryToPath: Record<SiloCategory, string> = {
  "Home": "/",
  "Sparen": "/sparen",
  "Lenen": "/lenen",
  "Beleggen": "/beleggen",
  "Planning": "/planning",
  "Overige": "/overige",
};

const defaultFaqs = {
  sparen: [
    { question: "Hoeveel interest krijg ik op een spaarrekening?", answer: "De gemiddelde spaarrente in België ligt rond 1,5-2,5%. Dit bestaat uit een basisrente en getrouwheidspremie. De getrouwheidspremie krijgt u na 12 maanden trouw blijven bij dezelfde bank." },
    { question: "Tot welk bedrag is spaarrente belastingvrij?", answer: `In ${getCurrentYear()} is spaarrente belastingvrij tot 1.050 euro per jaar. Boven dit bedrag betaalt u 30% roerende voorheffing over het meerdere.` },
    { question: "Wat is de hoogste spaarrente in België?", answer: "De hoogste gecombineerde rentes liggen momenteel tussen 2% en 2,85% voor spaarrekeningen. Let wel op voorwaarden zoals maximumbedragen en looptijden." }
  ],
  lenen: [
    { question: "Hoeveel kan ik maximaal lenen?", answer: "In België kunt u maximaal lenen tot 90% van de waarde van de woning (LTV). Uw maandlast mag niet hoger zijn dan 33% van uw netto inkomen." },
    { question: "Wat is de laagste hypotheekrente in België?", answer: "De laagste hypotheekrente begint rond 2,5% voor korte looptijden. Voor vaste rentes van 20-25 jaar liggen de tarieven tussen 2,8% en 3,5%." },
    { question: "Wat zijn de kosten van een lening?", answer: "Naast de interest betaalt u ook notariskosten, registratierechten, brandverzekering en eventueel schuldsaldoverzekering. Totaal ongeveer 10-15% van de leensom." }
  ],
  beleggen: [
    { question: "Hoeveel belasting betaal ik op beleggingswinst?", answer: "In België betaalt u 30% roerende voorheffing op dividenden en interesten. Meerwaarden op aandelen zijn belastingvrij, tenzij u speculatief belegt." },
    { question: "Wat is een veilig rendement bij beleggen?", answer: "Historisch gezien leveren gediversifieerde aandelenportefeuilles gemiddeld 7-9% per jaar op. Obligaties geven 2-4%. Houd rekening met inflatie en kosten." },
    { question: "Zijn ETF's beter dan individuele aandelen?", answer: "ETF's bieden directe diversificatie tegen lage kosten. Voor beginners zijn breed gespreide ETF's vaak veiliger dan individuele aandelen." }
  ],
  planning: [
    { question: "Hoeveel moet ik sparen voor mijn pensioen?", answer: "Financiële adviseurs raden aan om 15-20% van uw bruto-inkomen te sparen voor pensioen. Via pensioensparen krijgt u tot 30% belastingvoordeel." },
    { question: "Wat is de 4%-regel voor pensioen?", answer: "De 4%-regel stelt dat u jaarlijks 4% van uw pensioenspaarpot kunt opnemen zonder deze uit te putten. Voor €500.000 is dat €20.000 per jaar." },
    { question: "Hoeveel noodfonds moet ik hebben?", answer: "Experts adviseren 3-6 maanden vaste kosten als noodfonds. Voor een gezin met €3.000/maand kosten betekent dit €9.000-€18.000." }
  ]
};

export const seoConfigs: Record<string, SeoConfig> = {
  "home": {
    slug: "home",
    pageTitle: `Hoogste Spaarrente België ${getCurrentYear()} + 70+ Gratis Calculators`,
    metaTitle: `Hoogste Spaarrente België ${getCurrentYear()} + 70+ Gratis Calculators`,
    metaDescription: `Vind de hoogste spaarrente (tot ~2,85%), bereken je hypotheek of FIRE-doel. 70+ gratis tools voor sparen, lenen & beleggen – anoniem & actueel België ${getCurrentYear()}.`,
    faqs: [
      { question: "Wat kan ik doen op Interesten.be?", answer: "Op Interesten.be vindt u 70+ gratis financiële calculators voor sparen, lenen, beleggen en planning. Vergelijk spaarrentes, bereken uw hypotheek of plan uw FIRE-doel." },
      { question: "Zijn de calculators gratis?", answer: "Ja, alle calculators op Interesten.be zijn 100% gratis te gebruiken. U hoeft niet in te loggen en wij slaan geen persoonlijke gegevens op." }
    ]
  },
  "hoogste-spaarrente-belgie": {
    slug: "hoogste-spaarrente-belgie",
    pageTitle: `Hoogste Spaarrente België ${capitalizeFirst(getCurrentDateLabel())}`,
    metaTitle: `Hoogste Spaarrente België ${capitalizeFirst(getCurrentDateLabel())}: Top Banken`,
    metaDescription: `Vergelijk actuele hoogste spaarrentes (basis + getrouwheidspremie tot 2,85%). Bereken je opbrengst gratis & anoniem – update ${getCurrentDateLabel()}.`,
    faqs: defaultFaqs.sparen
  },
  "deposito-calculator": {
    slug: "deposito-calculator",
    pageTitle: "Deposito Calculator België",
    metaTitle: "Deposito Calculator België - Termijnrekening Rente Berekenen",
    metaDescription: "Bereken uw deposito opbrengst in België. Vergelijk termijnrekening tarieven van 1,5% tot 3,5%. Inclusief roerende voorheffing berekening.",
    faqs: defaultFaqs.sparen
  },
  "samengestelde-interest-berekenen": {
    slug: "samengestelde-interest-berekenen",
    pageTitle: `Samengestelde Interest Berekenen België ${getCurrentYear()}`,
    metaTitle: `Samengestelde Interest Berekenen België ${getCurrentYear()}`,
    metaDescription: "Zie hoe rente-op-rente je spaargeld laat groeien. Bereken incl. roerende voorheffing – gratis compound interest tool.",
    faqs: defaultFaqs.sparen
  },
  "doelspaarcalculator": {
    slug: "doelspaarcalculator",
    pageTitle: "Doelspaar Calculator België",
    metaTitle: "Doelspaarcalculator België - Meerdere Spaardoelen Beheren",
    metaDescription: "Plan al uw spaardoelen tegelijk. Bereken hoeveel u maandelijks moet sparen voor auto, vakantie, noodfonds en meer. Smart goal planning.",
    faqs: doelspaarcalculatorContent.faqs,
    educationalSections: doelspaarcalculatorContent.sections
  },
  "spaarrekening-vergelijker": {
    slug: "spaarrekening-vergelijker",
    pageTitle: `Spaarrekening Vergelijker België ${getCurrentYear()}`,
    metaTitle: `Spaarrekening Vergelijker België ${getCurrentYear()} - Beste Rentes`,
    metaDescription: `Vergelijk alle Belgische spaarrekeningen. Basisrente, getrouwheidspremie en voorwaarden van alle banken. Vind de beste spaarrente ${getCurrentYear()}.`,
    faqs: defaultFaqs.sparen
  },
  "kinderrekening-calculator": {
    slug: "kinderrekening-calculator",
    metaTitle: "Kinderrekening Calculator België - Sparen voor Kinderen",
    metaDescription: "Bereken hoeveel u moet sparen voor uw kinderen. Kinderrekening rentes tot 2,5% in België. Start vandaag met sparen voor hun toekomst."
  },
  "kasbon-calculator": {
    slug: "kasbon-calculator",
    metaTitle: "Kasbon Calculator België - Staatsbons & Kasbons Vergelijken",
    metaDescription: "Bereken rendement van kasbons en staatsbons in België. Vergelijk looptijden van 1-10 jaar. Vaste rente en belastingvoordelen berekenen."
  },
  "termijnrekening-calculator": {
    slug: "termijnrekening-calculator",
    metaTitle: `Termijnrekening Hoogste Rente België ${getCurrentYear()}`,
    metaDescription: `Vergelijk hoogste rente op deposito/termijnrekeningen. Bereken opbrengst na belasting – gratis tool ${getCurrentDateLabel()}.`
  },
  "groepssparen-calculator": {
    slug: "groepssparen-calculator",
    metaTitle: "Groepssparen Calculator België - Aanvullend Pensioen Berekenen",
    metaDescription: "Bereken uw groepsverzekering opbrengst. Werkgeversbijdrage + belastingvoordeel tot 30%. Optimaliseer uw aanvullend pensioen in België."
  },
  "loyalty-bonus-calculator": {
    slug: "loyalty-bonus-calculator",
    metaTitle: "Getrouwheidspremie Calculator - Loyalty Bonus Optimaliseren",
    metaDescription: "Maximaliseer uw getrouwheidspremie op spaarrekeningen. Bereken wanneer u uw loyalty bonus krijgt. Optimaliseer uw spaarstrategie België."
  },
  "vakantiegeld-sparen-calculator": {
    slug: "vakantiegeld-sparen-calculator",
    metaTitle: "Vakantiegeld Sparen Calculator België - Droomvakantie Plannen",
    metaDescription: "Spaar slim voor uw vakantie. Bereken hoeveel u maandelijks moet sparen voor uw droomreis. Vakantiebudget planner voor België."
  },
  "hypothecaire-lening-berekenen": {
    slug: "hypothecaire-lening-berekenen",
    pageTitle: `Hypotheek Berekenen België ${getCurrentYear()}`,
    metaTitle: `Hypotheek Berekenen België ${getCurrentYear()}: Maandlasten & Kosten`,
    metaDescription: `Bereken je hypotheek maandlasten ${getCurrentYear()} incl. registratierechten, notaris & actuele rente. Maximale lening simuleren – gratis tool België.`,
    faqs: defaultFaqs.lenen
  },
  "woningkrediet-simulator": {
    slug: "woningkrediet-simulator",
    metaTitle: `Woningkrediet Simulator België - Hoeveel Kan Ik Lenen ${getCurrentYear()}`,
    metaDescription: "Simuleer uw woningkrediet in België. Bereken leencapaciteit, maandlast en vergelijk vaste vs variabele rente. Tot 90% LTV mogelijk."
  },
  "persoonlijke-lening-berekenen": {
    slug: "persoonlijke-lening-berekenen",
    metaTitle: "Persoonlijke Lening Berekenen België - Consumentenkrediet",
    metaDescription: "Bereken uw persoonlijke lening kosten. Tarieven van 3-8% op consumptieleningen in België. Vergelijk maandlasten en totale kosten."
  },
  "autolening-berekenen": {
    slug: "autolening-berekenen",
    metaTitle: "Autolening Berekenen België - Autokredieten Vergelijken",
    metaDescription: "Bereken uw autolening met rentes vanaf 2,9%. Vergelijk autokredieten en financieringsopties in België. Bereken maandlast en TAEG."
  },
  "lening-herfinancieren": {
    slug: "lening-herfinancieren",
    metaTitle: `Lening Herfinancieren België - Hypotheek Oversluiten ${getCurrentYear()}`,
    metaDescription: "Bereken of herfinancieren voordelig is. Vergelijk nieuwe rente met vervroegde terugbetalingskosten. Bespaar tot €10.000+ in België."
  },
  "schuldenconsolidatie-calculator": {
    slug: "schuldenconsolidatie-calculator",
    metaTitle: "Schuldenconsolidatie Calculator België - Leningen Samenvoegen",
    metaDescription: "Voeg al uw leningen samen tot één lening. Bereken besparing en lagere maandlast. Schuldhulp en consolidatie oplossingen voor België."
  },
  "kredietcapaciteit-calculator": {
    slug: "kredietcapaciteit-calculator",
    metaTitle: "Kredietcapaciteit Calculator België - Hoeveel Kan Ik Lenen",
    metaDescription: "Bereken hoeveel u kunt lenen op basis van uw inkomen. 33%-regel voor maandlasten. Ontdek uw maximale leenbedrag in België."
  },
  "kredietvergelijker-belgie": {
    slug: "kredietvergelijker-belgie",
    metaTitle: `Kredietvergelijker België ${getCurrentYear()} - Beste Leningrentes`,
    metaDescription: "Vergelijk alle kredieten in België. Persoonlijke leningen, autokredieten en hypotheken. Vind de laagste rente en beste voorwaarden."
  },
  "doorlopend-krediet-calculator": {
    slug: "doorlopend-krediet-calculator",
    pageTitle: "Doorlopend Krediet Calculator",
    metaTitle: "Doorlopend Krediet Calculator België - Revolving Credit",
    metaDescription: "Bereken kosten van doorlopend krediet. Rentes van 7-12% op kredietlijnen in België. Vergelijk met persoonlijke leningen.",
    faqs: doorlopendKredietCalculatorContent.faqs,
    educationalSections: doorlopendKredietCalculatorContent.sections
  },
  "kredietkaart-calculator": {
    slug: "kredietkaart-calculator",
    metaTitle: "Kredietkaart Calculator België - Rente & Kosten Berekenen",
    metaDescription: "Bereken kredietkaart kosten en rente in België. Vergelijk jaarlijkse kosten, transactiekosten en rentes tot 18%. Bespaar op creditcards."
  },
  "leasingkrediet-calculator": {
    slug: "leasingkrediet-calculator",
    pageTitle: "Leasingkrediet Calculator",
    metaTitle: "Leasingkrediet Calculator België - Financial vs Operational",
    metaDescription: "Vergelijk financial en operational leasing in België. Bereken maandlast, restwaarde en totale kosten. Autoleasing calculator voor bedrijven.",
    faqs: leasingkredietCalculatorContent.faqs,
    educationalSections: leasingkredietCalculatorContent.sections
  },
  "voorschot-calculator": {
    slug: "voorschot-calculator",
    pageTitle: "Voorschot Calculator",
    metaTitle: "Voorschot Calculator België - Cash Advance & Bridge Loans",
    metaDescription: "Bereken voorschot kosten en overbruggingskrediet. Korte termijn financiering in België. Cash advance rentes en voorwaarden vergelijken.",
    faqs: voorschotCalculatorContent.faqs,
    educationalSections: voorschotCalculatorContent.sections
  },
  "studieschuld-calculator": {
    slug: "studieschuld-calculator",
    metaTitle: "Studieschuld Calculator België - Studielening Terugbetalen",
    metaDescription: "Bereken uw studieschuld aflossing. Studieleningen rentes 2-4% in België. Ontdek aflossingsplan en totale kosten van studeren."
  },
  "groepslening-calculator": {
    slug: "groepslening-calculator",
    metaTitle: "Groepslening Calculator België - Samen Lenen met Familie",
    metaDescription: "Bereken groepslening met vrienden of familie. Verdeel kosten eerlijk, beheer risicos en simuleer verschillende scenario's voor gezamenlijk lenen."
  },
  "wettelijke-rentevoet-belgie": {
    slug: "wettelijke-rentevoet-belgie",
    metaTitle: `Wettelijke Rentevoet België ${getCurrentYear()} - Actuele Tarieven NBB`,
    metaDescription: `Actuele wettelijke interest in België. Bereken vertragingsinterest op facturen en schulden. Officiële NBB tarieven ${getCurrentYear()}.`
  },
  "beleggingsrente-calculator": {
    slug: "beleggingsrente-calculator",
    metaTitle: "Beleggingsrente Calculator België - Rendement Berekenen",
    metaDescription: "Bereken uw beleggingsrendement inclusief dividenden en kosten. Compound interest op aandelen en ETFs. Verwacht rendement 7-9% per jaar."
  },
  "aandelen-calculator": {
    slug: "aandelen-calculator",
    metaTitle: "Aandelen Calculator België - Dividend Yield & Waardering",
    metaDescription: "Bereken dividend yield, P/E ratio en aandelenwaardering. Analyseer Belgische en internationale aandelen. Inclusief 30% roerende voorheffing."
  },
  "etf-calculator": {
    slug: "etf-calculator",
    pageTitle: "ETF Calculator België",
    metaTitle: `ETF Calculator België - Index Fondsen Vergelijken ${getCurrentYear()}`,
    metaDescription: "Vergelijk ETF kosten en rendement. IWDA, VWCE en andere populaire index trackers. Bereken TER impact en verwacht rendement voor België.",
    faqs: defaultFaqs.beleggen
  },
  "obligatie-calculator": {
    slug: "obligatie-calculator",
    metaTitle: "Obligatie Calculator België - Yield to Maturity & Duration",
    metaDescription: "Bereken obligatie rendement, duration en prijs. Staatsobligaties en bedrijfsobligaties vergelijken. YTM calculator voor België."
  },
  "cryptocurrency-calculator": {
    slug: "cryptocurrency-calculator",
    metaTitle: "Cryptocurrency Calculator België - Crypto Portfolio Analyse",
    metaDescription: "Bereken crypto rendement en risico. Bitcoin, Ethereum en altcoins analyseren. Belgische belastingregels voor crypto (33% meerwaarde)."
  },
  "crypto-belasting-calculator": {
    slug: "crypto-belasting-calculator",
    pageTitle: "Belgische Crypto Belasting Calculator",
    metaTitle: `Crypto Belasting Calculator België - Hobby vs Professioneel ${getCurrentYear()}`,
    metaDescription: "Bereken crypto belasting in België. Goede huisvader (belastingvrij), speculatief (33%) of staking (30%). Gratis Belgische crypto tax calculator.",
    faqs: defaultFaqs.beleggen
  },
  "staking-apy-calculator": {
    slug: "staking-apy-calculator",
    pageTitle: "Staking APY Calculator",
    metaTitle: `Staking APY Calculator België - Crypto Staking Rendement ${getCurrentYear()}`,
    metaDescription: "Bereken uw crypto staking rendement met APY naar APR conversie. Compound interest berekening voor staking rewards. Gratis Belgische staking calculator.",
    faqs: defaultFaqs.beleggen
  },
  "crypto-winst-verlies-calculator": {
    slug: "crypto-winst-verlies-calculator",
    pageTitle: "Crypto Winst/Verlies Calculator",
    metaTitle: `Crypto Winst/Verlies Calculator België - ROI Berekenen ${getCurrentYear()}`,
    metaDescription: "Bereken uw crypto winst of verlies inclusief transactiekosten. ROI, break-even prijs en cost basis berekening. Gratis Belgische crypto calculator.",
    faqs: cryptoWinstVerliesCalculatorContent.faqs,
    educationalSections: cryptoWinstVerliesCalculatorContent.sections
  },
  "dollar-cost-averaging-calculator": {
    slug: "dollar-cost-averaging-calculator",
    metaTitle: "Dollar Cost Averaging Calculator België - Periodiek Beleggen",
    metaDescription: "Bereken voordelen van periodiek beleggen (DCA). Verminder risico door maandelijks te beleggen. Historische DCA resultaten voor België."
  },
  "portfolio-diversificatie-calculator": {
    slug: "portfolio-diversificatie-calculator",
    metaTitle: "Portfolio Diversificatie Calculator - Asset Allocatie België",
    metaDescription: "Optimaliseer uw portfolio allocatie. Bereken risico-rendement verhouding en ideale verdeling aandelen/obligaties. Modern portfolio theory."
  },
  "reit-calculator": {
    slug: "reit-calculator",
    metaTitle: "REIT Calculator België - Vastgoed Beleggingsfondsen",
    metaDescription: "Bereken rendement van REITs en vastgoedfondsen. Dividend yield, NAV en FFO analyse. Belgische fiscaliteit op vastgoedbeleggingen."
  },
  "belgische-beleggingsfiscaliteit-calculator": {
    slug: "belgische-beleggingsfiscaliteit-calculator",
    metaTitle: "Belgische Beleggingsfiscaliteit Calculator - Roerende Voorheffing",
    metaDescription: "Bereken belasting op beleggingen in België. 30% roerende voorheffing op dividenden, TOB-taks op transacties. Optimaliseer uw fiscaliteit."
  },
  "roerende-voorheffing-calculator": {
    slug: "roerende-voorheffing-calculator",
    metaTitle: `Roerende Voorheffing Berekenen ${getCurrentYear()} België`,
    metaDescription: "Bereken je roerende voorheffing op interest/dividenden + vrijstelling tot €1050. Tips om belasting te minimaliseren – gratis tool."
  },
  "pensioensparen-calculator": {
    slug: "pensioensparen-calculator",
    pageTitle: `Pensioensparen Berekenen België ${getCurrentYear()}`,
    metaTitle: `Pensioensparen Berekenen België ${getCurrentYear()}: Belastingvoordeel`,
    metaDescription: `Simuleer je pensioensparen voordeel (tot €337 terug) + eindkapitaal. Actueel voor ${getCurrentYear()} – gratis calculator.`,
    faqs: defaultFaqs.planning
  },
  "pensioen-calculator": {
    slug: "pensioen-calculator",
    metaTitle: "Pensioen Calculator België - Bereken Uw Pensioenkapitaal",
    metaDescription: "Bereken hoeveel u nodig heeft voor pensioen. 4%-regel en wettelijk pensioen in België. Plan uw financiële vrijheid vanaf 60-67 jaar."
  },
  "fire-calculator": {
    slug: "fire-calculator",
    pageTitle: "FIRE Calculator België",
    metaTitle: "FIRE Calculator België: Wanneer Financieel Onafhankelijk?",
    metaDescription: `Bereken wanneer je FIRE bereikt (Lean/Fat) met Belgische fiscaliteit & roerende voorheffing. Gratis FIRE simulator ${getCurrentYear()}.`,
    faqs: defaultFaqs.planning
  },
  "noodfonds-calculator": {
    slug: "noodfonds-calculator",
    pageTitle: "Noodfonds Calculator België",
    metaTitle: "Noodfonds Calculator België - Emergency Fund Berekenen",
    metaDescription: "Bereken uw ideale noodfonds. 3-6 maanden vaste kosten opzij zetten. Financiële zekerheid en bescherming tegen onverwachte uitgaven.",
    faqs: noodfondsCalculatorContent.faqs,
    educationalSections: noodfondsCalculatorContent.sections
  },
  "budget-planner": {
    slug: "budget-planner",
    metaTitle: "Budget Planner België - Maandelijks Budget Beheren",
    metaDescription: "Plan uw maandelijks budget. 50/30/20 regel voor uitgaven. Vaste kosten, sparen en discretionaire uitgaven optimaliseren in België."
  },
  "belastingplanning-calculator": {
    slug: "belastingplanning-calculator",
    metaTitle: "Belastingplanning Calculator België - Fiscaal Optimaliseren",
    metaDescription: "Optimaliseer uw Belgische belastingen. Pensioensparen, groepsverzekering en fiscale aftrekposten. Bespaar tot €1.000+ per jaar."
  },
  "levensverzekeraar-calculator": {
    slug: "levensverzekeraar-calculator",
    metaTitle: "Levensverzekering Calculator België - Tak 21 & Tak 23",
    metaDescription: "Bereken levensverzekering opbrengst. Tak 21 (gewaarborgd) vs Tak 23 (beleggingsverzekering). Vergelijk rendementen en belastingvoordelen."
  },
  "eindejaarsbonus-calculator": {
    slug: "eindejaarsbonus-calculator",
    metaTitle: "Eindejaarsbonus Calculator België - 13de Maand Optimaliseren",
    metaDescription: "Bereken netto eindejaarsbonus na belastingen. 13de maand optimalisatie en belasting in België. Maximaliseer uw eindejaarspremie."
  },
  "inflatie-calculator-belgie": {
    slug: "inflatie-calculator-belgie",
    metaTitle: `Inflatie Calculator België ${getCurrentYear()}: Bescherm Je Spaargeld`,
    metaDescription: `Bereken hoe inflatie je spaargeld aantast + tips om je koopkracht te beschermen. Actueel voor ${getCurrentYear()} – gratis tool België.`
  },
  "geldontwaarding-calculator": {
    slug: "geldontwaarding-calculator",
    metaTitle: "Geldontwaarding Calculator - Vermogen Erosie Berekenen",
    metaDescription: "Bereken geldontwaarding door inflatie. Zie hoe uw spaargeld in waarde daalt. Bescherm vermogen tegen inflatie in België."
  },
  "reele-rente-berekenen": {
    slug: "reele-rente-berekenen",
    pageTitle: "Reële Rente Berekenen",
    metaTitle: "Reële Rente Berekenen - Nominale Rente Min Inflatie",
    metaDescription: "Bereken reële rente (nominaal minus inflatie). Ontdek of uw spaarrente inflatie verslaat. Realistisch rendement berekenen voor België.",
    faqs: reeleRenteBerekenenContent.faqs,
    educationalSections: reeleRenteBerekenenContent.sections
  },
  "rentevoet-vergelijker": {
    slug: "rentevoet-vergelijker",
    metaTitle: `Rentevoet Vergelijker België - Vast vs Variabel ${getCurrentYear()}`,
    metaDescription: "Vergelijk vaste en variabele rentevoeten. Spaarrentes, hypotheekrentes en beleggingsrendementen in België. Vind de beste rente."
  },
  "over-ons": {
    slug: "over-ons",
    metaTitle: "Over Interesten.be - Financiële Calculators België",
    metaDescription: "Interesten.be helpt u slimme financiële beslissingen nemen met gratis calculators voor sparen, lenen, beleggen en planning in België."
  },
  "contact": {
    slug: "contact",
    pageTitle: "Contact - Interesten.be",
    metaTitle: "Contact Interesten.be - Vragen, Feedback & Samenwerking",
    metaDescription: "Neem contact op met Interesten.be. Stuur uw vraag, feedback of samenwerkingsvoorstel naar info@interesten.be. Wij beantwoorden alle berichten binnen 2 werkdagen."
  },
  "privacy": {
    slug: "privacy",
    metaTitle: "Privacy & Cookie Policy - Interesten.be",
    metaDescription: "Privacy- en cookiebeleid van Interesten.be: welke data we verzamelen, hoe Consent Mode v2 werkt en welke rechten u heeft onder de AVG/GDPR in België."
  },
  "privacybeleid": {
    slug: "privacybeleid",
    metaTitle: "Privacybeleid - Interesten.be",
    metaDescription: "Hoe Hazier persoonsgegevens verwerkt op Interesten.be. AVG/GDPR-conform, met verwerkingsverantwoordelijke, doeleinden, cookies en uw rechten."
  },
  "voorwaarden": {
    slug: "voorwaarden",
    metaTitle: "Algemene Voorwaarden - Interesten.be",
    metaDescription: "Algemene voorwaarden en disclaimer van Interesten.be: hoe u onze gratis Belgische calculators mag gebruiken, aansprakelijkheid en bron-attributie van rentegegevens."
  },
  "sitemap": {
    slug: "sitemap",
    metaTitle: "Sitemap - Alle Calculators Interesten.be",
    metaDescription: "Sitemap met alle 60+ financiële calculators op Interesten.be: spaartools, kredietsimulators, beleggingscalculators en planningstools voor België in één overzicht."
  },
  "sparen": {
    slug: "sparen",
    metaTitle: "Spaarrekening Calculators België - 11+ Gratis Tools",
    metaDescription: `Vergelijk spaarrentes (basis + getrouwheidspremie tot 2,85%), deposito's, kasbons en kinderrekeningen in België. 11+ gratis spaarcalculators ${getCurrentYear()}.`
  },
  "lenen": {
    slug: "lenen",
    metaTitle: "Lening Calculators België - Hypotheek & Krediet",
    metaDescription: `Bereken hypotheek, autolening of persoonlijke lening in België. 16+ kredietsimulators met actuele rentes, TAEG en aflossingsplan – gratis ${getCurrentYear()}.`
  },
  "beleggen": {
    slug: "beleggen",
    metaTitle: "Beleggings Calculators België - Aandelen, ETF, Crypto",
    metaDescription: `Bereken rendement op aandelen, ETF's, obligaties, crypto en REITs. 13+ gratis beleggingstools met Belgische fiscaliteit (RV, TOB) – ${getCurrentYear()}.`
  },
  "planning": {
    slug: "planning",
    metaTitle: "Financiële Planning Tools - Pensioen & FIRE",
    metaDescription: `Plan uw pensioen, FIRE-doel, noodfonds en budget met 12+ gratis tools voor België. Belastingplanning en inflatiebescherming voor ${getCurrentYear()}.`
  },
  "overige": {
    slug: "overige",
    metaTitle: "Informatie - Interesten.be",
    metaDescription: "Over Interesten.be, privacybeleid, algemene voorwaarden en sitemap. Meer info over hoe wij Belgen helpen met gratis financiële calculators en transparante data."
  },
  "blog": {
    slug: "blog",
    metaTitle: "Financieel Advies Blog België | Sparen, Lenen & Beleggen",
    metaDescription: "Expert artikelen over sparen, lenen, beleggen en financiële planning in België. Praktische tips, strategieën en gidsen voor betere financiële beslissingen."
  },
  "nieuws": {
    slug: "nieuws",
    metaTitle: "Financieel Nieuws België | Interesten.be",
    metaDescription: `Belgisch financieel nieuws ${getCurrentDateLabel()}: spaarrentes, hypotheekrentes, ECB-beslissingen, beleggingsupdates en fiscaal nieuws – kort, neutraal en bronvermeld.`
  }
};

export function getSlugFromUrl(url: string): string {
  const cleanUrl = url.split('?')[0].split('#')[0];
  
  if (cleanUrl === '/' || cleanUrl === '') {
    return 'home';
  }
  
  const segments = cleanUrl.split('/').filter(Boolean);
  
  if (segments.length === 0) {
    return 'home';
  }
  
  return segments[segments.length - 1];
}

// Resolves /blog/<slug> nested routes that single-segment getSlugFromUrl misses.
// Known slug -> SeoConfig from post.seo.*; unknown slug -> noindex,nofollow shell.
function getBlogPostSeoFromUrl(url: string): SeoConfig | null {
  const cleanUrl = url.split('?')[0].split('#')[0];
  const segments = cleanUrl.split('/').filter(Boolean);
  if (segments.length !== 2 || segments[0] !== 'blog') {
    return null;
  }
  const postSlug = segments[1];
  const post = blogPosts.find(p => p.slug === postSlug);
  if (!post) {
    return {
      slug: 'blog-not-found',
      metaTitle: 'Blog niet gevonden | Interesten.be',
      metaDescription: 'De blogpost die u zoekt bestaat niet of is verplaatst. Bekijk al onze artikelen op de Interesten.be blog.',
      robots: 'noindex,nofollow',
    };
  }
  return {
    slug: `blog/${post.slug}`,
    pageTitle: post.title,
    metaTitle: post.seo.title,
    metaDescription: post.seo.description,
    ogImage: post.image,
  };
}

export function getSeoConfigForUrl(url: string): SeoConfig | null {
  const blogConfig = getBlogPostSeoFromUrl(url);
  if (blogConfig) return blogConfig;
  const slug = getSlugFromUrl(url);
  return seoConfigs[slug] || null;
}

function slugToPrettyName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function escapeJsonForHtml(json: string): string {
  return json
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/'/g, '\\u0027');
}

function generateBreadcrumbSchema(url: string, seoConfig: SeoConfig): object {
  const cleanUrl = url.split('?')[0].split('#')[0];
  const slug = seoConfig.slug;
  const category = slugToCategory[slug];

  const breadcrumbItems: { "@type": string; position: number; name: string; item: string }[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://interesten.be/"
    }
  ];

  if (slug.startsWith('blog/')) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://interesten.be/blog"
    });
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: seoConfig.pageTitle || seoConfig.metaTitle.split(' | ')[0],
      item: `https://interesten.be${cleanUrl}`
    });
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    };
  }

  if (category && category !== 'Home' && slug !== 'home') {
    const isCategoryPage = ['sparen', 'lenen', 'beleggen', 'planning', 'overige'].includes(slug);
    
    if (!isCategoryPage) {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 2,
        name: categoryToPrettyName[category],
        item: `https://interesten.be${categoryToPath[category]}`
      });
      
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 3,
        name: slugToPrettyName(slug),
        item: `https://interesten.be${cleanUrl}`
      });
    } else {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 2,
        name: categoryToPrettyName[category],
        item: `https://interesten.be${cleanUrl}`
      });
    }
  } else if (slug !== 'home') {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: slugToPrettyName(slug),
      item: `https://interesten.be${cleanUrl}`
    });
  }
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };
}

function generateWebSiteSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Interesten.be",
    "url": "https://interesten.be",
    "description": "Gratis Belgische financiële calculators voor sparen, lenen en beleggen. Bereken spaarrente, hypotheek, compound interest en meer.",
    "inLanguage": "nl-BE",
    "publisher": {
      "@type": "Organization",
      "name": "Interesten.be",
      "url": "https://interesten.be"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://interesten.be/sitemap",
      "query-input": "required name=search_term_string"
    }
  };
}

function generateCalculatorSchema(seoConfig: SeoConfig, url: string): object | null {
  const slug = seoConfig.slug;
  const category = slugToCategory[slug];
  
  const nonCalculatorSlugs = ['home', 'over-ons', 'privacy', 'privacybeleid', 'voorwaarden', 'sitemap', 'blog', 'nieuws', 'sparen', 'lenen', 'beleggen', 'planning', 'overige'];
  if (!category || nonCalculatorSlugs.includes(slug)) {
    return null;
  }
  
  const cleanUrl = url.split('?')[0].split('#')[0];
  
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": seoConfig.metaTitle.split(' - ')[0] || seoConfig.metaTitle,
    "description": seoConfig.metaDescription,
    "url": `https://interesten.be${cleanUrl}`,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "inLanguage": "nl-BE",
    "provider": {
      "@type": "Organization",
      "name": "Interesten.be",
      "url": "https://interesten.be"
    }
  };
}

function generateFaqPageSchema(seoConfig: SeoConfig): object | null {
  if (!seoConfig.faqs || seoConfig.faqs.length === 0) {
    return null;
  }
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": seoConfig.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

function escapeHtmlAttribute(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Extracts the first <source type="image/avif" srcset="..."> URL from SSR'd
// hero markup so we can emit a matching <link rel="preload"> in <head>.
// Returns null when the hero <picture> isn't present in the HTML (runtime
// fallback path, or non-home routes).
function extractHeroAvifUrl(html: string): string | null {
  const match = html.match(
    /<source[^>]*\stype="image\/avif"[^>]*\ssrcset="([^"]+)"/i,
  );
  if (!match) return null;
  // srcset may be a comma-separated list (e.g. "url 1x, url 2x"); preload's
  // single-href form takes the first URL.
  return match[1].split(',')[0].trim().split(/\s+/)[0];
}

// Derive a unique meta description from the URL when no explicit seoConfig
// matches. Without this, every off-map route (admin pages, /blog/<unknown>,
// stale Bing-indexed paths) inherits the index.html default and shows up in
// Bing Webmaster Tools as "identical meta descriptions" (CAL-157, 38 pages).
// The slug is humanized so each route gets a distinct, content-aware string.
function deriveFallbackSeo(url: string): { metaTitle: string; metaDescription: string } {
  const cleanUrl = url.split('?')[0].split('#')[0];
  const segments = cleanUrl.split('/').filter(Boolean);
  const lastSeg = segments[segments.length - 1] || 'home';
  const pretty = lastSeg
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  const parentSeg = segments.length > 1 ? segments[0] : '';
  const parentPretty = parentSeg
    ? parentSeg.charAt(0).toUpperCase() + parentSeg.slice(1)
    : '';
  const context = parentPretty ? ` (${parentPretty})` : '';
  return {
    metaTitle: `${pretty} - Interesten.be${context ? ' ' + context : ''}`,
    metaDescription:
      `${pretty}${context} op Interesten.be: gratis Belgische rekentool met actuele cijfers, ` +
      `transparante formules en bronvermelding voor sparen, lenen en beleggen ${getCurrentYear()}.`,
  };
}

export function injectSeoMeta(html: string, url: string): string {
  const seoConfig = getSeoConfigForUrl(url);
  const fallback = seoConfig ? null : deriveFallbackSeo(url);

  let result = html;
  const escapedTitle = escapeHtmlAttribute(
    seoConfig ? seoConfig.metaTitle : fallback!.metaTitle,
  );
  const escapedDescription = escapeHtmlAttribute(
    seoConfig ? seoConfig.metaDescription : fallback!.metaDescription,
  );
  
  const titleRegex = /<title>[^<]*<\/title>/;
  if (titleRegex.test(result)) {
    result = result.replace(titleRegex, `<title>${escapedTitle}</title>`);
  } else if (result.includes('<head>')) {
    result = result.replace('<head>', `<head>\n    <title>${escapedTitle}</title>`);
  }
  
  const descriptionRegex = /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i;
  if (descriptionRegex.test(result)) {
    result = result.replace(descriptionRegex, `<meta name="description" content="${escapedDescription}" />`);
  } else if (result.includes('</head>')) {
    result = result.replace('</head>', `  <meta name="description" content="${escapedDescription}" />\n  </head>`);
  }
  
  const ogTitleRegex = /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i;
  if (ogTitleRegex.test(result)) {
    result = result.replace(ogTitleRegex, `<meta property="og:title" content="${escapedTitle}" />`);
  }
  
  const ogDescRegex = /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i;
  if (ogDescRegex.test(result)) {
    result = result.replace(ogDescRegex, `<meta property="og:description" content="${escapedDescription}" />`);
  }
  
  const twitterTitleRegex = /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i;
  if (twitterTitleRegex.test(result)) {
    result = result.replace(twitterTitleRegex, `<meta name="twitter:title" content="${escapedTitle}" />`);
  }
  
  const twitterDescRegex = /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i;
  if (twitterDescRegex.test(result)) {
    result = result.replace(twitterDescRegex, `<meta name="twitter:description" content="${escapedDescription}" />`);
  }

  if (seoConfig.robots) {
    const escapedRobots = escapeHtmlAttribute(seoConfig.robots);
    const robotsRegex = /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i;
    if (robotsRegex.test(result)) {
      result = result.replace(robotsRegex, `<meta name="robots" content="${escapedRobots}" />`);
    } else if (result.includes('</head>')) {
      result = result.replace('</head>', `  <meta name="robots" content="${escapedRobots}" />\n  </head>`);
    }
  }

  if (seoConfig.ogImage) {
    const escapedImage = escapeHtmlAttribute(seoConfig.ogImage);
    const ogImageRegex = /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i;
    if (ogImageRegex.test(result)) {
      result = result.replace(ogImageRegex, `<meta property="og:image" content="${escapedImage}" />`);
    }
    const twitterImageRegex = /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i;
    if (twitterImageRegex.test(result)) {
      result = result.replace(twitterImageRegex, `<meta name="twitter:image" content="${escapedImage}" />`);
    }
  }

  const cleanPath = url.split('?')[0].split('#')[0];
  const canonicalUrl = cleanPath === '/' || cleanPath === '' 
    ? 'https://interesten.be/' 
    : `https://interesten.be${cleanPath}`;
  
  const existingCanonicalRegex = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i;
  if (existingCanonicalRegex.test(result)) {
    result = result.replace(existingCanonicalRegex, `<link rel="canonical" href="${canonicalUrl}" />`);
  } else if (result.includes('</head>')) {
    result = result.replace(
      '</head>',
      `<link rel="canonical" href="${canonicalUrl}" />\n  </head>`
    );
  }
  
  // Off-map routes (/admin, /blog/<unknown>, etc.): unique meta is now in
  // place — skip the structured-data, hero-preload and SSR-content branches
  // since those only apply to known calculator/silo pages.
  if (!seoConfig) {
    return result;
  }

  // Hero LCP preload — only on `/`, where the hero <picture> is SSR'd. The
  // CSS background variant we replaced couldn't carry fetchpriority; pairing a
  // preload hint with the new <img fetchPriority="high"> moves the AVIF off
  // the default-priority queue and into the LCP path (priorityHinted=true).
  if (seoConfig.slug === 'home') {
    const heroAvifUrl = extractHeroAvifUrl(result);
    if (heroAvifUrl && result.includes('</head>')) {
      const escapedHref = escapeHtmlAttribute(heroAvifUrl);
      const preloadTag = `<link rel="preload" as="image" href="${escapedHref}" type="image/avif" fetchpriority="high" />`;
      if (!result.includes(preloadTag)) {
        result = result.replace('</head>', `  ${preloadTag}\n  </head>`);
      }
    }
  }

  const structuredDataScripts: string[] = [];

  if (seoConfig.slug === 'home') {
    const websiteJson = escapeJsonForHtml(JSON.stringify(generateWebSiteSchema(), null, 2));
    structuredDataScripts.push(`<script type="application/ld+json">\n${websiteJson}\n    </script>`);
  } else {
    const breadcrumbJson = escapeJsonForHtml(JSON.stringify(generateBreadcrumbSchema(url, seoConfig), null, 2));
    structuredDataScripts.push(`<script type="application/ld+json">\n${breadcrumbJson}\n    </script>`);

    const calculatorSchema = generateCalculatorSchema(seoConfig, url);
    if (calculatorSchema) {
      const calculatorJson = escapeJsonForHtml(JSON.stringify(calculatorSchema, null, 2));
      structuredDataScripts.push(`<script type="application/ld+json">\n${calculatorJson}\n    </script>`);
    }

    const faqPageSchema = generateFaqPageSchema(seoConfig);
    if (faqPageSchema) {
      const faqJson = escapeJsonForHtml(JSON.stringify(faqPageSchema, null, 2));
      structuredDataScripts.push(`<script type="application/ld+json">\n${faqJson}\n    </script>`);
    }
  }

  if (structuredDataScripts.length > 0) {
    const existingLdJsonRegex = /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/;
    if (existingLdJsonRegex.test(result)) {
      result = result.replace(existingLdJsonRegex, structuredDataScripts.join('\n    '));
    } else if (result.includes('</head>')) {
      result = result.replace(
        '</head>',
        `${structuredDataScripts.join('\n    ')}\n  </head>`
      );
    }
  }

  // Inject static content into <div id="root"> for SEO crawlers
  const ssrContent = generateSSRContent(seoConfig, url);
  if (ssrContent) {
    result = result.replace(
      '<div id="root"></div>',
      `<div id="root">${ssrContent}</div>`
    );
  }

  return result;
}

// CAL-152: SSR skeleton card so the LCP candidate paints inline with FCP
// instead of waiting for React hydration. Heading+subtitle text block is
// sized (~62k px²) to beat the post-hydration React hero h1 (~41k px²) so
// LCP locks at FCP ~1.7s on Lighthouse mobile.
const SKELETON_SPEC: Record<string, { heading: string; subtitle: string; minHeight: number }> = {
  'doelspaarcalculator': {
    heading: 'Doelspaarcalculator — Beheer al uw spaardoelen',
    subtitle: 'Plan en beheer meerdere spaardoelen tegelijk. Krijg inzicht in benodigde maandelijkse bedragen, prioriteiten en realistische tijdslijnen voor al uw financiële doelen.',
    minHeight: 1300,
  },
  'noodfonds-calculator': {
    heading: 'Noodfonds Calculator — Bereken uw financiële buffer',
    subtitle: 'Bereken hoeveel u moet sparen als noodfonds gebaseerd op uw uitgaven, inkomensituatie en persoonlijke omstandigheden.',
    minHeight: 1500,
  },
};

function renderCalcSkeleton(slug: string): string {
  const spec = SKELETON_SPEC[slug];
  if (!spec) {
    return '<p style="color:#666;">Loading calculator...</p>';
  }
  return `
    <div style="background:#fff;border:1px solid #e5e7eb;border-radius:0.5rem;padding:1.5rem;min-height:${spec.minHeight}px;box-shadow:0 1px 2px rgba(0,0,0,0.05);">
      <h2 style="font-size:1.75rem;font-weight:600;line-height:1.3;color:#1a1a1a;margin:0 0 0.75rem;">${escapeHtmlAttribute(spec.heading)}</h2>
      <p style="font-size:1.125rem;line-height:1.6;color:#4a4a4a;margin:0 0 1.5rem;">${escapeHtmlAttribute(spec.subtitle)}</p>
      <div style="display:flex;flex-direction:column;gap:1rem;">
        <div style="height:2.5rem;background:#f3f4f6;border-radius:0.375rem;"></div>
        <div style="height:2.5rem;background:#f3f4f6;border-radius:0.375rem;width:80%;"></div>
        <div style="height:2.5rem;background:#f3f4f6;border-radius:0.375rem;"></div>
        <div style="height:2.5rem;background:#f3f4f6;border-radius:0.375rem;width:60%;"></div>
        <div style="height:2.5rem;background:#f3f4f6;border-radius:0.375rem;"></div>
        <div style="height:2.5rem;background:#f3f4f6;border-radius:0.375rem;width:75%;"></div>
        <div style="height:3rem;background:#dbeafe;border-radius:0.375rem;width:50%;margin-top:0.5rem;"></div>
      </div>
    </div>`;
}

function generateSSRContent(seoConfig: SeoConfig, url: string): string {
  const slug = seoConfig.slug;
  const category = slugToCategory[slug];
  const categoryName = category ? categoryToPrettyName[category] : '';
  
  // Generate breadcrumb HTML
  const cleanPath = url.split('?')[0].split('#')[0];
  const isBlogPost = slug.startsWith('blog/');
  let breadcrumbHtml = '<nav aria-label="breadcrumb" style="margin-bottom:1rem;font-size:0.875rem;color:#666;">';
  breadcrumbHtml += '<a href="/" style="color:#2563eb;text-decoration:none;">Home</a>';

  if (isBlogPost) {
    breadcrumbHtml += ' &gt; <a href="/blog" style="color:#2563eb;text-decoration:none;">Blog</a>';
    breadcrumbHtml += ` &gt; <span>${escapeHtmlAttribute(seoConfig.pageTitle || seoConfig.metaTitle.split(' | ')[0])}</span>`;
  } else {
    if (category && category !== 'Home' && category !== 'Overige' && slug !== category.toLowerCase()) {
      breadcrumbHtml += ` &gt; <a href="/${category.toLowerCase()}" style="color:#2563eb;text-decoration:none;">${categoryName}</a>`;
    }
    if (slug !== 'home') {
      breadcrumbHtml += ` &gt; <span>${seoConfig.metaTitle.split(' - ')[0].split(' | ')[0]}</span>`;
    }
  }
  breadcrumbHtml += '</nav>';
  
  // Main heading from meta title
  const h1Title = seoConfig.pageTitle || seoConfig.metaTitle.split(' - ')[0].split(' | ')[0];
  
  // Build static content shell
  let content = `
    <div style="max-width:1200px;margin:0 auto;padding:2rem;font-family:system-ui,-apple-system,sans-serif;">
      ${breadcrumbHtml}
      <header style="margin-bottom:2rem;">
        <h1 style="font-size:2rem;font-weight:700;color:#1a1a1a;margin-bottom:1rem;">${escapeHtmlAttribute(h1Title)}</h1>
        <p style="font-size:1.125rem;color:#4a4a4a;line-height:1.6;">${escapeHtmlAttribute(seoConfig.metaDescription)}</p>
      </header>
      <main>
        ${renderCalcSkeleton(slug)}
      </main>`;

  // Home + category pages: render a crawlable nav with links to each sub-calculator
  // so the raw HTML satisfies the SEO acceptance criterion (links before JS runs).
  const isHub = slug === 'home';
  const isCategoryHub = (['sparen', 'lenen', 'beleggen', 'planning'] as const).includes(slug as any);
  if (isHub || isCategoryHub) {
    const categoriesToRender: CalculatorCategory[] = isHub
      ? ['Sparen', 'Lenen', 'Beleggen', 'Planning']
      : [capitalizeFirst(slug) as CalculatorCategory];

    content += `
      <nav aria-label="Alle calculators" style="margin-top:2.5rem;">`;
    for (const cat of categoriesToRender) {
      const items = calculatorRegistry.filter(c => c.category === cat);
      if (items.length === 0) continue;
      content += `
        <section style="margin-bottom:2rem;">
          <h2 style="font-size:1.25rem;font-weight:600;margin-bottom:0.75rem;">
            <a href="/${cat.toLowerCase()}" style="color:#1a1a1a;text-decoration:none;">${cat}</a>
          </h2>
          <ul style="list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:0.5rem 1rem;">`;
      for (const item of items) {
        content += `
            <li><a href="${escapeHtmlAttribute(item.url)}" style="color:#2563eb;text-decoration:none;">${escapeHtmlAttribute(item.title)}</a></li>`;
      }
      content += `
          </ul>
        </section>`;
    }
    content += `
      </nav>`;
  }

  // Add educational deep-dive sections (CAL-138) so raw HTML reaches the
  // ≥500-word body target for SEO crawlers before React hydrates.
  if (seoConfig.educationalSections && seoConfig.educationalSections.length > 0) {
    content += `
      <section style="margin-top:3rem;">`;
    for (const section of seoConfig.educationalSections) {
      content += `
        <h2 style="font-size:1.5rem;font-weight:600;margin-bottom:1rem;">${escapeHtmlAttribute(section.heading)}</h2>`;
      for (const block of section.blocks) {
        if (block.kind === 'p') {
          content += `
        <p style="color:#4a4a4a;line-height:1.6;margin-bottom:1rem;">${escapeHtmlAttribute(block.text)}</p>`;
        } else if (block.kind === 'formula') {
          content += `
        <p style="background:#f3f4f6;padding:0.75rem 1rem;border-radius:0.375rem;font-family:ui-monospace,monospace;font-size:0.875rem;line-height:1.5;margin-bottom:1rem;">${escapeHtmlAttribute(block.text)}</p>`;
        } else {
          content += `
        <ul style="list-style:disc;padding-left:1.5rem;color:#4a4a4a;line-height:1.6;margin-bottom:1rem;">`;
          for (const item of block.items) {
            content += `
          <li>${escapeHtmlAttribute(item)}</li>`;
          }
          content += `
        </ul>`;
        }
      }
    }
    content += '</section>';
  }

  // Add FAQ section if available
  if (seoConfig.faqs && seoConfig.faqs.length > 0) {
    content += `
      <section style="margin-top:3rem;">
        <h2 style="font-size:1.5rem;font-weight:600;margin-bottom:1.5rem;">Veelgestelde Vragen</h2>`;
    
    for (const faq of seoConfig.faqs) {
      content += `
        <div style="margin-bottom:1.5rem;">
          <h3 style="font-size:1.125rem;font-weight:600;margin-bottom:0.5rem;">${escapeHtmlAttribute(faq.question)}</h3>
          <p style="color:#4a4a4a;line-height:1.6;">${escapeHtmlAttribute(faq.answer)}</p>
        </div>`;
    }
    content += '</section>';
  }
  
  content += `
      <footer style="margin-top:3rem;padding-top:2rem;border-top:1px solid #e5e5e5;color:#666;font-size:0.875rem;">
        <p>&copy; ${getCurrentYear()} Interesten.be - Gratis Belgische financiële calculators</p>
      </footer>
    </div>`;
  
  return content;
}
