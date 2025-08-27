import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface CalculationResultProps {
  label: string;
  value: string;
  variant?: "default" | "success" | "info" | "warning" | "error";
  className?: string;
  "data-testid"?: string;
}

export default function CalculationResult({ 
  label, 
  value, 
  variant = "default", 
  className,
  "data-testid": testId 
}: CalculationResultProps) {
  const variantStyles = {
    default: "text-foreground",
    success: "text-secondary",
    info: "text-primary", 
    warning: "text-destructive",
    error: "text-destructive",
  };

  return (
    <Card className="border border-border">
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div 
          className={cn(
            "text-2xl font-bold",
            variantStyles[variant],
            className
          )}
          data-testid={testId}
        >
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
