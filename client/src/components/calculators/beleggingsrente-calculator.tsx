import { useState, useEffect } from "react";
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency, formatPercentage } from "@/lib/formatters";

const beleggingsrenteSchema = z.object({
  startkapitaal: z.number().min(100, "Startkapitaal moet minimaal €100 zijn"),
  maandelijkseInleg: z.number().min(0, "Maandelijkse inleg moet positief zijn").optional(),
  verwachtRendement: z.number().min(-50, "Rendement kan niet minder dan -50% zijn").max(50, "Rendement kan niet meer dan 50% zijn"),
  looptijd: z.number().min(1, "Looptijd moet minimaal 1 jaar zijn").max(50, "Looptijd kan niet meer dan 50 jaar zijn"),
  beleggingstype: z.enum(["aandelen", "obligaties", "gemengd", "index", "crypto"]),
  kosten: z.number().min(0, "Kosten moet positief zijn").max(5, "Kosten kan niet meer dan 5% zijn"),
  roerende_voorheffing: z.boolean(),
});

type BeleggingsrenteFormData = z.infer<typeof beleggingsrenteSchema>;

export default function BeleggingsrenteCalculator() {
  const [result, setResult] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const form = useForm<BeleggingsrenteFormData>({
    resolver: zodResolver(beleggingsrenteSchema),
    defaultValues: {
      startkapitaal: 5000,
      maandelijkseInleg: 200,
      verwachtRendement: 7.0,
      looptijd: 20,
      beleggingstype: "index",
      kosten: 0.5,
      roerende_voorheffing: true,
    },
  });

  const calculateInvestment = (data: BeleggingsrenteFormData) => {
    const jaarlijkseRendement = data.verwachtRendement / 100;
    const jaarlijkeKosten = data.kosten / 100;
    const nettoRendement = jaarlijkseRendement - jaarlijkeKosten;
    const maandelijksRendement = nettoRendement / 12;
    const maandelijkseInleg = data.maandelijkseInleg || 0;
    const aantalMaanden = data.looptijd * 12;
    const voorheffingPercentage = data.roerende_voorheffing ? 0.30 : 0;

    let saldo = data.startkapitaal;
    const jaarlijkseBreakdown = [];
    let totaleInleg = data.startkapitaal;

    for (let jaar = 1; jaar <= data.looptijd; jaar++) {
      const beginSaldo = saldo;
      
      // Add monthly contributions for this year
      for (let maand = 1; maand <= 12; maand++) {
        saldo += maandelijkseInleg;
        totaleInleg += maandelijkseInleg;
        
        // Apply monthly return
        saldo = saldo * (1 + maandelijksRendement);
      }

      const jaarRendement = saldo - beginSaldo - (maandelijkseInleg * 12);
      
      jaarlijkseBreakdown.push({
        jaar,
        beginsaldo: beginSaldo,
        inleg: maandelijkseInleg * 12,
        rendement: jaarRendement,
        eindsaldo: saldo,
      });
    }

    const bruttoWinst = saldo - totaleInleg;
    const belasting = bruttoWinst > 0 ? bruttoWinst * voorheffingPercentage : 0;
    const nettoWinst = bruttoWinst - belasting;
    const nettoEindbedrag = saldo - belasting;
    const totaleKosten = totaleInleg * jaarlijkeKosten * data.looptijd;

    return {
      eindbedrag: saldo,
      nettoEindbedrag,
      totaleInleg,
      bruttoWinst,
      nettoWinst,
      belasting,
      totaleKosten,
      effectiefRendement: ((nettoEindbedrag / totaleInleg) ** (1 / data.looptijd) - 1) * 100,
      jaarlijkseBreakdown,
    };
  };

  const onSubmit = (data: BeleggingsrenteFormData) => {
    const calculationResult = calculateInvestment(data);
    setResult(calculationResult);
    setChartData(calculationResult.jaarlijkseBreakdown);
  };

  // Real-time calculation
  useEffect(() => {
    const subscription = form.watch((data) => {
      if (data.startkapitaal && data.verwachtRendement && data.looptijd) {
        const calculationResult = calculateInvestment(data as BeleggingsrenteFormData);
        setResult(calculationResult);
        setChartData(calculationResult.jaarlijkseBreakdown);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-accent to-destructive text-accent-foreground">
          <CardTitle className="text-2xl font-bold">
            <i className="fas fa-chart-bar mr-3"></i>
            Beleggingsrente Calculator
          </CardTitle>
          <p className="opacity-90">Bereken het verwachte rendement van uw beleggingsportefeuille</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Belegging Parameters</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="startkapitaal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Startkapitaal (€)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="5.000"
                            data-testid="input-startkapitaal-belegging"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maandelijkseInleg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maandelijkse Inleg (€)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="200"
                            data-testid="input-maandelijkse-inleg"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="verwachtRendement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Verwacht Jaarlijks Rendement (%)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="7.0"
                            step={0.1}
                            data-testid="input-verwacht-rendement"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="looptijd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Beleggingsperiode (jaren)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="20"
                            data-testid="input-looptijd-belegging"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="beleggingstype"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type Belegging</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger data-testid="select-beleggingstype">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="aandelen">Aandelen</SelectItem>
                              <SelectItem value="obligaties">Obligaties</SelectItem>
                              <SelectItem value="gemengd">Gemengde Portefeuille</SelectItem>
                              <SelectItem value="index">Index Fondsen</SelectItem>
                              <SelectItem value="crypto">Cryptocurrency</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="kosten"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jaarlijkse Kosten (%)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="0.5"
                            step={0.1}
                            data-testid="input-kosten-belegging"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="roerende_voorheffing"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-roerende-voorheffing"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Roerende voorheffing toepassen (30%)
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    data-testid="button-calculate-belegging"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Bereken Beleggingsrendement
                  </Button>
                </form>
              </Form>
            </div>

            {/* Results Section */}
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Resultaten</h3>
              
              {result && (
                <div className="space-y-6">
                  {/* Key Results */}
                  <div className="grid grid-cols-1 gap-4">
                    <CalculationResult
                      label="Bruto Eindbedrag"
                      value={formatCurrency(result.eindbedrag)}
                      variant="success"
                      data-testid="result-bruto-eindbedrag"
                    />
                    <CalculationResult
                      label="Netto Eindbedrag"
                      value={formatCurrency(result.nettoEindbedrag)}
                      variant="success"
                      className="text-3xl"
                      data-testid="result-netto-eindbedrag"
                    />
                    <CalculationResult
                      label="Totale Inleg"
                      value={formatCurrency(result.totaleInleg)}
                      variant="info"
                      data-testid="result-totale-inleg"
                    />
                    <CalculationResult
                      label="Netto Winst"
                      value={formatCurrency(result.nettoWinst)}
                      variant="default"
                      data-testid="result-netto-winst"
                    />
                    <CalculationResult
                      label="Effectief Rendement"
                      value={formatPercentage(result.effectiefRendement)}
                      variant="info"
                      data-testid="result-effectief-rendement"
                    />
                  </div>

                  {/* Chart */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="jaar" />
                            <YAxis />
                            <Tooltip 
                              formatter={(value) => [formatCurrency(value as number), "Waarde"]}
                              labelFormatter={(label) => `Jaar ${label}`}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="eindsaldo" 
                              stroke="hsl(var(--accent))" 
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Breakdown */}
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Bruto winst</span>
                        <span className="font-medium">{formatCurrency(result.bruttoWinst)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Belasting (roerende voorheffing)</span>
                        <span className="font-medium text-destructive">-{formatCurrency(result.belasting)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Totale kosten</span>
                        <span className="font-medium text-destructive">-{formatCurrency(result.totaleKosten)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between text-sm font-semibold">
                        <span>Netto winst</span>
                        <span className="text-secondary">{formatCurrency(result.nettoWinst)}</span>
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