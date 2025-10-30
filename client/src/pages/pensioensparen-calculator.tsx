import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PensioenspaarCalculator from "@/components/calculators/pensioenspar-calculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function PensioenspaarCalculatorPage() {
  const seoConfig = getSeoConfig("pensioensparen-calculator");
  useSeoTags("pensioensparen-calculator");
  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Pensioensparen Calculator - Derde Pijler Planning België
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Plan uw pensioenopbouw via de derde pijler. Bereken uw belastingvoordeel, 
            simuleer uw pensioenkapitaal en optimaliseer uw pensioensparen.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">🏛️ Pensioensparen 2025:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Maximum inleg: €1.310 per jaar</li>
              <li>• Belastingvoordeel: 30% (tot €393)</li>
              <li>• Uitkeringsbetaling: 8% of 16,5%</li>
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
                  <i className="fas fa-umbrella mr-3 text-primary"></i>
                  Pensioensparen Calculator - Plan uw derde pijler
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken uw pensioenkapitaal, belastingvoordeel en netto rendement. 
                  Simuleer verschillende scenario's voor optimale pensioenplanning.
                </p>
              </CardHeader>
              <CardContent>
                <PensioenspaarCalculator />
              </CardContent>
            </Card>

            {/* Ad After Calculator */}
            <div className="flex justify-center py-4">
              <GoogleAdsense slot="banner" />
            </div>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Wat is pensioensparen (derde pijler)?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Pensioensparen is de derde pijler van het Belgische pensioenstelsel. 
                  Het is een aanvullende manier om te sparen voor uw pensioen met 
                  fiscale voordelen van de overheid.
                </p>
                
                <h3>De drie pijlers van het Belgische pensioenstelsel:</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg text-center">
                    <h4 className="font-semibold mb-2">1️⃣ Eerste Pijler</h4>
                    <p className="text-sm">Wettelijk pensioen van de overheid</p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg text-center">
                    <h4 className="font-semibold mb-2">2️⃣ Tweede Pijler</h4>
                    <p className="text-sm">Aanvullend pensioen via werkgever</p>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg text-center">
                    <h4 className="font-semibold mb-2">3️⃣ Derde Pijler</h4>
                    <p className="text-sm">Individueel pensioensparen</p>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">✅ Voordelen pensioensparen:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 30% belastingvermindering op uw inleg</li>
                    <li>• Groeikansen door beleggingsfondsen</li>
                    <li>• Flexibiliteit in inlegbedragen</li>
                    <li>• Aanvulling op wettelijk pensioen</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Belastingvoordeel pensioensparen uitgelegd</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Het grootste voordeel van pensioensparen is de directe belastingvermindering. 
                  U krijgt 30% van uw inleg terug via uw belastingaangifte.
                </p>
                
                <h3>Maximumbedragen en voordelen 2025:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-2 text-left">Leeftijd</th>
                        <th className="border border-border p-2 text-left">Max inleg</th>
                        <th className="border border-border p-2 text-left">Belastingvoordeel</th>
                        <th className="border border-border p-2 text-left">Netto kosten</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-2">Tot 55 jaar</td>
                        <td className="border border-border p-2">€1.310</td>
                        <td className="border border-border p-2">€393</td>
                        <td className="border border-border p-2">€917</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2">55+ jaar</td>
                        <td className="border border-border p-2">€1.310</td>
                        <td className="border border-border p-2">€393</td>
                        <td className="border border-border p-2">€917</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">💡 Praktijkvoorbeeld:</h4>
                  <p className="text-sm">
                    U legt €1.310 in. Via uw belastingaangifte krijgt u €393 terug. 
                    Uw werkelijke kosten zijn dus maar €917 voor €1.310 pensioensparen!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Uitkeringsbetaling - 8% of 16,5%?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Bij uitkering betaalt u belasting op uw pensioenkapitaal. Het tarief 
                  hangt af van wanneer u uitkeert en hoe lang u heeft gespaard.
                </p>
                
                <h3>Uitkeringstarieven:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">8% Uitkeringsbetaling</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Uitkering vanaf 60 jaar</li>
                      <li>• Minimum 10 jaar gespaard</li>
                      <li>• Meest voordelige tarief</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">16,5% Uitkeringsbetaling</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Uitkering voor 60 jaar</li>
                      <li>• Minder dan 10 jaar gespaard</li>
                      <li>• Bij vroegtijdige uitkering</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">💰 Optimale strategie:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Start voor uw 50e om 10 jaar vol te maken</li>
                    <li>• Keer uit vanaf 60 jaar voor 8% tarief</li>
                    <li>• Overweeg gefaseerde uitkering over meerdere jaren</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Veelgestelde vragen over pensioensparen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  
                  <div>
                    <h3 className="font-semibold mb-2">Wanneer kan ik mijn pensioensparen opnemen?</h3>
                    <p className="text-sm text-muted-foreground">
                      Vanaf 60 jaar of bij vervroegd pensioen. U kunt ook vroeger opnemen, 
                      maar dan betaalt u 16,5% in plaats van 8% uitkeringsbetaling.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Kan ik meer dan €1.310 per jaar inleggen?</h3>
                    <p className="text-sm text-muted-foreground">
                      Ja, maar alleen de eerste €1.310 geeft recht op belastingvoordeel. 
                      Het surplus wordt wel belegd maar zonder fiscaal voordeel.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibild mb-2">Wat als ik een jaar niet inleg?</h3>
                    <p className="text-sm text-muted-foreground">
                      Geen probleem, pensioensparen is flexibel. U mist wel het belastingvoordeel 
                      van dat jaar, maar uw bestaande kapitaal blijft groeien.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Is pensioensparen veiliger dan beleggen?</h3>
                    <p className="text-sm text-muted-foreground">
                      Pensioenspaarfondsen beleggen ook, maar zijn vaak defensiever dan 
                      vrij beleggen. Het belastingvoordeel compenseert vaak het lagere rendement.
                    </p>
                  </div>

                </div>
              </CardContent>
            </Card>

            {seoConfig && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AuthorityLinks links={seoConfig.authorityLinks} />
        </section>
      )}

        </div>
      </section>

      {/* Bottom Ad */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <GoogleAdsense slot="banner" className="hidden lg:block" />
          <GoogleAdsense slot="banner" className="lg:hidden" />
        </div>
      </section>

      <Footer />
    </div>
  );
}