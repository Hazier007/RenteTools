import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GoogleAdsense from "@/components/ui/google-adsense";
import { useCanonical } from "@/hooks/use-canonical";

export default function Home() {
  useCanonical();
  
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
      },
      {
        title: "Spaarrekening Vergelijker",
        description: "Vergelijk alle spaarrekeningen van Belgische banken in real-time. Vind de hoogste spaarrente.",
        icon: "fas fa-balance-scale",
        color: "bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800",
        iconColor: "text-indigo-600",
        link: "/spaarrekening-vergelijker",
        features: ["Real-time vergelijking", "Belgische banken", "Hoogste rentes"]
      },
      {
        title: "Kinderrekening Calculator",
        description: "Plan het sparen voor uw kinderen. Bereken hoeveel u nodig heeft voor studies en toekomstige doelen.",
        icon: "fas fa-child",
        color: "bg-pink-50 dark:bg-pink-950 border-pink-200 dark:border-pink-800",
        iconColor: "text-pink-600",
        link: "/kinderrekening-calculator",
        features: ["Studiekosten", "Toekomstige waarde", "Spaarplanning"]
      },
      {
        title: "Noodfonds Calculator",
        description: "Bereken hoeveel u moet sparen voor onverwachte gebeurtenissen en financiële zekerheid.",
        icon: "fas fa-shield-alt",
        color: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
        iconColor: "text-red-600",
        link: "/noodfonds-calculator",
        features: ["Emergency fund", "Financiële zekerheid", "Risicobeheer"]
      },
      {
        title: "Vakantiegeld Sparen",
        description: "Optimaliseer uw vakantiegeld en dubbel vakantiegeld voor maximaal rendement.",
        icon: "fas fa-umbrella-beach",
        color: "bg-cyan-50 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-800",
        iconColor: "text-cyan-600",
        link: "/vakantiegeld-sparen-calculator",
        features: ["Dubbel vakantiegeld", "Spaarstrategie", "Optimalisatie"]
      },
      {
        title: "Groepssparen Calculator",
        description: "Plan en bereken groepssparen met vrienden, familie of collega's voor gezamenlijke doelen.",
        icon: "fas fa-users",
        color: "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800",
        iconColor: "text-emerald-600",
        link: "/groepssparen-calculator",
        features: ["Gezamenlijke doelen", "Groepsplanning", "Fair verdeling"]
      },
      {
        title: "Eindejaarsbonus Calculator",
        description: "Bereken uw 13de maand en ontdek de beste strategie om dit extra geld te benutten.",
        icon: "fas fa-gift",
        color: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800",
        iconColor: "text-amber-600",
        link: "/eindejaarsbonus-calculator",
        features: ["13de maand", "Optimalisatie", "Spaar vs investeer"]
      }
    ],
    lenen: [
      {
        title: "Woningkrediet Simulator",
        description: "Geavanceerde hypotheeksimulator met verschillende scenario's. Bereken maandlast, totale kosten en vergelijk banken.",
        icon: "fas fa-home",
        color: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800",
        iconColor: "text-orange-600",
        link: "/woningkrediet-simulator",
        features: ["Scenario vergelijking", "Kostenverdeling", "Amortisatie schema"]
      },
      {
        title: "Doorlopend Krediet Calculator",
        description: "Bereken kosten van revolving credit in België. Simuleer verschillende afbetalingsscenario's voor kredietlijnen.",
        icon: "fas fa-credit-card",
        color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
        iconColor: "text-blue-600",
        link: "/doorlopend-krediet-calculator",
        features: ["Revolving credit", "Afbetaling simulator", "Effectieve rente"]
      },
      {
        title: "Leasingkrediet Calculator",
        description: "Vergelijk financial en operational leasing. Bereken kosten, fiscale voordelen en vind de beste leasingoptie.",
        icon: "fas fa-car-side",
        color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
        iconColor: "text-green-600",
        link: "/leasingkrediet-calculator",
        features: ["Financial vs operational", "Fiscale voordelen", "Auto & machines"]
      },
      {
        title: "Kredietcapaciteit Calculator",
        description: "Ontdek hoeveel u kunt lenen op basis van inkomen en uitgaven. Belgische banknormen en kredietwaardigheid.",
        icon: "fas fa-calculator",
        color: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800",
        iconColor: "text-purple-600",
        link: "/kredietcapaciteit-calculator",
        features: ["33% regel", "Krediet score", "Leencapaciteit"]
      },
      {
        title: "Schuldenconsolidatie",
        description: "Voeg meerdere leningen samen tot één krediet. Bereken besparingen op rente en maandlasten.",
        icon: "fas fa-layer-group",
        color: "bg-teal-50 dark:bg-teal-950 border-teal-200 dark:border-teal-800",
        iconColor: "text-teal-600",
        link: "/schuldenconsolidatie-calculator",
        features: ["Meerdere schulden", "Rentebesparing", "Eén maandlast"]
      },
      {
        title: "Groepslening Calculator",
        description: "Plan leningen met vrienden of familie. Verdeel kosten eerlijk en beheer risico's bij gezamenlijk lenen.",
        icon: "fas fa-users",
        color: "bg-pink-50 dark:bg-pink-950 border-pink-200 dark:border-pink-800",
        iconColor: "text-pink-600",
        link: "/groepslening-calculator",
        features: ["Samen lenen", "Eerlijke verdeling", "Risicobeheer"]
      },
      {
        title: "Rentevoet Vergelijker",
        description: "Vergelijk vaste en variabele rentevoeten. Simuleer verschillende rentescenario's en break-even analyses.",
        icon: "fas fa-chart-line",
        color: "bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800",
        iconColor: "text-indigo-600",
        link: "/rentevoet-vergelijker",
        features: ["Vast vs variabel", "Rente simulatie", "Break-even analyse"]
      },
      {
        title: "Voorschot Calculator",
        description: "Bereken kosten van voorschotten en cash advance. Vergelijk opties voor kortetermijn financiering.",
        icon: "fas fa-money-bill-wave",
        color: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
        iconColor: "text-red-600",
        link: "/voorschot-calculator",
        features: ["Cash advance", "Bridge loans", "Kortetermijn krediet"]
      },
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
      },
      {
        title: "Lening Herfinancieren",
        description: "Bereken of herfinanciering van uw lening loont. Vergelijk kosten en besparingen bij lagere rentes.",
        icon: "fas fa-sync-alt",
        color: "bg-cyan-50 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-800",
        iconColor: "text-cyan-600",
        link: "/lening-herfinancieren",
        features: ["Herfinanciering calculator", "Break-even analyse", "Kosten vergelijken"]
      }
    ],
    beleggen: [
      {
        title: "ETF Calculator",
        description: "Analyseer Exchange Traded Funds met kosten, tracking error en performance vergelijking. Optimaliseer uw ETF portefeuille.",
        icon: "fas fa-chart-pie",
        color: "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800",
        iconColor: "text-emerald-600",
        link: "/etf-calculator",
        features: ["Kosten analyse", "Performance tracking", "Belgische ETF's"]
      },
      {
        title: "Aandelen Calculator",
        description: "Waardeer aandelen met dividend discount model, P/E ratio's en fundamentele analyse. Belgische dividend belasting inclusief.",
        icon: "fas fa-chart-line",
        color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
        iconColor: "text-blue-600",
        link: "/aandelen-calculator",
        features: ["Dividend yield", "P/E waardering", "Fair value"]
      },
      {
        title: "Obligatie Calculator",
        description: "Bereken yield to maturity, duration en obligatie risico's. Analyseer staatsobligaties en bedrijfsobligaties.",
        icon: "fas fa-certificate",
        color: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800",
        iconColor: "text-purple-600",
        link: "/obligatie-calculator",
        features: ["YTM berekening", "Duration analyse", "Credit risk"]
      },
      {
        title: "Portfolio Diversificatie",
        description: "Optimaliseer asset allocatie met Modern Portfolio Theory. Monte Carlo simulatie voor risico-rendement optimalisatie.",
        icon: "fas fa-chart-area",
        color: "bg-teal-50 dark:bg-teal-950 border-teal-200 dark:border-teal-800",
        iconColor: "text-teal-600",
        link: "/portfolio-diversificatie-calculator",
        features: ["Asset allocation", "Correlatie analyse", "Monte Carlo"]
      },
      {
        title: "Dollar Cost Averaging",
        description: "Simuleer periodiek beleggen vs lump sum. Vergelijk strategieën met marktvolatiliteit en timing impact.",
        icon: "fas fa-calendar-alt",
        color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
        iconColor: "text-green-600",
        link: "/dollar-cost-averaging-calculator",
        features: ["DCA strategie", "Timing analyse", "Volatiliteit impact"]
      },
      {
        title: "REIT Calculator",
        description: "Analyseer vastgoed beleggingsfondsen met FFO, AFFO en NAV berekeningen. Belgische SICAFI inclusief.",
        icon: "fas fa-building",
        color: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800",
        iconColor: "text-orange-600",
        link: "/reit-calculator",
        features: ["FFO/AFFO analyse", "Dividend yield", "SICAFI voordelen"]
      },
      {
        title: "Cryptocurrency Calculator",
        description: "Bereken crypto portfolio risico en DeFi yields. Belgische crypto belastingen en volatiliteit analyse.",
        icon: "fab fa-bitcoin",
        color: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800",
        iconColor: "text-yellow-600",
        link: "/cryptocurrency-calculator",
        features: ["DeFi yields", "Risico analyse", "Belgische belasting"]
      },
      {
        title: "Belgische Beleggingsfiscaliteit",
        description: "Optimaliseer beleggingsbelastingen met roerende voorheffing berekeningen en pensioenspaar strategieën.",
        icon: "fas fa-percentage",
        color: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
        iconColor: "text-red-600",
        link: "/belgische-beleggingsfiscaliteit-calculator",
        features: ["Roerende voorheffing", "Pensioensparen", "Belasting optimalisatie"]
      },
      {
        title: "Beleggingsrente Calculator",
        description: "Bereken het verwachte rendement van uw beleggingsportefeuille. Inclusief kosten en belastingen.",
        icon: "fas fa-chart-bar",
        color: "bg-pink-50 dark:bg-pink-950 border-pink-200 dark:border-pink-800",
        iconColor: "text-pink-600",
        link: "/beleggingsrente-calculator",
        features: ["Portefeuille rendement", "Risico berekenen", "Belgische belastingen"]
      }
    ],
    planning: [
      {
        title: "Pensioen Calculator",
        description: "Volledige pensioenplanning inclusief 1e, 2e en 3e pijler. Bereken vervangingsratio en pensioenkloof.",
        icon: "fas fa-user-clock",
        color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
        iconColor: "text-blue-600",
        link: "/pensioen-calculator",
        features: ["3-pijler systeem", "Vervangingsratio", "Pensioenkloof analyse"]
      },
      {
        title: "Budget Planner",
        description: "Uitgebreide budgetplanning met Belgische specifieke elementen. Vakantiegeld, kindergeld en 13de maand.",
        icon: "fas fa-chart-pie",
        color: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800",
        iconColor: "text-purple-600",
        link: "/budget-planner",
        features: ["Belgische elementen", "Smart categorisatie", "Spaar optimalisatie"]
      },
      {
        title: "FIRE Calculator",
        description: "Financial Independence Retire Early planning. 4 FIRE strategieën met Belgische belastingaspecten.",
        icon: "fas fa-fire",
        color: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800",
        iconColor: "text-orange-600",
        link: "/fire-calculator",
        features: ["4 FIRE strategieën", "4% regel", "Belgische belastingen"]
      },
      {
        title: "Levensverzekeraar Calculator",
        description: "Vergelijk levensverzekering met term verzekering + beleggen. Tak 21/23 vs ETF strategieën.",
        icon: "fas fa-shield-alt",
        color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
        iconColor: "text-green-600",
        link: "/levensverzekeraar-calculator",
        features: ["Tak 21/23 producten", "Term vs whole life", "Risico analyse"]
      },
      {
        title: "Doelspaarcalculator",
        description: "Plan meerdere spaardoelen tegelijk. Smart prioritering en budgetoptimalisatie voor alle doelen.",
        icon: "fas fa-bullseye",
        color: "bg-teal-50 dark:bg-teal-950 border-teal-200 dark:border-teal-800",
        iconColor: "text-teal-600",
        link: "/doelspaarcalculator",
        features: ["Multi-goal planning", "Smart prioritering", "Budget optimalisatie"]
      },
      {
        title: "Belastingplanning Calculator",
        description: "Optimaliseer belastingen op investeringen. Spaarbonus, pensioensparen en ETF strategieën.",
        icon: "fas fa-chart-line",
        color: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800",
        iconColor: "text-yellow-600",
        link: "/belastingplanning-calculator",
        features: ["Fiscale optimalisatie", "Roerende voorheffing", "ETF vs dividenden"]
      },
      {
        title: "Pensioensparen Calculator",
        description: "Plan uw pensioenopbouw via de derde pijler. Bereken belastingvoordeel en pensioenkapitaal.",
        icon: "fas fa-umbrella",
        color: "bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800",
        iconColor: "text-indigo-600",
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
      },
      {
        title: "Reële Rente Berekenen",
        description: "Bereken uw werkelijke rendement na inflatie. Ontdek of uw geld koopkracht wint of verliest.",
        icon: "fas fa-balance-scale",
        color: "bg-lime-50 dark:bg-lime-950 border-lime-200 dark:border-lime-800",
        iconColor: "text-lime-600",
        link: "/reele-rente-berekenen",
        features: ["Reële rente calculator", "Koopkracht analyse", "Fisher formule"]
      },
      {
        title: "Geldontwaarding Calculator",
        description: "Bereken hoe inflatie de waarde van uw geld aantast. Zie wat uw geld waard is in de toekomst.",
        icon: "fas fa-coins",
        color: "bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-800",
        iconColor: "text-rose-600",
        link: "/geldontwaarding-calculator",
        features: ["Geldontwaarding effect", "Toekomstige waarde", "Inflatie impact"]
      }
    ],
    overig: [
      {
        title: "Wettelijke Rentevoet België",
        description: "Bereken wettelijke interest en nalatigheidsrente volgens Belgische wetgeving. Actuele tarieven 2025.",
        icon: "fas fa-gavel",
        color: "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800",
        iconColor: "text-slate-600",
        link: "/wettelijke-rentevoet-belgie",
        features: ["Wettelijke interest", "Nalatigheidsrente", "Juridische tarieven"]
      },
      {
        title: "Roerende Voorheffing Calculator",
        description: "Bereken belasting op spaarrente en dividenden. Inclusief belastingvrije schijf en vrijstellingen.",
        icon: "fas fa-percentage",
        color: "bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800",
        iconColor: "text-neutral-600",
        link: "/roerende-voorheffing-calculator",
        features: ["Belasting calculator", "Vrijstellingen", "Netto rendement"]
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
                <div className="text-3xl font-bold">57+</div>
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
          <GoogleAdsense slot="banner" className="w-full max-w-4xl" />
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
            Optimaliseer uw spaargeld met onze uitgebreide collectie professionele spaartools. Van spaarrekeningen tot speciale spaarproducten.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            <GoogleAdsense slot="rectangle" />
          </div>
        </div>
      </section>

      {/* Beleggen Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
            <i className="fas fa-chart-line mr-4 text-primary"></i>
            Beleggen
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bereken verwachte rendementen en optimaliseer uw beleggingsportefeuille met onze professionele tools.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {calculatorCategories.beleggen.map((calc, index) => (
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
                  <a href={calc.link}>Rendement Berekenen</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Planning Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
              <i className="fas fa-calculator mr-4 text-primary"></i>
              Planning
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Plan uw financiële toekomst met pensioen- en inflatieberekeningen voor optimale zekerheid.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculatorCategories.planning.map((calc, index) => (
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
                    <a href={calc.link}>Planning Starten</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
            
            {/* Google Ad als derde kaart */}
            <div className="hidden lg:block">
              <GoogleAdsense slot="rectangle" />
            </div>
          </div>
        </div>
      </section>

      {/* Overig Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
            <i className="fas fa-cogs mr-4 text-primary"></i>
            Overige Calculators
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Gespecialiseerde financiële tools voor wettelijke interest, belastingen en juridische berekeningen.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculatorCategories.overig.map((calc, index) => (
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
                  <a href={calc.link}>Berekenen</a>
                </Button>
              </CardContent>
            </Card>
          ))}
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
          <GoogleAdsense slot="banner" className="w-full max-w-4xl" />
        </div>
      </section>

      <Footer />
    </div>
  );
}