import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NumberInput from "@/components/ui/number-input";
import { formatCurrency, formatPercentage } from "@/lib/formatters";

const kredietvergelijkerSchema = z.object({
  bedrag: z.number().min(1000, "Bedrag moet minimaal €1.000 zijn").max(100000, "Bedrag kan niet meer dan €100.000 zijn"),
  looptijd: z.number().min(12, "Looptijd moet minimaal 12 maanden zijn").max(120, "Looptijd kan niet meer dan 120 maanden zijn"),
  type: z.enum(["persoonlijk", "auto", "hypotheek"]),
});

type KredietvergelijkerFormData = z.infer<typeof kredietvergelijkerSchema>;

interface KredietAanbieding {
  bank: string;
  type: string;
  rentevoet: number;
  jkp: number;
  dossierkosten: number;
  maandelijksBedrag: number;
  totaalBetaald: number;
  totaleKosten: number;
}

export default function KredietvergelijkerCalculator() {
  const [aanbiedingen, setAanbiedingen] = useState<KredietAanbieding[]>([]);

  const form = useForm<KredietvergelijkerFormData>({
    resolver: zodResolver(kredietvergelijkerSchema),
    defaultValues: {
      bedrag: 15000,
      looptijd: 48,
      type: "persoonlijk",
    },
  });

  const generateKredietAanbiedingen = (data: KredietvergelijkerFormData): KredietAanbieding[] => {
    const baseRates = {
      persoonlijk: [
        { bank: "BNP Paribas Fortis", rentevoet: 5.9, dossierkosten: 125 },
        { bank: "KBC", rentevoet: 6.2, dossierkosten: 150 },
        { bank: "Belfius", rentevoet: 6.1, dossierkosten: 175 },
        { bank: "ING", rentevoet: 6.0, dossierkosten: 100 },
        { bank: "Argenta", rentevoet: 5.8, dossierkosten: 125 },
        { bank: "CBC", rentevoet: 6.3, dossierkosten: 150 },
      ],
      auto: [
        { bank: "BNP Paribas Fortis", rentevoet: 4.5, dossierkosten: 200 },
        { bank: "KBC", rentevoet: 4.8, dossierkosten: 175 },
        { bank: "Belfius", rentevoet: 4.6, dossierkosten: 225 },
        { bank: "ING", rentevoet: 4.4, dossierkosten: 150 },
        { bank: "Argenta", rentevoet: 4.3, dossierkosten: 175 },
        { bank: "Santander Consumer", rentevoet: 4.9, dossierkosten: 250 },
      ],
      hypotheek: [
        { bank: "BNP Paribas Fortis", rentevoet: 3.2, dossierkosten: 1200 },
        { bank: "KBC", rentevoet: 3.4, dossierkosten: 1000 },
        { bank: "Belfius", rentevoet: 3.3, dossierkosten: 1150 },
        { bank: "ING", rentevoet: 3.1, dossierkosten: 950 },
        { bank: "Argenta", rentevoet: 3.0, dossierkosten: 1100 },
        { bank: "CBC", rentevoet: 3.5, dossierkosten: 1250 },
      ],
    };

    const rates = baseRates[data.type];
    
    return rates.map(rate => {
      const maandRente = rate.rentevoet / 100 / 12;
      const maandelijksBedrag = (data.bedrag * maandRente * Math.pow(1 + maandRente, data.looptijd)) / 
                               (Math.pow(1 + maandRente, data.looptijd) - 1);
      const totaalBetaald = (maandelijksBedrag * data.looptijd) + rate.dossierkosten;
      const totaleKosten = totaalBetaald - data.bedrag;
      
      // Calculate JKP (includes all costs)
      const jkp = ((totaalBetaald / data.bedrag) - 1) * (12 / data.looptijd) * 100;

      return {
        bank: rate.bank,
        type: data.type,
        rentevoet: rate.rentevoet,
        jkp,
        dossierkosten: rate.dossierkosten,
        maandelijksBedrag,
        totaalBetaald,
        totaleKosten,
      };
    }).sort((a, b) => a.jkp - b.jkp); // Sort by JKP (lowest first)
  };

  const onSubmit = (data: KredietvergelijkerFormData) => {
    const kredietAanbiedingen = generateKredietAanbiedingen(data);
    setAanbiedingen(kredietAanbiedingen);
  };

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-destructive to-accent text-destructive-foreground">
          <CardTitle className="text-2xl font-bold">
            <i className="fas fa-balance-scale mr-3"></i>
            Kredietvergelijker
          </CardTitle>
          <p className="opacity-90">Vergelijk kredietaanbiedingen van verschillende banken</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Zoek Parameters</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="bedrag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gewenst Bedrag (€)</FormLabel>
                        <FormControl>
                          <NumberInput
                            {...field}
                            placeholder="15.000"
                            data-testid="input-bedrag-vergelijker"
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
                            <SelectTrigger data-testid="select-looptijd-vergelijker">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12">12 maanden</SelectItem>
                              <SelectItem value="24">24 maanden</SelectItem>
                              <SelectItem value="36">36 maanden</SelectItem>
                              <SelectItem value="48">48 maanden</SelectItem>
                              <SelectItem value="60">60 maanden</SelectItem>
                              <SelectItem value="72">72 maanden</SelectItem>
                              <SelectItem value="84">84 maanden</SelectItem>
                              <SelectItem value="96">96 maanden</SelectItem>
                              <SelectItem value="120">120 maanden</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type Krediet</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger data-testid="select-type-krediet">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="persoonlijk">Persoonlijke Lening</SelectItem>
                              <SelectItem value="auto">Autolening</SelectItem>
                              <SelectItem value="hypotheek">Hypotheek</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    data-testid="button-vergelijk-kredieten"
                  >
                    <i className="fas fa-search mr-2"></i>
                    Vergelijk Kredieten
                  </Button>
                </form>
              </Form>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-foreground mb-4">Kredietaanbiedingen</h3>
              
              {aanbiedingen.length > 0 ? (
                <div className="space-y-4">
                  {aanbiedingen.map((aanbieding, index) => (
                    <Card key={index} className={`${index === 0 ? 'border-2 border-secondary shadow-lg' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-lg">{aanbieding.bank}</h4>
                            {index === 0 && (
                              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                                Beste Aanbieding
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-secondary">
                              {formatCurrency(aanbieding.maandelijksBedrag)}
                            </div>
                            <div className="text-sm text-muted-foreground">per maand</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Rentevoet:</span>
                            <span className="ml-2 font-medium">{formatPercentage(aanbieding.rentevoet)}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">JKP:</span>
                            <span className="ml-2 font-medium">{formatPercentage(aanbieding.jkp)}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Dossierkosten:</span>
                            <span className="ml-2 font-medium">{formatCurrency(aanbieding.dossierkosten)}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Totaal betaald:</span>
                            <span className="ml-2 font-medium">{formatCurrency(aanbieding.totaalBetaald)}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t flex justify-between text-sm">
                          <span className="text-muted-foreground">Totale kosten vs. geleend bedrag:</span>
                          <span className="font-medium text-destructive">{formatCurrency(aanbieding.totaleKosten)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p><strong>Disclaimer:</strong> Dit zijn indicatieve tarieven voor vergelijkingsdoeleinden.</p>
                        <p>Werkelijke tarieven kunnen afwijken op basis van uw persoonlijke situatie en kredietwaardigheid.</p>
                        <p>Neem contact op met de betreffende bank voor een persoonlijke offerte.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <i className="fas fa-search text-4xl text-muted-foreground mb-4"></i>
                    <p className="text-muted-foreground">
                      Vul de parameters in en klik op "Vergelijk Kredieten" om aanbiedingen te bekijken.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}