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
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";
import RelatedCalculators from "@/components/seo/RelatedCalculators";

interface REITData {
  naam: string;
  type: string;
  huidigeKoers: number;
  nav: number; // Net Asset Value
  ffo: number; // Funds From Operations per share
  affo: number; // Adjusted FFO per share
  dividendYield: number;
  dividendPerAandeel: number;
  payout: number; // Payout ratio
  debtToEquity: number;
  occupancyRate: number;
  regio: string;
  marktKap: number;
  kleur: string;
}

interface InterestRateScenario {
  rente: number;
  verwachtImpact: number;
  beschrijving: string;
}

export default function REITCalculatorPage() {
  const seoConfig = getSeoConfig("reit-calculator");
  useSeoTags("reit-calculator");

  const [reitInvestering, setReitInvestering] = useState({
    investeringsBedrag: 50000,
    reitType: 'commercieel',
    geografischeVerdeling: 'Europa',
    risicoTolerantie: 5, // 1-10
    dividendHerbelegging: true,
    investeringsHorizon: 10,
    huidigeRente: 4.0,
    inflatie: 2.5
  });

  // Sample REIT portfolio data
  const reitPortfolio: REITData[] = [
    {
      naam: "Warehouses De Pauw",
      type: "Logistiek",
      huidigeKoers: 28.50,
      nav: 32.10,
      ffo: 2.85,
      affo: 2.65,
      dividendYield: 7.2,
      dividendPerAandeel: 2.05,
      payout: 77,
      debtToEquity: 0.42,
      occupancyRate: 98.5,
      regio: "België",
      marktKap: 920,
      kleur: "#8884d8"
    },
    {
      naam: "Cofinimmo",
      type: "Zorgvastgoed",
      huidigeKoers: 82.40,
      nav: 95.20,
      ffo: 7.15,
      affo: 6.85,
      dividendYield: 6.8,
      dividendPerAandeel: 5.60,
      payout: 82,
      debtToEquity: 0.48,
      occupancyRate: 96.2,
      regio: "Europa",
      marktKap: 2100,
      kleur: "#82ca9d"
    },
    {
      naam: "Aedifica",
      type: "Zorgvastgoed",
      huidigeKoers: 58.20,
      nav: 71.50,
      ffo: 5.45,
      affo: 5.20,
      dividendYield: 7.5,
      dividendPerAandeel: 4.37,
      payout: 84,
      debtToEquity: 0.45,
      occupancyRate: 97.8,
      regio: "Europa",
      marktKap: 1850,
      kleur: "#ffc658"
    },
    {
      naam: "Montea",
      type: "Logistiek",
      huidigeKoers: 76.80,
      nav: 84.30,
      ffo: 6.20,
      affo: 5.95,
      dividendYield: 6.9,
      dividendPerAandeel: 5.30,
      payout: 89,
      debtToEquity: 0.38,
      occupancyRate: 99.1,
      regio: "Europa",
      marktKap: 1650,
      kleur: "#ff7300"
    },
    {
      naam: "Xior Student Housing",
      type: "Studentenhuisvesting",
      huidigeKoers: 42.60,
      nav: 49.80,
      ffo: 3.85,
      affo: 3.65,
      dividendYield: 6.2,
      dividendPerAandeel: 2.64,
      payout: 72,
      debtToEquity: 0.52,
      occupancyRate: 94.7,
      regio: "Europa",
      marktKap: 890,
      kleur: "#8dd1e1"
    }
  ];

  // Calculate portfolio metrics
  const berekenREITMetrics = () => {
    const investeringPerREIT = reitInvestering.investeringsBedrag / reitPortfolio.length;
    
    const portfolioStats = reitPortfolio.map(reit => {
      const aantalAandelen = investeringPerREIT / reit.huidigeKoers;
      const jaarlijkseDividend = aantalAandelen * reit.dividendPerAandeel;
      const navDiscount = ((reit.nav - reit.huidigeKoers) / reit.nav) * 100;
      const priceToFFO = reit.huidigeKoers / reit.ffo;
      const priceToAFFO = reit.huidigeKoers / reit.affo;
      
      return {
        ...reit,
        investering: investeringPerREIT,
        aantalAandelen,
        jaarlijkseDividend,
        navDiscount,
        priceToFFO,
        priceToAFFO
      };
    });

    // Portfolio totals
    const totaalJaarlijkseDividend = portfolioStats.reduce((sum, reit) => sum + reit.jaarlijkseDividend, 0);
    const gewogenGemiddeldeDividendYield = (totaalJaarlijkseDividend / reitInvestering.investeringsBedrag) * 100;
    const gewogenGemiddeldeNAVDiscount = portfolioStats.reduce((sum, reit) => 
      sum + (reit.navDiscount * (reit.investering / reitInvestering.investeringsBedrag)), 0);
    const gewogenGemiddeldePayout = portfolioStats.reduce((sum, reit) => 
      sum + (reit.payout * (reit.investering / reitInvestering.investeringsBedrag)), 0);
    const gewogenGemiddeldeOccupancy = portfolioStats.reduce((sum, reit) => 
      sum + (reit.occupancyRate * (reit.investering / reitInvestering.investeringsBedrag)), 0);

    // Generate future projections
    const projectieData = [];
    let cumulatiefDividend = 0;
    let portfolioWaarde = reitInvestering.investeringsBedrag;
    
    for (let jaar = 0; jaar <= reitInvestering.investeringsHorizon; jaar++) {
      if (jaar > 0) {
        const jaarlijkseDividend = portfolioWaarde * (gewogenGemiddeldeDividendYield / 100);
        cumulatiefDividend += jaarlijkseDividend;
        
        // Assume modest capital appreciation (inflation + 1%)
        const capitalAppreciation = (reitInvestering.inflatie + 1) / 100;
        portfolioWaarde *= (1 + capitalAppreciation);
        
        if (reitInvestering.dividendHerbelegging) {
          portfolioWaarde += jaarlijkseDividend;
        }
      }
      
      projectieData.push({
        jaar,
        portfolioWaarde: Math.round(portfolioWaarde),
        cumulatiefDividend: Math.round(cumulatiefDividend),
        totaalWaarde: Math.round(portfolioWaarde + (reitInvestering.dividendHerbelegging ? 0 : cumulatiefDividend))
      });
    }

    return {
      portfolioStats,
      totaalJaarlijkseDividend,
      gewogenGemiddeldeDividendYield,
      gewogenGemiddeldeNAVDiscount,
      gewogenGemiddeldePayout,
      gewogenGemiddeldeOccupancy,
      projectieData
    };
  };

  const reitMetrics = berekenREITMetrics();

  // Interest rate sensitivity analysis
  const renteScenarios: InterestRateScenario[] = [
    { rente: 2.0, verwachtImpact: 15, beschrijving: "Zeer lage rente - REITs presteren sterk" },
    { rente: 3.0, verwachtImpact: 8, beschrijving: "Lage rente - Positief voor REITs" },
    { rente: 4.0, verwachtImpact: 0, beschrijving: "Neutrale rente - Huidige niveau" },
    { rente: 5.0, verwachtImpact: -8, beschrijving: "Stijgende rente - Negatieve druk" },
    { rente: 6.0, verwachtImpact: -15, beschrijving: "Hoge rente - Aanzienlijke tegenwind" },
    { rente: 7.0, verwachtImpact: -25, beschrijving: "Zeer hoge rente - Sterke onderdruk" }
  ];

  // REIT type allocation recommendations
  const getAllocatieAanbeveling = (risicoScore: number) => {
    if (risicoScore <= 3) {
      return {
        profiel: "Conservatief",
        aanbeveling: {
          "Retail": 15,
          "Kantoren": 20,
          "Zorgvastgoed": 35,
          "Logistiek": 20,
          "Woningen": 10
        },
        beschrijving: "Focus op stabiele sectoren met lage volatiliteit"
      };
    } else if (risicoScore <= 6) {
      return {
        profiel: "Gematigd",
        aanbeveling: {
          "Retail": 20,
          "Kantoren": 25,
          "Zorgvastgoed": 25,
          "Logistiek": 20,
          "Woningen": 10
        },
        beschrijving: "Gebalanceerde spreiding over sectoren"
      };
    } else {
      return {
        profiel: "Agressief",
        aanbeveling: {
          "Retail": 25,
          "Kantoren": 20,
          "Zorgvastgoed": 15,
          "Logistiek": 25,
          "Woningen": 15
        },
        beschrijving: "Hoger aandeel cyclische sectoren"
      };
    }
  };

  const allocatieAdvies = getAllocatieAanbeveling(reitInvestering.risicoTolerantie);

  // Vergelijking directe vastgoed vs REITs
  const vastgoedVergelijking = {
    directVastgoed: {
      voordelen: [
        "Directe controle over eigendom",
        "Mogelijk hogere rendementen",
        "Geen management fees",
        "Belastingvoordelen (afschrijving)"
      ],
      nadelen: [
        "Hoge initiële investering",
        "Illiquiditeit",
        "Management vereist",
        "Geografische concentratie",
        "Transactiekosten"
      ]
    },
    reits: {
      voordelen: [
        "Lage toegangsdrempel",
        "Liquiditeit (dagelijks verhandelbaar)",
        "Professioneel management",
        "Diversificatie",
        "Dividend verplichtingen"
      ],
      nadelen: [
        "Management fees",
        "Marktvolatiliteit",
        "Geen directe controle",
        "Belastingheffing op dividenden",
        "Interest rate sensitivity"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              REIT Calculator België
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Analyseer vastgoed beleggingsfondsen (REITs) met FFO, AFFO en NAV berekeningen. 
              Vergelijk Belgische SICAFI en internationale vastgoed fondsen.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                FFO/AFFO Analyse
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Dividend Yield
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                NAV Waardering
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
            
            {/* Investment Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-building mr-3 text-primary"></i>
                  REIT Investering
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="investeringsBedrag">Investeringsbedrag (€)</Label>
                  <Input
                    id="investeringsBedrag"
                    type="number"
                    value={reitInvestering.investeringsBedrag}
                    onChange={(e) => setReitInvestering({...reitInvestering, investeringsBedrag: Number(e.target.value)})}
                    data-testid="input-investeringsbedrag"
                  />
                </div>

                <div>
                  <Label htmlFor="investeringsHorizon">Investeringshorizon (jaren)</Label>
                  <Input
                    id="investeringsHorizon"
                    type="number"
                    value={reitInvestering.investeringsHorizon}
                    onChange={(e) => setReitInvestering({...reitInvestering, investeringsHorizon: Number(e.target.value)})}
                    data-testid="input-investerings-horizon"
                  />
                </div>

                <div>
                  <Label htmlFor="reitType">Voorkeur REIT type</Label>
                  <Select value={reitInvestering.reitType} onValueChange={(value) => setReitInvestering({...reitInvestering, reitType: value})}>
                    <SelectTrigger data-testid="select-reit-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commercieel">Commercieel vastgoed</SelectItem>
                      <SelectItem value="woningen">Woningcorporaties</SelectItem>
                      <SelectItem value="zorgvastgoed">Zorgvastgoed</SelectItem>
                      <SelectItem value="logistiek">Logistiek vastgoed</SelectItem>
                      <SelectItem value="gemengd">Gemengde portfolio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="geografischeVerdeling">Geografische focus</Label>
                  <Select value={reitInvestering.geografischeVerdeling} onValueChange={(value) => setReitInvestering({...reitInvestering, geografischeVerdeling: value})}>
                    <SelectTrigger data-testid="select-geografische-verdeling">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="België">België (SICAFI)</SelectItem>
                      <SelectItem value="Europa">Europa</SelectItem>
                      <SelectItem value="VS">Verenigde Staten</SelectItem>
                      <SelectItem value="Global">Wereldwijd</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Dividend herbelegging</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="dividendHerbelegging"
                      checked={reitInvestering.dividendHerbelegging}
                      onChange={(e) => setReitInvestering({...reitInvestering, dividendHerbelegging: e.target.checked})}
                      data-testid="checkbox-dividend-herbelegging"
                    />
                    <Label htmlFor="dividendHerbelegging" className="text-sm">
                      Automatisch herbelegen
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Risico Profiel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Risico tolerantie: {reitInvestering.risicoTolerantie}/10</Label>
                  <Slider
                    value={[reitInvestering.risicoTolerantie]}
                    onValueChange={(value) => setReitInvestering({...reitInvestering, risicoTolerantie: value[0]})}
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
                  <div className="font-medium text-primary">
                    {allocatieAdvies.profiel}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {allocatieAdvies.beschrijving}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Conditions */}
            <Card>
              <CardHeader>
                <CardTitle>Markt Condities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="huidigeRente">Huidige rente (%)</Label>
                  <Input
                    id="huidigeRente"
                    type="number"
                    step="0.1"
                    value={reitInvestering.huidigeRente}
                    onChange={(e) => setReitInvestering({...reitInvestering, huidigeRente: Number(e.target.value)})}
                    data-testid="input-huidige-rente"
                  />
                </div>

                <div>
                  <Label htmlFor="inflatie">Verwachte inflatie (%)</Label>
                  <Input
                    id="inflatie"
                    type="number"
                    step="0.1"
                    value={reitInvestering.inflatie}
                    onChange={(e) => setReitInvestering({...reitInvestering, inflatie: Number(e.target.value)})}
                    data-testid="input-inflatie"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Portfolio Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Portfolio Yield</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600" data-testid="text-dividend-yield">
                    {reitMetrics.gewogenGemiddeldeDividendYield.toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Dividend yield</p>
                  <div className="mt-2 text-sm">
                    Jaarlijks: €{Math.round(reitMetrics.totaalJaarlijkseDividend).toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">NAV Discount</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600" data-testid="text-nav-discount">
                    {reitMetrics.gewogenGemiddeldeNAVDiscount.toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Gemiddelde korting</p>
                  <div className="mt-2 text-sm">
                    {reitMetrics.gewogenGemiddeldeNAVDiscount > 0 ? 'Premium' : 'Discount'} t.o.v. NAV
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payout Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600" data-testid="text-payout-ratio">
                    {reitMetrics.gewogenGemiddeldePayout.toFixed(0)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Gemiddelde payout</p>
                  <div className="mt-2 text-sm">
                    {reitMetrics.gewogenGemiddeldePayout > 90 ? 'Hoog risico' : 'Duurzaam'}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Occupancy Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600" data-testid="text-occupancy-rate">
                    {reitMetrics.gewogenGemiddeldeOccupancy.toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Bezettingsgraad</p>
                  <div className="mt-2 text-sm">
                    {reitMetrics.gewogenGemiddeldeOccupancy > 95 ? 'Uitstekend' : 'Goed'}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* REIT Portfolio Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>REIT Portfolio Samenstelling</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">REIT</th>
                        <th className="text-right p-2">Investering</th>
                        <th className="text-right p-2">Koers</th>
                        <th className="text-right p-2">NAV</th>
                        <th className="text-right p-2">P/FFO</th>
                        <th className="text-right p-2">Yield</th>
                        <th className="text-right p-2">Payout</th>
                        <th className="text-right p-2">Occupancy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reitMetrics.portfolioStats.map((reit, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-2">
                            <div>
                              <div className="font-medium">{reit.naam}</div>
                              <div className="text-xs text-muted-foreground">{reit.type} - {reit.regio}</div>
                            </div>
                          </td>
                          <td className="p-2 text-right">€{Math.round(reit.investering).toLocaleString()}</td>
                          <td className="p-2 text-right">€{reit.huidigeKoers.toFixed(2)}</td>
                          <td className="p-2 text-right">
                            €{reit.nav.toFixed(2)}
                            <div className={`text-xs ${reit.navDiscount < 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {reit.navDiscount.toFixed(1)}%
                            </div>
                          </td>
                          <td className="p-2 text-right">{reit.priceToFFO.toFixed(1)}x</td>
                          <td className="p-2 text-right">{reit.dividendYield.toFixed(1)}%</td>
                          <td className="p-2 text-right">{reit.payout}%</td>
                          <td className="p-2 text-right">{reit.occupancyRate.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Different Views */}
            <Tabs defaultValue="projectie" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="projectie">Portfolio Projectie</TabsTrigger>
                <TabsTrigger value="rente">Rente Gevoeligheid</TabsTrigger>
                <TabsTrigger value="sectoren">Sector Allocatie</TabsTrigger>
                <TabsTrigger value="vergelijking">Direct vs REIT</TabsTrigger>
              </TabsList>

              <TabsContent value="projectie" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Groei Projectie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={reitMetrics.projectieData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="jaar" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
                          <Area type="monotone" dataKey="portfolioWaarde" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                          {!reitInvestering.dividendHerbelegging && (
                            <Area type="monotone" dataKey="cumulatiefDividend" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.4} />
                          )}
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Projectie Details ({reitInvestering.investeringsHorizon} jaar)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-primary">
                          €{Math.round(reitMetrics.projectieData[reitMetrics.projectieData.length - 1].portfolioWaarde).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Portfolio waarde</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600">
                          €{Math.round(reitMetrics.projectieData[reitMetrics.projectieData.length - 1].cumulatiefDividend).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Totaal dividenden</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-purple-600">
                          €{Math.round(reitMetrics.projectieData[reitMetrics.projectieData.length - 1].totaalWaarde).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Totaal rendement</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rente" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Rentegevoeligheid Analyse</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={renteScenarios}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="rente" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number) => [`${value}%`, 'Impact op REIT prijs']}
                            labelFormatter={(label) => `Rente: ${label}%`}
                          />
                          <Bar dataKey="verwachtImpact" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Rente Scenario Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {renteScenarios.map((scenario, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <div className="font-medium">{scenario.rente}% rente</div>
                            <div className="text-sm text-muted-foreground">{scenario.beschrijving}</div>
                          </div>
                          <div className={`text-lg font-bold ${scenario.verwachtImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {scenario.verwachtImpact >= 0 ? '+' : ''}{scenario.verwachtImpact}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sectoren" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Aanbevolen Sector Allocatie</CardTitle>
                    <p className="text-muted-foreground">
                      Gebaseerd op {allocatieAdvies.profiel} risicoprofiel
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={Object.entries(allocatieAdvies.aanbeveling).map(([sector, percentage]) => ({
                                name: sector,
                                value: percentage
                              }))}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, value }) => `${name} ${value}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {Object.entries(allocatieAdvies.aanbeveling).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`hsl(${index * 72}, 70%, 50%)`} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => [`${value}%`]} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="space-y-3">
                        {Object.entries(allocatieAdvies.aanbeveling).map(([sector, percentage], index) => (
                          <div key={sector} className="flex justify-between items-center">
                            <span className="text-sm">{sector}</span>
                            <span className="font-semibold">{percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sector Kenmerken</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-3">
                        <div>
                          <strong>Retail REITs:</strong>
                          <p className="text-muted-foreground">Winkelcentra, high street retail. Gevoelig voor e-commerce trends.</p>
                        </div>
                        <div>
                          <strong>Kantoren:</strong>
                          <p className="text-muted-foreground">Kantoorgebouwen. Impact door thuiswerken en ESG vereisten.</p>
                        </div>
                        <div>
                          <strong>Zorgvastgoed:</strong>
                          <p className="text-muted-foreground">Ziekenhuizen, zorgcentra. Stabiel door demografische trends.</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <strong>Logistiek:</strong>
                          <p className="text-muted-foreground">Distributiecentra, magazijnen. Groei door e-commerce.</p>
                        </div>
                        <div>
                          <strong>Woningen:</strong>
                          <p className="text-muted-foreground">Huurwoningen, sociale woningbouw. Stabiele huurinkomsten.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vergelijking" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Direct Vastgoed vs REITs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-green-700">Direct Vastgoed</h4>
                        <div className="space-y-3">
                          <div>
                            <h5 className="font-medium text-sm">Voordelen:</h5>
                            <ul className="text-sm space-y-1">
                              {vastgoedVergelijking.directVastgoed.voordelen.map((voordeel, index) => (
                                <li key={index}>• {voordeel}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">Nadelen:</h5>
                            <ul className="text-sm space-y-1">
                              {vastgoedVergelijking.directVastgoed.nadelen.map((nadeel, index) => (
                                <li key={index}>• {nadeel}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-blue-700">REITs</h4>
                        <div className="space-y-3">
                          <div>
                            <h5 className="font-medium text-sm">Voordelen:</h5>
                            <ul className="text-sm space-y-1">
                              {vastgoedVergelijking.reits.voordelen.map((voordeel, index) => (
                                <li key={index}>• {voordeel}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">Nadelen:</h5>
                            <ul className="text-sm space-y-1">
                              {vastgoedVergelijking.reits.nadelen.map((nadeel, index) => (
                                <li key={index}>• {nadeel}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Belgische SICAFI Specificaties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Alert>
                        <AlertDescription>
                          🏛️ <strong>SICAFI (Belgische REIT):</strong> Minimum 80% dividenduitkering, 
                          geen vennootschapsbelasting op vastgoedactiviteiten.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          💰 <strong>Belastingvoordeel:</strong> 15% roerende voorheffing op dividenden 
                          i.p.v. 30% voor gewone aandelen.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          📊 <strong>Transparantie:</strong> Kwartaalrapportage en onafhankelijke 
                          vastgoedwaardering vereist.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          🌍 <strong>Geografische spreiding:</strong> Belgische SICAFI's mogen 
                          wereldwijd beleggen sinds wetgeving 2014.
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
      <RateComparisonWidget productType="reit-belegging" title="Vergelijk REIT Beleggingsplatforms" />

      {/* Bottom Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GoogleAdsense slot="banner" className="w-full max-w-4xl mx-auto" />
      </section>

      {/* Related Calculators */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <RelatedCalculators currentSlug="reit-calculator" />
      </section>

      {/* Authority Links */}
      {seoConfig && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AuthorityLinks links={seoConfig.authorityLinks} />
        </section>
      )}

      <Footer />
    </div>
  );
}