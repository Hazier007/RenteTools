import { useState, lazy, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartSkeleton } from "@/components/ui/chart-skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BelastingplanningInvestmentChart = lazy(() => import("./belastingplanning-investment-chart"));
const BelastingplanningTimelineChart = lazy(() => import("./belastingplanning-timeline-chart"));

interface TaxOptimization {
  currentTaxBurden: number;
  optimizedTaxBurden: number;
  annualSavings: number;
  tenYearSavings: number;
  strategies: Array<{
    strategy: string;
    description: string;
    annualSavings: number;
    effort: 'laag' | 'gemiddeld' | 'hoog';
    category: string;
  }>;
  investmentComparison: Array<{
    vehicle: string;
    grossReturn: number;
    taxCost: number;
    netReturn: number;
    afterTaxValue: number;
  }>;
  timeline: Array<{
    year: number;
    currentScenario: number;
    optimizedScenario: number;
    cumulativeSavings: number;
  }>;
  recommendations: string[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function BelastingplanningCalculator() {
  // Personal situation
  const [inkomen, setInkomen] = useState<number>(60000);
  const [burgerlijkeStaat, setBurgerlijkeStaat] = useState<string>("alleenstaand");
  const [kinderen, setKinderen] = useState<number>(0);
  const [leeftijd, setLeeftijd] = useState<number>(35);
  
  // Investment portfolio
  const [spaarrekening, setSpaarrekening] = useState<number>(25000);
  const [aandelenPortfolio, setAandelenPortfolio] = useState<number>(50000);
  const [obligaties, setObligaties] = useState<number>(20000);
  const [pensioensparen, setPensioensparen] = useState<number>(1000);
  
  // Investment income
  const [dividenden, setDividenden] = useState<number>(1500);
  const [interest, setInterest] = useState<number>(800);
  const [kapitaalwinsten, setKapitaalwinsten] = useState<number>(3000);
  
  // Tax planning preferences
  const [risicoTolerantie, setRisicoTolerantie] = useState<string>("gemiddeld");
  const [beleggingsHorizon, setBeleggingsHorizon] = useState<number>(15);
  const [huidigeStrategieën, setHuidigeStrategieën] = useState<string[]>([]);
  
  const [result, setResult] = useState<TaxOptimization | null>(null);

  const calculateTaxOptimization = () => {
    // Calculate current tax burden
    const roerendeVoorheffing = dividenden * 0.30 + interest * 0.30;
    const spaarrekeningBelasting = Math.max(0, (spaarrekening * 0.025 - getSpaarVrijstelling(burgerlijkeStaat)) * 0.30);
    const currentTaxBurden = roerendeVoorheffing + spaarrekeningBelasting;
    
    // Calculate optimization strategies
    const strategies = [];
    let totalOptimization = 0;
    
    // Strategy 1: Pensioensparen maximaliseren
    const maxPensioensparen = 1310;
    const pensioenOptimization = Math.max(0, (maxPensioensparen - pensioensparen) * 0.30);
    if (pensioenOptimization > 0) {
      strategies.push({
        strategy: "Pensioensparen Maximaliseren",
        description: `Verhoog pensioensparen tot €${maxPensioensparen}/jaar voor 30% belastingvoordeel`,
        annualSavings: pensioenOptimization,
        effort: 'laag' as const,
        category: "Pensioen"
      });
      totalOptimization += pensioenOptimization;
    }
    
    // Strategy 2: ETFs vs individuele aandelen
    const etfOptimization = dividenden * 0.30 * 0.7; // 70% reduction through accumulating ETFs
    if (aandelenPortfolio > 10000) {
      strategies.push({
        strategy: "Kapitaliserende ETFs",
        description: "Vervang dividend aandelen door kapitaliserende ETFs voor uitgestelde belasting",
        annualSavings: etfOptimization,
        effort: 'gemiddeld' as const,
        category: "Beleggen"
      });
      totalOptimization += etfOptimization;
    }
    
    // Strategy 3: Spaarrekening optimalisatie
    const excessSavings = Math.max(0, spaarrekening - 30000); // Keep emergency fund
    const spaarOptimization = excessSavings * 0.025 * 0.30;
    if (spaarOptimization > 0) {
      strategies.push({
        strategy: "Spaarrekening Optimalisatie",
        description: "Verplaats overtollige spaargelden naar belastingefficiënte beleggingen",
        annualSavings: spaarOptimization,
        effort: 'gemiddeld' as const,
        category: "Sparen"
      });
      totalOptimization += spaarOptimization;
    }
    
    // Strategy 4: Tax-loss harvesting
    const taxLossOptimization = kapitaalwinsten * 0.15; // Potential 15% savings through strategic timing
    if (kapitaalwinsten > 1000) {
      strategies.push({
        strategy: "Tax-Loss Harvesting",
        description: "Strategisch realiseren van verliezen om winsten te compenseren",
        annualSavings: taxLossOptimization,
        effort: 'hoog' as const,
        category: "Strategisch"
      });
      totalOptimization += taxLossOptimization;
    }
    
    // Strategy 5: Termijnrekening vs spaarrekening
    const termijnOptimization = Math.min(spaarrekening * 0.5, 25000) * 0.01 * 0.30;
    strategies.push({
      strategy: "Termijnrekening Strategie",
      description: "Gebruik termijnrekeningen voor hogere rente met gelijke belastingvrijstelling",
      annualSavings: termijnOptimization,
      effort: 'laag' as const,
      category: "Sparen"
    });
    totalOptimization += termijnOptimization;
    
    // Strategy 6: Familiale splitsing (if applicable)
    let familialeOptimization = 0;
    if (burgerlijkeStaat === "gehuwd" && dividenden + interest > 2000) {
      familialeOptimization = Math.min(dividenden + interest, 4000) * 0.30 * 0.5;
      strategies.push({
        strategy: "Familiale Splitsing",
        description: "Verdeel investeringen over partners voor dubbele vrijstelling",
        annualSavings: familialeOptimization,
        effort: 'gemiddeld' as const,
        category: "Structureel"
      });
      totalOptimization += familialeOptimization;
    }
    
    const optimizedTaxBurden = currentTaxBurden - totalOptimization;
    const annualSavings = totalOptimization;
    const tenYearSavings = annualSavings * 10 * 1.05; // Including compound effect
    
    // Investment vehicle comparison
    const investmentComparison = [
      {
        vehicle: "Spaarrekening",
        grossReturn: 2.5,
        taxCost: 0.75,
        netReturn: 1.75,
        afterTaxValue: 10000 * Math.pow(1.0175, 10)
      },
      {
        vehicle: "Dividend Aandelen",
        grossReturn: 6.0,
        taxCost: 1.8,
        netReturn: 4.2,
        afterTaxValue: 10000 * Math.pow(1.042, 10)
      },
      {
        vehicle: "Kapitaliserende ETFs",
        grossReturn: 6.0,
        taxCost: 0,
        netReturn: 6.0,
        afterTaxValue: 10000 * Math.pow(1.06, 10)
      },
      {
        vehicle: "Obligaties",
        grossReturn: 3.5,
        taxCost: 1.05,
        netReturn: 2.45,
        afterTaxValue: 10000 * Math.pow(1.0245, 10)
      },
      {
        vehicle: "Pensioensparen",
        grossReturn: 4.0,
        taxCost: -1.2, // Tax benefit
        netReturn: 5.2,
        afterTaxValue: 10000 * Math.pow(1.052, 10)
      }
    ];
    
    // Generate timeline projection
    const timeline = [];
    let cumulativeSavings = 0;
    for (let year = 1; year <= 20; year++) {
      cumulativeSavings += annualSavings;
      timeline.push({
        year,
        currentScenario: currentTaxBurden * year,
        optimizedScenario: optimizedTaxBurden * year,
        cumulativeSavings: cumulativeSavings * Math.pow(1.04, year - 1) // 4% investment return
      });
    }
    
    // Generate recommendations
    const recommendations = [];
    
    if (pensioensparen < maxPensioensparen) {
      recommendations.push("💰 Maximaliseer uw pensioensparen voor directe 30% belastingvoordeel - dit is gegarandeerd rendement!");
    }
    
    if (aandelenPortfolio > 20000 && dividenden > 1000) {
      recommendations.push("📈 Overweeg kapitaliserende ETFs in plaats van dividend aandelen voor belastinguitstell.");
    }
    
    if (spaarrekening > 30000) {
      recommendations.push("🏦 Uw spaarrekening is hoog - overweeg beleggingen voor betere belastingefficiëntie.");
    }
    
    if (burgerlijkeStaat === "gehuwd") {
      recommendations.push("👫 Benut de dubbele spaarbonus door investeringen te spreiden over beide partners.");
    }
    
    if (leeftijd < 40 && beleggingsHorizon > 10) {
      recommendations.push("⏰ Jonge leeftijd + lange horizon: maximaal inzetten op groei met belastingefficiënte ETFs.");
    }
    
    if (strategies.length > 5) {
      recommendations.push("🎯 Focus op de top 3 strategieën eerst - te veel gelijktijdige veranderingen kunnen overweldigend zijn.");
    }
    
    setResult({
      currentTaxBurden,
      optimizedTaxBurden,
      annualSavings,
      tenYearSavings,
      strategies: strategies.sort((a, b) => b.annualSavings - a.annualSavings),
      investmentComparison,
      timeline,
      recommendations
    });
  };

  const getSpaarVrijstelling = (status: string): number => {
    switch (status) {
      case "alleenstaand": return 2290;
      case "gehuwd": return 4580;
      case "samenwonend": return 2290;
      default: return 2290;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-BE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'laag': return 'text-green-600 bg-green-50 dark:bg-green-950';
      case 'gemiddeld': return 'text-orange-600 bg-orange-50 dark:bg-orange-950';
      case 'hoog': return 'text-red-600 bg-red-50 dark:bg-red-950';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Pensioen': return 'text-blue-600';
      case 'Beleggen': return 'text-green-600';
      case 'Sparen': return 'text-purple-600';
      case 'Strategisch': return 'text-orange-600';
      case 'Structureel': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Tabs defaultValue="situatie" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="situatie" data-testid="tab-situatie">Persoonlijke Situatie</TabsTrigger>
          <TabsTrigger value="portfolio" data-testid="tab-portfolio">Investment Portfolio</TabsTrigger>
          <TabsTrigger value="strategieën" data-testid="tab-strategieën">Tax Strategieën</TabsTrigger>
          <TabsTrigger value="analyse" data-testid="tab-analyse">Analyse & Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="situatie" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-user mr-3 text-primary"></i>
                Persoonlijke & Fiscale Situatie
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="inkomen">Jaarlijks Bruto Inkomen (€)</Label>
                  <Input
                    id="inkomen"
                    data-testid="input-inkomen"
                    type="number"
                    value={inkomen}
                    onChange={(e) => setInkomen(Number(e.target.value))}
                    step="1000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="burgerlijke-staat">Burgerlijke Staat</Label>
                  <Select value={burgerlijkeStaat} onValueChange={setBurgerlijkeStaat}>
                    <SelectTrigger data-testid="select-burgerlijke-staat">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alleenstaand">Alleenstaand</SelectItem>
                      <SelectItem value="gehuwd">Gehuwd</SelectItem>
                      <SelectItem value="samenwonend">Samenwonend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="kinderen">Aantal Kinderen ten Laste</Label>
                  <Input
                    id="kinderen"
                    data-testid="input-kinderen"
                    type="number"
                    value={kinderen}
                    onChange={(e) => setKinderen(Number(e.target.value))}
                    min="0"
                    max="10"
                  />
                </div>
                
                <div>
                  <Label htmlFor="leeftijd">Leeftijd</Label>
                  <Input
                    id="leeftijd"
                    data-testid="input-leeftijd"
                    type="number"
                    value={leeftijd}
                    onChange={(e) => setLeeftijd(Number(e.target.value))}
                    min="18"
                    max="75"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="risico-tolerantie">Risico Tolerantie</Label>
                  <Select value={risicoTolerantie} onValueChange={setRisicoTolerantie}>
                    <SelectTrigger data-testid="select-risico-tolerantie">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="laag">Laag (Conservatief)</SelectItem>
                      <SelectItem value="gemiddeld">Gemiddeld (Uitgebalanceerd)</SelectItem>
                      <SelectItem value="hoog">Hoog (Agressief)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="beleggings-horizon">Beleggingshorizon (jaren)</Label>
                  <Input
                    id="beleggings-horizon"
                    data-testid="input-beleggings-horizon"
                    type="number"
                    value={beleggingsHorizon}
                    onChange={(e) => setBeleggingsHorizon(Number(e.target.value))}
                    min="1"
                    max="40"
                  />
                </div>
                
                <div>
                  <Label htmlFor="pensioensparen">Huidig Pensioensparen per jaar (€)</Label>
                  <Input
                    id="pensioensparen"
                    data-testid="input-pensioensparen"
                    type="number"
                    value={pensioensparen}
                    onChange={(e) => setPensioensparen(Number(e.target.value))}
                    max="1310"
                    step="10"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum: €1.310/jaar voor 30% belastingvoordeel
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 dark:bg-blue-950">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600" data-testid="text-spaar-vrijstelling">
                    {formatCurrency(getSpaarVrijstelling(burgerlijkeStaat))}
                  </div>
                  <p className="text-sm text-muted-foreground">Spaarbonus Vrijstelling</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600" data-testid="text-pensioen-voordeel">
                    {formatCurrency((1310 - pensioensparen) * 0.30)}
                  </div>
                  <p className="text-sm text-muted-foreground">Pensioen Belastingvoordeel Mogelijk</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600" data-testid="text-beleggings-horizon">
                    {beleggingsHorizon} jaar
                  </div>
                  <p className="text-sm text-muted-foreground">Optimale Beleggingshorizon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-chart-pie mr-3 text-green-600"></i>
                Huidig Investment Portfolio
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-600">💰 Assets & Holdings</h4>
                
                <div>
                  <Label htmlFor="spaarrekening">Spaarrekening Saldo (€)</Label>
                  <Input
                    id="spaarrekening"
                    data-testid="input-spaarrekening"
                    type="number"
                    value={spaarrekening}
                    onChange={(e) => setSpaarrekening(Number(e.target.value))}
                    step="1000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="aandelen-portfolio">Aandelen Portfolio (€)</Label>
                  <Input
                    id="aandelen-portfolio"
                    data-testid="input-aandelen-portfolio"
                    type="number"
                    value={aandelenPortfolio}
                    onChange={(e) => setAandelenPortfolio(Number(e.target.value))}
                    step="1000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="obligaties">Obligaties & Staatsbons (€)</Label>
                  <Input
                    id="obligaties"
                    data-testid="input-obligaties"
                    type="number"
                    value={obligaties}
                    onChange={(e) => setObligaties(Number(e.target.value))}
                    step="1000"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-green-600">📊 Jaarlijkse Investment Income</h4>
                
                <div>
                  <Label htmlFor="dividenden">Dividend Inkomsten (€)</Label>
                  <Input
                    id="dividenden"
                    data-testid="input-dividenden"
                    type="number"
                    value={dividenden}
                    onChange={(e) => setDividenden(Number(e.target.value))}
                    step="100"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    30% roerende voorheffing = {formatCurrency(dividenden * 0.30)}
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="interest">Interest Inkomsten (€)</Label>
                  <Input
                    id="interest"
                    data-testid="input-interest"
                    type="number"
                    value={interest}
                    onChange={(e) => setInterest(Number(e.target.value))}
                    step="100"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    30% roerende voorheffing = {formatCurrency(interest * 0.30)}
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="kapitaalwinsten">Gerealiseerde Kapitaalwinsten (€)</Label>
                  <Input
                    id="kapitaalwinsten"
                    data-testid="input-kapitaalwinsten"
                    type="number"
                    value={kapitaalwinsten}
                    onChange={(e) => setKapitaalwinsten(Number(e.target.value))}
                    step="100"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Normaal belastingvrij voor particulieren
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Allocatie Visualisatie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Asset Verdeling</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Spaarrekening</span>
                      <span className="font-semibold">{formatCurrency(spaarrekening)}</span>
                    </div>
                    <Progress value={(spaarrekening / (spaarrekening + aandelenPortfolio + obligaties)) * 100} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Aandelen</span>
                      <span className="font-semibold">{formatCurrency(aandelenPortfolio)}</span>
                    </div>
                    <Progress value={(aandelenPortfolio / (spaarrekening + aandelenPortfolio + obligaties)) * 100} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Obligaties</span>
                      <span className="font-semibold">{formatCurrency(obligaties)}</span>
                    </div>
                    <Progress value={(obligaties / (spaarrekening + aandelenPortfolio + obligaties)) * 100} className="h-2" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Belastbare Income</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-sm">Dividenden (30% belast)</span>
                        <span className="font-semibold text-red-600">{formatCurrency(dividenden)}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-sm">Interest (30% belast)</span>
                        <span className="font-semibold text-orange-600">{formatCurrency(interest)}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-sm">Kapitaalwinst (vrij)</span>
                        <span className="font-semibold text-green-600">{formatCurrency(kapitaalwinsten)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategieën" className="space-y-6">
          <div className="flex justify-center mb-6">
            <Button 
              onClick={calculateTaxOptimization} 
              size="lg" 
              className="px-12"
              data-testid="button-bereken-optimalisatie"
            >
              <i className="fas fa-calculator mr-2"></i>
              Bereken Belasting Optimalisatie
            </Button>
          </div>

          {result && (
            <>
              <div className="grid md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600" data-testid="text-huidige-belasting">
                        {formatCurrency(result.currentTaxBurden)}
                      </div>
                      <p className="text-muted-foreground">Huidige Belastingdruk</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600" data-testid="text-geoptimaliseerde-belasting">
                        {formatCurrency(result.optimizedTaxBurden)}
                      </div>
                      <p className="text-muted-foreground">Geoptimaliseerd</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600" data-testid="text-jaarlijkse-besparing">
                        {formatCurrency(result.annualSavings)}
                      </div>
                      <p className="text-muted-foreground">Jaarlijkse Besparing</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600" data-testid="text-tien-jaar-besparing">
                        {formatCurrency(result.tenYearSavings)}
                      </div>
                      <p className="text-muted-foreground">10-Jaar Waarde</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Aanbevolen Tax Strategieën</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.strategies.map((strategy, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mr-3 font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold">{strategy.strategy}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{strategy.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">{formatCurrency(strategy.annualSavings)}/jaar</div>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={getEffortColor(strategy.effort)}>
                                {strategy.effort} effort
                              </Badge>
                              <Badge variant="outline" className={getCategoryColor(strategy.category)}>
                                {strategy.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Investment Vehicles Vergelijking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: 400 }}>
                    <Suspense fallback={<ChartSkeleton />}>
                      <BelastingplanningInvestmentChart data={result.investmentComparison} />
                    </Suspense>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!result && (
            <Card>
              <CardContent className="py-12 text-center">
                <i className="fas fa-calculator text-4xl text-muted-foreground mb-4"></i>
                <p className="text-lg text-muted-foreground">
                  Klik op "Bereken Belasting Optimalisatie" om uw strategieën te zien.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analyse" className="space-y-6">
          {result && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-lightbulb mr-3 text-yellow-600"></i>
                    Persoonlijke Aanbevelingen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.recommendations.map((recommendation, index) => (
                      <Alert key={index}>
                        <i className="fas fa-info-circle"></i>
                        <AlertDescription>{recommendation}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {result.timeline.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Cumulatieve Besparingen Over Tijd</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div style={{ height: 400 }}>
                      <Suspense fallback={<ChartSkeleton />}>
                        <BelastingplanningTimelineChart data={result.timeline.slice(0, 15)} />
                      </Suspense>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Belgische Belasting Gids</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-red-600">❌ Belastbare Inkomsten</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <i className="fas fa-percentage text-red-600 mr-2 mt-1"></i>
                          <span><strong>Dividenden:</strong> 30% roerende voorheffing</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-coins text-red-600 mr-2 mt-1"></i>
                          <span><strong>Interest:</strong> 30% roerende voorheffing boven vrijstelling</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-home text-red-600 mr-2 mt-1"></i>
                          <span><strong>Huurinkomsten:</strong> Progressieve belasting of 25% forfait</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-chart-bar text-red-600 mr-2 mt-1"></i>
                          <span><strong>Speculatie:</strong> 33% belasting op korte termijn handel</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-green-600">✅ Belastingvrije Inkomsten</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <i className="fas fa-chart-line text-green-600 mr-2 mt-1"></i>
                          <span><strong>Meerwaarden:</strong> Belastingvrij voor particuliere beleggers</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-piggy-bank text-green-600 mr-2 mt-1"></i>
                          <span><strong>Spaarbonus:</strong> €2.290 (alleenstaand) / €4.580 (gehuwd)</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-umbrella text-green-600 mr-2 mt-1"></i>
                          <span><strong>Pensioensparen:</strong> 30% belastingvermindering tot €1.310</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-building text-green-600 mr-2 mt-1"></i>
                          <span><strong>Kapitaliserende ETFs:</strong> Geen tussentijdse belasting</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Implementatie Roadmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                        📅 Korte Termijn (1-3 maanden)
                      </h4>
                      <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                        <li>• Verhoog pensioensparen naar maximum €1.310/jaar</li>
                        <li>• Open termijnrekening voor overtollige spaargelden</li>
                        <li>• Evalueer dividend aandelen vs kapitaliserende ETFs</li>
                        <li>• Controleer spaarbonus optimalisatie</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        📈 Middellange Termijn (3-12 maanden)
                      </h4>
                      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                        <li>• Implementeer ETF strategie voor belastingefficiëntie</li>
                        <li>• Optimaliseer asset allocatie over gezinsleden</li>
                        <li>• Stel tax-loss harvesting systeem op</li>
                        <li>• Herbalanceer portfolio voor optimale belastingefficiëntie</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                        🎯 Lange Termijn (1+ jaar)
                      </h4>
                      <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                        <li>• Jaarlijkse evaluatie en optimalisatie</li>
                        <li>• Aanpassing aan nieuwe belastingwetgeving</li>
                        <li>• Uitbreiding naar internationale diversificatie</li>
                        <li>• Estate planning en fiscale successieplanning</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!result && (
            <Card>
              <CardContent className="py-12 text-center">
                <i className="fas fa-chart-bar text-4xl text-muted-foreground mb-4"></i>
                <p className="text-lg text-muted-foreground">
                  Bereken eerst uw belasting optimalisatie om de analyse te zien.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}