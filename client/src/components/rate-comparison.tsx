import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Building2, Percent } from "lucide-react";
import type { RateComparison } from "@shared/schema";

interface RateComparisonProps {
  productType: string;
  title: string;
  showTop?: number;
  showBankLogos?: boolean;
  className?: string;
}

export default function RateComparisonWidget({ 
  productType, 
  title, 
  showTop = 5,
  showBankLogos = true,
  className = ""
}: RateComparisonProps) {
  const { data: comparison, isLoading, error } = useQuery<RateComparison>({
    queryKey: ["/api/rates/by-type", productType],
    queryFn: async () => {
      const response = await fetch(`/api/rates/by-type/${productType}`);
      if (!response.ok) throw new Error("Failed to fetch rates");
      return response.json();
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={20} />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-6 w-12" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !comparison?.rates?.length) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={20} />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Momenteel geen actuele tarieven beschikbaar. Probeer later opnieuw.
          </p>
        </CardContent>
      </Card>
    );
  }

  const topRates = comparison.rates
    .sort((a, b) => {
      // For savings products, higher rate is better
      if (productType === 'spaarrekening' || productType === 'deposito') {
        return b.totalRate - a.totalRate;
      }
      // For loans/mortgages, lower rate is better
      return a.totalRate - b.totalRate;
    })
    .slice(0, showTop);

  const isSavingsProduct = productType === 'spaarrekening' || productType === 'deposito';

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp size={20} />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Actuele tarieven van Belgische banken - automatisch bijgewerkt
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topRates.map((rate, index) => (
            <div 
              key={`${rate.bankName}-${rate.productName}`}
              className={`flex items-center justify-between p-3 border rounded-lg transition-colors hover:bg-muted/50 ${
                index === 0 ? 'border-primary bg-primary/5' : ''
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${
                  index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm" data-testid={`rate-bank-${rate.bankName}`}>
                      {rate.bankName}
                    </h4>
                    {index === 0 && (
                      <Badge variant="default" className="text-xs">
                        {isSavingsProduct ? 'Hoogste' : 'Laagste'}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground" data-testid={`rate-product-${rate.productName}`}>
                    {rate.productName}
                  </p>
                  {rate.conditions && (
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {rate.conditions}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-2">
                  <div>
                    <div className={`text-lg font-bold ${
                      index === 0 ? 'text-primary' : 'text-foreground'
                    }`} data-testid={`rate-total-${rate.bankName}`}>
                      {rate.totalRate.toFixed(2)}%
                    </div>
                    {rate.loyaltyBonus > 0 && (
                      <div className="text-xs text-muted-foreground">
                        {rate.baseRate.toFixed(2)}% + {rate.loyaltyBonus.toFixed(2)}%
                      </div>
                    )}
                  </div>
                  <Percent size={16} className="text-muted-foreground" />
                </div>
                
                {(rate.minAmount || rate.maxAmount) && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {rate.minAmount && `Min: €${Number(rate.minAmount).toLocaleString()}`}
                    {rate.minAmount && rate.maxAmount && ' - '}
                    {rate.maxAmount && `Max: €${Number(rate.maxAmount).toLocaleString()}`}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {comparison.rates.length > showTop && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              {comparison.rates.length - showTop} meer tarieven beschikbaar
            </p>
          </div>
        )}

        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            <Building2 size={12} className="inline mr-1" />
            Tarieven kunnen dagelijks wijzigen. Controleer altijd de actuele voorwaarden bij de bank.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}