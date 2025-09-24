import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LevensverzekeraarCalculator from "@/components/calculators/levensverzekeraar-calculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCanonical } from "@/hooks/use-canonical";

export default function LevensverzekeraarCalculatorPage() {
  useCanonical();
  
  return (
    <div className="min-h-screen bg-background">
      <head>
        <title>Levensverzekeraar Calculator België - Vergelijk Verzekering vs Beleggen | Interesten.be</title>
        <meta 
          name="description" 
          content="Vergelijk levensverzekering met term verzekering + beleggen. Ontdek wat het beste is voor uw situatie met onze uitgebreide calculator voor België." 
        />
      </head>
      
      <Header activeCalculator="levensverzekeraar" onCalculatorChange={() => {}} />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            
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
                    <div className="text-xs text-muted-foreground">3-pijler pensioensysteem</div>
                  </div>
                </a>
                
                <a href="/fire-calculator" className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors">
                  <i className="fas fa-fire mr-3 text-orange-600"></i>
                  <div>
                    <div className="font-medium">FIRE Calculator</div>
                    <div className="text-xs text-muted-foreground">Financiële onafhankelijkheid</div>
                  </div>
                </a>
                
                <a href="/beleggingsrente-calculator" className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors">
                  <i className="fas fa-chart-line mr-3 text-green-600"></i>
                  <div>
                    <div className="font-medium">Beleggingsrente</div>
                    <div className="text-xs text-muted-foreground">Rendement berekenen</div>
                  </div>
                </a>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <i className="fas fa-lightbulb mr-2 text-primary"></i>
                  Snelle Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="font-medium text-blue-900 dark:text-blue-100">Dekking Richtlijn</div>
                  <div className="text-blue-700 dark:text-blue-300">10x jaarlijks bruto inkomen</div>
                </div>
                
                <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="font-medium text-green-900 dark:text-green-100">Jonge Leeftijd</div>
                  <div className="text-green-700 dark:text-green-300">Term + beleggen meestal voordeliger</div>
                </div>
                
                <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <div className="font-medium text-orange-900 dark:text-orange-100">Oudere Leeftijd</div>
                  <div className="text-orange-700 dark:text-orange-300">Hele leven kan aantrekkelijker worden</div>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <div className="font-medium text-purple-900 dark:text-purple-100">Zelfdiscipline</div>
                  <div className="text-purple-700 dark:text-purple-300">Cruciaal voor term + beleggen succes</div>
                </div>
              </CardContent>
            </Card>

            {/* Verzekering Aanbieders */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <i className="fas fa-building mr-2 text-primary"></i>
                  Belgische Verzekeraars
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>AG Insurance</span>
                  <span className="text-xs text-muted-foreground">Tak 21/23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Allianz</span>
                  <span className="text-xs text-muted-foreground">Tak 21/23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>AXA Belgium</span>
                  <span className="text-xs text-muted-foreground">Tak 21/23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Belfius Insurance</span>
                  <span className="text-xs text-muted-foreground">Tak 21/23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Ethias</span>
                  <span className="text-xs text-muted-foreground">Tak 21/23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>KBC Insurance</span>
                  <span className="text-xs text-muted-foreground">Tak 21/23</span>
                </div>
                <div className="pt-2 border-t text-xs text-muted-foreground">
                  Vergelijk altijd voorwaarden en kosten tussen verschillende aanbieders
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