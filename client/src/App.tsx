import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieConsentBanner from "@/components/ui/cookie-consent-banner";
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
import OverOns from "@/pages/over-ons";
import Privacy from "@/pages/privacy";
import Voorwaarden from "@/pages/voorwaarden";
import Sitemap from "@/pages/sitemap";
import AdminPage from "@/pages/admin";
import KasbonCalculatorPage from "@/pages/kasbon-calculator";
import ETFCalculatorPage from "@/pages/etf-calculator";
import PensioenCalculatorPage from "@/pages/pensioen-calculator";
import BudgetPlannerPage from "@/pages/budget-planner";
import StudieschuldCalculatorPage from "@/pages/studieschuld-calculator";
import KredietkaartCalculatorPage from "@/pages/kredietkaart-calculator";
import TermijnrekeningCalculatorPage from "@/pages/termijnrekening-calculator";
import KinderrekeningCalculatorPage from "@/pages/kinderrekening-calculator";
import NoodfondsCalculatorPage from "@/pages/noodfonds-calculator";
import SpaarrekeningVergelijkerPage from "@/pages/spaarrekening-vergelijker";
import LoyaltyBonusCalculatorPage from "@/pages/loyalty-bonus-calculator";
import VakantiegeldSparenCalculatorPage from "@/pages/vakantiegeld-sparen-calculator";
import GroepssparenCalculatorPage from "@/pages/groepssparen-calculator";
import EindejaarsbonosCalculatorPage from "@/pages/eindejaarsbonus-calculator";
import WoningkredietSimulatorPage from "@/pages/woningkrediet-simulator";
import DoorlopendKredietCalculatorPage from "@/pages/doorlopend-krediet-calculator";
import LeasingkredietCalculatorPage from "@/pages/leasingkrediet-calculator";
import KredietcapaciteitCalculatorPage from "@/pages/kredietcapaciteit-calculator";
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
      <Route path="/over-ons" component={OverOns} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/voorwaarden" component={Voorwaarden} />
      <Route path="/sitemap" component={Sitemap} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/kasbon-calculator" component={KasbonCalculatorPage} />
      <Route path="/etf-calculator" component={ETFCalculatorPage} />
      <Route path="/pensioen-calculator" component={PensioenCalculatorPage} />
      <Route path="/budget-planner" component={BudgetPlannerPage} />
      <Route path="/studieschuld-calculator" component={StudieschuldCalculatorPage} />
      <Route path="/kredietkaart-calculator" component={KredietkaartCalculatorPage} />
      <Route path="/termijnrekening-calculator" component={TermijnrekeningCalculatorPage} />
      <Route path="/kinderrekening-calculator" component={KinderrekeningCalculatorPage} />
      <Route path="/noodfonds-calculator" component={NoodfondsCalculatorPage} />
      <Route path="/spaarrekening-vergelijker" component={SpaarrekeningVergelijkerPage} />
      <Route path="/loyalty-bonus-calculator" component={LoyaltyBonusCalculatorPage} />
      <Route path="/vakantiegeld-sparen-calculator" component={VakantiegeldSparenCalculatorPage} />
      <Route path="/groepssparen-calculator" component={GroepssparenCalculatorPage} />
      <Route path="/eindejaarsbonus-calculator" component={EindejaarsbonosCalculatorPage} />
      <Route path="/woningkrediet-simulator" component={WoningkredietSimulatorPage} />
      <Route path="/doorlopend-krediet-calculator" component={DoorlopendKredietCalculatorPage} />
      <Route path="/leasingkrediet-calculator" component={LeasingkredietCalculatorPage} />
      <Route path="/kredietcapaciteit-calculator" component={KredietcapaciteitCalculatorPage} />
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
        <CookieConsentBanner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
