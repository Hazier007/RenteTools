import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Redirect from "@/components/Redirect";
import { usePageViewTracking } from "@/hooks/use-page-view-tracking";

// Eager: home and the 404 fallback. Home is the dominant entry point and
// must render without an extra network round-trip.
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

// Lazy: category hubs (own chunks per route) + heavy/rare routes. Calculators
// are already lazy inside DynamicCalculatorPage; admin pulls TipTap;
// blog-detail pulls marked + DOMPurify.
const SparenPage = lazy(() => import("@/pages/sparen"));
const LenenPage = lazy(() => import("@/pages/lenen"));
const BeleggenPage = lazy(() => import("@/pages/beleggen"));
const PlanningPage = lazy(() => import("@/pages/planning"));
const OverigePage = lazy(() => import("@/pages/overige"));
const DynamicCalculatorPage = lazy(() => import("@/pages/DynamicCalculatorPage"));
const NieuwsPage = lazy(() => import("@/pages/nieuws"));
const BlogPage = lazy(() => import("@/pages/blog"));
const BlogDetailPage = lazy(() => import("@/pages/blog-detail"));
const AdminPage = lazy(() => import("@/pages/admin"));
const BlogAutomationPage = lazy(() => import("@/pages/admin/blog-automation"));
const OverOns = lazy(() => import("@/pages/over-ons"));
const Privacybeleid = lazy(() => import("@/pages/privacybeleid"));
const Voorwaarden = lazy(() => import("@/pages/voorwaarden"));
const Sitemap = lazy(() => import("@/pages/sitemap"));

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
    </div>
  );
}

function Router() {
  usePageViewTracking();
  return (
    <Suspense fallback={<RouteFallback />}>
      <Switch>
        <Route path="/" component={Home} />
      
      {/* Nieuws Page */}
      <Route path="/nieuws" component={NieuwsPage} />
      
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
      <Route path="/contact" component={OverOns} />
      <Route path="/privacy">
        {() => <Redirect to="/privacybeleid" />}
      </Route>
      <Route path="/privacybeleid" component={Privacybeleid} />
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
    </Suspense>
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
