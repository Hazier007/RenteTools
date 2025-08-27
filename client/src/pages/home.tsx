import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SpaarrenteCalculator from "@/components/calculators/spaarrente-calculator";
import SamengesteldeRenteCalculator from "@/components/calculators/samengestelde-rente-calculator";
import HypotheekCalculator from "@/components/calculators/hypotheek-calculator";
import { Button } from "@/components/ui/button";

type CalculatorType = "spaarrente" | "samengestelde" | "hypotheek";

export default function Home() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>("spaarrente");

  const renderCalculator = () => {
    switch (activeCalculator) {
      case "spaarrente":
        return <SpaarrenteCalculator />;
      case "samengestelde":
        return <SamengesteldeRenteCalculator />;
      case "hypotheek":
        return <HypotheekCalculator />;
      default:
        return <SpaarrenteCalculator />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeCalculator={activeCalculator} onCalculatorChange={setActiveCalculator} />
      
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Belgische Rente Calculators
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Bereken uw spaarrente, ontdek de kracht van samengestelde interest en simuleer uw hypothecaire lening. 
            Professionele financiële tools speciaal voor de Belgische markt.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => setActiveCalculator("spaarrente")}
              className="bg-card text-primary hover:bg-opacity-90 px-6 py-3 font-semibold transition-all transform hover:scale-105"
              data-testid="button-start-spaarrente"
            >
              <i className="fas fa-piggy-bank mr-2"></i>
              Start Spaarrente
            </Button>
            <Button 
              onClick={() => setActiveCalculator("samengestelde")}
              variant="outline"
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-6 py-3 font-semibold transition-all"
              data-testid="button-start-samengestelde"
            >
              <i className="fas fa-chart-line mr-2"></i>
              Samengestelde Rente
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderCalculator()}
      </main>

      <Footer />
    </div>
  );
}
