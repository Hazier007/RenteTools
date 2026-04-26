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
import { useState, lazy, Suspense } from "react";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";
import RelatedCalculators from "@/components/seo/RelatedCalculators";

import { ChartSkeleton } from "@/components/ui/chart-skeleton";

const ObligatieChart1 = lazy(() => import("./obligatie-chart-1"));
const ObligatieChart2 = lazy(() => import("./obligatie-chart-2"));

interface Obligatie {
  naam: string;
  type: string;
  looptijd: number;
  couponRente: number;
  rating: string;
  emittent: string;
  valuta: string;
  minimumInleg: number;
}

export default function ObligatieCalculatorPage() {
  const seoConfig = getSeoConfig("obligatie-calculator");
  useSeoTags("obligatie-calculator");

  const [obligatieData, setObligatieData] = useState({
    nominaleWaarde: 1000,
    huidigeKoers: 980,
    couponRente: 2.5,
    looptijdJaren: 10,
    couponFrequentie: 1, // jaarlijks
    aantalObligaties: 10,
    transactiekosten: 15,
    bronheffing: 30,
    marktRente: 3.0,
    kredietRisico: 0.2
  });

  // Popular Belgian bonds and reference bonds
  const populaireObligaties: Obligatie[] = [
    {
      naam: "OLO 10 jaar",
      type: "Staatsobligatie",
      looptijd: 10,
      couponRente: 2.5,
      rating: "AA",
      emittent: "Belgische Staat",
      valuta: "EUR",
      minimumInleg: 1000
    },
    {
      naam: "OLO 5 jaar",
      type: "Staatsobligatie", 
      looptijd: 5,
      couponRente: 1.8,
      rating: "AA",
      emittent: "Belgische Staat",
      valuta: "EUR",
      minimumInleg: 1000
    },
    {
      naam: "KBC Bank Obligatie",
      type: "Bedrijfsobligatie",
      looptijd: 7,
      couponRente: 3.2,
      rating: "A-",
      emittent: "KBC Group",
      valuta: "EUR",
      minimumInleg: 1000
    },
    {
      naam: "Proximus Corporate Bond",
      type: "Bedrijfsobligatie",
      looptijd: 8,
      couponRente: 2.8,
      rating: "BBB+",
      emittent: "Proximus",
      valuta: "EUR",
      minimumInleg: 1000
    },
    {
      naam: "EU Bond 15 jaar",
      type: "Supranationale",
      looptijd: 15,
      couponRente: 2.9,
      rating: "AAA",
      emittent: "Europese Unie",
      valuta: "EUR",
      minimumInleg: 1000
    }
  ];

  // Calculate bond metrics
  const berekenObligatieMetrics = () => {
    const { nominaleWaarde, huidigeKoers, couponRente, looptijdJaren, couponFrequentie, aantalObligaties, transactiekosten, bronheffing, marktRente } = obligatieData;
    
    // Basic calculations
    const aankoopprijs = (huidigeKoers / 100) * nominaleWaarde;
    const totaleInvestering = (aankoopprijs * aantalObligaties) + transactiekosten;
    const jaarlijkseCoupon = (couponRente / 100) * nominaleWaarde;
    const couponPerPeriode = jaarlijkseCoupon / couponFrequentie;
    const periodenPerJaar = couponFrequentie;
    const totaalPerioden = looptijdJaren * periodenPerJaar;
    
    // Current Yield
    const huidigeYield = (jaarlijkseCoupon / aankoopprijs) * 100;
    
    // Yield to Maturity (YTM) - iterative calculation
    const berekenYTM = () => {
      let ytm = huidigeYield / 100; // starting guess
      const maxIteraties = 100;
      const tolerantie = 0.0001;
      
      for (let i = 0; i < maxIteraties; i++) {
        let pv = 0;
        
        // Present value of coupon payments
        for (let periode = 1; periode <= totaalPerioden; periode++) {
          pv += couponPerPeriode / Math.pow(1 + ytm / periodenPerJaar, periode);
        }
        
        // Present value of principal repayment
        pv += nominaleWaarde / Math.pow(1 + ytm / periodenPerJaar, totaalPerioden);
        
        const verschil = pv - aankoopprijs;
        
        if (Math.abs(verschil) < tolerantie) {
          break;
        }
        
        // Newton-Raphson method adjustment
        let dPvDy = 0;
        for (let periode = 1; periode <= totaalPerioden; periode++) {
          dPvDy -= (periode * couponPerPeriode) / (periodenPerJaar * Math.pow(1 + ytm / periodenPerJaar, periode + 1));
        }
        dPvDy -= (totaalPerioden * nominaleWaarde) / (periodenPerJaar * Math.pow(1 + ytm / periodenPerJaar, totaalPerioden + 1));
        
        ytm = ytm - verschil / dPvDy;
      }
      
      return ytm * 100;
    };
    
    const yieldToMaturity = berekenYTM();
    
    // Modified Duration
    const berekenModifiedDuration = () => {
      const y = yieldToMaturity / 100 / periodenPerJaar;
      let duration = 0;
      let totaalPV = 0;
      
      for (let periode = 1; periode <= totaalPerioden; periode++) {
        const pv = couponPerPeriode / Math.pow(1 + y, periode);
        duration += (periode / periodenPerJaar) * pv;
        totaalPV += pv;
      }
      
      // Principal repayment
      const principalPV = nominaleWaarde / Math.pow(1 + y, totaalPerioden);
      duration += (totaalPerioden / periodenPerJaar) * principalPV;
      totaalPV += principalPV;
      
      const macaulayDuration = duration / totaalPV;
      const modifiedDuration = macaulayDuration / (1 + yieldToMaturity / 100 / periodenPerJaar);
      
      return { macaulayDuration, modifiedDuration };
    };
    
    const { macaulayDuration, modifiedDuration } = berekenModifiedDuration();
    
    // Interest rate sensitivity
    const prijsVeranderingBij1Procent = modifiedDuration * aankoopprijs / 100;
    
    // Total returns
    const totaalCouponBetalingen = jaarlijkseCoupon * looptijdJaren * aantalObligaties;
    const brutoCouponBetalingen = totaalCouponBetalingen;
    const couponBelasting = brutoCouponBetalingen * (bronheffing / 100);
    const nettoCouponBetalingen = brutoCouponBetalingen - couponBelasting;
    
    const terugbetalingBijVerval = nominaleWaarde * aantalObligaties;
    const kapitaalWinst = terugbetalingBijVerval - (aankoopprijs * aantalObligaties);
    const totaalRendement = nettoCouponBetalingen + kapitaalWinst - transactiekosten;
    const totaalRendementPercentage = (totaalRendement / totaleInvestering) * 100;
    const jaarlijksRendement = Math.pow(1 + totaalRendementPercentage / 100, 1 / looptijdJaren) - 1;
    
    // Generate cash flow projection
    const cashFlowData = [];
    let cumulatiefNettoCoupon = 0;
    
    for (let jaar = 0; jaar <= looptijdJaren; jaar++) {
      let couponBetaling = 0;
      let nettoCouponBetaling = 0;
      let principaalTerugbetaling = 0;
      
      if (jaar > 0 && jaar < looptijdJaren) {
        couponBetaling = jaarlijkseCoupon * aantalObligaties;
        nettoCouponBetaling = couponBetaling * (1 - bronheffing / 100);
        cumulatiefNettoCoupon += nettoCouponBetaling;
      } else if (jaar === looptijdJaren) {
        couponBetaling = jaarlijkseCoupon * aantalObligaties;
        nettoCouponBetaling = couponBetaling * (1 - bronheffing / 100);
        principaalTerugbetaling = nominaleWaarde * aantalObligaties;
        cumulatiefNettoCoupon += nettoCouponBetaling;
      }
      
      const totaalCashFlow = nettoCouponBetaling + principaalTerugbetaling;
      const cumulatiefTotaal = cumulatiefNettoCoupon + (jaar === looptijdJaren ? principaalTerugbetaling : 0);
      
      cashFlowData.push({
        jaar,
        couponBetaling: Math.round(couponBetaling),
        nettoCouponBetaling: Math.round(nettoCouponBetaling),
        principaalTerugbetaling: Math.round(principaalTerugbetaling),
        totaalCashFlow: Math.round(totaalCashFlow),
        cumulatiefNetto: Math.round(cumulatiefNettoCoupon),
        cumulatiefTotaal: Math.round(cumulatiefTotaal)
      });
    }
    
    // Interest rate scenario analysis
    const rentescenarios = [-2, -1, -0.5, 0, 0.5, 1, 2].map(verandering => {
      const nieuweYield = (yieldToMaturity + verandering) / 100 / periodenPerJaar;
      let nieuwePrijs = 0;
      
      // Calculate new bond price
      for (let periode = 1; periode <= totaalPerioden; periode++) {
        nieuwePrijs += couponPerPeriode / Math.pow(1 + nieuweYield, periode);
      }
      nieuwePrijs += nominaleWaarde / Math.pow(1 + nieuweYield, totaalPerioden);
      
      const prijsVerandering = nieuwePrijs - aankoopprijs;
      const prijsVeranderingPercentage = (prijsVerandering / aankoopprijs) * 100;
      
      return {
        renteverandering: verandering,
        nieuweYield: (yieldToMaturity + verandering).toFixed(2),
        nieuwePrijs: Math.round(nieuwePrijs),
        prijsVerandering: Math.round(prijsVerandering),
        prijsVeranderingPercentage: prijsVeranderingPercentage.toFixed(2)
      };
    });
    
    return {
      totaleInvestering,
      aankoopprijs,
      huidigeYield,
      yieldToMaturity,
      macaulayDuration,
      modifiedDuration,
      prijsVeranderingBij1Procent,
      brutoCouponBetalingen,
      nettoCouponBetalingen,
      couponBelasting,
      kapitaalWinst,
      totaalRendement,
      totaalRendementPercentage,
      jaarlijksRendement: jaarlijksRendement * 100,
      cashFlowData,
      rentescenarios
    };
  };

  const resultaat = berekenObligatieMetrics();

  // Create bond comparison
  const obligatieVergelijking = populaireObligaties.map(obligatie => {
    // Simplified YTM calculation for comparison
    const aangenomenKoers = 100; // Par value for comparison
    const huidigeYieldComp = obligatie.couponRente;
    const creditSpread = obligatie.rating === 'AAA' ? 0 : 
                        obligatie.rating === 'AA' ? 0.1 :
                        obligatie.rating === 'A-' ? 0.3 : 0.5;
    
    return {
      ...obligatie,
      huidigeYield: huidigeYieldComp,
      geschatteYTM: huidigeYieldComp + creditSpread,
      creditSpread,
      risicoScore: obligatie.rating === 'AAA' ? 1 : 
                   obligatie.rating === 'AA' ? 2 :
                   obligatie.rating === 'A-' ? 3 : 4
    };
  });

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
              Obligatie Calculator België
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Bereken yield to maturity, duration en obligatie waardering. 
              Analyseer Belgische staatsleningen (OLO) en bedrijfsobligaties inclusief belastingen.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                YTM Berekening
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Duration Analyse
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Renteovering
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
            
            {/* Bond Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-certificate mr-3 text-primary"></i>
                  Obligatie Gegevens
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nominaleWaarde">Nominale waarde (€)</Label>
                  <Input
                    id="nominaleWaarde"
                    type="number"
                    value={obligatieData.nominaleWaarde}
                    onChange={(e) => setObligatieData({...obligatieData, nominaleWaarde: Number(e.target.value)})}
                    data-testid="input-nominale-waarde"
                  />
                </div>

                <div>
                  <Label htmlFor="huidigeKoers">Huidige koers (%)</Label>
                  <Input
                    id="huidigeKoers"
                    type="number"
                    step="0.1"
                    value={obligatieData.huidigeKoers}
                    onChange={(e) => setObligatieData({...obligatieData, huidigeKoers: Number(e.target.value)})}
                    data-testid="input-huidige-koers"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    100% = pari, &lt;100% = discount, &gt;100% = premium
                  </p>
                </div>

                <div>
                  <Label htmlFor="couponRente">Coupon rente (%)</Label>
                  <Input
                    id="couponRente"
                    type="number"
                    step="0.1"
                    value={obligatieData.couponRente}
                    onChange={(e) => setObligatieData({...obligatieData, couponRente: Number(e.target.value)})}
                    data-testid="input-coupon-rente"
                  />
                </div>

                <div>
                  <Label htmlFor="looptijdJaren">Resterende looptijd (jaren)</Label>
                  <Input
                    id="looptijdJaren"
                    type="number"
                    value={obligatieData.looptijdJaren}
                    onChange={(e) => setObligatieData({...obligatieData, looptijdJaren: Number(e.target.value)})}
                    data-testid="input-looptijd-jaren"
                  />
                </div>

                <div>
                  <Label htmlFor="couponFrequentie">Coupon frequentie</Label>
                  <Select value={obligatieData.couponFrequentie.toString()} onValueChange={(value) => setObligatieData({...obligatieData, couponFrequentie: Number(value)})}>
                    <SelectTrigger data-testid="select-coupon-frequentie">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Jaarlijks</SelectItem>
                      <SelectItem value="2">Halfjaarlijks</SelectItem>
                      <SelectItem value="4">Kwartaal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="aantalObligaties">Aantal obligaties</Label>
                  <Input
                    id="aantalObligaties"
                    type="number"
                    value={obligatieData.aantalObligaties}
                    onChange={(e) => setObligatieData({...obligatieData, aantalObligaties: Number(e.target.value)})}
                    data-testid="input-aantal-obligaties"
                  />
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
                  <Label htmlFor="transactiekosten">Transactiekosten (€)</Label>
                  <Input
                    id="transactiekosten"
                    type="number"
                    step="0.01"
                    value={obligatieData.transactiekosten}
                    onChange={(e) => setObligatieData({...obligatieData, transactiekosten: Number(e.target.value)})}
                    data-testid="input-transactiekosten"
                  />
                </div>

                <div>
                  <Label htmlFor="bronheffing">Bronheffing op coupon (%)</Label>
                  <Select value={obligatieData.bronheffing.toString()} onValueChange={(value) => setObligatieData({...obligatieData, bronheffing: Number(value)})}>
                    <SelectTrigger data-testid="select-bronheffing">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30% (Standaard België)</SelectItem>
                      <SelectItem value="25">25% (Verminderd tarief)</SelectItem>
                      <SelectItem value="15">15% (Belgische staat OLO)</SelectItem>
                      <SelectItem value="0">0% (Vrijgesteld)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="marktRente">Huidige marktrente (%)</Label>
                  <Input
                    id="marktRente"
                    type="number"
                    step="0.1"
                    value={obligatieData.marktRente}
                    onChange={(e) => setObligatieData({...obligatieData, marktRente: Number(e.target.value)})}
                    data-testid="input-markt-rente"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Voor prijsgevoeligheidsanalyse
                  </p>
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
                  <CardTitle className="text-lg">Yield Analyse</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary" data-testid="text-ytm">
                    {resultaat.yieldToMaturity.toFixed(2)}%
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Yield to Maturity (YTM)
                  </p>
                  <div className="mt-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Current Yield:</span>
                      <span>{resultaat.huidigeYield.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Aankoopprijs:</span>
                      <span>€{Math.round(resultaat.aankoopprijs)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Duration & Risico</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600" data-testid="text-modified-duration">
                    {resultaat.modifiedDuration.toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Modified Duration
                  </p>
                  <div className="mt-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Macaulay Duration:</span>
                      <span>{resultaat.macaulayDuration.toFixed(2)} jaar</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prijsgevoeligheid:</span>
                      <span>€{Math.round(resultaat.prijsVeranderingBij1Procent)}/1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Totaal Rendement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600" data-testid="text-jaarlijks-rendement">
                    {resultaat.jaarlijksRendement.toFixed(2)}%
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Netto jaarlijks rendement
                  </p>
                  <div className="mt-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Totaal rendement:</span>
                      <span>{resultaat.totaalRendementPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Netto opbrengst:</span>
                      <span>€{Math.round(resultaat.totaalRendement).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for Different Views */}
            <Tabs defaultValue="cashflow" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
                <TabsTrigger value="gevoeligheid">Rentegevoeligheid</TabsTrigger>
                <TabsTrigger value="vergelijking">Bond Vergelijking</TabsTrigger>
                <TabsTrigger value="fiscaal">Fiscale Analyse</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cashflow" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cash Flow Projectie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <Suspense fallback={<ChartSkeleton />}>
                        <ObligatieChart1 data={resultaat.cashFlowData} />
                      </Suspense>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cash Flow Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Jaar</th>
                            <th className="text-right p-2">Bruto Coupon</th>
                            <th className="text-right p-2">Netto Coupon</th>
                            <th className="text-right p-2">Hoofdsom</th>
                            <th className="text-right p-2">Totaal</th>
                            <th className="text-right p-2">Cumulatief</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resultaat.cashFlowData.slice(1).map((flow, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2">{flow.jaar}</td>
                              <td className="p-2 text-right">€{flow.couponBetaling.toLocaleString()}</td>
                              <td className="p-2 text-right">€{flow.nettoCouponBetaling.toLocaleString()}</td>
                              <td className="p-2 text-right">€{flow.principaalTerugbetaling.toLocaleString()}</td>
                              <td className="p-2 text-right font-semibold">€{flow.totaalCashFlow.toLocaleString()}</td>
                              <td className="p-2 text-right">€{flow.cumulatiefTotaal.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gevoeligheid" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Renteovering Scenario Analyse</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <Suspense fallback={<ChartSkeleton />}>
                        <ObligatieChart2 data={resultaat.rentescenarios} />
                      </Suspense>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Scenario Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Renteverandering</th>
                            <th className="text-right p-2">Nieuwe Yield</th>
                            <th className="text-right p-2">Nieuwe Prijs</th>
                            <th className="text-right p-2">Prijsverandering</th>
                            <th className="text-right p-2">Percentage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resultaat.rentescenarios.map((scenario, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2">{scenario.renteverandering > 0 ? '+' : ''}{scenario.renteverandering}%</td>
                              <td className="p-2 text-right">{scenario.nieuweYield}%</td>
                              <td className="p-2 text-right">€{scenario.nieuwePrijs}</td>
                              <td className={`p-2 text-right ${Number(scenario.prijsVerandering) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                €{scenario.prijsVerandering}
                              </td>
                              <td className={`p-2 text-right ${Number(scenario.prijsVeranderingPercentage) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {scenario.prijsVeranderingPercentage}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vergelijking" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Belgische Obligaties Vergelijking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Obligatie</th>
                            <th className="text-right p-2">Coupon</th>
                            <th className="text-right p-2">Looptijd</th>
                            <th className="text-right p-2">Geschatte YTM</th>
                            <th className="text-right p-2">Rating</th>
                            <th className="text-right p-2">Credit Spread</th>
                            <th className="text-left p-2">Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {obligatieVergelijking.map((obligatie, index) => (
                            <tr key={index} className="border-b hover:bg-muted/50">
                              <td className="p-2">
                                <div>
                                  <div className="font-medium">{obligatie.naam}</div>
                                  <div className="text-xs text-muted-foreground">{obligatie.emittent}</div>
                                </div>
                              </td>
                              <td className="p-2 text-right">{obligatie.couponRente.toFixed(1)}%</td>
                              <td className="p-2 text-right">{obligatie.looptijd} jaar</td>
                              <td className="p-2 text-right">{obligatie.geschatteYTM.toFixed(1)}%</td>
                              <td className="p-2 text-right">
                                <Badge variant={obligatie.rating === 'AAA' ? 'default' : 'secondary'}>
                                  {obligatie.rating}
                                </Badge>
                              </td>
                              <td className="p-2 text-right">{obligatie.creditSpread.toFixed(1)}%</td>
                              <td className="p-2 text-sm">{obligatie.type}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fiscaal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Belastingbehandeling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Coupon Betalingen:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Bruto coupons (totaal):</span>
                            <span>€{Math.round(resultaat.brutoCouponBetalingen).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Bronheffing ({obligatieData.bronheffing}%):</span>
                            <span className="text-red-600">-€{Math.round(resultaat.couponBelasting).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span>Netto coupons:</span>
                            <span>€{Math.round(resultaat.nettoCouponBetalingen).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Kapitaalwinst/verlies:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Nominale waarde:</span>
                            <span>€{Math.round(obligatieData.nominaleWaarde * obligatieData.aantalObligaties).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Aankoopprijs:</span>
                            <span>€{Math.round(resultaat.aankoopprijs * obligatieData.aantalObligaties).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Kapitaalresultaat:</span>
                            <span className={resultaat.kapitaalWinst >= 0 ? 'text-green-600' : 'text-red-600'}>
                              €{Math.round(resultaat.kapitaalWinst).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Belasting (particulier):</span>
                            <span className="text-green-600">€0 (vrijgesteld)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Fiscale Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Alert>
                        <AlertDescription>
                          🏛️ <strong>Belgische staatsobligaties (OLO):</strong> 
                          Lagere bronheffing van 15% i.p.v. 30% voor bedrijfsobligaties.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          💰 <strong>Kapitaalwinst vrijgesteld:</strong> 
                          Voor particulieren zijn kapitaalwinsten op obligaties niet belastbaar.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          📅 <strong>Timing optimalisatie:</strong> 
                          Verkoop verlieslatende obligaties voor het jaar einde voor eventuele compensatie.
                        </AlertDescription>
                      </Alert>
                      
                      <Alert>
                        <AlertDescription>
                          🌍 <strong>Buitenlandse obligaties:</strong> 
                          Let op dubbele belastingheffing en mogelijke teruggave via verdragen.
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
      <RateComparisonWidget productType="obligatie-belegging" title="Vergelijk Obligatie Platforms" />

      {/* Bottom Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GoogleAdsense slot="banner" className="w-full max-w-4xl mx-auto" />
      </section>

      {/* Related Calculators */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <RelatedCalculators currentSlug="obligatie-calculator" />
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