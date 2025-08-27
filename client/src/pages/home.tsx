import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdPlaceholder from "@/components/ui/ad-placeholder";

export default function Home() {
  
  const calculatorCategories = {
    sparen: [
      {
        title: "Hoogste Spaarrente België",
        description: "Vergelijk spaarrekeningen en bereken uw rente-inkomsten. Vind de beste spaarrente tarieven van 2025.",
        icon: "fas fa-piggy-bank",
        color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
        iconColor: "text-blue-600",
        link: "/hoogste-spaarrente-belgie",
        features: ["Spaarrekening vergelijken", "Rente berekenen", "Belgische banken"]
      },
      {
        title: "Samengestelde Interest",
        description: "Ontdek de kracht van compound interest. Bereken hoe uw geld exponentieel groeit over tijd.",
        icon: "fas fa-chart-line",
        color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
        iconColor: "text-green-600",
        link: "/samengestelde-interest-berekenen",
        features: ["Compound interest", "Lange termijn groei", "Rente-op-rente effect"]
      },
      {
        title: "Deposito Calculator",
        description: "Bereken het rendement van termijnrekeningen en deposito's. Vergelijk verschillende looptijden.",
        icon: "fas fa-university",
        color: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800",
        iconColor: "text-purple-600",
        link: "/deposito-calculator",
        features: ["Termijnrekeningen", "Deposito vergelijken", "Vaste rente"]
      }
    ],
    lenen: [
      {
        title: "Hypothecaire Lening",
        description: "Bereken uw hypotheek met aflossingsschema. Simuleer verschillende scenario's voor uw woonlening.",
        icon: "fas fa-home",
        color: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800",
        iconColor: "text-orange-600",
        link: "/hypothecaire-lening-berekenen",
        features: ["Woonlening simulator", "Aflossingsschema", "JKP berekenen"]
      },
      {
        title: "Autolening Berekenen",
        description: "Simuleer uw autokredit en bereken maandelijkse afbetalingen. Vergelijk verschillende financieringsopties.",
        icon: "fas fa-car",
        color: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
        iconColor: "text-red-600",
        link: "/autolening-berekenen",
        features: ["Autokredit simulator", "Maandlast berekenen", "Voorschot impact"]
      },
      {
        title: "Persoonlijke Lening",
        description: "Bereken de kosten van een persoonlijke lening. Vergelijk JKP en totale leningskosten.",
        icon: "fas fa-credit-card",
        color: "bg-pink-50 dark:bg-pink-950 border-pink-200 dark:border-pink-800",
        iconColor: "text-pink-600",
        link: "/persoonlijke-lening-berekenen",
        features: ["JKP calculator", "Kostprijs berekenen", "Lening vergelijken"]
      },
      {
        title: "Kredietvergelijker",
        description: "Vergelijk verschillende kredietaanbiedingen naast elkaar. Bespaar honderden euro's door te vergelijken.",
        icon: "fas fa-balance-scale",
        color: "bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800",
        iconColor: "text-indigo-600",
        link: "/kredietvergelijker-belgie",
        features: ["Leningen vergelijken", "Beste deal vinden", "Kosten besparen"]
      }
    ],
    beleggen: [
      {
        title: "Beleggingsrente Calculator",
        description: "Bereken het verwachte rendement van uw beleggingsportefeuille. Inclusief kosten en belastingen.",
        icon: "fas fa-chart-bar",
        color: "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800",
        iconColor: "text-emerald-600",
        link: "/beleggingsrente-calculator",
        features: ["Portefeuille rendement", "Risico berekenen", "Belgische belastingen"]
      }
    ],
    planning: [
      {
        title: "Pensioensparen Calculator",
        description: "Plan uw pensioenopbouw via de derde pijler. Bereken belastingvoordeel en pensioenkapitaal.",
        icon: "fas fa-umbrella",
        color: "bg-teal-50 dark:bg-teal-950 border-teal-200 dark:border-teal-800",
        iconColor: "text-teal-600",
        link: "/pensioensparen-calculator",
        features: ["Derde pijler", "Belastingvoordeel", "Pensioenkapitaal"]
      },
      {
        title: "Inflatie Calculator",
        description: "Bereken het effect van inflatie op uw koopkracht. Zie hoe inflatie uw spaargeld beïnvloedt.",
        icon: "fas fa-trending-down",
        color: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800",
        iconColor: "text-amber-600",
        link: "/inflatie-calculator-belgie",
        features: ["Koopkracht impact", "Inflatie effect", "Lange termijn planning"]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeCalculator="" onCalculatorChange={() => {}} />
      
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Belgische Financiële Calculators
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              Professionele financiële rekentools voor sparen, lenen, beleggen en pensioenplanning. 
              Speciaal ontwikkeld voor de Belgische markt met actuele tarieven en regelgeving.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm opacity-80">Calculators</div>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm opacity-80">Gratis</div>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
                <div className="text-3xl font-bold">BE</div>
                <div className="text-sm opacity-80">Specifiek</div>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
                <div className="text-3xl font-bold">2025</div>
                <div className="text-sm opacity-80">Actueel</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <AdPlaceholder size="leaderboard" className="hidden lg:block" />
          <AdPlaceholder size="banner" className="lg:hidden" />
        </div>
      </section>

      {/* Sparen Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
            <i className="fas fa-piggy-bank mr-4 text-primary"></i>
            Sparen
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Optimaliseer uw spaargeld met onze professionele rekenhulpen. Van spaarrekeningen tot deposito's.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculatorCategories.sparen.map((calc, index) => (
            <Card key={index} className={`${calc.color} hover:shadow-xl transition-all duration-300 hover:scale-105`}>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <i className={`${calc.icon} mr-3 text-2xl ${calc.iconColor}`}></i>
                  {calc.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{calc.description}</p>
                <div className="space-y-2">
                  {calc.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <i className="fas fa-check mr-2 text-green-600"></i>
                      {feature}
                    </div>
                  ))}
                </div>
                <Button asChild className="w-full">
                  <a href={calc.link}>Calculator Openen</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Lenen Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
              <i className="fas fa-credit-card mr-4 text-primary"></i>
              Lenen
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bereken de kosten van leningen en vind de beste financieringsoptie voor uw situatie.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {calculatorCategories.lenen.map((calc, index) => (
              <Card key={index} className={`${calc.color} hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <i className={`${calc.icon} mr-3 text-xl ${calc.iconColor}`}></i>
                    {calc.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{calc.description}</p>
                  <div className="space-y-1">
                    {calc.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs">
                        <i className="fas fa-check mr-2 text-green-600"></i>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full" size="sm">
                    <a href={calc.link}>Berekenen</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Mid-section Ad */}
          <div className="flex justify-center mt-12">
            <AdPlaceholder size="banner" />
          </div>
        </div>
      </section>

      {/* Beleggen & Planning Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Beleggen */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
                <i className="fas fa-chart-line mr-4 text-primary"></i>
                Beleggen
              </h2>
              <p className="text-lg text-muted-foreground">
                Bereken verwachte rendementen en optimaliseer uw beleggingsportefeuille.
              </p>
            </div>
            
            <div className="space-y-6">
              {calculatorCategories.beleggen.map((calc, index) => (
                <Card key={index} className={`${calc.color} hover:shadow-lg transition-all duration-300`}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <i className={`${calc.icon} mr-3 text-2xl ${calc.iconColor}`}></i>
                      {calc.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{calc.description}</p>
                    <div className="space-y-2">
                      {calc.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <i className="fas fa-check mr-2 text-green-600"></i>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button asChild className="w-full">
                      <a href={calc.link}>Rendement Berekenen</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Planning */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
                <i className="fas fa-calculator mr-4 text-primary"></i>
                Planning
              </h2>
              <p className="text-lg text-muted-foreground">
                Plan uw financiële toekomst met pensioen- en inflatieberekeningen.
              </p>
            </div>
            
            <div className="space-y-6">
              {calculatorCategories.planning.map((calc, index) => (
                <Card key={index} className={`${calc.color} hover:shadow-lg transition-all duration-300`}>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <i className={`${calc.icon} mr-3 text-2xl ${calc.iconColor}`}></i>
                      {calc.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{calc.description}</p>
                    <div className="space-y-2">
                      {calc.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <i className="fas fa-check mr-2 text-green-600"></i>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button asChild className="w-full">
                      <a href={calc.link}>Planning Starten</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              {/* Sidebar Ad */}
              <div className="hidden lg:block mt-8">
                <AdPlaceholder size="rectangle" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Waarom Interesten.be?</h2>
            <p className="text-xl text-muted-foreground">
              De voordelen van onze Belgische financiële calculators
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-flag text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Belgisch Specifiek</h3>
              <p className="text-muted-foreground">Alle calculators zijn aangepast aan Belgische wetgeving en belastingregels.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-sync text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Actuele Tarieven</h3>
              <p className="text-muted-foreground">Gebaseerd op de meest recente rentes en tarieven van 2025.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Betrouwbaar</h3>
              <p className="text-muted-foreground">Professionele berekeningen gebruikt door duizenden Belgen.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-mobile-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobiel Vriendelijk</h3>
              <p className="text-muted-foreground">Alle calculators werken perfect op desktop, tablet en smartphone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Banner Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <AdPlaceholder size="leaderboard" className="hidden lg:block" />
          <AdPlaceholder size="banner" className="lg:hidden" />
        </div>
      </section>

      <Footer />
    </div>
  );
}