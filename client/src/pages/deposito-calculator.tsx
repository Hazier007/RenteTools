import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import DepositoCalculator from "@/components/calculators/deposito-calculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import HowToSchema from "@/components/seo/HowToSchema";
import WebApplicationSchema from "@/components/seo/WebApplicationSchema";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function DepositoCalculatorPage() {
  const seoConfig = getSeoConfig("deposito-calculator");
  useSeoTags("deposito-calculator");

  const breadcrumbItems = [
    { name: "Home", url: "https://interesten.be" },
    { name: "Sparen", url: "https://interesten.be/sparen" },
    { name: "Deposito Calculator", url: "https://interesten.be/sparen/deposito-calculator" }
  ];

  const howToSteps = [
    { name: "Inlegbedrag invoeren", text: "Vul het bedrag in dat u wilt vastzetten op een deposito" },
    { name: "Looptijd kiezen", text: "Selecteer de looptijd van het deposito (1, 3 of 5 jaar)" },
    { name: "Rente vergelijken", text: "Bekijk de verschillende rentetarieven per looptijd" },
    { name: "Rendement berekenen", text: "Zie direct uw eindkapitaal en totale interest na de looptijd" }
  ];
  
  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <BreadcrumbSchema items={breadcrumbItems} />
      <HowToSchema 
        name="Hoe gebruik je de Deposito Calculator"
        description="Bereken in 4 stappen het rendement van uw termijnrekening of deposito"
        steps={howToSteps}
        totalTime="PT1M"
      />
      <WebApplicationSchema 
        name="Deposito Calculator België"
        description="Gratis calculator voor deposito en termijnrekening rendement in België"
        url="https://interesten.be/sparen/deposito-calculator"
        applicationCategory="FinanceApplication"
      />
      <OrganizationSchema />
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Deposito Calculator - Termijnrekening Rendement Berekenen
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken het rendement van uw deposito of termijnrekening. Vergelijk verschillende 
            looptijden en uitkeringsopties voor de beste deal.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">🏦 Deposito tarieven 2026:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• 1 jaar: tot 3,2% bruto</li>
              <li>• 3 jaar: tot 3,5% bruto</li>
              <li>• 5 jaar: tot 3,8% bruto</li>
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
                  <i className="fas fa-university mr-3 text-primary"></i>
                  Deposito Calculator - Bereken uw termijnrekening
                </CardTitle>
                <p className="text-muted-foreground">
                  Simuleer verschillende deposito opties en vergelijk het rendement. 
                  Kies tussen verschillende uitkeringsfrequenties en looptijden.
                </p>
              </CardHeader>
              <CardContent>
                <DepositoCalculator />
              </CardContent>
            </Card>

            {/* Ad After Calculator */}
            <div className="flex justify-center py-4">
              <GoogleAdsense slot="banner" />
            </div>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Wat is een deposito of termijnrekening?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Een deposito (termijnrekening) is een spaarproduct waarbij u uw geld 
                  voor een vaste periode wegzet tegen een vaste rente. U kunt het geld 
                  niet vroegtijdig opnemen zonder boete.
                </p>
                
                <h3>Kenmerken van een deposito:</h3>
                <ul>
                  <li><strong>Vaste looptijd:</strong> Van 1 maand tot 10 jaar</li>
                  <li><strong>Vaste rente:</strong> Rentevoet staat vast bij afsluiting</li>
                  <li><strong>Gegarandeerd rendement:</strong> Geen risico op verlies</li>
                  <li><strong>Beperkte flexibiliteit:</strong> Geld is vastgezet</li>
                </ul>
                
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">✅ Voordelen deposito:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Hogere rente dan gewone spaarrekening</li>
                    <li>• Gegarandeerd rendement</li>
                    <li>• Beschermd door depositorengarantie (€100.000)</li>
                    <li>• Geen marktrisico zoals bij beleggen</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">⚠️ Nadelen deposito:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Geld is vastgezet voor bepaalde periode</li>
                    <li>• Boete bij vervroegde opname</li>
                    <li>• Geen bescherming tegen inflatie</li>
                    <li>• Lagere rendementen dan beleggen op lange termijn</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Deposito vergelijken - Welke bank biedt het beste?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Bij het vergelijken van deposito's kijkt u niet alleen naar de rente, 
                  maar ook naar flexibiliteit, minimuminleg en uitkeringsopties.
                </p>
                
                <h3>Vergelijkingscriteria:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">📊 Rendement</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Bruto rentevoet</li>
                      <li>• Uitkeringsfrequentie</li>
                      <li>• Compound effect</li>
                      <li>• Effectieve jaarrente</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">⚙️ Voorwaarden</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Minimaal inlegbedrag</li>
                      <li>• Maximaal inlegbedrag</li>
                      <li>• Vervroegde opname mogelijk?</li>
                      <li>• Automatische verlenging</li>
                    </ul>
                  </div>
                </div>
                
                <h3>Uitkeringsopties:</h3>
                <ul>
                  <li><strong>Aan het einde:</strong> Hoogste rendement door compound effect</li>
                  <li><strong>Jaarlijks:</strong> Regelmatige inkomsten, lager totaalrendement</li>
                  <li><strong>Maandelijks:</strong> Maandelijkse inkomsten, laagste totaalrendement</li>
                </ul>
                
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">💡 Optimalisatie tip:</h4>
                  <p className="text-sm">
                    Voor maximaal rendement kiest u uitkering aan het einde. Heeft u regelmatige 
                    inkomsten nodig, dan is jaarlijkse uitkering een compromis.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Authority Links */}
            {seoConfig && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AuthorityLinks links={seoConfig.authorityLinks} />
        </section>
      )}

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Veelgestelde vragen over deposito's</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  
                  <div>
                    <h3 className="font-semibold mb-2">Wat gebeurt er bij vervroegde opname?</h3>
                    <p className="text-sm text-muted-foreground">
                      De meeste banken rekenen een boete van 3-6 maanden rente. 
                      Sommige banken maken vervroegde opname helemaal onmogelijk.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Is mijn deposito veilig bij bankfaillissement?</h3>
                    <p className="text-sm text-muted-foreground">
                      Ja, deposito's zijn beschermd door de Belgische depositorengarantie 
                      tot €100.000 per bank per persoon.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Wat is het verschil met een spaarrekening?</h3>
                    <p className="text-sm text-muted-foreground">
                      Deposito's bieden hogere rente maar minder flexibiliteit. 
                      Spaarrekeningen hebben lagere rente maar u kunt altijd bij uw geld.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Moet ik belasting betalen op deposito-interest?</h3>
                    <p className="text-sm text-muted-foreground">
                      Ja, 30% roerende voorheffing wordt automatisch ingehouden. 
                      Tot €980 per jaar (2026) is uw interest belastingvrij.
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

      <Footer />
    </div>
  );
}