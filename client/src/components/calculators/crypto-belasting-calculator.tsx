import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import NumberInput from "@/components/ui/number-input";
import CalculationResult from "@/components/ui/calculation-result";
import { formatCurrency } from "@/lib/formatters";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, AlertTriangle, Info, TrendingUp, Shield, Coins } from "lucide-react";
import type { Product, Bank } from "@shared/schema";

const cryptoBelastingSchema = z.object({
  aankoopbedrag: z.number().min(0, "Aankoopbedrag moet positief zijn"),
  verkoopbedrag: z.number().min(0, "Verkoopbedrag moet positief zijn"),
  houdperiode: z.number().min(0, "Houdperiode moet positief zijn").max(600, "Houdperiode kan niet meer dan 50 jaar zijn"),
  transactieType: z.enum(["aankoop_verkoop", "staking_rewards", "mining"]),
  handelsfrequentie: z.enum(["zelden", "regelmatig", "dagelijks"]),
});

type CryptoBelastingFormData = z.infer<typeof cryptoBelastingSchema>;

type Classificatie = "hobby" | "professioneel" | "speculatief" | "staking" | "mining";

interface BelastingResult {
  classificatie: Classificatie;
  classificatieLabel: string;
  classificatieBeschrijving: string;
  brutoWinst: number;
  belastingPercentage: number;
  geschatteBelasting: number;
  nettoWinst: number;
  isBelastingvrij: boolean;
}

function bepaalClassificatie(data: CryptoBelastingFormData): Classificatie {
  if (data.transactieType === "staking_rewards") {
    return "staking";
  }
  
  if (data.transactieType === "mining") {
    return "mining";
  }

  const isLangetermijn = data.houdperiode >= 12;
  const isZeldenHandelen = data.handelsfrequentie === "zelden";

  if (isLangetermijn && isZeldenHandelen) {
    return "hobby";
  }

  if (data.handelsfrequentie === "dagelijks") {
    return "professioneel";
  }

  if (!isLangetermijn || data.handelsfrequentie === "regelmatig") {
    return "speculatief";
  }

  return "hobby";
}

function berekenBelasting(data: CryptoBelastingFormData): BelastingResult {
  const brutoWinst = data.verkoopbedrag - data.aankoopbedrag;
  const classificatie = bepaalClassificatie(data);
  
  let belastingPercentage = 0;
  let classificatieLabel = "";
  let classificatieBeschrijving = "";
  let isBelastingvrij = false;

  switch (classificatie) {
    case "hobby":
      belastingPercentage = 0;
      classificatieLabel = "Goede Huisvader (Hobby)";
      classificatieBeschrijving = "U wordt beschouwd als een voorzichtige belegger die op lange termijn investeert. Uw crypto winsten zijn vrijgesteld van belasting.";
      isBelastingvrij = true;
      break;
    case "speculatief":
      belastingPercentage = 33;
      classificatieLabel = "Speculatieve Winst";
      classificatieBeschrijving = "Door de korte houdperiode of regelmatige handel worden uw winsten als speculatief beschouwd en belast aan 33%.";
      break;
    case "professioneel":
      belastingPercentage = 33;
      classificatieLabel = "Professionele Activiteit";
      classificatieBeschrijving = "Door de hoge handelsfrequentie wordt dit als een professionele activiteit beschouwd. Winsten worden belast aan 33% (of hoger via personenbelasting).";
      break;
    case "staking":
      belastingPercentage = 30;
      classificatieLabel = "Staking Rewards";
      classificatieBeschrijving = "Staking rewards worden in België beschouwd als roerend inkomen en zijn onderworpen aan 30% roerende voorheffing.";
      break;
    case "mining":
      belastingPercentage = 33;
      classificatieLabel = "Mining Inkomsten";
      classificatieBeschrijving = "Mining inkomsten worden beschouwd als diverse inkomsten en zijn onderworpen aan 33% belasting.";
      break;
  }

  const belastbaarBedrag = classificatie === "staking" || classificatie === "mining" 
    ? data.verkoopbedrag 
    : Math.max(0, brutoWinst);
  
  const geschatteBelasting = belastbaarBedrag * (belastingPercentage / 100);
  const nettoWinst = (classificatie === "staking" || classificatie === "mining" 
    ? data.verkoopbedrag 
    : brutoWinst) - geschatteBelasting;

  return {
    classificatie,
    classificatieLabel,
    classificatieBeschrijving,
    brutoWinst,
    belastingPercentage,
    geschatteBelasting,
    nettoWinst,
    isBelastingvrij,
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
          <CardTitle className="text-xl">Start met Crypto Beleggen</CardTitle>
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
          Start met Crypto Beleggen
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

export default function CryptoBelastingCalculator() {
  const [result, setResult] = useState<BelastingResult | null>(null);

  const form = useForm<CryptoBelastingFormData>({
    resolver: zodResolver(cryptoBelastingSchema),
    defaultValues: {
      aankoopbedrag: 5000,
      verkoopbedrag: 8000,
      houdperiode: 18,
      transactieType: "aankoop_verkoop",
      handelsfrequentie: "zelden",
    },
  });

  const onSubmit = (data: CryptoBelastingFormData) => {
    const calculationResult = berekenBelasting(data);
    setResult(calculationResult);
  };

  useEffect(() => {
    const subscription = form.watch((data) => {
      if (data.aankoopbedrag !== undefined && data.verkoopbedrag !== undefined) {
        const calculationResult = berekenBelasting(data as CryptoBelastingFormData);
        setResult(calculationResult);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const transactieType = form.watch("transactieType");

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Coins className="h-7 w-7" />
            Belgische Crypto Belasting Calculator
          </CardTitle>
          <p className="opacity-90">
            Bereken uw mogelijke belasting op cryptocurrency winsten volgens Belgisch fiscaal recht
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
                    name="transactieType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type Transactie</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger data-testid="select-transactie-type">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="aankoop_verkoop">Aankoop / Verkoop</SelectItem>
                              <SelectItem value="staking_rewards">Staking Rewards</SelectItem>
                              <SelectItem value="mining">Mining Inkomsten</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {transactieType === "aankoop_verkoop" && (
                    <FormField
                      control={form.control}
                      name="aankoopbedrag"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Aankoopbedrag (€)</FormLabel>
                          <FormControl>
                            <NumberInput
                              {...field}
                              placeholder="5.000"
                              data-testid="input-aankoopbedrag"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="verkoopbedrag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {transactieType === "aankoop_verkoop" 
                            ? "Verkoopbedrag (€)" 
                            : transactieType === "staking_rewards"
                            ? "Staking Rewards Bedrag (€)"
                            : "Mining Inkomsten (€)"}
                        </FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="8.000"
                            data-testid="input-verkoopbedrag"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {transactieType === "aankoop_verkoop" && (
                    <>
                      <FormField
                        control={form.control}
                        name="houdperiode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Houdperiode (maanden)</FormLabel>
                            <FormControl>
                              <NumberInput
                                {...field}
                                placeholder="18"
                                data-testid="input-houdperiode"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="handelsfrequentie"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Frequentie van Handelen</FormLabel>
                            <FormControl>
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger data-testid="select-handelsfrequentie">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="zelden">Zelden (enkele keren per jaar)</SelectItem>
                                  <SelectItem value="regelmatig">Regelmatig (wekelijks/maandelijks)</SelectItem>
                                  <SelectItem value="dagelijks">Dagelijks (actieve trading)</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                    data-testid="button-calculate-crypto"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Bereken Belasting
                  </Button>
                </form>
              </Form>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Resultaten</h3>

              {result && (
                <div className="space-y-6">
                  <Card className={`border-2 ${result.isBelastingvrij ? 'border-green-500 bg-green-500/5' : 'border-orange-500 bg-orange-500/5'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {result.isBelastingvrij ? (
                          <Shield className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-orange-600" />
                        )}
                        <span className="font-semibold text-lg">{result.classificatieLabel}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{result.classificatieBeschrijving}</p>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 gap-4">
                    {transactieType === "aankoop_verkoop" && (
                      <CalculationResult
                        label="Bruto Winst"
                        value={formatCurrency(result.brutoWinst)}
                        variant={result.brutoWinst >= 0 ? "success" : "warning"}
                        data-testid="result-bruto-winst"
                      />
                    )}
                    <CalculationResult
                      label="Belastingtarief"
                      value={`${result.belastingPercentage}%`}
                      variant={result.isBelastingvrij ? "success" : "warning"}
                      data-testid="result-belastingtarief"
                    />
                    <CalculationResult
                      label="Geschatte Belasting"
                      value={formatCurrency(result.geschatteBelasting)}
                      variant={result.isBelastingvrij ? "success" : "warning"}
                      data-testid="result-geschatte-belasting"
                    />
                    <CalculationResult
                      label="Netto Winst"
                      value={formatCurrency(result.nettoWinst)}
                      variant="success"
                      data-testid="result-netto-winst"
                    />
                  </div>

                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {transactieType === "aankoop_verkoop" ? "Bruto winst" : "Bruto bedrag"}
                        </span>
                        <span className="font-medium">
                          {formatCurrency(transactieType === "aankoop_verkoop" ? result.brutoWinst : form.getValues("verkoopbedrag"))}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Belasting ({result.belastingPercentage}%)
                        </span>
                        <span className="font-medium text-destructive">
                          -{formatCurrency(result.geschatteBelasting)}
                        </span>
                      </div>
                      <div className="border-t pt-2 flex justify-between text-sm font-semibold">
                        <span>Netto na belasting</span>
                        <span className="text-green-600">{formatCurrency(result.nettoWinst)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert variant="destructive" className="border-orange-500 bg-orange-500/10">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Belangrijke Disclaimer</AlertTitle>
        <AlertDescription className="mt-2 space-y-2">
          <p>
            Deze calculator is uitsluitend bedoeld voor informatieve doeleinden en vormt geen fiscaal advies. 
            De Belgische fiscale behandeling van cryptocurrency is complex en hangt af van uw individuele situatie.
          </p>
          <p>
            De classificatie (hobby vs. professioneel vs. speculatief) wordt bepaald door de belastingdienst 
            op basis van meerdere factoren, waaronder uw totale vermogen, kennis, tijdsbesteding en intentie.
          </p>
          <p className="font-semibold">
            Raadpleeg altijd een erkend belastingadviseur of accountant voor persoonlijk fiscaal advies.
          </p>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Belgische Crypto Belasting Regels
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <div>
            <h4 className="font-semibold text-foreground">Goede Huisvader Principe (Belastingvrij)</h4>
            <p>
              Wanneer u als een "goede huisvader" belegt - voorzichtig, op lange termijn, en als onderdeel 
              van normaal vermogensbeheer - zijn uw crypto winsten vrijgesteld van belasting. Dit vereist 
              typisch een langere houdperiode en beperkte handelsactiviteit.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Speculatieve Winsten (33%)</h4>
            <p>
              Bij korte houdperiodes of regelmatige handel kunnen winsten als speculatief worden beschouwd. 
              Deze worden belast aan 33% als diverse inkomsten.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Professionele Activiteit (33%+)</h4>
            <p>
              Bij zeer actieve handel (dagelijks traden) kan de fiscus dit als een professionele activiteit 
              beschouwen, wat leidt tot belasting als beroepsinkomen (progressief tot 50%).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Staking & Mining (30% / 33%)</h4>
            <p>
              Staking rewards worden beschouwd als roerend inkomen (30% roerende voorheffing). 
              Mining inkomsten worden belast als diverse inkomsten aan 33%.
            </p>
          </div>
        </CardContent>
      </Card>

      <CryptoAffiliateCTA />
    </div>
  );
}
