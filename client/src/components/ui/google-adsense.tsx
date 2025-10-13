interface GoogleAdsenseProps {
  slot?: 'banner' | 'rectangle' | 'article';
  className?: string;
}

// Simple Auto Ads anchor component
// With Auto Ads enabled in index.html, Google automatically places ads throughout your site
// This component serves as an anchor point where ads are preferred
export default function GoogleAdsense({ 
  slot = 'banner',
  className = '' 
}: GoogleAdsenseProps) {
  // No initialization needed - Auto Ads handles everything automatically from index.html

  // Define min-height based on slot type for layout stability
  const getMinHeight = (): string => {
    switch (slot) {
      case 'banner':
        return '90px';
      case 'rectangle':
        return '250px';
      case 'article':
        return '250px';
      default:
        return '90px';
    }
  };

  return (
    <div 
      className={`auto-ads-anchor ${className}`} 
      data-testid={`google-ad-${slot}`} 
      style={{ minHeight: getMinHeight(), display: 'block', width: '100%' }}
    >
      {/* Auto Ads anchor point - Google will automatically fill this space */}
      <div 
        style={{ display: 'block', minHeight: getMinHeight() }}
        data-ad-slot-type={slot}
      />
    </div>
  );
}
