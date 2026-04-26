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
import { Progress } from "@/components/ui/progress";
import { useState, lazy, Suspense } from "react";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import RelatedCalculators from "@/components/seo/RelatedCalculators";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

import { ChartSkeleton } from "@/components/ui/chart-skeleton";

const KredietcapaciteitChart1 = lazy(() => import("./kredietcapaciteit-chart-1"));
const KredietcapaciteitChart2 = lazy(() => import("./kredietcapaciteit-chart-2"));
const KredietcapaciteitChart3 = lazy(() => import("./kredietcapaciteit-chart-3"));
const KredietcapaciteitChart4 = lazy(() => import("./kredietcapaciteit-chart-4"));

export default function KredietcapaciteitCalculatorPage() {
  const seoConfig = getSeoConfig("kredietcapaciteit-calculator");
  useSeoTags("kredietcapaciteit-calculator");

  const [nettoInkomen, setNettoInkomen] = useState<number>(3500);
  const [partnerInkomen, setPartnerInkomen] = useState<number>(0);
  const [anderInkomen, setAnderInkomen] = useState<number>(0);
  const [woonkosten, setWoonkosten] = useState<number>(800);
  const [andereLeningen, setAndereLeningen] = useState<number>(250);
  const [kredietkaarten, setKredietkaarten] = useState<number>(50);
  const [levenskosten, setLevenskosten] = useState<number>(1200);
  const [gezinsgrootte, setGezinsgrootte] = useState<number>(2);
  const [loanType, setLoanType] = useState<string>("persoonlijk");
  const [looptijd, setLooptijd] = useState<number>(10);
  const [rente, setRente] = useState<number>(6.5);
  const [werkduur, setWerkduur] = useState<number>(5);
  const [contractType, setContractType] = useState<string>("vast");

  // Belgian credit capacity calculation following KBC/BNP guidelines
  const berekenKredietcapaciteit = () => {
    const totaalInkomen = nettoInkomen + partnerInkomen + anderInkomen;
    const totaalUitgaven = woonkosten + andereLeningen + kredietkaarten + levenskosten;
    const beschikbaarInkomen = totaalInkomen - totaalUitgaven;
    
    // Belgian banks typically use 33% debt-to-income ratio
    const maximaalMaandlast = totaalInkomen * 0.33;
    const huidigeMaandlasten = andereLeningen + kredietkaarten;
    const beschikbareMaandlast = maximaalMaandlast - huidigeMaandlasten;
    
    // Calculate maximum loan amount based on available monthly payment
    const maandRente = rente / 100 / 12;
    const aantalBetalingen = looptijd * 12;
    
    let maximumKrediet = 0;
    if (maandRente > 0) {
      maximumKrediet = beschikbareMaandlast * 
        (Math.pow(1 + maandRente, aantalBetalingen) - 1) /
        (maandRente * Math.pow(1 + maandRente, aantalBetalingen));
    } else {
      maximumKrediet = beschikbareMaandlast * aantalBetalingen;
    }
    
    // Adjustments based on loan type and risk factors
    let aanpassingsFactor = 1;
    
    switch (loanType) {
      case "hypotheek":
        aanpassingsFactor = 1.2; // Higher amount for secured loans
        break;
      case "auto":
        aanpassingsFactor = 1.1;
        break;
      case "persoonlijk":
        aanpassingsFactor = 0.9;
        break;
      case "renovatie":
        aanpassingsFactor = 1.05;
        break;
    }
    
    // Work stability factor
    if (contractType === "tijdelijk" || werkduur < 1) {
      aanpassingsFactor *= 0.8;
    } else if (werkduur >= 5) {
      aanpassingsFactor *= 1.1;
    }
    
    // Family size adjustment
    if (gezinsgrootte > 4) {
      aanpassingsFactor *= 0.9;
    }
    
    const aangepastKrediet = Math.max(maximumKrediet * aanpassingsFactor, 0);
    
    // Credit score estimation based on financial situation
    let kredietScore = 700; // Starting score
    
    // Income stability
    if (contractType === "vast" && werkduur >= 3) kredietScore += 50;
    else if (contractType === "tijdelijk") kredietScore -= 30;
    
    // Debt-to-income ratio
    const schuldRatio = (huidigeMaandlasten / totaalInkomen) * 100;
    if (schuldRatio < 10) kredietScore += 30;
    else if (schuldRatio > 30) kredietScore -= 50;
    
    // Available income
    if (beschikbaarInkomen > 1000) kredietScore += 20;
    else if (beschikbaarInkomen < 200) kredietScore -= 40;
    
    kredietScore = Math.max(300, Math.min(850, kredietScore));
    
    return {
      totaalInkomen,
      totaalUitgaven,
      beschikbaarInkomen,
      maximaalMaandlast,
      beschikbareMaandlast,
      maximumKrediet: aangepastKrediet,
      schuldRatio,
      kredietScore,
      risicoProfiel: kredietScore >= 750 ? "Laag" : kredietScore >= 650 ? "Gemiddeld" : "Hoog"
    };
  };

  const capaciteit = berekenKredietcapaciteit();

  // Create income vs expenses breakdown
  const inkomstenverdeling = [
    { name: 'Hoofdinkomen', value: nettoInkomen, color: '#8884d8' },
    { name: 'Partner inkomen', value: partnerInkomen, color: '#82ca9d' },
    { name: 'Ander inkomen', value: anderInkomen, color: '#ffc658' }
  ].filter(item => item.value > 0);

  const uitgavenverdeling = [
    { name: 'Woonkosten', value: woonkosten, color: '#8884d8' },
    { name: 'Andere leningen', value: andereLeningen, color: '#82ca9d' },
    { name: 'Kredietkaarten', value: kredietkaarten, color: '#ffc658' },
    { name: 'Levenskosten', value: levenskosten, color: '#ff7300' }
  ].filter(item => item.value > 0);

  // Create loan amount scenarios
  const loanScenarios = [
    { 
      looptijd: 5, 
      maandlast: capaciteit.beschikbareMaandlast,
      totaalBedrag: capaciteit.maximumKrediet * (5/looptijd)
    },
    { 
      looptijd: 7, 
      maandlast: capaciteit.beschikbareMaandlast,
      totaalBedrag: capaciteit.maximumKrediet * (7/looptijd)
    },
    { 
      looptijd: 10, 
      maandlast: capaciteit.beschikbareMaandlast,
      totaalBedrag: capaciteit.maximumKrediet
    },
    { 
      looptijd: 15, 
      maandlast: capaciteit.beschikbareMaandlast,
      totaalBedrag: capaciteit.maximumKrediet * (15/looptijd)
    }
  ];

  // Different loan types comparison
  const leningtypeVergelijking = [
    { type: "Persoonlijk", limiet: Math.round(capaciteit.maximumKrediet * 0.9), rente: 6.5 },
    { type: "Auto", limiet: Math.round(capaciteit.maximumKrediet * 1.1), rente: 4.8 },
    { type: "Renovatie", limiet: Math.round(capaciteit.maximumKrediet * 1.05), rente: 5.2 },
    { type: "Hypotheek", limiet: Math.round(capaciteit.maximumKrediet * 1.2), rente: 3.8 }
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
              Kredietcapaciteit Calculator België
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Ontdek hoeveel u kunt lenen op basis van uw financiële situatie. 
              Berekening volgens Belgische banknormen en kredietrichtlijnen.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                33% Regel
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Kredietwaardigheid
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Belgische Banken
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
                  <i className="fas fa-calculator mr-3 text-primary"></i>
                  Financiële Situatie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-b pb-4">
                  <h4 className="font-medium mb-3">Inkomsten (netto per maand)</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="nettoInkomen">Uw netto inkomen</Label>
                      <Input
                        id="nettoInkomen"
                        type="number"
                        value={nettoInkomen}
                        onChange={(e) => setNettoInkomen(Number(e.target.value))}
                        data-testid="input-netto-inkomen"
                      />
                    </div>

                    <div>
                      <Label htmlFor="partnerInkomen">Partner inkomen</Label>
                      <Input
                        id="partnerInkomen"
                        type="number"
                        value={partnerInkomen}
                        onChange={(e) => setPartnerInkomen(Number(e.target.value))}
                        data-testid="input-partner-inkomen"
                      />
                    </div>

                    <div>
                      <Label htmlFor="anderInkomen">Ander inkomen</Label>
                      <Input
                        id="anderInkomen"
                        type="number"
                        value={anderInkomen}
                        onChange={(e) => setAnderInkomen(Number(e.target.value))}
                        data-testid="input-ander-inkomen"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Huur, alimentatie, etc.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h4 className="font-medium mb-3">Uitgaven (per maand)</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="woonkosten">Woonkosten</Label>
                      <Input
                        id="woonkosten"
                        type="number"
                        value={woonkosten}
                        onChange={(e) => setWoonkosten(Number(e.target.value))}
                        data-testid="input-woonkosten"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Huur of hypotheek
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="andereLeningen">Andere leningen</Label>
                      <Input
                        id="andereLeningen"
                        type="number"
                        value={andereLeningen}
                        onChange={(e) => setAndereLeningen(Number(e.target.value))}
                        data-testid="input-andere-leningen"
                      />
                    </div>

                    <div>
                      <Label htmlFor="kredietkaarten">Kredietkaarten</Label>
                      <Input
                        id="kredietkaarten"
                        type="number"
                        value={kredietkaarten}
                        onChange={(e) => setKredietkaarten(Number(e.target.value))}
                        data-testid="input-kredietkaarten"
                      />
                    </div>

                    <div>
                      <Label htmlFor="levenskosten">Levenskosten</Label>
                      <Input
                        id="levenskosten"
                        type="number"
                        value={levenskosten}
                        onChange={(e) => setLevenskosten(Number(e.target.value))}
                        data-testid="input-levenskosten"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Voeding, transport, etc.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h4 className="font-medium mb-3">Gewenste Lening</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="loanType">Type lening</Label>
                      <Select value={loanType} onValueChange={setLoanType}>
                        <SelectTrigger data-testid="select-loan-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="persoonlijk">Persoonlijke lening</SelectItem>
                          <SelectItem value="auto">Autolening</SelectItem>
                          <SelectItem value="renovatie">Renovatielening</SelectItem>
                          <SelectItem value="hypotheek">Hypotheek</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="looptijd">Looptijd (jaren)</Label>
                      <Select value={looptijd.toString()} onValueChange={(value) => setLooptijd(Number(value))}>
                        <SelectTrigger data-testid="select-looptijd">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 jaar</SelectItem>
                          <SelectItem value="7">7 jaar</SelectItem>
                          <SelectItem value="10">10 jaar</SelectItem>
                          <SelectItem value="15">15 jaar</SelectItem>
                          <SelectItem value="20">20 jaar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="rente">Verwachte rente (%)</Label>
                      <Input
                        id="rente"
                        type="number"
                        step="0.1"
                        value={rente}
                        onChange={(e) => setRente(Number(e.target.value))}
                        data-testid="input-rente"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Persoonlijke Situatie</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="gezinsgrootte">Gezinsgrootte</Label>
                      <Select value={gezinsgrootte.toString()} onValueChange={(value) => setGezinsgrootte(Number(value))}>
                        <SelectTrigger data-testid="select-gezinsgrootte">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 persoon</SelectItem>
                          <SelectItem value="2">2 personen</SelectItem>
                          <SelectItem value="3">3 personen</SelectItem>
                          <SelectItem value="4">4 personen</SelectItem>
                          <SelectItem value="5">5+ personen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="contractType">Contract type</Label>
                      <Select value={contractType} onValueChange={setContractType}>
                        <SelectTrigger data-testid="select-contract-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vast">Vast contract</SelectItem>
                          <SelectItem value="tijdelijk">Tijdelijk contract</SelectItem>
                          <SelectItem value="zelfstandig">Zelfstandige</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="werkduur">Werkduur (jaren)</Label>
                      <Input
                        id="werkduur"
                        type="number"
                        value={werkduur}
                        onChange={(e) => setWerkduur(Number(e.target.value))}
                        data-testid="input-werkduur"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Bij huidige werkgever
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
                  <CardTitle className="text-lg">Maximum Kredietbedrag</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary" data-testid="text-maximum-krediet">
                    €{Math.round(capaciteit.maximumKrediet).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Over {looptijd} jaar, {loanType} lening
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Beschikbare maandlast:</span>
                      <span>€{Math.round(capaciteit.beschikbareMaandlast)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Schuldratio:</span>
                      <span>{capaciteit.schuldRatio.toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Kredietwaardigheid</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600" data-testid="text-krediet-score">
                    {Math.round(capaciteit.kredietScore)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Risicoprofiel: {capaciteit.risicoProfiel}
                  </p>
                  <div className="mt-4">
                    <Progress 
                      value={(capaciteit.kredietScore - 300) / (850 - 300) * 100} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span>300</span>
                      <span>850</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Financial Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inkomensverdeling</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <Suspense fallback={<ChartSkeleton />}>
                      <KredietcapaciteitChart1 data={inkomstenverdeling} />
                    </Suspense>
                  </div>
                  <div className="text-center mt-2">
                    <strong>Totaal: €{capaciteit.totaalInkomen.toLocaleString()}</strong>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Uitgavenverdeling</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <Suspense fallback={<ChartSkeleton />}>
                      <KredietcapaciteitChart2 data={uitgavenverdeling} />
                    </Suspense>
                  </div>
                  <div className="text-center mt-2">
                    <strong>Totaal: €{capaciteit.totaalUitgaven.toLocaleString()}</strong>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Assessment */}
            {capaciteit.schuldRatio > 33 && (
              <Alert>
                <AlertDescription>
                  ⚠️ Uw schuldratio van {capaciteit.schuldRatio.toFixed(1)}% overschrijdt de aanbevolen 33%. 
                  Dit kan uw kredietaanvraag negatief beïnvloeden.
                </AlertDescription>
              </Alert>
            )}

            {capaciteit.beschikbaarInkomen < 200 && (
              <Alert>
                <AlertDescription>
                  ⚠️ Uw beschikbaar inkomen van €{Math.round(capaciteit.beschikbaarInkomen)} is laag. 
                  Overweeg het verlagen van uitgaven voordat u een lening aanvraagt.
                </AlertDescription>
              </Alert>
            )}

            {/* Mid Ad */}
            <GoogleAdsense slot="rectangle" />

            {/* Loan Type Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Vergelijking per Leningtype</CardTitle>
                <p className="text-muted-foreground">
                  Verschillende kredietlimieten afhankelijk van het type lening
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Suspense fallback={<ChartSkeleton />}>
                    <KredietcapaciteitChart3 data={leningtypeVergelijking} />
                  </Suspense>
                </div>
              </CardContent>
            </Card>

            {/* Loan Term Scenarios */}
            <Card>
              <CardHeader>
                <CardTitle>Looptijd Scenarios</CardTitle>
                <p className="text-muted-foreground">
                  Kredietbedrag bij verschillende looptijden
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Suspense fallback={<ChartSkeleton />}>
                    <KredietcapaciteitChart4 data={loanScenarios} />
                  </Suspense>
                </div>
              </CardContent>
            </Card>

            {/* Financial Health Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Financiële Gezondheid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      €{Math.round(capaciteit.beschikbaarInkomen)}
                    </div>
                    <p className="text-sm text-muted-foreground">Beschikbaar per maand</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {capaciteit.schuldRatio.toFixed(1)}%
                    </div>
                    <p className="text-sm text-muted-foreground">Schuldratio</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(capaciteit.kredietScore)}
                    </div>
                    <p className="text-sm text-muted-foreground">Krediet score</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {capaciteit.risicoProfiel}
                    </div>
                    <p className="text-sm text-muted-foreground">Risico niveau</p>
                  </div>
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
                  {capaciteit.kredietScore >= 750 && (
                    <Alert>
                      <AlertDescription>
                        ✅ Uitstekende kredietwaardigheid! U komt in aanmerking voor de beste rentetarieven.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {capaciteit.schuldRatio < 25 && (
                    <Alert>
                      <AlertDescription>
                        ✅ Gezonde schuldratio. U heeft nog ruimte voor extra kredieten.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {capaciteit.beschikbaarInkomen > 1000 && (
                    <Alert>
                      <AlertDescription>
                        ✅ Ruim beschikbaar inkomen geeft u flexibiliteit in kredietkeuzes.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {capaciteit.schuldRatio > 30 && (
                    <Alert>
                      <AlertDescription>
                        💡 Overweeg het aflossen van bestaande schulden om uw kredietcapaciteit te verhogen.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rate Comparison Widget */}
      <RateComparisonWidget productType="persoonlijke-lening" title="Vergelijk Krediet Aanbiedingen" />

      {/* Bottom Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GoogleAdsense slot="banner" className="w-full max-w-4xl mx-auto" />
      </section>

      {/* Related Calculators */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <RelatedCalculators currentSlug="kredietcapaciteit-calculator" />
      </section>

      {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} />}

      <Footer />
    </div>
  );
}