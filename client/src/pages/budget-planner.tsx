import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BudgetPlanner from "@/components/calculators/budget-planner";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCanonical } from "@/hooks/use-canonical";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function BudgetPlannerPage() {
  useCanonical();
  const seoConfig = getSeoConfig("budget-planner");
  useSeoTags("budget-planner");
  
  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Budget Planner België - Persoonlijke Budgetplanning
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Neem controle over uw financiën met onze uitgebreide budget planner. 
            Analyseer uw inkomen en uitgaven, stel spaardoelen en verbeter uw financiële gezondheid.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">💰 Budget Planning 2025:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Aanbevolen spaarpercentage: 20% van inkomen</li>
              <li>• Noodfonds: 6 maanden uitgaven</li>
              <li>• Woonkosten: max 33% van inkomen</li>
              <li>• Schuld-inkomen ratio: max 30%</li>
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
                  <i className="fas fa-chart-pie mr-3 text-primary"></i>
                  Budget Planner - Plan uw financiële toekomst
                </CardTitle>
                <p className="text-muted-foreground">
                  Krijg inzicht in uw inkomsten en uitgaven. Onze budget planner helpt u 
                  uw financiële doelen te bereiken en een gezonde financiële toekomst te plannen.
                </p>
              </CardHeader>
              <CardContent>
                <BudgetPlanner />
              </CardContent>
            </Card>

            {/* Ad After Calculator */}
            <div className="flex justify-center py-4">
              <GoogleAdsense slot="banner" />
            </div>

            {/* Budget Tips Sectie */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-lightbulb mr-3 text-yellow-600"></i>
                  Budget Planning Tips voor België
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-blue-600">📊 Budget Richtlijnen</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <i className="fas fa-home text-blue-600 mr-2 mt-1"></i>
                        <span><strong>Woonkosten:</strong> Maximaal 33% van uw netto inkomen</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-piggy-bank text-green-600 mr-2 mt-1"></i>
                        <span><strong>Sparen:</strong> Minimaal 20% van uw inkomen</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-utensils text-orange-600 mr-2 mt-1"></i>
                        <span><strong>Voeding:</strong> 10-15% van uw inkomen</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-car text-purple-600 mr-2 mt-1"></i>
                        <span><strong>Vervoer:</strong> 10-20% van uw inkomen</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-600">💡 Bespaartips</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <i className="fas fa-bolt text-green-600 mr-2 mt-1"></i>
                        <span>Vergelijk energieleveranciers jaarlijks voor lagere facturen</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-mobile-alt text-green-600 mr-2 mt-1"></i>
                        <span>Herzie uw telecom abonnementen en schrap ongebruikte diensten</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-shopping-cart text-green-600 mr-2 mt-1"></i>
                        <span>Plan uw boodschappen en gebruik kortingsbonnen</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-university text-green-600 mr-2 mt-1"></i>
                        <span>Vergelijk bankkosten en zoek naar gratis rekeningen</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Belgische Specifieke Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-flag mr-3 text-red-600"></i>
                  Belgische Budget Overwegingen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 font-bold">€</div>
                      <h3 className="font-semibold">Belastingvoordelen</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Benut fiscale voordelen zoals pensioensparen (€1.310/jaar), 
                      dienstencheques en kinderopvangkosten voor belastingvermindering.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Pensioensparen: 30% belastingvoordeel</li>
                      <li>• Dienstencheques: volledig aftrekbaar</li>
                      <li>• Kinderopvang: gedeeltelijk aftrekbaar</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 font-bold">+</div>
                      <h3 className="font-semibold">Extra Inkomsten</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Vergeet niet om vakantiegeld, 13de maand en kindergeld 
                      mee te nemen in uw budgetplanning.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Vakantiegeld: eenmalig per jaar</li>
                      <li>• 13de maand: vaak in december</li>
                      <li>• Kindergeld: maandelijks tot 25 jaar</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center mr-3 font-bold">!</div>
                      <h3 className="font-semibold">Typische Kosten</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Houd rekening met typisch Belgische kosten zoals 
                      hoge energiefacturen en verzekeringsverplichtingen.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Energiekosten: hoog in België</li>
                      <li>• Autoverzekering: wettelijk verplicht</li>
                      <li>• Gemeentebelastingen: variabel per gemeente</li>
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

      {seoConfig && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AuthorityLinks links={seoConfig.authorityLinks} />
        </section>
      )}

      <Footer />
    </div>
  );
}