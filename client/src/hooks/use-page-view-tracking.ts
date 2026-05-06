import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

const STORAGE_KEY = "cookie-consent";

function hasAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { analytics?: boolean };
    return parsed?.analytics === true;
  } catch {
    return false;
  }
}

// Emits a GA4 page_view on every wouter location change after the initial
// landing. The initial page_view is already fired by gtag('config', ...) in
// index.html, so we skip the first effect run to avoid a double-fire.
// Gated on Consent Mode v2 analytics_storage (mirrored from localStorage by
// useConsent) so we stay aligned with the Funding Choices banner state.
export function usePageViewTracking() {
  const [location] = useLocation();
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    if (!hasAnalyticsConsent()) return;
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);
}
