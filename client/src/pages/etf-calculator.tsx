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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";

interface ETF {
  id: string;
  naam: string;
  isin: string;
  ter: number;
  trackingError: number;
  dividendBeleid: string;
  onderliggendeIndex: string;
  domicilie: string;
  valuta: string;
}

export default function ETFCalculatorPage() {
  const seoConfig = getSeoConfig("etf-calculator");

  useEffect(() => {
    document.title = "ETF Calculator België - Index Fondsen Vergelijken";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Vergelijk ETFs en bereken rendement inclusief kosten. Analyseer tracking error, dividend yield en fiscale impact van index fondsen in België.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Vergelijk ETFs en bereken rendement inclusief kosten. Analyseer tracking error, dividend yield en fiscale impact van index fondsen in België.';
      document.head.appendChild(meta);
    }
  }, []);

  const [belegging, setBelegging] = useState({
    startBedrag: 10000,
    maandelijkseBijdrage: 500,
    verwachtRendement: 7.0,
    beleggingsHorizon: 15,
    roerendeVoorheffing: 30,
    transactiekostenPercentage: 0.1,
    transactiekostenVast: 2.5
  });

  const [gekozenETF, setGekozenETF] = useState<string>("IWDA");
  const [vergelijkingsETFs, setVergelijkingsETFs] = useState<string[]>(["VWCE", "SWRD"]);

  // Popular ETFs for Belgian investors
  const popularETFs: ETF[] = [
    {
      id: "IWDA",
      naam: "iShares Core MSCI World UCITS ETF",
      isin: "IE00B4L5Y983",
      ter: 0.20,
      trackingError: 0.12,
      dividendBeleid: "Accumulating",
      onderliggendeIndex: "MSCI World",
      domicilie: "Ireland",
      valuta: "USD"
    },
    {
      id: "VWCE",
      naam: "Vanguard FTSE All-World UCITS ETF",
      isin: "IE00BK5BQT80",
      ter: 0.22,
      trackingError: 0.15,
      dividendBeleid: "Accumulating",
      onderliggendeIndex: "FTSE All-World",
      domicilie: "Ireland",
      valuta: "USD"
    },
    {
      id: "SWRD",
      naam: "SPDR MSCI World UCITS ETF",
      isin: "IE00BFY0GT14",
      ter: 0.12,
      trackingError: 0.08,
      dividendBeleid: "Accumulating",
      onderliggendeIndex: "MSCI World",
      domicilie: "Ireland",
      valuta: "USD"
    },
    {
      id: "VUSA",
      naam: "Vanguard S&P 500 UCITS ETF",
      isin: "IE00B3XXRP09",
      ter: 0.07,
      trackingError: 0.05,
      dividendBeleid: "Accumulating",
      onderliggendeIndex: "S&P 500",
      domicilie: "Ireland",
      valuta: "USD"
    },
    {
      id: "EIMI",
      naam: "iShares Core MSCI Emerging Markets UCITS ETF",
      isin: "IE00BKM4GZ66",
      ter: 0.18,
      trackingError: 0.25,
      dividendBeleid: "Accumulating",
      onderliggendeIndex: "MSCI Emerging Markets",
      domicilie: "Ireland",
      valuta: "USD"
    }
  ];

  const geselecteerdeETF = popularETFs.find(etf => etf.id === gekozenETF) || popularETFs[0];

  // Calculate ETF investment simulation
  const berekenETFBelegging = () => {
    const maanden = belegging.beleggingsHorizon * 12;
    const maandRendement = belegging.verwachtRendement / 100 / 12;
    const maandTER = geselecteerdeETF.ter / 100 / 12;
    const nettoMaandRendement = maandRendement - maandTER;
    
    let portfolio = belegging.startBedrag;
    let totaalBedrag = belegging.startBedrag;
    let totaalKosten = 0;
    let totaalTER = 0;
    let totaalTransactiekosten = 0;
    
    const simulatieData = [];
    
    // Start transaction costs
    const startTransactiekosten = Math.max(
      (belegging.startBedrag * belegging.transactiekostenPercentage / 100),
      belegging.transactiekostenVast
    );
    totaalTransactiekosten += startTransactiekosten;
    
    for (let maand = 0; maand <= maanden; maand++) {
      // Add monthly contribution
      if (maand > 0) {
        const maandTransactiekosten = Math.max(
          (belegging.maandelijkseBijdrage * belegging.transactiekostenPercentage / 100),
          belegging.transactiekostenVast
        );
        totaalTransactiekosten += maandTransactiekosten;
        portfolio += belegging.maandelijkseBijdrage - maandTransactiekosten;
        totaalBedrag += belegging.maandelijkseBijdrage;
      }
      
      // Apply return
      const rendement = portfolio * nettoMaandRendement;
      const terKosten = portfolio * maandTER;
      portfolio += rendement;
      totaalTER += terKosten;
      totaalKosten = totaalTER + totaalTransactiekosten;
      
      // Add data point every 6 months
      if (maand % 6 === 0) {
        const bruttoPortfolio = portfolio + totaalKosten;
        simulatieData.push({
          jaar: maand / 12,
          portfolioWaarde: Math.round(portfolio),
          gestortBedrag: Math.round(totaalBedrag),
          bruttoRendement: Math.round(bruttoPortfolio),
          kosten: Math.round(totaalKosten),
          nettoRendement: Math.round(portfolio - totaalBedrag)
        });
      }
    }
    
    const eindWaarde = portfolio;
    const totaleCijferRendement = ((eindWaarde / totaalBedrag) - 1) * 100;
    const jaarlijksRendement = (Math.pow(eindWaarde / belegging.startBedrag, 1 / belegging.beleggingsHorizon) - 1) * 100;
    
    return {
      eindWaarde,
      totaalBedrag,
      nettoWinst: eindWaarde - totaalBedrag,
      totaleCijferRendement,
      jaarlijksRendement,
      totaalKosten,
      totaalTER,
      totaalTransactiekosten,
      simulatieData
    };
  };

  const resultaat = berekenETFBelegging();

  // Create cost comparison
  const kostenVergelijking = popularETFs.map(etf => {
    const jaarlijkseKosten = (belegging.startBedrag + (belegging.maandelijkseBijdrage * 12 * belegging.beleggingsHorizon / 2)) * (etf.ter / 100);
    return {
      etf: etf.id,
      naam: etf.naam.split(' ').slice(0, 3).join(' '),
      ter: etf.ter,
      jaarlijkseKosten: Math.round(jaarlijkseKosten),
      trackingError: etf.trackingError
    };
  });

  // Create regional allocation (simplified)
  const regioAllocatie = [
    { regio: 'Noord-Amerika', percentage: 68, color: '#8884d8' },
    { regio: 'Europa', percentage: 15, color: '#82ca9d' },
    { regio: 'Japan', percentage: 6, color: '#ffc658' },
    { regio: 'Emerging Markets', percentage: 11, color: '#ff7300' }
  ];

  // Create sector allocation (simplified for MSCI World)
  const sectorAllocatie = [
    { sector: 'Technology', percentage: 23, color: '#8884d8' },
    { sector: 'Financials', percentage: 14, color: '#82ca9d' },
    { sector: 'Healthcare', percentage: 12, color: '#ffc658' },
    { sector: 'Consumer Discretionary', percentage: 11, color: '#ff7300' },
    { sector: 'Communication Services', percentage: 8, color: '#00C49F' },
    { sector: 'Industrials', percentage: 10, color: '#FFBB28' },
    { sector: 'Overige', percentage: 22, color: '#FF8042' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header activeCalculator="etf-calculator" onCalculatorChange={() => {}} />
      
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ETF Calculator België
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Vergelijk index fondsen (ETFs) en bereken uw langetermijn rendement. 
              Analyseer kosten, tracking error en fiscale impact van populaire ETFs voor Belgische beleggers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Index Fondsen
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Kosten Analyse
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Belgische Fiscaliteit
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
            
            {/* ETF Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-chart-bar mr-3 text-primary"></i>
                  ETF Selectie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="etfKeuze">Hoofdbelegging ETF</Label>
                  <Select value={gekozenETF} onValueChange={setGekozenETF}>
                    <SelectTrigger data-testid="select-etf-keuze">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {popularETFs.map((etf) => (
                        <SelectItem key={etf.id} value={etf.id}>
                          {etf.id} - {etf.naam.split(' ').slice(0, 4).join(' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                  <div className="font-medium">{geselecteerdeETF.naam}</div>
                  <div>ISIN: {geselecteerdeETF.isin}</div>
                  <div>TER: {geselecteerdeETF.ter}%</div>
                  <div>Tracking Error: {geselecteerdeETF.trackingError}%</div>
                  <div>Index: {geselecteerdeETF.onderliggendeIndex}</div>
                  <div>Dividend: {geselecteerdeETF.dividendBeleid}</div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Parameters */}
            <Card>
              <CardHeader>
                <CardTitle>Beleggingsparameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="startBedrag">Startbedrag</Label>
                  <Input
                    id="startBedrag"
                    type="number"
                    value={belegging.startBedrag}
                    onChange={(e) => setBelegging({...belegging, startBedrag: Number(e.target.value)})}
                    data-testid="input-start-bedrag"
                  />
                </div>

                <div>
                  <Label htmlFor="maandelijkseBijdrage">Maandelijkse bijdrage</Label>
                  <Input
                    id="maandelijkseBijdrage"
                    type="number"
                    value={belegging.maandelijkseBijdrage}
                    onChange={(e) => setBelegging({...belegging, maandelijkseBijdrage: Number(e.target.value)})}
                    data-testid="input-maandelijkse-bijdrage"
                  />
                </div>

                <div>
                  <Label htmlFor="verwachtRendement">Verwacht jaarrendement (%)</Label>
                  <Input
                    id="verwachtRendement"
                    type="number"
                    step="0.1"
                    value={belegging.verwachtRendement}
                    onChange={(e) => setBelegging({...belegging, verwachtRendement: Number(e.target.value)})}
                    data-testid="input-verwacht-rendement"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Historisch: MSCI World ~7-8% per jaar
                  </p>
                </div>

                <div>
                  <Label htmlFor="beleggingsHorizon">Beleggingshorizon (jaren)</Label>
                  <Select value={belegging.beleggingsHorizon.toString()} onValueChange={(value) => setBelegging({...belegging, beleggingsHorizon: Number(value)})}>
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
              </CardContent>
            </Card>

            {/* Costs & Taxes */}
            <Card>
              <CardHeader>
                <CardTitle>Kosten & Belastingen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="transactiekostenPercentage">Transactiekosten (%)</Label>
                  <Input
                    id="transactiekostenPercentage"
                    type="number"
                    step="0.01"
                    value={belegging.transactiekostenPercentage}
                    onChange={(e) => setBelegging({...belegging, transactiekostenPercentage: Number(e.target.value)})}
                    data-testid="input-transactiekosten-percentage"
                  />
                </div>

                <div>
                  <Label htmlFor="transactiekostenVast">Min. transactiekosten</Label>
                  <Input
                    id="transactiekostenVast"
                    type="number"
                    step="0.1"
                    value={belegging.transactiekostenVast}
                    onChange={(e) => setBelegging({...belegging, transactiekostenVast: Number(e.target.value)})}
                    data-testid="input-transactiekosten-vast"
                  />
                </div>

                <div>
                  <Label htmlFor="roerendeVoorheffing">Roerende voorheffing (%)</Label>
                  <Select value={belegging.roerendeVoorheffing.toString()} onValueChange={(value) => setBelegging({...belegging, roerendeVoorheffing: Number(value)})}>
                    <SelectTrigger data-testid="select-roerende-voorheffing">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0% (Accumulating ETF)</SelectItem>
                      <SelectItem value="30">30% (Distributing ETF)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    Accumulating ETFs zijn fiscaal gunstiger
                  </p>
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
                  <CardTitle className="text-lg">Portfolio Eindwaarde</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600" data-testid="text-portfolio-eindwaarde">
                    €{Math.round(resultaat.eindWaarde).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Na {belegging.beleggingsHorizon} jaar beleggen
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Gestort totaal:</span>
                      <span>€{Math.round(resultaat.totaalBedrag).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Netto winst:</span>
                      <span className="text-green-600">€{Math.round(resultaat.nettoWinst).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Rendement Analyse</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary" data-testid="text-jaarlijks-rendement">
                    {resultaat.jaarlijksRendement.toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Gemiddeld jaarlijks rendement
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Totaal rendement:</span>
                      <span>{resultaat.totaleCijferRendement.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Totale kosten:</span>
                      <span className="text-red-600">€{Math.round(resultaat.totaalKosten).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Portfolio Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Groei Simulatie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={resultaat.simulatieData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="jaar" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
                      <Area type="monotone" dataKey="gestortBedrag" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="nettoRendement" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Mid Ad */}
            <GoogleAdsense slot="rectangle" />

            {/* ETF Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>ETF Kosten Vergelijking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={kostenVergelijking}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="etf" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number, name: string) => [
                          name === 'ter' ? `${value}%` : `€${Math.round(value).toLocaleString()}`,
                          name === 'ter' ? 'TER' : 'Jaarlijkse kosten'
                        ]}
                      />
                      <Bar dataKey="jaarlijkseKosten" fill="#8884d8" name="jaarlijkseKosten" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Sector Allocation */}
            <Card>
              <CardHeader>
                <CardTitle>Sector Allocatie (MSCI World)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorAllocatie}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ sector, percentage }) => `${sector} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="percentage"
                      >
                        {sectorAllocatie.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value}%`]} />
                    </PieChart>
                  </ResponsiveContainer>
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
                      🎯 <strong>Diversificatie:</strong> Overweeg een mix van wereld ETFs en emerging markets ETFs voor optimale spreiding.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert>
                    <AlertDescription>
                      💡 <strong>Accumulating voorkeur:</strong> Kies accumulating ETFs om roerende voorheffing uit te stellen 
                      en van compound interest te profiteren.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert>
                    <AlertDescription>
                      📈 <strong>Dollar Cost Averaging:</strong> Maandelijkse bijdragen verminderen timing risico en 
                      profiteren van koersfluctuaties.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert>
                    <AlertDescription>
                      🏦 <strong>Broker keuze:</strong> Vergelijk transactiekosten tussen verschillende Belgische brokers. 
                      Sommige bieden gratis ETF aankopen.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rate Comparison Widget */}
      <RateComparisonWidget productType="etf-belegging" title="Vergelijk Broker ETF Tarieven" />

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