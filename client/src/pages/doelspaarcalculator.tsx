import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import DoelspaarcalculatorComponent from "@/components/calculators/doelspaarcalculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DoelspaarcalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <head>
        <title>Doelspaarcalculator België - Plan Meerdere Spaardoelen Tegelijk | Interesten.be</title>
        <meta 
          name="description" 
          content="Plan en beheer al uw spaardoelen met onze doelspaarcalculator. Bereken hoeveel u maandelijks moet sparen voor auto, vakantie, noodfonds en meer." 
        />
      </head>
      
      <Header activeCalculator="doelsparen" onCalculatorChange={() => {}} />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Doelspaarcalculator België - Plan Uw Spaardoelen
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Beheer al uw spaardoelen op één plek. Van noodfonds tot droomvakantie - 
            bereken hoeveel u maandelijks moet sparen en prioriteer slim uw doelen.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">🎯 Smart Goal Planning:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Meerdere doelen tegelijk beheren</li>
              <li>• Automatische prioritering op basis van urgentie</li>
              <li>• Belgische spaarproducten geïntegreerd</li>
              <li>• Realistische tijdslijnen en budgettering</li>
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
                  <i className="fas fa-bullseye mr-3 text-primary"></i>
                  Doelspaarcalculator - Beheer al uw spaardoelen
                </CardTitle>
                <p className="text-muted-foreground">
                  Plan en beheer meerdere spaardoelen tegelijk. Krijg inzicht in benodigde maandelijkse bedragen, 
                  prioriteiten en realistische tijdslijnen voor al uw financiële doelen.
                </p>
              </CardHeader>
              <CardContent>
                <DoelspaarcalculatorComponent />
              </CardContent>
            </Card>

            {/* Spaardoelen Uitleg */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-question-circle mr-3 text-blue-600"></i>
                  Waarom Doelgericht Sparen?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Doelgericht sparen helpt u uw financiële dromen om te zetten in concrete, haalbare plannen. 
                  Door specifieke doelen te stellen met tijdslijnen en bedragen, verhoogt u de kans op succes aanzienlijk.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 font-bold">1</div>
                      <h3 className="font-semibold">SMART Doelen</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Specifiek, Meetbaar, Acceptabel, Realistisch en Tijdsgebonden. 
                      Deze methodiek vergroot uw spaarsucces.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center"><i className="fas fa-check text-green-600 mr-2"></i>Duidelijke bedragen</li>
                      <li className="flex items-center"><i className="fas fa-check text-green-600 mr-2"></i>Vaste deadlines</li>
                      <li className="flex items-center"><i className="fas fa-check text-green-600 mr-2"></i>Haalbare tijdslijnen</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 font-bold">2</div>
                      <h3 className="font-semibold">Prioritering</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Niet alle doelen zijn even belangrijk. Prioriteer op basis van 
                      urgentie, impact en persoonlijke waarden.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center"><i className="fas fa-exclamation text-red-600 mr-2"></i>Hoog: Noodfonds, schulden</li>
                      <li className="flex items-center"><i className="fas fa-minus text-orange-600 mr-2"></i>Gemiddeld: Auto, verbouwing</li>
                      <li className="flex items-center"><i className="fas fa-circle text-blue-600 mr-2"></i>Laag: Luxe vakantie, hobby's</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 font-bold">3</div>
                      <h3 className="font-semibold">Voortgang Tracking</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Regelmatige evaluatie houdt u gemotiveerd en stelt u in staat 
                      om aanpassingen te maken wanneer nodig.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center"><i className="fas fa-chart-line text-purple-600 mr-2"></i>Maandelijkse check-ins</li>
                      <li className="flex items-center"><i className="fas fa-adjust text-purple-600 mr-2"></i>Flexibele aanpassingen</li>
                      <li className="flex items-center"><i className="fas fa-trophy text-purple-600 mr-2"></i>Vier successen</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Populaire Spaardoelen */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-star mr-3 text-yellow-600"></i>
                  Populaire Spaardoelen in België
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-red-600">🚨 Essentiële Doelen</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-red-900 dark:text-red-100">🛡️ Noodfonds</span>
                          <span className="text-sm text-red-700 dark:text-red-300">€8k - €20k</span>
                        </div>
                        <div className="text-xs text-red-600 dark:text-red-400">
                          3-6 maanden uitgaven voor onverwachte kosten
                        </div>
                      </div>
                      
                      <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-orange-900 dark:text-orange-100">🏠 Eigen Woning</span>
                          <span className="text-sm text-orange-700 dark:text-orange-300">€30k - €80k</span>
                        </div>
                        <div className="text-xs text-orange-600 dark:text-orange-400">
                          Aanbetaling hypotheek + notariskosten
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-600">💚 Lifestyle Doelen</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-green-900 dark:text-green-100">🚗 Nieuwe Auto</span>
                          <span className="text-sm text-green-700 dark:text-green-300">€15k - €40k</span>
                        </div>
                        <div className="text-xs text-green-600 dark:text-green-400">
                          Vermijd autolening rente door cash te betalen
                        </div>
                      </div>
                      
                      <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-blue-900 dark:text-blue-100">✈️ Droomvakantie</span>
                          <span className="text-sm text-blue-700 dark:text-blue-300">€3k - €8k</span>
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-400">
                          Verre reizen, luxe accommodaties
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h5 className="font-semibold mb-2">💡 Pro Tip voor Belgen:</h5>
                  <p className="text-sm text-muted-foreground">
                    Gebruik verschillende spaarproducten afhankelijk van uw tijdshorizon: 
                    spaarrekening voor korte termijn (&lt;2 jaar), termijnrekening voor middellange termijn (2-5 jaar), 
                    en beleggingsfondsen voor lange termijn (&gt;5 jaar) doelen.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Belgische Spaaropties */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-landmark mr-3 text-blue-600"></i>
                  Belgische Spaaropties per Doel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-green-600 mb-3">Korte Termijn (&lt;2 jaar)</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <i className="fas fa-piggy-bank text-green-600 mr-2 mt-1"></i>
                          <div>
                            <div className="font-medium">Spaarrekening</div>
                            <div className="text-xs text-muted-foreground">1-3% rente, direct beschikbaar</div>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-calendar text-green-600 mr-2 mt-1"></i>
                          <div>
                            <div className="font-medium">Korte Termijnrekening</div>
                            <div className="text-xs text-muted-foreground">Iets hogere rente, beperkte toegang</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-blue-600 mb-3">Middellange Termijn (2-5 jaar)</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <i className="fas fa-clock text-blue-600 mr-2 mt-1"></i>
                          <div>
                            <div className="font-medium">Termijnrekening</div>
                            <div className="text-xs text-muted-foreground">2-4% rente, vaste periode</div>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-certificate text-blue-600 mr-2 mt-1"></i>
                          <div>
                            <div className="font-medium">Staatsbons</div>
                            <div className="text-xs text-muted-foreground">Gegarandeerd rendement</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-purple-600 mb-3">Lange Termijn (&gt;5 jaar)</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <i className="fas fa-chart-line text-purple-600 mr-2 mt-1"></i>
                          <div>
                            <div className="font-medium">Beleggingsfondsen</div>
                            <div className="text-xs text-muted-foreground">Hoger rendement, meer risico</div>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-umbrella text-purple-600 mr-2 mt-1"></i>
                          <div>
                            <div className="font-medium">Pensioensparen</div>
                            <div className="text-xs text-muted-foreground">Belastingvoordeel 30%</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                    <h5 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                      ⚠️ Belastingen & Vrijstellingen
                    </h5>
                    <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                      <li>• Spaarrente tot €2.290/jaar belastingvrij (alleenstaande)</li>
                      <li>• Pensioensparen: €1.310/jaar met 30% belastingvoordeel</li>
                      <li>• Beleggingen: meerwaarden belastingvrij voor particulieren</li>
                      <li>• Roerende voorheffing: 30% op dividenden en interest</li>
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
                <a href="/budget-planner" className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors">
                  <i className="fas fa-chart-pie mr-3 text-purple-600"></i>
                  <div>
                    <div className="font-medium">Budget Planner</div>
                    <div className="text-xs text-muted-foreground">Persoonlijke budgetplanning</div>
                  </div>
                </a>
                
                <a href="/spaarrekening-calculator" className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors">
                  <i className="fas fa-piggy-bank mr-3 text-green-600"></i>
                  <div>
                    <div className="font-medium">Spaarrekening</div>
                    <div className="text-xs text-muted-foreground">Spaarrente berekenen</div>
                  </div>
                </a>
                
                <a href="/samengestelde-rente-calculator" className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors">
                  <i className="fas fa-chart-line mr-3 text-blue-600"></i>
                  <div>
                    <div className="font-medium">Samengestelde Rente</div>
                    <div className="text-xs text-muted-foreground">Compound interest power</div>
                  </div>
                </a>
              </CardContent>
            </Card>

            {/* Spaartips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <i className="fas fa-lightbulb mr-2 text-primary"></i>
                  Spaartips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="font-medium text-green-900 dark:text-green-100">Automatiseer</div>
                  <div className="text-green-700 dark:text-green-300">Richt automatische overschrijvingen in</div>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="font-medium text-blue-900 dark:text-blue-100">50/30/20 Regel</div>
                  <div className="text-blue-700 dark:text-blue-300">50% noodzaak, 30% wensen, 20% sparen</div>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <div className="font-medium text-purple-900 dark:text-purple-100">Evalueer Maandelijks</div>
                  <div className="text-purple-700 dark:text-purple-300">Controleer voortgang en pas aan</div>
                </div>
                
                <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <div className="font-medium text-orange-900 dark:text-orange-100">Vier Successen</div>
                  <div className="text-orange-700 dark:text-orange-300">Beloon jezelf bij mijlpalen</div>
                </div>
              </CardContent>
            </Card>

            {/* Belgische Banken */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <i className="fas fa-university mr-2 text-primary"></i>
                  Belgische Banken
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>KBC Bank</span>
                  <span className="text-xs text-green-600">Tot 3.5% rente</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>BNP Paribas Fortis</span>
                  <span className="text-xs text-green-600">Tot 3.2% rente</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Belfius Bank</span>
                  <span className="text-xs text-green-600">Tot 3.0% rente</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>ING België</span>
                  <span className="text-xs text-green-600">Tot 2.8% rente</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Argenta</span>
                  <span className="text-xs text-green-600">Tot 3.3% rente</span>
                </div>
                <div className="pt-2 border-t text-xs text-muted-foreground">
                  Vergelijk altijd actuele rentes en voorwaarden
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