import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BelastingplanningCalculator from "@/components/calculators/belastingplanning-calculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCanonical } from "@/hooks/use-canonical";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import RelatedCalculators from "@/components/seo/RelatedCalculators";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function BelastingplanningCalculatorPage() {
  useCanonical();
  const seoConfig = getSeoConfig("belastingplanning-calculator");
  useSeoTags("belastingplanning-calculator");
  
  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Belastingplanning Calculator België - Fiscale Optimalisatie
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Maximaliseer uw na-belasting rendement met slimme fiscale strategieën. 
            Ontdek hoe u duizenden euro's kunt besparen op uw investeringen en sparen.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">💰 Belgische Belasting Optimalisatie:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Spaarbonus: €2.290 - €4.580 belastingvrij</li>
              <li>• Pensioensparen: 30% belastingvoordeel</li>
              <li>• ETFs: Geen tussentijdse belasting</li>
              <li>• Meerwaarden: Belastingvrij voor particulieren</li>
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
                  Belastingplanning Calculator - Optimaliseer uw rendement
                </CardTitle>
                <p className="text-muted-foreground">
                  Analyseer uw huidige belastingdruk en ontdek strategieën om uw na-belasting rendement 
                  te maximaliseren. Bespaar jaarlijks honderden tot duizenden euro's.
                </p>
              </CardHeader>
              <CardContent>
                <BelastingplanningCalculator />
              </CardContent>
            </Card>

            {/* Ad After Calculator */}
            <div className="flex justify-center py-4">
              <GoogleAdsense slot="banner" />
            </div>

            {/* Belasting Uitleg Sectie */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-question-circle mr-3 text-blue-600"></i>
                  Belgische Investering Belastingen Uitgelegd
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-red-600">❌ Belastbare Inkomsten (30%)</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                        <div className="font-medium text-red-900 dark:text-red-100">Dividenden</div>
                        <div className="text-sm text-red-700 dark:text-red-300">
                          30% roerende voorheffing op alle dividend uitkeringen
                        </div>
                        <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                          Voorbeeld: €1.000 dividend → €300 belasting
                        </div>
                      </div>
                      
                      <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                        <div className="font-medium text-orange-900 dark:text-orange-100">Interest (boven vrijstelling)</div>
                        <div className="text-sm text-orange-700 dark:text-orange-300">
                          30% roerende voorheffing op interest boven spaarbonus
                        </div>
                        <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                          Vrijstelling: €2.290 (alleenstaand) / €4.580 (gehuwd)
                        </div>
                      </div>
                      
                      <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                        <div className="font-medium text-purple-900 dark:text-purple-100">Speculatie</div>
                        <div className="text-sm text-purple-700 dark:text-purple-300">
                          33% belasting op winsten uit korte termijn handel
                        </div>
                        <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                          Vermijd door langetermijn beleggingsstrategie
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-600">✅ Belastingvrije Inkomsten</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                        <div className="font-medium text-green-900 dark:text-green-100">Meerwaarden</div>
                        <div className="text-sm text-green-700 dark:text-green-300">
                          Koerswinsten zijn belastingvrij voor particuliere beleggers
                        </div>
                        <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                          Focus op groei-ETFs voor maximale efficiency
                        </div>
                      </div>
                      
                      <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <div className="font-medium text-blue-900 dark:text-blue-100">Kapitaliserende ETFs</div>
                        <div className="text-sm text-blue-700 dark:text-blue-300">
                          Geen tussentijdse belasting, alleen bij verkoop
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          Compound effect werkt optimaal
                        </div>
                      </div>
                      
                      <div className="p-3 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                        <div className="font-medium text-indigo-900 dark:text-indigo-100">Pensioensparen</div>
                        <div className="text-sm text-indigo-700 dark:text-indigo-300">
                          30% belastingvermindering tot €1.310/jaar
                        </div>
                        <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                          Gegarandeerd 30% direct rendement
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Optimalisatie Strategieën */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-lightbulb mr-3 text-yellow-600"></i>
                  Top Belasting Optimalisatie Strategieën
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-blue-600">🎯 Basis Strategieën</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 font-bold text-sm">1</div>
                        <div>
                          <div className="font-medium">Pensioensparen Maximaliseren</div>
                          <div className="text-sm text-muted-foreground">€1.310/jaar = €393 belastingvoordeel</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 font-bold text-sm">2</div>
                        <div>
                          <div className="font-medium">Spaarbonus Optimaliseren</div>
                          <div className="text-sm text-muted-foreground">€2.290 - €4.580 belastingvrij per jaar</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 font-bold text-sm">3</div>
                        <div>
                          <div className="font-medium">ETF over Dividend Aandelen</div>
                          <div className="text-sm text-muted-foreground">Vermijd 30% roerende voorheffing</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-600">🚀 Geavanceerde Strategieën</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 font-bold text-sm">4</div>
                        <div>
                          <div className="font-medium">Asset Locatie Optimalisatie</div>
                          <div className="text-sm text-muted-foreground">Belastbare assets in pensioenrekening</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 font-bold text-sm">5</div>
                        <div>
                          <div className="font-medium">Familiale Splitsing</div>
                          <div className="text-sm text-muted-foreground">Dubbele spaarbonus voor gehuwden</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 font-bold text-sm">6</div>
                        <div>
                          <div className="font-medium">Tax-Loss Harvesting</div>
                          <div className="text-sm text-muted-foreground">Strategisch realiseren van verliezen</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Belgische Specificiteit */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-flag mr-3 text-red-600"></i>
                  Belgische Belasting Specificiteiten
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-blue-600 mb-3">💰 Roerende Voorheffing</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <i className="fas fa-percentage text-blue-600 mr-2 mt-1"></i>
                          <span>30% op dividenden en interest</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-clock text-blue-600 mr-2 mt-1"></i>
                          <span>Automatisch ingehouden door bank</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-globe text-blue-600 mr-2 mt-1"></i>
                          <span>Buitenlandse belasting verrekenbaar</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-green-600 mb-3">🏛️ Spaarbonus</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <i className="fas fa-user text-green-600 mr-2 mt-1"></i>
                          <span>€2.290 alleenstaand</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-users text-green-600 mr-2 mt-1"></i>
                          <span>€4.580 gehuwd/samenwonend</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-calculator text-green-600 mr-2 mt-1"></i>
                          <span>Op eerste 2.5% spaarrente</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-purple-600 mb-3">📊 Meerwaarden</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <i className="fas fa-chart-line text-purple-600 mr-2 mt-1"></i>
                          <span>Belastingvrij voor particulieren</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-exclamation text-purple-600 mr-2 mt-1"></i>
                          <span>Speculatie = 33% belasting</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-shield-alt text-purple-600 mr-2 mt-1"></i>
                          <span>Bewijslast bij belastingdienst</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                    <h5 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                      ⚠️ Belangrijke Overwegingen
                    </h5>
                    <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                      <li>• Belastingwetgeving kan wijzigen - blijf geïnformeerd</li>
                      <li>• Complexe situaties vereisen professioneel advies</li>
                      <li>• Documenteer alle investeringsbeslissingen</li>
                      <li>• EU-regelgeving kan impact hebben op buitenlandse investeringen</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

        </div>
      </section>

      {/* Bottom Banner Ad */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <GoogleAdsense slot="banner" className="hidden lg:block" />
          <GoogleAdsense slot="banner" className="lg:hidden" />
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <RelatedCalculators currentSlug="belastingplanning-calculator" />
      </section>

      {seoConfig && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AuthorityLinks links={seoConfig.authorityLinks} />
        </section>
      )}

      <Footer />
    </div>
  );
}