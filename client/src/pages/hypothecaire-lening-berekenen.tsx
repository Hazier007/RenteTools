import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HypotheekCalculator from "@/components/calculators/hypotheek-calculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import RateComparisonWidget from "@/components/rate-comparison";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCanonical } from "@/hooks/use-canonical";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function HypothecaireLningBerekenen() {
  useCanonical();
  const seoConfig = getSeoConfig("hypothecaire-lening-berekenen");
  useSeoTags("hypothecaire-lening-berekenen");
  
  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Hypothecaire Lening Berekenen - Hypotheek Simulator België
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken uw maandlast, vergelijk rentetarieven en simuleer verschillende 
            hypotheekscenario's. Ontdek wat u kunt lenen en plan uw woonfinanciering.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">🏠 Actuele hypotheektarieven van Belgische banken:</p>
            <p className="text-sm opacity-90">
              Vergelijk hieronder de laagste woonkrediettarieven en vind de beste hypotheek voor uw situatie.
            </p>
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
            
            {/* Live Rate Comparison */}
            <RateComparisonWidget 
              productType="hypotheek"
              title="🏠 Laagste Hypotheektarieven België 2025"
              showTop={5}
              className="mb-8"
            />

            {/* Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  <i className="fas fa-home mr-3 text-primary"></i>
                  Hypotheek Calculator - Bereken uw woonlening
                </CardTitle>
                <p className="text-muted-foreground">
                  Simuleer uw hypothecaire lening en bereken de maandelijkse afbetalingen. 
                  Vergelijk verschillende looptijden en rentetarieven.
                </p>
              </CardHeader>
              <CardContent>
                <HypotheekCalculator />
              </CardContent>
            </Card>

            {/* Ad After Calculator */}
            <div className="flex justify-center py-4">
              <GoogleAdsense slot="banner" />
            </div>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Hoe bereken ik mijn hypothecaire lening?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Een hypothecaire lening berekenen houdt rekening met verschillende factoren die uw 
                  maandlast en totale kosten bepalen. Onze simulator helpt u alle scenario's door te rekenen.
                </p>
                
                <h3>Belangrijkste factoren voor uw hypotheek:</h3>
                <ul>
                  <li><strong>Leenbedrag:</strong> Het bedrag dat u wilt lenen</li>
                  <li><strong>Rentevoet:</strong> Het percentage dat de bank rekent</li>
                  <li><strong>Looptijd:</strong> De periode waarin u de lening terugbetaalt</li>
                  <li><strong>Type rente:</strong> Vast, variabel of gemengd</li>
                  <li><strong>Aflossingstype:</strong> Annuïteiten of lineair</li>
                </ul>
                
                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">⚠️ Let op de extra kosten:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Notariskosten (0,1% tot 0,3% van de koopprijs)</li>
                    <li>• Registratierechten (10% of 12,5% afhankelijk van regio)</li>
                    <li>• Brandverzekering (verplicht)</li>
                    <li>• Schuldsaldoverzekering (vaak verplicht)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Vaste vs Variabele rente - Wat is het beste?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Vaste Rente</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Zekerheid over maandlast</li>
                      <li>• Bescherming tegen rentestijgingen</li>
                      <li>• Makkelijker budgetteren</li>
                      <li>• Populairste keuze in België</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">📊 Variabele Rente</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Vaak lagere startrente</li>
                      <li>• Profiteert van rentedalingen</li>
                      <li>• Meer flexibiliteit</li>
                      <li>• Risico van rentestijgingen</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-4">
                  <strong>Onze aanbeveling:</strong> Voor de meeste mensen is een vaste rente de veiligste keuze, 
                  vooral bij de huidige lage rentetarieven. Dit geeft zekerheid over uw woonkosten.
                </p>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Veelgestelde vragen over hypotheken</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  
                  <div>
                    <h3 className="font-semibold mb-2">Hoeveel kan ik maximaal lenen voor een hypotheek?</h3>
                    <p className="text-sm text-muted-foreground">
                      In België kunt u maximaal lenen tot 90% van de waarde van de woning (LTV). 
                      Uw maandlast mag niet hoger zijn dan 33% van uw netto inkomen.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Wat is de laagste hypotheekrente in België?</h3>
                    <p className="text-sm text-muted-foreground">
                      De laagste tarieven beginnen rond 2,5% voor korte looptijden en variabele rentes. 
                      Voor vaste rentes van 20-25 jaar liggen de beste tarieven rond 2,8-3,2%.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Kan ik mijn hypotheek herfinancieren?</h3>
                    <p className="text-sm text-muted-foreground">
                      Ja, herfinancieren kan voordeliger zijn als de rentes zijn gedaald. 
                      Let wel op vervroegde terugbetalingskosten bij uw huidige bank.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Wat is het verschil tussen annuïteiten en lineair aflossen?</h3>
                    <p className="text-sm text-muted-foreground">
                      Bij annuïteiten betaalt u elke maand hetzelfde bedrag. Bij lineair aflossen 
                      neemt uw maandlast af naarmate u meer heeft afgelost.
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