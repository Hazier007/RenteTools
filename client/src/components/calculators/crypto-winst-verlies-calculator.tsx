import { useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/formatters";
import { TrendingUp, TrendingDown, ExternalLink, Coins, Calculator, Target, Percent } from "lucide-react";
import type { Product, Bank } from "@shared/schema";

const cryptoWinstVerliesSchema = z.object({
  aankoopprijsPerCoin: z.number().min(0.000001, "Aankoopprijs moet positief zijn"),
  aantalCoins: z.number().min(0.000001, "Aantal coins moet positief zijn"),
  huidigeVerkoopprijs: z.number().min(0, "Prijs moet positief zijn"),
  aankoopkostenBedrag: z.number().min(0, "Kosten moeten positief zijn"),
  aankoopkostenType: z.enum(["euro", "percentage"]),
  verkoopkostenBedrag: z.number().min(0, "Kosten moeten positief zijn"),
  verkoopkostenType: z.enum(["euro", "percentage"]),
});

type CryptoWinstVerliesFormData = z.infer<typeof cryptoWinstVerliesSchema>;

interface WinstVerliesResult {
  totaleInvestering: number;
  aankoopkosten: number;
  huidigeWaarde: number;
  verkoopkosten: number;
  brutoWinstVerlies: number;
  nettoWinstVerlies: number;
  roiPercentage: number;
  breakEvenPrijs: number;
  costBasisPerCoin: number;
  isWinst: boolean;
}

function berekenWinstVerlies(data: CryptoWinstVerliesFormData): WinstVerliesResult {
  const { 
    aankoopprijsPerCoin, 
    aantalCoins, 
    huidigeVerkoopprijs, 
    aankoopkostenBedrag, 
    aankoopkostenType,
    verkoopkostenBedrag,
    verkoopkostenType
  } = data;

  const basisInvestering = aankoopprijsPerCoin * aantalCoins;
  
  const aankoopkosten = aankoopkostenType === "percentage" 
    ? basisInvestering * (aankoopkostenBedrag / 100)
    : aankoopkostenBedrag;
  
  const totaleInvestering = basisInvestering + aankoopkosten;
  
  const huidigeWaarde = huidigeVerkoopprijs * aantalCoins;
  
  const verkoopkosten = verkoopkostenType === "percentage"
    ? huidigeWaarde * (verkoopkostenBedrag / 100)
    : verkoopkostenBedrag;
  
  const brutoWinstVerlies = huidigeWaarde - basisInvestering;
  
  const nettoWinstVerlies = huidigeWaarde - totaleInvestering - verkoopkosten;
  
  const roiPercentage = totaleInvestering > 0 
    ? ((nettoWinstVerlies / totaleInvestering) * 100)
    : 0;
  
  const totaleKostenPerCoin = (aankoopkosten + verkoopkosten) / aantalCoins;
  const breakEvenPrijs = aankoopprijsPerCoin + totaleKostenPerCoin;
  
  const costBasisPerCoin = totaleInvestering / aantalCoins;
  
  return {
    totaleInvestering,
    aankoopkosten,
    huidigeWaarde,
    verkoopkosten,
    brutoWinstVerlies,
    nettoWinstVerlies,
    roiPercentage,
    breakEvenPrijs,
    costBasisPerCoin,
    isWinst: nettoWinstVerlies >= 0,
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
          <CardTitle className="text-xl">Start met Crypto Handelen</CardTitle>
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
      <CardHeader className="bg-gradient-to-r from-orange-500/10 to-amber-500/10">
        <CardTitle className="text-xl flex items-center gap-2">
          <Coins className="h-5 w-5" />
          Start met Crypto Handelen
        </CardTitle>
        <p className="text-muted-foreground">
          Open een account bij een betrouwbaar crypto platform
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

export default function CryptoWinstVerliesCalculator() {
  const [result, setResult] = useState<WinstVerliesResult | null>(null);

  const form = useForm<CryptoWinstVerliesFormData>({
    resolver: zodResolver(cryptoWinstVerliesSchema),
    defaultValues: {
      aankoopprijsPerCoin: 50000,
      aantalCoins: 0.1,
      huidigeVerkoopprijs: 55000,
      aankoopkostenBedrag: 1.5,
      aankoopkostenType: "percentage",
      verkoopkostenBedrag: 1.5,
      verkoopkostenType: "percentage",
    },
  });

  const onSubmit = (data: CryptoWinstVerliesFormData) => {
    const calculationResult = berekenWinstVerlies(data);
    setResult(calculationResult);
  };

  useEffect(() => {
    const subscription = form.watch((data) => {
      if (
        data.aankoopprijsPerCoin !== undefined && 
        data.aantalCoins !== undefined && 
        data.huidigeVerkoopprijs !== undefined
      ) {
        const calculationResult = berekenWinstVerlies(data as CryptoWinstVerliesFormData);
        setResult(calculationResult);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const aankoopkostenType = form.watch("aankoopkostenType");
  const verkoopkostenType = form.watch("verkoopkostenType");

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Calculator className="h-7 w-7" />
            Crypto Winst/Verlies Calculator
          </CardTitle>
          <p className="opacity-90">
            Bereken uw winst of verlies op cryptocurrency trades inclusief transactiekosten
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
                    name="aankoopprijsPerCoin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Aankoopprijs per Coin (€)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="50.000"
                            step={0.01}
                            data-testid="input-aankoopprijs"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aantalCoins"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Aantal Coins</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="0.1"
                            step={0.00000001}
                            data-testid="input-aantal-coins"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="huidigeVerkoopprijs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Huidige/Verkoopprijs per Coin (€)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="55.000"
                            step={0.01}
                            data-testid="input-huidige-prijs"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Aankoopkosten/Fees</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name="aankoopkostenBedrag"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <NumberInput
                                {...field}
                                placeholder={aankoopkostenType === "percentage" ? "1.5" : "25"}
                                step={0.01}
                                data-testid="input-aankoopkosten"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="aankoopkostenType"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger data-testid="select-aankoopkosten-type">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                                  <SelectItem value="euro">Euro (€)</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <FormLabel>Verkoopkosten/Fees</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name="verkoopkostenBedrag"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <NumberInput
                                {...field}
                                placeholder={verkoopkostenType === "percentage" ? "1.5" : "25"}
                                step={0.01}
                                data-testid="input-verkoopkosten"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="verkoopkostenType"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger data-testid="select-verkoopkosten-type">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                                  <SelectItem value="euro">Euro (€)</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                    data-testid="button-calculate-crypto-wv"
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Bereken Winst/Verlies
                  </Button>
                </form>
              </Form>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Resultaten</h3>

              {result && (
                <div className="space-y-6">
                  <Card className={`border-2 ${result.isWinst ? 'border-green-500 bg-green-500/5' : 'border-red-500 bg-red-500/5'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {result.isWinst ? (
                          <TrendingUp className="h-6 w-6 text-green-600" />
                        ) : (
                          <TrendingDown className="h-6 w-6 text-red-600" />
                        )}
                        <span className={`font-bold text-2xl ${result.isWinst ? 'text-green-600' : 'text-red-600'}`}>
                          {result.isWinst ? '+' : ''}{formatCurrency(result.nettoWinstVerlies)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {result.isWinst 
                          ? 'U maakt winst op deze trade!' 
                          : 'U maakt verlies op deze trade.'}
                      </p>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 gap-4">
                    <CalculationResult
                      label="Totale Investering"
                      value={formatCurrency(result.totaleInvestering)}
                      variant="default"
                      data-testid="result-totale-investering"
                    />
                    <CalculationResult
                      label="Huidige Waarde"
                      value={formatCurrency(result.huidigeWaarde)}
                      variant="info"
                      data-testid="result-huidige-waarde"
                    />
                    <CalculationResult
                      label="Bruto Winst/Verlies"
                      value={`${result.brutoWinstVerlies >= 0 ? '+' : ''}${formatCurrency(result.brutoWinstVerlies)}`}
                      variant={result.brutoWinstVerlies >= 0 ? "success" : "warning"}
                      data-testid="result-bruto-wv"
                    />
                    <CalculationResult
                      label="Netto Winst/Verlies"
                      value={`${result.nettoWinstVerlies >= 0 ? '+' : ''}${formatCurrency(result.nettoWinstVerlies)}`}
                      variant={result.isWinst ? "success" : "warning"}
                      data-testid="result-netto-wv"
                    />
                    <CalculationResult
                      label="ROI"
                      value={`${result.roiPercentage >= 0 ? '+' : ''}${result.roiPercentage.toFixed(2)}%`}
                      variant={result.roiPercentage >= 0 ? "success" : "warning"}
                      data-testid="result-roi"
                    />
                  </div>

                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        Belangrijke Metrics
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Break-even prijs</span>
                        <span className="font-medium">{formatCurrency(result.breakEvenPrijs)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Cost basis per coin</span>
                        <span className="font-medium">{formatCurrency(result.costBasisPerCoin)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Aankoopkosten</span>
                        <span className="font-medium text-destructive">-{formatCurrency(result.aankoopkosten)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Verkoopkosten</span>
                        <span className="font-medium text-destructive">-{formatCurrency(result.verkoopkosten)}</span>
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
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Uitleg Berekeningen
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <div>
            <h4 className="font-semibold text-foreground">Totale Investering</h4>
            <p>
              De totale investering is het aankoopbedrag (aankoopprijs × aantal coins) plus de aankoopkosten/fees.
              Dit is het totale bedrag dat u heeft geïnvesteerd.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Bruto vs Netto Winst/Verlies</h4>
            <p>
              <strong>Bruto winst/verlies</strong> is het verschil tussen de huidige waarde en het oorspronkelijke aankoopbedrag, 
              zonder rekening te houden met transactiekosten.
            </p>
            <p>
              <strong>Netto winst/verlies</strong> houdt rekening met alle kosten: aankoopkosten én verkoopkosten.
              Dit is uw werkelijke winst of verlies.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Break-even Prijs</h4>
            <p>
              De break-even prijs is de minimale verkoopprijs per coin waarbij u geen verlies maakt, 
              rekening houdend met alle transactiekosten.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Cost Basis per Coin</h4>
            <p>
              De cost basis is de gemiddelde kostprijs per coin inclusief aankoopkosten. 
              Dit is belangrijk voor belastingdoeleinden.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">ROI (Return on Investment)</h4>
            <p>
              ROI geeft aan hoeveel procent winst of verlies u heeft gemaakt op uw totale investering.
              Een positieve ROI betekent winst, een negatieve ROI betekent verlies.
            </p>
          </div>
        </CardContent>
      </Card>

      <CryptoAffiliateCTA />
    </div>
  );
}
