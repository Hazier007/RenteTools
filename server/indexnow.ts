import { calculatorRegistry } from '@shared/calculator-registry';
import { db } from './database';
import { blogPostsTable } from '@shared/schema';
import { eq } from 'drizzle-orm';

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

// Generate canonical URLs from calculator registry
export function getStaticUrls(): string[] {
  const urls: string[] = [
    '/',
    '/sparen',
    '/lenen', 
    '/beleggen',
    '/planning',
    '/overige',
    '/nieuws',
    '/blog',
    '/over-ons',
    '/privacy',
    '/voorwaarden',
  ];
  
  // Add all calculator URLs from registry (canonical paths with category)
  for (const calc of calculatorRegistry) {
    urls.push(calc.url);
  }
  
  return urls;
}

// Get all URLs including blog posts (async because it queries database)
export async function getAllCanonicalUrls(): Promise<string[]> {
  const urls = getStaticUrls();
  
  // Add all published blog post URLs
  try {
    const posts = await db.select({ slug: blogPostsTable.slug })
      .from(blogPostsTable)
      .where(eq(blogPostsTable.status, 'published'));
    
    for (const post of posts) {
      urls.push(`/blog/${post.slug}`);
    }
  } catch (error) {
    console.error('Failed to fetch blog posts for IndexNow:', error);
  }
  
  return urls;
}

export async function submitAllCalculators(): Promise<IndexNowResponse> {
  const urls = await getAllCanonicalUrls();
  return submitToIndexNow(urls);
}
