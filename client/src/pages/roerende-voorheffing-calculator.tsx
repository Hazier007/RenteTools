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
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";

export default function RoerendeVoorheffingCalculator() {
  const seoConfig = getSeoConfig("roerende-voorheffing-calculator");
  const [interestInkomsten, setInterestInkomsten] = useState<string>("1500");
  const [dividendInkomsten, setDividendInkomsten] = useState<string>("500");
  const [belastingvrij] = useState<number>(980); // Belastingvrij bedrag 2025
  const [roerendeVoorheffingPercentage] = useState<number>(30);
  
  const berekenRoerendeVoorheffing = () => {
    const totaleInterest = parseFloat(interestInkomsten) || 0;
    const totaalDividend = parseFloat(dividendInkomsten) || 0;
    const totaleInkomsten = totaleInterest + totaalDividend;
    
    // Interest berekening
    const belastbareInterest = Math.max(0, totaleInterest - belastingvrij);
    const voorheffingInterest = belastbareInterest * (roerendeVoorheffingPercentage / 100);
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
            <p className="text-lg font-semibold mb-2">💰 Belastingtarieven 2025:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Spaarrente: €980 belastingvrij, daarna 30%</li>
              <li>• Dividenden: 30% vanaf de eerste euro</li>
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
                      <Label htmlFor="interest">Jaarlijkse interest inkomsten (€)</Label>
                      <Input
                        id="interest"
                        type="number"
                        value={interestInkomsten}
                        onChange={(e) => setInterestInkomsten(e.target.value)}
                        placeholder="1500"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Van spaarrekeningen, termijnrekeningen, obligaties
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="dividend">Jaarlijkse dividend inkomsten (€)</Label>
                      <Input
                        id="dividend"
                        type="number"
                        value={dividendInkomsten}
                        onChange={(e) => setDividendInkomsten(e.target.value)}
                        placeholder="500"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Van aandelen, beleggingsfondsen, ETF's
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">ℹ️ Belastingvrije Bedragen 2025:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Interest: Eerste €{belastingvrij.toLocaleString('nl-BE')} belastingvrij</li>
                        <li>• Dividenden: Geen vrijstelling</li>
                        <li>• Tarief: {roerendeVoorheffingPercentage}% op belastbaar bedrag</li>
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
                              <span>Voorheffing 30%:</span>
                              <span className="text-red-600">-€{resultaat.voorheffingInterest.toLocaleString('nl-BE', {minimumFractionDigits: 2})}</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                              <span>Netto interest:</span>
                              <span>€{resultaat.nettoInterest.toLocaleString('nl-BE', {minimumFractionDigits: 2})}</span>
                            </div>
                          </div>
                          
                          <div className="border-t pt-2">
                            <h4 className="font-semibold mb-2">Dividenden ({parseFloat(dividendInkomsten || "0").toLocaleString('nl-BE')}€):</h4>
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

            {/* Content Sections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Belastingvrije Interest België - Hoeveel Spaarrente Belastingvrij?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  In België heeft elke belastingplichtige recht op een belastingvrij bedrag voor 
                  interest inkomsten. Dit bedrag wordt jaarlijks aangepast en geldt per persoon.
                </p>
                
                <h3>Belastingvrije Schijf Spaarrente 2025:</h3>
                <ul>
                  <li><strong>€980 per jaar:</strong> Volledig belastingvrij voor alle spaarders</li>
                  <li><strong>30% roerende voorheffing:</strong> Op het bedrag boven €980</li>
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
                        <li>• €156 roerende voorheffing (30% van €520)</li>
                        <li>• €1.344 netto interest</li>
                        <li>• €520 boven vrijstelling</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">⚠️ Let op bij Echtparen:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Elk gezinslid heeft eigen €980 vrijstelling</li>
                    <li>• Spaarrekening op naam van beide partners: 2× €980 = €1.960</li>
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
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  De roerende voorheffing wordt anders berekend voor verschillende soorten 
                  kapitaalinkomsten. Het is belangrijk om het onderscheid te kennen.
                </p>
                
                <h3>Verschillende Tarieven en Vrijstellingen:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💰 Interest Inkomsten</h4>
                    <ul className="text-sm space-y-1">
                      <li>• €980 belastingvrij per jaar</li>
                      <li>• 30% op bedrag boven vrijstelling</li>
                      <li>• Spaarrekeningen, termijnrekeningen</li>
                      <li>• Obligaties en staatsbon</li>
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

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Veelgestelde Vragen - Roerende Voorheffing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Hoeveel spaarrente is belastingvrij in België?</h3>
                    <p className="text-sm text-muted-foreground">
                      In 2025 is €980 aan interest per jaar volledig belastingvrij. Dit geldt per persoon, 
                      dus echtparen kunnen samen €1.960 belastingvrij ontvangen.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Wanneer wordt roerende voorheffing automatisch ingehouden?</h3>
                    <p className="text-sm text-muted-foreground">
                      Uw bank houdt automatisch 30% roerende voorheffing in op interest boven €980 
                      en op alle dividenden. Dit gebeurt op het moment van uitbetaling.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Moet ik roerende voorheffing aangeven in mijn belastingaangifte?</h3>
                    <p className="text-sm text-muted-foreground">
                      Voor gewone spaar- en beleggingsrekeningen is geen aangifte nodig. De roerende voorheffing 
                      is definitief. Alleen bij professionele beleggingen moet u aangeven.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Kan ik roerende voorheffing terugkrijgen?</h3>
                    <p className="text-sm text-muted-foreground">
                      In principe niet, behalve bij incorrecte inhouding of bij specifieke gevallen 
                      zoals buitenlandse bronheffing die hoger is dan 30%.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

        </div>
      </section>

      {/* Ad After Calculator */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <GoogleAdsense slot="banner" />
        </div>
      </section>

      {/* Bottom Ad */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <GoogleAdsense slot="banner" className="hidden lg:block" />
          <GoogleAdsense slot="banner" className="lg:hidden" />
        </div>
      </section>

      {/* Authority Links */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} />}
      </section>

      <Footer />
    </div>
  );
}