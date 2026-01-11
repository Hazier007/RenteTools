export type CalculatorCategory = "Sparen" | "Lenen" | "Beleggen" | "Planning";

export interface Calculator {
  slug: string;
  title: string;
  description: string;
  category: CalculatorCategory;
  url: string;
  keywords: string[];
}

function normalizeDiacritics(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const commonWords = new Set([
  'de', 'het', 'een', 'van', 'in', 'op', 'en', 'voor', 'met', 'is', 'zijn', 'te', 'u', 'uw',
  'aan', 'tot', 'kan', 'alle', 'dit', 'deze', 'dat', 'bij', 'zoals', 'naar', 'om', 'ook',
  'of', 'als', 'meer', 'over', 'andere', 'moet', 'worden', 'heeft', 'na', 'door',
  'zo', 'tussen', 'onder', 'uit', 'tegen', 'maar', 'wel', 'niet', 'geen', 'nog'
]);

function extractKeywords(title: string, description: string): string[] {
  const text = normalizeDiacritics(`${title} ${description}`.toLowerCase());
  const words = text
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => 
      word.length > 2 && 
      !commonWords.has(word) &&
      !/^\d+$/.test(word)
    );

  return Array.from(new Set(words));
}

export const calculatorRegistry: Calculator[] = [
  {
    slug: "hoogste-spaarrente-belgie",
    title: "Hoogste Spaarrente België",
    description: "Vind de hoogste spaarrente in België. Vergelijk basisrente + getrouwheidspremie van alle banken. Actuele tarieven tot 2,5% in 2026.",
    category: "Sparen",
    url: "/sparen/hoogste-spaarrente-belgie",
    keywords: extractKeywords(
      "Hoogste Spaarrente België",
      "Vind de hoogste spaarrente in België. Vergelijk basisrente + getrouwheidspremie van alle banken. Actuele tarieven tot 2,5% in 2026."
    )
  },
  {
    slug: "deposito-calculator",
    title: "Deposito Calculator",
    description: "Bereken uw deposito opbrengst in België. Vergelijk termijnrekening tarieven van 1,5% tot 3,5%. Inclusief roerende voorheffing berekening.",
    category: "Sparen",
    url: "/sparen/deposito-calculator",
    keywords: extractKeywords(
      "Deposito Calculator",
      "Bereken uw deposito opbrengst in België. Vergelijk termijnrekening tarieven van 1,5% tot 3,5%. Inclusief roerende voorheffing berekening."
    )
  },
  {
    slug: "samengestelde-interest-berekenen",
    title: "Samengestelde Interest Berekenen",
    description: "Bereken samengestelde interest op uw spaargeld. Zie hoe uw vermogen exponentieel groeit met compound interest. Gratis calculator voor België.",
    category: "Sparen",
    url: "/sparen/samengestelde-interest-berekenen",
    keywords: extractKeywords(
      "Samengestelde Interest Berekenen",
      "Bereken samengestelde interest op uw spaargeld. Zie hoe uw vermogen exponentieel groeit met compound interest. Gratis calculator voor België."
    )
  },
  {
    slug: "doelspaarcalculator",
    title: "Doelspaar Calculator",
    description: "Plan al uw spaardoelen tegelijk. Bereken hoeveel u maandelijks moet sparen voor auto, vakantie, noodfonds en meer. Smart goal planning.",
    category: "Sparen",
    url: "/sparen/doelspaarcalculator",
    keywords: extractKeywords(
      "Doelspaar Calculator",
      "Plan al uw spaardoelen tegelijk. Bereken hoeveel u maandelijks moet sparen voor auto, vakantie, noodfonds en meer. Smart goal planning."
    )
  },
  {
    slug: "spaarrekening-vergelijker",
    title: "Spaarrekening Vergelijker",
    description: "Vergelijk alle Belgische spaarrekeningen. Basisrente, getrouwheidspremie en voorwaarden van alle banken. Vind de beste spaarrente 2026.",
    category: "Sparen",
    url: "/sparen/spaarrekening-vergelijker",
    keywords: extractKeywords(
      "Spaarrekening Vergelijker",
      "Vergelijk alle Belgische spaarrekeningen. Basisrente, getrouwheidspremie en voorwaarden van alle banken. Vind de beste spaarrente 2026."
    )
  },
  {
    slug: "kinderrekening-calculator",
    title: "Kinderrekening Calculator",
    description: "Bereken hoeveel u moet sparen voor uw kinderen. Kinderrekening rentes tot 2,5% in België. Start vandaag met sparen voor hun toekomst.",
    category: "Sparen",
    url: "/sparen/kinderrekening-calculator",
    keywords: extractKeywords(
      "Kinderrekening Calculator",
      "Bereken hoeveel u moet sparen voor uw kinderen. Kinderrekening rentes tot 2,5% in België. Start vandaag met sparen voor hun toekomst."
    )
  },
  {
    slug: "kasbon-calculator",
    title: "Kasbon Calculator",
    description: "Bereken rendement van kasbons en staatsbons in België. Vergelijk looptijden van 1-10 jaar. Vaste rente en belastingvoordelen berekenen.",
    category: "Sparen",
    url: "/sparen/kasbon-calculator",
    keywords: extractKeywords(
      "Kasbon Calculator",
      "Bereken rendement van kasbons en staatsbons in België. Vergelijk looptijden van 1-10 jaar. Vaste rente en belastingvoordelen berekenen."
    )
  },
  {
    slug: "termijnrekening-calculator",
    title: "Termijnrekening Calculator",
    description: "Bereken uw termijnrekening opbrengst. Vaste rente tot 3,5% op termijndeposito's in België. Vergelijk looptijden van 1-12 maanden.",
    category: "Sparen",
    url: "/sparen/termijnrekening-calculator",
    keywords: extractKeywords(
      "Termijnrekening Calculator",
      "Bereken uw termijnrekening opbrengst. Vaste rente tot 3,5% op termijndeposito's in België. Vergelijk looptijden van 1-12 maanden."
    )
  },
  {
    slug: "groepssparen-calculator",
    title: "Groepssparen Calculator",
    description: "Bereken uw groepsverzekering opbrengst. Werkgeversbijdrage + belastingvoordeel tot 30%. Optimaliseer uw aanvullend pensioen in België.",
    category: "Sparen",
    url: "/sparen/groepssparen-calculator",
    keywords: extractKeywords(
      "Groepssparen Calculator",
      "Bereken uw groepsverzekering opbrengst. Werkgeversbijdrage + belastingvoordeel tot 30%. Optimaliseer uw aanvullend pensioen in België."
    )
  },
  {
    slug: "loyalty-bonus-calculator",
    title: "Getrouwheidspremie Calculator",
    description: "Maximaliseer uw getrouwheidspremie op spaarrekeningen. Bereken wanneer u uw loyalty bonus krijgt. Optimaliseer uw spaarstrategie België.",
    category: "Sparen",
    url: "/sparen/loyalty-bonus-calculator",
    keywords: extractKeywords(
      "Getrouwheidspremie Calculator",
      "Maximaliseer uw getrouwheidspremie op spaarrekeningen. Bereken wanneer u uw loyalty bonus krijgt. Optimaliseer uw spaarstrategie België."
    )
  },
  {
    slug: "vakantiegeld-sparen-calculator",
    title: "Vakantiegeld Sparen Calculator",
    description: "Spaar slim voor uw vakantie. Bereken hoeveel u maandelijks moet sparen voor uw droomreis. Vakantiebudget planner voor België.",
    category: "Sparen",
    url: "/sparen/vakantiegeld-sparen-calculator",
    keywords: extractKeywords(
      "Vakantiegeld Sparen Calculator",
      "Spaar slim voor uw vakantie. Bereken hoeveel u maandelijks moet sparen voor uw droomreis. Vakantiebudget planner voor België."
    )
  },
  {
    slug: "hypothecaire-lening-berekenen",
    title: "Hypothecaire Lening Berekenen",
    description: "Bereken uw hypotheek maandlast en totale kosten. Vaste en variabele rente vanaf 2,5%. Inclusief notaris en registratierechten.",
    category: "Lenen",
    url: "/lenen/hypothecaire-lening-berekenen",
    keywords: extractKeywords(
      "Hypothecaire Lening Berekenen",
      "Bereken uw hypotheek maandlast en totale kosten. Vaste en variabele rente vanaf 2,5%. Inclusief notaris en registratierechten."
    )
  },
  {
    slug: "woningkrediet-simulator",
    title: "Woningkrediet Simulator",
    description: "Simuleer uw woningkrediet in België. Bereken leencapaciteit, maandlast en vergelijk vaste vs variabele rente. Tot 90% LTV mogelijk.",
    category: "Lenen",
    url: "/lenen/woningkrediet-simulator",
    keywords: extractKeywords(
      "Woningkrediet Simulator",
      "Simuleer uw woningkrediet in België. Bereken leencapaciteit, maandlast en vergelijk vaste vs variabele rente. Tot 90% LTV mogelijk."
    )
  },
  {
    slug: "persoonlijke-lening-berekenen",
    title: "Persoonlijke Lening Berekenen",
    description: "Bereken uw persoonlijke lening kosten. Tarieven van 3-8% op consumptieleningen in België. Vergelijk maandlasten en totale kosten.",
    category: "Lenen",
    url: "/lenen/persoonlijke-lening-berekenen",
    keywords: extractKeywords(
      "Persoonlijke Lening Berekenen",
      "Bereken uw persoonlijke lening kosten. Tarieven van 3-8% op consumptieleningen in België. Vergelijk maandlasten en totale kosten."
    )
  },
  {
    slug: "autolening-berekenen",
    title: "Autolening Berekenen",
    description: "Bereken uw autolening met rentes vanaf 2,9%. Vergelijk autokredieten en financieringsopties in België. Bereken maandlast en TAEG.",
    category: "Lenen",
    url: "/lenen/autolening-berekenen",
    keywords: extractKeywords(
      "Autolening Berekenen",
      "Bereken uw autolening met rentes vanaf 2,9%. Vergelijk autokredieten en financieringsopties in België. Bereken maandlast en TAEG."
    )
  },
  {
    slug: "lening-herfinancieren",
    title: "Lening Herfinancieren",
    description: "Bereken of herfinancieren voordelig is. Vergelijk nieuwe rente met vervroegde terugbetalingskosten. Bespaar tot €10.000+ in België.",
    category: "Lenen",
    url: "/lenen/lening-herfinancieren",
    keywords: extractKeywords(
      "Lening Herfinancieren",
      "Bereken of herfinancieren voordelig is. Vergelijk nieuwe rente met vervroegde terugbetalingskosten. Bespaar tot €10.000+ in België."
    )
  },
  {
    slug: "schuldenconsolidatie-calculator",
    title: "Schuldenconsolidatie Calculator",
    description: "Voeg al uw leningen samen tot één lening. Bereken besparing en lagere maandlast. Schuldhulp en consolidatie oplossingen voor België.",
    category: "Lenen",
    url: "/lenen/schuldenconsolidatie-calculator",
    keywords: extractKeywords(
      "Schuldenconsolidatie Calculator",
      "Voeg al uw leningen samen tot één lening. Bereken besparing en lagere maandlast. Schuldhulp en consolidatie oplossingen voor België."
    )
  },
  {
    slug: "kredietcapaciteit-calculator",
    title: "Kredietcapaciteit Calculator",
    description: "Bereken hoeveel u kunt lenen op basis van uw inkomen. 33%-regel voor maandlasten. Ontdek uw maximale leenbedrag in België.",
    category: "Lenen",
    url: "/lenen/kredietcapaciteit-calculator",
    keywords: extractKeywords(
      "Kredietcapaciteit Calculator",
      "Bereken hoeveel u kunt lenen op basis van uw inkomen. 33%-regel voor maandlasten. Ontdek uw maximale leenbedrag in België."
    )
  },
  {
    slug: "kredietvergelijker-belgie",
    title: "Kredietvergelijker België",
    description: "Vergelijk alle kredieten in België. Persoonlijke leningen, autokredieten en hypotheken. Vind de laagste rente en beste voorwaarden.",
    category: "Lenen",
    url: "/lenen/kredietvergelijker-belgie",
    keywords: extractKeywords(
      "Kredietvergelijker België",
      "Vergelijk alle kredieten in België. Persoonlijke leningen, autokredieten en hypotheken. Vind de laagste rente en beste voorwaarden."
    )
  },
  {
    slug: "doorlopend-krediet-calculator",
    title: "Doorlopend Krediet Calculator",
    description: "Bereken kosten van doorlopend krediet. Rentes van 7-12% op kredietlijnen in België. Vergelijk met persoonlijke leningen.",
    category: "Lenen",
    url: "/lenen/doorlopend-krediet-calculator",
    keywords: extractKeywords(
      "Doorlopend Krediet Calculator",
      "Bereken kosten van doorlopend krediet. Rentes van 7-12% op kredietlijnen in België. Vergelijk met persoonlijke leningen."
    )
  },
  {
    slug: "kredietkaart-calculator",
    title: "Kredietkaart Calculator",
    description: "Bereken kredietkaart kosten en rente in België. Vergelijk jaarlijkse kosten, transactiekosten en rentes tot 18%. Bespaar op creditcards.",
    category: "Lenen",
    url: "/lenen/kredietkaart-calculator",
    keywords: extractKeywords(
      "Kredietkaart Calculator",
      "Bereken kredietkaart kosten en rente in België. Vergelijk jaarlijkse kosten, transactiekosten en rentes tot 18%. Bespaar op creditcards."
    )
  },
  {
    slug: "leasingkrediet-calculator",
    title: "Leasingkrediet Calculator",
    description: "Vergelijk financial en operational leasing in België. Bereken maandlast, restwaarde en totale kosten. Autoleasing calculator voor bedrijven.",
    category: "Lenen",
    url: "/lenen/leasingkrediet-calculator",
    keywords: extractKeywords(
      "Leasingkrediet Calculator",
      "Vergelijk financial en operational leasing in België. Bereken maandlast, restwaarde en totale kosten. Autoleasing calculator voor bedrijven."
    )
  },
  {
    slug: "voorschot-calculator",
    title: "Voorschot Calculator",
    description: "Bereken voorschot kosten en overbruggingskrediet. Korte termijn financiering in België. Cash advance rentes en voorwaarden vergelijken.",
    category: "Lenen",
    url: "/lenen/voorschot-calculator",
    keywords: extractKeywords(
      "Voorschot Calculator",
      "Bereken voorschot kosten en overbruggingskrediet. Korte termijn financiering in België. Cash advance rentes en voorwaarden vergelijken."
    )
  },
  {
    slug: "studieschuld-calculator",
    title: "Studieschuld Calculator",
    description: "Bereken uw studieschuld aflossing. Studieleningen rentes 2-4% in België. Ontdek aflossingsplan en totale kosten van studeren.",
    category: "Lenen",
    url: "/lenen/studieschuld-calculator",
    keywords: extractKeywords(
      "Studieschuld Calculator",
      "Bereken uw studieschuld aflossing. Studieleningen rentes 2-4% in België. Ontdek aflossingsplan en totale kosten van studeren."
    )
  },
  {
    slug: "groepslening-calculator",
    title: "Groepslening Calculator",
    description: "Bereken groepslening met vrienden of familie. Verdeel kosten eerlijk, beheer risicos en simuleer verschillende scenario's voor gezamenlijk lenen.",
    category: "Lenen",
    url: "/lenen/groepslening-calculator",
    keywords: extractKeywords(
      "Groepslening Calculator",
      "Bereken groepslening met vrienden of familie. Verdeel kosten eerlijk, beheer risicos en simuleer verschillende scenario's voor gezamenlijk lenen."
    )
  },
  {
    slug: "wettelijke-rentevoet-belgie",
    title: "Wettelijke Rentevoet België",
    description: "Actuele wettelijke interest in België. Bereken vertragingsinterest op facturen en schulden. Officiële NBB tarieven 2026.",
    category: "Lenen",
    url: "/lenen/wettelijke-rentevoet-belgie",
    keywords: extractKeywords(
      "Wettelijke Rentevoet België",
      "Actuele wettelijke interest in België. Bereken vertragingsinterest op facturen en schulden. Officiële NBB tarieven 2026."
    )
  },
  {
    slug: "beleggingsrente-calculator",
    title: "Beleggingsrente Calculator",
    description: "Bereken uw beleggingsrendement inclusief dividenden en kosten. Compound interest op aandelen en ETFs. Verwacht rendement 7-9% per jaar.",
    category: "Beleggen",
    url: "/beleggen/beleggingsrente-calculator",
    keywords: extractKeywords(
      "Beleggingsrente Calculator",
      "Bereken uw beleggingsrendement inclusief dividenden en kosten. Compound interest op aandelen en ETFs. Verwacht rendement 7-9% per jaar."
    )
  },
  {
    slug: "aandelen-calculator",
    title: "Aandelen Calculator",
    description: "Bereken dividend yield, P/E ratio en aandelenwaardering. Analyseer Belgische en internationale aandelen. Inclusief 30% roerende voorheffing.",
    category: "Beleggen",
    url: "/beleggen/aandelen-calculator",
    keywords: extractKeywords(
      "Aandelen Calculator",
      "Bereken dividend yield, P/E ratio en aandelenwaardering. Analyseer Belgische en internationale aandelen. Inclusief 30% roerende voorheffing."
    )
  },
  {
    slug: "etf-calculator",
    title: "ETF Calculator",
    description: "Vergelijk ETF kosten en rendement. IWDA, VWCE en andere populaire index trackers. Bereken TER impact en verwacht rendement voor België.",
    category: "Beleggen",
    url: "/beleggen/etf-calculator",
    keywords: extractKeywords(
      "ETF Calculator",
      "Vergelijk ETF kosten en rendement. IWDA, VWCE en andere populaire index trackers. Bereken TER impact en verwacht rendement voor België."
    )
  },
  {
    slug: "obligatie-calculator",
    title: "Obligatie Calculator",
    description: "Bereken obligatie rendement, duration en prijs. Staatsobligaties en bedrijfsobligaties vergelijken. YTM calculator voor België.",
    category: "Beleggen",
    url: "/beleggen/obligatie-calculator",
    keywords: extractKeywords(
      "Obligatie Calculator",
      "Bereken obligatie rendement, duration en prijs. Staatsobligaties en bedrijfsobligaties vergelijken. YTM calculator voor België."
    )
  },
  {
    slug: "cryptocurrency-calculator",
    title: "Cryptocurrency Calculator",
    description: "Bereken crypto rendement en risico. Bitcoin, Ethereum en altcoins analyseren. Belgische belastingregels voor crypto (33% meerwaarde).",
    category: "Beleggen",
    url: "/beleggen/cryptocurrency-calculator",
    keywords: extractKeywords(
      "Cryptocurrency Calculator",
      "Bereken crypto rendement en risico. Bitcoin, Ethereum en altcoins analyseren. Belgische belastingregels voor crypto (33% meerwaarde)."
    )
  },
  {
    slug: "staking-apy-calculator",
    title: "Staking APY Calculator",
    description: "Bereken uw crypto staking rendement met APY naar APR conversie. Compound interest berekening voor staking rewards. Gratis Belgische staking calculator.",
    category: "Beleggen",
    url: "/beleggen/staking-apy-calculator",
    keywords: extractKeywords(
      "Staking APY Calculator",
      "Bereken uw crypto staking rendement met APY naar APR conversie. Compound interest berekening voor staking rewards. Gratis Belgische staking calculator."
    )
  },
  {
    slug: "crypto-winst-verlies-calculator",
    title: "Crypto Winst/Verlies Calculator",
    description: "Bereken uw crypto winst of verlies inclusief transactiekosten. ROI, break-even prijs en cost basis berekening. Gratis Belgische crypto calculator.",
    category: "Beleggen",
    url: "/beleggen/crypto-winst-verlies-calculator",
    keywords: extractKeywords(
      "Crypto Winst/Verlies Calculator",
      "Bereken uw crypto winst of verlies inclusief transactiekosten. ROI, break-even prijs en cost basis berekening. Gratis Belgische crypto calculator."
    )
  },
  {
    slug: "dollar-cost-averaging-calculator",
    title: "Dollar Cost Averaging Calculator",
    description: "Bereken voordelen van periodiek beleggen (DCA). Verminder risico door maandelijks te beleggen. Historische DCA resultaten voor België.",
    category: "Beleggen",
    url: "/beleggen/dollar-cost-averaging-calculator",
    keywords: extractKeywords(
      "Dollar Cost Averaging Calculator",
      "Bereken voordelen van periodiek beleggen (DCA). Verminder risico door maandelijks te beleggen. Historische DCA resultaten voor België."
    )
  },
  {
    slug: "portfolio-diversificatie-calculator",
    title: "Portfolio Diversificatie Calculator",
    description: "Optimaliseer uw portfolio allocatie. Bereken risico-rendement verhouding en ideale verdeling aandelen/obligaties. Modern portfolio theory.",
    category: "Beleggen",
    url: "/beleggen/portfolio-diversificatie-calculator",
    keywords: extractKeywords(
      "Portfolio Diversificatie Calculator",
      "Optimaliseer uw portfolio allocatie. Bereken risico-rendement verhouding en ideale verdeling aandelen/obligaties. Modern portfolio theory."
    )
  },
  {
    slug: "reit-calculator",
    title: "REIT Calculator",
    description: "Bereken rendement van REITs en vastgoedfondsen. Dividend yield, NAV en FFO analyse. Belgische fiscaliteit op vastgoedbeleggingen.",
    category: "Beleggen",
    url: "/beleggen/reit-calculator",
    keywords: extractKeywords(
      "REIT Calculator",
      "Bereken rendement van REITs en vastgoedfondsen. Dividend yield, NAV en FFO analyse. Belgische fiscaliteit op vastgoedbeleggingen."
    )
  },
  {
    slug: "belgische-beleggingsfiscaliteit-calculator",
    title: "Belgische Beleggingsfiscaliteit",
    description: "Bereken belasting op beleggingen in België. 30% roerende voorheffing op dividenden, TOB-taks op transacties. Optimaliseer uw fiscaliteit.",
    category: "Beleggen",
    url: "/beleggen/belgische-beleggingsfiscaliteit-calculator",
    keywords: extractKeywords(
      "Belgische Beleggingsfiscaliteit",
      "Bereken belasting op beleggingen in België. 30% roerende voorheffing op dividenden, TOB-taks op transacties. Optimaliseer uw fiscaliteit."
    )
  },
  {
    slug: "roerende-voorheffing-calculator",
    title: "Roerende Voorheffing Calculator",
    description: "Bereken roerende voorheffing op dividenden en interest. 30% belasting op beleggingsinkomsten in België. Vrijstelling €980 spaarrente.",
    category: "Beleggen",
    url: "/beleggen/roerende-voorheffing-calculator",
    keywords: extractKeywords(
      "Roerende Voorheffing Calculator",
      "Bereken roerende voorheffing op dividenden en interest. 30% belasting op beleggingsinkomsten in België. Vrijstelling €980 spaarrente."
    )
  },
  {
    slug: "pensioensparen-calculator",
    title: "Pensioensparen Calculator",
    description: "Bereken uw pensioensparen voordeel. Tot 30% belastingvermindering op €1.020 (Pijler 3). Optimaliseer uw aanvullend pensioen in België.",
    category: "Planning",
    url: "/planning/pensioensparen-calculator",
    keywords: extractKeywords(
      "Pensioensparen Calculator",
      "Bereken uw pensioensparen voordeel. Tot 30% belastingvermindering op €1.020 (Pijler 3). Optimaliseer uw aanvullend pensioen in België."
    )
  },
  {
    slug: "pensioen-calculator",
    title: "Pensioen Calculator",
    description: "Bereken hoeveel u nodig heeft voor pensioen. 4%-regel en wettelijk pensioen in België. Plan uw financiële vrijheid vanaf 60-67 jaar.",
    category: "Planning",
    url: "/planning/pensioen-calculator",
    keywords: extractKeywords(
      "Pensioen Calculator",
      "Bereken hoeveel u nodig heeft voor pensioen. 4%-regel en wettelijk pensioen in België. Plan uw financiële vrijheid vanaf 60-67 jaar."
    )
  },
  {
    slug: "fire-calculator",
    title: "FIRE Calculator",
    description: "Bereken wanneer u financieel onafhankelijk wordt. FIRE beweging in België: Lean, Regular, Fat & Coast FIRE. Vroeg met pensioen calculator.",
    category: "Planning",
    url: "/planning/fire-calculator",
    keywords: extractKeywords(
      "FIRE Calculator",
      "Bereken wanneer u financieel onafhankelijk wordt. FIRE beweging in België: Lean, Regular, Fat & Coast FIRE. Vroeg met pensioen calculator."
    )
  },
  {
    slug: "noodfonds-calculator",
    title: "Noodfonds Calculator",
    description: "Bereken uw ideale noodfonds. 3-6 maanden vaste kosten opzij zetten. Financiële zekerheid en bescherming tegen onverwachte uitgaven.",
    category: "Planning",
    url: "/planning/noodfonds-calculator",
    keywords: extractKeywords(
      "Noodfonds Calculator",
      "Bereken uw ideale noodfonds. 3-6 maanden vaste kosten opzij zetten. Financiële zekerheid en bescherming tegen onverwachte uitgaven."
    )
  },
  {
    slug: "budget-planner",
    title: "Budget Planner",
    description: "Plan uw maandelijks budget. 50/30/20 regel voor uitgaven. Vaste kosten, sparen en discretionaire uitgaven optimaliseren in België.",
    category: "Planning",
    url: "/planning/budget-planner",
    keywords: extractKeywords(
      "Budget Planner",
      "Plan uw maandelijks budget. 50/30/20 regel voor uitgaven. Vaste kosten, sparen en discretionaire uitgaven optimaliseren in België."
    )
  },
  {
    slug: "belastingplanning-calculator",
    title: "Belastingplanning Calculator",
    description: "Optimaliseer uw Belgische belastingen. Pensioensparen, groepsverzekering en fiscale aftrekposten. Bespaar tot €1.000+ per jaar.",
    category: "Planning",
    url: "/planning/belastingplanning-calculator",
    keywords: extractKeywords(
      "Belastingplanning Calculator",
      "Optimaliseer uw Belgische belastingen. Pensioensparen, groepsverzekering en fiscale aftrekposten. Bespaar tot €1.000+ per jaar."
    )
  },
  {
    slug: "levensverzekeraar-calculator",
    title: "Levensverzekeraar Calculator",
    description: "Bereken levensverzekering opbrengst. Tak 21 (gewaarborgd) vs Tak 23 (beleggingsverzekering). Vergelijk rendementen en belastingvoordelen.",
    category: "Planning",
    url: "/planning/levensverzekeraar-calculator",
    keywords: extractKeywords(
      "Levensverzekeraar Calculator",
      "Bereken levensverzekering opbrengst. Tak 21 (gewaarborgd) vs Tak 23 (beleggingsverzekering). Vergelijk rendementen en belastingvoordelen."
    )
  },
  {
    slug: "eindejaarsbonus-calculator",
    title: "Eindejaarsbonus Calculator",
    description: "Bereken netto eindejaarsbonus na belastingen. 13de maand optimalisatie en belasting in België. Maximaliseer uw eindejaarspremie.",
    category: "Planning",
    url: "/planning/eindejaarsbonus-calculator",
    keywords: extractKeywords(
      "Eindejaarsbonus Calculator",
      "Bereken netto eindejaarsbonus na belastingen. 13de maand optimalisatie en belasting in België. Maximaliseer uw eindejaarspremie."
    )
  },
  {
    slug: "inflatie-calculator-belgie",
    title: "Inflatie Calculator België",
    description: "Bereken impact van inflatie op uw koopkracht. Actuele inflatiecijfers België 2-4%. Zie hoe prijsstijgingen uw vermogen aantasten.",
    category: "Planning",
    url: "/planning/inflatie-calculator-belgie",
    keywords: extractKeywords(
      "Inflatie Calculator België",
      "Bereken impact van inflatie op uw koopkracht. Actuele inflatiecijfers België 2-4%. Zie hoe prijsstijgingen uw vermogen aantasten."
    )
  },
  {
    slug: "geldontwaarding-calculator",
    title: "Geldontwaarding Calculator",
    description: "Bereken geldontwaarding door inflatie. Zie hoe uw spaargeld in waarde daalt. Bescherm vermogen tegen inflatie in België.",
    category: "Planning",
    url: "/planning/geldontwaarding-calculator",
    keywords: extractKeywords(
      "Geldontwaarding Calculator",
      "Bereken geldontwaarding door inflatie. Zie hoe uw spaargeld in waarde daalt. Bescherm vermogen tegen inflatie in België."
    )
  },
  {
    slug: "reele-rente-berekenen",
    title: "Reële Rente Berekenen",
    description: "Bereken reële rente (nominaal minus inflatie). Ontdek of uw spaarrente inflatie verslaat. Realistisch rendement berekenen voor België.",
    category: "Planning",
    url: "/planning/reele-rente-berekenen",
    keywords: extractKeywords(
      "Reële Rente Berekenen",
      "Bereken reële rente (nominaal minus inflatie). Ontdek of uw spaarrente inflatie verslaat. Realistisch rendement berekenen voor België."
    )
  },
  {
    slug: "rentevoet-vergelijker",
    title: "Rentevoet Vergelijker",
    description: "Vergelijk vaste en variabele rentevoeten. Spaarrentes, hypotheekrentes en beleggingsrendementen in België. Vind de beste rente.",
    category: "Planning",
    url: "/planning/rentevoet-vergelijker",
    keywords: extractKeywords(
      "Rentevoet Vergelijker",
      "Vergelijk vaste en variabele rentevoeten. Spaarrentes, hypotheekrentes en beleggingsrendementen in België. Vind de beste rente."
    )
  }
];

export function getCalculatorBySlug(slug: string): Calculator | null {
  return calculatorRegistry.find(calc => calc.slug === slug) || null;
}

export function getAllCalculators(): Calculator[] {
  return [...calculatorRegistry];
}

export function getCalculatorsByCategory(category: CalculatorCategory): Calculator[] {
  return calculatorRegistry.filter(calc => calc.category === category);
}

export function findCalculatorsByKeywords(text: string, limit: number = 5): Array<{ calculator: Calculator; score: number }> {
  if (!text || text.trim().length === 0) {
    return [];
  }

  const normalizedText = normalizeDiacritics(text.toLowerCase());
  const textWords = normalizedText
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => 
      word.length > 2 && 
      !commonWords.has(word) &&
      !/^\d+$/.test(word)
    );

  const calculatorsWithScores = calculatorRegistry.map(calculator => {
    let score = 0;
    const matchedKeywords = new Set<string>();

    for (const keyword of calculator.keywords) {
      for (const word of textWords) {
        if (word === keyword) {
          score += 3;
          matchedKeywords.add(keyword);
        } 
        else if (word.includes(keyword) || keyword.includes(word)) {
          if (word.length >= 5 && keyword.length >= 5) {
            if (word.startsWith(keyword) || keyword.startsWith(word)) {
              score += 2;
            } else {
              score += 1;
            }
            matchedKeywords.add(keyword);
          }
        }
      }
    }

    if (normalizedText.includes(calculator.slug)) {
      score += 10;
    }

    const normalizedTitle = normalizeDiacritics(calculator.title.toLowerCase());
    if (normalizedText.includes(normalizedTitle)) {
      score += 8;
    }

    score += matchedKeywords.size;

    return { calculator, score };
  });

  return calculatorsWithScores
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function getCategoryCounts(): Record<CalculatorCategory, number> {
  const counts: Record<CalculatorCategory, number> = {
    Sparen: 0,
    Lenen: 0,
    Beleggen: 0,
    Planning: 0
  };

  for (const calc of calculatorRegistry) {
    counts[calc.category]++;
  }

  return counts;
}
