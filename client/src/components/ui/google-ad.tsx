import { useEffect } from "react";
import { useConsent } from "@/hooks/use-consent";

interface GoogleAdProps {
  size: "banner" | "rectangle" | "skyscraper" | "leaderboard";
  className?: string;
  adClient?: string; // ca-pub-XXXXXXXXXXXXXXXX
  adSlot?: string;   // XXXXXXXXXX
}

const adSizes = {
  banner: { width: "728", height: "90" },
  rectangle: { width: "300", height: "250" },
  skyscraper: { width: "160", height: "600" },
  leaderboard: { width: "970", height: "90" },
};

export default function GoogleAd({ 
  size, 
  className = "", 
  adClient = "ca-pub-XXXXXXXXXXXXXXXX", // Vervang met uw eigen client ID
  adSlot = "XXXXXXXXXX" // Vervang met uw slot ID
}: GoogleAdProps) {
  const adSize = adSizes[size];
  const { hasAdvertisingConsent, consent } = useConsent();

  useEffect(() => {
    // Only load ads if user has given consent
    if (hasAdvertisingConsent && consent.status === 'accepted') {
      try {
        // Push ad to AdSense
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [hasAdvertisingConsent, consent.status]);

  // Development mode - show placeholder
  if (process.env.NODE_ENV === 'development') {
    return (
      <div 
        className={`border-dashed border-2 border-muted-foreground/30 flex items-center justify-center p-4 text-muted-foreground bg-muted/20 ${className}`}
        style={{ 
          width: `${adSize.width}px`, 
          height: `${adSize.height}px`,
          maxWidth: "100%"
        }}
      >
        <div className="text-center">
          <div className="text-sm font-medium mb-1">Google Ads</div>
          <div className="text-xs opacity-70">{adSize.width}x{adSize.height}</div>
          {!hasAdvertisingConsent && (
            <div className="text-xs text-orange-600 mt-1">Consent Required</div>
          )}
        </div>
      </div>
    );
  }

  // If no advertising consent, show privacy-friendly message
  if (!hasAdvertisingConsent) {
    return (
      <div 
        className={`border border-border flex items-center justify-center p-4 text-muted-foreground bg-muted/10 ${className}`}
        style={{ 
          width: `${adSize.width}px`, 
          height: `${adSize.height}px`,
          maxWidth: "100%"
        }}
      >
        <div className="text-center">
          <div className="text-sm font-medium mb-2">🔒 Privacy Beschermd</div>
          <div className="text-xs">
            Advertenties zijn uitgeschakeld om uw privacy te respecteren
          </div>
        </div>
      </div>
    );
  }

  // Production mode - show real ads (only with consent)
  return (
    <div className={className}>
      <ins 
        className="adsbygoogle"
        style={{ 
          display: "block",
          width: `${adSize.width}px`,
          height: `${adSize.height}px`
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}