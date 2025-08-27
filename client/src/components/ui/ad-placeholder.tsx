import { Card, CardContent } from "@/components/ui/card";

interface AdPlaceholderProps {
  size: "banner" | "rectangle" | "skyscraper" | "leaderboard";
  className?: string;
}

const adSizes = {
  banner: { width: "728px", height: "90px", label: "728x90 Banner" },
  rectangle: { width: "300px", height: "250px", label: "300x250 Rectangle" },
  skyscraper: { width: "160px", height: "600px", label: "160x600 Skyscraper" },
  leaderboard: { width: "970px", height: "90px", label: "970x90 Leaderboard" },
};

export default function AdPlaceholder({ size, className = "" }: AdPlaceholderProps) {
  const adSize = adSizes[size];

  return (
    <Card className={`border-dashed border-2 border-muted-foreground/30 ${className}`}>
      <CardContent 
        className="flex items-center justify-center p-4 text-muted-foreground bg-muted/20"
        style={{ 
          width: adSize.width, 
          height: adSize.height,
          maxWidth: "100%"
        }}
        data-testid={`ad-placeholder-${size}`}
      >
        <div className="text-center">
          <div className="text-sm font-medium mb-1">Google Ads</div>
          <div className="text-xs opacity-70">{adSize.label}</div>
        </div>
      </CardContent>
    </Card>
  );
}