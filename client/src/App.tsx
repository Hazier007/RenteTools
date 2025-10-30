import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieConsentBanner from "@/components/ui/cookie-consent-banner";
import Redirect from "@/components/Redirect";
import Home from "@/pages/home";
import OverOns from "@/pages/over-ons";
import Privacy from "@/pages/privacy";
import Voorwaarden from "@/pages/voorwaarden";
import Sitemap from "@/pages/sitemap";
import AdminPage from "@/pages/admin";
import BlogAutomationPage from "@/pages/admin/blog-automation";
import BlogPage from "@/pages/blog";
import BlogDetailPage from "@/pages/blog-detail";
import SparenPage from "@/pages/sparen";
import LenenPage from "@/pages/lenen";
import BeleggenPage from "@/pages/beleggen";
import PlanningPage from "@/pages/planning";
import OverigePage from "@/pages/overige";
import DynamicCalculatorPage from "@/pages/DynamicCalculatorPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* Blog Pages */}
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogDetailPage} />
      
      {/* Admin Pages */}
      <Route path="/admin/blog-automation" component={BlogAutomationPage} />
      
      {/* Category Landing Pages - PRIORITY */}
      <Route path="/sparen" component={SparenPage} />
      <Route path="/lenen" component={LenenPage} />
      <Route path="/beleggen" component={BeleggenPage} />
      <Route path="/planning" component={PlanningPage} />
      <Route path="/overige" component={OverigePage} />

      {/* Static Information Pages */}
      <Route path="/over-ons" component={OverOns} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/voorwaarden" component={Voorwaarden} />
      <Route path="/sitemap" component={Sitemap} />
      <Route path="/admin" component={AdminPage} />
      
      {/* Nested Calculator Routes */}
      <Route path="/sparen/:slug" component={DynamicCalculatorPage} />
      <Route path="/lenen/:slug" component={DynamicCalculatorPage} />
      <Route path="/beleggen/:slug" component={DynamicCalculatorPage} />
      <Route path="/planning/:slug" component={DynamicCalculatorPage} />

      {/* Legacy Redirects - SPAREN Category */}
      <Route path="/hoogste-spaarrente-belgie">
        {() => <Redirect to="/sparen/hoogste-spaarrente-belgie" />}
      </Route>
      <Route path="/deposito-calculator">
        {() => <Redirect to="/sparen/deposito-calculator" />}
      </Route>
      <Route path="/samengestelde-interest-berekenen">
        {() => <Redirect to="/sparen/samengestelde-interest-berekenen" />}
      </Route>
      <Route path="/doelspaarcalculator">
        {() => <Redirect to="/sparen/doelspaarcalculator" />}
      </Route>
      <Route path="/spaarrekening-vergelijker">
        {() => <Redirect to="/sparen/spaarrekening-vergelijker" />}
      </Route>
      <Route path="/kinderrekening-calculator">
        {() => <Redirect to="/sparen/kinderrekening-calculator" />}
      </Route>
      <Route path="/kasbon-calculator">
        {() => <Redirect to="/sparen/kasbon-calculator" />}
      </Route>
      <Route path="/termijnrekening-calculator">
        {() => <Redirect to="/sparen/termijnrekening-calculator" />}
      </Route>
      <Route path="/groepssparen-calculator">
        {() => <Redirect to="/sparen/groepssparen-calculator" />}
      </Route>
      <Route path="/loyalty-bonus-calculator">
        {() => <Redirect to="/sparen/loyalty-bonus-calculator" />}
      </Route>
      <Route path="/vakantiegeld-sparen-calculator">
        {() => <Redirect to="/sparen/vakantiegeld-sparen-calculator" />}
      </Route>
      
      {/* Legacy Redirects - LENEN Category */}
      <Route path="/hypothecaire-lening-berekenen">
        {() => <Redirect to="/lenen/hypothecaire-lening-berekenen" />}
      </Route>
      <Route path="/woningkrediet-simulator">
        {() => <Redirect to="/lenen/woningkrediet-simulator" />}
      </Route>
      <Route path="/persoonlijke-lening-berekenen">
        {() => <Redirect to="/lenen/persoonlijke-lening-berekenen" />}
      </Route>
      <Route path="/autolening-berekenen">
        {() => <Redirect to="/lenen/autolening-berekenen" />}
      </Route>
      <Route path="/lening-herfinancieren">
        {() => <Redirect to="/lenen/lening-herfinancieren" />}
      </Route>
      <Route path="/schuldenconsolidatie-calculator">
        {() => <Redirect to="/lenen/schuldenconsolidatie-calculator" />}
      </Route>
      <Route path="/kredietcapaciteit-calculator">
        {() => <Redirect to="/lenen/kredietcapaciteit-calculator" />}
      </Route>
      <Route path="/kredietvergelijker-belgie">
        {() => <Redirect to="/lenen/kredietvergelijker-belgie" />}
      </Route>
      <Route path="/doorlopend-krediet-calculator">
        {() => <Redirect to="/lenen/doorlopend-krediet-calculator" />}
      </Route>
      <Route path="/kredietkaart-calculator">
        {() => <Redirect to="/lenen/kredietkaart-calculator" />}
      </Route>
      <Route path="/leasingkrediet-calculator">
        {() => <Redirect to="/lenen/leasingkrediet-calculator" />}
      </Route>
      <Route path="/voorschot-calculator">
        {() => <Redirect to="/lenen/voorschot-calculator" />}
      </Route>
      <Route path="/studieschuld-calculator">
        {() => <Redirect to="/lenen/studieschuld-calculator" />}
      </Route>
      <Route path="/groepslening-calculator">
        {() => <Redirect to="/lenen/groepslening-calculator" />}
      </Route>
      <Route path="/wettelijke-rentevoet-belgie">
        {() => <Redirect to="/lenen/wettelijke-rentevoet-belgie" />}
      </Route>

      {/* Legacy Redirects - BELEGGEN Category */}
      <Route path="/beleggingsrente-calculator">
        {() => <Redirect to="/beleggen/beleggingsrente-calculator" />}
      </Route>
      <Route path="/aandelen-calculator">
        {() => <Redirect to="/beleggen/aandelen-calculator" />}
      </Route>
      <Route path="/etf-calculator">
        {() => <Redirect to="/beleggen/etf-calculator" />}
      </Route>
      <Route path="/obligatie-calculator">
        {() => <Redirect to="/beleggen/obligatie-calculator" />}
      </Route>
      <Route path="/cryptocurrency-calculator">
        {() => <Redirect to="/beleggen/cryptocurrency-calculator" />}
      </Route>
      <Route path="/dollar-cost-averaging-calculator">
        {() => <Redirect to="/beleggen/dollar-cost-averaging-calculator" />}
      </Route>
      <Route path="/portfolio-diversificatie-calculator">
        {() => <Redirect to="/beleggen/portfolio-diversificatie-calculator" />}
      </Route>
      <Route path="/reit-calculator">
        {() => <Redirect to="/beleggen/reit-calculator" />}
      </Route>
      <Route path="/belgische-beleggingsfiscaliteit-calculator">
        {() => <Redirect to="/beleggen/belgische-beleggingsfiscaliteit-calculator" />}
      </Route>
      <Route path="/roerende-voorheffing-calculator">
        {() => <Redirect to="/beleggen/roerende-voorheffing-calculator" />}
      </Route>

      {/* Legacy Redirects - PLANNING Category */}
      <Route path="/pensioensparen-calculator">
        {() => <Redirect to="/planning/pensioensparen-calculator" />}
      </Route>
      <Route path="/pensioen-calculator">
        {() => <Redirect to="/planning/pensioen-calculator" />}
      </Route>
      <Route path="/fire-calculator">
        {() => <Redirect to="/planning/fire-calculator" />}
      </Route>
      <Route path="/noodfonds-calculator">
        {() => <Redirect to="/planning/noodfonds-calculator" />}
      </Route>
      <Route path="/budget-planner">
        {() => <Redirect to="/planning/budget-planner" />}
      </Route>
      <Route path="/belastingplanning-calculator">
        {() => <Redirect to="/planning/belastingplanning-calculator" />}
      </Route>
      <Route path="/levensverzekeraar-calculator">
        {() => <Redirect to="/planning/levensverzekeraar-calculator" />}
      </Route>
      <Route path="/eindejaarsbonus-calculator">
        {() => <Redirect to="/planning/eindejaarsbonus-calculator" />}
      </Route>
      <Route path="/inflatie-calculator-belgie">
        {() => <Redirect to="/planning/inflatie-calculator-belgie" />}
      </Route>
      <Route path="/geldontwaarding-calculator">
        {() => <Redirect to="/planning/geldontwaarding-calculator" />}
      </Route>
      <Route path="/reele-rente-berekenen">
        {() => <Redirect to="/planning/reele-rente-berekenen" />}
      </Route>
      <Route path="/rentevoet-vergelijker">
        {() => <Redirect to="/planning/rentevoet-vergelijker" />}
      </Route>
      
      {/* 404 Not Found */}
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
