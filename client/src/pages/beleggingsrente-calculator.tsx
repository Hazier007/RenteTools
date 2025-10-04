import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BeleggingsrenteCalculator from "@/components/calculators/beleggingsrente-calculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";

export default function BeleggingsrenteCalculatorPage() {
  const seoConfig = getSeoConfig("beleggingsrente-calculator");

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header activeCalculator="beleggingsrente" onCalculatorChange={() => {}} />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Beleggingsrente Calculator - Rendement Portefeuille Berekenen
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken het verwachte rendement van uw beleggingsportefeuille. Simuleer verschillende 
            scenario's, inclusief kosten en belastingen voor realistische resultaten.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">📈 Historische rendementen:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Aandelen: 7-10% gemiddeld per jaar</li>
              <li>• Obligaties: 3-5% gemiddeld per jaar</li>
              <li>• Gemengde portefeuille: 5-7%</li>
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            
            {/* Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  <i className="fas fa-chart-bar mr-3 text-primary"></i>
                  Beleggingsrente Calculator - Bereken uw verwacht rendement
                </CardTitle>
                <p className="text-muted-foreground">
                  Simuleer uw beleggingsrendement rekening houdend met kosten, belastingen 
                  en verschillende asset allocaties. Plan uw financiële toekomst realistisch.
                </p>
              </CardHeader>
              <CardContent>
                <BeleggingsrenteCalculator />
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Wat is beleggingsrendement?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Beleggingsrendement is de winst die u behaalt op uw investeringen, 
                  uitgedrukt als percentage van uw inleg. Het bestaat uit twee componenten: 
                  koerswinst en dividend/interest.
                </p>
                
                <h3>Componenten van beleggingsrendement:</h3>
                <ul>
                  <li><strong>Koerswinst:</strong> Stijging van de waarde van uw belegging</li>
                  <li><strong>Dividend:</strong> Uitkeringen van bedrijven aan aandeelhouders</li>
                  <li><strong>Interest:</strong> Opbrengst van obligaties en deposito's</li>
                  <li><strong>Herbeleg effect:</strong> Compound groei door herbeleggen</li>
                </ul>
                
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">📊 Formule totaal rendement:</h4>
                  <p className="text-sm font-mono">
                    Rendement = ((Eindwaarde - Beginwaarde) + Dividend) / Beginwaarde × 100%
                  </p>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">⚠️ Let op kosten en belastingen:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Beheerskosten fonds: 0,5% - 2,5% per jaar</li>
                    <li>• Transactiekosten: €7,5 - €30 per order</li>
                    <li>• Roerende voorheffing: 30% op dividend</li>
                    <li>• TOB (taks op beursverrichtingen): 0,12% - 1,32%</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Historische rendementen verschillende beleggingen</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Historische gegevens geven een indicatie van mogelijke toekomstige rendementen, 
                  maar zijn geen garantie. Diversificatie vermindert risico's.
                </p>
                
                <h3>Gemiddelde jaarlijkse rendementen (1990-2024):</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-2 text-left">Beleggingscategorie</th>
                        <th className="border border-border p-2 text-left">Rendement</th>
                        <th className="border border-border p-2 text-left">Risico</th>
                        <th className="border border-border p-2 text-left">Volatiliteit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-2">Belgische aandelen</td>
                        <td className="border border-border p-2">8,2%</td>
                        <td className="border border-border p-2 text-red-600">Hoog</td>
                        <td className="border border-border p-2">18-25%</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2">Wereldwijde aandelen</td>
                        <td className="border border-border p-2">9,1%</td>
                        <td className="border border-border p-2 text-red-600">Hoog</td>
                        <td className="border border-border p-2">16-22%</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2">Obligaties</td>
                        <td className="border border-border p-2">4,3%</td>
                        <td className="border border-border p-2 text-yellow-600">Gemiddeld</td>
                        <td className="border border-border p-2">5-8%</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2">Vastgoed (REITs)</td>
                        <td className="border border-border p-2">7,5%</td>
                        <td className="border border-border p-2 text-yellow-600">Gemiddeld</td>
                        <td className="border border-border p-2">12-18%</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2">Gemengde fondsen</td>
                        <td className="border border-border p-2">6,1%</td>
                        <td className="border border-border p-2 text-green-600">Laag-Gemiddeld</td>
                        <td className="border border-border p-2">8-12%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">💡 Diversificatie tips:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Spreid over verschillende landen en sectoren</li>
                    <li>• Combineer aandelen en obligaties naar uw risicoprofiel</li>
                    <li>• Overweeg ETF's voor lage kosten en brede spreiding</li>
                    <li>• Houd 3-6 maanden kosten cash voor noodgevallen</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Beleggingskosten en belastingen in België</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Kosten en belastingen kunnen uw rendement aanzienlijk beïnvloeden. 
                  Een goed begrip hiervan is essentieel voor realistische planning.
                </p>
                
                <h3>Overzicht beleggingskosten:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">💸 Kosten</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Instapkosten: 0% - 3%</li>
                      <li>• Jaarlijkse beheerskosten: 0,1% - 2,5%</li>
                      <li>• Transactiekosten: €2,5 - €30</li>
                      <li>• Uitstapkosten: meestal 0%</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">🏛️ Belastingen</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Roerende voorheffing: 30% op dividend</li>
                      <li>• TOB aandelen: 0,35%</li>
                      <li>• TOB obligaties: 0,12%</li>
                      <li>• Kapitaalwinst: meestal 0%</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">🎯 Impact op rendement:</h4>
                  <p className="text-sm">
                    Bij 7% bruto rendement en 1,5% jaarlijkse kosten blijft er 5,5% netto over. 
                    Over 20 jaar betekent dit €50.000 minder op €100.000 investering!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Authority Links */}
            {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} />}

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Veelgestelde vragen over beleggingsrendement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  
                  <div>
                    <h3 className="font-semibold mb-2">Wat is een realistisch rendement voor beginners?</h3>
                    <p className="text-sm text-muted-foreground">
                      Voor beginners is 5-7% per jaar een realistisch doel met een gebalanceerde 
                      portefeuille van aandelen en obligaties. Start conservatief en leer bij.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Hoe vaak moet ik mijn portefeuille aanpassen?</h3>
                    <p className="text-sm text-muted-foreground">
                      Bekijk uw portefeuille jaarlijks en herbalanceer indien nodig. 
                      Te frequent handelen verhoogt de kosten en verlaagt vaak het rendement.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Is beleggen beter dan sparen?</h3>
                    <p className="text-sm text-muted-foreground">
                      Op lange termijn (10+ jaar) leveren beleggingen meestal meer op dan sparen, 
                      maar met meer risico. Houd altijd een noodfonds op een spaarrekening.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Wat doe ik bij een marktcrash?</h3>
                    <p className="text-sm text-muted-foreground">
                      Blijf rustig en verkoop niet in paniek. Crashes zijn tijdelijk - 
                      de markt herstelt zich meestal binnen 1-3 jaar. Investeer wellicht extra.
                    </p>
                  </div>

                </div>
              </CardContent>
            </Card>

          </div>
          
          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            <GoogleAdsense slot="rectangle" />
            <GoogleAdsense slot="rectangle" />
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <GoogleAdsense slot="banner" className="hidden lg:block" />
          <GoogleAdsense slot="banner" className="lg:hidden" />
        </div>
      </section>

      <Footer />
    </div>
  );
}