export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold text-primary mb-4">
              <i className="fas fa-calculator mr-2"></i>
              Interesten.be
            </div>
            <p className="text-sm text-muted-foreground">
              Professionele financiële calculators voor de Belgische markt. 
              Bereken spaarrente, samengestelde interest en hypothecaire leningen.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Calculators</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Spaarrente</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Samengestelde Rente</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Hypotheek</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Informatie</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Over Ons</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Voorwaarden</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <p className="text-sm text-muted-foreground mb-2">
              info@interesten.be
            </p>
            <p className="text-sm text-muted-foreground">
              Belgische financiële expertise
            </p>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2024 Interesten.be - Alle rechten voorbehouden
        </div>
      </div>
    </footer>
  );
}
