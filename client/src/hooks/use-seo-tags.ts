import { useEffect } from 'react';
import { getSeoConfig } from '@/seo/calculatorSeoConfig';

export function useSeoTags(pageSlug: string, fallbackTitle?: string, fallbackDescription?: string) {
  useEffect(() => {
    const seoConfig = getSeoConfig(pageSlug);
    
    if (seoConfig && seoConfig.metaTitle) {
      document.title = seoConfig.metaTitle;
    } else if (fallbackTitle) {
      document.title = fallbackTitle;
    }
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = seoConfig?.metaDescription || fallbackDescription || '';
    
    if (description) {
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }

    // Canonical en og:url: de SSR zet ze per route; bij SPA-navigatie houden we
    // ze gelijk aan de huidige URL zodat ze nooit op de homepage blijven staan.
    const path = window.location.pathname.replace(/\/+$/, '');
    const canonicalUrl = path === '' ? 'https://interesten.be/' : `https://interesten.be${path}`;
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonicalUrl);
  }, [pageSlug, fallbackTitle, fallbackDescription]);
}
