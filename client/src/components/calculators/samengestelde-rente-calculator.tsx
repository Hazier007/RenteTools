import { useState, useEffect, lazy, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NumberInput from "@/components/ui/number-input";
import CalculationResult from "@/components/ui/calculation-result";
import { ChartSkeleton } from "@/components/ui/chart-skeleton";
import { calculateCompoundInterest } from "@/lib/calculations";
import { formatCurrency, formatPercentage } from "@/lib/formatters";

const SamengesteldeRenteChart = lazy(() => import("./samengestelde-rente-chart"));

const samengesteldeSchema = z.object({
  kapitaal: z.number().min(0, "Kapitaal moet positief zijn"),
  rendement: z.number().min(0, "Rendement moet positief zijn").max(100, "Rendement kan niet meer dan 100% zijn"),
  termijn: z.number().min(1, "Termijn moet minimaal 1 jaar zijn").max(100, "Termijn kan niet meer dan 100 jaar zijn"),
  frequentie: z.number().min(1, "Frequentie moet minimaal 1 zijn"),
});

type SamengesteldeFormData = z.infer<typeof samengesteldeSchema>;

export default function SamengesteldeRenteCalculator() {
  const [result, setResult] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const form = useForm<SamengesteldeFormData>({
    resolver: zodResolver(samengesteldeSchema),
    defaultValues: {
      kapitaal: 5000,
      rendement: 5.0,
      termijn: 20,
      frequentie: 12,
    },
  });

  const onSubmit = (data: SamengesteldeFormData) => {
    const calculationResult = calculateCompoundInterest(data);
    setResult(calculationResult);
    setChartData(calculationResult.comparison);
  };

  // Real-time calculation
  useEffect(() => {
    const subscription = form.watch((data) => {
      if (data.kapitaal && data.rendement && data.termijn && data.frequentie) {
        const calculationResult = calculateCompoundInterest(data as SamengesteldeFormData);
        setResult(calculationResult);
        setChartData(calculationResult.comparison);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-secondary text-secondary-foreground">
          <CardTitle className="text-2xl font-bold">
            <i className="fas fa-chart-line mr-3"></i>
            Samengestelde Interest Calculator
          </CardTitle>
          <p className="opacity-90">Ontdek de kracht van rente-op-rente over tijd</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Parameters</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="kapitaal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Startkapitaal (€)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="5.000"
                            data-testid="input-kapitaal"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rendement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jaarlijks Rendement (%)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="5.0"
                            step={0.1}
                            data-testid="input-rendement"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="termijn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Looptijd (jaren)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="20"
                            data-testid="input-termijn"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="frequentie"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Compounding Frequentie</FormLabel>
                        <FormControl>
                          <Select 
                            value={field.value.toString()} 
                            onValueChange={(value) => field.onChange(parseInt(value))}
                          >
                            <SelectTrigger data-testid="select-frequentie">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Jaarlijks (1x per jaar)</SelectItem>
                              <SelectItem value="4">Per kwartaal (4x per jaar)</SelectItem>
                              <SelectItem value="12">Maandelijks (12x per jaar)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    data-testid="button-calculate-samengestelde"
                  >
                    <i className="fas fa-chart-line mr-2"></i>
                    Bereken Samengestelde Rente
                  </Button>
                </form>
              </Form>
            </div>

            {/* Results Section */}
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Resultaten</h3>
              
              {result && (
                <div className="space-y-6">
                  {/* Comparison Cards */}
                  <div className="grid grid-cols-1 gap-4">
                    <Card className="border-l-4 border-l-secondary">
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground">Met Samengestelde Rente</div>
                        <div className="text-2xl font-bold text-secondary" data-testid="result-samengesteld">
                          {formatCurrency(result.samengesteld)}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Eindbedrag na {form.watch("termijn")} jaar
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-l-4 border-l-muted-foreground">
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground">Zonder Samengestelde Rente</div>
                        <div className="text-xl font-semibold text-muted-foreground" data-testid="result-enkelvoudig">
                          {formatCurrency(result.enkelvoudig)}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Enkelvoudige rente</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-accent/10 border border-accent">
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-accent">Extra Opbrengst</div>
                        <div className="text-xl font-bold text-accent" data-testid="result-verschil">
                          + {formatCurrency(result.verschil)}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Door rente-op-rente effect</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Chart */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="h-48">
                        <Suspense fallback={<ChartSkeleton />}>
                          <SamengesteldeRenteChart data={chartData} />
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
    </div>
  );
}
