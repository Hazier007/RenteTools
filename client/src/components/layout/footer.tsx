export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 6 kolommen: 5 calculator categorieën + informatie */}
        <div className="grid md:grid-cols-6 gap-6 mb-8">
          {/* Sparen */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              <i className="fas fa-piggy-bank mr-2 text-primary"></i>
              Sparen
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/hoogste-spaarrente-belgie" className="hover:text-primary transition-colors">Spaarrente</a></li>
              <li><a href="/samengestelde-interest-berekenen" className="hover:text-primary transition-colors">Samengestelde Rente</a></li>
              <li><a href="/deposito-calculator" className="hover:text-primary transition-colors">Deposito</a></li>
            </ul>
          </div>
          
          {/* Lenen */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              <i className="fas fa-credit-card mr-2 text-primary"></i>
              Lenen
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/hypothecaire-lening-berekenen" className="hover:text-primary transition-colors">Hypotheek</a></li>
              <li><a href="/autolening-berekenen" className="hover:text-primary transition-colors">Autolening</a></li>
              <li><a href="/persoonlijke-lening-berekenen" className="hover:text-primary transition-colors">Persoonlijke Lening</a></li>
              <li><a href="/kredietvergelijker-belgie" className="hover:text-primary transition-colors">Kredietvergelijker</a></li>
              <li><a href="/lening-herfinancieren" className="hover:text-primary transition-colors">Herfinancieren</a></li>
            </ul>
          </div>
          
          {/* Beleggen */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              <i className="fas fa-chart-line mr-2 text-primary"></i>
              Beleggen
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/beleggingsrente-calculator" className="hover:text-primary transition-colors">Beleggingsrente</a></li>
            </ul>
          </div>
          
          {/* Planning */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              <i className="fas fa-calculator mr-2 text-primary"></i>
              Planning
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/pensioensparen-calculator" className="hover:text-primary transition-colors">Pensioensparen</a></li>
              <li><a href="/inflatie-calculator-belgie" className="hover:text-primary transition-colors">Inflatie Impact</a></li>
              <li><a href="/reele-rente-berekenen" className="hover:text-primary transition-colors">Reële Rente</a></li>
              <li><a href="/geldontwaarding-calculator" className="hover:text-primary transition-colors">Geldontwaarding</a></li>
            </ul>
          </div>
          
          {/* Overig */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              <i className="fas fa-cogs mr-2 text-primary"></i>
              Overig
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/wettelijke-rentevoet-belgie" className="hover:text-primary transition-colors">Wettelijke Rente</a></li>
              <li><a href="/roerende-voorheffing-calculator" className="hover:text-primary transition-colors">Roerende Voorheffing</a></li>
            </ul>
          </div>
          
          {/* Informatie */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Informatie</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/over-ons" className="hover:text-primary transition-colors">Over Ons</a></li>
              <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="/voorwaarden" className="hover:text-primary transition-colors">Voorwaarden</a></li>
              <li><a href="/sitemap" className="hover:text-primary transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>
        
        {/* Interesten.be sectie onderaan */}
        <div className="border-t border-border pt-8 text-center">
          <div className="text-xl font-bold text-primary mb-4">
            <i className="fas fa-calculator mr-2"></i>
            Interesten.be
          </div>
          <p className="text-sm text-muted-foreground">
            Professionele financiële calculators voor de Belgische markt. 
            Bereken spaarrente, samengestelde interest en hypothecaire leningen.
          </p>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2025 Interesten.be - Alle rechten voorbehouden
        </div>
      </div>
    </footer>
  );
}
