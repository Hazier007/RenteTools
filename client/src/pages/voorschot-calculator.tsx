import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import RateComparisonWidget from "@/components/rate-comparison";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export default function VoorschotCalculatorPage() {
  useEffect(() => {
    document.title = "Voorschot Calculator België - Cash Advance & Bridge Loans";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Bereken kosten van voorschotten, cash advance en overbruggingskredieten in België. Vergelijk opties voor tijdelijke financiering en kortetermijnleningen.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Bereken kosten van voorschotten, cash advance en overbruggingskredieten in België. Vergelijk opties voor tijdelijke financiering en kortetermijnleningen.';
      document.head.appendChild(meta);
    }
  }, []);

  const [voorschot, setVoorschot] = useState({
    bedrag: 15000,
    type: "salary",
    looptijd: 6,
    jaarRente: 18.5,
    afsluitkosten: 150,
    maandelijkseKosten: 25
  });

  const [terugbetalingType, setTerugbetalingType] = useState<string>("maandelijks");
  const [verwachtInkomen, setVerwachtInkomen] = useState<number>(3200);

  // Calculate advance/bridge loan costs
  const berekenVoorschot = () => {
    const maandRente = voorschot.jaarRente / 100 / 12;
    const aantalMaanden = voorschot.looptijd;
    
    // Calculate based on repayment type
    let maandlast = 0;
    let totaalBetaald = 0;
    let totaleRente = 0;
    
    if (terugbetalingType === "eenmalig") {
      // Lump sum repayment with compound interest
      totaalBetaald = voorschot.bedrag * Math.pow(1 + maandRente, aantalMaanden);
      totaleRente = totaalBetaald - voorschot.bedrag;
      maandlast = 0; // No monthly payments
    } else if (terugbetalingType === "maandelijks") {
      // Monthly payments
      if (maandRente > 0) {
        maandlast = voorschot.bedrag * 
          (maandRente * Math.pow(1 + maandRente, aantalMaanden)) /
          (Math.pow(1 + maandRente, aantalMaanden) - 1);
      } else {
        maandlast = voorschot.bedrag / aantalMaanden;
      }
      totaalBetaald = maandlast * aantalMaanden;
      totaleRente = totaalBetaald - voorschot.bedrag;
    } else if (terugbetalingType === "alleen-rente") {
      // Interest-only payments
      const maandelijksRente = voorschot.bedrag * maandRente;
      maandlast = maandelijksRente;
      totaalBetaald = (maandelijksRente * aantalMaanden) + voorschot.bedrag;
      totaleRente = maandelijksRente * aantalMaanden;
    }
    
    // Add fees
    const totaleKosten = totaalBetaald + voorschot.afsluitkosten + (voorschot.maandelijkseKosten * aantalMaanden);
    const effectieveJKP = ((totaleKosten / voorschot.bedrag) - 1) * (12 / aantalMaanden) * 100;
    
    // Risk assessment
    const schuldRatio = maandlast > 0 ? (maandlast / verwachtInkomen) * 100 : 0;
    const voorschotRatio = (voorschot.bedrag / (verwachtInkomen * aantalMaanden)) * 100;
    
    return {
      maandlast,
      totaalBetaald,
      totaleRente,
      totaleKosten,
      effectieveJKP,
      schuldRatio,
      voorschotRatio
    };
  };

  const berekening = berekenVoorschot();

  // Create repayment schedule
  const createTerugbetalingSchema = () => {
    const data = [];
    const maandRente = voorschot.jaarRente / 100 / 12;
    let restSchuld = voorschot.bedrag;
    
    for (let maand = 1; maand <= voorschot.looptijd; maand++) {
      let renteDeelMaand = 0;
      let aflossingDeelMaand = 0;
      
      if (terugbetalingType === "maandelijks") {
        renteDeelMaand = restSchuld * maandRente;
        aflossingDeelMaand = berekening.maandlast - renteDeelMaand;
        restSchuld -= aflossingDeelMaand;
      } else if (terugbetalingType === "alleen-rente") {
        renteDeelMaand = voorschot.bedrag * maandRente;
        aflossingDeelMaand = maand === voorschot.looptijd ? voorschot.bedrag : 0;
        if (maand === voorschot.looptijd) restSchuld = 0;
      } else if (terugbetalingType === "eenmalig") {
        renteDeelMaand = 0;
        aflossingDeelMaand = 0;
        if (maand === voorschot.looptijd) {
          aflossingDeelMaand = berekening.totaalBetaald;
          restSchuld = 0;
        }
      }
      
      data.push({
        maand: `M${maand}`,
        rente: Math.round(renteDeelMaand),
        aflossing: Math.round(aflossingDeelMaand),
        restSchuld: Math.round(Math.max(restSchuld, 0)),
        betaling: Math.round(renteDeelMaand + aflossingDeelMaand + voorschot.maandelijkseKosten)
      });
    }
    
    return data;
  };

  const terugbetalingSchema = createTerugbetalingSchema();

  // Different advance types comparison
  const voorschotTypes = [
    { 
      type: "Salaris voorschot", 
      rente: 12.0, 
      kosten: 50,
      maxBedrag: verwachtInkomen * 2,
      omschrijving: "Voorschot op salaris"
    },
    { 
      type: "Cash advance", 
      rente: 22.5, 
      kosten: 100,
      maxBedrag: verwachtInkomen * 1.5,
      omschrijving: "Snelle contanten"
    },
    { 
      type: "Overbruggingskrediet", 
      rente: 8.5, 
      kosten: 300,
      maxBedrag: verwachtInkomen * 6,
      omschrijving: "Tijdelijke financiering"
    },
    { 
      type: "Creditcard advance", 
      rente: 19.8, 
      kosten: 75,
      maxBedrag: verwachtInkomen * 1,
      omschrijving: "Contant via creditcard"
    }
  ];

  // Cost breakdown
  const kostenBreakdown = [
    { name: 'Hoofdsom', value: voorschot.bedrag, color: '#8884d8' },
    { name: 'Rente', value: berekening.totaleRente, color: '#82ca9d' },
    { name: 'Afsluitkosten', value: voorschot.afsluitkosten, color: '#ffc658' },
    { name: 'Maandelijkse kosten', value: voorschot.maandelijkseKosten * voorschot.looptijd, color: '#ff7300' }
  ].filter(item => item.value > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header activeCalculator="voorschot-calculator" onCalculatorChange={() => {}} />
      
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Voorschot Calculator België
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Bereken de kosten van voorschotten, cash advance en overbruggingskredieten. 
              Vergelijk verschillende opties voor kortetermijn financiering en tijdelijke liquiditeit.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Cash Advance
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Bridge Loans
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Kortetermijn
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Top Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GoogleAdsense slot="banner" className="w-full max-w-4xl mx-auto" />
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-money-bill-wave mr-3 text-primary"></i>
                  Voorschot Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="bedrag">Voorschot bedrag</Label>
                  <Input
                    id="bedrag"
                    type="number"
                    value={voorschot.bedrag}
                    onChange={(e) => setVoorschot({...voorschot, bedrag: Number(e.target.value)})}
                    data-testid="input-voorschot-bedrag"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Type voorschot</Label>
                  <Select value={voorschot.type} onValueChange={(value) => setVoorschot({...voorschot, type: value})}>
                    <SelectTrigger data-testid="select-voorschot-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Salaris voorschot</SelectItem>
                      <SelectItem value="cash">Cash advance</SelectItem>
                      <SelectItem value="bridge">Overbruggingskrediet</SelectItem>
                      <SelectItem value="creditcard">Creditcard advance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="looptijd">Looptijd (maanden)</Label>
                  <Select value={voorschot.looptijd.toString()} onValueChange={(value) => setVoorschot({...voorschot, looptijd: Number(value)})}>
                    <SelectTrigger data-testid="select-looptijd">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 maand</SelectItem>
                      <SelectItem value="2">2 maanden</SelectItem>
                      <SelectItem value="3">3 maanden</SelectItem>
                      <SelectItem value="6">6 maanden</SelectItem>
                      <SelectItem value="12">12 maanden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="terugbetalingType">Terugbetaling</Label>
                  <Select value={terugbetalingType} onValueChange={setTerugbetalingType}>
                    <SelectTrigger data-testid="select-terugbetaling-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maandelijks">Maandelijkse afbetaling</SelectItem>
                      <SelectItem value="alleen-rente">Alleen rente, hoofdsom einde</SelectItem>
                      <SelectItem value="eenmalig">Eenmalige terugbetaling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Kosten & Voorwaarden</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="jaarRente">Jaarrente (%)</Label>
                      <Input
                        id="jaarRente"
                        type="number"
                        step="0.1"
                        value={voorschot.jaarRente}
                        onChange={(e) => setVoorschot({...voorschot, jaarRente: Number(e.target.value)})}
                        data-testid="input-jaar-rente"
                      />
                    </div>

                    <div>
                      <Label htmlFor="afsluitkosten">Afsluitkosten</Label>
                      <Input
                        id="afsluitkosten"
                        type="number"
                        value={voorschot.afsluitkosten}
                        onChange={(e) => setVoorschot({...voorschot, afsluitkosten: Number(e.target.value)})}
                        data-testid="input-afsluitkosten"
                      />
                    </div>

                    <div>
                      <Label htmlFor="maandelijkseKosten">Maandelijkse kosten</Label>
                      <Input
                        id="maandelijkseKosten"
                        type="number"
                        value={voorschot.maandelijkseKosten}
                        onChange={(e) => setVoorschot({...voorschot, maandelijkseKosten: Number(e.target.value)})}
                        data-testid="input-maandelijkse-kosten"
                      />
                    </div>

                    <div>
                      <Label htmlFor="verwachtInkomen">Verwacht maandinkomen</Label>
                      <Input
                        id="verwachtInkomen"
                        type="number"
                        value={verwachtInkomen}
                        onChange={(e) => setVerwachtInkomen(Number(e.target.value))}
                        data-testid="input-verwacht-inkomen"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Voor risicobeoordeling
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Key Results */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {terugbetalingType === "eenmalig" ? "Eenmalige Terugbetaling" : "Maandlast"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary" data-testid="text-maandlast">
                    €{terugbetalingType === "eenmalig" ? Math.round(berekening.totaalBetaald) : Math.round(berekening.maandlast + voorschot.maandelijkseKosten)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {terugbetalingType === "eenmalig" ? `Na ${voorschot.looptijd} maanden` : "Per maand"}
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Effectieve JKP:</span>
                      <span>{berekening.effectieveJKP.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Schuldgraad:</span>
                      <span>{berekening.schuldRatio.toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Totale Kosten</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600" data-testid="text-totale-kosten">
                    €{Math.round(berekening.totaleKosten)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Alles inbegrepen over {voorschot.looptijd} maanden
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Totale rente:</span>
                      <span>€{Math.round(berekening.totaleRente)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Extra kosten:</span>
                      <span>€{Math.round(berekening.totaleKosten - berekening.totaalBetaald)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Warnings */}
            {berekening.effectieveJKP > 20 && (
              <Alert>
                <AlertDescription>
                  ⚠️ Hoge effectieve rente van {berekening.effectieveJKP.toFixed(1)}%! 
                  Overweeg alternatieven zoals een traditionele lening.
                </AlertDescription>
              </Alert>
            )}

            {berekening.schuldRatio > 30 && (
              <Alert>
                <AlertDescription>
                  ⚠️ Schuldgraad van {berekening.schuldRatio.toFixed(1)}% is hoog. 
                  Dit kan uw kredietwaardigheid beïnvloeden.
                </AlertDescription>
              </Alert>
            )}

            {/* Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Kostenverdeling</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={kostenBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {kostenBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Mid Ad */}
            <GoogleAdsense slot="rectangle" />

            {/* Repayment Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Terugbetalingschema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={terugbetalingSchema}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="maand" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`€${Math.round(value)}`]} />
                      <Bar dataKey="rente" stackId="a" fill="#8884d8" name="Rente" />
                      <Bar dataKey="aflossing" stackId="a" fill="#82ca9d" name="Aflossing" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Type Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Voorschot Types Vergelijking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Type</th>
                        <th className="text-right p-2">Typische rente</th>
                        <th className="text-right p-2">Kosten</th>
                        <th className="text-right p-2">Max bedrag</th>
                        <th className="text-left p-2">Geschikt voor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {voorschotTypes.map((type, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">{type.type}</td>
                          <td className="p-2 text-right">{type.rente}%</td>
                          <td className="p-2 text-right">€{type.kosten}</td>
                          <td className="p-2 text-right">€{Math.round(type.maxBedrag).toLocaleString()}</td>
                          <td className="p-2 text-sm text-muted-foreground">{type.omschrijving}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Aanbevelingen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Alert>
                    <AlertDescription>
                      💡 <strong>Kortetermijn only:</strong> Voorschotten zijn duur en alleen geschikt voor zeer korte periode. 
                      Zoek alternatieven voor langere financiering.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert>
                    <AlertDescription>
                      ⚠️ <strong>Vicieuze cirkel:</strong> Vermijd herhaalde voorschotten die leiden tot een schuldenspiraal. 
                      Werk aan structurele oplossingen.
                    </AlertDescription>
                  </Alert>
                  
                  {berekening.voorschotRatio > 50 && (
                    <Alert>
                      <AlertDescription>
                        🚨 <strong>Hoog voorschot ratio:</strong> U leent {berekening.voorschotRatio.toFixed(0)}% van uw verwachte inkomen. 
                        Dit is risicovol voor uw financiële stabiliteit.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Alert>
                    <AlertDescription>
                      🏦 <strong>Alternatieven overwegen:</strong> Bekijk persoonlijke lening, kredietlijn, 
                      of vraag familie/vrienden om hulp tegen betere voorwaarden.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rate Comparison Widget */}
      <RateComparisonWidget productType="kortetermijn-krediet" title="Vergelijk Kortetermijn Financiering" />

      {/* Bottom Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GoogleAdsense slot="banner" className="w-full max-w-4xl mx-auto" />
      </section>

      <Footer />
    </div>
  );
}