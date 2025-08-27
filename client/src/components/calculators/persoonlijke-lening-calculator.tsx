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
import { formatCurrency } from "@/lib/formatters";

const persoonlijkeLeningSchema = z.object({
  leningsbedrag: z.number().min(500, "Leningsbedrag moet minimaal €500 zijn").max(75000, "Leningsbedrag kan niet meer dan €75.000 zijn"),
  looptijd: z.number().min(6, "Looptijd moet minimaal 6 maanden zijn").max(84, "Looptijd kan niet meer dan 84 maanden zijn"),
  rentevoet: z.number().min(0, "Rentevoet moet positief zijn").max(25, "Rentevoet kan niet meer dan 25% zijn"),
  dossierkosten: z.number().min(0, "Dossierkosten moet positief zijn").optional(),
  doel: z.enum(["renovatie", "auto", "vakantie", "studie", "andere"]),
});

type PersoonlijkeLeningFormData = z.infer<typeof persoonlijkeLeningSchema>;

export default function PersoonlijkeLeningCalculator() {
  const [result, setResult] = useState<any>(null);

  const form = useForm<PersoonlijkeLeningFormData>({
    resolver: zodResolver(persoonlijkeLeningSchema),
    defaultValues: {
      leningsbedrag: 15000,
      looptijd: 48,
      rentevoet: 6.5,
      dossierkosten: 150,
      doel: "renovatie",
    },
  });

  const calculatePersonalLoan = (data: PersoonlijkeLeningFormData) => {
    const maandRente = data.rentevoet / 100 / 12;
    const aantalMaanden = data.looptijd;
    const dossierkosten = data.dossierkosten || 0;
    
    // Calculate monthly payment
    const maandelijksBedrag = (data.leningsbedrag * maandRente * Math.pow(1 + maandRente, aantalMaanden)) / 
                             (Math.pow(1 + maandRente, aantalMaanden) - 1);
    
    const totaalBetaald = (maandelijksBedrag * aantalMaanden) + dossierkosten;
    const totaleInterest = totaalBetaald - data.leningsbedrag;
    const jkp = ((totaalBetaald / data.leningsbedrag) - 1) * (12 / data.looptijd) * 100;

    return {
      maandelijksBedrag,
      totaalBetaald,
      totaleInterest,
      dossierkosten,
      jkp,
      leningsbedrag: data.leningsbedrag,
    };
  };

  const onSubmit = (data: PersoonlijkeLeningFormData) => {
    const calculationResult = calculatePersonalLoan(data);
    setResult(calculationResult);
  };

  // Real-time calculation
  useEffect(() => {
    const subscription = form.watch((data) => {
      if (data.leningsbedrag && data.looptijd && data.rentevoet) {
        const calculationResult = calculatePersonalLoan(data as PersoonlijkeLeningFormData);
        setResult(calculationResult);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-destructive text-primary-foreground">
          <CardTitle className="text-2xl font-bold">
            <i className="fas fa-credit-card mr-3"></i>
            Persoonlijke Lening Calculator
          </CardTitle>
          <p className="opacity-90">Bereken uw maandelijkse afbetaling voor een persoonlijke lening</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Lening Details</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="leningsbedrag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Leningsbedrag (€)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="15.000"
                            data-testid="input-leningsbedrag-persoonlijk"
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
                        <FormLabel>Looptijd (maanden)</FormLabel>
                        <FormControl>
                          <Select 
                            value={field.value.toString()} 
                            onValueChange={(value) => field.onChange(parseInt(value))}
                          >
                            <SelectTrigger data-testid="select-looptijd-persoonlijk">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12">12 maanden (1 jaar)</SelectItem>
                              <SelectItem value="24">24 maanden (2 jaar)</SelectItem>
                              <SelectItem value="36">36 maanden (3 jaar)</SelectItem>
                              <SelectItem value="48">48 maanden (4 jaar)</SelectItem>
                              <SelectItem value="60">60 maanden (5 jaar)</SelectItem>
                              <SelectItem value="72">72 maanden (6 jaar)</SelectItem>
                              <SelectItem value="84">84 maanden (7 jaar)</SelectItem>
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
                            placeholder="6.5"
                            step={0.1}
                            data-testid="input-rentevoet-persoonlijk"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dossierkosten"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dossierkosten (€)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="150"
                            data-testid="input-dossierkosten"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="doel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doel van de Lening</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger data-testid="select-doel-lening">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="renovatie">Renovatie</SelectItem>
                              <SelectItem value="auto">Auto</SelectItem>
                              <SelectItem value="vakantie">Vakantie</SelectItem>
                              <SelectItem value="studie">Studie</SelectItem>
                              <SelectItem value="andere">Andere</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    data-testid="button-calculate-persoonlijk"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Bereken Persoonlijke Lening
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
                      label="Maandelijkse Betaling"
                      value={formatCurrency(result.maandelijksBedrag)}
                      variant="success"
                      className="text-3xl"
                      data-testid="result-maandelijks-persoonlijk"
                    />
                    <CalculationResult
                      label="Totaal Betaald"
                      value={formatCurrency(result.totaalBetaald)}
                      variant="default"
                      data-testid="result-totaal-betaald-persoonlijk"
                    />
                    <CalculationResult
                      label="Totale Interest + Kosten"
                      value={formatCurrency(result.totaleInterest)}
                      variant="warning"
                      data-testid="result-totale-interest-persoonlijk"
                    />
                    <CalculationResult
                      label="JKP (Jaarlijkse Kostenvoet)"
                      value={`${result.jkp.toFixed(2)}%`}
                      variant="info"
                      data-testid="result-jkp"
                    />
                  </div>

                  {/* Breakdown */}
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Geleend bedrag</span>
                        <span className="font-medium">{formatCurrency(result.leningsbedrag)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Dossierkosten</span>
                        <span className="font-medium">{formatCurrency(result.dossierkosten)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Interest</span>
                        <span className="font-medium text-destructive">{formatCurrency(result.totaleInterest - result.dossierkosten)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between text-sm font-semibold">
                        <span>Totaal terug te betalen</span>
                        <span>{formatCurrency(result.totaalBetaald)}</span>
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