import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PensioenCalculator from "@/components/calculators/pensioen-calculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function PensioenCalculatorPage() {
  const seoConfig = getSeoConfig("pensioen-calculator");
  useSeoTags("pensioen-calculator");
  
  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Pensioen Calculator België - Volledige Pensioenplanning
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Plan uw volledige pensioen met analyse van alle drie de pijlers. 
            Bereken uw toekomstig pensioeninkomen, vervangingsratio en ontdek eventuele tekorten.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">🏛️ Belgisch Pensioensysteem 2026:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• 1e Pijler: Wettelijk pensioen (max €1.732/maand)</li>
              <li>• 2e Pijler: Aanvullend pensioen via werkgever</li>
              <li>• 3e Pijler: Eigen pensioenopbouw en -sparen</li>
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
                  <i className="fas fa-calculator mr-3 text-primary"></i>
                  Pensioen Calculator - Plan uw volledige pensioen
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken uw toekomstig pensioeninkomen uit alle drie de pijlers. 
                  Ontdek uw vervangingsratio en plan voor een zorgeloze pensionering.
                </p>
              </CardHeader>
              <CardContent>
                <PensioenCalculator />
              </CardContent>
            </Card>

            {/* Ad After Calculator */}
            <div className="flex justify-center py-4">
              <GoogleAdsense slot="banner" />
            </div>

            {/* Uitleg Sectie */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-lightbulb mr-3 text-yellow-600"></i>
                  Hoe werkt het Belgische Pensioensysteem?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 font-bold">1</div>
                      <h3 className="font-semibold">Eerste Pijler</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Het wettelijk pensioen wordt berekend door de RVP/SFP op basis van uw volledige carrière. 
                      Het maximum bedraagt €1.732 per maand in 2024 voor een volledige carrière van 45 jaar.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Gebaseerd op inkomen en werkjaren</li>
                      <li>• Maximum 45 jaar telt mee</li>
                      <li>• Pensioenleeftijd: 65-67 jaar</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 font-bold">2</div>
                      <h3 className="font-semibold">Tweede Pijler</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Aanvullend pensioen via uw werkgever. Dit kan een groepsverzekering, 
                      pensioenfonds of sociale pensioentoezegging zijn.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Werkgevers- en werknemersbijdragen</li>
                      <li>• Kapitaal of pensioenrente</li>
                      <li>• Belastingvoordeel tijdens opbouw</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center mr-3 font-bold">3</div>
                      <h3 className="font-semibold">Derde Pijler</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Eigen pensioenopbouw via pensioensparen, vrijgesteld pensioensparen 
                      of andere private pensioenvoorzieningen.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Pensioensparen: €1.310/jaar</li>
                      <li>• Belastingvoordeel 30%</li>
                      <li>• Vrije keuze van producten</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips Sectie */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-tips mr-3 text-green-600"></i>
                  Pensioenplanning Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-600">✅ Doe dit wel</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <i className="fas fa-check text-green-600 mr-2 mt-1"></i>
                        Start zo vroeg mogelijk met pensioensparen voor het compound effect
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check text-green-600 mr-2 mt-1"></i>
                        Benut het maximale pensioensparen van €1.310 per jaar
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check text-green-600 mr-2 mt-1"></i>
                        Informeer bij uw werkgever over de tweede pijler mogelijkheden
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check text-green-600 mr-2 mt-1"></i>
                        Diversifieer uw pensioenportefeuille over verschillende producten
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-red-600">❌ Vermijd dit</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <i className="fas fa-times text-red-600 mr-2 mt-1"></i>
                        Pensioenplanning uitstellen tot later in uw carrière
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-times text-red-600 mr-2 mt-1"></i>
                        Alleen vertrouwen op het wettelijk pensioen (1e pijler)
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-times text-red-600 mr-2 mt-1"></i>
                        Te conservatieve beleggingen bij jonge leeftijd
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-times text-red-600 mr-2 mt-1"></i>
                        Pensioenkapitaal gebruiken voor andere doelen
                      </li>
                    </ul>
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