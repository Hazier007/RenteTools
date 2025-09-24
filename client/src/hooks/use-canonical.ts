import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Custom hook to automatically set the canonical URL for the current page
 * This ensures each page has its own unique canonical tag for proper SEO indexing
 */
export function useCanonical() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Remove any existing canonical tag
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
    
    // Create new canonical tag with current URL
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `https://interesten.be${location}`;
    
    // Ensure trailing slash is handled consistently
    if (location !== '/' && canonical.href.endsWith('/')) {
      canonical.href = canonical.href.slice(0, -1);
    }
    
    document.head.appendChild(canonical);
    
    // Also update Open Graph URL if it exists
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonical.href);
    } else {
      // Create OG URL if it doesn't exist
      const ogUrlMeta = document.createElement('meta');
      ogUrlMeta.setAttribute('property', 'og:url');
      ogUrlMeta.setAttribute('content', canonical.href);
      document.head.appendChild(ogUrlMeta);
    }
    
    return () => {
      // Cleanup on unmount
      const canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag && canonicalTag.getAttribute('href') === canonical.href) {
        canonicalTag.remove();
      }
    };
  }, [location]);
}