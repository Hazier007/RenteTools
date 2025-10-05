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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ComposedChart } from 'recharts';
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

interface InvestmentScenario {
  naam: string;
  dividendInkomsten: number;
  kapitaalWinsten: number;
  rekeningType: 'gewoon' | 'pensioensparen' | 'langetermijnsparen';
  assetType: 'aandelen' | 'obligaties' | 'etf' | 'reit' | 'crypto';
  bronland: 'België' | 'Nederland' | 'Duitsland' | 'Frankrijk' | 'VS' | 'Andere';
}

interface TaxCalculation {
  brutoDividend: number;
  bronheffing: number;
  belgischeBelasting: number;
  terugvordering: number;
  nettoDividend: number;
  effectieveTax: number;
}

export default function BelgischeBeleggingsfiscaliteitCalculatorPage() {
  const seoConfig = getSeoConfig("belgische-beleggingsfiscaliteit-calculator");
  useSeoTags("belgische-beleggingsfiscaliteit-calculator");

  const [fiscaleData, setFiscaleData] = useState({
    jaarlijkseInkomsten: 75000,
    belastingSchijf: '45%', // marginaal tarief
    rekeningType: 'gewoon',
    leeftijd: 35,
    pensioenspaarBijdrage: 1310, // max aftrekbaar bedrag
    langetermijnspaarBijdrage: 2390,
    buitenlandseInvesteringen: 15000,
    totalePortfolio: 150000
  });

  const [investeringsScenarios, setInvesteringsScenarios] = useState<InvestmentScenario[]>([
    {
      naam: "Belgische aandelen",
      dividendInkomsten: 2500,
      kapitaalWinsten: 3000,
      rekeningType: 'gewoon',
      assetType: 'aandelen',
      bronland: 'België'
    },
    {
      naam: "Nederlandse ETF's",
      dividendInkomsten: 1800,
      kapitaalWinsten: 2200,
      rekeningType: 'gewoon',
      assetType: 'etf',
      bronland: 'Nederland'
    },
    {
      naam: "Duitse obligaties",
      dividendInkomsten: 800,
      kapitaalWinsten: 0,
      rekeningType: 'gewoon',
      assetType: 'obligaties',
      bronland: 'Duitsland'
    },
    {
      naam: "Amerikaanse aandelen",
      dividendInkomsten: 1200,
      kapitaalWinsten: 1800,
      rekeningType: 'gewoon',
      assetType: 'aandelen',
      bronland: 'VS'
    },
    {
      naam: "Pensioensparen ETF",
      dividendInkomsten: 150,
      kapitaalWinsten: 200,
      rekeningType: 'pensioensparen',
      assetType: 'etf',
      bronland: 'België'
    }
  ]);

  // Tax rates by country and asset type
  const belastingTarieven = {
    'België': {
      'aandelen': { bronheffing: 30, verdrag: 0 },
      'obligaties': { bronheffing: 30, verdrag: 0 },
      'etf': { bronheffing: 30, verdrag: 0 },
      'reit': { bronheffing: 15, verdrag: 0 },
      'crypto': { bronheffing: 0, verdrag: 0 }
    },
    'Nederland': {
      'aandelen': { bronheffing: 15, verdrag: 15 },
      'obligaties': { bronheffing: 15, verdrag: 15 },
      'etf': { bronheffing: 15, verdrag: 15 },
      'reit': { bronheffing: 15, verdrag: 15 },
      'crypto': { bronheffing: 0, verdrag: 0 }
    },
    'Duitsland': {
      'aandelen': { bronheffing: 26.375, verdrag: 15 },
      'obligaties': { bronheffing: 26.375, verdrag: 15 },
      'etf': { bronheffing: 26.375, verdrag: 15 },
      'reit': { bronheffing: 26.375, verdrag: 15 },
      'crypto': { bronheffing: 0, verdrag: 0 }
    },
    'Frankrijk': {
      'aandelen': { bronheffing: 30, verdrag: 15 },
      'obligaties': { bronheffing: 30, verdrag: 15 },
      'etf': { bronheffing: 30, verdrag: 15 },
      'reit': { bronheffing: 30, verdrag: 15 },
      'crypto': { bronheffing: 0, verdrag: 0 }
    },
    'VS': {
      'aandelen': { bronheffing: 30, verdrag: 15 },
      'obligaties': { bronheffing: 30, verdrag: 0 },
      'etf': { bronheffing: 30, verdrag: 15 },
      'reit': { bronheffing: 30, verdrag: 15 },
      'crypto': { bronheffing: 0, verdrag: 0 }
    },
    'Andere': {
      'aandelen': { bronheffing: 30, verdrag: 30 },
      'obligaties': { bronheffing: 30, verdrag: 30 },
      'etf': { bronheffing: 30, verdrag: 30 },
      'reit': { bronheffing: 30, verdrag: 30 },
      'crypto': { bronheffing: 0, verdrag: 0 }
    }
  };

  // Calculate tax for each scenario
  const berekenBelasting = (scenario: InvestmentScenario): TaxCalculation => {
    const tarieven = belastingTarieven[scenario.bronland][scenario.assetType];
    
    // Special rules for pension accounts
    if (scenario.rekeningType === 'pensioensparen' || scenario.rekeningType === 'langetermijnsparen') {
      return {
        brutoDividend: scenario.dividendInkomsten,
        bronheffing: 0,
        belgischeBelasting: 0,
        terugvordering: 0,
        nettoDividend: scenario.dividendInkomsten,
        effectieveTax: 0
      };
    }

    const brutoDividend = scenario.dividendInkomsten;
    const bronheffing = brutoDividend * (tarieven.bronheffing / 100);
    const belgischeBelasting = brutoDividend * 0.30; // 30% roerende voorheffing België
    const terugvordering = Math.max(0, bronheffing - (brutoDividend * (tarieven.verdrag / 100)));
    
    // Net dividend after all taxes
    const nettoDividend = brutoDividend - Math.min(bronheffing, belgischeBelasting);
    const effectieveTax = ((brutoDividend - nettoDividend) / brutoDividend) * 100;

    return {
      brutoDividend,
      bronheffing,
      belgischeBelasting,
      terugvordering,
      nettoDividend,
      effectieveTax
    };
  };

  // Calculate total tax impact
  const totaalBelastingImpact = () => {
    const berekeningen = investeringsScenarios.map(scenario => ({
      scenario,
      belasting: berekenBelasting(scenario)
    }));

    const totaalBruto = berekeningen.reduce((sum, item) => sum + item.belasting.brutoDividend, 0);
    const totaalNetto = berekeningen.reduce((sum, item) => sum + item.belasting.nettoDividend, 0);
    const totaalBelasting = totaalBruto - totaalNetto;
    const gemiddeldeRate = (totaalBelasting / totaalBruto) * 100;

    // Calculate pension savings tax benefits
    const pensioenBelastingVoordeel = fiscaleData.pensioenspaarBijdrage * 
      (parseInt(fiscaleData.belastingSchijf.replace('%', '')) / 100);
    
    const langetermijnBelastingVoordeel = fiscaleData.langetermijnspaarBijdrage * 
      (parseInt(fiscaleData.belastingSchijf.replace('%', '')) / 100);

    return {
      berekeningen,
      totaalBruto,
      totaalNetto,
      totaalBelasting,
      gemiddeldeRate,
      pensioenBelastingVoordeel,
      langetermijnBelastingVoordeel
    };
  };

  const belastingAnalyse = totaalBelastingImpact();

  // Optimization strategies
  const optimalisatieStrategieën = [
    {
      strategie: "Pensioensparen Maximaliseren",
      beschrijving: "Maximaal gebruik van pensioenspaarrekening",
      huidigVoordeel: belastingAnalyse.pensioenBelastingVoordeel,
      potentieelVoordeel: 1310 * (parseInt(fiscaleData.belastingSchijf.replace('%', '')) / 100),
      implementatie: "Verhoog bijdrage tot €1.310 (2024) voor 30% belastingaftrek"
    },
    {
      strategie: "Langetermijnsparen Benutten",
      beschrijving: "Gebruik langetermijnspaarrekening voor ETF beleggingen",
      huidigVoordeel: belastingAnalyse.langetermijnBelastingVoordeel,
      potentieelVoordeel: 2390 * (parseInt(fiscaleData.belastingSchijf.replace('%', '')) / 100),
      implementatie: "Beleg €2.390 via langetermijnsparen met lagere eindbelasting"
    },
    {
      strategie: "Domicilie Optimalisatie",
      beschrijving: "Kies ETF's gedomicilieerd in Ierland/Luxemburg",
      huidigVoordeel: 0,
      potentieelVoordeel: belastingAnalyse.totaalBelasting * 0.15,
      implementatie: "Vermijd VS ETF's, kies Europese domicilie voor lagere bronheffing"
    },
    {
      strategie: "Dividend vs Growth",
      beschrijving: "Focus op groei aandelen i.p.v. dividend aandelen",
      huidigVoordeel: 0,
      potentieelVoordeel: belastingAnalyse.totaalBelasting * 0.3,
      implementatie: "Kapitaalwinsten zijn vrijgesteld, dividenden belast met 30%"
    },
    {
      strategie: "Tax Loss Harvesting",
      beschrijving: "Verkoop verliesposities voor compensatie",
      huidigVoordeel: 0,
      potentieelVoordeel: 500,
      implementatie: "Crystalliseer verliezen in december, herbuy in januari"
    }
  ];

  // Generate tax comparison chart data
  const belastingVergelijkingData = investeringsScenarios.map(scenario => {
    const berekening = berekenBelasting(scenario);
    return {
      naam: scenario.naam,
      bruto: berekening.brutoDividend,
      belasting: berekening.brutoDividend - berekening.nettoDividend,
      netto: berekening.nettoDividend,
      rate: berekening.effectieveTax
    };
  });

  // Account type benefits comparison
  const rekeningTypeVergelijking = [
    {
      type: "Gewone Rekening",
      belastingAftrek: 0,
      dividendBelasting: 30,
      kapitaalWinst: 0,
      flexibiliteit: "Volledig",
      maxBijdrage: "Onbeperkt",
      kleur: "#8884d8"
    },
    {
      type: "Pensioensparen",
      belastingAftrek: parseInt(fiscaleData.belastingSchijf.replace('%', '')),
      dividendBelasting: 0,
      kapitaalWinst: 0,
      flexibiliteit: "Beperkt tot 60 jaar",
      maxBijdrage: "€1.310",
      kleur: "#82ca9d"
    },
    {
      type: "Langetermijnsparen",
      belastingAftrek: parseInt(fiscaleData.belastingSchijf.replace('%', '')),
      dividendBelasting: 0,
      kapitaalWinst: 10, // eindbelasting
      flexibiliteit: "Beperkt 8 jaar",
      maxBijdrage: "€2.390",
      kleur: "#ffc658"
    }
  ];

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
              Belgische Beleggingsfiscaliteit Calculator
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Optimaliseer uw beleggingsbelastingen met geavanceerde berekeningen voor roerende voorheffing, 
              dubbele belastingverdragen en fiscale strategieën.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Roerende Voorheffing
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Pensioensparen
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Belastingoptimalisatie
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
            
            {/* Personal Tax Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-file-invoice-dollar mr-3 text-primary"></i>
                  Persoonlijke Gegevens
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="jaarlijkseInkomsten">Jaarlijkse inkomsten (€)</Label>
                  <Input
                    id="jaarlijkseInkomsten"
                    type="number"
                    value={fiscaleData.jaarlijkseInkomsten}
                    onChange={(e) => setFiscaleData({...fiscaleData, jaarlijkseInkomsten: Number(e.target.value)})}
                    data-testid="input-jaarlijkse-inkomsten"
                  />
                </div>

                <div>
                  <Label htmlFor="belastingSchijf">Marginaal belastingtarief</Label>
                  <Select value={fiscaleData.belastingSchijf} onValueChange={(value) => setFiscaleData({...fiscaleData, belastingSchijf: value})}>
                    <SelectTrigger data-testid="select-belasting-schijf">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25%">25% (€15.200 - €26.830)</SelectItem>
                      <SelectItem value="40%">40% (€26.830 - €46.440)</SelectItem>
                      <SelectItem value="45%">45% (€46.440+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="leeftijd">Leeftijd</Label>
                  <Input
                    id="leeftijd"
                    type="number"
                    value={fiscaleData.leeftijd}
                    onChange={(e) => setFiscaleData({...fiscaleData, leeftijd: Number(e.target.value)})}
                    data-testid="input-leeftijd"
                  />
                </div>

                <div>
                  <Label htmlFor="totalePortfolio">Totale portfolio (€)</Label>
                  <Input
                    id="totalePortfolio"
                    type="number"
                    value={fiscaleData.totalePortfolio}
                    onChange={(e) => setFiscaleData({...fiscaleData, totalePortfolio: Number(e.target.value)})}
                    data-testid="input-totale-portfolio"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Retirement Savings */}
            <Card>
              <CardHeader>
                <CardTitle>Pensioensparen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="pensioenspaarBijdrage">Pensioenspaar bijdrage (€)</Label>
                  <Input
                    id="pensioenspaarBijdrage"
                    type="number"
                    value={fiscaleData.pensioenspaarBijdrage}
                    onChange={(e) => setFiscaleData({...fiscaleData, pensioenspaarBijdrage: Number(e.target.value)})}
                    data-testid="input-pensioenspaar-bijdrage"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Maximum: €1.310 (belastingjaar 2024)
                  </p>
                </div>

                <div>
                  <Label htmlFor="langetermijnspaarBijdrage">Langetermijnspaar bijdrage (€)</Label>
                  <Input
                    id="langetermijnspaarBijdrage"
                    type="number"
                    value={fiscaleData.langetermijnspaarBijdrage}
                    onChange={(e) => setFiscaleData({...fiscaleData, langetermijnspaarBijdrage: Number(e.target.value)})}
                    data-testid="input-langetermijnspaar-bijdrage"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Maximum: €2.390 (belastingjaar 2024)
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span>Pensioen aftrek:</span>
                      <span className="font-semibold">€{Math.round(belastingAnalyse.pensioenBelastingVoordeel)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Langetermijn aftrek:</span>
                      <span className="font-semibold">€{Math.round(belastingAnalyse.langetermijnBelastingVoordeel)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-1 mt-1">
                      <span>Totaal voordeel:</span>
                      <span className="font-bold">€{Math.round(belastingAnalyse.pensioenBelastingVoordeel + belastingAnalyse.langetermijnBelastingVoordeel)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Foreign Investments */}
            <Card>
              <CardHeader>
                <CardTitle>Buitenlandse Beleggingen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="buitenlandseInvesteringen">Buitenlands vermogen (€)</Label>
                  <Input
                    id="buitenlandseInvesteringen"
                    type="number"
                    value={fiscaleData.buitenlandseInvesteringen}
                    onChange={(e) => setFiscaleData({...fiscaleData, buitenlandseInvesteringen: Number(e.target.value)})}
                    data-testid="input-buitenlandse-investeringen"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Aangifteplicht vanaf €500.000
                  </p>
                </div>

                {fiscaleData.buitenlandseInvesteringen > 500000 && (
                  <Alert>
                    <AlertDescription>
                      ⚠️ <strong>Aangifteplicht:</strong> U moet uw buitenlands vermogen aangeven 
                      in uw jaarlijkse belastingaangifte.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Tax Summary */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Totaal Dividend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600" data-testid="text-totaal-dividend">
                    €{Math.round(belastingAnalyse.totaalBruto).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Bruto dividend inkomsten</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Totaal Belasting</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600" data-testid="text-totaal-belasting">
                    €{Math.round(belastingAnalyse.totaalBelasting).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Roerende voorheffing</p>
                  <div className="mt-2 text-sm">
                    Effectief tarief: {belastingAnalyse.gemiddeldeRate.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Netto Dividend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600" data-testid="text-netto-dividend">
                    €{Math.round(belastingAnalyse.totaalNetto).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Na belastingen</p>
                  <div className="mt-2 text-sm">
                    Behouden: {((belastingAnalyse.totaalNetto / belastingAnalyse.totaalBruto) * 100).toFixed(1)}%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pensioen Voordeel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600" data-testid="text-pensioen-voordeel">
                    €{Math.round(belastingAnalyse.pensioenBelastingVoordeel + belastingAnalyse.langetermijnBelastingVoordeel).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Belastingaftrek</p>
                  <div className="mt-2 text-sm">
                    Effectief rendement bonus
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tax Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Belasting Impact per Investering</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={belastingVergelijkingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="naam" angle={-45} textAnchor="end" height={80} />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip 
                        formatter={(value: number, name: string) => [
                          name === 'rate' ? `${value.toFixed(1)}%` : `€${Math.round(value).toLocaleString()}`,
                          name === 'bruto' ? 'Bruto Dividend' :
                          name === 'belasting' ? 'Belasting' :
                          name === 'netto' ? 'Netto Dividend' :
                          name === 'rate' ? 'Belastingtarief' : name
                        ]}
                      />
                      <Bar yAxisId="left" dataKey="bruto" fill="#3b82f6" />
                      <Bar yAxisId="left" dataKey="belasting" fill="#ef4444" />
                      <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Analysis */}
            <Tabs defaultValue="scenarios" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="scenarios">Investment Scenarios</TabsTrigger>
                <TabsTrigger value="optimalisatie">Optimalisatie</TabsTrigger>
                <TabsTrigger value="rekeningen">Rekening Types</TabsTrigger>
                <TabsTrigger value="verdragen">Belastingverdragen</TabsTrigger>
              </TabsList>

              <TabsContent value="scenarios" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Belasting Berekening per Scenario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Investering</th>
                            <th className="text-right p-2">Bruto Dividend</th>
                            <th className="text-right p-2">Bronheffing</th>
                            <th className="text-right p-2">BE Belasting</th>
                            <th className="text-right p-2">Netto Dividend</th>
                            <th className="text-right p-2">Effectief Tarief</th>
                          </tr>
                        </thead>
                        <tbody>
                          {belastingAnalyse.berekeningen.map((item, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2">
                                <div>
                                  <div className="font-medium">{item.scenario.naam}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {item.scenario.bronland} - {item.scenario.assetType}
                                  </div>
                                </div>
                              </td>
                              <td className="p-2 text-right">€{Math.round(item.belasting.brutoDividend).toLocaleString()}</td>
                              <td className="p-2 text-right">€{Math.round(item.belasting.bronheffing).toLocaleString()}</td>
                              <td className="p-2 text-right">€{Math.round(item.belasting.belgischeBelasting).toLocaleString()}</td>
                              <td className="p-2 text-right font-semibold">€{Math.round(item.belasting.nettoDividend).toLocaleString()}</td>
                              <td className="p-2 text-right">
                                <Badge variant={item.belasting.effectieveTax > 25 ? 'destructive' : 'secondary'}>
                                  {item.belasting.effectieveTax.toFixed(1)}%
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="optimalisatie" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Belastingoptimalisatie Strategieën</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {optimalisatieStrategieën.map((strategie, index) => (
                        <div key={index} className="border rounded p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold">{strategie.strategie}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{strategie.beschrijving}</p>
                              <p className="text-sm mt-2">{strategie.implementatie}</p>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-lg font-bold text-green-600">
                                €{Math.round(strategie.potentieelVoordeel - strategie.huidigVoordeel)}
                              </div>
                              <div className="text-sm text-muted-foreground">Potentieel extra</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Jaarlijkse Optimalisatie Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Alert>
                        <AlertDescription>
                          📅 <strong>December:</strong> Verkoop verlieslatende posities voor tax loss harvesting
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          💰 <strong>Januari:</strong> Maximeer pensioensparen en langetermijnsparen bijdragen
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          🌍 <strong>Portfolio Review:</strong> Controleer domicilie van internationale fondsen
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          📊 <strong>Rebalancing:</strong> Verkoop winnaars in plaats van dividend ontvangen
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rekeningen" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Belgische Rekening Types Vergelijking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Rekening Type</th>
                            <th className="text-right p-2">Belasting Aftrek</th>
                            <th className="text-right p-2">Dividend Belasting</th>
                            <th className="text-right p-2">Kapitaalwinst</th>
                            <th className="text-left p-2">Flexibiliteit</th>
                            <th className="text-right p-2">Max Bijdrage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rekeningTypeVergelijking.map((rekening, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2 font-medium">{rekening.type}</td>
                              <td className="p-2 text-right">{rekening.belastingAftrek}%</td>
                              <td className="p-2 text-right">{rekening.dividendBelasting}%</td>
                              <td className="p-2 text-right">{rekening.kapitaalWinst}%</td>
                              <td className="p-2">{rekening.flexibiliteit}</td>
                              <td className="p-2 text-right">{rekening.maxBijdrage}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Aanbevelingen per Leeftijdsgroep</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded p-4">
                        <h4 className="font-semibold">20-35 jaar: Jonge Belegger</h4>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>• Prioriteit: Langetermijnsparen (flexibeler dan pensioensparen)</li>
                          <li>• Focus op groei ETF's met lage dividend yield</li>
                          <li>• Kapitaalwinsten vrijgesteld = tax efficient</li>
                          <li>• Gewone rekening voor emergency fund</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded p-4">
                        <h4 className="font-semibold">35-50 jaar: Opbouw Fase</h4>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>• Maximeer beide: pensioensparen + langetermijnsparen</li>
                          <li>• Mix van groei en dividend fondsen</li>
                          <li>• Begin estate planning overwegingen</li>
                          <li>• Diversificatie over rekening types</li>
                        </ul>
                      </div>
                      
                      <div className="border rounded p-4">
                        <h4 className="font-semibold">50+ jaar: Pre-Pensioen</h4>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>• Maximeer pensioensparen voor immediate aftrek</li>
                          <li>• Shift naar dividend-genererende assets</li>
                          <li>• Overweeg bridge strategy voor vroegpensioen</li>
                          <li>• Estate planning en successierechten</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="verdragen" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dubbele Belastingverdragen Overzicht</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Land</th>
                            <th className="text-right p-2">Standaard Bronheffing</th>
                            <th className="text-right p-2">Verdrag Tarief</th>
                            <th className="text-right p-2">Effectieve Belasting</th>
                            <th className="text-left p-2">Aanbeveling</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(belastingTarieven).map(([land, tarieven], index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2 font-medium">{land}</td>
                              <td className="p-2 text-right">{tarieven.aandelen.bronheffing}%</td>
                              <td className="p-2 text-right">{tarieven.aandelen.verdrag}%</td>
                              <td className="p-2 text-right">
                                <Badge variant={
                                  Math.min(tarieven.aandelen.bronheffing, 30) <= 15 ? 'default' : 'secondary'
                                }>
                                  {Math.min(tarieven.aandelen.bronheffing, 30)}%
                                </Badge>
                              </td>
                              <td className="p-2">
                                {tarieven.aandelen.verdrag === 15 ? '✅ Gunstig' : 
                                 tarieven.aandelen.verdrag === 0 ? '⚠️ Obligaties voorzichtig' : 
                                 '❌ Vermijden'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Optimale Domicilie Strategieën</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Alert>
                        <AlertDescription>
                          🇮🇪 <strong>Ierland:</strong> Populairste domicilie voor UCITS ETF's. 
                          Geen bronheffing bij verkoop, gunstige verdragen.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          🇱🇺 <strong>Luxemburg:</strong> Alternatief voor Ierland. 
                          Goede verdragstructuur, veel SICAV fondsen.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          🇺🇸 <strong>Verenigde Staten:</strong> Vermijd voor dividend-betalende assets. 
                          30% bronheffing, pas 15% na verdrag.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          🇳🇱 <strong>Nederland:</strong> Gunstig verdrag (15% bronheffing). 
                          Goede optie voor Nederlandse aandelen/fondsen.
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
      <RateComparisonWidget productType="belasting-optimalisatie" title="Vergelijk Fiscale Dienstverleners" />

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