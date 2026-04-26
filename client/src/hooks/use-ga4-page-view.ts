import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

const CONSENT_STORAGE_KEY = 'cookie-consent';

function hasAnalyticsConsent(): boolean {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return false;
    const parsed = JSON.parse(stored);
    return parsed?.status === 'accepted' && parsed?.analytics === true;
  } catch {
    return false;
  }
}

export function useGa4PageView() {
  const [location] = useLocation();
  const isInitialLocation = useRef(true);

  useEffect(() => {
    if (isInitialLocation.current) {
      isInitialLocation.current = false;
      return;
    }

    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    if (!hasAnalyticsConsent()) return;

    window.gtag('event', 'page_view', {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);
}
