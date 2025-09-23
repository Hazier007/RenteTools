import { useEffect, useRef } from 'react';

interface GoogleAdsenseProps {
  slot: 'banner' | 'rectangle' | 'article';
  format?: 'auto' | 'fluid';
  layout?: 'in-article' | '';
  responsive?: boolean;
  className?: string;
}

// Get slot IDs from the Google AdSense configuration
const getSlotId = (slot: GoogleAdsenseProps['slot']): string => {
  switch (slot) {
    case 'banner':
      return '3769127417'; // 320x50 banner slot
    case 'rectangle': 
      return '2456045742'; // 300x250 rectangle slot
    case 'article':
      return '9213025780'; // In-article slot
    default:
      return '3769127417'; // Default to banner
  }
};

const getPublisherId = (): string => {
  return 'ca-pub-1772283634325864';
};

export default function GoogleAdsense({ 
  slot, 
  format = 'auto', 
  layout = '',
  responsive = true,
  className = '' 
}: GoogleAdsenseProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    // Only load the ad once per component instance
    if (isAdLoaded.current) return;
    
    const loadAd = () => {
      try {
        // Ensure adsbygoogle array exists
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        
        // Push the ad configuration
        (window as any).adsbygoogle.push({});
        isAdLoaded.current = true;
      } catch (error) {
        console.error('Error loading Google AdSense ad:', error);
      }
    };

    // Load immediately if script is already available
    if ((window as any).adsbygoogle) {
      loadAd();
    } else {
      // Wait for script to load
      const script = document.querySelector('script[src*="adsbygoogle.js"]');
      if (script) {
        script.addEventListener('load', loadAd);
        return () => script.removeEventListener('load', loadAd);
      }
    }
  }, []);

  const slotId = getSlotId(slot);
  const publisherId = getPublisherId();

  // Define styles based on slot type
  const getAdStyle = (): React.CSSProperties => {
    switch (slot) {
      case 'banner':
        return { display: 'block' };
      case 'rectangle':
        return { display: 'block' };
      case 'article':
        return { display: 'block', textAlign: 'center' };
      default:
        return { display: 'block' };
    }
  };

  return (
    <div className={`adsense-container ${className}`} data-testid={`google-ad-${slot}`}>
      <ins 
        ref={adRef}
        className="adsbygoogle"
        style={getAdStyle()}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
        data-ad-format={format}
        {...(layout && { 'data-ad-layout': layout })}
        {...(responsive && { 'data-full-width-responsive': 'true' })}
      />
    </div>
  );
}