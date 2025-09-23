import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface InsuranceComparison {
  wholeLifeInsurance: {
    totalPremiums: number;
    cashValue: number;
    deathBenefit: number;
    netReturn: number;
    effectiveYield: number;
  };
  termInsuranceInvesting: {
    totalInvestment: number;
    investmentValue: number;
    insuranceCosts: number;
    deathBenefit: number;
    netReturn: number;
    effectiveYield: number;
  };
  scenarios: Array<{
    year: number;
    age: number;
    wholeLifeCashValue: number;
    wholeLifeDeathBenefit: number;
    termInvestmentValue: number;
    termDeathBenefit: number;
    termInsuranceCost: number;
  }>;
  recommendation: 'whole_life' | 'term_investing' | 'mixed';
  riskAnalysis: string[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function LevensverzekeraarCalculator() {
  // Personal data
  const [leeftijd, setLeeftijd] = useState<number>(35);
  const [geslacht, setGeslacht] = useState<string>("man");
  const [rookgedrag, setRookgedrag] = useState<string>("nee");
  const [gezondheid, setGezondheid] = useState<string>("goed");
  
  // Financial situation
  const [gewensteDekking, setGewensteDekking] = useState<number>(500000);
  const [maandelijkseBudget, setMaandelijkseBudget] = useState<number>(300);
  const [huidigeSpaarrekening, setHuidigeSpaarrekening] = useState<number>(25000);
  
  // Insurance options
  const [verzekeringsType, setVerzekeringsType] = useState<string>("hele_leven");
  const [dekking_looptijd, setDekkingLooptijd] = useState<number>(30);
  
  // Investment parameters
  const [verwachtRendement, setVerwachtRendement] = useState<number>(6.5);
  const [belastingPercentage, setBelastingPercentage] = useState<number>(30);
  const [inflatie, setInflatie] = useState<number>(2);
  
  const [result, setResult] = useState<InsuranceComparison | null>(null);

  const calculateInsuranceComparison = () => {
    const einddatum = leeftijd + dekking_looptijd;
    const maandelijksRendement = verwachtRendement / 100 / 12;
    const jaarlijksePremie = maandelijkseBudget * 12;
    
    // Whole Life Insurance berekening (Tak 21/23 Belgische producten)
    const wholeLifeEffectiveYield = verzekeringsType === "hele_leven" ? 2.5 : 1.8; // Conservatief voor Belgische producten
    const wholeLifeKosten = 0.15; // 15% kosten voor hele leven verzekering
    const nettoInvestering = jaarlijksePremie * (1 - wholeLifeKosten);
    
    // Term Life + Investing berekening
    const termPremiumPerYear = calculateTermPremium(leeftijd, geslacht, rookgedrag, gezondheid, gewensteDekking);
    const beschikbaarVoorBeleggen = jaarlijksePremie - termPremiumPerYear;
    
    let wholeLifeCashValue = huidigeSpaarrekening;
    let termInvestmentValue = huidigeSpaarrekening;
    let totalWholeLifePremiums = 0;
    let totalTermInsuranceCosts = 0;
    let totalInvestment = 0;
    
    const scenarios = [];
    
    for (let year = 0; year <= dekking_looptijd; year++) {
      const currentAge = leeftijd + year;
      
      if (year > 0) {
        // Whole Life verzekering groei
        wholeLifeCashValue = wholeLifeCashValue * (1 + wholeLifeEffectiveYield / 100) + nettoInvestering;
        totalWholeLifePremiums += jaarlijksePremie;
        
        // Term + Investing
        const currentTermPremium = termPremiumPerYear * Math.pow(1.05, year); // 5% jaarlijkse stijging term premie
        termInvestmentValue = termInvestmentValue * (1 + maandelijksRendement * 12) + beschikbaarVoorBeleggen;
        totalTermInsuranceCosts += currentTermPremium;
        totalInvestment += jaarlijksePremie;
      }
      
      const wholeLifeDeathBenefit = Math.max(gewensteDekking, wholeLifeCashValue * 1.1);
      const termDeathBenefit = gewensteDekking + termInvestmentValue;
      
      scenarios.push({
        year,
        age: currentAge,
        wholeLifeCashValue: wholeLifeCashValue,
        wholeLifeDeathBenefit: wholeLifeDeathBenefit,
        termInvestmentValue: termInvestmentValue,
        termDeathBenefit: termDeathBenefit,
        termInsuranceCost: year > 0 ? termPremiumPerYear * Math.pow(1.05, year) : 0
      });
    }
    
    // Final calculations
    const wholeLifeNetReturn = wholeLifeCashValue - totalWholeLifePremiums;
    const wholeLifeEffectiveYieldActual = totalWholeLifePremiums > 0 ? 
      (Math.pow(wholeLifeCashValue / totalWholeLifePremiums, 1/dekking_looptijd) - 1) * 100 : 0;
    
    const termNetReturn = termInvestmentValue - totalInvestment;
    const termEffectiveYield = totalInvestment > 0 ? 
      (Math.pow(termInvestmentValue / totalInvestment, 1/dekking_looptijd) - 1) * 100 : 0;
    
    // Risk analysis
    const riskAnalysis = [];
    if (termInvestmentValue > wholeLifeCashValue * 1.5) {
      riskAnalysis.push("Term + Beleggen toont veel hogere waardecreatie op lange termijn");
    }
    if (wholeLifeEffectiveYieldActual < inflatie) {
      riskAnalysis.push("Hele leven verzekering verliest koopkracht door inflatie");
    }
    if (beschikbaarVoorBeleggen < 100) {
      riskAnalysis.push("Budget is te beperkt voor effectief term + beleggen strategie");
    }
    if (leeftijd > 50) {
      riskAnalysis.push("Op hogere leeftijd worden term premies zeer duur");
    }
    
    // Recommendation logic
    let recommendation: 'whole_life' | 'term_investing' | 'mixed' = 'term_investing';
    if (wholeLifeCashValue > termInvestmentValue * 0.9 && leeftijd > 50) {
      recommendation = 'whole_life';
    } else if (Math.abs(wholeLifeCashValue - termInvestmentValue) < termInvestmentValue * 0.2) {
      recommendation = 'mixed';
    }
    
    setResult({
      wholeLifeInsurance: {
        totalPremiums: totalWholeLifePremiums,
        cashValue: wholeLifeCashValue,
        deathBenefit: Math.max(gewensteDekking, wholeLifeCashValue * 1.1),
        netReturn: wholeLifeNetReturn,
        effectiveYield: wholeLifeEffectiveYieldActual
      },
      termInsuranceInvesting: {
        totalInvestment: totalInvestment,
        investmentValue: termInvestmentValue,
        insuranceCosts: totalTermInsuranceCosts,
        deathBenefit: gewensteDekking + termInvestmentValue,
        netReturn: termNetReturn,
        effectiveYield: termEffectiveYield
      },
      scenarios,
      recommendation,
      riskAnalysis
    });
  };

  const calculateTermPremium = (age: number, gender: string, smoking: string, health: string, coverage: number): number => {
    let basePremium = coverage * 0.0008; // 0.08% van dekking als basis
    
    // Leeftijd factor
    const ageFactor = Math.pow(1.08, Math.max(0, age - 25));
    basePremium *= ageFactor;
    
    // Geslacht factor (mannen hogere premie)
    if (gender === "man") {
      basePremium *= 1.2;
    }
    
    // Roken factor
    if (smoking === "ja") {
      basePremium *= 2.5;
    }
    
    // Gezondheid factor
    switch (health) {
      case "uitstekend":
        basePremium *= 0.9;
        break;
      case "gemiddeld":
        basePremium *= 1.1;
        break;
      case "slecht":
        basePremium *= 1.5;
        break;
    }
    
    return Math.round(basePremium);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-BE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'whole_life': return 'text-blue-600';
      case 'term_investing': return 'text-green-600';
      case 'mixed': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'whole_life': return 'Hele Leven Verzekering';
      case 'term_investing': return 'Term + Beleggen';
      case 'mixed': return 'Gemixte Strategie';
      default: return 'Onbekend';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Tabs defaultValue="persoonlijk" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="persoonlijk" data-testid="tab-persoonlijk">Persoonlijke Gegevens</TabsTrigger>
          <TabsTrigger value="verzekering" data-testid="tab-verzekering">Verzekering Opties</TabsTrigger>
          <TabsTrigger value="vergelijking" data-testid="tab-vergelijking">Vergelijking</TabsTrigger>
          <TabsTrigger value="analyse" data-testid="tab-analyse">Risico Analyse</TabsTrigger>
        </TabsList>

        <TabsContent value="persoonlijk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-user mr-3 text-primary"></i>
                Persoonlijke Informatie
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="leeftijd">Huidige Leeftijd</Label>
                  <Input
                    id="leeftijd"
                    data-testid="input-leeftijd"
                    type="number"
                    value={leeftijd}
                    onChange={(e) => setLeeftijd(Number(e.target.value))}
                    min="18"
                    max="75"
                  />
                </div>
                
                <div>
                  <Label htmlFor="geslacht">Geslacht</Label>
                  <Select value={geslacht} onValueChange={setGeslacht}>
                    <SelectTrigger data-testid="select-geslacht">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="man">Man</SelectItem>
                      <SelectItem value="vrouw">Vrouw</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="rookgedrag">Rookt u?</Label>
                  <Select value={rookgedrag} onValueChange={setRookgedrag}>
                    <SelectTrigger data-testid="select-rookgedrag">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nee">Nee</SelectItem>
                      <SelectItem value="ja">Ja</SelectItem>
                      <SelectItem value="gestopt">Gestopt (&gt;2 jaar)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="gezondheid">Algemene Gezondheid</Label>
                  <Select value={gezondheid} onValueChange={setGezondheid}>
                    <SelectTrigger data-testid="select-gezondheid">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uitstekend">Uitstekend</SelectItem>
                      <SelectItem value="goed">Goed</SelectItem>
                      <SelectItem value="gemiddeld">Gemiddeld</SelectItem>
                      <SelectItem value="slecht">Slecht</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="gewenste-dekking">Gewenste Dekking (€)</Label>
                  <Input
                    id="gewenste-dekking"
                    data-testid="input-gewenste-dekking"
                    type="number"
                    value={gewensteDekking}
                    onChange={(e) => setGewensteDekking(Number(e.target.value))}
                    step="50000"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Aanbeveling: 10x jaarlijks inkomen</p>
                </div>
                
                <div>
                  <Label htmlFor="maandelijks-budget">Maandelijks Budget (€)</Label>
                  <Input
                    id="maandelijks-budget"
                    data-testid="input-maandelijks-budget"
                    type="number"
                    value={maandelijkseBudget}
                    onChange={(e) => setMaandelijkseBudget(Number(e.target.value))}
                    step="25"
                  />
                </div>
                
                <div>
                  <Label htmlFor="huidige-spaarrekening">Huidige Spaarrekening (€)</Label>
                  <Input
                    id="huidige-spaarrekening"
                    data-testid="input-huidige-spaarrekening"
                    type="number"
                    value={huidigeSpaarrekening}
                    onChange={(e) => setHuidigeSpaarrekening(Number(e.target.value))}
                    step="5000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dekking-looptijd">Dekking Looptijd (jaren)</Label>
                  <Input
                    id="dekking-looptijd"
                    data-testid="input-dekking-looptijd"
                    type="number"
                    value={dekking_looptijd}
                    onChange={(e) => setDekkingLooptijd(Number(e.target.value))}
                    min="10"
                    max="50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 dark:bg-blue-950">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-lg font-semibold">Geschatte Term Premie</div>
                <div className="text-3xl font-bold text-blue-600" data-testid="text-term-premie">
                  {formatCurrency(calculateTermPremium(leeftijd, geslacht, rookgedrag, gezondheid, gewensteDekking))}
                </div>
                <p className="text-sm text-muted-foreground">
                  per jaar voor {formatCurrency(gewensteDekking)} dekking
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verzekering" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-shield-alt mr-3 text-blue-600"></i>
                Verzekering Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="verzekerings-type">Type Verzekering</Label>
                    <Select value={verzekeringsType} onValueChange={setVerzekeringsType}>
                      <SelectTrigger data-testid="select-verzekerings-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hele_leven">Hele Leven (Tak 21)</SelectItem>
                        <SelectItem value="universeel_leven">Universeel Leven (Tak 23)</SelectItem>
                        <SelectItem value="term_leven">Term Leven</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="verwacht-rendement">Verwacht Beleggingsrendement (%)</Label>
                    <Input
                      id="verwacht-rendement"
                      data-testid="input-verwacht-rendement"
                      type="number"
                      value={verwachtRendement}
                      onChange={(e) => setVerwachtRendement(Number(e.target.value))}
                      step="0.5"
                      min="3"
                      max="12"
                    />
                    <p className="text-xs text-muted-foreground mt-1">ETF portfolio: 6-8%, obligaties: 3-4%</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="belasting-percentage">Belastingpercentage (%)</Label>
                    <Input
                      id="belasting-percentage"
                      data-testid="input-belasting-percentage"
                      type="number"
                      value={belastingPercentage}
                      onChange={(e) => setBelastingPercentage(Number(e.target.value))}
                      step="1"
                      min="0"
                      max="50"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-600">🇧🇪 Belgische Verzekeringen</h4>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <div className="font-medium text-blue-900 dark:text-blue-100">Tak 21</div>
                      <div className="text-blue-700 dark:text-blue-300">
                        Gegarandeerd rendement + winstdeling, lagere risico
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="font-medium text-green-900 dark:text-green-100">Tak 23</div>
                      <div className="text-green-700 dark:text-green-300">
                        Gekoppeld aan beleggingsfondsen, hoger potentieel rendement
                      </div>
                    </div>
                    
                    <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <div className="font-medium text-orange-900 dark:text-orange-100">Term Leven</div>
                      <div className="text-orange-700 dark:text-orange-300">
                        Pure risicoverzekering, geen spaarcomponent
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button 
              onClick={calculateInsuranceComparison} 
              size="lg" 
              className="px-12"
              data-testid="button-bereken-vergelijking"
            >
              <i className="fas fa-calculator mr-2"></i>
              Bereken Verzekering Vergelijking
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="vergelijking" className="space-y-6">
          {result && result.scenarios.length > 0 && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-600">
                      🛡️ Hele Leven Verzekering
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Totale Premies:</span>
                        <span className="font-semibold" data-testid="text-whole-premies">{formatCurrency(result.wholeLifeInsurance.totalPremiums)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Cash Waarde:</span>
                        <span className="font-semibold text-blue-600" data-testid="text-whole-cash">{formatCurrency(result.wholeLifeInsurance.cashValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Overlijdensuitkering:</span>
                        <span className="font-semibold">{formatCurrency(result.wholeLifeInsurance.deathBenefit)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-sm">Effectief Rendement:</span>
                        <span className={`font-semibold ${result.wholeLifeInsurance.effectiveYield >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {result.wholeLifeInsurance.effectiveYield.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600">
                      📈 Term + Beleggen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Totale Investering:</span>
                        <span className="font-semibold" data-testid="text-term-investering">{formatCurrency(result.termInsuranceInvesting.totalInvestment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Beleggingswaarde:</span>
                        <span className="font-semibold text-green-600" data-testid="text-term-waarde">{formatCurrency(result.termInsuranceInvesting.investmentValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Totale Dekking:</span>
                        <span className="font-semibold">{formatCurrency(result.termInsuranceInvesting.deathBenefit)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-sm">Effectief Rendement:</span>
                        <span className={`font-semibold ${result.termInsuranceInvesting.effectiveYield >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {result.termInsuranceInvesting.effectiveYield.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Waarde Ontwikkeling Over Tijd</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={result.scenarios}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`} />
                      <Tooltip formatter={(value, name) => [
                        formatCurrency(Number(value)),
                        name === 'wholeLifeCashValue' ? 'Hele Leven Cash Waarde' : 
                        name === 'termInvestmentValue' ? 'Term + Beleggen Waarde' :
                        name === 'wholeLifeDeathBenefit' ? 'Hele Leven Uitkering' : 'Term + Beleggen Uitkering'
                      ]} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="wholeLifeCashValue" 
                        stroke="#3b82f6" 
                        name="Hele Leven Cash Waarde"
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="termInvestmentValue" 
                        stroke="#10b981" 
                        name="Term + Beleggen Waarde"
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="wholeLifeDeathBenefit" 
                        stroke="#3b82f6" 
                        strokeDasharray="5 5"
                        name="Hele Leven Uitkering"
                        strokeWidth={1}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="termDeathBenefit" 
                        stroke="#10b981" 
                        strokeDasharray="5 5"
                        name="Term + Beleggen Uitkering"
                        strokeWidth={1}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-star mr-3 text-yellow-600"></i>
                    Aanbeveling: {getRecommendationText(result.recommendation)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Verschil na {dekking_looptijd} jaar:</h4>
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(Math.abs(result.termInsuranceInvesting.investmentValue - result.wholeLifeInsurance.cashValue))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {result.termInsuranceInvesting.investmentValue > result.wholeLifeInsurance.cashValue 
                          ? 'Term + Beleggen voordeel' 
                          : 'Hele Leven verzekering voordeel'}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Rendement Vergelijking:</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Hele Leven:</span>
                          <span className="font-semibold">{result.wholeLifeInsurance.effectiveYield.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Term + Beleggen:</span>
                          <span className="font-semibold">{result.termInsuranceInvesting.effectiveYield.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!result && (
            <Card>
              <CardContent className="py-12 text-center">
                <i className="fas fa-calculator text-4xl text-muted-foreground mb-4"></i>
                <p className="text-lg text-muted-foreground">
                  Klik op "Bereken Verzekering Vergelijking" om de resultaten te zien.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analyse" className="space-y-6">
          {result && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-exclamation-triangle mr-3 text-orange-600"></i>
                    Risico Analyse
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.riskAnalysis.map((risk, index) => (
                      <Alert key={index}>
                        <i className="fas fa-info-circle"></i>
                        <AlertDescription>{risk}</AlertDescription>
                      </Alert>
                    ))}
                    
                    {result.riskAnalysis.length === 0 && (
                      <Alert>
                        <i className="fas fa-check-circle"></i>
                        <AlertDescription>
                          Beide opties lijken geschikt voor uw situatie. Overweeg uw risicotolerantie en flexibiliteitsbehoeften.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Belgische Belasting Overwegingen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-blue-600">🏛️ Hele Leven Verzekering</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <i className="fas fa-plus text-green-600 mr-2 mt-1"></i>
                          <span>Uitkering is belastingvrij voor begunstigden</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-plus text-green-600 mr-2 mt-1"></i>
                          <span>Geen roerende voorheffing op groei</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-minus text-red-600 mr-2 mt-1"></i>
                          <span>Hoge beheerkosten (1-3% jaarlijks)</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-minus text-red-600 mr-2 mt-1"></i>
                          <span>Beperkte flexibiliteit en controle</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-green-600">📈 Term + Beleggen</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <i className="fas fa-plus text-green-600 mr-2 mt-1"></i>
                          <span>Hogere verwachte rendementen</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-plus text-green-600 mr-2 mt-1"></i>
                          <span>Volledige controle over investeringen</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-minus text-red-600 mr-2 mt-1"></i>
                          <span>30% roerende voorheffing op dividenden</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-minus text-red-600 mr-2 mt-1"></i>
                          <span>Term premies stijgen met leeftijd</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actieplan Aanbevelingen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.recommendation === 'term_investing' && (
                      <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                        <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                          ✅ Aanbeveling: Term Verzekering + Beleggen
                        </h4>
                        <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                          <li>• Neem een term levensverzekering voor {formatCurrency(gewensteDekking)}</li>
                          <li>• Beleg het verschil in een gediversifieerde ETF portfolio</li>
                          <li>• Herzie jaarlijks de term premie kosten</li>
                          <li>• Bouw een noodfonds op van 6 maanden uitgaven</li>
                        </ul>
                      </div>
                    )}
                    
                    {result.recommendation === 'whole_life' && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                          ✅ Aanbeveling: Hele Leven Verzekering
                        </h4>
                        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                          <li>• Kies voor een Tak 21 verzekering met gegarandeerd rendement</li>
                          <li>• Vergelijk verschillende aanbieders op kosten en voorwaarden</li>
                          <li>• Overweeg een premievrijstelling bij arbeidsongeschiktheid</li>
                          <li>• Herzie uw dekking elke 5 jaar</li>
                        </ul>
                      </div>
                    )}
                    
                    {result.recommendation === 'mixed' && (
                      <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                        <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                          ✅ Aanbeveling: Gemixte Strategie
                        </h4>
                        <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                          <li>• Verdeel uw budget over beide strategieën</li>
                          <li>• 60% term + beleggen, 40% hele leven verzekering</li>
                          <li>• Dit biedt balans tussen rendement en zekerheid</li>
                          <li>• Herbalanceer jaarlijks uw strategie</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!result && (
            <Card>
              <CardContent className="py-12 text-center">
                <i className="fas fa-chart-bar text-4xl text-muted-foreground mb-4"></i>
                <p className="text-lg text-muted-foreground">
                  Bereken eerst de verzekering vergelijking om de analyse te zien.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}