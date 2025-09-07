import { useState, useEffect } from 'react';

export type ConsentStatus = 'pending' | 'accepted' | 'rejected';

interface ConsentState {
  status: ConsentStatus;
  timestamp?: number;
  analytics: boolean;
  advertising: boolean;
}

const STORAGE_KEY = 'cookie-consent';

export function useConsent() {
  const [consent, setConsent] = useState<ConsentState>({
    status: 'pending',
    analytics: false,
    advertising: false,
  });

  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Load consent from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setConsent(parsed);
        setShowBanner(false);
      } else {
        setShowBanner(true);
      }
    } catch (error) {
      console.error('Error loading consent:', error);
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const newConsent: ConsentState = {
      status: 'accepted',
      timestamp: Date.now(),
      analytics: true,
      advertising: true,
    };
    
    setConsent(newConsent);
    setShowBanner(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConsent));
    
    // Load Google Analytics and AdSense
    loadGoogleServices();
  };

  const rejectAll = () => {
    const newConsent: ConsentState = {
      status: 'rejected',
      timestamp: Date.now(),
      analytics: false,
      advertising: false,
    };
    
    setConsent(newConsent);
    setShowBanner(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConsent));
  };

  const resetConsent = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConsent({
      status: 'pending',
      analytics: false,
      advertising: false,
    });
    setShowBanner(true);
  };

  const loadGoogleServices = () => {
    // Load Google Analytics
    if (consent.analytics || consent.status === 'accepted') {
      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted',
      });
    }

    // Load Google AdSense
    if (consent.advertising || consent.status === 'accepted') {
      window.gtag?.('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    }
  };

  return {
    consent,
    showBanner,
    acceptAll,
    rejectAll,
    resetConsent,
    hasConsent: consent.status !== 'pending',
    hasAdvertisingConsent: consent.advertising,
    hasAnalyticsConsent: consent.analytics,
  };
}

// Global type for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}