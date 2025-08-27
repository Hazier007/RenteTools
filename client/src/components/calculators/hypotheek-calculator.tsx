import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NumberInput from "@/components/ui/number-input";
import CalculationResult from "@/components/ui/calculation-result";
import { calculateMortgage } from "@/lib/calculations";
import { formatCurrency, formatPercentage } from "@/lib/formatters";

const hypotheekSchema = z.object({
  leningsbedrag: z.number().min(0, "Leningsbedrag moet positief zijn"),
  looptijd: z.number().min(1, "Looptijd moet minimaal 1 jaar zijn").max(50, "Looptijd kan niet meer dan 50 jaar zijn"),
  rentevoet: z.number().min(0, "Rentevoet moet positief zijn").max(100, "Rentevoet kan niet meer dan 100% zijn"),
  rentetype: z.enum(["vast", "variabel"]),
  herzieningsfrequentie: z.string().optional(),
  maximaleStijging: z.number().optional(),
  notariskosten: z.number().min(0, "Notariskosten moet positief zijn").optional(),
});

type HypotheekFormData = z.infer<typeof hypotheekSchema>;

export default function HypotheekCalculator() {
  const [result, setResult] = useState<any>(null);

  const form = useForm<HypotheekFormData>({
    resolver: zodResolver(hypotheekSchema),
    defaultValues: {
      leningsbedrag: 300000,
      looptijd: 20,
      rentevoet: 3.5,
      rentetype: "vast",
      herzieningsfrequentie: "5",
      maximaleStijging: 2.0,
      notariskosten: 2500,
    },
  });

  const onSubmit = (data: HypotheekFormData) => {
    const calculationResult = calculateMortgage(data);
    setResult(calculationResult);
  };

  // Real-time calculation
  useEffect(() => {
    const subscription = form.watch((data) => {
      if (data.leningsbedrag && data.looptijd && data.rentevoet) {
        const calculationResult = calculateMortgage(data as HypotheekFormData);
        setResult(calculationResult);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <CardTitle className="text-2xl font-bold">
            <i className="fas fa-home mr-3"></i>
            Hypothecaire Lening Simulator
          </CardTitle>
          <p className="opacity-90">Bereken uw maandelijkse afbetaling en aflossingsschema</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basis Gegevens</TabsTrigger>
              <TabsTrigger value="advanced">Geavanceerd</TabsTrigger>
            </TabsList>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <TabsContent value="basic" className="space-y-4 mt-0">
                      <FormField
                        control={form.control}
                        name="leningsbedrag"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Leningsbedrag (€)</FormLabel>
                            <FormControl>
                              <NumberInput
                                {...field}
                                placeholder="300.000"
                                data-testid="input-leningsbedrag"
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
                              <Select 
                                value={field.value.toString()} 
                                onValueChange={(value) => field.onChange(parseInt(value))}
                              >
                                <SelectTrigger data-testid="select-looptijd">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="10">10 jaar</SelectItem>
                                  <SelectItem value="15">15 jaar</SelectItem>
                                  <SelectItem value="20">20 jaar</SelectItem>
                                  <SelectItem value="25">25 jaar</SelectItem>
                                  <SelectItem value="30">30 jaar</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="rentevoet"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rentevoet (% per jaar)</FormLabel>
                            <FormControl>
                              <NumberInput
                                {...field}
                                placeholder="3.5"
                                step={0.01}
                                data-testid="input-rentevoet"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="rentetype"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type Rente</FormLabel>
                            <FormControl>
                              <RadioGroup 
                                value={field.value} 
                                onValueChange={field.onChange}
                                data-testid="radio-rentetype"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="vast" id="vast" />
                                  <label htmlFor="vast" className="text-sm">Vaste rente</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="variabel" id="variabel" />
                                  <label htmlFor="variabel" className="text-sm">Variabele rente</label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </TabsContent>

                    <TabsContent value="advanced" className="space-y-4 mt-0">
                      <FormField
                        control={form.control}
                        name="herzieningsfrequentie"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Herzieningsfrequentie</FormLabel>
                            <FormControl>
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger data-testid="select-herziening">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">Jaarlijks (1/1/1)</SelectItem>
                                  <SelectItem value="5">Om de 5 jaar (5/5/5)</SelectItem>
                                  <SelectItem value="10">10/5/5 schema</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maximaleStijging"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximale Rentestijging (%)</FormLabel>
                            <FormControl>
                              <NumberInput
                                {...field}
                                placeholder="2.0"
                                step={0.1}
                                data-testid="input-max-stijging"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notariskosten"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notariskosten (€)</FormLabel>
                            <FormControl>
                              <NumberInput
                                {...field}
                                placeholder="2500"
                                data-testid="input-notariskosten"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </TabsContent>

                    <Button
                      type="submit"
                      className="w-full"
                      data-testid="button-calculate-hypotheek"
                    >
                      <i className="fas fa-calculator mr-2"></i>
                      Bereken Hypotheek
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Results Section */}
              <div className="bg-muted rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Resultaten</h3>
                
                {result && (
                  <div className="space-y-6">
                    {/* Key Results */}
                    <div className="grid grid-cols-1 gap-4">
                      <CalculationResult
                        label="Maandelijkse Afbetaling"
                        value={formatCurrency(result.maandelijksBedrag)}
                        variant="success"
                        className="text-3xl"
                        data-testid="result-maandelijks"
                      />
                      <CalculationResult
                        label="Totaal Betaald"
                        value={formatCurrency(result.totaalBetaald)}
                        variant="default"
                        data-testid="result-totaal-betaald"
                      />
                      <CalculationResult
                        label="Totale Interest"
                        value={formatCurrency(result.totaleInterest)}
                        variant="warning"
                        data-testid="result-totale-interest-hypotheek"
                      />
                    </div>

                    {/* Breakdown */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Verdeling Betaling</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Kapitaal</span>
                          <span className="font-medium">{formatCurrency(result.kapitaalDeel)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Interest</span>
                          <span className="font-medium text-destructive">{formatCurrency(result.interestDeel)}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 mt-3">
                          <div 
                            className="bg-primary h-3 rounded-full" 
                            style={{ width: `${result.kapitaalPercentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{formatPercentage(result.kapitaalPercentage)} Kapitaal</span>
                          <span>{formatPercentage(result.interestPercentage)} Interest</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm">
                        <i className="fas fa-table mr-1"></i>
                        Aflossingsschema
                      </Button>
                      <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-sm">
                        <i className="fas fa-download mr-1"></i>
                        Exporteren
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
