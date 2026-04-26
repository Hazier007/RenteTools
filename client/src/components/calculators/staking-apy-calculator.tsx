import { useState, useEffect, lazy, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NumberInput from "@/components/ui/number-input";
import CalculationResult from "@/components/ui/calculation-result";
import { ChartSkeleton } from "@/components/ui/chart-skeleton";
import { formatCurrency, formatPercentage } from "@/lib/formatters";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";
import type { Product, Bank } from "@shared/schema";

const StakingApyChart = lazy(() => import("./staking-apy-chart"));

const stakingSchema = z.object({
  bedrag: z.number().min(0, "Bedrag moet positief zijn"),
  apy: z.number().min(0, "APY moet positief zijn").max(1000, "APY lijkt onrealistisch"),
  compoundingFrequentie: z.enum(["dagelijks", "wekelijks", "maandelijks", "jaarlijks"]),
  duurType: z.enum(["dagen", "maanden"]),
  duur: z.number().min(1, "Duur moet minimaal 1 zijn").max(3650, "Duur kan niet meer dan 10 jaar zijn"),
  platformFees: z.number().min(0, "Fees moeten positief zijn").max(100, "Fees kunnen niet meer dan 100% zijn"),
});

type StakingFormData = z.infer<typeof stakingSchema>;

interface StakingResult {
  apr: number;
  brutoBedrag: number;
  brutoRendement: number;
  feesBedrag: number;
  nettoBedrag: number;
  nettoRendement: number;
  chartData: Array<{ dag: number; waarde: number }>;
}

function getCompoundingPeriods(frequentie: string): number {
  switch (frequentie) {
    case "dagelijks": return 365;
    case "wekelijks": return 52;
    case "maandelijks": return 12;
    case "jaarlijks": return 1;
    default: return 365;
  }
}

function apyToApr(apy: number, n: number): number {
  return n * (Math.pow(1 + apy / 100, 1 / n) - 1) * 100;
}

function calculateStaking(data: StakingFormData): StakingResult {
  const { bedrag, apy, compoundingFrequentie, duurType, duur, platformFees } = data;
  
  const n = getCompoundingPeriods(compoundingFrequentie);
  const apr = apyToApr(apy, n);
  
  const dagenTotaal = duurType === "dagen" ? duur : duur * 30;
  const jarenTotaal = dagenTotaal / 365;
  
  const brutoBedrag = bedrag * Math.pow(1 + apy / 100, jarenTotaal);
  const brutoRendement = brutoBedrag - bedrag;
  
  const feesBedrag = brutoRendement * (platformFees / 100);
  const nettoRendement = brutoRendement - feesBedrag;
  const nettoBedrag = bedrag + nettoRendement;
  
  const chartData: Array<{ dag: number; waarde: number }> = [];
  const interval = Math.max(1, Math.floor(dagenTotaal / 30));
  
  for (let dag = 0; dag <= dagenTotaal; dag += interval) {
    const jaren = dag / 365;
    const waardeBruto = bedrag * Math.pow(1 + apy / 100, jaren);
    const rendementTotNu = waardeBruto - bedrag;
    const feesTotNu = rendementTotNu * (platformFees / 100);
    const waardeNetto = waardeBruto - feesTotNu;
    chartData.push({ dag, waarde: waardeNetto });
  }
  
  if (chartData[chartData.length - 1]?.dag !== dagenTotaal) {
    chartData.push({ dag: dagenTotaal, waarde: nettoBedrag });
  }
  
  return {
    apr,
    brutoBedrag,
    brutoRendement,
    feesBedrag,
    nettoBedrag,
    nettoRendement,
    chartData,
  };
}

function CryptoAffiliateCTA() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { type: "crypto_platform" }],
    queryFn: async () => {
      const res = await fetch("/api/products?type=crypto_platform");
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: banks } = useQuery<Bank[]>({
    queryKey: ["/api/banks"],
  });

  const bankMap = new Map(banks?.map((b) => [b.id, b]) || []);

  const activeProducts = products?.filter((p) => p.isActive) || [];

  if (isLoading) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl">Start met Crypto Staking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activeProducts.length === 0) {
    return null;
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

  return (
    <Card className="mt-8 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10">
        <CardTitle className="text-xl">
          <i className="fas fa-coins mr-2"></i>
          Start met Crypto Staking
        </CardTitle>
        <p className="text-muted-foreground">
          Open een account bij een betrouwbaar crypto platform en begin met staken
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeProducts.map((product) => {
            const bank = bankMap.get(product.bankId);
            const affiliateUrl = product.affiliateUrl
              ? addRefParam(product.affiliateUrl)
              : bank?.website
              ? addRefParam(bank.website)
              : "#";

            return (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {bank?.logoUrl && (
                    <img
                      src={bank.logoUrl}
                      alt={bank?.name || product.name}
                      className="h-8 w-8 object-contain rounded"
                    />
                  )}
                  <div>
                    <div className="font-medium">{product.name}</div>
                    {bank && (
                      <div className="text-sm text-muted-foreground">{bank.name}</div>
                    )}
                  </div>
                </div>
                <Button asChild size="sm" variant="outline">
                  <a href={affiliateUrl} target="_blank" rel="noopener noreferrer">
                    Open account
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default function StakingApyCalculator() {
  const [result, setResult] = useState<StakingResult | null>(null);

  const form = useForm<StakingFormData>({
    resolver: zodResolver(stakingSchema),
    defaultValues: {
      bedrag: 1000,
      apy: 5.0,
      compoundingFrequentie: "dagelijks",
      duurType: "maanden",
      duur: 12,
      platformFees: 0,
    },
  });

  const onSubmit = (data: StakingFormData) => {
    const calculationResult = calculateStaking(data);
    setResult(calculationResult);
  };

  useEffect(() => {
    const subscription = form.watch((data) => {
      if (data.bedrag && data.apy !== undefined && data.duur) {
        const calculationResult = calculateStaking(data as StakingFormData);
        setResult(calculationResult);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
          <CardTitle className="text-2xl font-bold">
            <i className="fas fa-layer-group mr-3"></i>
            Staking APY Calculator
          </CardTitle>
          <p className="opacity-90">
            Bereken uw crypto staking opbrengst, APY naar APR conversie en netto rendement
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Invoer Parameters</h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="bedrag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Initieel Bedrag (€)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="1.000"
                            data-testid="input-bedrag"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="apy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>APY (%)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="5.0"
                            step={0.1}
                            data-testid="input-apy"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="compoundingFrequentie"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Compounding Frequentie</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger data-testid="select-compounding">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dagelijks">Dagelijks (365x/jaar)</SelectItem>
                              <SelectItem value="wekelijks">Wekelijks (52x/jaar)</SelectItem>
                              <SelectItem value="maandelijks">Maandelijks (12x/jaar)</SelectItem>
                              <SelectItem value="jaarlijks">Jaarlijks (1x/jaar)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="duur"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Staking Duur</FormLabel>
                          <FormControl>
                            <NumberInput
                              {...field}
                              placeholder="12"
                              data-testid="input-duur"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duurType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Eenheid</FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger data-testid="select-duur-type">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="dagen">Dagen</SelectItem>
                                <SelectItem value="maanden">Maanden</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="platformFees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform Fees (% van rendement)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="0"
                            step={0.1}
                            data-testid="input-fees"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                    data-testid="button-calculate-staking"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Bereken Staking Opbrengst
                  </Button>
                </form>
              </Form>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Resultaten</h3>

              {result && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <CalculationResult
                      label="Berekende APR"
                      value={`${result.apr.toFixed(2)}%`}
                      variant="info"
                      data-testid="result-apr"
                    />
                    <CalculationResult
                      label="Bruto Opbrengst"
                      value={formatCurrency(result.brutoRendement)}
                      variant="default"
                      data-testid="result-bruto"
                    />
                    <CalculationResult
                      label="Platform Fees"
                      value={`- ${formatCurrency(result.feesBedrag)}`}
                      variant="warning"
                      data-testid="result-fees"
                    />
                    <CalculationResult
                      label="Netto Rendement"
                      value={formatCurrency(result.nettoRendement)}
                      variant="success"
                      data-testid="result-netto"
                    />
                    <CalculationResult
                      label="Eindwaarde"
                      value={formatCurrency(result.nettoBedrag)}
                      variant="success"
                      data-testid="result-eindwaarde"
                    />
                  </div>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="text-sm font-medium mb-2">Groei over tijd (netto)</h4>
                      <div className="h-64">
                        <Suspense fallback={<ChartSkeleton />}>
                          <StakingApyChart data={result.chartData} />
                        </Suspense>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>APY vs APR: Wat is het verschil?</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            <strong>APY (Annual Percentage Yield)</strong> is het effectieve jaarlijkse rendement 
            inclusief het effect van compounding (rente-op-rente). Dit is wat u daadwerkelijk verdient.
          </p>
          <p>
            <strong>APR (Annual Percentage Rate)</strong> is de nominale jaarlijkse rentevoet 
            zonder rekening te houden met compounding.
          </p>
          <p>
            Hoe vaker de rente wordt bijgeschreven (compounding), hoe groter het verschil 
            tussen APY en APR. Bij dagelijkse compounding is het verschil het grootst.
          </p>
        </CardContent>
      </Card>

      <CryptoAffiliateCTA />
    </div>
  );
}
