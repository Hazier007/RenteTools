import { lazy, ComponentType } from 'react';

const HoogsteSpaarrenteBelgie = lazy(() => import('@/pages/hoogste-spaarrente-belgie'));
const SamengesteldeInterestBerekenen = lazy(() => import('@/pages/samengestelde-interest-berekenen'));
const DepositoCalculator = lazy(() => import('@/pages/deposito-calculator'));
const DoelspaarcalculatorPage = lazy(() => import('@/pages/doelspaarcalculator'));
const SpaarrekeningVergelijkerPage = lazy(() => import('@/pages/spaarrekening-vergelijker'));
const KinderrekeningCalculatorPage = lazy(() => import('@/pages/kinderrekening-calculator'));
const NoodfondsCalculatorPage = lazy(() => import('@/pages/noodfonds-calculator'));
const VakantiegeldSparenCalculatorPage = lazy(() => import('@/pages/vakantiegeld-sparen-calculator'));
const GroepssparenCalculatorPage = lazy(() => import('@/pages/groepssparen-calculator'));
const EindejaarsbonosCalculatorPage = lazy(() => import('@/pages/eindejaarsbonus-calculator'));
const LoyaltyBonusCalculatorPage = lazy(() => import('@/pages/loyalty-bonus-calculator'));
const TermijnrekeningCalculatorPage = lazy(() => import('@/pages/termijnrekening-calculator'));

const HypothecaireLningBerekenen = lazy(() => import('@/pages/hypothecaire-lening-berekenen'));
const AutoleningBerekenen = lazy(() => import('@/pages/autolening-berekenen'));
const PersoonlijkeLeningBerekenen = lazy(() => import('@/pages/persoonlijke-lening-berekenen'));
const KredietvergelijkerBelgie = lazy(() => import('@/pages/kredietvergelijker-belgie'));
const LeningHerfinancieren = lazy(() => import('@/pages/lening-herfinancieren'));
const WoningkredietSimulatorPage = lazy(() => import('@/pages/woningkrediet-simulator'));
const DoorlopendKredietCalculatorPage = lazy(() => import('@/pages/doorlopend-krediet-calculator'));
const LeasingkredietCalculatorPage = lazy(() => import('@/pages/leasingkrediet-calculator'));
const KredietcapaciteitCalculatorPage = lazy(() => import('@/pages/kredietcapaciteit-calculator'));
const SchuldenconsolidatieCalculatorPage = lazy(() => import('@/pages/schuldenconsolidatie-calculator'));
const GroepsleningCalculatorPage = lazy(() => import('@/pages/groepslening-calculator'));
const RentevoetVergelijkerPage = lazy(() => import('@/pages/rentevoet-vergelijker'));
const VoorschotCalculatorPage = lazy(() => import('@/pages/voorschot-calculator'));
const StudieschuldCalculatorPage = lazy(() => import('@/pages/studieschuld-calculator'));
const KredietkaartCalculatorPage = lazy(() => import('@/pages/kredietkaart-calculator'));

const BeleggingsrenteCalculatorPage = lazy(() => import('@/pages/beleggingsrente-calculator'));
const KasbonCalculatorPage = lazy(() => import('@/pages/kasbon-calculator'));
const ETFCalculatorPage = lazy(() => import('@/pages/etf-calculator'));
const AandelenCalculatorPage = lazy(() => import('@/pages/aandelen-calculator'));
const ObligatieCalculatorPage = lazy(() => import('@/pages/obligatie-calculator'));
const PortfolioDiversificatieCalculatorPage = lazy(() => import('@/pages/portfolio-diversificatie-calculator'));
const DollarCostAveragingCalculatorPage = lazy(() => import('@/pages/dollar-cost-averaging-calculator'));
const REITCalculatorPage = lazy(() => import('@/pages/reit-calculator'));
const CryptocurrencyCalculatorPage = lazy(() => import('@/pages/cryptocurrency-calculator'));
const BelgischeBeleggingsfiscaliteitCalculatorPage = lazy(() => import('@/pages/belgische-beleggingsfiscaliteit-calculator'));

const PensioenCalculatorPage = lazy(() => import('@/pages/pensioen-calculator'));
const PensioenspaarCalculatorPage = lazy(() => import('@/pages/pensioensparen-calculator'));
const BudgetPlannerPage = lazy(() => import('@/pages/budget-planner'));
const FIRECalculatorPage = lazy(() => import('@/pages/fire-calculator'));
const LevensverzekeraarCalculatorPage = lazy(() => import('@/pages/levensverzekeraar-calculator'));
const BelastingplanningCalculatorPage = lazy(() => import('@/pages/belastingplanning-calculator'));

const InflatieCalculatorBelgie = lazy(() => import('@/pages/inflatie-calculator-belgie'));
const WettelijkeRentevoetBelgie = lazy(() => import('@/pages/wettelijke-rentevoet-belgie'));
const RoerendeVoorheffingCalculator = lazy(() => import('@/pages/roerende-voorheffing-calculator'));
const ReeleRenteBerekenen = lazy(() => import('@/pages/reele-rente-berekenen'));
const GeldontwaardigCalculator = lazy(() => import('@/pages/geldontwaarding-calculator'));

export const calculatorComponentRegistry: Record<string, ComponentType<any>> = {
  "hoogste-spaarrente-belgie": HoogsteSpaarrenteBelgie,
  "samengestelde-interest-berekenen": SamengesteldeInterestBerekenen,
  "deposito-calculator": DepositoCalculator,
  "doelspaarcalculator": DoelspaarcalculatorPage,
  "spaarrekening-vergelijker": SpaarrekeningVergelijkerPage,
  "kinderrekening-calculator": KinderrekeningCalculatorPage,
  "noodfonds-calculator": NoodfondsCalculatorPage,
  "vakantiegeld-sparen-calculator": VakantiegeldSparenCalculatorPage,
  "groepssparen-calculator": GroepssparenCalculatorPage,
  "eindejaarsbonus-calculator": EindejaarsbonosCalculatorPage,
  "loyalty-bonus-calculator": LoyaltyBonusCalculatorPage,
  "termijnrekening-calculator": TermijnrekeningCalculatorPage,
  
  "hypothecaire-lening-berekenen": HypothecaireLningBerekenen,
  "autolening-berekenen": AutoleningBerekenen,
  "persoonlijke-lening-berekenen": PersoonlijkeLeningBerekenen,
  "kredietvergelijker-belgie": KredietvergelijkerBelgie,
  "lening-herfinancieren": LeningHerfinancieren,
  "woningkrediet-simulator": WoningkredietSimulatorPage,
  "doorlopend-krediet-calculator": DoorlopendKredietCalculatorPage,
  "leasingkrediet-calculator": LeasingkredietCalculatorPage,
  "kredietcapaciteit-calculator": KredietcapaciteitCalculatorPage,
  "schuldenconsolidatie-calculator": SchuldenconsolidatieCalculatorPage,
  "groepslening-calculator": GroepsleningCalculatorPage,
  "rentevoet-vergelijker": RentevoetVergelijkerPage,
  "voorschot-calculator": VoorschotCalculatorPage,
  "studieschuld-calculator": StudieschuldCalculatorPage,
  "kredietkaart-calculator": KredietkaartCalculatorPage,
  
  "beleggingsrente-calculator": BeleggingsrenteCalculatorPage,
  "kasbon-calculator": KasbonCalculatorPage,
  "etf-calculator": ETFCalculatorPage,
  "aandelen-calculator": AandelenCalculatorPage,
  "obligatie-calculator": ObligatieCalculatorPage,
  "portfolio-diversificatie-calculator": PortfolioDiversificatieCalculatorPage,
  "dollar-cost-averaging-calculator": DollarCostAveragingCalculatorPage,
  "reit-calculator": REITCalculatorPage,
  "cryptocurrency-calculator": CryptocurrencyCalculatorPage,
  "belgische-beleggingsfiscaliteit-calculator": BelgischeBeleggingsfiscaliteitCalculatorPage,
  
  "pensioen-calculator": PensioenCalculatorPage,
  "pensioensparen-calculator": PensioenspaarCalculatorPage,
  "budget-planner": BudgetPlannerPage,
  "fire-calculator": FIRECalculatorPage,
  "levensverzekeraar-calculator": LevensverzekeraarCalculatorPage,
  "belastingplanning-calculator": BelastingplanningCalculatorPage,
  
  "inflatie-calculator-belgie": InflatieCalculatorBelgie,
  "wettelijke-rentevoet-belgie": WettelijkeRentevoetBelgie,
  "roerende-voorheffing-calculator": RoerendeVoorheffingCalculator,
  "reele-rente-berekenen": ReeleRenteBerekenen,
  "geldontwaarding-calculator": GeldontwaardigCalculator,
};

export function getCalculatorComponent(slug: string): ComponentType<any> | null {
  return calculatorComponentRegistry[slug] || null;
}
