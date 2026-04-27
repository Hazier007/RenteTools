import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

const CONSENT_STORAGE_KEY = 'cookie-consent';

function hasAnalyticsConsent(): boolean {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return false;
    const parsed = JSON.parse(stored) as { analytics?: unknown };
    return parsed?.analytics === true;
  } catch {
    return false;
  }
}

// Emits a GA4 page_view on every wouter route change. The initial pageview
// is already fired by gtag('config', 'G-...') in client/index.html, so the
// first effect run is skipped to avoid double-counting the landing page.
// Consent Mode v2: only emits when analytics_storage is granted (mirrored
// in localStorage by use-consent.ts).
export function useGA4PageView(): void {
  const [location] = useLocation();
  const isFirstRunRef = useRef(true);

  useEffect(() => {
    if (isFirstRunRef.current) {
      isFirstRunRef.current = false;
      return;
    }
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
      return;
    }
    if (!hasAnalyticsConsent()) {
      return;
    }
    window.gtag('event', 'page_view', {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);
}
