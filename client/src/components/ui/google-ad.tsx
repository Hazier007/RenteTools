import { useConsent } from "@/hooks/use-consent";

interface GoogleAdProps {
  size: "banner" | "rectangle" | "skyscraper" | "leaderboard";
  className?: string;
}

const adSizes = {
  banner: { width: "728", height: "90" },
  rectangle: { width: "300", height: "250" },
  skyscraper: { width: "160", height: "600" },
  leaderboard: { width: "970", height: "90" },
};

// Auto Ads anchor component with consent checking
// With Auto Ads enabled in index.html, Google automatically places ads
// This component provides anchor points and respects user consent
export default function GoogleAd({ 
  size, 
  className = ""
}: GoogleAdProps) {
  const adSize = adSizes[size];
  const { hasAdvertisingConsent, consent } = useConsent();

  // Development mode - show placeholder
  if (import.meta.env.DEV) {
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
          <div className="text-sm font-medium mb-1">Google Auto Ads</div>
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

  // Production mode with consent - Auto Ads anchor point
  return (
    <div 
      className={className}
      style={{
        minWidth: `${adSize.width}px`,
        minHeight: `${adSize.height}px`,
        maxWidth: "100%",
        display: "block"
      }}
      data-ad-anchor={size}
    >
      {/* Auto Ads will fill this space automatically */}
    </div>
  );
}
