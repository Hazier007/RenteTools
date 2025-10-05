import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Sitemap - Overzicht van alle pagina's
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Vind alle financiële calculators en informatiepagina's van Interesten.be op één plek.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          
          {/* Homepage */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                <i className="fas fa-home mr-3 text-primary"></i>
                Homepage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-primary hover:underline">
                    Interesten.be - Financiële Calculators België
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Sparen */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                <i className="fas fa-piggy-bank mr-3 text-primary"></i>
                Sparen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <a href="/hoogste-spaarrente-belgie" className="text-primary hover:underline">
                    Hoogste Spaarrente België - Spaarrekening Vergelijken
                  </a>
                </li>
                <li>
                  <a href="/samengestelde-interest-berekenen" className="text-primary hover:underline">
                    Samengestelde Interest Berekenen - Compound Interest Calculator
                  </a>
                </li>
                <li>
                  <a href="/deposito-calculator" className="text-primary hover:underline">
                    Deposito Calculator - Termijnrekening Rendement Berekenen
                  </a>
                </li>
                <li>
                  <a href="/termijnrekening-calculator" className="text-primary hover:underline">
                    Termijnrekening Calculator - Deposito Rendement Berekenen
                  </a>
                </li>
                <li>
                  <a href="/kinderrekening-calculator" className="text-primary hover:underline">
                    Kinderrekening Calculator - Sparen voor Kinderen
                  </a>
                </li>
                <li>
                  <a href="/noodfonds-calculator" className="text-primary hover:underline">
                    Noodfonds Calculator - Emergency Fund Berekenen
                  </a>
                </li>
                <li>
                  <a href="/spaarrekening-vergelijker" className="text-primary hover:underline">
                    Spaarrekening Vergelijker - Beste Spaarrentes België
                  </a>
                </li>
                <li>
                  <a href="/loyalty-bonus-calculator" className="text-primary hover:underline">
                    Loyalty Bonus Calculator - Getrouwheidspremie Optimaliseren
                  </a>
                </li>
                <li>
                  <a href="/vakantiegeld-sparen-calculator" className="text-primary hover:underline">
                    Vakantiegeld Sparen Calculator - Dubbel Vakantiegeld Optimaliseren
                  </a>
                </li>
                <li>
                  <a href="/groepssparen-calculator" className="text-primary hover:underline">
                    Groepssparen Calculator - Samen Sparen voor Gezamenlijke Doelen
                  </a>
                </li>
                <li>
                  <a href="/eindejaarsbonus-calculator" className="text-primary hover:underline">
                    Eindejaarsbonus Calculator - 13de Maand Optimaliseren
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Lenen */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                <i className="fas fa-credit-card mr-3 text-primary"></i>
                Lenen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <a href="/hypothecaire-lening-berekenen" className="text-primary hover:underline">
                    Hypothecaire Lening Berekenen - Hypotheek Calculator België
                  </a>
                </li>
                <li>
                  <a href="/autolening-berekenen" className="text-primary hover:underline">
                    Autolening Berekenen - Autokredit Simulator België
                  </a>
                </li>
                <li>
                  <a href="/persoonlijke-lening-berekenen" className="text-primary hover:underline">
                    Persoonlijke Lening Berekenen - Kostprijs & JKP Calculator
                  </a>
                </li>
                <li>
                  <a href="/kredietvergelijker-belgie" className="text-primary hover:underline">
                    Kredietvergelijker België - Leningen Vergelijken & Besparen
                  </a>
                </li>
                <li>
                  <a href="/lening-herfinancieren" className="text-primary hover:underline">
                    Lening Herfinancieren - Voordeligste Herfinanciering Berekenen
                  </a>
                </li>
                <li>
                  <a href="/studieschuld-calculator" className="text-primary hover:underline">
                    Studieschuld Calculator - Studielening Terugbetaling Berekenen
                  </a>
                </li>
                <li>
                  <a href="/kredietkaart-calculator" className="text-primary hover:underline">
                    Kredietkaart Calculator - Schuld Afbetaling Berekenen
                  </a>
                </li>
                <li>
                  <a href="/doorlopend-krediet-calculator" className="text-primary hover:underline">
                    Doorlopend Krediet Calculator - Revolving Credit Kostprijs Berekenen
                  </a>
                </li>
                <li>
                  <a href="/leasingkrediet-calculator" className="text-primary hover:underline">
                    Leasingkrediet Calculator - Auto Leasing vs Aankoop Vergelijken
                  </a>
                </li>
                <li>
                  <a href="/kredietcapaciteit-calculator" className="text-primary hover:underline">
                    Kredietcapaciteit Calculator - Maximale Leencapaciteit Berekenen
                  </a>
                </li>
                <li>
                  <a href="/schuldenconsolidatie-calculator" className="text-primary hover:underline">
                    Schuldenconsolidatie Calculator - Schulden Samenvoegen Voordeel
                  </a>
                </li>
                <li>
                  <a href="/groepslening-calculator" className="text-primary hover:underline">
                    Groepslening Calculator - Samen Lenen Voordelen Berekenen
                  </a>
                </li>
                <li>
                  <a href="/voorschot-calculator" className="text-primary hover:underline">
                    Voorschot Calculator - Loonvoorschot Kosten Berekenen
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Beleggen */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                <i className="fas fa-chart-line mr-3 text-primary"></i>
                Beleggen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <a href="/beleggingsrente-calculator" className="text-primary hover:underline">
                    Beleggingsrente Calculator - Rendement Portefeuille Berekenen
                  </a>
                </li>
                <li>
                  <a href="/kasbon-calculator" className="text-primary hover:underline">
                    Kasbon Calculator - Obligatie Rendement Berekenen
                  </a>
                </li>
                <li>
                  <a href="/etf-calculator" className="text-primary hover:underline">
                    ETF Calculator - Exchange Traded Funds Rendement Berekenen
                  </a>
                </li>
                <li>
                  <a href="/aandelen-calculator" className="text-primary hover:underline">
                    Aandelen Calculator - Dividend en Koerswinst Berekenen
                  </a>
                </li>
                <li>
                  <a href="/obligatie-calculator" className="text-primary hover:underline">
                    Obligatie Calculator - Obligatie Rendement en YTM Berekenen
                  </a>
                </li>
                <li>
                  <a href="/portfolio-diversificatie-calculator" className="text-primary hover:underline">
                    Portfolio Diversificatie Calculator - Risico Spreiding Optimaliseren
                  </a>
                </li>
                <li>
                  <a href="/dollar-cost-averaging-calculator" className="text-primary hover:underline">
                    Dollar Cost Averaging Calculator - Maandelijks Beleggen Strategie
                  </a>
                </li>
                <li>
                  <a href="/reit-calculator" className="text-primary hover:underline">
                    REIT Calculator - Real Estate Investment Trust Rendement
                  </a>
                </li>
                <li>
                  <a href="/cryptocurrency-calculator" className="text-primary hover:underline">
                    Cryptocurrency Calculator - Crypto Belegging Rendement Berekenen
                  </a>
                </li>
                <li>
                  <a href="/belgische-beleggingsfiscaliteit-calculator" className="text-primary hover:underline">
                    Belgische Beleggingsfiscaliteit Calculator - Taks op Beursverrichtingen
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Planning */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                <i className="fas fa-calculator mr-3 text-primary"></i>
                Planning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <a href="/pensioen-calculator" className="text-primary hover:underline">
                    Pensioen Calculator - Volledige Pensioenplanning België (1e, 2e, 3e Pijler)
                  </a>
                </li>
                <li>
                  <a href="/budget-planner" className="text-primary hover:underline">
                    Budget Planner - Persoonlijke Financiën Beheren met Belgische Elementen
                  </a>
                </li>
                <li>
                  <a href="/fire-calculator" className="text-primary hover:underline">
                    FIRE Calculator - Financial Independence Retire Early Planning België
                  </a>
                </li>
                <li>
                  <a href="/levensverzekeraar-calculator" className="text-primary hover:underline">
                    Levensverzekeraar Calculator - Levensverzekering vs Beleggen Vergelijken
                  </a>
                </li>
                <li>
                  <a href="/doelspaarcalculator" className="text-primary hover:underline">
                    Doelspaarcalculator - Meerdere Spaardoelen Tegelijk Plannen
                  </a>
                </li>
                <li>
                  <a href="/belastingplanning-calculator" className="text-primary hover:underline">
                    Belastingplanning Calculator - Optimaliseer Belastingen op Investeringen
                  </a>
                </li>
                <li>
                  <a href="/pensioensparen-calculator" className="text-primary hover:underline">
                    Pensioensparen Calculator - Derde Pijler Planning België
                  </a>
                </li>
                <li>
                  <a href="/inflatie-calculator-belgie" className="text-primary hover:underline">
                    Inflatie Calculator België - Koopkracht Impact Berekenen
                  </a>
                </li>
                <li>
                  <a href="/reele-rente-berekenen" className="text-primary hover:underline">
                    Reële Rente Berekenen - Inflatie vs Spaarrente Calculator
                  </a>
                </li>
                <li>
                  <a href="/geldontwaarding-calculator" className="text-primary hover:underline">
                    Geldontwaarding Calculator - Wat is mijn Geld Waard over 10 Jaar?
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Overige Calculators */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                <i className="fas fa-cogs mr-3 text-primary"></i>
                Overige Calculators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <a href="/wettelijke-rentevoet-belgie" className="text-primary hover:underline">
                    Wettelijke Rentevoet België - Nalatigheidsinterest Berekenen
                  </a>
                </li>
                <li>
                  <a href="/roerende-voorheffing-calculator" className="text-primary hover:underline">
                    Roerende Voorheffing Calculator - Belasting op Spaarrente en Dividenden
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Informatie */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                <i className="fas fa-info-circle mr-3 text-primary"></i>
                Informatie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <a href="/over-ons" className="text-primary hover:underline">
                    Over Ons - Wie zijn wij en wat doen we?
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Beleid - Hoe beschermen wij uw gegevens?
                  </a>
                </li>
                <li>
                  <a href="/voorwaarden" className="text-primary hover:underline">
                    Algemene Voorwaarden - Gebruiksvoorwaarden en disclaimer
                  </a>
                </li>
                <li>
                  <a href="/sitemap" className="text-primary hover:underline">
                    Sitemap - Overzicht van alle pagina's
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

        </div>

        {/* SEO Text */}
        <div className="mt-12 prose prose-slate dark:prose-invert max-w-none">
          <h2>Over Interesten.be</h2>
          <p>
            Interesten.be is uw vertrouwde bron voor financiële calculators en tools 
            specifiek ontworpen voor de Belgische markt. Al onze calculators zijn 
            geoptimaliseerd voor Belgische wetgeving, belastingregels en financiële praktijken.
          </p>
          
          <h3>Onze Calculator Categorieën:</h3>
          <ul>
            <li><strong>Sparen:</strong> Tools voor spaarrekeningen, deposito's en samengestelde interest berekeningen</li>
            <li><strong>Lenen:</strong> Calculators voor hypotheken, autoleningen, persoonlijke kredieten, studieleningen, kredietkaarten en herfinanciering</li>
            <li><strong>Beleggen:</strong> Rendement calculators voor beleggingsportefeuilles, ETF's, kasbons en obligaties</li>
            <li><strong>Planning:</strong> Pensioenplanning, budget beheer, inflatie impact, reële rente en geldontwaarding tools</li>
            <li><strong>Overige Calculators:</strong> Wettelijke rentevoet en roerende voorheffing berekeningen</li>
          </ul>
          
          <p>
            Alle calculators zijn gratis te gebruiken en bevatten actuele informatie 
            over tarieven, belastingen en regelgeving in België. Perfect voor particulieren 
            die hun financiële toekomst willen plannen.
          </p>
        </div>

      </section>

      <Footer />
    </div>
  );
}