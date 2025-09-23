import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import RateComparisonWidget from "@/components/rate-comparison";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, ComposedChart } from 'recharts';

interface PeriodicInvestment {
  periode: number;
  datum: string;
  investering: number;
  koers: number;
  aandelenGekocht: number;
  cumulatiefAandelen: number;
  cumulatiefGeïnvesteerd: number;
  portfolioWaarde: number;
  rendement: number;
}

interface MarketData {
  maand: number;
  datum: string;
  koers: number;
  maandRendement: number;
}

export default function DollarCostAveragingCalculatorPage() {
  useEffect(() => {
    document.title = "Dollar Cost Averaging Calculator België - Periodiek Beleggen";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Bereken de voordelen van periodiek beleggen vs lump sum investeren. Simuleer DCA strategieën en analyseer marktvolatiliteit impact voor Belgische beleggers.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Bereken de voordelen van periodiek beleggen vs lump sum investeren. Simuleer DCA strategieën en analyseer marktvolatiliteit impact voor Belgische beleggers.';
      document.head.appendChild(meta);
    }
  }, []);

  const [dcaData, setDcaData] = useState({
    maandelijkseBijdrage: 1000,
    investeringsPeriode: 60, // maanden
    startKoers: 100,
    gemiddeldeRendement: 8.0,
    volatiliteit: 18.0,
    frequentie: 'maandelijks', // maandelijks, kwartaal, halfjaarlijks
    transactiekosten: 5,
    lumpSumBedrag: 60000, // equivalent van totale DCA bijdragen
    belastingPercentage: 0.3, // roerende voorheffing op dividend
    startDatum: '2020-01-01'
  });

  // Generate realistic market data with volatility
  const generateMarketData = (): MarketData[] => {
    const maanden = dcaData.investeringsPeriode;
    const maandelijksRendement = dcaData.gemiddeldeRendement / 12 / 100;
    const maandelijkseVolatiliteit = dcaData.volatiliteit / Math.sqrt(12) / 100;
    
    const marktData = [];
    let huidigeKoers = dcaData.startKoers;
    
    // Add some historical-like patterns
    const patterns = {
      bull: 1.2, // bull market factor
      bear: 0.7, // bear market factor
      sideways: 1.0
    };
    
    for (let maand = 0; maand <= maanden; maand++) {
      if (maand > 0) {
        // Simulate market cycles
        let cyclusFactor = 1.0;
        if (maand < maanden * 0.3) cyclusFactor = patterns.bull;
        else if (maand < maanden * 0.5) cyclusFactor = patterns.bear;
        else if (maand < maanden * 0.8) cyclusFactor = patterns.sideways;
        else cyclusFactor = patterns.bull;
        
        // Generate random return with some mean reversion
        const randomFactor = (Math.random() - 0.5) * 2;
        const cyclischRendement = maandelijksRendement * cyclusFactor;
        const maandRendement = cyclischRendement + (maandelijkseVolatiliteit * randomFactor);
        
        huidigeKoers *= (1 + maandRendement);
      }
      
      const datum = new Date(dcaData.startDatum);
      datum.setMonth(datum.getMonth() + maand);
      
      marktData.push({
        maand,
        datum: datum.toISOString().split('T')[0],
        koers: Math.round(huidigeKoers * 100) / 100,
        maandRendement: maand === 0 ? 0 : ((huidigeKoers / marktData[maand - 1].koers) - 1) * 100
      });
    }
    
    return marktData;
  };

  const marktData = generateMarketData();

  // Calculate DCA performance
  const berekenDCAPerformance = () => {
    const frequentieMap = {
      'maandelijks': 1,
      'kwartaal': 3,
      'halfjaarlijks': 6
    };
    
    const investeringsFrequentie = frequentieMap[dcaData.frequentie as keyof typeof frequentieMap];
    const dcaInvesteringen: PeriodicInvestment[] = [];
    
    let cumulatiefAandelen = 0;
    let cumulatiefGeïnvesteerd = 0;
    let investeringsPeriode = 0;
    
    for (let maand = 0; maand <= dcaData.investeringsPeriode; maand += investeringsFrequentie) {
      if (maand === 0) continue; // Start vanaf maand 1
      
      const marktPunt = marktData[Math.min(maand, marktData.length - 1)];
      const nettoInvestering = dcaData.maandelijkseBijdrage * investeringsFrequentie - dcaData.transactiekosten;
      const aandelenGekocht = nettoInvestering / marktPunt.koers;
      
      cumulatiefAandelen += aandelenGekocht;
      cumulatiefGeïnvesteerd += dcaData.maandelijkseBijdrage * investeringsFrequentie;
      
      const portfolioWaarde = cumulatiefAandelen * marktPunt.koers;
      const rendement = ((portfolioWaarde - cumulatiefGeïnvesteerd) / cumulatiefGeïnvesteerd) * 100;
      
      dcaInvesteringen.push({
        periode: investeringsPeriode++,
        datum: marktPunt.datum,
        investering: dcaData.maandelijkseBijdrage * investeringsFrequentie,
        koers: marktPunt.koers,
        aandelenGekocht,
        cumulatiefAandelen,
        cumulatiefGeïnvesteerd,
        portfolioWaarde,
        rendement
      });
    }
    
    return dcaInvesteringen;
  };

  // Calculate Lump Sum performance
  const berekenLumpSumPerformance = () => {
    const startKoers = marktData[0].koers;
    const eindKoers = marktData[marktData.length - 1].koers;
    const nettoInvestering = dcaData.lumpSumBedrag - dcaData.transactiekosten;
    const aandelen = nettoInvestering / startKoers;
    const eindWaarde = aandelen * eindKoers;
    const rendement = ((eindWaarde - dcaData.lumpSumBedrag) / dcaData.lumpSumBedrag) * 100;
    
    return {
      investeringsBedrag: dcaData.lumpSumBedrag,
      aantalAandelen: aandelen,
      eindWaarde,
      rendement,
      startKoers,
      eindKoers
    };
  };

  const dcaPerformance = berekenDCAPerformance();
  const lumpSumPerformance = berekenLumpSumPerformance();

  // Statistical analysis
  const berekenStatistieken = () => {
    const dcaEindWaarde = dcaPerformance.length > 0 ? dcaPerformance[dcaPerformance.length - 1].portfolioWaarde : 0;
    const dcaRendement = dcaPerformance.length > 0 ? dcaPerformance[dcaPerformance.length - 1].rendement : 0;
    const dcaTotaalGeïnvesteerd = dcaPerformance.length > 0 ? dcaPerformance[dcaPerformance.length - 1].cumulatiefGeïnvesteerd : 0;
    
    // Volatility measures
    const dcaRendementen = dcaPerformance.map(inv => inv.rendement);
    const dcaGemiddeldeRendement = dcaRendementen.reduce((sum, r) => sum + r, 0) / dcaRendementen.length;
    const dcaVolatiliteit = Math.sqrt(
      dcaRendementen.reduce((sum, r) => sum + Math.pow(r - dcaGemiddeldeRendement, 2), 0) / dcaRendementen.length
    );
    
    // Average purchase price for DCA
    const dcaGemiddeldeKoers = dcaTotaalGeïnvesteerd / (dcaPerformance.length > 0 ? dcaPerformance[dcaPerformance.length - 1].cumulatiefAandelen : 1);
    
    // Cost basis comparison
    const kostenVerschil = dcaGemiddeldeKoers - lumpSumPerformance.startKoers;
    const kostenVerschilPercentage = (kostenVerschil / lumpSumPerformance.startKoers) * 100;
    
    return {
      dcaEindWaarde,
      dcaRendement,
      dcaTotaalGeïnvesteerd,
      dcaVolatiliteit,
      dcaGemiddeldeKoers,
      kostenVerschil,
      kostenVerschilPercentage,
      verschilEindWaarde: dcaEindWaarde - lumpSumPerformance.eindWaarde,
      verschilRendement: dcaRendement - lumpSumPerformance.rendement
    };
  };

  const statistieken = berekenStatistieken();

  // Generate comparison chart data
  const vergelijkingsData = marktData.map((markt, index) => {
    const dcaInvestering = dcaPerformance.find(inv => inv.datum <= markt.datum);
    const lumpSumWaarde = (lumpSumPerformance.aantalAandelen * markt.koers);
    
    return {
      maand: index,
      datum: markt.datum,
      koers: markt.koers,
      dcaWaarde: dcaInvestering ? dcaInvestering.portfolioWaarde : 0,
      lumpSumWaarde: index === 0 ? dcaData.lumpSumBedrag : lumpSumWaarde,
      dcaGeïnvesteerd: dcaInvestering ? dcaInvestering.cumulatiefGeïnvesteerd : 0
    };
  });

  // Risk analysis scenarios
  const risicoScenarios = [
    {
      scenario: "Bull Market",
      beschrijving: "Sterk stijgende markt (+15% jaar)",
      dcaVoordeel: "Minder voordelig - mist vroege stijgingen",
      lumpSumVoordeel: "Meer voordelig - profiteert volledig van stijging"
    },
    {
      scenario: "Bear Market", 
      beschrijving: "Dalende markt (-20% dan herstel)",
      dcaVoordeel: "Meer voordelig - koopt meer bij lage prijzen",
      lumpSumVoordeel: "Minder voordelig - hoge initial cost basis"
    },
    {
      scenario: "Volatiele Markt",
      beschrijving: "Hoge volatiliteit rond trend",
      dcaVoordeel: "Voordelig - volatility smoothing effect",
      lumpSumVoordeel: "Afhankelijk van timing"
    },
    {
      scenario: "Zijwaartse Markt",
      beschrijving: "Geen duidelijke trend",
      dcaVoordeel: "Neutraal tot licht voordelig",
      lumpSumVoordeel: "Neutraal"
    }
  ];

  // Behavioral finance insights
  const gedragsInzichten = [
    {
      aspect: "Discipline & Automatisering",
      voordeel: "DCA dwingt consistente investeringsgewoonten af",
      tip: "Automatiseer DCA om emotionele beslissingen te vermijden"
    },
    {
      aspect: "Market Timing Eliminatie", 
      voordeel: "Voorkomt pogingen om 'de markt te timen'",
      tip: "Historisch presteren weinig investeerders beter dan markt timing"
    },
    {
      aspect: "Emotionele Stress Reductie",
      voordeel: "Minder stress door geleidelijke marktdeelname",
      tip: "Vooral waardevol voor beginnende beleggers"
    },
    {
      aspect: "Flexibiliteit",
      voordeel: "Gemakkelijk aanpassen van bedragen en frequentie",
      tip: "Verhoog DCA bedrag bij inkomensstijging"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header activeCalculator="dollar-cost-averaging-calculator" onCalculatorChange={() => {}} />
      
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Dollar Cost Averaging Calculator
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Ontdek de voordelen van periodiek beleggen versus lump sum investeren. 
              Simuleer verschillende strategieën en analyseer het effect van marktvolatiliteit.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Periodiek Beleggen
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Volatiliteit Analyse
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Market Timing
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
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Input Form */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* DCA Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-calendar-alt mr-3 text-primary"></i>
                  DCA Instellingen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="maandelijkseBijdrage">Periodieke bijdrage (€)</Label>
                  <Input
                    id="maandelijkseBijdrage"
                    type="number"
                    value={dcaData.maandelijkseBijdrage}
                    onChange={(e) => setDcaData({...dcaData, maandelijkseBijdrage: Number(e.target.value), lumpSumBedrag: Number(e.target.value) * dcaData.investeringsPeriode})}
                    data-testid="input-maandelijkse-bijdrage"
                  />
                </div>

                <div>
                  <Label htmlFor="frequentie">Investerings frequentie</Label>
                  <Select value={dcaData.frequentie} onValueChange={(value) => setDcaData({...dcaData, frequentie: value})}>
                    <SelectTrigger data-testid="select-frequentie">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maandelijks">Maandelijks</SelectItem>
                      <SelectItem value="kwartaal">Per kwartaal</SelectItem>
                      <SelectItem value="halfjaarlijks">Halfjaarlijks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="investeringsPeriode">Investerings periode (maanden)</Label>
                  <Input
                    id="investeringsPeriode"
                    type="number"
                    value={dcaData.investeringsPeriode}
                    onChange={(e) => setDcaData({...dcaData, investeringsPeriode: Number(e.target.value), lumpSumBedrag: dcaData.maandelijkseBijdrage * Number(e.target.value)})}
                    data-testid="input-investerings-periode"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Totaal DCA: €{(dcaData.maandelijkseBijdrage * dcaData.investeringsPeriode).toLocaleString()}
                  </p>
                </div>

                <div>
                  <Label htmlFor="transactiekosten">Transactiekosten per order (€)</Label>
                  <Input
                    id="transactiekosten"
                    type="number"
                    step="0.01"
                    value={dcaData.transactiekosten}
                    onChange={(e) => setDcaData({...dcaData, transactiekosten: Number(e.target.value)})}
                    data-testid="input-transactiekosten"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Market Assumptions */}
            <Card>
              <CardHeader>
                <CardTitle>Markt Aannames</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="startKoers">Start koers (€)</Label>
                  <Input
                    id="startKoers"
                    type="number"
                    step="0.01"
                    value={dcaData.startKoers}
                    onChange={(e) => setDcaData({...dcaData, startKoers: Number(e.target.value)})}
                    data-testid="input-start-koers"
                  />
                </div>

                <div>
                  <Label htmlFor="gemiddeldeRendement">Verwacht jaarrendement (%)</Label>
                  <Input
                    id="gemiddeldeRendement"
                    type="number"
                    step="0.1"
                    value={dcaData.gemiddeldeRendement}
                    onChange={(e) => setDcaData({...dcaData, gemiddeldeRendement: Number(e.target.value)})}
                    data-testid="input-gemiddelde-rendement"
                  />
                </div>

                <div>
                  <Label htmlFor="volatiliteit">Marktvolatiliteit (%)</Label>
                  <Input
                    id="volatiliteit"
                    type="number"
                    step="0.1"
                    value={dcaData.volatiliteit}
                    onChange={(e) => setDcaData({...dcaData, volatiliteit: Number(e.target.value)})}
                    data-testid="input-volatiliteit"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Typisch 15-25% voor aandelen ETF's
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Lump Sum Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Lump Sum Vergelijking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="lumpSumBedrag">Lump sum bedrag (€)</Label>
                  <Input
                    id="lumpSumBedrag"
                    type="number"
                    value={dcaData.lumpSumBedrag}
                    onChange={(e) => setDcaData({...dcaData, lumpSumBedrag: Number(e.target.value)})}
                    data-testid="input-lump-sum-bedrag"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Equivalent aan totale DCA investering
                  </p>
                </div>

                <div className="bg-muted p-3 rounded">
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span>DCA totaal:</span>
                      <span>€{(dcaData.maandelijkseBijdrage * dcaData.investeringsPeriode).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lump sum:</span>
                      <span>€{dcaData.lumpSumBedrag.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Performance Comparison */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">DCA Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600" data-testid="text-dca-eindwaarde">
                    €{Math.round(statistieken.dcaEindWaarde).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Eindwaarde</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Rendement:</span>
                      <span className={statistieken.dcaRendement >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {statistieken.dcaRendement.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gem. koers:</span>
                      <span>€{statistieken.dcaGemiddeldeKoers.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lump Sum Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600" data-testid="text-lump-sum-eindwaarde">
                    €{Math.round(lumpSumPerformance.eindWaarde).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Eindwaarde</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Rendement:</span>
                      <span className={lumpSumPerformance.rendement >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {lumpSumPerformance.rendement.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Start koers:</span>
                      <span>€{lumpSumPerformance.startKoers.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Verschil Analyse</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${statistieken.verschilEindWaarde >= 0 ? 'text-green-600' : 'text-red-600'}`} data-testid="text-verschil-eindwaarde">
                    {statistieken.verschilEindWaarde >= 0 ? '+' : ''}€{Math.round(statistieken.verschilEindWaarde).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">DCA vs Lump Sum</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Rendement verschil:</span>
                      <span className={statistieken.verschilRendement >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {statistieken.verschilRendement >= 0 ? '+' : ''}{statistieken.verschilRendement.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Winnende strategie:</span>
                      <span className="font-semibold">
                        {statistieken.verschilEindWaarde >= 0 ? 'DCA' : 'Lump Sum'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Waarde Vergelijking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={vergelijkingsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="maand" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number, name: string) => [
                          `€${Math.round(value).toLocaleString()}`,
                          name === 'dcaWaarde' ? 'DCA Portfolio' : 
                          name === 'lumpSumWaarde' ? 'Lump Sum Portfolio' :
                          name === 'dcaGeïnvesteerd' ? 'DCA Geïnvesteerd' : name
                        ]}
                        labelFormatter={(label) => `Maand ${label}`}
                      />
                      <Area type="monotone" dataKey="dcaGeïnvesteerd" fill="#e0e7ff" stroke="#6366f1" strokeWidth={1} fillOpacity={0.3} />
                      <Line type="monotone" dataKey="dcaWaarde" stroke="#3b82f6" strokeWidth={2} name="DCA Portfolio" />
                      <Line type="monotone" dataKey="lumpSumWaarde" stroke="#8b5cf6" strokeWidth={2} name="Lump Sum Portfolio" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Analysis */}
            <Tabs defaultValue="timing" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="timing">Market Timing</TabsTrigger>
                <TabsTrigger value="scenarios">Scenario Analyse</TabsTrigger>
                <TabsTrigger value="gedrag">Gedragsfinance</TabsTrigger>
                <TabsTrigger value="details">Investering Details</TabsTrigger>
              </TabsList>

              <TabsContent value="timing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Market Timing vs DCA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Alert>
                        <AlertDescription>
                          📊 <strong>Timing de Markt:</strong> Historisch gezien missen zelfs professionele beleggers 
                          vaak de beste dagen. DCA elimineert timing risico volledig.
                        </AlertDescription>
                      </Alert>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                          <h4 className="font-semibold text-green-800 dark:text-green-200">DCA Voordelen</h4>
                          <ul className="text-sm mt-2 space-y-1">
                            <li>• Geen timing vereist</li>
                            <li>• Vermindert impact volatiliteit</li>
                            <li>• Disciplineert investeringsgedrag</li>
                            <li>• Geschikt voor alle marktcondities</li>
                          </ul>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded">
                          <h4 className="font-semibold text-orange-800 dark:text-orange-200">Lump Sum Voordelen</h4>
                          <ul className="text-sm mt-2 space-y-1">
                            <li>• Meer tijd in de markt</li>
                            <li>• Lagere transactiekosten</li>
                            <li>• Profiteert van bull markets</li>
                            <li>• Eenvoudigere uitvoering</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Historische Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <strong>Onderzoek toont aan:</strong>
                      </div>
                      <ul className="text-sm space-y-2">
                        <li>• Lump sum wint in ~67% van gevallen (lange termijn)</li>
                        <li>• DCA wint tijdens volatiele periodes</li>
                        <li>• Verschil is vaak marginaal (&lt;2% jaar)</li>
                        <li>• DCA biedt emotionele voordelen en discipline</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scenarios" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Markt Scenario Analyse</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {risicoScenarios.map((scenario, index) => (
                        <div key={index} className="border rounded p-4">
                          <h4 className="font-semibold">{scenario.scenario}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{scenario.beschrijving}</p>
                          <div className="grid md:grid-cols-2 gap-3 mt-3">
                            <div>
                              <span className="text-xs font-medium text-blue-600">DCA Strategie:</span>
                              <p className="text-sm">{scenario.dcaVoordeel}</p>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-purple-600">Lump Sum Strategie:</span>
                              <p className="text-sm">{scenario.lumpSumVoordeel}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gedrag" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Gedragsfinance Aspecten</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {gedragsInzichten.map((inzicht, index) => (
                        <div key={index} className="border rounded p-4">
                          <h4 className="font-semibold">{inzicht.aspect}</h4>
                          <p className="text-sm mt-2">{inzicht.voordeel}</p>
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded mt-2">
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                              💡 <strong>Tip:</strong> {inzicht.tip}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Psychologische Overwegingen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Alert>
                        <AlertDescription>
                          🧠 <strong>Loss Aversion:</strong> Mensen voelen verliezen 2x sterker dan winsten. 
                          DCA vermindert de impact van tijdelijke verliezen.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          📈 <strong>Regret Avoidance:</strong> DCA voorkomt spijt over "slechte timing" 
                          door investering te spreiden over tijd.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          🎯 <strong>Analysis Paralysis:</strong> Perfecte timing is onmogelijk. 
                          DCA maakt het gemakkelijker om te beginnen met beleggen.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>DCA Investering Overzicht</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Periode</th>
                            <th className="text-right p-2">Investering</th>
                            <th className="text-right p-2">Koers</th>
                            <th className="text-right p-2">Aandelen</th>
                            <th className="text-right p-2">Totaal Aandelen</th>
                            <th className="text-right p-2">Portfolio Waarde</th>
                            <th className="text-right p-2">Rendement</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dcaPerformance.slice(0, 10).map((investering, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2">{investering.periode + 1}</td>
                              <td className="p-2 text-right">€{investering.investering.toLocaleString()}</td>
                              <td className="p-2 text-right">€{investering.koers.toFixed(2)}</td>
                              <td className="p-2 text-right">{investering.aandelenGekocht.toFixed(2)}</td>
                              <td className="p-2 text-right">{investering.cumulatiefAandelen.toFixed(2)}</td>
                              <td className="p-2 text-right">€{Math.round(investering.portfolioWaarde).toLocaleString()}</td>
                              <td className={`p-2 text-right ${investering.rendement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {investering.rendement.toFixed(1)}%
                              </td>
                            </tr>
                          ))}
                          {dcaPerformance.length > 10 && (
                            <tr>
                              <td colSpan={7} className="p-2 text-center text-muted-foreground">
                                ... en {dcaPerformance.length - 10} meer periodes
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Mid Ad */}
            <GoogleAdsense slot="rectangle" />
          </div>
        </div>
      </section>

      {/* Rate Comparison Widget */}
      <RateComparisonWidget productType="dca-belegging" title="Vergelijk DCA Beleggingsplatforms" />

      {/* Bottom Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GoogleAdsense slot="banner" className="w-full max-w-4xl mx-auto" />
      </section>

      <Footer />
    </div>
  );
}