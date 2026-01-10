import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LevensverzekeraarCalculator from "@/components/calculators/levensverzekeraar-calculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCanonical } from "@/hooks/use-canonical";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import RelatedCalculators from "@/components/seo/RelatedCalculators";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function LevensverzekeraarCalculatorPage() {
  useCanonical();
  const seoConfig = getSeoConfig("levensverzekeraar-calculator");
  useSeoTags("levensverzekeraar-calculator");
  
  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Levensverzekeraar Calculator België - Verzekering vs Beleggen
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Vergelijk hele leven verzekering met term verzekering + beleggen. 
            Ontdek welke strategie het beste rendement en bescherming biedt voor uw familie.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">🛡️ Verzekering vs Beleggen:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Hele leven: Gegarandeerde uitkering + spaarcomponent</li>
              <li>• Term + Beleggen: Hogere rendementen + flexibiliteit</li>
              <li>• Tak 21/23: Belgische verzekeringen met fiscale voordelen</li>
              <li>• Roerende voorheffing: 30% op beleggingswinsten</li>
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
                  <i className="fas fa-shield-alt mr-3 text-blue-600"></i>
                  Levensverzekeraar Calculator - Maak de juiste keuze
                </CardTitle>
                <p className="text-muted-foreground">
                  Vergelijk hele leven verzekering met term verzekering + beleggen. 
                  Ontdek welke strategie het beste past bij uw financiële doelen en risicotolerantie.
                </p>
              </CardHeader>
              <CardContent>
                <LevensverzekeraarCalculator />
              </CardContent>
            </Card>

            {/* Ad After Calculator */}
            <div className="flex justify-center py-4">
              <GoogleAdsense slot="banner" />
            </div>

            {/* Verzekering Types Uitleg */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-question-circle mr-3 text-blue-600"></i>
                  Belgische Levensverzekeringen Uitgelegd
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 font-bold">21</div>
                      <h3 className="font-semibold">Tak 21 Verzekering</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Traditionele levensverzekering met gegarandeerd minimumrendement en 
                      winstdeling. Laag risico, stabiele groei.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center"><i className="fas fa-check text-green-600 mr-2"></i>Gegarandeerd rendement (0-2%)</li>
                      <li className="flex items-center"><i className="fas fa-check text-green-600 mr-2"></i>Jaarlijkse winstdeling mogelijk</li>
                      <li className="flex items-center"><i className="fas fa-check text-green-600 mr-2"></i>Belastingvoordelig</li>
                      <li className="flex items-center"><i className="fas fa-times text-red-600 mr-2"></i>Lagere verwachte rendementen</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 font-bold">23</div>
                      <h3 className="font-semibold">Tak 23 Verzekering</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Unit-linked verzekering gekoppeld aan beleggingsfondsen. 
                      Hoger potentieel rendement, maar ook meer risico.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center"><i className="fas fa-check text-green-600 mr-2"></i>Hogere verwachte rendementen</li>
                      <li className="flex items-center"><i className="fas fa-check text-green-600 mr-2"></i>Keuze uit beleggingsfondsen</li>
                      <li className="flex items-center"><i className="fas fa-times text-red-600 mr-2"></i>Beleggingsrisico bij verzekeringnemer</li>
                      <li className="flex items-center"><i className="fas fa-times text-red-600 mr-2"></i>Geen gegarandeerd rendement</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center mr-3 font-bold">T</div>
                      <h3 className="font-semibold">Term Levensverzekering</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Pure risicoverzekering zonder spaarcomponent. 
                      Lagere premies, hogere flexibiliteit.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center"><i className="fas fa-check text-green-600 mr-2"></i>Lagere premiekosten</li>
                      <li className="flex items-center"><i className="fas fa-check text-green-600 mr-2"></i>Maximale flexibiliteit</li>
                      <li className="flex items-center"><i className="fas fa-check text-green-600 mr-2"></i>Eenvoudig product</li>
                      <li className="flex items-center"><i className="fas fa-times text-red-600 mr-2"></i>Geen spaarcomponent</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vergelijking Strategieën */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-balance-scale mr-3 text-purple-600"></i>
                  Strategieën Vergelijking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                        🛡️ Hele Leven Verzekering
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-medium text-green-600">Voordelen:</h5>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Gegarandeerde uitkering</li>
                            <li>• Gedwongen sparen</li>
                            <li>• Belastingvoordelen</li>
                            <li>• Geen marktrisico (Tak 21)</li>
                            <li>• Vaste premies</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-red-600">Nadelen:</h5>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Hoge kosten (1-3% jaarlijks)</li>
                            <li>• Lage rendementen</li>
                            <li>• Beperkte flexibiliteit</li>
                            <li>• Complexe producten</li>
                            <li>• Vroege opname penalty</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">
                        📈 Term + Beleggen
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-medium text-green-600">Voordelen:</h5>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Hogere verwachte rendementen</li>
                            <li>• Volledige controle</li>
                            <li>• Transparante kosten</li>
                            <li>• Maximale flexibiliteit</li>
                            <li>• Eenvoudig te begrijpen</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-red-600">Nadelen:</h5>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Beleggingsrisico</li>
                            <li>• Stijgende term premies</li>
                            <li>• Zelfdiscipline vereist</li>
                            <li>• Roerende voorheffing (30%)</li>
                            <li>• Marktvolatiliteit</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Belgische Belasting Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-coins mr-3 text-yellow-600"></i>
                  Belgische Belasting Aspecten
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-blue-600">💰 Levensverzekering Belastingen</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <i className="fas fa-percentage text-green-600 mr-2 mt-1"></i>
                        <span><strong>Uitkering belastingvrij:</strong> Voor begunstigden bij overlijden</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-shield-alt text-green-600 mr-2 mt-1"></i>
                        <span><strong>Geen roerende voorheffing:</strong> Op groei binnen de verzekering</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-calendar text-blue-600 mr-2 mt-1"></i>
                        <span><strong>8 jaar regel:</strong> Belastingvrije afkoop na 8 jaar</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-home text-blue-600 mr-2 mt-1"></i>
                        <span><strong>Woonbonus:</strong> Mogelijk voor hypotheekverzekering</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-600">📊 Beleggingen Belastingen</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <i className="fas fa-coins text-red-600 mr-2 mt-1"></i>
                        <span><strong>Roerende voorheffing:</strong> 30% op dividenden en interest</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-chart-line text-green-600 mr-2 mt-1"></i>
                        <span><strong>Meerwaarden belastingvrij:</strong> Voor particuliere beleggers</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-building text-blue-600 mr-2 mt-1"></i>
                        <span><strong>ETF voordeel:</strong> Geen tussentijdse belasting op groei</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-money-bill text-orange-600 mr-2 mt-1"></i>
                        <span><strong>Speculatietaks:</strong> Vermijden door langetermijn beleggen</span>
                      </li>
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
        <RelatedCalculators currentSlug="levensverzekeraar-calculator" />
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