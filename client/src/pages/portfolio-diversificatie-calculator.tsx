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
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";

interface AssetClass {
  naam: string;
  verwachtRendement: number;
  volatiliteit: number;
  allocatie: number;
  minimumAllocatie: number;
  maximumAllocatie: number;
  correlaties: { [key: string]: number };
  kleur: string;
}

export default function PortfolioDiversificatieCalculatorPage() {
  const seoConfig = getSeoConfig("portfolio-diversificatie-calculator");

  useEffect(() => {
    document.title = "Portfolio Diversificatie Calculator - Asset Allocatie België";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Optimaliseer uw portfolio allocatie met moderne portfolio theorie. Bereken risico-rendement verhouding en diversificatie voor Belgische beleggers.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Optimaliseer uw portfolio allocatie met moderne portfolio theorie. Bereken risico-rendement verhouding en diversificatie voor Belgische beleggers.';
      document.head.appendChild(meta);
    }
  }, []);

  const [portfolioData, setPortfolioData] = useState({
    totaalPortfolio: 100000,
    beleggingsHorizon: 15,
    risicoTolerantie: 6, // 1-10 scale
    leeftijd: 35,
    maandelijkseBijdrage: 1000,
    inflatie: 2.5,
    rebalancingFrequentie: 12 // maanden
  });

  const [assetClasses, setAssetClasses] = useState<AssetClass[]>([
    {
      naam: "Aandelen Ontwikkelde Markten",
      verwachtRendement: 7.5,
      volatiliteit: 18.0,
      allocatie: 40,
      minimumAllocatie: 0,
      maximumAllocatie: 100,
      correlaties: { "Obligaties": -0.1, "Emerging Markets": 0.8, "REITs": 0.6, "Commodities": 0.3, "Goud": 0.2 },
      kleur: "#8884d8"
    },
    {
      naam: "Obligaties",
      verwachtRendement: 3.5,
      volatiliteit: 4.5,
      allocatie: 30,
      minimumAllocatie: 0,
      maximumAllocatie: 80,
      correlaties: { "Aandelen Ontwikkelde Markten": -0.1, "Emerging Markets": -0.2, "REITs": 0.1, "Commodities": -0.1, "Goud": 0.3 },
      kleur: "#82ca9d"
    },
    {
      naam: "Emerging Markets",
      verwachtRendement: 8.5,
      volatiliteit: 25.0,
      allocatie: 15,
      minimumAllocatie: 0,
      maximumAllocatie: 40,
      correlaties: { "Aandelen Ontwikkelde Markten": 0.8, "Obligaties": -0.2, "REITs": 0.5, "Commodities": 0.4, "Goud": 0.1 },
      kleur: "#ffc658"
    },
    {
      naam: "REITs",
      verwachtRendement: 6.5,
      volatiliteit: 20.0,
      allocatie: 10,
      minimumAllocatie: 0,
      maximumAllocatie: 30,
      correlaties: { "Aandelen Ontwikkelde Markten": 0.6, "Obligaties": 0.1, "Emerging Markets": 0.5, "Commodities": 0.2, "Goud": 0.1 },
      kleur: "#ff7300"
    },
    {
      naam: "Goud",
      verwachtRendement: 4.0,
      volatiliteit: 16.0,
      allocatie: 5,
      minimumAllocatie: 0,
      maximumAllocatie: 20,
      correlaties: { "Aandelen Ontwikkelde Markten": 0.2, "Obligaties": 0.3, "Emerging Markets": 0.1, "REITs": 0.1, "Commodities": 0.6 },
      kleur: "#FFD700"
    }
  ]);

  // Calculate portfolio metrics
  const berekenPortfolioMetrics = () => {
    const totaalAllocatie = assetClasses.reduce((sum, asset) => sum + asset.allocatie, 0);
    
    // Weighted return and volatility
    const verwachtPortfolioRendement = assetClasses.reduce((sum, asset) => 
      sum + (asset.allocatie / 100) * asset.verwachtRendement, 0
    );
    
    // Portfolio volatility using correlation matrix
    let portfolioVariantie = 0;
    
    for (let i = 0; i < assetClasses.length; i++) {
      for (let j = 0; j < assetClasses.length; j++) {
        const gewichtI = assetClasses[i].allocatie / 100;
        const gewichtJ = assetClasses[j].allocatie / 100;
        const volatiliteitI = assetClasses[i].volatiliteit / 100;
        const volatiliteitJ = assetClasses[j].volatiliteit / 100;
        
        let correlatie = 1;
        if (i !== j) {
          correlatie = assetClasses[i].correlaties[assetClasses[j].naam] || 0.5;
        }
        
        portfolioVariantie += gewichtI * gewichtJ * volatiliteitI * volatiliteitJ * correlatie;
      }
    }
    
    const portfolioVolatiliteit = Math.sqrt(portfolioVariantie) * 100;
    
    // Sharpe ratio (assuming risk-free rate of 2%)
    const risicoVrijeRente = 2.0;
    const sharpeRatio = (verwachtPortfolioRendement - risicoVrijeRente) / portfolioVolatiliteit;
    
    // Diversification ratio
    const gewogenGemiddeldeVolatiliteit = assetClasses.reduce((sum, asset) => 
      sum + (asset.allocatie / 100) * asset.volatiliteit, 0
    );
    const diversificatieRatio = gewogenGemiddeldeVolatiliteit / portfolioVolatiliteit;
    
    // Monte Carlo simulation for long-term projections
    const simulatieJaren = portfolioData.beleggingsHorizon;
    const simulaties = 1000;
    const resultaten: number[] = [];
    
    for (let sim = 0; sim < simulaties; sim++) {
      let portfolioWaarde = portfolioData.totaalPortfolio;
      
      for (let jaar = 0; jaar < simulatieJaren; jaar++) {
        // Generate random return using normal distribution approximation
        const randomFactor = (Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() - 3) / 3;
        const jaarRendement = (verwachtPortfolioRendement + portfolioVolatiliteit * randomFactor) / 100;
        
        portfolioWaarde *= (1 + jaarRendement);
        portfolioWaarde += portfolioData.maandelijkseBijdrage * 12;
      }
      
      resultaten.push(portfolioWaarde);
    }
    
    resultaten.sort((a, b) => a - b);
    const percentile5 = resultaten[Math.floor(simulaties * 0.05)];
    const percentile50 = resultaten[Math.floor(simulaties * 0.50)];
    const percentile95 = resultaten[Math.floor(simulaties * 0.95)];
    
    // Generate projection timeline
    const projectieData = [];
    let conservatiefWaarde = portfolioData.totaalPortfolio;
    let verwachtWaarde = portfolioData.totaalPortfolio;
    let optimistischWaarde = portfolioData.totaalPortfolio;
    
    for (let jaar = 0; jaar <= simulatieJaren; jaar++) {
      if (jaar > 0) {
        const conservatiefRendement = (verwachtPortfolioRendement - portfolioVolatiliteit) / 100;
        const verwachtRendement = verwachtPortfolioRendement / 100;
        const optimistischRendement = (verwachtPortfolioRendement + portfolioVolatiliteit) / 100;
        
        conservatiefWaarde *= (1 + conservatiefRendement);
        verwachtWaarde *= (1 + verwachtRendement);
        optimistischWaarde *= (1 + optimistischRendement);
        
        conservatiefWaarde += portfolioData.maandelijkseBijdrage * 12;
        verwachtWaarde += portfolioData.maandelijkseBijdrage * 12;
        optimistischWaarde += portfolioData.maandelijkseBijdrage * 12;
      }
      
      projectieData.push({
        jaar,
        conservatief: Math.round(conservatiefWaarde),
        verwacht: Math.round(verwachtWaarde),
        optimistisch: Math.round(optimistischWaarde)
      });
    }
    
    return {
      totaalAllocatie,
      verwachtPortfolioRendement,
      portfolioVolatiliteit,
      sharpeRatio,
      diversificatieRatio,
      percentile5,
      percentile50,
      percentile95,
      projectieData
    };
  };

  const portfolioMetrics = berekenPortfolioMetrics();

  // Risk tolerance based recommendations
  const getRisicoProfielAanbeveling = (risicoScore: number) => {
    if (risicoScore <= 3) {
      return {
        profiel: "Conservatief",
        aandelenMax: 30,
        obligatiesMin: 50,
        beschrijving: "Focus op kapitaalbehoud met beperkt volatiliteit",
        kleur: "text-blue-600"
      };
    } else if (risicoScore <= 6) {
      return {
        profiel: "Gematigd",
        aandelenMax: 60,
        obligatiesMin: 30,
        beschrijving: "Gebalanceerde benadering tussen groei en stabiliteit",
        kleur: "text-green-600"
      };
    } else {
      return {
        profiel: "Agressief",
        aandelenMax: 90,
        obligatiesMin: 10,
        beschrijving: "Maximale groei met hogere volatiliteit acceptatie",
        kleur: "text-orange-600"
      };
    }
  };

  const risicoAanbeveling = getRisicoProfielAanbeveling(portfolioData.risicoTolerantie);

  // Age-based allocation (rule of thumb)
  const leeftijdAllocatie = {
    aandelen: Math.max(20, 100 - portfolioData.leeftijd),
    obligaties: Math.min(80, portfolioData.leeftijd)
  };

  const updateAssetAllocatie = (index: number, nieuweAllocatie: number) => {
    const updated = [...assetClasses];
    updated[index].allocatie = nieuweAllocatie;
    setAssetClasses(updated);
  };

  // Alternative portfolio suggestions
  const portfolioSuggesties = [
    {
      naam: "Belgische Belegger Conservatief",
      allocaties: { "Aandelen Ontwikkelde Markten": 25, "Obligaties": 50, "Emerging Markets": 5, "REITs": 15, "Goud": 5 },
      beschrijving: "Laag risico focus op Europese markten"
    },
    {
      naam: "Wereldwijd Gebalanceerd",
      allocaties: { "Aandelen Ontwikkelde Markten": 40, "Obligaties": 30, "Emerging Markets": 15, "REITs": 10, "Goud": 5 },
      beschrijving: "Uitgebalanceerde globale diversificatie"
    },
    {
      naam: "Groei Gericht",
      allocaties: { "Aandelen Ontwikkelde Markten": 50, "Obligaties": 20, "Emerging Markets": 20, "REITs": 7, "Goud": 3 },
      beschrijving: "Hoger groei potentieel met meer risico"
    },
    {
      naam: "Inflatie Bescherming",
      allocaties: { "Aandelen Ontwikkelde Markten": 35, "Obligaties": 25, "Emerging Markets": 15, "REITs": 15, "Goud": 10 },
      beschrijving: "Bescherming tegen inflatie met reële assets"
    }
  ];

  const pasSuggestiesToe = (suggestie: any) => {
    const updated = assetClasses.map(asset => ({
      ...asset,
      allocatie: suggestie.allocaties[asset.naam] || 0
    }));
    setAssetClasses(updated);
  };

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header activeCalculator="portfolio-diversificatie-calculator" onCalculatorChange={() => {}} />
      
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Portfolio Diversificatie Calculator
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Optimaliseer uw portfolio allocatie met moderne portfolio theorie. 
              Bereken het optimale risico-rendement profiel voor uw beleggingsdoelen.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Asset Allocatie
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Risico Optimalisatie
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Monte Carlo Simulatie
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
          
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Portfolio Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-chart-pie mr-3 text-primary"></i>
                  Portfolio Instellingen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="totaalPortfolio">Totaal portfolio (€)</Label>
                  <Input
                    id="totaalPortfolio"
                    type="number"
                    value={portfolioData.totaalPortfolio}
                    onChange={(e) => setPortfolioData({...portfolioData, totaalPortfolio: Number(e.target.value)})}
                    data-testid="input-totaal-portfolio"
                  />
                </div>

                <div>
                  <Label htmlFor="maandelijkseBijdrage">Maandelijkse bijdrage (€)</Label>
                  <Input
                    id="maandelijkseBijdrage"
                    type="number"
                    value={portfolioData.maandelijkseBijdrage}
                    onChange={(e) => setPortfolioData({...portfolioData, maandelijkseBijdrage: Number(e.target.value)})}
                    data-testid="input-maandelijkse-bijdrage"
                  />
                </div>

                <div>
                  <Label htmlFor="beleggingsHorizon">Beleggingshorizon (jaren)</Label>
                  <Select value={portfolioData.beleggingsHorizon.toString()} onValueChange={(value) => setPortfolioData({...portfolioData, beleggingsHorizon: Number(value)})}>
                    <SelectTrigger data-testid="select-beleggings-horizon">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 jaar</SelectItem>
                      <SelectItem value="10">10 jaar</SelectItem>
                      <SelectItem value="15">15 jaar</SelectItem>
                      <SelectItem value="20">20 jaar</SelectItem>
                      <SelectItem value="25">25 jaar</SelectItem>
                      <SelectItem value="30">30 jaar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="leeftijd">Uw leeftijd</Label>
                  <Input
                    id="leeftijd"
                    type="number"
                    value={portfolioData.leeftijd}
                    onChange={(e) => setPortfolioData({...portfolioData, leeftijd: Number(e.target.value)})}
                    data-testid="input-leeftijd"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Aanbevolen aandelen: {leeftijdAllocatie.aandelen}%
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Risk Tolerance */}
            <Card>
              <CardHeader>
                <CardTitle>Risico Tolerantie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Risico niveau: {portfolioData.risicoTolerantie}/10</Label>
                  <Slider
                    value={[portfolioData.risicoTolerantie]}
                    onValueChange={(value) => setPortfolioData({...portfolioData, risicoTolerantie: value[0]})}
                    max={10}
                    min={1}
                    step={1}
                    className="mt-2"
                    data-testid="slider-risico-tolerantie"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Conservatief</span>
                    <span>Agressief</span>
                  </div>
                </div>

                <div className="bg-muted p-3 rounded-lg">
                  <div className={`font-medium ${risicoAanbeveling.kleur}`}>
                    {risicoAanbeveling.profiel}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {risicoAanbeveling.beschrijving}
                  </div>
                  <div className="text-xs mt-2">
                    Max aandelen: {risicoAanbeveling.aandelenMax}% | Min obligaties: {risicoAanbeveling.obligatiesMin}%
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Suggesties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {portfolioSuggesties.map((suggestie, index) => (
                  <div key={index} className="border rounded p-3">
                    <div className="font-medium text-sm">{suggestie.naam}</div>
                    <div className="text-xs text-muted-foreground mb-2">{suggestie.beschrijving}</div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => pasSuggestiesToe(suggestie)}
                      className="w-full"
                      data-testid={`button-suggestie-${index}`}
                    >
                      Pas toe
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Portfolio Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Verwacht Rendement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600" data-testid="text-verwacht-rendement">
                    {portfolioMetrics.verwachtPortfolioRendement.toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground">per jaar</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Volatiliteit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600" data-testid="text-volatiliteit">
                    {portfolioMetrics.portfolioVolatiliteit.toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground">standaarddeviatie</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sharpe Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary" data-testid="text-sharpe-ratio">
                    {portfolioMetrics.sharpeRatio.toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground">risico-aangepast</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Diversificatie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600" data-testid="text-diversificatie">
                    {portfolioMetrics.diversificatieRatio.toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground">ratio</p>
                </CardContent>
              </Card>
            </div>

            {/* Asset Allocation */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocatie</CardTitle>
                <p className="text-muted-foreground">
                  Totaal: {portfolioMetrics.totaalAllocatie.toFixed(0)}%
                  {portfolioMetrics.totaalAllocatie !== 100 && (
                    <span className="text-red-600 ml-2">⚠️ Moet 100% zijn</span>
                  )}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {assetClasses.map((asset, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-sm font-medium">{asset.naam}</Label>
                          <span className="text-sm font-semibold">{asset.allocatie}%</span>
                        </div>
                        <Slider
                          value={[asset.allocatie]}
                          onValueChange={(value) => updateAssetAllocatie(index, value[0])}
                          max={asset.maximumAllocatie}
                          min={asset.minimumAllocatie}
                          step={1}
                          className="w-full"
                          data-testid={`slider-allocatie-${index}`}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Rendement: {asset.verwachtRendement}%</span>
                          <span>Volatiliteit: {asset.volatiliteit}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={assetClasses}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ naam, allocatie }) => `${naam.split(' ')[0]} ${allocatie}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="allocatie"
                        >
                          {assetClasses.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.kleur} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`${value}%`]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Analysis */}
            <Tabs defaultValue="projectie" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="projectie">Portfolio Projectie</TabsTrigger>
                <TabsTrigger value="risico">Risico Analyse</TabsTrigger>
                <TabsTrigger value="correlatie">Correlatie Matrix</TabsTrigger>
                <TabsTrigger value="rebalancing">Rebalancing</TabsTrigger>
              </TabsList>

              <TabsContent value="projectie" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Groei Projectie ({portfolioData.beleggingsHorizon} jaar)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={portfolioMetrics.projectieData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="jaar" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
                          <Area type="monotone" dataKey="conservatief" stackId="1" stroke="#ff7300" fill="#ff7300" fillOpacity={0.3} />
                          <Area type="monotone" dataKey="verwacht" stackId="2" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                          <Area type="monotone" dataKey="optimistisch" stackId="3" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monte Carlo Simulatie Resultaten</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-red-600">
                          €{Math.round(portfolioMetrics.percentile5).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">5% kans op minder</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-primary">
                          €{Math.round(portfolioMetrics.percentile50).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Mediane uitkomst</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600">
                          €{Math.round(portfolioMetrics.percentile95).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">95% kans op minder</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="risico" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risico-Rendement Profiel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={assetClasses.map(asset => ({
                          naam: asset.naam.split(' ')[0],
                          rendement: asset.verwachtRendement,
                          volatiliteit: asset.volatiliteit,
                          allocatie: asset.allocatie
                        }))}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="naam" />
                          <PolarRadiusAxis angle={30} domain={[0, 30]} />
                          <Radar name="Rendement" dataKey="rendement" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                          <Radar name="Volatiliteit" dataKey="volatiliteit" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Risico Waarschuwingen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {portfolioMetrics.portfolioVolatiliteit > 20 && (
                        <Alert>
                          <AlertDescription>
                            ⚠️ <strong>Hoge volatiliteit:</strong> Portfolio volatiliteit van {portfolioMetrics.portfolioVolatiliteit.toFixed(1)}% 
                            kan leiden tot grote schommelingen in waarde.
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      {(assetClasses.find(a => a.naam === "Aandelen Ontwikkelde Markten")?.allocatie || 0) + 
                       (assetClasses.find(a => a.naam === "Emerging Markets")?.allocatie || 0) > risicoAanbeveling.aandelenMax && (
                        <Alert>
                          <AlertDescription>
                            📊 <strong>Hoge aandelenexposure:</strong> Uw totale aandelenallocatie overschrijdt 
                            de aanbeveling voor uw risicoprofiel.
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      {portfolioMetrics.diversificatieRatio < 1.2 && (
                        <Alert>
                          <AlertDescription>
                            🔄 <strong>Beperkte diversificatie:</strong> Overweeg meer spreiding tussen 
                            ongecorreleerde asset classes.
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      {portfolioMetrics.sharpeRatio < 0.5 && (
                        <Alert>
                          <AlertDescription>
                            📉 <strong>Lage Sharpe ratio:</strong> Portfolio biedt mogelijk onvoldoende 
                            beloning voor het genomen risico.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="correlatie" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Correlatie Matrix</CardTitle>
                    <p className="text-muted-foreground">
                      Correlatie tussen asset classes (-1 = perfect negatief, +1 = perfect positief)
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr>
                            <th className="text-left p-2">Asset Class</th>
                            {assetClasses.map((asset, index) => (
                              <th key={index} className="text-center p-1 text-xs">
                                {asset.naam.split(' ')[0]}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {assetClasses.map((assetRow, rowIndex) => (
                            <tr key={rowIndex} className="border-t">
                              <td className="p-2 font-medium text-xs">{assetRow.naam}</td>
                              {assetClasses.map((assetCol, colIndex) => {
                                let correlatie = 1;
                                if (rowIndex !== colIndex) {
                                  correlatie = assetRow.correlaties[assetCol.naam] || 0.5;
                                }
                                const kleur = correlatie > 0.7 ? 'bg-red-100' : 
                                             correlatie > 0.3 ? 'bg-yellow-100' : 'bg-green-100';
                                return (
                                  <td key={colIndex} className={`p-1 text-center text-xs ${kleur}`}>
                                    {correlatie.toFixed(1)}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rebalancing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Rebalancing Strategie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="rebalancingFrequentie">Rebalancing frequentie</Label>
                        <Select value={portfolioData.rebalancingFrequentie.toString()} onValueChange={(value) => setPortfolioData({...portfolioData, rebalancingFrequentie: Number(value)})}>
                          <SelectTrigger data-testid="select-rebalancing-frequentie">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">Elk kwartaal</SelectItem>
                            <SelectItem value="6">Halfjaarlijks</SelectItem>
                            <SelectItem value="12">Jaarlijks</SelectItem>
                            <SelectItem value="24">Om de 2 jaar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Rebalancing Voordelen:</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Houdt gewenste asset allocatie aan</li>
                          <li>• Dwingt "buy low, sell high" discipline af</li>
                          <li>• Vermindert portfolio drift over tijd</li>
                          <li>• Kan rendement verbeteren op lange termijn</li>
                        </ul>
                      </div>

                      <Alert>
                        <AlertDescription>
                          💡 <strong>Tip:</strong> Rebalancing bij {portfolioData.rebalancingFrequentie > 6 ? 'lagere' : 'hogere'} frequentie 
                          kan transactiekosten {portfolioData.rebalancingFrequentie > 6 ? 'verlagen' : 'verhogen'} maar 
                          {portfolioData.rebalancingFrequentie > 6 ? ' verhoogt portfolio drift' : ' vermindert portfolio drift'}.
                        </AlertDescription>
                      </Alert>
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
      <RateComparisonWidget productType="portfolio-belegging" title="Vergelijk Beleggingsplatforms" />

      {/* Bottom Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GoogleAdsense slot="banner" className="w-full max-w-4xl mx-auto" />
      </section>

      {/* Authority Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} />}
      </section>

      <Footer />
    </div>
  );
}