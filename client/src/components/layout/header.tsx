import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoUrl from "../../assets/logo.png";

interface HeaderProps {
  activeCalculator: string;
  onCalculatorChange: (calculator: "spaarrente" | "samengestelde" | "hypotheek" | "autolening" | "persoonlijke" | "deposito" | "beleggingsrente" | "kredietvergelijker" | "pensioenspar" | "inflatie") => void;
}

export default function Header({ activeCalculator, onCalculatorChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <a href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors" data-testid="logo-link">
              <i className="fas fa-calculator mr-2"></i>
              Interesten.be
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="/hoogste-spaarrente-belgie" className="flex items-center font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent" data-testid="nav-sparen">
              <i className="fas fa-piggy-bank mr-2"></i>
              Sparen
            </a>
            <a href="/hypothecaire-lening-berekenen" className="flex items-center font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent" data-testid="nav-lenen">
              <i className="fas fa-credit-card mr-2"></i>
              Lenen
            </a>
            <a href="/beleggingsrente-calculator" className="flex items-center font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent" data-testid="nav-beleggen">
              <i className="fas fa-chart-line mr-2"></i>
              Beleggen
            </a>
            <a href="/pensioensparen-calculator" className="flex items-center font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent" data-testid="nav-planning">
              <i className="fas fa-calculator mr-2"></i>
              Planning
            </a>
          </nav>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <i className="fas fa-bars text-xl"></i>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-2 space-y-2">
            <a
              href="/hoogste-spaarrente-belgie"
              className="flex items-center w-full justify-start text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-nav-sparen"
            >
              <i className="fas fa-piggy-bank mr-2"></i>
              Sparen
            </a>
            <a
              href="/hypothecaire-lening-berekenen"
              className="flex items-center w-full justify-start text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-nav-lenen"
            >
              <i className="fas fa-credit-card mr-2"></i>
              Lenen
            </a>
            <a
              href="/beleggingsrente-calculator"
              className="flex items-center w-full justify-start text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-nav-beleggen"
            >
              <i className="fas fa-chart-line mr-2"></i>
              Beleggen
            </a>
            <a
              href="/pensioensparen-calculator"
              className="flex items-center w-full justify-start text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-nav-planning"
            >
              <i className="fas fa-calculator mr-2"></i>
              Planning
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
