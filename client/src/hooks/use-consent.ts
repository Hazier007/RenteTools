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
        // Apply stored consent to Google services
        updateGoogleConsent(parsed);
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
    
    // Update Google Analytics consent immediately
    updateGoogleConsent(newConsent);
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
    
    // Update Google consent to denied
    updateGoogleConsent(newConsent);
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

  const updateGoogleConsent = (consentState: ConsentState) => {
    if (!window.gtag) {
      console.warn('Google Analytics not loaded');
      return;
    }

    // Update Google Analytics consent
    if (consentState.analytics) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
      console.log('✅ Google Analytics consent granted');
    } else {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }

    // Update Google AdSense consent
    if (consentState.advertising) {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
      console.log('✅ Google AdSense consent granted');
    } else {
      window.gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
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