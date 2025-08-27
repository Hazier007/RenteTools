import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NumberInput from "@/components/ui/number-input";
import CalculationResult from "@/components/ui/calculation-result";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency, formatPercentage } from "@/lib/formatters";

const inflatieSchema = z.object({
  bedragVandaag: z.number().min(1, "Bedrag moet positief zijn"),
  inflatiepercentage: z.number().min(-10, "Inflatie kan niet minder dan -10% zijn").max(20, "Inflatie kan niet meer dan 20% zijn"),
  tijdshorizon: z.number().min(1, "Tijdshorizon moet minimaal 1 jaar zijn").max(50, "Tijdshorizon kan niet meer dan 50 jaar zijn"),
  berekening: z.enum(["toekomst", "verleden"]),
  scenario: z.enum(["low", "medium", "high"]),
});

type InflatieFormData = z.infer<typeof inflatieSchema>;

export default function InflatieCalculator() {
  const [result, setResult] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const form = useForm<InflatieFormData>({
    resolver: zodResolver(inflatieSchema),
    defaultValues: {
      bedragVandaag: 10000,
      inflatiepercentage: 2.5,
      tijdshorizon: 10,
      berekening: "toekomst",
      scenario: "medium",
    },
  });

  const calculateInflationImpact = (data: InflatieFormData) => {
    const inflatie = data.inflatiepercentage / 100;
    
    let bedragToekomst, koopkrachtVerlies, percentage_verandering;
    
    if (data.berekening === "toekomst") {
      // Calculate future value needed to maintain purchasing power
      bedragToekomst = data.bedragVandaag * Math.pow(1 + inflatie, data.tijdshorizon);
      koopkrachtVerlies = bedragToekomst - data.bedragVandaag;
      percentage_verandering = ((bedragToekomst / data.bedragVandaag) - 1) * 100;
    } else {
      // Calculate past purchasing power
      bedragToekomst = data.bedragVandaag / Math.pow(1 + inflatie, data.tijdshorizon);
      koopkrachtVerlies = data.bedragVandaag - bedragToekomst;
      percentage_verandering = ((bedragToekomst / data.bedragVandaag) - 1) * 100;
    }

    // Generate scenarios
    const scenarios = {
      low: data.inflatiepercentage - 1,
      medium: data.inflatiepercentage,
      high: data.inflatiepercentage + 1.5,
    };

    const scenarioResults = Object.entries(scenarios).map(([key, rate]) => {
      const rate_decimal = rate / 100;
      let waarde;
      if (data.berekening === "toekomst") {
        waarde = data.bedragVandaag * Math.pow(1 + rate_decimal, data.tijdshorizon);
      } else {
        waarde = data.bedragVandaag / Math.pow(1 + rate_decimal, data.tijdshorizon);
      }
      return {
        scenario: key,
        rate,
        waarde,
        verschil: waarde - data.bedragVandaag,
      };
    });

    // Generate year-by-year data for chart
    const jaarlijkseData = [];
    for (let jaar = 0; jaar <= data.tijdshorizon; jaar++) {
      let waarde;
      if (data.berekening === "toekomst") {
        waarde = data.bedragVandaag * Math.pow(1 + inflatie, jaar);
      } else {
        waarde = data.bedragVandaag / Math.pow(1 + inflatie, jaar);
      }
      
      jaarlijkseData.push({
        jaar,
        waarde,
        koopkracht: data.bedragVandaag, // constant line for comparison
      });
    }

    return {
      bedragToekomst,
      koopkrachtVerlies,
      percentage_verandering,
      scenarioResults,
      jaarlijkseData,
      berekening: data.berekening,
    };
  };

  const onSubmit = (data: InflatieFormData) => {
    const calculationResult = calculateInflationImpact(data);
    setResult(calculationResult);
    setChartData(calculationResult.jaarlijkseData);
  };

  // Real-time calculation
  useEffect(() => {
    const subscription = form.watch((data) => {
      if (data.bedragVandaag && data.inflatiepercentage && data.tijdshorizon) {
        const calculationResult = calculateInflationImpact(data as InflatieFormData);
        setResult(calculationResult);
        setChartData(calculationResult.jaarlijkseData);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-destructive to-primary text-destructive-foreground">
          <CardTitle className="text-2xl font-bold">
            <i className="fas fa-trending-down mr-3"></i>
            Inflatie Impact Calculator
          </CardTitle>
          <p className="opacity-90">Bereken het effect van inflatie op uw koopkracht</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Inflatie Parameters</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="bedragVandaag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bedrag Vandaag (€)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="10.000"
                            data-testid="input-bedrag-vandaag"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inflatiepercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inflatiepercentage (% per jaar)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="2.5"
                            step={0.1}
                            data-testid="input-inflatiepercentage"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tijdshorizon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tijdshorizon (jaren)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="10"
                            data-testid="input-tijdshorizon"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="berekening"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type Berekening</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger data-testid="select-berekening">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="toekomst">Toekomstige waarde (wat kost het straks?)</SelectItem>
                              <SelectItem value="verleden">Historische waarde (wat was het waard?)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="scenario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inflatiescenarió</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger data-testid="select-scenario">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Lage inflatie</SelectItem>
                              <SelectItem value="medium">Gematigde inflatie</SelectItem>
                              <SelectItem value="high">Hoge inflatie</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    data-testid="button-calculate-inflatie"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Bereken Inflatie Impact
                  </Button>
                </form>
              </Form>
            </div>

            {/* Results Section */}
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Inflatie Resultaten</h3>
              
              {result && (
                <div className="space-y-6">
                  {/* Key Results */}
                  <div className="grid grid-cols-1 gap-4">
                    <CalculationResult
                      label={result.berekening === "toekomst" ? "Equivalent Bedrag in Toekomst" : "Koopkracht in Verleden"}
                      value={formatCurrency(result.bedragToekomst)}
                      variant="warning"
                      className="text-3xl"
                      data-testid="result-bedrag-toekomst"
                    />
                    <CalculationResult
                      label={result.berekening === "toekomst" ? "Extra Geld Nodig" : "Koopkrachtverlies"}
                      value={formatCurrency(Math.abs(result.koopkrachtVerlies))}
                      variant="destructive"
                      data-testid="result-koopkrachtverlies"
                    />
                    <CalculationResult
                      label="Percentage Verandering"
                      value={`${result.percentage_verandering > 0 ? '+' : ''}${formatPercentage(result.percentage_verandering)}`}
                      variant={result.percentage_verandering > 0 ? "warning" : "success"}
                      data-testid="result-percentage-verandering"
                    />
                  </div>

                  {/* Scenarios */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Verschillende Scenario's</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {result.scenarioResults.map((scenario: any) => (
                        <div key={scenario.scenario} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                          <div>
                            <span className="font-medium capitalize">{scenario.scenario === 'low' ? 'Lage' : scenario.scenario === 'medium' ? 'Gematigde' : 'Hoge'} inflatie</span>
                            <span className="text-sm text-muted-foreground ml-2">({formatPercentage(scenario.rate)})</span>
                          </div>
                          <span className="font-medium">{formatCurrency(scenario.waarde)}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

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
                              formatter={(value, name) => [
                                formatCurrency(value as number), 
                                name === "waarde" ? "Nominale Waarde" : "Huidige Koopkracht"
                              ]}
                              labelFormatter={(label) => `Jaar ${label}`}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="waarde" 
                              stroke="hsl(var(--destructive))" 
                              strokeWidth={2}
                              name="waarde"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="koopkracht" 
                              stroke="hsl(var(--muted-foreground))" 
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              name="koopkracht"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Info Card */}
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground">
                        <strong>Tip:</strong> Om uw koopkracht te behouden, moet uw geld minstens een rendement behalen dat gelijk is aan de inflatie. 
                        Bij {formatPercentage(form.watch("inflatiepercentage"))} inflatie verliest geld dat geen rente krijgt jaarlijks aan waarde.
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