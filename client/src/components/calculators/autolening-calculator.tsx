import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import NumberInput from "@/components/ui/number-input";
import CalculationResult from "@/components/ui/calculation-result";
import { formatCurrency } from "@/lib/formatters";

const autoleningSchema = z.object({
  aankoopbedrag: z.number().min(0, "Aankoopbedrag moet positief zijn"),
  voorschot: z.number().min(0, "Voorschot moet positief zijn").optional(),
  looptijd: z.number().min(1, "Looptijd moet minimaal 1 jaar zijn").max(10, "Looptijd kan niet meer dan 10 jaar zijn"),
  rentevoet: z.number().min(0, "Rentevoet moet positief zijn").max(50, "Rentevoet kan niet meer dan 50% zijn"),
  slottermijn: z.number().min(0, "Slottermijn moet positief zijn").optional(),
  heeftSlottermijn: z.boolean(),
});

type AutoleningFormData = z.infer<typeof autoleningSchema>;

export default function AutoleningCalculator() {
  const [result, setResult] = useState<any>(null);

  const form = useForm<AutoleningFormData>({
    resolver: zodResolver(autoleningSchema),
    defaultValues: {
      aankoopbedrag: 25000,
      voorschot: 5000,
      looptijd: 5,
      rentevoet: 4.5,
      slottermijn: 0,
      heeftSlottermijn: false,
    },
  });

  const calculateAutoLoan = (data: AutoleningFormData) => {
    const leningsbedrag = data.aankoopbedrag - (data.voorschot || 0);
    const maandRente = data.rentevoet / 100 / 12;
    const aantalMaanden = data.looptijd * 12;
    const slottermijn = data.heeftSlottermijn ? (data.slottermijn || 0) : 0;
    
    // Calculate loan amount minus balloon payment
    const financieringsBedrag = leningsbedrag - slottermijn;
    
    let maandelijksBedrag;
    if (slottermijn > 0) {
      // With balloon payment
      maandelijksBedrag = (financieringsBedrag * maandRente * Math.pow(1 + maandRente, aantalMaanden)) / 
                         (Math.pow(1 + maandRente, aantalMaanden) - 1);
    } else {
      // Regular loan
      maandelijksBedrag = (leningsbedrag * maandRente * Math.pow(1 + maandRente, aantalMaanden)) / 
                         (Math.pow(1 + maandRente, aantalMaanden) - 1);
    }
    
    const totaalMaandelijks = maandelijksBedrag * aantalMaanden;
    const totaalBetaald = totaalMaandelijks + slottermijn;
    const totaleInterest = totaalBetaald - leningsbedrag;

    return {
      leningsbedrag,
      maandelijksBedrag,
      slottermijn,
      totaalBetaald,
      totaleInterest,
      voorschot: data.voorschot || 0,
    };
  };

  const onSubmit = (data: AutoleningFormData) => {
    const calculationResult = calculateAutoLoan(data);
    setResult(calculationResult);
  };

  // Real-time calculation
  useEffect(() => {
    const subscription = form.watch((data) => {
      if (data.aankoopbedrag && data.looptijd && data.rentevoet) {
        const calculationResult = calculateAutoLoan(data as AutoleningFormData);
        setResult(calculationResult);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-accent to-secondary text-accent-foreground">
          <CardTitle className="text-2xl font-bold">
            <i className="fas fa-car mr-3"></i>
            Autolening Calculator
          </CardTitle>
          <p className="opacity-90">Bereken uw maandelijkse afbetaling en totale kosten voor een autolening</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Auto Financiering</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="aankoopbedrag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Aankoopbedrag Auto (€)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="25.000"
                            data-testid="input-aankoopbedrag"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="voorschot"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Voorschot/Eigen Inbreng (€)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="5.000"
                            data-testid="input-voorschot"
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
                            placeholder="5"
                            data-testid="input-looptijd-auto"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rentevoet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rentevoet/JKP (% per jaar)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="4.5"
                            step={0.1}
                            data-testid="input-rentevoet-auto"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="heeftSlottermijn"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-slottermijn"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Ballon/Slottermijn (restwaarde)
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("heeftSlottermijn") && (
                    <FormField
                      control={form.control}
                      name="slottermijn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slottermijn Bedrag (€)</FormLabel>
                          <FormControl>
                            <NumberInput
                              {...field}
                              placeholder="3.000"
                              data-testid="input-slottermijn-bedrag"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    data-testid="button-calculate-autolening"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Bereken Autolening
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
                      label="Te Financieren"
                      value={formatCurrency(result.leningsbedrag)}
                      variant="info"
                      data-testid="result-leningsbedrag-auto"
                    />
                    <CalculationResult
                      label="Maandelijkse Betaling"
                      value={formatCurrency(result.maandelijksBedrag)}
                      variant="success"
                      className="text-3xl"
                      data-testid="result-maandelijks-auto"
                    />
                    {result.slottermijn > 0 && (
                      <CalculationResult
                        label="Slottermijn"
                        value={formatCurrency(result.slottermijn)}
                        variant="warning"
                        data-testid="result-slottermijn"
                      />
                    )}
                    <CalculationResult
                      label="Totaal Betaald"
                      value={formatCurrency(result.totaalBetaald)}
                      variant="default"
                      data-testid="result-totaal-betaald-auto"
                    />
                    <CalculationResult
                      label="Totale Interest"
                      value={formatCurrency(result.totaleInterest)}
                      variant="warning"
                      data-testid="result-totale-interest-auto"
                    />
                  </div>

                  {/* Summary Card */}
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Aankoopprijs</span>
                        <span className="font-medium">{formatCurrency(form.watch("aankoopbedrag"))}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Eigen inbreng</span>
                        <span className="font-medium text-secondary">-{formatCurrency(result.voorschot)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between text-sm font-semibold">
                        <span>Te financieren</span>
                        <span>{formatCurrency(result.leningsbedrag)}</span>
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