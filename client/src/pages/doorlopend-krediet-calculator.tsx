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
import { useState, lazy, Suspense } from "react";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import RelatedCalculators from "@/components/seo/RelatedCalculators";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

import { ChartSkeleton } from "@/components/ui/chart-skeleton";

const DoorlopendKredietChart1 = lazy(() => import("./doorlopend-krediet-chart-1"));
const DoorlopendKredietChart2 = lazy(() => import("./doorlopend-krediet-chart-2"));

export default function DoorlopendKredietCalculatorPage() {
  const seoConfig = getSeoConfig("doorlopend-krediet-calculator");
  useSeoTags("doorlopend-krediet-calculator");

  const [kredietlimiet, setKredietlimiet] = useState<number>(10000);
  const [gebruiktBedrag, setGebruiktBedrag] = useState<number>(5000);
  const [maandelijkseBetaling, setMaandelijkseBetaling] = useState<number>(250);
  const [debetrente, setDebetrente] = useState<number>(12.5);
  const [kredietrente, setKredietrente] = useState<number>(0.5);
  const [maandelijkseKost, setMaandelijkseKost] = useState<number>(15);
  const [jaarlijkseKost, setJaarlijkseKost] = useState<number>(45);
  const [betalingType, setBetalingType] = useState<string>("minimum");

  // Calculate minimum payment based on Belgian regulations (usually 2.5% of outstanding balance)
  const berekenMinimumBetaling = () => {
    return Math.max(gebruiktBedrag * 0.025, 25); // Minimum €25
  };

  // Belgian revolving credit calculation
  const berekenDoorlopendKrediet = () => {
    const minimumBetaling = berekenMinimumBetaling();
    let actuelleBetaling = maandelijkseBetaling;
    
    if (betalingType === "minimum") {
      actuelleBetaling = minimumBetaling;
    }
    
    const maandRente = debetrente / 100 / 12;
    const beschikbaarSaldo = kredietlimiet - gebruiktBedrag;
    const maandelijkeRenteKost = gebruiktBedrag * maandRente;
    const aflossingDeel = Math.max(actuelleBetaling - maandelijkeRenteKost - maandelijkseKost, 0);
    
    // Time to pay off if no new withdrawals
    let maandenTotAfbetaling = 0;
    let restSchuld = gebruiktBedrag;
    let totaleKosten = 0;
    
    while (restSchuld > 0 && maandenTotAfbetaling < 600) { // Max 50 years simulation
      const renteDeelMaand = restSchuld * maandRente;
      const aflossingDeelMaand = Math.max(actuelleBetaling - renteDeelMaand - maandelijkseKost, 0);
      
      if (aflossingDeelMaand <= 0) {
        maandenTotAfbetaling = 600; // Never pays off
        break;
      }
      
      restSchuld = Math.max(restSchuld - aflossingDeelMaand, 0);
      totaleKosten += renteDeelMaand + maandelijkseKost;
      maandenTotAfbetaling++;
    }
    
    const jaarlijkeTotaleKost = (maandelijkeRenteKost + maandelijkseKost) * 12 + jaarlijkseKost;
    const effectieveJaarrente = (jaarlijkeTotaleKost / gebruiktBedrag) * 100;
    
    return {
      minimumBetaling,
      maandelijkeRenteKost,
      aflossingDeel,
      beschikbaarSaldo,
      maandenTotAfbetaling,
      totaleKosten,
      effectieveJaarrente,
      jaarlijkeTotaleKost
    };
  };

  const kredietInfo = berekenDoorlopendKrediet();

  // Create payment simulation data
  const createPaymentSimulation = () => {
    const scenarios = [
      { naam: "Minimum", betaling: kredietInfo.minimumBetaling },
      { naam: "2x Minimum", betaling: kredietInfo.minimumBetaling * 2 },
      { naam: "Huidig", betaling: maandelijkseBetaling },
      { naam: "Verdubbeld", betaling: maandelijkseBetaling * 2 }
    ];
    
    return scenarios.map(scenario => {
      const maandRente = debetrente / 100 / 12;
      let restSchuld = gebruiktBedrag;
      let maanden = 0;
      let totaleKosten = 0;
      
      while (restSchuld > 0 && maanden < 600) {
        const renteDeelMaand = restSchuld * maandRente;
        const aflossingDeelMaand = Math.max(scenario.betaling - renteDeelMaand - maandelijkseKost, 0);
        
        if (aflossingDeelMaand <= 0) {
          maanden = 600;
          totaleKosten = 999999;
          break;
        }
        
        restSchuld = Math.max(restSchuld - aflossingDeelMaand, 0);
        totaleKosten += renteDeelMaand + maandelijkseKost;
        maanden++;
      }
      
      return {
        ...scenario,
        maanden: maanden >= 600 ? "Nooit" : maanden,
        jaren: maanden >= 600 ? "∞" : (maanden / 12).toFixed(1),
        totaleKosten: totaleKosten >= 999999 ? "∞" : Math.round(totaleKosten),
        totaalBetaald: totaleKosten >= 999999 ? "∞" : Math.round(totaleKosten + gebruiktBedrag)
      };
    });
  };

  const paymentScenarios = createPaymentSimulation();

  // Create utilization over time projection
  const createUtilizationProjection = () => {
    const data = [];
    let restSchuld = gebruiktBedrag;
    const maandRente = debetrente / 100 / 12;
    
    for (let maand = 0; maand <= Math.min(kredietInfo.maandenTotAfbetaling, 60); maand += 3) {
      data.push({
        maand: `M${maand}`,
        restSchuld: Math.round(restSchuld),
        beschikbaar: Math.round(kredietlimiet - restSchuld),
        percentage: Math.round((restSchuld / kredietlimiet) * 100)
      });
      
      // Simulate 3 months of payments
      for (let i = 0; i < 3 && restSchuld > 0; i++) {
        const renteDeelMaand = restSchuld * maandRente;
        const aflossingDeelMaand = Math.max(maandelijkseBetaling - renteDeelMaand - maandelijkseKost, 0);
        restSchuld = Math.max(restSchuld - aflossingDeelMaand, 0);
      }
    }
    
    return data;
  };

  const utilizationData = createUtilizationProjection();

  // Cost breakdown comparison
  const kostenVergelijking = [
    {
      item: "Debetrente",
      maandelijks: kredietInfo.maandelijkeRenteKost,
      jaarlijks: kredietInfo.maandelijkeRenteKost * 12,
      percentage: ((kredietInfo.maandelijkeRenteKost * 12) / kredietInfo.jaarlijkeTotaleKost) * 100
    },
    {
      item: "Maandelijkse kosten",
      maandelijks: maandelijkseKost,
      jaarlijks: maandelijkseKost * 12,
      percentage: ((maandelijkseKost * 12) / kredietInfo.jaarlijkeTotaleKost) * 100
    },
    {
      item: "Jaarlijkse kosten",
      maandelijks: jaarlijkseKost / 12,
      jaarlijks: jaarlijkseKost,
      percentage: (jaarlijkseKost / kredietInfo.jaarlijkeTotaleKost) * 100
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
              Doorlopend Krediet Calculator België
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Bereken de kosten van uw revolving credit lijn. Simuleer verschillende afbetalingsscenario's 
              en ontdek hoelang het duurt om uw doorlopend krediet af te betalen.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Revolving Credit
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Belgische Regelgeving
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Afbetaling Simulator
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
                  <i className="fas fa-credit-card mr-3 text-primary"></i>
                  Krediet Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="kredietlimiet">Kredietlimiet</Label>
                  <Input
                    id="kredietlimiet"
                    type="number"
                    value={kredietlimiet}
                    onChange={(e) => setKredietlimiet(Number(e.target.value))}
                    data-testid="input-kredietlimiet"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Maximum beschikbaar bedrag
                  </p>
                </div>

                <div>
                  <Label htmlFor="gebruiktBedrag">Gebruikt Bedrag</Label>
                  <Input
                    id="gebruiktBedrag"
                    type="number"
                    value={gebruiktBedrag}
                    onChange={(e) => setGebruiktBedrag(Number(e.target.value))}
                    data-testid="input-gebruikt-bedrag"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Huidige openstaande schuld
                  </p>
                </div>

                <div>
                  <Label htmlFor="betalingType">Afbetalingsstrategie</Label>
                  <Select value={betalingType} onValueChange={setBetalingType}>
                    <SelectTrigger data-testid="select-betaling-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimum">Minimum betaling</SelectItem>
                      <SelectItem value="vast">Vast bedrag</SelectItem>
                      <SelectItem value="percentage">Percentage van schuld</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {betalingType === "vast" && (
                  <div>
                    <Label htmlFor="maandelijkseBetaling">Maandelijkse Betaling</Label>
                    <Input
                      id="maandelijkseBetaling"
                      type="number"
                      value={maandelijkseBetaling}
                      onChange={(e) => setMaandelijkseBetaling(Number(e.target.value))}
                      data-testid="input-maandelijkse-betaling"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Minimum: €{Math.round(kredietInfo.minimumBetaling)}
                    </p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Rentetarieven & Kosten</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="debetrente">Debetrente (%)</Label>
                      <Input
                        id="debetrente"
                        type="number"
                        step="0.1"
                        value={debetrente}
                        onChange={(e) => setDebetrente(Number(e.target.value))}
                        data-testid="input-debetrente"
                      />
                    </div>

                    <div>
                      <Label htmlFor="kredietrente">Kredietrente (%)</Label>
                      <Input
                        id="kredietrente"
                        type="number"
                        step="0.1"
                        value={kredietrente}
                        onChange={(e) => setKredietrente(Number(e.target.value))}
                        data-testid="input-kredietrente"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Rente op positief saldo
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="maandelijkseKost">Maandelijkse Kosten</Label>
                      <Input
                        id="maandelijkseKost"
                        type="number"
                        value={maandelijkseKost}
                        onChange={(e) => setMaandelijkseKost(Number(e.target.value))}
                        data-testid="input-maandelijkse-kosten"
                      />
                    </div>

                    <div>
                      <Label htmlFor="jaarlijkseKost">Jaarlijkse Kosten</Label>
                      <Input
                        id="jaarlijkseKost"
                        type="number"
                        value={jaarlijkseKost}
                        onChange={(e) => setJaarlijkseKost(Number(e.target.value))}
                        data-testid="input-jaarlijkse-kosten"
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
                  <CardTitle className="text-lg">Beschikbaar Saldo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600" data-testid="text-beschikbaar">
                    €{Math.round(kredietInfo.beschikbaarSaldo).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Van €{kredietlimiet.toLocaleString()} limiet
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Benutting:</span>
                      <span>{Math.round((gebruiktBedrag / kredietlimiet) * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minimum betaling:</span>
                      <span>€{Math.round(kredietInfo.minimumBetaling)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Maandelijkse Kosten</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600" data-testid="text-maandelijkse-kosten">
                    €{Math.round(kredietInfo.maandelijkeRenteKost + maandelijkseKost)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Rente + vaste kosten
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Rente:</span>
                      <span>€{Math.round(kredietInfo.maandelijkeRenteKost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Effectieve JKP:</span>
                      <span>{kredietInfo.effectieveJaarrente.toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Warning for high utilization */}
            {(gebruiktBedrag / kredietlimiet) > 0.8 && (
              <Alert>
                <AlertDescription>
                  ⚠️ Uw kredietbenutting is {Math.round((gebruiktBedrag / kredietlimiet) * 100)}%. 
                  Een hoge benutting kan uw kredietwaardigheid negatief beïnvloeden.
                </AlertDescription>
              </Alert>
            )}

            {/* Mid Ad */}
            <GoogleAdsense slot="rectangle" />

            {/* Payment Scenarios */}
            <Card>
              <CardHeader>
                <CardTitle>Afbetalingsscenario's</CardTitle>
                <p className="text-muted-foreground">
                  Vergelijking van verschillende maandelijkse betalingsbedragen
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Scenario</th>
                        <th className="text-right p-2">Maandlast</th>
                        <th className="text-right p-2">Afbetaald in</th>
                        <th className="text-right p-2">Totale kosten</th>
                        <th className="text-right p-2">Totaal betaald</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentScenarios.map((scenario, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">{scenario.naam}</td>
                          <td className="p-2 text-right">€{Math.round(scenario.betaling)}</td>
                          <td className="p-2 text-right">{scenario.jaren} jaar</td>
                          <td className="p-2 text-right">
                            {typeof scenario.totaleKosten === 'number' 
                              ? `€${scenario.totaleKosten.toLocaleString()}` 
                              : scenario.totaleKosten}
                          </td>
                          <td className="p-2 text-right">
                            {typeof scenario.totaalBetaald === 'number' 
                              ? `€${scenario.totaalBetaald.toLocaleString()}` 
                              : scenario.totaalBetaald}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Utilization Projection */}
            <Card>
              <CardHeader>
                <CardTitle>Schuldevolutie</CardTitle>
                <p className="text-muted-foreground">
                  Verwachte afname van uw doorlopend krediet over de tijd
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Suspense fallback={<ChartSkeleton />}>
                    <DoorlopendKredietChart1 data={utilizationData} />
                  </Suspense>
                </div>
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Kostenverdeling</CardTitle>
                <p className="text-muted-foreground">
                  Overzicht van jaarlijkse kosten doorlopend krediet
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Suspense fallback={<ChartSkeleton />}>
                    <DoorlopendKredietChart2 data={kostenVergelijking} />
                  </Suspense>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  {kostenVergelijking.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.item}:</span>
                      <span>{item.percentage.toFixed(1)}% van totale kosten</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rate Comparison Widget */}
      <RateComparisonWidget productType="doorlopend-krediet" title="Vergelijk Doorlopend Krediet Aanbiedingen" />

      {/* Bottom Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GoogleAdsense slot="banner" className="w-full max-w-4xl mx-auto" />
      </section>

      {/* Related Calculators */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <RelatedCalculators currentSlug="doorlopend-krediet-calculator" />
      </section>

      {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} />}

      <Footer />
    </div>
  );
}