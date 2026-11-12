import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

// Hoeveel frames we hoogstens wachten tot een anker-element (#id) bestaat; lazy
// routes renderen pas na het laden van hun chunk.
const MAX_ANCHOR_FRAMES = 30;

function scrollToAnchor(id: string, framesLeft: number): void {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView();
    return;
  }
  if (framesLeft > 0) {
    requestAnimationFrame(() => scrollToAnchor(id, framesLeft - 1));
  }
}

/**
 * Scrollt naar boven bij elke navigatie binnen de app (wouter-link, setLocation).
 * Zonder deze hook blijft de bezoeker na een paginawissel op de oude
 * scrollpositie staan, dus vaak onderaan de nieuwe pagina.
 *
 * - Browser terug/vooruit (popstate): we grijpen niet in, de browser herstelt
 *   dan zelf de vorige scrollpositie.
 * - In-page ankers (#id): we scrollen naar dat element zodra het bestaat.
 * - Eerste render: niets doen (bij een herlaad staat de browser al goed).
 */
export function useScrollToTop() {
  const [location] = useLocation();
  const isInitial = useRef(true);
  const viaHistory = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      viaHistory.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    if (viaHistory.current) {
      viaHistory.current = false;
      return;
    }
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (hash.length > 1) {
      scrollToAnchor(decodeURIComponent(hash.slice(1)), MAX_ANCHOR_FRAMES);
      return;
    }
    window.scrollTo(0, 0);
  }, [location]);
}
