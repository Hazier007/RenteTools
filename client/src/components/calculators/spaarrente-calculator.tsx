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
import { calculateSavingsGrowth } from "@/lib/calculations";
import { formatCurrency, formatPercentage } from "@/lib/formatters";

const spaarrenteSchema = z.object({
  startbedrag: z.number().min(0, "Startbedrag moet positief zijn"),
  storting: z.number().min(0, "Storting moet positief zijn").optional(),
  stortingFrequentie: z.enum(["maandelijks", "jaarlijks", "geen"]),
  rente: z.number().min(0, "Rente moet positief zijn").max(100, "Rente kan niet meer dan 100% zijn"),
  looptijd: z.number().min(1, "Looptijd moet minimaal 1 jaar zijn").max(100, "Looptijd kan niet meer dan 100 jaar zijn"),
  kapitalisatie: z.boolean(),
});

type SpaarrenteFormData = z.infer<typeof spaarrenteSchema>;

export default function SpaarrenteCalculator() {
  const [result, setResult] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const form = useForm<SpaarrenteFormData>({
    resolver: zodResolver(spaarrenteSchema),
    defaultValues: {
      startbedrag: 10000,
      storting: 200,
      stortingFrequentie: "maandelijks",
      rente: 2.5,
      looptijd: 10,
      kapitalisatie: true,
    },
  });

  const onSubmit = (data: SpaarrenteFormData) => {
    const calculationResult = calculateSavingsGrowth(data);
    setResult(calculationResult);
    setChartData(calculationResult.yearlyBreakdown);
  };

  // Real-time calculation
  useEffect(() => {
    const subscription = form.watch((data) => {
      if (data.startbedrag && data.rente && data.looptijd) {
        const calculationResult = calculateSavingsGrowth(data as SpaarrenteFormData);
        setResult(calculationResult);
        setChartData(calculationResult.yearlyBreakdown);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader className="gradient-bg text-primary-foreground">
          <CardTitle className="text-2xl font-bold">
            <i className="fas fa-piggy-bank mr-3"></i>
            Spaarrente Calculator
          </CardTitle>
          <p className="opacity-90">Bereken hoeveel uw spaargeld aangroeit met samengestelde rente</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Invoer Parameters</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="startbedrag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Startbedrag (€)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="10.000"
                            data-testid="input-startbedrag"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stortingFrequentie"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Periodieke Storting</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger data-testid="select-storting-frequentie">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="maandelijks">Maandelijks</SelectItem>
                              <SelectItem value="jaarlijks">Jaarlijks</SelectItem>
                              <SelectItem value="geen">Geen</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {form.watch("stortingFrequentie") !== "geen" && (
                    <FormField
                      control={form.control}
                      name="storting"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stortingsbedrag (€)</FormLabel>
                          <FormControl>
                            <NumberInput
                              {...field}
                              placeholder="200"
                              data-testid="input-storting"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="rente"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rentepercentage (% per jaar)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="2.5"
                            step={0.1}
                            data-testid="input-rente"
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
                        <FormLabel>Looptijd (jaren)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="10"
                            data-testid="input-looptijd"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="kapitalisatie"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-kapitalisatie"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Rente kapitaliseren (rente-op-rente toepassen)
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    data-testid="button-calculate-spaarrente"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Bereken Spaarrente
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
                      label="Eindbedrag"
                      value={formatCurrency(result.eindbedrag)}
                      variant="success"
                      data-testid="result-eindbedrag"
                    />
                    <CalculationResult
                      label="Totale Interest"
                      value={formatCurrency(result.totaleInterest)}
                      variant="info"
                      data-testid="result-totale-interest"
                    />
                    <CalculationResult
                      label="Uw Inbreng"
                      value={formatCurrency(result.inbreng)}
                      variant="default"
                      data-testid="result-inbreng"
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
                              formatter={(value) => [formatCurrency(value as number), "Saldo"]}
                              labelFormatter={(label) => `Jaar ${label}`}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="eindsaldo" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Export Options */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                      <i className="fas fa-file-pdf mr-2"></i>
                      PDF
                    </Button>
                    <Button className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      <i className="fas fa-file-excel mr-2"></i>
                      Excel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results Table */}
      {result && result.yearlyBreakdown && (
        <Card>
          <CardHeader>
            <CardTitle>Jaar-op-jaar Overzicht</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-foreground">Jaar</th>
                    <th className="px-4 py-3 text-right font-medium text-foreground">Beginsaldo</th>
                    <th className="px-4 py-3 text-right font-medium text-foreground">Storting</th>
                    <th className="px-4 py-3 text-right font-medium text-foreground">Rente</th>
                    <th className="px-4 py-3 text-right font-medium text-foreground">Eindsaldo</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyBreakdown.map((year: any, index: number) => (
                    <tr key={index} className="border-t border-border hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium" data-testid={`row-year-${year.jaar}`}>{year.jaar}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{formatCurrency(year.beginsaldo)}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{formatCurrency(year.storting)}</td>
                      <td className="px-4 py-3 text-right text-secondary">{formatCurrency(year.rente)}</td>
                      <td className="px-4 py-3 text-right font-medium">{formatCurrency(year.eindsaldo)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
