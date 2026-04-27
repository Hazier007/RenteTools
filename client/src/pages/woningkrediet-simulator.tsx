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
import { useState, lazy, Suspense } from "react";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import RelatedCalculators from "@/components/seo/RelatedCalculators";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

import { ChartSkeleton } from "@/components/ui/chart-skeleton";

const WoningkredietChart1 = lazy(() => import("./woningkrediet-chart-1"));
const WoningkredietChart2 = lazy(() => import("./woningkrediet-chart-2"));
const WoningkredietChart3 = lazy(() => import("./woningkrediet-chart-3"));

export default function WoningkredietSimulatorPage() {
  const seoConfig = getSeoConfig("woningkrediet-simulator");
  useSeoTags("woningkrediet-simulator");

  const [woningprijs, setWoningprijs] = useState<number>(350000);
  const [eigenInbreng, setEigenInbreng] = useState<number>(70000);
  const [looptijd, setLooptijd] = useState<number>(25);
  const [renteType, setRenteType] = useState<string>("vast");
  const [rente, setRente] = useState<number>(3.8);
  const [notariskosten, setNotariskosten] = useState<number>(2500);
  const [registratierechten, setRegistratierechten] = useState<number>(35000);
  const [bankkosten, setBankkosten] = useState<number>(1500);
  const [verzekering, setVerzekering] = useState<number>(150);

  // Belgian mortgage calculation with additional costs
  const berekenWoningkrediet = () => {
    const leningBedrag = woningprijs - eigenInbreng;
    const maandRente = rente / 100 / 12;
    const aantalBetalingen = looptijd * 12;
    
    // Monthly payment calculation (annuity formula)
    const maandlast = leningBedrag * 
      (maandRente * Math.pow(1 + maandRente, aantalBetalingen)) /
      (Math.pow(1 + maandRente, aantalBetalingen) - 1);
    
    const totaalBetaald = maandlast * aantalBetalingen;
    const totaleRente = totaalBetaald - leningBedrag;
    
    // Additional costs (one-time)
    const eenmaligKosten = notariskosten + registratierechten + bankkosten;
    const maandelijksVerzekering = verzekering;
    const totaleKosten = totaalBetaald + eenmaligKosten + (maandelijksVerzekering * aantalBetalingen);
    
    // Loan-to-value ratio
    const loanToValue = (leningBedrag / woningprijs) * 100;
    
    return {
      leningBedrag,
      maandlast: maandlast + maandelijksVerzekering, // Include insurance
      totaalBetaald,
      totaleRente,
      eenmaligKosten,
      totaleKosten,
      loanToValue
    };
  };

  const hypotheek = berekenWoningkrediet();

  // Create amortization schedule for first 5 years
  const createAmortizationData = () => {
    const maandRente = rente / 100 / 12;
    const aantalBetalingen = looptijd * 12;
    const leningBedrag = woningprijs - eigenInbreng;
    
    const maandlast = leningBedrag * 
      (maandRente * Math.pow(1 + maandRente, aantalBetalingen)) /
      (Math.pow(1 + maandRente, aantalBetalingen) - 1);
    
    const data = [];
    let restSchuld = leningBedrag;
    
    for (let jaar = 1; jaar <= Math.min(5, looptijd); jaar++) {
      let jaarRente = 0;
      let jaarAflossing = 0;
      
      for (let maand = 1; maand <= 12; maand++) {
        const renteDeelMaand = restSchuld * maandRente;
        const aflossingDeelMaand = maandlast - renteDeelMaand;
        
        jaarRente += renteDeelMaand;
        jaarAflossing += aflossingDeelMaand;
        restSchuld -= aflossingDeelMaand;
      }
      
      data.push({
        jaar: `Jaar ${jaar}`,
        rente: Math.round(jaarRente),
        aflossing: Math.round(jaarAflossing),
        restSchuld: Math.round(restSchuld)
      });
    }
    
    return data;
  };

  const amortizationData = createAmortizationData();

  // Different mortgage scenarios
  const berekenScenarios = () => {
    const scenarios = [
      { naam: "Conservatief", rente: 4.2, looptijd: 20 },
      { naam: "Huidig", rente: rente, looptijd: looptijd },
      { naam: "Optimistisch", rente: 3.2, looptijd: 30 }
    ];
    
    return scenarios.map(scenario => {
      const leningBedrag = woningprijs - eigenInbreng;
      const maandRente = scenario.rente / 100 / 12;
      const aantalBetalingen = scenario.looptijd * 12;
      
      const maandlast = leningBedrag * 
        (maandRente * Math.pow(1 + maandRente, aantalBetalingen)) /
        (Math.pow(1 + maandRente, aantalBetalingen) - 1);
      
      const totaalBetaald = maandlast * aantalBetalingen;
      
      return {
        ...scenario,
        maandlast: Math.round(maandlast + verzekering),
        totaalRente: Math.round(totaalBetaald - leningBedrag)
      };
    });
  };

  const scenarios = berekenScenarios();

  // Cost breakdown for pie chart
  const kostenBreakdown = [
    { name: 'Hoofdsom', value: woningprijs - eigenInbreng, color: '#8884d8' },
    { name: 'Rente', value: hypotheek.totaleRente, color: '#82ca9d' },
    { name: 'Notaris', value: notariskosten, color: '#ffc658' },
    { name: 'Registratie', value: registratierechten, color: '#ff7300' },
    { name: 'Bank kosten', value: bankkosten, color: '#00ff88' },
    { name: 'Verzekering', value: verzekering * looptijd * 12, color: '#0088ff' }
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
              Woningkrediet Simulator België
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Simuleer verschillende hypotheekscenario's en vind de beste woningkrediet oplossing voor uw situatie.
              Bereken maandlasten, totale kosten en vergelijk Belgische banken.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Belgische Banken
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Actuele Tarieven 2026
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Scenario Vergelijking
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
                  <i className="fas fa-home mr-3 text-primary"></i>
                  Woningkrediet Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="woningprijs">Woningprijs</Label>
                  <Input
                    id="woningprijs"
                    type="number"
                    value={woningprijs}
                    onChange={(e) => setWoningprijs(Number(e.target.value))}
                    data-testid="input-woningprijs"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Totale aankoopprijs van de woning
                  </p>
                </div>

                <div>
                  <Label htmlFor="eigenInbreng">Eigen Inbreng</Label>
                  <Input
                    id="eigenInbreng"
                    type="number"
                    value={eigenInbreng}
                    onChange={(e) => setEigenInbreng(Number(e.target.value))}
                    data-testid="input-eigen-inbreng"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Uw eigen kapitaal (minimum 10%)
                  </p>
                </div>

                <div>
                  <Label htmlFor="looptijd">Looptijd (jaren)</Label>
                  <Select value={looptijd.toString()} onValueChange={(value) => setLooptijd(Number(value))}>
                    <SelectTrigger data-testid="select-looptijd">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 jaar</SelectItem>
                      <SelectItem value="20">20 jaar</SelectItem>
                      <SelectItem value="25">25 jaar</SelectItem>
                      <SelectItem value="30">30 jaar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="renteType">Rentetype</Label>
                  <Select value={renteType} onValueChange={setRenteType}>
                    <SelectTrigger data-testid="select-rentetype">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vast">Vaste rente</SelectItem>
                      <SelectItem value="variabel">Variabele rente</SelectItem>
                      <SelectItem value="gemengd">Gemengde rente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rente">Rentevoet (%)</Label>
                  <Input
                    id="rente"
                    type="number"
                    step="0.1"
                    value={rente}
                    onChange={(e) => setRente(Number(e.target.value))}
                    data-testid="input-rente"
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Bijkomende Kosten</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="notariskosten">Notariskosten</Label>
                      <Input
                        id="notariskosten"
                        type="number"
                        value={notariskosten}
                        onChange={(e) => setNotariskosten(Number(e.target.value))}
                        data-testid="input-notariskosten"
                      />
                    </div>

                    <div>
                      <Label htmlFor="registratierechten">Registratierechten</Label>
                      <Input
                        id="registratierechten"
                        type="number"
                        value={registratierechten}
                        onChange={(e) => setRegistratierechten(Number(e.target.value))}
                        data-testid="input-registratierechten"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bankkosten">Bankkosten</Label>
                      <Input
                        id="bankkosten"
                        type="number"
                        value={bankkosten}
                        onChange={(e) => setBankkosten(Number(e.target.value))}
                        data-testid="input-bankkosten"
                      />
                    </div>

                    <div>
                      <Label htmlFor="verzekering">Verzekering (per maand)</Label>
                      <Input
                        id="verzekering"
                        type="number"
                        value={verzekering}
                        onChange={(e) => setVerzekering(Number(e.target.value))}
                        data-testid="input-verzekering"
                      />
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
                  <CardTitle className="text-lg">Maandelijkse Afbetaling</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary" data-testid="text-maandlast">
                    €{Math.round(hypotheek.maandlast).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Inclusief verzekering (€{verzekering}/maand)
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Leningbedrag:</span>
                      <span>€{Math.round(hypotheek.leningBedrag).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Loan-to-Value:</span>
                      <span>{Math.round(hypotheek.loanToValue)}%</span>
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
                    €{Math.round(hypotheek.totaleKosten).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Over {looptijd} jaar (alles inbegrepen)
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Totale rente:</span>
                      <span>€{Math.round(hypotheek.totaleRente).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Eenmalige kosten:</span>
                      <span>€{Math.round(hypotheek.eenmaligKosten).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mid Ad */}
            <GoogleAdsense slot="rectangle" />

            {/* Scenario Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Scenario Vergelijking</CardTitle>
                <p className="text-muted-foreground">
                  Verschillende rente- en looptijdscenario's voor uw woningkrediet
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Suspense fallback={<ChartSkeleton />}>
                    <WoningkredietChart1 data={scenarios} />
                  </Suspense>
                </div>
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Kostenverdeling</CardTitle>
                <p className="text-muted-foreground">
                  Overzicht van alle kosten verbonden aan uw woningkrediet
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Suspense fallback={<ChartSkeleton />}>
                    <WoningkredietChart2 data={kostenBreakdown} />
                  </Suspense>
                </div>
              </CardContent>
            </Card>

            {/* Amortization Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Aflossingschema (Eerste 5 Jaar)</CardTitle>
                <p className="text-muted-foreground">
                  Evolutie van rente vs aflossing over de tijd
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Suspense fallback={<ChartSkeleton />}>
                    <WoningkredietChart3 data={amortizationData} />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rate Comparison Widget */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <RateComparisonWidget productType="hypotheek" title="Vergelijk Hypotheekaanbiedingen" />
      </section>

      {/* Bottom Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GoogleAdsense slot="banner" className="w-full max-w-4xl mx-auto" />
      </section>

      {/* Related Calculators */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <RelatedCalculators currentSlug="woningkrediet-simulator" />
      </section>

      {seoConfig && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AuthorityLinks links={seoConfig.authorityLinks} />
        </section>
      )}

      <Footer />
    </div>
  );
}