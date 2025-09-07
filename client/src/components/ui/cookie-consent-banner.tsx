import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useConsent } from "@/hooks/use-consent";

export default function CookieConsentBanner() {
  const { showBanner, acceptAll, rejectAll } = useConsent();

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t border-border">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-2xl">🍪</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Cookie en Privacy Voorkeuren
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Deze website gebruikt cookies om uw ervaring te verbeteren en relevante advertenties te tonen. 
                    We gebruiken Google Analytics voor websitestatistieken en Google AdSense voor advertenties. 
                    Door "Alles Accepteren" te kiezen, stemt u in met alle cookies. 
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Meer informatie vindt u in ons{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                      privacybeleid
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 lg:min-w-[280px]">
              <Button
                variant="outline"
                onClick={rejectAll}
                className="flex-1"
                data-testid="button-reject-cookies"
              >
                <i className="fas fa-times mr-2"></i>
                Alleen Noodzakelijke
              </Button>
              <Button
                onClick={acceptAll}
                className="flex-1"
                data-testid="button-accept-cookies"
              >
                <i className="fas fa-check mr-2"></i>
                Alles Accepteren
              </Button>
            </div>
          </div>

          {/* Technical Details */}
          <div className="mt-4 pt-4 border-t border-border">
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer hover:text-foreground">
                Technische details over cookies
              </summary>
              <div className="mt-2 space-y-1">
                <p><strong>Analytische cookies:</strong> Google Analytics voor websitestatistieken</p>
                <p><strong>Advertentie cookies:</strong> Google AdSense voor gepersonaliseerde advertenties</p>
                <p><strong>Functionele cookies:</strong> Essentieel voor de werking van de website</p>
                <p>U kunt uw toestemming op elk moment intrekken via ons privacybeleid.</p>
              </div>
            </details>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}