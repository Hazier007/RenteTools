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
import { formatCurrency, formatPercentage } from "@/lib/formatters";

const depositoSchema = z.object({
  bedrag: z.number().min(500, "Bedrag moet minimaal €500 zijn"),
  looptijd: z.number().min(1, "Looptijd moet minimaal 1 maand zijn").max(120, "Looptijd kan niet meer dan 120 maanden zijn"),
  rentevoet: z.number().min(0, "Rentevoet moet positief zijn").max(10, "Rentevoet kan niet meer dan 10% zijn"),
  uitkeringFrequentie: z.enum(["maandelijks", "jaarlijks", "einde"]),
  verlenging: z.enum(["automatisch", "handmatig"]),
});

type DepositoFormData = z.infer<typeof depositoSchema>;

export default function DepositoCalculator() {
  const [result, setResult] = useState<any>(null);

  const form = useForm<DepositoFormData>({
    resolver: zodResolver(depositoSchema),
    defaultValues: {
      bedrag: 10000,
      looptijd: 24,
      rentevoet: 2.8,
      uitkeringFrequentie: "einde",
      verlenging: "handmatig",
    },
  });

  const calculateDeposit = (data: DepositoFormData) => {
    const jaarlijkseRentePercentage = data.rentevoet / 100;
    const maandenLooptijd = data.looptijd;
    const jarenLooptijd = maandenLooptijd / 12;
    
    let eindbedrag;
    let totaleRente;
    let maandelijkeRente = 0;
    let jaarlijkseRenteBedrag = 0;

    if (data.uitkeringFrequentie === "einde") {
      // Compound interest until the end
      eindbedrag = data.bedrag * Math.pow(1 + jaarlijkseRentePercentage, jarenLooptijd);
    } else if (data.uitkeringFrequentie === "jaarlijks") {
      // Simple interest paid yearly
      jaarlijkseRenteBedrag = data.bedrag * jaarlijkseRentePercentage;
      eindbedrag = data.bedrag; // Capital remains the same
    } else {
      // Monthly interest payment
      maandelijkeRente = (data.bedrag * jaarlijkseRentePercentage) / 12;
      eindbedrag = data.bedrag; // Capital remains the same
    }

    if (data.uitkeringFrequentie === "einde") {
      totaleRente = eindbedrag - data.bedrag;
    } else if (data.uitkeringFrequentie === "jaarlijks") {
      totaleRente = jaarlijkseRenteBedrag * jarenLooptijd;
    } else {
      totaleRente = maandelijkeRente * maandenLooptijd;
    }

    const effectieveRente = ((eindbedrag + (data.uitkeringFrequentie !== "einde" ? totaleRente : 0)) / data.bedrag - 1) * (12 / maandenLooptijd) * 100;

    return {
      bedrag: data.bedrag,
      eindbedrag,
      totaleRente,
      maandelijkeRente,
      jaarlijkseRente: jaarlijkseRenteBedrag,
      effectieveRente,
      uitkeringFrequentie: data.uitkeringFrequentie,
      looptijd: data.looptijd,
    };
  };

  const onSubmit = (data: DepositoFormData) => {
    const calculationResult = calculateDeposit(data);
    setResult(calculationResult);
  };

  // Real-time calculation
  useEffect(() => {
    const subscription = form.watch((data) => {
      if (data.bedrag && data.looptijd && data.rentevoet) {
        const calculationResult = calculateDeposit(data as DepositoFormData);
        setResult(calculationResult);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-secondary to-primary text-secondary-foreground">
          <CardTitle className="text-2xl font-bold">
            <i className="fas fa-university mr-3"></i>
            Deposito/Termijnrekening Calculator
          </CardTitle>
          <p className="opacity-90">Bereken het rendement van uw deposito of termijnrekening</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Deposito Details</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="bedrag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inlegbedrag (€)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="10.000"
                            data-testid="input-bedrag-deposito"
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
                            <SelectTrigger data-testid="select-looptijd-deposito">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3">3 maanden</SelectItem>
                              <SelectItem value="6">6 maanden</SelectItem>
                              <SelectItem value="12">12 maanden (1 jaar)</SelectItem>
                              <SelectItem value="24">24 maanden (2 jaar)</SelectItem>
                              <SelectItem value="36">36 maanden (3 jaar)</SelectItem>
                              <SelectItem value="48">48 maanden (4 jaar)</SelectItem>
                              <SelectItem value="60">60 maanden (5 jaar)</SelectItem>
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
                            placeholder="2.8"
                            step={0.1}
                            data-testid="input-rentevoet-deposito"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="uitkeringFrequentie"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rente Uitkering</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger data-testid="select-uitkering">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="einde">Aan het einde (kapitalisatie)</SelectItem>
                              <SelectItem value="jaarlijks">Jaarlijks uitbetalen</SelectItem>
                              <SelectItem value="maandelijks">Maandelijks uitbetalen</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="verlenging"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Verlenging</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger data-testid="select-verlenging">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="automatisch">Automatische verlenging</SelectItem>
                              <SelectItem value="handmatig">Handmatige verlenging</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    data-testid="button-calculate-deposito"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    Bereken Deposito
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
                      label="Inlegbedrag"
                      value={formatCurrency(result.bedrag)}
                      variant="info"
                      data-testid="result-inlegbedrag"
                    />
                    
                    {result.uitkeringFrequentie === "einde" ? (
                      <CalculationResult
                        label="Eindbedrag"
                        value={formatCurrency(result.eindbedrag)}
                        variant="success"
                        className="text-3xl"
                        data-testid="result-eindbedrag-deposito"
                      />
                    ) : (
                      <>
                        {result.uitkeringFrequentie === "maandelijks" && (
                          <CalculationResult
                            label="Maandelijkse Rente"
                            value={formatCurrency(result.maandelijkeRente)}
                            variant="success"
                            className="text-3xl"
                            data-testid="result-maandelijkse-rente"
                          />
                        )}
                        {result.uitkeringFrequentie === "jaarlijks" && (
                          <CalculationResult
                            label="Jaarlijkse Rente"
                            value={formatCurrency(result.jaarlijkseRente)}
                            variant="success"
                            className="text-3xl"
                            data-testid="result-jaarlijkse-rente"
                          />
                        )}
                      </>
                    )}
                    
                    <CalculationResult
                      label="Totale Rente"
                      value={formatCurrency(result.totaleRente)}
                      variant="default"
                      data-testid="result-totale-rente-deposito"
                    />
                    
                    <CalculationResult
                      label="Effectieve Jaarlijkse Rente"
                      value={formatPercentage(result.effectieveRente)}
                      variant="info"
                      data-testid="result-effectieve-rente"
                    />
                  </div>

                  {/* Details Card */}
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Looptijd</span>
                        <span className="font-medium">{result.looptijd} maanden</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Uitkering</span>
                        <span className="font-medium capitalize">{result.uitkeringFrequentie}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Rendement per jaar</span>
                        <span className="font-medium text-secondary">{formatPercentage(form.watch("rentevoet"))}</span>
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