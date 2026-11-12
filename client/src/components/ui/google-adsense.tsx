interface GoogleAdsenseProps {
  slot?: 'banner' | 'rectangle' | 'article';
  className?: string;
}

// Ankerpunt voor AdSense Auto Ads (ingeschakeld in index.html). Google kiest
// zelf waar advertenties komen en gebruikt dit element niet als slot; daarom
// reserveert het geen hoogte meer. De oude vaste min-height (90/250 px) stond
// als leeg wit blok op elke pagina, 3 tot 5 keer per pagina.
export default function GoogleAdsense({
  slot = 'banner',
  className = '',
}: GoogleAdsenseProps) {
  return (
    <div
      className={`auto-ads-anchor w-full ${className}`}
      data-testid={`google-ad-${slot}`}
      data-ad-slot-type={slot}
      aria-hidden="true"
    />
  );
}
