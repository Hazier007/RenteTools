const INDEXNOW_API_URL = 'https://api.indexnow.org/IndexNow';
const SITE_URL = 'https://interesten.be';
const SITE_HOST = 'interesten.be';

interface IndexNowResponse {
  success: boolean;
  statusCode: number;
  message: string;
  submittedUrls?: number;
}

export async function submitToIndexNow(urls: string[]): Promise<IndexNowResponse> {
  const apiKey = process.env.INDEXNOW_API_KEY;
  
  if (!apiKey) {
    throw new Error('INDEXNOW_API_KEY not configured');
  }

  // Ensure all URLs are absolute
  const absoluteUrls = urls.map(url => {
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return `${SITE_URL}${url}`;
    return `${SITE_URL}/${url}`;
  });

  const payload = {
    host: SITE_HOST,
    key: apiKey,
    keyLocation: `${SITE_URL}/${apiKey}.txt`,
    urlList: absoluteUrls
  };

  try {
    const response = await fetch(INDEXNOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`✅ IndexNow: Successfully submitted ${absoluteUrls.length} URLs (Status: ${response.status})`);
      
      return {
        success: true,
        statusCode: response.status,
        message: `Successfully submitted ${absoluteUrls.length} URLs to IndexNow`,
        submittedUrls: absoluteUrls.length
      };
    } else {
      const errorText = await response.text();
      console.error(`❌ IndexNow submission failed with status ${response.status}:`, errorText);
      
      return {
        success: false,
        statusCode: response.status,
        message: errorText || `Failed with status ${response.status}`
      };
    }
  } catch (error: any) {
    console.error('❌ IndexNow submission failed:', error.message);
    
    return {
      success: false,
      statusCode: 500,
      message: error.message
    };
  }
}

// All calculator URLs for the site
export const ALL_CALCULATOR_URLS = [
  '/',
  '/hoogste-spaarrente-belgie',
  '/hypothecaire-lening-berekenen',
  '/samengestelde-interest-berekenen',
  '/inflatie-calculator-belgie',
  '/autolening-berekenen',
  '/persoonlijke-lening-berekenen',
  '/pensioensparen-calculator',
  '/beleggingsrente-calculator',
  '/deposito-calculator',
  '/kredietvergelijker-belgie',
  '/wettelijke-rentevoet-belgie',
  '/roerende-voorheffing-calculator',
  '/reele-rente-berekenen',
  '/geldontwaarding-calculator',
  '/lening-herfinancieren',
  '/kasbon-calculator',
  '/etf-calculator',
  '/aandelen-calculator',
  '/obligatie-calculator',
  '/portfolio-diversificatie-calculator',
  '/dollar-cost-averaging-calculator',
  '/reit-calculator',
  '/cryptocurrency-calculator',
  '/belgische-beleggingsfiscaliteit-calculator',
  '/pensioen-calculator',
  '/budget-planner',
  '/fire-calculator',
  '/levensverzekeraar-calculator',
  '/doelspaarcalculator',
  '/belastingplanning-calculator',
  '/studieschuld-calculator',
  '/kredietkaart-calculator',
  '/termijnrekening-calculator',
  '/kinderrekening-calculator',
  '/noodfonds-calculator',
  '/spaarrekening-vergelijker',
  '/loyalty-bonus-calculator',
  '/vakantiegeld-sparen-calculator',
  '/groepssparen-calculator',
  '/eindejaarsbonus-calculator',
  '/woningkrediet-simulator',
  '/doorlopend-krediet-calculator',
  '/leasingkrediet-calculator',
  '/kredietcapaciteit-calculator',
  '/schuldenconsolidatie-calculator',
  '/groepslening-calculator',
  '/rentevoet-vergelijker',
  '/voorschot-calculator',
  '/over-ons',
  '/privacy',
  '/voorwaarden',
  '/sitemap'
];

export async function submitAllCalculators(): Promise<IndexNowResponse> {
  return submitToIndexNow(ALL_CALCULATOR_URLS);
}
