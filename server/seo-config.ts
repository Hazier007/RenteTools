export interface SeoConfig {
  slug: string;
  metaTitle: string;
  metaDescription: string;
}

export type SiloCategory = "Home" | "Sparen" | "Lenen" | "Beleggen" | "Planning" | "Overige";

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
  "voorwaarden": "Overige",
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

export const seoConfigs: Record<string, SeoConfig> = {
  "home": {
    slug: "home",
    metaTitle: "Hoogste Spaarrente België 2026 + 70+ Gratis Calculators",
    metaDescription: "Vind de hoogste spaarrente (tot ~2,85%), bereken je hypotheek of FIRE-doel. 70+ gratis tools voor sparen, lenen & beleggen – anoniem & actueel België 2026."
  },
  "hoogste-spaarrente-belgie": {
    slug: "hoogste-spaarrente-belgie",
    metaTitle: "Hoogste Spaarrente België December 2026: Top Banken",
    metaDescription: "Vergelijk actuele hoogste spaarrentes (basis + getrouwheidspremie tot 2,85%). Bereken je opbrengst gratis & anoniem – update december 2026."
  },
  "deposito-calculator": {
    slug: "deposito-calculator",
    metaTitle: "Deposito Calculator België - Termijnrekening Rente Berekenen",
    metaDescription: "Bereken uw deposito opbrengst in België. Vergelijk termijnrekening tarieven van 1,5% tot 3,5%. Inclusief roerende voorheffing berekening."
  },
  "samengestelde-interest-berekenen": {
    slug: "samengestelde-interest-berekenen",
    metaTitle: "Samengestelde Interest Berekenen België 2026",
    metaDescription: "Zie hoe rente-op-rente je spaargeld laat groeien. Bereken incl. roerende voorheffing – gratis compound interest tool."
  },
  "doelspaarcalculator": {
    slug: "doelspaarcalculator",
    metaTitle: "Doelspaarcalculator België - Meerdere Spaardoelen Beheren",
    metaDescription: "Plan al uw spaardoelen tegelijk. Bereken hoeveel u maandelijks moet sparen voor auto, vakantie, noodfonds en meer. Smart goal planning."
  },
  "spaarrekening-vergelijker": {
    slug: "spaarrekening-vergelijker",
    metaTitle: "Spaarrekening Vergelijker België 2026 - Beste Rentes",
    metaDescription: "Vergelijk alle Belgische spaarrekeningen. Basisrente, getrouwheidspremie en voorwaarden van alle banken. Vind de beste spaarrente 2026."
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
    metaTitle: "Termijnrekening Hoogste Rente België 2026",
    metaDescription: "Vergelijk hoogste rente op deposito/termijnrekeningen. Bereken opbrengst na belasting – gratis tool december 2026."
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
    metaTitle: "Hypotheek Berekenen België 2026: Maandlasten & Kosten",
    metaDescription: "Bereken je hypotheek maandlasten 2026 incl. registratierechten, notaris & actuele rente. Maximale lening simuleren – gratis tool België."
  },
  "woningkrediet-simulator": {
    slug: "woningkrediet-simulator",
    metaTitle: "Woningkrediet Simulator België - Hoeveel Kan Ik Lenen 2026",
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
    metaTitle: "Lening Herfinancieren België - Hypotheek Oversluiten 2026",
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
    metaTitle: "Kredietvergelijker België 2026 - Beste Leningrentes",
    metaDescription: "Vergelijk alle kredieten in België. Persoonlijke leningen, autokredieten en hypotheken. Vind de laagste rente en beste voorwaarden."
  },
  "doorlopend-krediet-calculator": {
    slug: "doorlopend-krediet-calculator",
    metaTitle: "Doorlopend Krediet Calculator België - Revolving Credit",
    metaDescription: "Bereken kosten van doorlopend krediet. Rentes van 7-12% op kredietlijnen in België. Vergelijk met persoonlijke leningen."
  },
  "kredietkaart-calculator": {
    slug: "kredietkaart-calculator",
    metaTitle: "Kredietkaart Calculator België - Rente & Kosten Berekenen",
    metaDescription: "Bereken kredietkaart kosten en rente in België. Vergelijk jaarlijkse kosten, transactiekosten en rentes tot 18%. Bespaar op creditcards."
  },
  "leasingkrediet-calculator": {
    slug: "leasingkrediet-calculator",
    metaTitle: "Leasingkrediet Calculator België - Financial vs Operational",
    metaDescription: "Vergelijk financial en operational leasing in België. Bereken maandlast, restwaarde en totale kosten. Autoleasing calculator voor bedrijven."
  },
  "voorschot-calculator": {
    slug: "voorschot-calculator",
    metaTitle: "Voorschot Calculator België - Cash Advance & Bridge Loans",
    metaDescription: "Bereken voorschot kosten en overbruggingskrediet. Korte termijn financiering in België. Cash advance rentes en voorwaarden vergelijken."
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
    metaTitle: "Wettelijke Rentevoet België 2026 - Actuele Tarieven NBB",
    metaDescription: "Actuele wettelijke interest in België. Bereken vertragingsinterest op facturen en schulden. Officiële NBB tarieven 2026."
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
    metaTitle: "ETF Calculator België - Index Fondsen Vergelijken 2026",
    metaDescription: "Vergelijk ETF kosten en rendement. IWDA, VWCE en andere populaire index trackers. Bereken TER impact en verwacht rendement voor België."
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
    metaTitle: "Roerende Voorheffing Berekenen 2026 België",
    metaDescription: "Bereken je roerende voorheffing op interest/dividenden + vrijstelling tot €1050. Tips om belasting te minimaliseren – gratis tool."
  },
  "pensioensparen-calculator": {
    slug: "pensioensparen-calculator",
    metaTitle: "Pensioensparen Berekenen België 2026: Belastingvoordeel",
    metaDescription: "Simuleer je pensioensparen voordeel (tot €337 terug) + eindkapitaal. Actueel voor 2026 – gratis calculator."
  },
  "pensioen-calculator": {
    slug: "pensioen-calculator",
    metaTitle: "Pensioen Calculator België - Bereken Uw Pensioenkapitaal",
    metaDescription: "Bereken hoeveel u nodig heeft voor pensioen. 4%-regel en wettelijk pensioen in België. Plan uw financiële vrijheid vanaf 60-67 jaar."
  },
  "fire-calculator": {
    slug: "fire-calculator",
    metaTitle: "FIRE Calculator België: Wanneer Financieel Onafhankelijk?",
    metaDescription: "Bereken wanneer je FIRE bereikt (Lean/Fat) met Belgische fiscaliteit & roerende voorheffing. Gratis FIRE simulator 2026."
  },
  "noodfonds-calculator": {
    slug: "noodfonds-calculator",
    metaTitle: "Noodfonds Calculator België - Emergency Fund Berekenen",
    metaDescription: "Bereken uw ideale noodfonds. 3-6 maanden vaste kosten opzij zetten. Financiële zekerheid en bescherming tegen onverwachte uitgaven."
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
    metaTitle: "Inflatie Calculator België 2026: Bescherm Je Spaargeld",
    metaDescription: "Bereken hoe inflatie je spaargeld aantast + tips om je koopkracht te beschermen. Actueel voor 2026 – gratis tool België."
  },
  "geldontwaarding-calculator": {
    slug: "geldontwaarding-calculator",
    metaTitle: "Geldontwaarding Calculator - Vermogen Erosie Berekenen",
    metaDescription: "Bereken geldontwaarding door inflatie. Zie hoe uw spaargeld in waarde daalt. Bescherm vermogen tegen inflatie in België."
  },
  "reele-rente-berekenen": {
    slug: "reele-rente-berekenen",
    metaTitle: "Reële Rente Berekenen - Nominale Rente Min Inflatie",
    metaDescription: "Bereken reële rente (nominaal minus inflatie). Ontdek of uw spaarrente inflatie verslaat. Realistisch rendement berekenen voor België."
  },
  "rentevoet-vergelijker": {
    slug: "rentevoet-vergelijker",
    metaTitle: "Rentevoet Vergelijker België - Vast vs Variabel 2026",
    metaDescription: "Vergelijk vaste en variabele rentevoeten. Spaarrentes, hypotheekrentes en beleggingsrendementen in België. Vind de beste rente."
  },
  "over-ons": {
    slug: "over-ons",
    metaTitle: "Over Interesten.be - Financiële Calculators België",
    metaDescription: "Interesten.be helpt u slimme financiële beslissingen nemen met gratis calculators voor sparen, lenen, beleggen en planning in België."
  },
  "privacy": {
    slug: "privacy",
    metaTitle: "Privacy & Cookie Policy - Interesten.be",
    metaDescription: "Privacy policy en cookie informatie van Interesten.be. Lees hoe wij omgaan met uw gegevens."
  },
  "voorwaarden": {
    slug: "voorwaarden",
    metaTitle: "Algemene Voorwaarden - Interesten.be",
    metaDescription: "Algemene voorwaarden en disclaimer voor het gebruik van Interesten.be calculators en informatie."
  },
  "sitemap": {
    slug: "sitemap",
    metaTitle: "Sitemap - Alle Calculators Interesten.be",
    metaDescription: "Volledig overzicht van alle financiële calculators en pagina's op Interesten.be voor België."
  },
  "sparen": {
    slug: "sparen",
    metaTitle: "Spaarrekening Calculators België - 11+ Gratis Tools",
    metaDescription: "Vergelijk de beste spaarrekeningen, deposito's en termijnrekeningen in België. Bereken uw rendement met onze gratis tools."
  },
  "lenen": {
    slug: "lenen",
    metaTitle: "Lening Calculators België - Hypotheek & Krediet",
    metaDescription: "Bereken uw hypotheek, autolening of persoonlijke lening. Vergelijk rentes en vind de beste kredietvoorwaarden."
  },
  "beleggen": {
    slug: "beleggen",
    metaTitle: "Beleggings Calculators België - Aandelen, ETF, Crypto",
    metaDescription: "Bereken rendement op aandelen, ETF's, obligaties en crypto. Optimaliseer uw beleggingsportefeuille."
  },
  "planning": {
    slug: "planning",
    metaTitle: "Financiële Planning Tools - Pensioen & FIRE",
    metaDescription: "Plan uw pensioen, budget en financiële toekomst. FIRE calculator, noodfonds en belastingplanning."
  },
  "overige": {
    slug: "overige",
    metaTitle: "Informatie - Interesten.be",
    metaDescription: "Meer informatie over Interesten.be, privacy beleid en gebruiksvoorwaarden."
  },
  "blog": {
    slug: "blog",
    metaTitle: "Financieel Advies Blog België | Sparen, Lenen & Beleggen",
    metaDescription: "Expert artikelen over sparen, lenen, beleggen en financiële planning in België. Praktische tips, strategieën en gidsen voor betere financiële beslissingen."
  },
  "nieuws": {
    slug: "nieuws",
    metaTitle: "Financieel Nieuws België | Interesten.be",
    metaDescription: "Het laatste financieel nieuws voor België. Updates over spaarrentes, hypotheekrentes en beleggingen."
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

export function getSeoConfigForUrl(url: string): SeoConfig | null {
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
  
  const nonCalculatorSlugs = ['home', 'over-ons', 'privacy', 'voorwaarden', 'sitemap', 'blog', 'nieuws', 'sparen', 'lenen', 'beleggen', 'planning', 'overige'];
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

function escapeHtmlAttribute(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function injectSeoMeta(html: string, url: string): string {
  const seoConfig = getSeoConfigForUrl(url);
  
  if (!seoConfig) {
    return html;
  }
  
  let result = html;
  const escapedTitle = escapeHtmlAttribute(seoConfig.metaTitle);
  const escapedDescription = escapeHtmlAttribute(seoConfig.metaDescription);
  
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
  
  return result;
}
