import { useState, useEffect, lazy, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import NumberInput from "@/components/ui/number-input";
import CalculationResult from "@/components/ui/calculation-result";
import { ChartSkeleton } from "@/components/ui/chart-skeleton";
import { formatCurrency, formatPercentage } from "@/lib/formatters";

const PensioensparChart = lazy(() => import("./pensioenspar-chart"));

const pensioenspaarSchema = z.object({
  huidigeSpaarpot: z.number().min(0, "Huidige spaarpot moet positief zijn"),
  jaarlijkseInleg: z.number().min(0, "Jaarlijkse inleg moet positief zijn").max(1310, "Jaarlijkse inleg kan niet meer dan €1.310 zijn"),
  huidigLeeftijd: z.number().min(18, "Leeftijd moet minimaal 18 zijn").max(64, "Leeftijd kan niet meer dan 64 zijn"),
  pensioenleeftijd: z.number().min(60, "Pensioenleeftijd moet minimaal 60 zijn").max(70, "Pensioenleeftijd kan niet meer dan 70 zijn"),
  verwachtRendement: z.number().min(0, "Rendement moet positief zijn").max(15, "Rendement kan niet meer dan 15% zijn"),
  belastingvoordeel: z.boolean(),
  type: z.enum(["tak21", "tak23"]),
});

type PensioenspaarFormData = z.infer<typeof pensioenspaarSchema>;

export default function PensioenspaarCalculator() {
  const [result, setResult] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const form = useForm<PensioenspaarFormData>({
    resolver: zodResolver(pensioenspaarSchema),
    defaultValues: {
      huidigeSpaarpot: 5000,
      jaarlijkseInleg: 980,
      huidigLeeftijd: 35,
      pensioenleeftijd: 65,
      verwachtRendement: 4.5,
      belastingvoordeel: true,
      type: "tak23",
    },
  });

  const calculatePensionSavings = (data: PensioenspaarFormData) => {
    const aantalJaren = data.pensioenleeftijd - data.huidigLeeftijd;
    const jaarlijkseRendement = data.verwachtRendement / 100;
    const belastingVoordeel = data.belastingvoordeel ? 0.30 : 0; // 30% belastingvoordeel
    const effectieveInleg = data.jaarlijkseInleg * (1 + belastingVoordeel);
    
    let saldo = data.huidigeSpaarpot;
    const jaarlijkseBreakdown = [];
    let totaleInleg = data.huidigeSpaarpot;

    for (let jaar = 1; jaar <= aantalJaren; jaar++) {
      const beginSaldo = saldo;
      
      // Add yearly contribution
      saldo += effectieveInleg;
      totaleInleg += data.jaarlijkseInleg;
      
      // Apply return
      const rendement = saldo * jaarlijkseRendement;
      saldo += rendement;
      
      jaarlijkseBreakdown.push({
        jaar: data.huidigLeeftijd + jaar,
        beginsaldo: beginSaldo,
        inleg: effectieveInleg,
        rendement,
        eindsaldo: saldo,
      });
    }

    // Tax on pension payout (8% on capital gains)
    const kapitaalWinst = saldo - totaleInleg;
    const belastingUitkering = kapitaalWinst * 0.08;
    const nettoUitkering = saldo - belastingUitkering;
    
    // Calculate potential monthly pension
    const maandelijksePensioenkost = nettoUitkering / (20 * 12); // Assuming 20 years of pension
    
    const totaalBelastingvoordeel = data.belastingvoordeel ? (data.jaarlijkseInleg * belastingVoordeel * aantalJaren) : 0;

    return {
      eindsaldo: saldo,
      nettoUitkering,
      totaleInleg,
      kapitaalWinst,
      belastingUitkering,
      totaalBelastingvoordeel,
      maandelijksePensioenkost,
      effectieveInleg,
      jaarlijkseBreakdown,
    };
  };

  const onSubmit = (data: PensioenspaarFormData) => {
    const calculationResult = calculatePensionSavings(data);
    setResult(calculationResult);
    setChartData(calculationResult.jaarlijkseBreakdown);
  };

  // Real-time calculation
  useEffect(() => {
    const subscription = form.watch((data) => {
      if (data.huidigLeeftijd && data.pensioenleeftijd && data.jaarlijkseInleg && data.verwachtRendement) {
        const calculationResult = calculatePensionSavings(data as PensioenspaarFormData);
        setResult(calculationResult);
        setChartData(calculationResult.jaarlijkseBreakdown);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <CardTitle className="text-2xl font-bold">
            <i className="fas fa-umbrella mr-3"></i>
            Pensioenspaarrekening Calculator
          </CardTitle>
          <p className="opacity-90">Bereken uw pensioenopbouw via de derde pijler</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Pensioen Parameters</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="huidigeSpaarpot"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Huidige Spaarpot (€)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="5.000"
                            data-testid="input-huidige-spaarpot"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jaarlijkseInleg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jaarlijkse Inleg (€) - Max €1.310</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="980"
                            data-testid="input-jaarlijkse-inleg-pensioen"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="huidigLeeftijd"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Huidige Leeftijd</FormLabel>
                          <FormControl>
                            <NumberInput
                              {...field}
                              placeholder="35"
                              data-testid="input-huidige-leeftijd"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pensioenleeftijd"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pensioenleeftijd</FormLabel>
                          <FormControl>
                            <NumberInput
                              {...field}
                              placeholder="65"
                              data-testid="input-pensioenleeftijd"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="verwachtRendement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Verwacht Jaarlijks Rendement (%)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="4.5"
                            step={0.1}
                            data-testid="input-verwacht-rendement-pensioen"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type Pensioenverzekering</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger data-testid="select-type-pensioen">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tak21">Tak 21 (Gegarandeerde rente)</SelectItem>
                              <SelectItem value="tak23">Tak 23 (Beleggingsverzekering)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="belastingvoordeel"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-belastingvoordeel"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Belastingvoordeel toepassen (30%)
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="button-calculate-pensioen"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Bereken Pensioensparen
                  </Button>
                </form>
              </Form>
            </div>

            {/* Results Section */}
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Pensioenresultaten</h3>
              
              {result && (
                <div className="space-y-6">
                  {/* Key Results */}
                  <div className="grid grid-cols-1 gap-4">
                    <CalculationResult
                      label="Eindsaldo bij Pensioen"
                      value={formatCurrency(result.eindsaldo)}
                      variant="success"
                      data-testid="result-eindsaldo-pensioen"
                    />
                    <CalculationResult
                      label="Netto Uitkering"
                      value={formatCurrency(result.nettoUitkering)}
                      variant="success"
                      className="text-3xl"
                      data-testid="result-netto-uitkering"
                    />
                    <CalculationResult
                      label="Totale Inleg"
                      value={formatCurrency(result.totaleInleg)}
                      variant="info"
                      data-testid="result-totale-inleg-pensioen"
                    />
                    <CalculationResult
                      label="Kapitaalwinst"
                      value={formatCurrency(result.kapitaalWinst)}
                      variant="default"
                      data-testid="result-kapitaalwinst"
                    />
                    <CalculationResult
                      label="Maandelijks Pensioen (20j)"
                      value={formatCurrency(result.maandelijksePensioenkost)}
                      variant="info"
                      data-testid="result-maandelijks-pensioen"
                    />
                  </div>

                  {/* Chart */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="h-64">
                        <Suspense fallback={<ChartSkeleton />}>
                          <PensioensparChart data={chartData} />
                        </Suspense>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Breakdown */}
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Effectieve jaarlijkse inleg</span>
                        <span className="font-medium">{formatCurrency(result.effectieveInleg)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Totaal belastingvoordeel</span>
                        <span className="font-medium text-secondary">{formatCurrency(result.totaalBelastingvoordeel)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Belasting bij uitkering</span>
                        <span className="font-medium text-destructive">-{formatCurrency(result.belastingUitkering)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between text-sm font-semibold">
                        <span>Jaren tot pensioen</span>
                        <span>{form.watch("pensioenleeftijd") - form.watch("huidigLeeftijd")} jaar</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}