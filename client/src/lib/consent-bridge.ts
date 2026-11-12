// Brug tussen de Funding Choices-cookiebanner (IAB TCF v2) en Google Consent
// Mode v2 voor Google Analytics.
//
// Waarom: sinds de Funding Choices-migratie (26 april 2026) is er geen eigen
// cookiebanner meer. gtag leidt de advertentietoestemmingen (ad_storage,
// ad_user_data, ad_personalization) zelf af uit het TCF-signaal, maar
// analytics_storage valt buiten TCF en bleef daardoor altijd "denied". Elke
// GA4-hit vertrok als cookieloze ping (gcs=G100) en de rapporten bleven leeg
// vanaf 27 april 2026. Deze module luistert naar de TCF-beslissing en zet
// analytics_storage op "granted" zodra de bezoeker opslag (doel 1) en meting
// (doel 8) toestaat en Google (vendor 755) als leverancier aanvaardt.
//
// Daarnaast schrijft ze de beslissing naar localStorage onder dezelfde sleutel
// als de oude banner ("cookie-consent"), zodat use-page-view-tracking.ts en
// use-consent.ts opnieuw werken, en stuurt ze de eerste page_view opnieuw
// wanneer die al cookieloos vertrokken was vóór de toestemming binnenkwam.

export const STORAGE_KEY = "cookie-consent";
/** IAB Global Vendor List: Google Advertising Products (gebruikt door GA4 en AdSense). */
export const GOOGLE_VENDOR_ID = 755;
/** TCF-doelen: 1 = opslaan/uitlezen van informatie, 8 = prestaties van content meten. */
const DOEL_OPSLAG = "1";
const DOEL_METEN = "8";
const DOEL_PROFIEL_ADS = "3";
const DOEL_PERSONALISATIE_ADS = "4";

export interface TcDataLike {
  eventStatus?: string; // "tcloaded" | "cmpuishown" | "useractioncomplete"
  gdprApplies?: boolean;
  listenerId?: number;
  purpose?: {
    consents?: Record<string, boolean>;
    legitimateInterests?: Record<string, boolean>;
  };
  vendor?: {
    consents?: Record<string, boolean>;
    legitimateInterests?: Record<string, boolean>;
  };
}

export interface ConsentBeslissing {
  analytics: boolean;
  advertising: boolean;
}

export interface OpgeslagenConsent extends ConsentBeslissing {
  status: "accepted" | "rejected";
  timestamp: number;
  bron: "funding-choices";
}

/**
 * Vertaalt een TCF-signaal naar een beslissing voor Consent Mode.
 * Geeft null terug zolang de bezoeker nog niets gekozen heeft (banner zichtbaar).
 */
export function beslissingUitTcData(tc: TcDataLike | null | undefined): ConsentBeslissing | null {
  if (!tc) return null;
  if (tc.eventStatus !== "tcloaded" && tc.eventStatus !== "useractioncomplete") return null;
  // Buiten de EER vraagt Funding Choices geen toestemming: dan geldt de banner niet.
  if (tc.gdprApplies === false) return { analytics: true, advertising: true };

  const consents = tc.purpose?.consents ?? {};
  const li = tc.purpose?.legitimateInterests ?? {};
  const googleAanvaard = tc.vendor?.consents?.[String(GOOGLE_VENDOR_ID)] === true;
  const opslag = consents[DOEL_OPSLAG] === true;
  const meten = consents[DOEL_METEN] === true || li[DOEL_METEN] === true;

  return {
    analytics: opslag && meten && googleAanvaard,
    advertising: opslag && consents[DOEL_PROFIEL_ADS] === true && consents[DOEL_PERSONALISATIE_ADS] === true && googleAanvaard,
  };
}

declare global {
  interface Window {
    __tcfapi?: (command: string, version: number, callback: (...args: any[]) => void, parameter?: unknown) => void;
  }
}

function pageViewAlMetToestemmingVerstuurd(): boolean {
  // GA4 zet de parameters van losse events in de URL van de collect-call; een
  // page_view die met toestemming vertrok draagt gcs=G1x1. Gebatchte events
  // (zeldzaam bij de eerste hit) staan in de body en zijn hier onzichtbaar,
  // wat hoogstens één dubbele page_view oplevert.
  try {
    return performance
      .getEntriesByType("resource")
      .some((r) => /\/g\/collect\?/.test(r.name) && /[?&]en=page_view(&|$)/.test(r.name) && /[?&]gcs=G1/.test(r.name));
  } catch {
    return false;
  }
}

const MAX_POGINGEN = 120; // 120 × 250 ms = 30 s; de CMP laadt pas na het load-event + idle.

/**
 * Registreert de brug. Geeft een opruimfunctie terug (voor useEffect).
 * Veilig om meermaals aan te roepen: een tweede instantie merkt dezelfde
 * beslissing en doet dan niets extra.
 */
export function installConsentBridge(): () => void {
  if (typeof window === "undefined") return () => {};

  let gestopt = false;
  let geregistreerd = false;
  let pogingen = 0;
  let listenerId: number | undefined;
  let laatsteBeslissing: string | null = null;
  let eerstePageViewHersteld = false;

  const pasToe = (beslissing: ConsentBeslissing) => {
    const sleutel = `${beslissing.analytics}|${beslissing.advertising}`;
    if (sleutel === laatsteBeslissing) return;
    laatsteBeslissing = sleutel;

    const state: OpgeslagenConsent = {
      status: beslissing.analytics || beslissing.advertising ? "accepted" : "rejected",
      timestamp: Date.now(),
      analytics: beslissing.analytics,
      advertising: beslissing.advertising,
      bron: "funding-choices",
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // private modus of geblokkeerde opslag: dan werkt enkel de gtag-update.
    }

    if (typeof window.gtag === "function") {
      // Enkel analytics_storage: de ad_*-toestemmingen leidt gtag zelf af uit TCF.
      window.gtag("consent", "update", { analytics_storage: beslissing.analytics ? "granted" : "denied" });

      if (beslissing.analytics && !eerstePageViewHersteld) {
        eerstePageViewHersteld = true;
        if (!pageViewAlMetToestemmingVerstuurd()) {
          window.gtag("event", "page_view", {
            page_location: window.location.href,
            page_path: window.location.pathname + window.location.search,
            page_title: document.title,
          });
        }
      }
    }

    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: state }));
  };

  const onTcData = (tc: TcDataLike, success: boolean) => {
    if (!success || gestopt) return;
    if (typeof tc?.listenerId === "number") listenerId = tc.listenerId;
    const beslissing = beslissingUitTcData(tc);
    if (beslissing) pasToe(beslissing);
  };

  const probeer = () => {
    if (gestopt || geregistreerd) return;
    pogingen++;
    const api = window.__tcfapi;
    if (typeof api === "function") {
      geregistreerd = true;
      window.clearInterval(timer);
      api("addEventListener", 2, onTcData);
      return;
    }
    if (pogingen >= MAX_POGINGEN) window.clearInterval(timer);
  };

  const timer = window.setInterval(probeer, 250);
  probeer();

  return () => {
    gestopt = true;
    window.clearInterval(timer);
    if (geregistreerd && typeof listenerId === "number" && typeof window.__tcfapi === "function") {
      try {
        window.__tcfapi("removeEventListener", 2, () => {}, listenerId);
      } catch {
        // CMP al verdwenen; niets te doen.
      }
    }
  };
}
