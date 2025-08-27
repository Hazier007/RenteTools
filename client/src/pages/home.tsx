import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SpaarrenteCalculator from "@/components/calculators/spaarrente-calculator";
import SamengesteldeRenteCalculator from "@/components/calculators/samengestelde-rente-calculator";
import HypotheekCalculator from "@/components/calculators/hypotheek-calculator";
import AutoleningCalculator from "@/components/calculators/autolening-calculator";
import PersoonlijkeLeningCalculator from "@/components/calculators/persoonlijke-lening-calculator";
import DepositoCalculator from "@/components/calculators/deposito-calculator";
import BeleggingsrenteCalculator from "@/components/calculators/beleggingsrente-calculator";
import KredietvergelijkerCalculator from "@/components/calculators/kredietvergelijker-calculator";
import PensioenspaarCalculator from "@/components/calculators/pensioenspar-calculator";
import InflatieCalculator from "@/components/calculators/inflatie-calculator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CalculatorType = "spaarrente" | "samengestelde" | "hypotheek" | "autolening" | "persoonlijke" | "deposito" | "beleggingsrente" | "kredietvergelijker" | "pensioenspar" | "inflatie";

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
      case "autolening":
        return <AutoleningCalculator />;
      case "persoonlijke":
        return <PersoonlijkeLeningCalculator />;
      case "deposito":
        return <DepositoCalculator />;
      case "beleggingsrente":
        return <BeleggingsrenteCalculator />;
      case "kredietvergelijker":
        return <KredietvergelijkerCalculator />;
      case "pensioenspar":
        return <PensioenspaarCalculator />;
      case "inflatie":
        return <InflatieCalculator />;
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
            Belgische Financiële Calculators
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Uitgebreide collectie van professionele financiële rekentools voor de Belgische markt. 
            Van sparen tot lenen, van beleggen tot pensioenplanning.
          </p>
        </div>
      </section>

      {/* Calculator Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="sparen" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sparen" className="text-sm">
              <i className="fas fa-piggy-bank mr-2"></i>
              Sparen
            </TabsTrigger>
            <TabsTrigger value="lenen" className="text-sm">
              <i className="fas fa-credit-card mr-2"></i>
              Lenen
            </TabsTrigger>
            <TabsTrigger value="beleggen" className="text-sm">
              <i className="fas fa-chart-line mr-2"></i>
              Beleggen
            </TabsTrigger>
            <TabsTrigger value="planning" className="text-sm">
              <i className="fas fa-calculator mr-2"></i>
              Planning
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sparen" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveCalculator("spaarrente")}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <i className="fas fa-piggy-bank mr-3 text-primary"></i>
                    Spaarrente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Bereken hoe uw spaargeld groeit met rente-op-rente effect.
                  </p>
                  <Button className="w-full" data-testid="button-select-spaarrente">Selecteren</Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveCalculator("samengestelde")}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <i className="fas fa-chart-line mr-3 text-secondary"></i>
                    Samengestelde Rente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Ontdek de kracht van rente-op-rente over langere termijn.
                  </p>
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" data-testid="button-select-samengestelde">Selecteren</Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveCalculator("deposito")}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <i className="fas fa-university mr-3 text-accent"></i>
                    Deposito/Termijn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Bereken het rendement van termijnrekeningen en deposito's.
                  </p>
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" data-testid="button-select-deposito">Selecteren</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="lenen" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveCalculator("hypotheek")}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <i className="fas fa-home mr-3 text-primary"></i>
                    Hypotheek
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Simuleer uw woonlening met aflossingsschema.
                  </p>
                  <Button className="w-full" data-testid="button-select-hypotheek">Selecteren</Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveCalculator("autolening")}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <i className="fas fa-car mr-3 text-accent"></i>
                    Autolening
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Bereken uw maandelijkse afbetaling voor een autokredit.
                  </p>
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" data-testid="button-select-autolening">Selecteren</Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveCalculator("persoonlijke")}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <i className="fas fa-credit-card mr-3 text-destructive"></i>
                    Persoonlijke Lening
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Bereken kosten van een persoonlijke lening.
                  </p>
                  <Button className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90" data-testid="button-select-persoonlijke">Selecteren</Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveCalculator("kredietvergelijker")}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <i className="fas fa-balance-scale mr-3 text-muted-foreground"></i>
                    Kredietvergelijker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Vergelijk verschillende kredietaanbiedingen.
                  </p>
                  <Button variant="outline" className="w-full" data-testid="button-select-kredietvergelijker">Selecteren</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="beleggen" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveCalculator("beleggingsrente")}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <i className="fas fa-chart-bar mr-3 text-accent"></i>
                    Beleggingsrente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Bereken verwacht rendement van uw beleggingsportefeuille.
                  </p>
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" data-testid="button-select-beleggingsrente">Selecteren</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="planning" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveCalculator("pensioenspar")}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <i className="fas fa-umbrella mr-3 text-primary"></i>
                    Pensioensparen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Plan uw pensioenopbouw via de derde pijler.
                  </p>
                  <Button className="w-full" data-testid="button-select-pensioenspar">Selecteren</Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveCalculator("inflatie")}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <i className="fas fa-trending-down mr-3 text-destructive"></i>
                    Inflatie Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Bereken het effect van inflatie op uw koopkracht.
                  </p>
                  <Button className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90" data-testid="button-select-inflatie">Selecteren</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Active Calculator */}
      {activeCalculator && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {renderCalculator()}
        </section>
      )}

      <Footer />
    </div>
  );
}
