import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import type { Bank, Product, Rate } from "@shared/schema";

interface DynamicComparisonTableProps {
  productType: 'spaarrekening' | 'deposito' | 'kasbon' | 'termijnrekening' | 'hypotheek' | 'persoonlijke_lening' | 'autolening';
  limit?: number;
  showOnlyFeatured?: boolean;
}

interface EnrichedProduct {
  product: Product;
  bank: Bank;
  rate: Rate | null;
  totalRate: number;
}

function formatRate(rate: number | string | null | undefined): string {
  if (rate === null || rate === undefined) return "-";
  const numRate = typeof rate === "string" ? parseFloat(rate) : rate;
  if (isNaN(numRate)) return "-";
  return numRate.toFixed(2) + "%";
}

function formatAmount(amount: string | null | undefined): string {
  if (!amount) return "-";
  const num = parseFloat(amount);
  if (isNaN(num)) return "-";
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

function addRefParam(url: string | null | undefined): string {
  if (!url) return "#";
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("ref", "interesten.be");
    return parsed.toString();
  } catch {
    return url + (url.includes("?") ? "&" : "?") + "ref=interesten.be";
  }
}

export function DynamicComparisonTable({
  productType,
  limit = 10,
  showOnlyFeatured = false,
}: DynamicComparisonTableProps) {
  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { type: productType }],
    queryFn: async () => {
      const res = await fetch(`/api/products?type=${productType}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  const { data: banks, isLoading: banksLoading } = useQuery<Bank[]>({
    queryKey: ["/api/banks"],
  });

  const { data: rates, isLoading: ratesLoading } = useQuery<Rate[]>({
    queryKey: ["/api/rates"],
  });

  const isLoading = productsLoading || banksLoading || ratesLoading;

  const enrichedProducts: EnrichedProduct[] = (() => {
    if (!products || !banks || !rates) return [];

    const bankMap = new Map(banks.map((b) => [b.id, b]));
    const rateMap = new Map<string, Rate>();
    
    for (const rate of rates) {
      if (rate.isActive) {
        const existing = rateMap.get(rate.productId);
        if (!existing || new Date(rate.effectiveDate) > new Date(existing.effectiveDate)) {
          rateMap.set(rate.productId, rate);
        }
      }
    }

    let result: EnrichedProduct[] = products
      .filter((p) => p.isActive)
      .filter((p) => !showOnlyFeatured || p.isFeatured)
      .map((product) => {
        const bank = bankMap.get(product.bankId);
        const rate = rateMap.get(product.id) || null;
        const baseRate = rate?.baseRate ? parseFloat(rate.baseRate) : 0;
        const loyaltyBonus = rate?.loyaltyBonus ? parseFloat(rate.loyaltyBonus) : 0;
        const totalRate = baseRate + loyaltyBonus;

        return {
          product,
          bank: bank!,
          rate,
          totalRate,
        };
      })
      .filter((item) => item.bank);

    result.sort((a, b) => b.totalRate - a.totalRate);

    return result.slice(0, limit);
  })();

  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bank</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Basisrente</TableHead>
              <TableHead>Bonus</TableHead>
              <TableHead>Totaal</TableHead>
              <TableHead>Min. bedrag</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-8 w-28" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (enrichedProducts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Geen producten gevonden voor dit type.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bank</TableHead>
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Basisrente</TableHead>
            <TableHead className="text-right">Bonus</TableHead>
            <TableHead className="text-right">Totaal</TableHead>
            <TableHead className="text-right">Min. bedrag</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrichedProducts.map(({ product, bank, rate, totalRate }) => {
            const affiliateUrl = product.affiliateUrl
              ? addRefParam(product.affiliateUrl)
              : addRefParam(bank.website);

            return (
              <TableRow
                key={product.id}
                className={product.isFeatured ? "bg-primary/5" : ""}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    {bank.logoUrl && (
                      <img
                        src={bank.logoUrl}
                        alt={bank.name}
                        className="h-6 w-6 object-contain"
                      />
                    )}
                    <span className="font-medium">{bank.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{product.name}</span>
                    {product.isFeatured && (
                      <Badge variant="secondary" className="text-xs">
                        Aanbevolen
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">
                  {formatRate(rate?.baseRate)}
                </TableCell>
                <TableCell className="text-right font-mono text-green-600">
                  {rate?.loyaltyBonus && parseFloat(rate.loyaltyBonus) > 0
                    ? `+${formatRate(rate.loyaltyBonus)}`
                    : "-"}
                </TableCell>
                <TableCell className="text-right font-mono font-semibold">
                  {formatRate(totalRate)}
                </TableCell>
                <TableCell className="text-right">
                  {formatAmount(product.minAmount)}
                </TableCell>
                <TableCell>
                  <Button
                    asChild
                    variant={product.affiliateUrl ? "default" : "outline"}
                    size="sm"
                  >
                    <a
                      href={affiliateUrl}
                      target="_blank"
                      rel="noopener sponsored"
                    >
                      Open rekening
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
