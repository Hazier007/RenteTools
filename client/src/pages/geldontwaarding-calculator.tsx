import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";

export default function GeldontwaardigCalculator() {
  const seoConfig = getSeoConfig("geldontwaarding-calculator");
  const [huidigeWaarde, setHuidigeWaarde] = useState<string>("10000");
  const [jaren, setJaren] = useState<string>("10");
  const [inflatie, setInflatie] = useState<string>("2.1");
  
  const berekenGeldontwaarding = () => {
    const startBedrag = parseFloat(huidigeWaarde) || 0;
    const periode = parseInt(jaren) || 0;
    const inflatiePerc = parseFloat(inflatie) || 0;
    
    // Toekomstige koopkracht berekenen
    const koopkrachtToekomst = startBedrag / Math.pow(1 + inflatiePerc/100, periode);
    const verlies = startBedrag - koopkrachtToekomst;
    const verliesPercentage = (verlies / startBedrag) * 100;
    
    // Hoeveel nominaal geld nodig voor zelfde koopkracht
    const benodigdNominaal = startBedrag * Math.pow(1 + inflatiePerc/100, periode);
    
    // Jaarlijkse koopkrachterosie
    const jaarlijksVerliesPercentage = (1 - Math.pow(koopkrachtToekomst / startBedrag, 1/periode)) * 100;
    
    // Voorbeelden van prijsstijgingen
    const broodPrijs = 2.50; // huidige prijs
    const broodToekomst = broodPrijs * Math.pow(1 + inflatiePerc/100, periode);
    
    const benzinePrijs = 1.60;
    const benzineToekomst = benzinePrijs * Math.pow(1 + inflatiePerc/100, periode);
    
    return {
      koopkrachtToekomst,
      verlies,
      verliesPercentage,
      benodigdNominaal,
      jaarlijksVerliesPercentage,
      broodPrijs,
      broodToekomst,
      benzinePrijs,
      benzineToekomst
    };
  };
  
  const resultaat = berekenGeldontwaarding();

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Geldontwaarding Calculator - Wat is mijn Geld Waard over 10 Jaar?
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken hoe inflatie uw koopkracht aantast. Ontdek wat uw geld waard is in de toekomst 
            en hoeveel koopkracht u verliest door geldontwaarding.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">💸 Impact van Geldontwaarding:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• €10.000 vandaag = €8.203 koopkracht na 10 jaar (2,1% inflatie)</li>
              <li>• Brood van €2,50 kost €3,04 na 10 jaar</li>
              <li>• Stilzittend geld verliest elk jaar koopkracht</li>
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
                  <i className="fas fa-coins mr-3 text-primary"></i>
                  Geldontwaarding Berekenen - Koopkrachtverlies Inflatie
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken hoe inflatie de waarde van uw geld aantast over tijd. 
                  Ontdek de werkelijke koopkracht van toekomstige bedragen.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="waarde">Huidige geldwaarde (€)</Label>
                      <Input
                        id="waarde"
                        type="number"
                        value={huidigeWaarde}
                        onChange={(e) => setHuidigeWaarde(e.target.value)}
                        placeholder="10000"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Het bedrag waarvan u de toekomstige koopkracht wilt weten
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="jaren">Aantal jaren vooruit</Label>
                      <Input
                        id="jaren"
                        type="number"
                        value={jaren}
                        onChange={(e) => setJaren(e.target.value)}
                        placeholder="10"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Over hoeveel jaar wilt u de waarde berekenen?
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="inflatie">Jaarlijkse inflatie (%)</Label>
                      <Input
                        id="inflatie"
                        type="number"
                        step="0.1"
                        value={inflatie}
                        onChange={(e) => setInflatie(e.target.value)}
                        placeholder="2.1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Verwachte inflatie (ECB doel: 2%, België gemiddeld: 2,1%)
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">ℹ️ Wat betekent geldontwaarding?</h4>
                      <p className="text-sm">
                        Geldontwaarding betekent dat u met hetzelfde geldbedrag minder kunt kopen 
                        dan vroeger. Dit komt door inflatie - de stijging van prijzen over tijd.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-4 text-red-800 dark:text-red-200">Koopkrachtverlies</h3>
                        <div className="space-y-3">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">€{parseFloat(huidigeWaarde || "0").toLocaleString('nl-BE')} vandaag is waard:</p>
                            <p className="text-2xl font-bold text-red-600">
                              €{resultaat.koopkrachtToekomst.toLocaleString('nl-BE', {maximumFractionDigits: 0})}
                            </p>
                            <p className="text-sm text-red-600">over {jaren} jaar</p>
                          </div>
                          
                          <div className="border-t pt-3 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Koopkrachtverlies:</span>
                              <span className="font-semibold text-red-600">
                                €{resultaat.verlies.toLocaleString('nl-BE', {maximumFractionDigits: 0})}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Verlies percentage:</span>
                              <span className="font-semibold text-red-600">
                                {resultaat.verliesPercentage.toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Jaarlijks verlies:</span>
                              <span className="text-red-600">
                                {resultaat.jaarlijksVerliesPercentage.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-4">Compensatie Benodig</h3>
                        <div className="space-y-3 text-sm">
                          <p>Voor dezelfde koopkracht over {jaren} jaar heeft u nodig:</p>
                          <p className="text-xl font-bold text-center">
                            €{resultaat.benodigdNominaal.toLocaleString('nl-BE', {maximumFractionDigits: 0})}
                          </p>
                          <p className="text-xs text-center text-muted-foreground">
                            {((resultaat.benodigdNominaal / parseFloat(huidigeWaarde || "1") - 1) * 100).toFixed(1)}% meer dan vandaag
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-orange-50 dark:bg-orange-950">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-4">Prijsvoorbeeld</h3>
                        <div className="space-y-3 text-sm">
                          <div>
                            <div className="flex justify-between">
                              <span>Brood vandaag:</span>
                              <span>€{resultaat.broodPrijs.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Brood over {jaren} jaar:</span>
                              <span className="font-semibold">€{resultaat.broodToekomst.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <div className="border-t pt-2">
                            <div className="flex justify-between">
                              <span>Benzine vandaag:</span>
                              <span>€{resultaat.benzinePrijs.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Benzine over {jaren} jaar:</span>
                              <span className="font-semibold">€{resultaat.benzineToekomst.toFixed(2)}</span>
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
                <CardTitle className="text-xl">Wat is Geldontwaarding? - Inflatie Correctie Berekenen</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Geldontwaarding is het verlies van koopkracht van geld door inflatie. 
                  Hetzelfde geldbedrag kan in de toekomst minder goederen en diensten kopen.
                </p>
                
                <h3>Hoe werkt Geldontwaarding?</h3>
                <ul>
                  <li><strong>Inflatie:</strong> Algemene prijsstijging van goederen en diensten</li>
                  <li><strong>Koopkrachterosie:</strong> Uw geld koopt elk jaar minder</li>
                  <li><strong>Compound effect:</strong> Het effect wordt sterker over tijd</li>
                  <li><strong>Onomkeerbaar:</strong> Deflatie komt zelden voor</li>
                </ul>
                
                <h3>Historische Voorbeelden Geldontwaarding:</h3>
                <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">📊 Prijsstijgingen België (2000-2025):</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Huizenprijs gemiddeld:</strong></p>
                      <ul className="ml-4">
                        <li>• 2000: €140.000</li>
                        <li>• 2025: €350.000</li>
                        <li>• Stijging: +150%</li>
                      </ul>
                    </div>
                    <div>
                      <p><strong>Brood per brood:</strong></p>
                      <ul className="ml-4">
                        <li>• 2000: €1,50</li>
                        <li>• 2025: €2,50</li>
                        <li>• Stijging: +67%</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">⚠️ Waarom Geldontwaarding Belangrijk is:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Pensioenen: Vaste uitkering verliest koopkracht</li>
                    <li>• Spaarrekeningen: Lage rente verliest van inflatie</li>
                    <li>• Schulden: Inflatie maakt schulden "goedkoper"</li>
                    <li>• Lonen: Moeten mee stijgen met inflatie</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Koopkrachtverlies Inflatie - Bescherming tegen Geldontwaarding</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  U kunt zich beschermen tegen geldontwaarding door te investeren in assets 
                  die mee stijgen met of sneller groeien dan inflatie.
                </p>
                
                <h3>Strategieën tegen Geldontwaarding:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Inflatie-resistente Beleggingen</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Aandelen (gemiddeld {'>'}5% per jaar)</li>
                      <li>• Vastgoed (stijgt mee met inflatie)</li>
                      <li>• Inflatie-gelinkte obligaties</li>
                      <li>• Grondstoffen (goud, olie)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Praktische Bescherming</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Hoogrentende spaarrekeningen</li>
                      <li>• Variabele hypotheek (rente stijgt mee)</li>
                      <li>• Indexatie-clausules in contracten</li>
                      <li>• Pensioensparen met belastingvoordeel</li>
                    </ul>
                  </div>
                </div>
                
                <h3>Risico's van Niets Doen:</h3>
                <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">💸 Gevolgen van Stilzitten:</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>Scenario: €100.000 cash aanhouden</strong></p>
                    <ul className="ml-4">
                      <li>• Na 10 jaar (2,1% inflatie): €82.030 koopkracht</li>
                      <li>• Na 20 jaar: €67.297 koopkracht</li>
                      <li>• Verlies: €32.703 (33% koopkracht weg!)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Action Plan tegen Geldontwaarding:</h4>
                  <ol className="text-sm space-y-1">
                    <li>1. Bereken uw huidige situatie met deze calculator</li>
                    <li>2. Zoek spaarrekening met rente {'>'} inflatie</li>
                    <li>3. Overweeg beleggingen voor lange termijn</li>
                    <li>4. Diversifieer uw vermogen</li>
                    <li>5. Bekijk jaarlijks uw strategie</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Veelgestelde Vragen - Geldontwaarding</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Wat is mijn geld waard over 10 jaar bij 2% inflatie?</h3>
                    <p className="text-sm text-muted-foreground">
                      Bij 2% inflatie heeft €10.000 over 10 jaar een koopkracht van ongeveer €8.203. 
                      U verliest dus 18% koopkracht, wat betekent dat uw geld 18% minder kan kopen.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Waarom is geldontwaarding slecht voor spaarders?</h3>
                    <p className="text-sm text-muted-foreground">
                      Als uw spaarrente lager is dan inflatie, verliest u elk jaar koopkracht. 
                      Uw spaargeld groeit wel, maar koopt minder dan voorheen.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Hoe kan ik mijn geld beschermen tegen inflatie?</h3>
                    <p className="text-sm text-muted-foreground">
                      Zoek beleggingen die historisch beter presteren dan inflatie: aandelen, vastgoed, 
                      of hoogrentende spaarrekeningen. Diversificatie is key.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Is geldontwaarding hetzelfde als inflatie?</h3>
                    <p className="text-sm text-muted-foreground">
                      Geldontwaarding is het gevolg van inflatie. Inflatie is de prijsstijging, 
                      geldontwaarding is het verlies van koopkracht van uw geld door die prijsstijging.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

        </div>
      </section>

      {/* Bottom Ad */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <GoogleAdsense slot="banner" className="hidden lg:block" />
          <GoogleAdsense slot="banner" className="lg:hidden" />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} />}
      </section>

      <Footer />
    </div>
  );
}