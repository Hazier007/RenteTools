import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import HoogsteSpaarrenteBelgie from "@/pages/hoogste-spaarrente-belgie";
import HypothecaireLningBerekenen from "@/pages/hypothecaire-lening-berekenen";
import SamengesteldeInterestBerekenen from "@/pages/samengestelde-interest-berekenen";
import InflatieCalculatorBelgie from "@/pages/inflatie-calculator-belgie";
import AutoleningBerekenen from "@/pages/autolening-berekenen";
import PersoonlijkeLeningBerekenen from "@/pages/persoonlijke-lening-berekenen";
import PensioenspaarCalculatorPage from "@/pages/pensioensparen-calculator";
import BeleggingsrenteCalculatorPage from "@/pages/beleggingsrente-calculator";
import DepositoCalculatorPage from "@/pages/deposito-calculator";
import KredietvergelijkerBelgie from "@/pages/kredietvergelijker-belgie";
import WettelijkeRentevoetBelgie from "@/pages/wettelijke-rentevoet-belgie";
import RoerendeVoorheffingCalculator from "@/pages/roerende-voorheffing-calculator";
import ReeleRenteBerekenen from "@/pages/reele-rente-berekenen";
import GeldontwaardigCalculator from "@/pages/geldontwaarding-calculator";
import LeningHerfinancieren from "@/pages/lening-herfinancieren";
import Sitemap from "@/pages/sitemap";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/hoogste-spaarrente-belgie" component={HoogsteSpaarrenteBelgie} />
      <Route path="/hypothecaire-lening-berekenen" component={HypothecaireLningBerekenen} />
      <Route path="/samengestelde-interest-berekenen" component={SamengesteldeInterestBerekenen} />
      <Route path="/inflatie-calculator-belgie" component={InflatieCalculatorBelgie} />
      <Route path="/autolening-berekenen" component={AutoleningBerekenen} />
      <Route path="/persoonlijke-lening-berekenen" component={PersoonlijkeLeningBerekenen} />
      <Route path="/pensioensparen-calculator" component={PensioenspaarCalculatorPage} />
      <Route path="/beleggingsrente-calculator" component={BeleggingsrenteCalculatorPage} />
      <Route path="/deposito-calculator" component={DepositoCalculatorPage} />
      <Route path="/kredietvergelijker-belgie" component={KredietvergelijkerBelgie} />
      <Route path="/wettelijke-rentevoet-belgie" component={WettelijkeRentevoetBelgie} />
      <Route path="/roerende-voorheffing-calculator" component={RoerendeVoorheffingCalculator} />
      <Route path="/reele-rente-berekenen" component={ReeleRenteBerekenen} />
      <Route path="/geldontwaarding-calculator" component={GeldontwaardigCalculator} />
      <Route path="/lening-herfinancieren" component={LeningHerfinancieren} />
      <Route path="/sitemap" component={Sitemap} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
