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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

export default function RentevoetVergelijkerPage() {
  useEffect(() => {
    document.title = "Rentevoet Vergelijker België - Vast vs Variabel";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Vergelijk vaste en variabele rentevoeten in België. Simuleer rentefluctuaties en ontdek welke rentetype het meest voordelig is voor uw lening.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Vergelijk vaste en variabele rentevoeten in België. Simuleer rentefluctuaties en ontdek welke rentetype het meest voordelig is voor uw lening.';
      document.head.appendChild(meta);
    }
  }, []);

  const [lening, setLening] = useState({
    bedrag: 200000,
    looptijd: 240,
    vasteRente: 4.2,
    startVariabeleRente: 3.8,
    referentieRente: 3.5,
    marge: 0.3
  });

  const [scenario, setScenario] = useState<string>("stabiel");
  const [renteFluctuatie, setRenteFluctuatie] = useState<number>(1.5);
  const [wijzigingFrequentie, setWijzigingFrequentie] = useState<number>(12);

  // Calculate mortgage payments
  const berekenHypotheek = () => {
    const maandBedrag = lening.bedrag;
    const aantalMaanden = lening.looptijd;
    
    // Fixed rate calculation
    const vasteMaandRente = lening.vasteRente / 100 / 12;
    const vasteMaandlast = maandBedrag * 
      (vasteMaandRente * Math.pow(1 + vasteMaandRente, aantalMaanden)) /
      (Math.pow(1 + vasteMaandRente, aantalMaanden) - 1);
    const vasteTotaal = vasteMaandlast * aantalMaanden;
    const vasteRente = vasteTotaal - maandBedrag;

    // Variable rate scenarios
    const scenarios = {
      stabiel: { wijziging: 0, volatiliteit: 0.2 },
      stijgend: { wijziging: 0.5, volatiliteit: 0.3 },
      dalend: { wijziging: -0.3, volatiliteit: 0.25 },
      volatiel: { wijziging: 0, volatiliteit: 1.0 }
    };

    const gekozenScenario = scenarios[scenario as keyof typeof scenarios];
    
    // Simulate variable rate over time
    const simulatieData = [];
    let huidigeReferentieRente = lening.referentieRente;
    let variabeleTotaalRente = 0;
    let cumulatiefVast = 0;
    let cumulatiefVariabel = 0;
    
    for (let maand = 1; maand <= Math.min(aantalMaanden, 360); maand++) {
      // Update reference rate based on scenario
      if (maand % wijzigingFrequentie === 0) {
        const wijziging = (Math.random() - 0.5) * gekozenScenario.volatiliteit * 2;
        huidigeReferentieRente += wijziging + (gekozenScenario.wijziging / 12);
        huidigeReferentieRente = Math.max(0.1, Math.min(10, huidigeReferentieRente));
      }
      
      const variabeleRente = huidigeReferentieRente + lening.marge;
      const variabeleMaandRente = variabeleRente / 100 / 12;
      
      // Calculate monthly payment for variable rate (simplified)
      const restLooptijd = aantalMaanden - maand + 1;
      let variabeleMaandlast = 0;
      if (variabeleMaandRente > 0 && restLooptijd > 0) {
        const restSchuld = maandBedrag * (Math.pow(1 + variabeleMaandRente, restLooptijd) - Math.pow(1 + variabeleMaandRente, maand - 1)) / (Math.pow(1 + variabeleMaandRente, aantalMaanden) - 1);
        variabeleMaandlast = restSchuld * variabeleMaandRente / (1 - Math.pow(1 + variabeleMaandRente, -restLooptijd));
      }
      
      const maandRenteVast = vasteMaandlast - (maandBedrag / aantalMaanden);
      const maandRenteVariabel = variabeleMaandlast - (maandBedrag / aantalMaanden);
      
      cumulatiefVast += maandRenteVast;
      cumulatiefVariabel += maandRenteVariabel;
      
      if (maand % 12 === 0) {
        simulatieData.push({
          jaar: maand / 12,
          vasteRente: lening.vasteRente,
          variabeleRente: variabeleRente,
          cumulatiefVast: cumulatiefVast,
          cumulatiefVariabel: cumulatiefVariabel,
          verschil: cumulatiefVast - cumulatiefVariabel,
          vasteMaandlast: vasteMaandlast,
          variabeleMaandlast: isNaN(variabeleMaandlast) ? vasteMaandlast : variabeleMaandlast
        });
      }
    }

    return {
      vasteMaandlast,
      vasteTotaal,
      vasteRente,
      simulatieData,
      laatsteVariabeleRente: simulatieData[simulatieData.length - 1]?.variabeleRente || lening.startVariabeleRente
    };
  };

  const hypotheek = berekenHypotheek();

  // Calculate break-even point
  const breakEvenBerekening = () => {
    const verschilMaandlast = hypotheek.vasteMaandlast - (hypotheek.simulatieData[0]?.variabeleMaandlast || hypotheek.vasteMaandlast);
    const breakEvenMaanden = verschilMaandlast > 0 ? Math.abs(hypotheek.vasteRente / verschilMaandlast) : null;
    
    return {
      verschilMaandlast,
      breakEvenMaanden,
      breakEvenJaren: breakEvenMaanden ? breakEvenMaanden / 12 : null
    };
  };

  const breakEven = breakEvenBerekening();

  // Create comparison data for different scenarios
  const scenarioVergelijking = [
    { 
      scenario: "Stabiel", 
      vasteTotaal: hypotheek.vasteRente,
      variabeleTotaal: hypotheek.vasteRente * 0.95,
      verschil: hypotheek.vasteRente * 0.05
    },
    { 
      scenario: "Stijgend", 
      vasteTotaal: hypotheek.vasteRente,
      variabeleTotaal: hypotheek.vasteRente * 1.15,
      verschil: -hypotheek.vasteRente * 0.15
    },
    { 
      scenario: "Dalend", 
      vasteTotaal: hypotheek.vasteRente,
      variabeleTotaal: hypotheek.vasteRente * 0.85,
      verschil: hypotheek.vasteRente * 0.15
    },
    { 
      scenario: "Volatiel", 
      vasteTotaal: hypotheek.vasteRente,
      variabeleTotaal: hypotheek.vasteRente * 1.05,
      verschil: -hypotheek.vasteRente * 0.05
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header activeCalculator="rentevoet-vergelijker" onCalculatorChange={() => {}} />
      
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Rentevoet Vergelijker België
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Vergelijk vaste en variabele rentevoeten voor uw hypotheek of lening. 
              Simuleer verschillende rentescenario's en ontdek welke optie het meest voordelig is.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Vast vs Variabel
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Rente Simulatie
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Break-even Analyse
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
                  <i className="fas fa-chart-line mr-3 text-primary"></i>
                  Lening Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="bedrag">Lening bedrag</Label>
                  <Input
                    id="bedrag"
                    type="number"
                    value={lening.bedrag}
                    onChange={(e) => setLening({...lening, bedrag: Number(e.target.value)})}
                    data-testid="input-lening-bedrag"
                  />
                </div>

                <div>
                  <Label htmlFor="looptijd">Looptijd (maanden)</Label>
                  <Select value={lening.looptijd.toString()} onValueChange={(value) => setLening({...lening, looptijd: Number(value)})}>
                    <SelectTrigger data-testid="select-looptijd">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="180">180 maanden (15 jaar)</SelectItem>
                      <SelectItem value="240">240 maanden (20 jaar)</SelectItem>
                      <SelectItem value="300">300 maanden (25 jaar)</SelectItem>
                      <SelectItem value="360">360 maanden (30 jaar)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Rentevoeten</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="vasteRente">Vaste rente (%)</Label>
                      <Input
                        id="vasteRente"
                        type="number"
                        step="0.01"
                        value={lening.vasteRente}
                        onChange={(e) => setLening({...lening, vasteRente: Number(e.target.value)})}
                        data-testid="input-vaste-rente"
                      />
                    </div>

                    <div>
                      <Label htmlFor="referentieRente">Referentie rente (%)</Label>
                      <Input
                        id="referentieRente"
                        type="number"
                        step="0.01"
                        value={lening.referentieRente}
                        onChange={(e) => setLening({...lening, referentieRente: Number(e.target.value)})}
                        data-testid="input-referentie-rente"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Huidige ECB rente of Euribor
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="marge">Bank marge (%)</Label>
                      <Input
                        id="marge"
                        type="number"
                        step="0.01"
                        value={lening.marge}
                        onChange={(e) => setLening({...lening, marge: Number(e.target.value)})}
                        data-testid="input-marge"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Opslag van de bank
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Rentescenario</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="scenario">Verwacht scenario</Label>
                      <Select value={scenario} onValueChange={setScenario}>
                        <SelectTrigger data-testid="select-scenario">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stabiel">Stabiele rentes</SelectItem>
                          <SelectItem value="stijgend">Stijgende rentes</SelectItem>
                          <SelectItem value="dalend">Dalende rentes</SelectItem>
                          <SelectItem value="volatiel">Volatiele rentes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="wijzigingFrequentie">Renteherziening (maanden)</Label>
                      <Select value={wijzigingFrequentie.toString()} onValueChange={(value) => setWijzigingFrequentie(Number(value))}>
                        <SelectTrigger data-testid="select-wijziging-frequentie">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Maandelijks</SelectItem>
                          <SelectItem value="3">Per kwartaal</SelectItem>
                          <SelectItem value="6">Per halfjaar</SelectItem>
                          <SelectItem value="12">Jaarlijks</SelectItem>
                        </SelectContent>
                      </Select>
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
                  <CardTitle className="text-lg text-blue-600">Vaste Rente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600" data-testid="text-vaste-maandlast">
                    €{Math.round(hypotheek.vasteMaandlast)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Maandlast (altijd hetzelfde)
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Totale rente:</span>
                      <span>€{Math.round(hypotheek.vasteRente).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rentepercentage:</span>
                      <span>{lening.vasteRente}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Variabele Rente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600" data-testid="text-variabele-start">
                    €{Math.round(hypotheek.simulatieData[0]?.variabeleMaandlast || hypotheek.vasteMaandlast)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Start maandlast (kan wijzigen)
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Huidige rente:</span>
                      <span>{(lening.referentieRente + lening.marge).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Laatste rente:</span>
                      <span>{hypotheek.laatsteVariabeleRente?.toFixed(2)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Break-even Analysis */}
            {breakEven.breakEvenJaren && (
              <Card>
                <CardHeader>
                  <CardTitle>Break-even Analyse</CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <AlertDescription>
                      💡 Als de variabele rente gemiddeld {((hypotheek.vasteMaandlast - (hypotheek.simulatieData[0]?.variabeleMaandlast || 0)) / hypotheek.vasteMaandlast * 100).toFixed(1)}% 
                      hoger blijft dan nu, bereikt u break-even na {breakEven.breakEvenJaren.toFixed(1)} jaar.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            )}

            {/* Tabs for Different Views */}
            <Tabs defaultValue="simulatie" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="simulatie">Rente Simulatie</TabsTrigger>
                <TabsTrigger value="kosten">Kosten Vergelijking</TabsTrigger>
                <TabsTrigger value="scenarios">Scenario Analyse</TabsTrigger>
              </TabsList>
              
              <TabsContent value="simulatie" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Rente Evolutie - {scenario} scenario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={hypotheek.simulatieData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="jaar" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number, name: string) => [
                              `${value.toFixed(2)}%`,
                              name === 'vasteRente' ? 'Vaste rente' : 'Variabele rente'
                            ]}
                          />
                          <Line type="monotone" dataKey="vasteRente" stroke="#8884d8" name="vasteRente" strokeDasharray="5 5" />
                          <Line type="monotone" dataKey="variabeleRente" stroke="#82ca9d" name="variabeleRente" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cumulatieve Rente Kosten</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={hypotheek.simulatieData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="jaar" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
                          <Area type="monotone" dataKey="cumulatiefVast" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                          <Area type="monotone" dataKey="cumulatiefVariabel" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="kosten" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Maandlast Vergelijking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={hypotheek.simulatieData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="jaar" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => [`€${Math.round(value)}`]} />
                          <Line type="monotone" dataKey="vasteMaandlast" stroke="#8884d8" name="Vaste maandlast" strokeDasharray="5 5" />
                          <Line type="monotone" dataKey="variabeleMaandlast" stroke="#82ca9d" name="Variabele maandlast" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scenarios" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Scenario Vergelijking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={scenarioVergelijking}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="scenario" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
                          <Bar dataKey="vasteTotaal" fill="#8884d8" name="Vaste rente totaal" />
                          <Bar dataKey="variabeleTotaal" fill="#82ca9d" name="Variabele rente totaal" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Mid Ad */}
            <GoogleAdsense slot="rectangle" />

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Aanbevelingen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lening.vasteRente < (lening.referentieRente + lening.marge + 1) && (
                    <Alert>
                      <AlertDescription>
                        ✅ <strong>Vaste rente aanbevolen:</strong> Het verschil met variabele rente is klein, 
                        dus zekerheid van vaste rente weegt op tegen potentiële besparingen.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {lening.vasteRente > (lening.referentieRente + lening.marge + 2) && (
                    <Alert>
                      <AlertDescription>
                        💡 <strong>Variabele rente overwegen:</strong> Groot verschil met huidige variabele rente. 
                        Overweeg variabel als u rentefluctuaties kunt dragen.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Alert>
                    <AlertDescription>
                      📊 <strong>Uw risicoprofiel:</strong> Kies vast voor zekerheid en voorspelbaarheid, 
                      of variabel voor potentiële besparingen bij dalende rentes.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert>
                    <AlertDescription>
                      ⏰ <strong>Timing overwegingen:</strong> In een lage rente omgeving is vast vaak verstandig. 
                      Bij hoge rentes kan variabel interessanter zijn.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rate Comparison Widget */}
      <RateComparisonWidget productType="hypotheek" title="Vergelijk Hypotheek Aanbiedingen" />

      {/* Bottom Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GoogleAdsense slot="banner" className="w-full max-w-4xl mx-auto" />
      </section>

      <Footer />
    </div>
  );
}