import { useState, lazy, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartSkeleton } from "@/components/ui/chart-skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FireChart = lazy(() => import("./fire-chart"));

interface FIREResult {
  fireNumber: number;
  currentNetWorth: number;
  monthlyNeeded: number;
  yearsToFIRE: number;
  fireAge: number;
  currentProgress: number;
  withdrawalRate: number;
  fireType: 'Lean' | 'Regular' | 'Fat' | 'Coast';
  scenarios: Array<{
    year: number;
    age: number;
    netWorth: number;
    annualIncome: number;
    fireProgress: number;
  }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function FIRECalculator() {
  // Personal data
  const [huidigeLeeftijd, setHuidigeLeeftijd] = useState<number>(30);
  const [jaarlijkseUitgaven, setJaarlijkseUitgaven] = useState<number>(35000);
  const [gewensteUitgaven, setGewensteUitgaven] = useState<number>(35000);
  const [huidigVermogen, setHuidigVermogen] = useState<number>(50000);
  
  // Income & Savings
  const [jaarlijksInkomen, setJaarlijksInkomen] = useState<number>(50000);
  const [maandelijkseInleg, setMaandelijkseInleg] = useState<number>(1500);
  const [jaarlijkseVerhoging, setJaarlijkseVerhoging] = useState<number>(3);
  
  // Investment parameters
  const [verwachtRendement, setVerwachtRendement] = useState<number>(7);
  const [inflatie, setInflatie] = useState<number>(2);
  const [opnamepercentage, setOpnamepercentage] = useState<number>(4);
  
  // FIRE Strategy
  const [fireStrategy, setFireStrategy] = useState<string>("regular");
  const [belastingPercentage, setBelastingPercentage] = useState<number>(25);
  
  const [result, setResult] = useState<FIREResult | null>(null);

  const calculateFIRE = () => {
    const realRendement = verwachtRendement - inflatie;
    const spaarpercentage = (maandelijkseInleg * 12) / jaarlijksInkomen * 100;
    
    // Determine FIRE multiplier based on withdrawal rate
    const fireMultiplier = 100 / opnamepercentage; // 4% = 25x, 3.5% = 28.57x
    
    // Calculate FIRE number based on strategy
    let targetExpenses = gewensteUitgaven;
    let fireType: 'Lean' | 'Regular' | 'Fat' | 'Coast' = 'Regular';
    
    switch (fireStrategy) {
      case 'lean':
        targetExpenses = gewensteUitgaven * 0.75; // 75% of current expenses
        fireType = 'Lean';
        break;
      case 'fat':
        targetExpenses = gewensteUitgaven * 1.5; // 150% of current expenses
        fireType = 'Fat';
        break;
      case 'coast':
        targetExpenses = gewensteUitgaven * 0.6; // 60% coast until pension
        fireType = 'Coast';
        break;
      default:
        fireType = 'Regular';
    }
    
    const fireNumber = targetExpenses * fireMultiplier;
    const amountNeeded = fireNumber - huidigVermogen;
    const currentProgress = (huidigVermogen / fireNumber) * 100;
    
    // Calculate time to FIRE using compound interest formula
    // FV = PV(1+r)^n + PMT[((1+r)^n - 1)/r]
    // Solve for n when FV = fireNumber
    const monthlyRate = verwachtRendement / 100 / 12;
    const monthlyPayment = maandelijkseInleg;
    
    let yearsToFIRE = 0;
    if (amountNeeded > 0) {
      // Use iterative approach to find years to FIRE
      let currentValue = huidigVermogen;
      let monthlyInvestment = monthlyPayment;
      let year = 0;
      
      while (currentValue < fireNumber && year < 50) {
        year++;
        const annualIncrease = Math.pow(1 + jaarlijkseVerhoging/100, year - 1);
        monthlyInvestment = monthlyPayment * annualIncrease;
        
        for (let month = 1; month <= 12; month++) {
          currentValue = currentValue * (1 + monthlyRate) + monthlyInvestment;
        }
      }
      yearsToFIRE = year;
    }
    
    const fireAge = huidigeLeeftijd + yearsToFIRE;
    const monthlyNeeded = amountNeeded / (yearsToFIRE * 12);
    
    // Generate scenarios for visualization
    const scenarios = [];
    let projectedValue = huidigVermogen;
    let currentMonthlyInvestment = maandelijkseInleg;
    
    for (let year = 0; year <= Math.min(yearsToFIRE + 5, 40); year++) {
      if (year > 0) {
        const annualIncrease = Math.pow(1 + jaarlijkseVerhoging/100, year - 1);
        currentMonthlyInvestment = maandelijkseInleg * annualIncrease;
        
        for (let month = 1; month <= 12; month++) {
          projectedValue = projectedValue * (1 + monthlyRate) + currentMonthlyInvestment;
        }
      }
      
      const annualIncome = projectedValue * (opnamepercentage / 100);
      const fireProgress = (projectedValue / fireNumber) * 100;
      
      scenarios.push({
        year,
        age: huidigeLeeftijd + year,
        netWorth: projectedValue,
        annualIncome,
        fireProgress: Math.min(fireProgress, 100)
      });
    }
    
    setResult({
      fireNumber,
      currentNetWorth: huidigVermogen,
      monthlyNeeded: Math.max(0, monthlyNeeded),
      yearsToFIRE: Math.max(0, yearsToFIRE),
      fireAge,
      currentProgress,
      withdrawalRate: opnamepercentage,
      fireType,
      scenarios
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-BE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getFireStrategyColor = (strategy: string) => {
    switch (strategy) {
      case 'lean': return 'text-green-600';
      case 'regular': return 'text-blue-600';
      case 'fat': return 'text-purple-600';
      case 'coast': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getFireProgressColor = (progress: number) => {
    if (progress >= 100) return 'text-green-600';
    if (progress >= 75) return 'text-blue-600';
    if (progress >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const spaarpercentage = (maandelijkseInleg * 12) / jaarlijksInkomen * 100;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Tabs defaultValue="basis" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basis" data-testid="tab-basis">Basis Gegevens</TabsTrigger>
          <TabsTrigger value="strategie" data-testid="tab-strategie">FIRE Strategie</TabsTrigger>
          <TabsTrigger value="projectie" data-testid="tab-projectie">Projecties</TabsTrigger>
          <TabsTrigger value="analyse" data-testid="tab-analyse">FIRE Analyse</TabsTrigger>
        </TabsList>

        <TabsContent value="basis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-user mr-3 text-primary"></i>
                Persoonlijke Situatie
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="huidige-leeftijd">Huidige Leeftijd</Label>
                  <Input
                    id="huidige-leeftijd"
                    data-testid="input-huidige-leeftijd"
                    type="number"
                    value={huidigeLeeftijd}
                    onChange={(e) => setHuidigeLeeftijd(Number(e.target.value))}
                    min="18"
                    max="65"
                  />
                </div>
                
                <div>
                  <Label htmlFor="jaarlijkse-uitgaven">Huidige Jaarlijkse Uitgaven (€)</Label>
                  <Input
                    id="jaarlijkse-uitgaven"
                    data-testid="input-jaarlijkse-uitgaven"
                    type="number"
                    value={jaarlijkseUitgaven}
                    onChange={(e) => setJaarlijkseUitgaven(Number(e.target.value))}
                    step="1000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="gewenste-uitgaven">Gewenste Jaarlijkse Uitgaven in FIRE (€)</Label>
                  <Input
                    id="gewenste-uitgaven"
                    data-testid="input-gewenste-uitgaven"
                    type="number"
                    value={gewensteUitgaven}
                    onChange={(e) => setGewensteUitgaven(Number(e.target.value))}
                    step="1000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="huidig-vermogen">Huidig Net Vermogen (€)</Label>
                  <Input
                    id="huidig-vermogen"
                    data-testid="input-huidig-vermogen"
                    type="number"
                    value={huidigVermogen}
                    onChange={(e) => setHuidigVermogen(Number(e.target.value))}
                    step="5000"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="jaarlijks-inkomen">Jaarlijks Bruto Inkomen (€)</Label>
                  <Input
                    id="jaarlijks-inkomen"
                    data-testid="input-jaarlijks-inkomen"
                    type="number"
                    value={jaarlijksInkomen}
                    onChange={(e) => setJaarlijksInkomen(Number(e.target.value))}
                    step="1000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="maandelijkse-inleg">Maandelijkse Investering (€)</Label>
                  <Input
                    id="maandelijkse-inleg"
                    data-testid="input-maandelijkse-inleg"
                    type="number"
                    value={maandelijkseInleg}
                    onChange={(e) => setMaandelijkseInleg(Number(e.target.value))}
                    step="100"
                  />
                </div>
                
                <div>
                  <Label htmlFor="jaarlijkse-verhoging">Jaarlijkse Inkomensverhoging (%)</Label>
                  <Input
                    id="jaarlijkse-verhoging"
                    data-testid="input-jaarlijkse-verhoging"
                    type="number"
                    value={jaarlijkseVerhoging}
                    onChange={(e) => setJaarlijkseVerhoging(Number(e.target.value))}
                    step="0.5"
                    min="0"
                    max="10"
                  />
                </div>
                
                <div>
                  <Label htmlFor="belasting-percentage">Belastingpercentage in FIRE (%)</Label>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-chart-line mr-3 text-green-600"></i>
                Investering Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="verwacht-rendement">Verwacht Jaarlijks Rendement (%)</Label>
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
                <p className="text-xs text-muted-foreground mt-1">Aandelen: 7-8%, Obligaties: 3-4%</p>
              </div>
              
              <div>
                <Label htmlFor="inflatie">Verwachte Inflatie (%)</Label>
                <Input
                  id="inflatie"
                  data-testid="input-inflatie"
                  type="number"
                  value={inflatie}
                  onChange={(e) => setInflatie(Number(e.target.value))}
                  step="0.1"
                  min="0"
                  max="5"
                />
              </div>
              
              <div>
                <Label htmlFor="opname-percentage">Veilige Opname Percentage (%)</Label>
                <Input
                  id="opname-percentage"
                  data-testid="input-opname-percentage"
                  type="number"
                  value={opnamepercentage}
                  onChange={(e) => setOpnamepercentage(Number(e.target.value))}
                  step="0.1"
                  min="2.5"
                  max="5"
                />
                <p className="text-xs text-muted-foreground mt-1">4% regel: 25x jaarlijkse uitgaven</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 dark:bg-blue-950">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-lg font-semibold">Huidige Spaarpercentage</div>
                <div className="text-3xl font-bold text-blue-600" data-testid="text-spaarpercentage">
                  {spaarpercentage.toFixed(1)}%
                </div>
                <p className="text-sm text-muted-foreground">
                  van uw bruto inkomen • FIRE doel: 50%+
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategie" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-fire mr-3 text-orange-600"></i>
                FIRE Strategie Keuze
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="fire-strategy">FIRE Type</Label>
                <Select value={fireStrategy} onValueChange={setFireStrategy}>
                  <SelectTrigger data-testid="select-fire-strategy">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lean">Lean FIRE (75% uitgaven)</SelectItem>
                    <SelectItem value="regular">Regular FIRE (100% uitgaven)</SelectItem>
                    <SelectItem value="fat">Fat FIRE (150% uitgaven)</SelectItem>
                    <SelectItem value="coast">Coast FIRE (60% tot pensioen)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-600">🔥 FIRE Strategieën</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="font-medium text-green-900 dark:text-green-100">Lean FIRE</div>
                      <div className="text-sm text-green-700 dark:text-green-300">
                        Minimale uitgaven, vroeg met pensioen met basis levensstijl
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <div className="font-medium text-blue-900 dark:text-blue-100">Regular FIRE</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        Huidige levensstijl behouden in financiële onafhankelijkheid
                      </div>
                    </div>
                    
                    <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <div className="font-medium text-purple-900 dark:text-purple-100">Fat FIRE</div>
                      <div className="text-sm text-purple-700 dark:text-purple-300">
                        Luxe levensstijl met hogere uitgaven mogelijk
                      </div>
                    </div>
                    
                    <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <div className="font-medium text-orange-900 dark:text-orange-100">Coast FIRE</div>
                      <div className="text-sm text-orange-700 dark:text-orange-300">
                        Genoeg gespaard om op normale pensioenleeftijd FIRE te zijn
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-600">🇧🇪 Belgische Overwegingen</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <i className="fas fa-landmark text-blue-600 mr-2 mt-1"></i>
                      <span><strong>Wettelijk Pensioen:</strong> Integreer in uw FIRE planning vanaf 65 jaar</span>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-percentage text-blue-600 mr-2 mt-1"></i>
                      <span><strong>Roerende Voorheffing:</strong> 30% op dividenden en interest</span>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-shield-alt text-blue-600 mr-2 mt-1"></i>
                      <span><strong>Ziekteverzekering:</strong> Behoud via partner of zelfstandig</span>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-home text-blue-600 mr-2 mt-1"></i>
                      <span><strong>Eigen Woning:</strong> Vermindert FIRE vereisten aanzienlijk</span>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-chart-line text-blue-600 mr-2 mt-1"></i>
                      <span><strong>ETFs:</strong> Belastingefficiënt beleggen voor lange termijn</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button 
              onClick={calculateFIRE} 
              size="lg" 
              className="px-12"
              data-testid="button-bereken-fire"
            >
              <i className="fas fa-fire mr-2"></i>
              Bereken Mijn FIRE Plan
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="projectie" className="space-y-6">
          {result && result.scenarios.length > 0 && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>FIRE Progressie Projectie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ height: 400 }}>
                    <Suspense fallback={<ChartSkeleton />}>
                      <FireChart data={result.scenarios} />
                    </Suspense>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>FIRE Mijlpalen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[25, 50, 75, 90, 100].map(percentage => {
                      const milestone = result.scenarios.find(s => s.fireProgress >= percentage);
                      return milestone ? (
                        <div key={percentage} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <div className="flex items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                              percentage === 100 ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                            }`}>
                              {percentage}%
                            </div>
                            <div>
                              <div className="font-medium">
                                {percentage === 100 ? '🔥 FIRE Bereikt!' : `${percentage}% naar FIRE`}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Leeftijd: {milestone.age} jaar
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{formatCurrency(milestone.netWorth)}</div>
                            <div className="text-sm text-muted-foreground">
                              {formatCurrency(milestone.annualIncome)}/jaar
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!result && (
            <Card>
              <CardContent className="py-12 text-center">
                <i className="fas fa-fire text-4xl text-muted-foreground mb-4"></i>
                <p className="text-lg text-muted-foreground">
                  Klik op "Bereken Mijn FIRE Plan" om uw projecties te zien.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analyse" className="space-y-6">
          {result && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600" data-testid="text-fire-number">
                        {formatCurrency(result.fireNumber)}
                      </div>
                      <p className="text-muted-foreground">FIRE Nummer</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600" data-testid="text-jaren-fire">
                        {result.yearsToFIRE.toFixed(1)}
                      </div>
                      <p className="text-muted-foreground">Jaren tot FIRE</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600" data-testid="text-fire-leeftijd">
                        {result.fireAge.toFixed(0)}
                      </div>
                      <p className="text-muted-foreground">FIRE Leeftijd</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getFireProgressColor(result.currentProgress)}`} data-testid="text-voortgang">
                        {result.currentProgress.toFixed(1)}%
                      </div>
                      <p className="text-muted-foreground">Huidige Voortgang</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>FIRE Strategie: {result.fireType} FIRE</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>FIRE Voortgang:</span>
                      <span className="font-semibold">{result.currentProgress.toFixed(1)}%</span>
                    </div>
                    <Progress value={Math.min(result.currentProgress, 100)} className="h-3" />
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold">Financiële Overzicht</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Huidig Vermogen:</span>
                            <span className="font-medium">{formatCurrency(result.currentNetWorth)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>FIRE Nummer:</span>
                            <span className="font-medium">{formatCurrency(result.fireNumber)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Nog Nodig:</span>
                            <span className="font-medium">
                              {formatCurrency(Math.max(0, result.fireNumber - result.currentNetWorth))}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Opname Percentage:</span>
                            <span className="font-medium">{result.withdrawalRate}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold">FIRE Inkomen</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Jaarlijks FIRE Inkomen:</span>
                            <span className="font-medium">
                              {formatCurrency(result.fireNumber * (result.withdrawalRate / 100))}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Maandelijks FIRE Inkomen:</span>
                            <span className="font-medium">
                              {formatCurrency(result.fireNumber * (result.withdrawalRate / 100) / 12)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Na Belasting (75%):</span>
                            <span className="font-medium">
                              {formatCurrency(result.fireNumber * (result.withdrawalRate / 100) * 0.75 / 12)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {result.yearsToFIRE > 30 && (
                <Alert>
                  <i className="fas fa-clock"></i>
                  <AlertDescription>
                    <strong>Lange FIRE Tijd:</strong> Overweeg uw spaarpercentage te verhogen of uitgaven te verlagen om FIRE eerder te bereiken.
                  </AlertDescription>
                </Alert>
              )}

              {spaarpercentage < 20 && (
                <Alert>
                  <i className="fas fa-exclamation-triangle"></i>
                  <AlertDescription>
                    <strong>Laag Spaarpercentage:</strong> Voor FIRE is een spaarpercentage van 50%+ aanbevolen. 
                    Verhoog uw maandelijkse investeringen voor snellere vooruitgang.
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}

          {!result && (
            <Card>
              <CardContent className="py-12 text-center">
                <i className="fas fa-chart-line text-4xl text-muted-foreground mb-4"></i>
                <p className="text-lg text-muted-foreground">
                  Bereken eerst uw FIRE plan om de analyse te zien.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}