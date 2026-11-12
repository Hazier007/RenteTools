import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import RelatedCalculators from "@/components/seo/RelatedCalculators";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";
import EducationalSections from "@/components/seo/EducationalSections";
import { roerendeVoorheffingCalculatorContent } from "@/seo/calculator-content/roerende-voorheffing-calculator";

export default function RoerendeVoorheffingCalculator() {
  const seoConfig = getSeoConfig("roerende-voorheffing-calculator");
  useSeoTags("roerende-voorheffing-calculator");
  const [interestInkomsten, setInterestInkomsten] = useState<string>("1500");
  const [dividendInkomsten, setDividendInkomsten] = useState<string>("500");
  // Vrijstelling spaarrente per persoon (inkomstenjaar 2026; bevroren op €1.020 tot en met 2030)
  const [belastingvrij] = useState<number>(1020);
  // 15% op interest van gereglementeerde spaarrekeningen boven de vrijstelling
  const [roerendeVoorheffingSpaarrente] = useState<number>(15);
  // 30% op dividenden en op interest van termijnrekeningen, kasbons en obligaties
  const [roerendeVoorheffingPercentage] = useState<number>(30);
  
  const berekenRoerendeVoorheffing = () => {
    const totaleInterest = parseFloat(interestInkomsten) || 0;
    const totaalDividend = parseFloat(dividendInkomsten) || 0;
    const totaleInkomsten = totaleInterest + totaalDividend;
    
    // Interest berekening
    const belastbareInterest = Math.max(0, totaleInterest - belastingvrij);
    const voorheffingInterest = belastbareInterest * (roerendeVoorheffingSpaarrente / 100);
    const nettoInterest = totaleInterest - voorheffingInterest;
    
    // Dividend berekening (geen vrijstelling)
    const voorheffingDividend = totaalDividend * (roerendeVoorheffingPercentage / 100);
    const nettoDividend = totaalDividend - voorheffingDividend;
    
    // Totalen
    const totaleVoorheffing = voorheffingInterest + voorheffingDividend;
    const totaalNetto = nettoInterest + nettoDividend;
    
    return {
      totaleInkomsten,
      belastbareInterest,
      voorheffingInterest,
      voorheffingDividend,
      totaleVoorheffing,
      nettoInterest,
      nettoDividend,
      totaalNetto,
      effectiefPercentage: totaleInkomsten > 0 ? (totaleVoorheffing / totaleInkomsten) * 100 : 0
    };
  };
  
  const resultaat = berekenRoerendeVoorheffing();

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Roerende Voorheffing Calculator - Belasting op Spaarrente en Dividenden
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken hoeveel roerende voorheffing u betaalt op interest en dividenden. 
            Ontdek uw belastingvrije bedrag en netto-opbrengst van uw beleggingen.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">💰 Belastingtarieven 2026:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Spaarrente (gereglementeerde spaarrekening): €1.020 belastingvrij per persoon, daarna 15%</li>
              <li>• Dividenden, termijnrekeningen, kasbons en obligaties: 30% vanaf de eerste euro</li>
              <li>• Automatische inhouding door bank/broker</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <GoogleAdsense slot="banner" className="hidden lg:block" />
          <GoogleAdsense slot="banner" className="lg:hidden" />
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
            
            {/* Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  <i className="fas fa-percentage mr-3 text-primary"></i>
                  Roerende Voorheffing Berekenen - Belasting op Kapitaalinkomsten
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken uw roerende voorheffing op spaarrente, dividenden en andere kapitaalinkomsten. 
                  Inclusief belastingvrije schijf voor interest.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="interest">Jaarlijkse interest op gereglementeerde spaarrekeningen (€)</Label>
                      <Input
                        id="interest"
                        type="number"
                        value={interestInkomsten}
                        onChange={(e) => setInterestInkomsten(e.target.value)}
                        placeholder="1500"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Basisrente + getrouwheidspremie, alle spaarrekeningen samen (per persoon)
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="dividend">Jaarlijkse dividenden en overige interest aan 30% (€)</Label>
                      <Input
                        id="dividend"
                        type="number"
                        value={dividendInkomsten}
                        onChange={(e) => setDividendInkomsten(e.target.value)}
                        placeholder="500"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Dividenden van aandelen, fondsen en ETF's, plus interest van termijnrekeningen, kasbons en obligaties
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">ℹ️ Belastingvrije Bedragen 2026:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Interest: Eerste €{belastingvrij.toLocaleString('nl-BE')} belastingvrij</li>
                        <li>• Dividenden: Geen vrijstelling</li>
                        <li>• Tarief: {roerendeVoorheffingSpaarrente}% op spaarrente boven de vrijstelling, {roerendeVoorheffingPercentage}% op dividenden</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Card className="bg-primary/5">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-4">Berekening Overzicht</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span>Totale inkomsten:</span>
                            <span className="font-semibold">€{resultaat.totaleInkomsten.toLocaleString('nl-BE', {minimumFractionDigits: 2})}</span>
                          </div>
                          
                          <div className="border-t pt-2">
                            <h4 className="font-semibold mb-2">Interest ({parseFloat(interestInkomsten || "0").toLocaleString('nl-BE')}€):</h4>
                            <div className="flex justify-between text-xs">
                              <span>Belastingvrij:</span>
                              <span>€{Math.min(parseFloat(interestInkomsten || "0"), belastingvrij).toLocaleString('nl-BE')}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Belastbaar:</span>
                              <span>€{resultaat.belastbareInterest.toLocaleString('nl-BE')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Voorheffing {roerendeVoorheffingSpaarrente}%:</span>
                              <span className="text-red-600">-€{resultaat.voorheffingInterest.toLocaleString('nl-BE', {minimumFractionDigits: 2})}</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                              <span>Netto interest:</span>
                              <span>€{resultaat.nettoInterest.toLocaleString('nl-BE', {minimumFractionDigits: 2})}</span>
                            </div>
                          </div>
                          
                          <div className="border-t pt-2">
                            <h4 className="font-semibold mb-2">Dividenden &amp; overige inkomsten aan 30% ({parseFloat(dividendInkomsten || "0").toLocaleString('nl-BE')}€):</h4>
                            <div className="flex justify-between">
                              <span>Voorheffing 30%:</span>
                              <span className="text-red-600">-€{resultaat.voorheffingDividend.toLocaleString('nl-BE', {minimumFractionDigits: 2})}</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                              <span>Netto dividend:</span>
                              <span>€{resultaat.nettoDividend.toLocaleString('nl-BE', {minimumFractionDigits: 2})}</span>
                            </div>
                          </div>
                          
                          <div className="border-t pt-3 bg-muted -m-3 p-3 rounded">
                            <div className="flex justify-between text-lg font-bold">
                              <span>Totaal netto:</span>
                              <span className="text-primary">€{resultaat.totaalNetto.toLocaleString('nl-BE', {minimumFractionDigits: 2})}</span>
                            </div>
                            <div className="flex justify-between text-xs mt-1">
                              <span>Effectief belastingpercentage:</span>
                              <span>{resultaat.effectiefPercentage.toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ad After Calculator */}
            <div className="flex justify-center py-4">
              <GoogleAdsense slot="banner" />
            </div>

            {/* Content Sections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Belastingvrije Interest België - Hoeveel Spaarrente Belastingvrij?</CardTitle>
              </CardHeader>
              <CardContent className="prose">
                <p>
                  In België heeft elke belastingplichtige recht op een belastingvrij bedrag voor 
                  interest inkomsten. Dit bedrag wordt jaarlijks aangepast en geldt per persoon.
                </p>
                
                <h3>Belastingvrije Schijf Spaarrente 2026:</h3>
                <ul>
                  <li><strong>€1.020 per jaar (2026):</strong> belastingvrij per persoon op gereglementeerde spaarrekeningen; €2.040 voor gehuwden en wettelijk samenwonenden</li>
                  <li><strong>15% roerende voorheffing:</strong> op de spaarrente boven €1.020 (30% op niet-gereglementeerde rekeningen)</li>
                  <li><strong>Per persoon:</strong> Elk gezinslid heeft eigen vrijstelling</li>
                  <li><strong>Automatisch toegepast:</strong> Door uw bank of financiële instelling</li>
                </ul>
                
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">💡 Praktijkvoorbeelden Belastingvrije Interest:</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>€800 interest per jaar:</strong></p>
                      <ul className="ml-4">
                        <li>• €0 roerende voorheffing</li>
                        <li>• €800 netto interest</li>
                        <li>• Volledig onder vrijstelling</li>
                      </ul>
                    </div>
                    <div>
                      <p><strong>€1.500 interest per jaar:</strong></p>
                      <ul className="ml-4">
                        <li>• €72 roerende voorheffing (15% van €480)</li>
                        <li>• €1.428 netto interest</li>
                        <li>• €480 boven vrijstelling</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">⚠️ Let op bij Echtparen:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Elke partner heeft een eigen vrijstelling van €1.020</li>
                    <li>• Gehuwden en wettelijk samenwonenden: 2× €1.020 = €2.040 op de gezamenlijke aangifte</li>
                    <li>• Verdeel spaargeld strategisch over verschillende rekeningen</li>
                    <li>• Kinderen hebben ook eigen vrijstelling vanaf 18 jaar</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Roerende Voorheffing Berekenen - Dividenden vs Interest</CardTitle>
              </CardHeader>
              <CardContent className="prose">
                <p>
                  De roerende voorheffing wordt anders berekend voor verschillende soorten 
                  kapitaalinkomsten. Het is belangrijk om het onderscheid te kennen.
                </p>
                
                <h3>Verschillende Tarieven en Vrijstellingen:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💰 Interest Inkomsten</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Gereglementeerde spaarrekening: €1.020 belastingvrij per jaar</li>
                      <li>• 15% op de spaarrente boven de vrijstelling</li>
                      <li>• Termijnrekeningen, kasbons, obligaties: 30%, geen vrijstelling</li>
                      <li>• Staatsbons: 30% (de staatsbon van september 2023 uitzonderlijk 15%)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">📈 Dividend Inkomsten</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Geen vrijstelling</li>
                      <li>• 30% vanaf eerste euro</li>
                      <li>• Aandelen en beleggingsfondsen</li>
                      <li>• ETF's en SICAV's</li>
                    </ul>
                  </div>
                </div>
                
                <h3>Optimalisatie Strategieën:</h3>
                <ul>
                  <li><strong>Spreiding over partners:</strong> Gebruik beide vrijstellingen maximaal</li>
                  <li><strong>Timing van verkoop:</strong> Plan realisatie van meerwaarden</li>
                  <li><strong>Pensioensparenregeling:</strong> Belastingvoordeel op inleg</li>
                  <li><strong>Lange termijn aandelenplan:</strong> Belastingvrije meerwaarden na 1 jaar</li>
                </ul>
                
                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Belasting Optimalisatie Tips:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Spaarrekeningen splitsen over gezinsleden voor meer vrijstelling</li>
                    <li>• Groei-aandelen i.p.v. dividend-aandelen (meerwaarden belastingvrij)</li>
                    <li>• Pensioensparen voor belastingvermindering</li>
                    <li>• Lange termijn beleggen voor belastingvrije meerwaarden</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Uitleg en FAQ: dezelfde inhoud als de server-side HTML (server/seo-config.ts) */}
            <EducationalSections content={roerendeVoorheffingCalculatorContent} faqTitle="Veelgestelde vragen over roerende voorheffing" />

        </div>
      </section>

      {/* Bottom Ad */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <GoogleAdsense slot="banner" className="hidden lg:block" />
          <GoogleAdsense slot="banner" className="lg:hidden" />
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <RelatedCalculators currentSlug="roerende-voorheffing-calculator" />
      </section>

      {/* Authority Links */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} />}
      </section>

      <Footer />
    </div>
  );
}