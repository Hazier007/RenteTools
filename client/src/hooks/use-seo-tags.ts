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
  }, [pageSlug, fallbackTitle, fallbackDescription]);
}
