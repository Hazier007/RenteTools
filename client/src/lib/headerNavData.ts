import type { SiloCategory } from "@/seo/calculatorSeoConfig";

export interface HeaderNavItem {
  slug: string;
  breadcrumbTitle: string;
  metaDescription: string;
}

const months = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december",
];

function currentDateLabel(): string {
  const now = new Date();
  return `${months[now.getMonth()]} ${now.getFullYear()}`;
}

function currentYear(): number {
  return new Date().getFullYear();
}

// Dropdown content. Keep in sync with calculatorSeoConfig top entries —
// extracted to a slim module so Header doesn't drag the FAQ-heavy SEO
// config into the eager bundle.
export const headerNavData: Record<Exclude<SiloCategory, "Overige">, HeaderNavItem[]> = {
  Sparen: [
    { slug: "hoogste-spaarrente-belgie", breadcrumbTitle: "Hoogste Spaarrente", metaDescription: `Vergelijk actuele hoogste spaarrentes (basis + getrouwheidspremie tot 2,85%). Bereken je opbrengst gratis & anoniem – update ${currentDateLabel()}.` },
    { slug: "deposito-calculator", breadcrumbTitle: "Deposito Calculator", metaDescription: "Bereken uw deposito opbrengst in België. Vergelijk termijnrekening tarieven van 1,5% tot 3,5%. Inclusief roerende voorheffing berekening." },
    { slug: "samengestelde-interest-berekenen", breadcrumbTitle: "Samengestelde Interest", metaDescription: "Zie hoe rente-op-rente je spaargeld laat groeien. Bereken incl. roerende voorheffing – gratis compound interest tool." },
    { slug: "doelspaarcalculator", breadcrumbTitle: "Doelspaar Calculator", metaDescription: "Plan al uw spaardoelen tegelijk. Bereken hoeveel u maandelijks moet sparen voor auto, vakantie, noodfonds en meer. Smart goal planning." },
    { slug: "spaarrekening-vergelijker", breadcrumbTitle: "Spaarrekening Vergelijker", metaDescription: `Vergelijk alle Belgische spaarrekeningen. Basisrente, getrouwheidspremie en voorwaarden van alle banken. Vind de beste spaarrente ${currentYear()}.` },
    { slug: "kinderrekening-calculator", breadcrumbTitle: "Kinderrekening", metaDescription: "Bereken hoeveel u moet sparen voor uw kinderen. Kinderrekening rentes tot 2,5% in België. Start vandaag met sparen voor hun toekomst." },
  ],
  Lenen: [
    { slug: "hypothecaire-lening-berekenen", breadcrumbTitle: "Hypothecaire Lening", metaDescription: `Bereken je hypotheek maandlasten ${currentYear()} incl. registratierechten, notaris & actuele rente. Maximale lening simuleren – gratis tool België.` },
    { slug: "woningkrediet-simulator", breadcrumbTitle: "Woningkrediet Simulator", metaDescription: "Simuleer uw woningkrediet in België. Bereken leencapaciteit, maandlast en vergelijk vaste vs variabele rente. Tot 90% LTV mogelijk." },
    { slug: "persoonlijke-lening-berekenen", breadcrumbTitle: "Persoonlijke Lening", metaDescription: "Bereken uw persoonlijke lening kosten. Tarieven van 3-8% op consumptieleningen in België. Vergelijk maandlasten en totale kosten." },
    { slug: "autolening-berekenen", breadcrumbTitle: "Autolening", metaDescription: "Bereken uw autolening met rentes vanaf 2,9%. Vergelijk autokredieten en financieringsopties in België. Bereken maandlast en TAEG." },
    { slug: "lening-herfinancieren", breadcrumbTitle: "Lening Herfinancieren", metaDescription: "Bereken of herfinancieren voordelig is. Vergelijk nieuwe rente met vervroegde terugbetalingskosten. Bespaar tot €10.000+ in België." },
    { slug: "schuldenconsolidatie-calculator", breadcrumbTitle: "Schuldenconsolidatie", metaDescription: "Voeg al uw leningen samen tot één lening. Bereken besparing en lagere maandlast. Schuldhulp en consolidatie oplossingen voor België." },
  ],
  Beleggen: [
    { slug: "beleggingsrente-calculator", breadcrumbTitle: "Beleggingsrente", metaDescription: "Bereken uw beleggingsrendement inclusief dividenden en kosten. Compound interest op aandelen en ETFs. Verwacht rendement 7-9% per jaar." },
    { slug: "aandelen-calculator", breadcrumbTitle: "Aandelen Calculator", metaDescription: "Bereken dividend yield, P/E ratio en aandelenwaardering. Analyseer Belgische en internationale aandelen. Inclusief 30% roerende voorheffing." },
    { slug: "etf-calculator", breadcrumbTitle: "ETF Calculator", metaDescription: "Vergelijk ETF kosten en rendement. IWDA, VWCE en andere populaire index trackers. Bereken TER impact en verwacht rendement voor België." },
    { slug: "obligatie-calculator", breadcrumbTitle: "Obligatie Calculator", metaDescription: "Bereken obligatie rendement, duration en prijs. Staatsobligaties en bedrijfsobligaties vergelijken. YTM calculator voor België." },
    { slug: "cryptocurrency-calculator", breadcrumbTitle: "Cryptocurrency", metaDescription: "Bereken crypto rendement en risico. Bitcoin, Ethereum en altcoins analyseren. Belgische belastingregels voor crypto (33% meerwaarde)." },
    { slug: "crypto-belasting-calculator", breadcrumbTitle: "Crypto Belasting", metaDescription: "Bereken crypto belasting in België. Goede huisvader (belastingvrij), speculatief (33%) of staking (30%). Gratis Belgische crypto tax calculator." },
  ],
  Planning: [
    { slug: "pensioensparen-calculator", breadcrumbTitle: "Pensioensparen", metaDescription: `Simuleer je pensioensparen voordeel (tot €337 terug) + eindkapitaal. Actueel voor ${currentYear()} – gratis calculator.` },
    { slug: "pensioen-calculator", breadcrumbTitle: "Pensioen Calculator", metaDescription: "Bereken hoeveel u nodig heeft voor pensioen. 4%-regel en wettelijk pensioen in België. Plan uw financiële vrijheid vanaf 60-67 jaar." },
    { slug: "fire-calculator", breadcrumbTitle: "FIRE Calculator", metaDescription: `Bereken wanneer je FIRE bereikt (Lean/Fat) met Belgische fiscaliteit & roerende voorheffing. Gratis FIRE simulator ${currentYear()}.` },
    { slug: "noodfonds-calculator", breadcrumbTitle: "Noodfonds", metaDescription: "Bereken uw ideale noodfonds. 3-6 maanden vaste kosten opzij zetten. Financiële zekerheid en bescherming tegen onverwachte uitgaven." },
    { slug: "budget-planner", breadcrumbTitle: "Budget Planner", metaDescription: "Plan uw maandelijks budget. 50/30/20 regel voor uitgaven. Vaste kosten, sparen en discretionaire uitgaven optimaliseren in België." },
    { slug: "belastingplanning-calculator", breadcrumbTitle: "Belastingplanning", metaDescription: "Optimaliseer uw Belgische belastingen. Pensioensparen, groepsverzekering en fiscale aftrekposten. Bespaar tot €1.000+ per jaar." },
  ],
};
