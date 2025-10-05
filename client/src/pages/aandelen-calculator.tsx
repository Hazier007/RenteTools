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
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

interface Aandeel {
  ticker: string;
  naam: string;
  sector: string;
  markt: string;
  valuta: string;
  dividendYield: number;
  peRatio: number;
  marketCap: number;
}

export default function AandelenCalculatorPage() {
  const seoConfig = getSeoConfig("aandelen-calculator");
  useSeoTags("aandelen-calculator");

  const [aandeelData, setAandeelData] = useState({
    aankoopprijs: 100,
    huidigeKoers: 110,
    aantalAandelen: 100,
    jaarlijksDividend: 3.50,
    transactiekosten: 7.50,
    dividendbelasting: 30,
    verwachteGroei: 5.0,
    beleggingsHorizon: 10,
    discountRate: 8.0
  });

  const [vergelijkingsAandelen, setVergelijkingsAandelen] = useState<string[]>(["ASML", "UCB"]);

  // Popular Belgian and European stocks
  const popularAandelen: Aandeel[] = [
    {
      ticker: "KBC",
      naam: "KBC Group",
      sector: "Financials",
      markt: "Euronext Brussels",
      valuta: "EUR",
      dividendYield: 4.2,
      peRatio: 9.8,
      marketCap: 28500000000
    },
    {
      ticker: "UCB",
      naam: "UCB SA",
      sector: "Healthcare",
      markt: "Euronext Brussels",
      valuta: "EUR",
      dividendYield: 2.1,
      peRatio: 14.5,
      marketCap: 18900000000
    },
    {
      ticker: "ASML",
      naam: "ASML Holding",
      sector: "Technology",
      markt: "Euronext Amsterdam",
      valuta: "EUR",
      dividendYield: 1.3,
      peRatio: 32.4,
      marketCap: 280000000000
    },
    {
      ticker: "BEL20",
      naam: "Ageas",
      sector: "Insurance",
      markt: "Euronext Brussels",
      valuta: "EUR",
      dividendYield: 5.8,
      peRatio: 8.2,
      marketCap: 9200000000
    },
    {
      ticker: "PROX",
      naam: "Proximus",
      sector: "Telecommunications",
      markt: "Euronext Brussels",
      valuta: "EUR",
      dividendYield: 6.1,
      peRatio: 11.3,
      marketCap: 4200000000
    }
  ];

  // Calculate stock metrics
  const berekenAandeelMetrics = () => {
    const totaleInvestering = aandeelData.aankoopprijs * aandeelData.aantalAandelen + aandeelData.transactiekosten;
    const huidigeWaarde = aandeelData.huidigeKoers * aandeelData.aantalAandelen;
    const kapitaalWinst = huidigeWaarde - totaleInvestering;
    const kapitaalWinstPercentage = (kapitaalWinst / totaleInvestering) * 100;
    
    // Dividend calculations
    const brutoJaarlijksDividend = aandeelData.jaarlijksDividend * aandeelData.aantalAandelen;
    const dividendBelastingBedrag = brutoJaarlijksDividend * (aandeelData.dividendbelasting / 100);
    const nettoJaarlijksDividend = brutoJaarlijksDividend - dividendBelastingBedrag;
    const dividendYield = (aandeelData.jaarlijksDividend / aandeelData.huidigeKoers) * 100;
    const nettoYield = dividendYield * (1 - aandeelData.dividendbelasting / 100);
    
    // Future value calculations
    const toekomstigeKoers = aandeelData.huidigeKoers * Math.pow(1 + aandeelData.verwachteGroei / 100, aandeelData.beleggingsHorizon);
    const toekomstigeWaarde = toekomstigeKoers * aandeelData.aantalAandelen;
    const toekomstigDividend = aandeelData.jaarlijksDividend * Math.pow(1 + aandeelData.verwachteGroei / 100, aandeelData.beleggingsHorizon);
    
    // Dividend Discount Model (DDM)
    const ddmWaarde = aandeelData.jaarlijksDividend * (1 + aandeelData.verwachteGroei / 100) / 
                     ((aandeelData.discountRate / 100) - (aandeelData.verwachteGroei / 100));
    
    // Total return projection
    const totaalDividendInkomsten = nettoJaarlijksDividend * aandeelData.beleggingsHorizon;
    const totaalRendement = (toekomstigeWaarde + totaalDividendInkomsten - totaleInvestering) / totaleInvestering * 100;
    const jaarlijksRendement = Math.pow((toekomstigeWaarde + totaalDividendInkomsten) / totaleInvestering, 1 / aandeelData.beleggingsHorizon) - 1;
    
    // Generate projection data
    const projectieData = [];
    let koers = aandeelData.huidigeKoers;
    let dividend = aandeelData.jaarlijksDividend;
    let cumulatiefDividend = 0;
    
    for (let jaar = 0; jaar <= aandeelData.beleggingsHorizon; jaar++) {
      if (jaar > 0) {
        koers *= (1 + aandeelData.verwachteGroei / 100);
        dividend *= (1 + aandeelData.verwachteGroei / 100);
        cumulatiefDividend += dividend * aandeelData.aantalAandelen * (1 - aandeelData.dividendbelasting / 100);
      }
      
      const portfolioWaarde = koers * aandeelData.aantalAandelen;
      const totaleWaarde = portfolioWaarde + cumulatiefDividend;
      
      projectieData.push({
        jaar,
        koers: Math.round(koers * 100) / 100,
        portfolioWaarde: Math.round(portfolioWaarde),
        cumulatiefDividend: Math.round(cumulatiefDividend),
        totaleWaarde: Math.round(totaleWaarde),
        dividendPerAandeel: Math.round(dividend * 100) / 100
      });
    }
    
    return {
      totaleInvestering,
      huidigeWaarde,
      kapitaalWinst,
      kapitaalWinstPercentage,
      brutoJaarlijksDividend,
      nettoJaarlijksDividend,
      dividendYield,
      nettoYield,
      toekomstigeKoers,
      toekomstigeWaarde,
      ddmWaarde,
      totaalRendement,
      jaarlijksRendement: jaarlijksRendement * 100,
      projectieData
    };
  };

  const resultaat = berekenAandeelMetrics();

  // Create comparison metrics
  const aandeelVergelijking = popularAandelen.map(aandeel => {
    const intrinsiekWaarde = aandeel.dividendYield * 100 / (aandeelData.discountRate - aandeelData.verwachteGroei);
    return {
      ...aandeel,
      intrinsiekWaarde: Math.round(intrinsiekWaarde * 100) / 100,
      nettoYield: aandeel.dividendYield * (1 - aandeelData.dividendbelasting / 100)
    };
  });

  // Risk analysis
  const risicoAnalyse = [
    { 
      categorie: 'Dividend Sustainability', 
      score: aandeelData.jaarlijksDividend / (aandeelData.huidigeKoers * 0.4) > 1 ? 3 : 
             aandeelData.jaarlijksDividend / (aandeelData.huidigeKoers * 0.6) > 1 ? 2 : 1,
      beschrijving: 'Duurzaamheid van dividend uitkeringen'
    },
    { 
      categorie: 'Valuation Risk', 
      score: resultaat.ddmWaarde > aandeelData.huidigeKoers * 1.2 ? 1 : 
             resultaat.ddmWaarde > aandeelData.huidigeKoers * 0.8 ? 2 : 3,
      beschrijving: 'Overwaardeerd vs ondergewaardeerd'
    },
    { 
      categorie: 'Growth Dependency', 
      score: aandeelData.verwachteGroei > 10 ? 3 : aandeelData.verwachteGroei > 5 ? 2 : 1,
      beschrijving: 'Afhankelijkheid van groeiveronderstellingen'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header activeCalculator="aandelen-calculator" onCalculatorChange={() => {}} />
      
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Aandelen Calculator België
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Analyseer individuele aandelen met fundamentele analyse tools. 
              Bereken dividend yield, P/E ratio's en intrinsieke waarde voor Belgische beleggers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Dividend Analyse
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Fundamentele Waardering
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Belgische Dividendtaks
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
          <div className="lg:col-span-1 space-y-6">
            
            {/* Stock Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-chart-line mr-3 text-primary"></i>
                  Aandeel Gegevens
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="aankoopprijs">Aankoopprijs (€)</Label>
                  <Input
                    id="aankoopprijs"
                    type="number"
                    step="0.01"
                    value={aandeelData.aankoopprijs}
                    onChange={(e) => setAandeelData({...aandeelData, aankoopprijs: Number(e.target.value)})}
                    data-testid="input-aankoopprijs"
                  />
                </div>

                <div>
                  <Label htmlFor="huidigeKoers">Huidige koers (€)</Label>
                  <Input
                    id="huidigeKoers"
                    type="number"
                    step="0.01"
                    value={aandeelData.huidigeKoers}
                    onChange={(e) => setAandeelData({...aandeelData, huidigeKoers: Number(e.target.value)})}
                    data-testid="input-huidige-koers"
                  />
                </div>

                <div>
                  <Label htmlFor="aantalAandelen">Aantal aandelen</Label>
                  <Input
                    id="aantalAandelen"
                    type="number"
                    value={aandeelData.aantalAandelen}
                    onChange={(e) => setAandeelData({...aandeelData, aantalAandelen: Number(e.target.value)})}
                    data-testid="input-aantal-aandelen"
                  />
                </div>

                <div>
                  <Label htmlFor="jaarlijksDividend">Jaarlijks dividend per aandeel (€)</Label>
                  <Input
                    id="jaarlijksDividend"
                    type="number"
                    step="0.01"
                    value={aandeelData.jaarlijksDividend}
                    onChange={(e) => setAandeelData({...aandeelData, jaarlijksDividend: Number(e.target.value)})}
                    data-testid="input-jaarlijks-dividend"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Dividend yield: {((aandeelData.jaarlijksDividend / aandeelData.huidigeKoers) * 100).toFixed(2)}%
                  </p>
                </div>

                <div>
                  <Label htmlFor="transactiekosten">Transactiekosten (€)</Label>
                  <Input
                    id="transactiekosten"
                    type="number"
                    step="0.01"
                    value={aandeelData.transactiekosten}
                    onChange={(e) => setAandeelData({...aandeelData, transactiekosten: Number(e.target.value)})}
                    data-testid="input-transactiekosten"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Projections */}
            <Card>
              <CardHeader>
                <CardTitle>Toekomstprojectie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="verwachteGroei">Verwachte jaarlijkse groei (%)</Label>
                  <Input
                    id="verwachteGroei"
                    type="number"
                    step="0.1"
                    value={aandeelData.verwachteGroei}
                    onChange={(e) => setAandeelData({...aandeelData, verwachteGroei: Number(e.target.value)})}
                    data-testid="input-verwachte-groei"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Koers én dividend groei
                  </p>
                </div>

                <div>
                  <Label htmlFor="beleggingsHorizon">Beleggingshorizon (jaren)</Label>
                  <Select value={aandeelData.beleggingsHorizon.toString()} onValueChange={(value) => setAandeelData({...aandeelData, beleggingsHorizon: Number(value)})}>
                    <SelectTrigger data-testid="select-beleggings-horizon">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 jaar</SelectItem>
                      <SelectItem value="10">10 jaar</SelectItem>
                      <SelectItem value="15">15 jaar</SelectItem>
                      <SelectItem value="20">20 jaar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="discountRate">Vereiste rendement (%)</Label>
                  <Input
                    id="discountRate"
                    type="number"
                    step="0.1"
                    value={aandeelData.discountRate}
                    onChange={(e) => setAandeelData({...aandeelData, discountRate: Number(e.target.value)})}
                    data-testid="input-discount-rate"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Voor DDM waardering
                  </p>
                </div>

                <div>
                  <Label htmlFor="dividendbelasting">Dividendbelasting (%)</Label>
                  <Select value={aandeelData.dividendbelasting.toString()} onValueChange={(value) => setAandeelData({...aandeelData, dividendbelasting: Number(value)})}>
                    <SelectTrigger data-testid="select-dividend-belasting">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30% (Standaard België)</SelectItem>
                      <SelectItem value="25">25% (Verminderd tarief)</SelectItem>
                      <SelectItem value="15">15% (Verdragstarief)</SelectItem>
                      <SelectItem value="0">0% (Vrijgesteld)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Key Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Huidige Positie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary" data-testid="text-huidige-waarde">
                    €{Math.round(resultaat.huidigeWaarde).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Portfolio waarde
                  </p>
                  <div className="mt-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Geïnvesteerd:</span>
                      <span>€{Math.round(resultaat.totaleInvestering).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Winst/Verlies:</span>
                      <span className={resultaat.kapitaalWinst >= 0 ? 'text-green-600' : 'text-red-600'}>
                        €{Math.round(resultaat.kapitaalWinst).toLocaleString()} ({resultaat.kapitaalWinstPercentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dividend Analyse</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600" data-testid="text-dividend-yield">
                    {resultaat.nettoYield.toFixed(2)}%
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Netto dividend yield
                  </p>
                  <div className="mt-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Bruto yield:</span>
                      <span>{resultaat.dividendYield.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jaarlijks netto:</span>
                      <span>€{Math.round(resultaat.nettoJaarlijksDividend)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Intrinsieke Waarde</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600" data-testid="text-ddm-waarde">
                    €{Math.round(resultaat.ddmWaarde).toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    DDM waardering
                  </p>
                  <div className="mt-3">
                    {resultaat.ddmWaarde > aandeelData.huidigeKoers ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Ondergewaardeerd
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        Overgewaardeerd
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for Different Views */}
            <Tabs defaultValue="projectie" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="projectie">Toekomstprojectie</TabsTrigger>
                <TabsTrigger value="vergelijking">Aandelen Vergelijking</TabsTrigger>
                <TabsTrigger value="risico">Risico Analyse</TabsTrigger>
                <TabsTrigger value="fiscaal">Fiscale Impact</TabsTrigger>
              </TabsList>
              
              <TabsContent value="projectie" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Groei Projectie</CardTitle>
                    <p className="text-muted-foreground">
                      Verwacht totaal rendement: {resultaat.jaarlijksRendement.toFixed(1)}% per jaar
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={resultaat.projectieData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="jaar" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
                          <Area type="monotone" dataKey="portfolioWaarde" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                          <Area type="monotone" dataKey="cumulatiefDividend" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Projectie Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Na {aandeelData.beleggingsHorizon} jaar:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Verwachte koers:</span>
                            <span>€{Math.round(resultaat.toekomstigeKoers).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Portfolio waarde:</span>
                            <span>€{Math.round(resultaat.toekomstigeWaarde).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Totaal dividend:</span>
                            <span>€{Math.round(resultaat.projectieData[resultaat.projectieData.length - 1].cumulatiefDividend).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span>Totale waarde:</span>
                            <span>€{Math.round(resultaat.projectieData[resultaat.projectieData.length - 1].totaleWaarde).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Rendement analyse:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Totaal rendement:</span>
                            <span>{resultaat.totaalRendement.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Jaarlijks rendement:</span>
                            <span>{resultaat.jaarlijksRendement.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Dividend component:</span>
                            <span>{((resultaat.projectieData[resultaat.projectieData.length - 1].cumulatiefDividend / resultaat.totaleInvestering) / aandeelData.beleggingsHorizon * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vergelijking" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Belgische Aandelen Vergelijking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Aandeel</th>
                            <th className="text-right p-2">Dividend Yield</th>
                            <th className="text-right p-2">Netto Yield</th>
                            <th className="text-right p-2">P/E Ratio</th>
                            <th className="text-right p-2">Market Cap</th>
                            <th className="text-left p-2">Sector</th>
                          </tr>
                        </thead>
                        <tbody>
                          {aandeelVergelijking.map((aandeel, index) => (
                            <tr key={index} className="border-b hover:bg-muted/50">
                              <td className="p-2">
                                <div>
                                  <div className="font-medium">{aandeel.ticker}</div>
                                  <div className="text-sm text-muted-foreground">{aandeel.naam}</div>
                                </div>
                              </td>
                              <td className="p-2 text-right">{aandeel.dividendYield.toFixed(1)}%</td>
                              <td className="p-2 text-right">{aandeel.nettoYield.toFixed(1)}%</td>
                              <td className="p-2 text-right">{aandeel.peRatio.toFixed(1)}x</td>
                              <td className="p-2 text-right">€{(aandeel.marketCap / 1000000000).toFixed(1)}B</td>
                              <td className="p-2 text-sm">{aandeel.sector}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="risico" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risico Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {risicoAnalyse.map((risico, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{risico.categorie}</div>
                            <div className="text-sm text-muted-foreground">{risico.beschrijving}</div>
                          </div>
                          <div className="flex">
                            {[1, 2, 3].map((level) => (
                              <div
                                key={level}
                                className={`w-3 h-3 mx-1 rounded-full ${
                                  level <= risico.score ? 'bg-red-500' : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Gevoeligheidsanalyse</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Alert>
                        <AlertDescription>
                          📈 <strong>Groei sensitivity:</strong> Een wijziging van 1% in de groeiveronderstelling 
                          beïnvloedt de DDM waarde met ongeveer €{Math.abs(resultaat.ddmWaarde * 0.15).toFixed(0)}.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          💰 <strong>Dividend risico:</strong> Dividend cuts kunnen het totaalrendement met 
                          {((resultaat.nettoJaarlijksDividend * aandeelData.beleggingsHorizon / resultaat.totaleInvestering) * 100).toFixed(1)}% verlagen.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          📊 <strong>Markt risico:</strong> Bij een marktcorrectie van 20% zou uw positie 
                          €{Math.round(resultaat.huidigeWaarde * 0.2).toLocaleString()} kunnen verliezen.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fiscaal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Fiscale Optimalisatie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Dividend Belasting:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Bruto dividend (jaar):</span>
                            <span>€{Math.round(resultaat.brutoJaarlijksDividend)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Belasting ({aandeelData.dividendbelasting}%):</span>
                            <span className="text-red-600">-€{Math.round(resultaat.brutoJaarlijksDividend * aandeelData.dividendbelasting / 100)}</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span>Netto dividend:</span>
                            <span>€{Math.round(resultaat.nettoJaarlijksDividend)}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Kapitaalwinst:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Verwachte winst:</span>
                            <span>€{Math.round(resultaat.toekomstigeWaarde - resultaat.totaleInvestering)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Belasting (particulier):</span>
                            <span className="text-green-600">€0 (vrijgesteld)</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span>Netto winst:</span>
                            <span>€{Math.round(resultaat.toekomstigeWaarde - resultaat.totaleInvestering)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Optimalisatie Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Alert>
                        <AlertDescription>
                          🏛️ <strong>Belgische vs buitenlandse aandelen:</strong> 
                          Belgische dividenden kunnen verminderd tarief hebben bij EU-bronheffing.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          📅 <strong>Timing dividend:</strong> 
                          Dividend ontvangen in verschillende jaren kan belastingvoordeel opleveren.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          💼 <strong>Portfolio spreiding:</strong> 
                          Mix van dividend- en groeiaandelen optimaliseert belastingefficiëntie.
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

      {/* Authority Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} />}
      </section>

      {/* Rate Comparison Widget */}
      <RateComparisonWidget productType="aandelen-belegging" title="Vergelijk Broker Tarieven" />

      {/* Bottom Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GoogleAdsense slot="banner" className="w-full max-w-4xl mx-auto" />
      </section>

      <Footer />
    </div>
  );
}