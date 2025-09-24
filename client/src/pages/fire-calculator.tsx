import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FIRECalculator from "@/components/calculators/fire-calculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCanonical } from "@/hooks/use-canonical";

export default function FIRECalculatorPage() {
  useCanonical();
  
  return (
    <div className="min-h-screen bg-background">
      <head>
        <title>FIRE Calculator België - Financial Independence Retire Early Planning | Interesten.be</title>
        <meta 
          name="description" 
          content="Bereken uw FIRE plan (Financial Independence Retire Early) voor België. Ontdek wanneer u financieel onafhankelijk kunt worden en vroeg met pensioen kunt gaan." 
        />
      </head>
      
      <Header activeCalculator="fire" onCalculatorChange={() => {}} />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            FIRE Calculator België - Financial Independence Retire Early
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereik financiële onafhankelijkheid en ga vroeg met pensioen. 
            Bereken uw FIRE nummer, tijd tot financiële vrijheid en optimale strategie voor België.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">🔥 FIRE Strategieën:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Lean FIRE: Minimale uitgaven, vroeg vrij</li>
              <li>• Regular FIRE: Huidige levensstijl behouden</li>
              <li>• Fat FIRE: Luxe levensstijl mogelijk</li>
              <li>• Coast FIRE: Passief naar normale pensioenleeftijd</li>
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
                  <i className="fas fa-fire mr-3 text-orange-600"></i>
                  FIRE Calculator - Plan uw financiële onafhankelijkheid
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken wanneer u financieel onafhankelijk kunt worden en vroeg met pensioen kunt gaan. 
                  Ontdek verschillende FIRE strategieën en hun impact op uw toekomst.
                </p>
              </CardHeader>
              <CardContent>
                <FIRECalculator />
              </CardContent>
            </Card>

            {/* FIRE Uitleg Sectie */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-question-circle mr-3 text-blue-600"></i>
                  Wat is FIRE? Financial Independence Retire Early
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  FIRE staat voor Financial Independence, Retire Early. Het is een beweging waarbij mensen 
                  streven naar financiële onafhankelijkheid door agressief te sparen en investeren, 
                  zodat ze vroeger met pensioen kunnen gaan dan de traditionele pensioenleeftijd.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-600">🎯 FIRE Principes</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <i className="fas fa-percentage text-green-600 mr-2 mt-1"></i>
                        <span><strong>4% Regel:</strong> Trek jaarlijks 4% van uw vermogen op voor levensonderhoud</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-calculator text-green-600 mr-2 mt-1"></i>
                        <span><strong>25x Regel:</strong> Spaar 25x uw jaarlijkse uitgaven voor FIRE</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-piggy-bank text-green-600 mr-2 mt-1"></i>
                        <span><strong>Hoog Spaarpercentage:</strong> 50%+ van inkomen voor snelle FIRE</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-chart-line text-green-600 mr-2 mt-1"></i>
                        <span><strong>Index Beleggen:</strong> Diversifiëren met lage kosten ETFs</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-blue-600">🇧🇪 FIRE in België</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <i className="fas fa-landmark text-blue-600 mr-2 mt-1"></i>
                        <span><strong>Sociale Zekerheid:</strong> Behoud ziekteverzekering via partner of zelfstandig</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-coins text-blue-600 mr-2 mt-1"></i>
                        <span><strong>Wettelijk Pensioen:</strong> Integreer vanaf 65 jaar in uw FIRE plan</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-receipt text-blue-600 mr-2 mt-1"></i>
                        <span><strong>Belastingen:</strong> 30% roerende voorheffing op dividenden</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-home text-blue-600 mr-2 mt-1"></i>
                        <span><strong>Eigen Woning:</strong> Vermindert FIRE vereisten significant</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FIRE Strategieën Sectie */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-route mr-3 text-purple-600"></i>
                  FIRE Strategieën Vergelijking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                        🌱 Lean FIRE
                      </h4>
                      <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                        Financiële onafhankelijkheid met minimale uitgaven. Vroeg vrij met een sobere levensstijl.
                      </p>
                      <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
                        <li>• FIRE nummer: €400k - €600k</li>
                        <li>• Jaarlijkse uitgaven: €16k - €24k</li>
                        <li>• Voor: Snel bereikbaar, minder stress</li>
                        <li>• Tegen: Beperkte levensstijl</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                        💎 Fat FIRE
                      </h4>
                      <p className="text-sm text-purple-700 dark:text-purple-300 mb-3">
                        Financiële onafhankelijkheid met luxe levensstijl. Hogere uitgaven mogelijk.
                      </p>
                      <ul className="text-xs text-purple-600 dark:text-purple-400 space-y-1">
                        <li>• FIRE nummer: €1.5M - €3M+</li>
                        <li>• Jaarlijkse uitgaven: €60k - €120k+</li>
                        <li>• Voor: Comfortabele levensstijl</li>
                        <li>• Tegen: Duurt langer om te bereiken</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        🎯 Regular FIRE
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                        Huidige levensstijl behouden in financiële onafhankelijkheid. Meest populaire route.
                      </p>
                      <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                        <li>• FIRE nummer: €750k - €1.25M</li>
                        <li>• Jaarlijkse uitgaven: €30k - €50k</li>
                        <li>• Voor: Uitgebalanceerd, haalbaar</li>
                        <li>• Tegen: Matige tijd tot vrijheid</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                        🏖️ Coast FIRE
                      </h4>
                      <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                        Genoeg gespaard om op normale pensioenleeftijd FIRE te zijn zonder meer bijdragen.
                      </p>
                      <ul className="text-xs text-orange-600 dark:text-orange-400 space-y-1">
                        <li>• FIRE nummer: Varieert op leeftijd</li>
                        <li>• Minder druk, meer flexibiliteit</li>
                        <li>• Voor: Stressvrij, werk optioneel</li>
                        <li>• Tegen: Geen vroeg pensioen</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rectangle Ad */}
            <div className="sticky top-6">
              <GoogleAdsense slot="rectangle" />
            </div>

            {/* Gerelateerde Calculators */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <i className="fas fa-calculator mr-2 text-primary"></i>
                  Gerelateerde Calculators
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="/pensioen-calculator" className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors">
                  <i className="fas fa-calculator mr-3 text-blue-600"></i>
                  <div>
                    <div className="font-medium">Pensioen Calculator</div>
                    <div className="text-xs text-muted-foreground">Volledige pensioenplanning</div>
                  </div>
                </a>
                
                <a href="/beleggingsrente-calculator" className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors">
                  <i className="fas fa-chart-line mr-3 text-green-600"></i>
                  <div>
                    <div className="font-medium">Beleggingsrente</div>
                    <div className="text-xs text-muted-foreground">Rendement berekenen</div>
                  </div>
                </a>
                
                <a href="/budget-planner" className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors">
                  <i className="fas fa-chart-pie mr-3 text-purple-600"></i>
                  <div>
                    <div className="font-medium">Budget Planner</div>
                    <div className="text-xs text-muted-foreground">Persoonlijke budgetplanning</div>
                  </div>
                </a>
              </CardContent>
            </Card>

            {/* FIRE Mijlpalen */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <i className="fas fa-flag-checkered mr-2 text-primary"></i>
                  FIRE Mijlpalen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                  <div className="font-medium text-red-900 dark:text-red-100">FI/RE 25%</div>
                  <div className="text-red-700 dark:text-red-300">6 maanden uitgaven - noodfonds</div>
                </div>
                
                <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <div className="font-medium text-orange-900 dark:text-orange-100">FI/RE 50%</div>
                  <div className="text-orange-700 dark:text-orange-300">Halve weg naar financiële vrijheid</div>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="font-medium text-blue-900 dark:text-blue-100">FI/RE 75%</div>
                  <div className="text-blue-700 dark:text-blue-300">Coast FIRE bereikt - passief groei</div>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="font-medium text-green-900 dark:text-green-100">FI/RE 100%</div>
                  <div className="text-green-700 dark:text-green-300">🔥 Financiële onafhankelijkheid!</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom Banner Ad */}
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