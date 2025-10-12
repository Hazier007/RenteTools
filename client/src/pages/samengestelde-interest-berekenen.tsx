import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SamengesteldeRenteCalculator from "@/components/calculators/samengestelde-rente-calculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCanonical } from "@/hooks/use-canonical";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";

export default function SamengesteldeInterestBerekenen() {
  useCanonical();
  const seoConfig = getSeoConfig("samengestelde-interest-berekenen");
  
  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Samengestelde Interest Berekenen - Compound Interest Calculator
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Ontdek de kracht van rente-op-rente! Bereken hoe uw kapitaal groeit door samengestelde interest. 
            Zie het verschil met gewone interest en plan uw lange termijn investeringen.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">🚀 De kracht van compound interest:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• €10.000 wordt €26.533 na 20 jaar bij 5% rente</li>
              <li>• Start vroeg: elke 7 jaar verdubbelt uw geld bij 10%</li>
              <li>• "8e wereldwonder" volgens Einstein</li>
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
                  <i className="fas fa-chart-line mr-3 text-primary"></i>
                  Compound Interest Calculator - Samengestelde Rente Berekenen
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken hoe uw geld groeit door rente-op-rente effect. Vergelijk samengestelde interest 
                  met gewone interest en ontdek de kracht van lange termijn sparen.
                </p>
              </CardHeader>
              <CardContent>
                <SamengesteldeRenteCalculator />
              </CardContent>
            </Card>

            {/* Ad After Calculator */}
            <div className="flex justify-center py-4">
              <GoogleAdsense slot="banner" />
            </div>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Wat is samengestelde interest?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Samengestelde interest (compound interest) is interest die u ontvangt over uw 
                  oorspronkelijke kapitaal én over de eerder ontvangen interest. Dit zorgt voor 
                  exponentiële groei van uw vermogen.
                </p>
                
                <h3>Het verschil met gewone interest:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Gewone Interest</h4>
                    <p className="text-sm">€1.000 met 5% per jaar:</p>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Jaar 1: €1.050 (+€50)</li>
                      <li>• Jaar 2: €1.100 (+€50)</li>
                      <li>• Jaar 10: €1.500 (+€500)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Samengestelde Interest</h4>
                    <p className="text-sm">€1.000 met 5% per jaar:</p>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Jaar 1: €1.050 (+€50)</li>
                      <li>• Jaar 2: €1.103 (+€53)</li>
                      <li>• Jaar 10: €1.629 (+€629)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">📊 De formule:</h4>
                  <p className="text-sm font-mono">
                    A = P(1 + r/n)^(nt)
                  </p>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• A = Eindbedrag</li>
                    <li>• P = Startkapitaal</li>
                    <li>• r = Jaarlijkse rente</li>
                    <li>• n = Aantal keer samenstellen per jaar</li>
                    <li>• t = Aantal jaren</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Hoeveel levert sparen op na 20 jaar?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  De opbrengst van sparen hangt sterk af van het rentepercentage en of u profiteert 
                  van samengestelde interest. Hier enkele voorbeelden:
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-2 text-left">Startbedrag</th>
                        <th className="border border-border p-2 text-left">Rente</th>
                        <th className="border border-border p-2 text-left">Na 10 jaar</th>
                        <th className="border border-border p-2 text-left">Na 20 jaar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-2">€10.000</td>
                        <td className="border border-border p-2">2%</td>
                        <td className="border border-border p-2">€12.190</td>
                        <td className="border border-border p-2">€14.859</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2">€10.000</td>
                        <td className="border border-border p-2">5%</td>
                        <td className="border border-border p-2">€16.289</td>
                        <td className="border border-border p-2">€26.533</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2">€10.000</td>
                        <td className="border border-border p-2">7%</td>
                        <td className="border border-border p-2">€19.672</td>
                        <td className="border border-border p-2">€38.697</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">💡 Tips voor maximaal rendement:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Start zo vroeg mogelijk - tijd is uw beste vriend</li>
                    <li>• Zoek het hoogste veilige rentepercentage</li>
                    <li>• Maak gebruik van maandelijkse inleg (euro cost averaging)</li>
                    <li>• Raak uw spaargeld niet aan - laat compound interest werken</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Veelgestelde vragen over samengestelde interest</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  
                  <div>
                    <h3 className="font-semibold mb-2">Hoe vaak wordt rente samengesteld?</h3>
                    <p className="text-sm text-muted-foreground">
                      Dit hangt af van het product. Spaarrekeningen meestal jaarlijks, beleggingen 
                      vaak maandelijks of dagelijks. Hoe vaker, hoe beter voor uw rendement.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Vanaf welk bedrag loont samengestelde interest?</h3>
                    <p className="text-sm text-muted-foreground">
                      Samengestelde interest werkt bij elk bedrag, maar het effect wordt groter 
                      naarmate uw kapitaal groeit. Zelfs bij €100 ziet u het verschil na enkele jaren.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Wat is de regel van 72?</h3>
                    <p className="text-sm text-muted-foreground">
                      Deel 72 door het rentepercentage om te zien hoe lang het duurt voordat uw geld 
                      verdubbelt. Bij 6% rente: 72 ÷ 6 = 12 jaar om te verdubbelen.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Kan ik samengestelde interest krijgen op spaarrekeningen?</h3>
                    <p className="text-sm text-muted-foreground">
                      Ja, als u de ontvangen interest op uw rekening laat staan, krijgt u volgend jaar 
                      rente over het totale bedrag. Dit is automatisch samengestelde interest.
                    </p>
                  </div>

                </div>
              </CardContent>
            </Card>

            {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} />}

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