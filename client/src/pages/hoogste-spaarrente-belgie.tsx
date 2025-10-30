import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SpaarrenteCalculator from "@/components/calculators/spaarrente-calculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import RateComparisonWidget from "@/components/rate-comparison";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import HowToSchema from "@/components/seo/HowToSchema";
import WebApplicationSchema from "@/components/seo/WebApplicationSchema";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function HoogsteSpaarrenteBelgie() {
  const seoConfig = getSeoConfig("hoogste-spaarrente-belgie");
  useSeoTags("hoogste-spaarrente-belgie");

  const breadcrumbItems = [
    { name: "Home", url: "https://interesten.be" },
    { name: "Sparen", url: "https://interesten.be/sparen" },
    { name: "Hoogste Spaarrente België", url: "https://interesten.be/sparen/hoogste-spaarrente-belgie" }
  ];

  const howToSteps = [
    { name: "Bedrag invoeren", text: "Vul het bedrag in dat u wilt sparen" },
    { name: "Rente selecteren", text: "Kies de spaarrente van uw bank of gebruik de voorgestelde rentes" },
    { name: "Looptijd kiezen", text: "Selecteer hoe lang u het geld wilt sparen" },
    { name: "Resultaat bekijken", text: "Zie direct hoeveel interest u verdient en wat uw eindkapitaal wordt" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <BreadcrumbSchema items={breadcrumbItems} />
      <HowToSchema 
        name="Hoe gebruik je de Spaarrente Calculator"
        description="Bereken in 4 simpele stappen hoeveel interest u verdient op uw spaargeld"
        steps={howToSteps}
        totalTime="PT1M"
      />
      <WebApplicationSchema 
        name="Hoogste Spaarrente Calculator België"
        description="Gratis online calculator om spaarrente en interest te berekenen voor Belgische spaarrekeningen"
        url="https://interesten.be/sparen/hoogste-spaarrente-belgie"
        applicationCategory="FinanceApplication"
      />
      <OrganizationSchema />
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Hoogste Spaarrente België 2025
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Vind de beste spaarrekening met de hoogste rente. Vergelijk spaarrekeningen, 
            bereken uw interest en ontdek welke bank het meeste rendement biedt op uw spaargeld.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">💡 Actuele toprentetarieven van Belgische banken:</p>
            <p className="text-sm opacity-90">
              Ontdek hieronder de beste spaarrekeningen met real-time bijgewerkte rentes van alle grote Belgische banken.
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

      {/* Main Content with Calculator */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
            
            {/* Live Rate Comparison */}
            <RateComparisonWidget 
              productType="spaarrekening"
              title="🏆 Hoogste Spaarrentes België 2025"
              showTop={6}
              className="mb-8"
            />

            {/* Calculator Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  <i className="fas fa-calculator mr-3 text-primary"></i>
                  Spaarrente Calculator - Bereken uw interest
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken hoeveel interest u verdient met verschillende spaarrekeningen. 
                  Vergelijk basisrente en getrouwheidspremies van Belgische banken.
                </p>
              </CardHeader>
              <CardContent>
                <SpaarrenteCalculator />
              </CardContent>
            </Card>

            {/* Ad After Calculator */}
            <div className="flex justify-center py-4">
              <GoogleAdsense slot="banner" />
            </div>

            {/* Hoogste Spaarrente */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Welke bank heeft de hoogste spaarrente in België?</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                  <p>
                    De spaarrentemarkt in België bestaat uit twee componenten: de <strong>basisrente</strong> en de 
                    <strong>getrouwheidspremie</strong>. Veel banken adverteren met hoge percentages, maar dit zijn 
                    vaak tijdelijke acties of gelden alleen voor nieuwe klanten.
                  </p>
                  
                  <h3>Basisrente vs Getrouwheidspremie</h3>
                  <ul>
                    <li><strong>Basisrente:</strong> De rente die u direct krijgt, zonder voorwaarden</li>
                    <li><strong>Getrouwheidspremie:</strong> Extra rente na 12 maanden trouw blijven bij de bank</li>
                    <li><strong>Totale rente:</strong> Basisrente + getrouwheidspremie = effectieve jaarrente</li>
                  </ul>
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">💡 Let op bij het vergelijken:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Controleert of de rente voor nieuwe of bestaande klanten geldt</li>
                      <li>• Kijk naar het maximumbedrag waarop de rente van toepassing is</li>
                      <li>• Let op tijdelijke acties en hun einddatum</li>
                      <li>• Bereken de effectieve rente over het eerste jaar</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Spaarrekening Vergelijken */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Hoe vergelijkt u spaarrekeningen effectief?</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                  <p>
                    Het vergelijken van spaarrekeningen gaat verder dan alleen naar het rentepercentage kijken. 
                    Hier zijn de belangrijkste factoren:
                  </p>
                  
                  <h3>Checklist voor spaarrekening vergelijking:</h3>
                  <ol>
                    <li><strong>Totale rente eerste jaar:</strong> Basisrente gedurende 12 maanden</li>
                    <li><strong>Totale rente vanaf jaar 2:</strong> Basisrente + getrouwheidspremie</li>
                    <li><strong>Maximumbedrag:</strong> Tot welk bedrag geldt de rente?</li>
                    <li><strong>Voorwaarden:</strong> Moet u andere producten afnemen?</li>
                    <li><strong>Flexibiliteit:</strong> Kunt u vrij geld opnemen?</li>
                    <li><strong>Online banking:</strong> Kwaliteit van digitale dienstverlening</li>
                  </ol>
                  
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">✅ Top tip:</h4>
                    <p className="text-sm">
                      Gebruik onze calculator hierboven om verschillende scenario's door te rekenen. 
                      Vul uw spaarbedrag in en vergelijk het resultaat na 1, 5 en 10 jaar.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Veelgestelde vragen over spaarrente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    
                    <div>
                      <h3 className="font-semibold mb-2">Hoeveel interest krijg ik op 10.000 euro?</h3>
                      <p className="text-sm text-muted-foreground">
                        Met een gemiddelde spaarrente van 1,5% krijgt u jaarlijks 150 euro interest op 10.000 euro. 
                        Met samengestelde interest groeit dit bedrag elk jaar. Na 10 jaar heeft u ongeveer 11.605 euro.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Wat is de hoogste rente op een spaarboekje?</h3>
                      <p className="text-sm text-muted-foreground">
                        De hoogste gecombineerde rente (basisrente + getrouwheidspremie) ligt momenteel rond de 2,5% 
                        voor nieuwe klanten. Let wel: dit geldt vaak alleen voor een beperkt bedrag en periode.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Wanneer krijg ik de getrouwheidspremie?</h3>
                      <p className="text-sm text-muted-foreground">
                        De getrouwheidspremie krijgt u na 12 maanden trouw te zijn gebleven bij dezelfde bank. 
                        Als u tussentijds van bank wisselt, verliest u de premie over dat jaar.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Is spaarrente belastbaar in België?</h3>
                      <p className="text-sm text-muted-foreground">
                        Ja, vanaf 980 euro interest per jaar (2025) betaalt u 30% roerende voorheffing. 
                        Tot dit bedrag is uw spaarrente belastingvrij.
                      </p>
                    </div>

                  </div>
                </CardContent>
              </Card>

              {/* Gerelateerde Calculators */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Gerelateerde Calculators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <a href="/samengestelde-interest-berekenen" className="block p-4 border rounded-lg hover:border-primary transition-colors">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-chart-line mr-2 text-green-600"></i>
                        <h4 className="font-semibold">Samengestelde Interest</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">Bereken hoe uw spaargeld groeit met compound interest over lange termijn.</p>
                    </a>
                    <a href="/deposito-calculator" className="block p-4 border rounded-lg hover:border-primary transition-colors">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-university mr-2 text-purple-600"></i>
                        <h4 className="font-semibold">Deposito Calculator</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">Vergelijk termijnrekeningen en deposito's voor hogere vaste rentes.</p>
                    </a>
                    <a href="/inflatie-calculator-belgie" className="block p-4 border rounded-lg hover:border-primary transition-colors">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-trending-down mr-2 text-amber-600"></i>
                        <h4 className="font-semibold">Inflatie Calculator</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">Zie hoe inflatie uw spaarrente beïnvloedt en uw koopkracht vermindert.</p>
                    </a>
                    <a href="/roerende-voorheffing-calculator" className="block p-4 border rounded-lg hover:border-primary transition-colors">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-percentage mr-2 text-neutral-600"></i>
                        <h4 className="font-semibold">Roerende Voorheffing</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">Bereken de belasting op uw spaarrente en ontdek de vrijstellingen.</p>
                    </a>
                  </div>
                </CardContent>
              </Card>

            {/* Authority Links */}
            {seoConfig && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AuthorityLinks links={seoConfig.authorityLinks} />
        </section>
      )}

        </div>
      </section>

      {/* Bottom Banner Ad */}
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