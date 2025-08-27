import { useState } from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  activeCalculator: string;
  onCalculatorChange: (calculator: "spaarrente" | "samengestelde" | "hypotheek") => void;
}

export default function Header({ activeCalculator, onCalculatorChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-primary">
              <i className="fas fa-calculator mr-2"></i>
              Interesten.be
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Button
              variant={activeCalculator === "spaarrente" ? "default" : "ghost"}
              onClick={() => onCalculatorChange("spaarrente")}
              className="font-medium"
              data-testid="nav-spaarrente"
            >
              Spaarrente
            </Button>
            <Button
              variant={activeCalculator === "samengestelde" ? "default" : "ghost"}
              onClick={() => onCalculatorChange("samengestelde")}
              className="font-medium"
              data-testid="nav-samengestelde"
            >
              Samengestelde Rente
            </Button>
            <Button
              variant={activeCalculator === "hypotheek" ? "default" : "ghost"}
              onClick={() => onCalculatorChange("hypotheek")}
              className="font-medium"
              data-testid="nav-hypotheek"
            >
              Hypotheek
            </Button>
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
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                onCalculatorChange("spaarrente");
                setMobileMenuOpen(false);
              }}
              data-testid="mobile-nav-spaarrente"
            >
              Spaarrente Calculator
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                onCalculatorChange("samengestelde");
                setMobileMenuOpen(false);
              }}
              data-testid="mobile-nav-samengestelde"
            >
              Samengestelde Rente
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                onCalculatorChange("hypotheek");
                setMobileMenuOpen(false);
              }}
              data-testid="mobile-nav-hypotheek"
            >
              Hypotheek Simulator
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
