import { useEffect } from "react";
import { installConsentBridge } from "@/lib/consent-bridge";

/**
 * Koppelt de Funding Choices-keuze aan Consent Mode (analytics_storage) en aan
 * de lokale toestemming waarop use-page-view-tracking.ts steunt.
 * Zie client/src/lib/consent-bridge.ts voor de achtergrond.
 */
export function useConsentBridge() {
  useEffect(() => installConsentBridge(), []);
}
