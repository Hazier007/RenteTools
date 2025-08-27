import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeCalculator="" onCalculatorChange={() => {}} />
      
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
                  <span className="text-muted-foreground">Over Ons (binnenkort beschikbaar)</span>
                </li>
                <li>
                  <span className="text-muted-foreground">Privacy (binnenkort beschikbaar)</span>
                </li>
                <li>
                  <span className="text-muted-foreground">Voorwaarden (binnenkort beschikbaar)</span>
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
            <li><strong>Lenen:</strong> Calculators voor hypotheken, autoleningen, persoonlijke kredieten en herfinanciering</li>
            <li><strong>Beleggen:</strong> Rendement calculators voor beleggingsportefeuilles</li>
            <li><strong>Planning:</strong> Pensioenplanning, inflatie impact, reële rente en geldontwaarding tools</li>
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