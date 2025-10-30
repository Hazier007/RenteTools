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
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function WettelijkeRentevoetBelgie() {
  const seoConfig = getSeoConfig("wettelijke-rentevoet-belgie");
  useSeoTags("wettelijke-rentevoet-belgie");

  const [hoofdsom, setHoofdsom] = useState<string>("10000");
  const [dagen, setDagen] = useState<string>("30");
  const [rentevoet] = useState<string>("7"); // Actuele wettelijke rentevoet 2025
  
  const berekenWettelijkeRente = () => {
    const bedrag = parseFloat(hoofdsom) || 0;
    const aantalDagen = parseInt(dagen) || 0;
    const rente = parseFloat(rentevoet) || 0;
    
    const jaarlijkseRente = (bedrag * rente) / 100;
    const dagelijkseRente = jaarlijkseRente / 365;
    const totaleRente = dagelijkseRente * aantalDagen;
    
    return {
      dagelijks: dagelijkseRente,
      totaal: totaleRente,
      eindBedrag: bedrag + totaleRente
    };
  };
  
  const resultaat = berekenWettelijkeRente();

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Wettelijke Rentevoet België 2025 - Nalatigheidsinterest Berekenen
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken wettelijke interest en nalatigheidsinterest volgens de actuele Belgische wetgeving. 
            Ontdek de huidige rentevoet en bereken uw verschuldigde of ontvangen interest.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">⚖️ Actuele tarieven 2025:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Wettelijke rentevoet: 7,00% per jaar</li>
              <li>• Gerechtelijke rentevoet: 7,00% per jaar</li>
              <li>• BTW nalatigheidsinterest: 7,00% per jaar</li>
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
                  <i className="fas fa-gavel mr-3 text-primary"></i>
                  Wettelijke Interest Calculator - Nalatigheidsrente Berekenen
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken wettelijke interest volgens de Belgische wetgeving. Voor facturen, 
                  contracten, BTW en andere wettelijke verplichtingen.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="hoofdsom">Hoofdsom (€)</Label>
                      <Input
                        id="hoofdsom"
                        type="number"
                        value={hoofdsom}
                        onChange={(e) => setHoofdsom(e.target.value)}
                        placeholder="10000"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="dagen">Aantal dagen vertraging</Label>
                      <Input
                        id="dagen"
                        type="number"
                        value={dagen}
                        onChange={(e) => setDagen(e.target.value)}
                        placeholder="30"
                      />
                    </div>
                    
                    <div>
                      <Label>Wettelijke rentevoet 2025</Label>
                      <Input
                        value={`${rentevoet}% per jaar`}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Card className="bg-primary/5">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-4">Berekening Resultaat</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Hoofdsom:</span>
                            <span className="font-semibold">€{parseFloat(hoofdsom || "0").toLocaleString('nl-BE', {minimumFractionDigits: 2})}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Interest per dag:</span>
                            <span>€{resultaat.dagelijks.toLocaleString('nl-BE', {minimumFractionDigits: 2})}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Totale interest:</span>
                            <span className="font-semibold">€{resultaat.totaal.toLocaleString('nl-BE', {minimumFractionDigits: 2})}</span>
                          </div>
                          <div className="border-t pt-3">
                            <div className="flex justify-between text-lg">
                              <span className="font-semibold">Totaal te betalen:</span>
                              <span className="font-bold text-primary">€{resultaat.eindBedrag.toLocaleString('nl-BE', {minimumFractionDigits: 2})}</span>
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
                <CardTitle className="text-xl">Wat is de wettelijke rentevoet in België?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  De wettelijke rentevoet in België is het percentage dat wettelijk wordt gehanteerd 
                  voor het berekenen van nalatigheidsinterest bij te late betalingen. Deze rentevoet 
                  wordt jaarlijks vastgesteld door de Minister van Financiën.
                </p>
                
                <h3>Actuele Rentevoet België 2025:</h3>
                <ul>
                  <li><strong>7,00% per jaar:</strong> Voor alle wettelijke verplichtingen</li>
                  <li><strong>Dagelijks samengesteld:</strong> Interest wordt dagelijks berekend</li>
                  <li><strong>Vanaf vervaldatum:</strong> Telt vanaf de oorspronkelijke vervaldatum</li>
                  <li><strong>Automatisch van toepassing:</strong> Geen formele ingebrekestelling nodig</li>
                </ul>
                
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">📊 Historische Wettelijke Rentevoeten:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 2025: 7,00% (huidig tarief)</li>
                    <li>• 2024: 7,00%</li>
                    <li>• 2023: 7,00%</li>
                    <li>• 2022: 7,00%</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Nalatigheidsinterest Berekenen - Praktische Toepassingen</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Nalatigheidsinterest is van toepassing in verschillende situaties waar betalingen 
                  te laat gebeuren. De berekening volgt altijd dezelfde wettelijke regels.
                </p>
                
                <h3>Wanneer geldt wettelijke interest?</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">🧾 Commerciële Transacties</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Te late factuurbetalingen</li>
                      <li>• Leveranciersschulden</li>
                      <li>• Contractuele verplichtingen</li>
                      <li>• Schadevergoedingen</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">🏛️ Overheidsschulden</h4>
                    <ul className="text-sm space-y-1">
                      <li>• BTW achterstallige betalingen</li>
                      <li>• Sociale zekerheidsbijdragen</li>
                      <li>• Belastingschulden</li>
                      <li>• Boetes en administratieve sancties</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">💡 Praktijkvoorbeeld Berekening:</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>Factuur €5.000 - 60 dagen te laat betaald:</strong></p>
                    <ul className="ml-4">
                      <li>• Hoofdsom: €5.000</li>
                      <li>• Rentevoet: 7,00% per jaar</li>
                      <li>• Interest: €5.000 × 7% × 60/365 = €57,53</li>
                      <li>• <strong>Totaal te betalen: €5.057,53</strong></li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Veelgestelde Vragen - Wettelijke Rentevoet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Hoe wordt wettelijke interest berekend in België?</h3>
                    <p className="text-sm text-muted-foreground">
                      Wettelijke interest wordt berekend als: (Hoofdsom × Rentevoet × Aantal dagen) ÷ 365. 
                      De berekening start vanaf de vervaldatum van de betaling.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Wanneer start de wettelijke interest te lopen?</h3>
                    <p className="text-sm text-muted-foreground">
                      De wettelijke interest start automatisch te lopen vanaf de vervaldatum, 
                      ook zonder ingebrekestelling. Bij facturen geldt dit vanaf de betalingstermijn.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Kan ik wettelijke interest claimen op oude schulden?</h3>
                    <p className="text-sm text-muted-foreground">
                      Ja, wettelijke interest kan geclaimd worden vanaf de oorspronkelijke vervaldatum 
                      tot de volledige betaling, mits binnen de verjaringstermijn.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Is BTW verschuldigd op wettelijke interest?</h3>
                    <p className="text-sm text-muted-foreground">
                      Nee, op wettelijke interest is geen BTW verschuldigd. Het is een wettelijke 
                      vergoeding voor laattijdige betaling, geen dienstverlening.
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