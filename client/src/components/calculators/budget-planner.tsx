import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BudgetCategory {
  name: string;
  planned: number;
  actual: number;
  type: 'income' | 'fixed' | 'variable' | 'savings' | 'debt';
}

interface BudgetAnalysis {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  totalDebt: number;
  netIncome: number;
  savingsRate: number;
  debtToIncomeRatio: number;
  recommendedEmergencyFund: number;
  budgetHealth: 'excellent' | 'good' | 'warning' | 'poor';
  recommendations: string[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

export default function BudgetPlanner() {
  // Income categories
  const [brutoSalaris, setBrutoSalaris] = useState<number>(3500);
  const [nettoSalaris, setNettoSalaris] = useState<number>(2500);
  const [vakantiegeld, setVakantiegeld] = useState<number>(1000);
  const [eindejaarsbonus, setEindejaarsbonus] = useState<number>(1500);
  const [kindergeld, setKindergeld] = useState<number>(300);
  const [bijverdiensten, setBijverdiensten] = useState<number>(0);
  
  // Fixed expenses
  const [huurHypotheek, setHuurHypotheek] = useState<number>(1200);
  const [nutsvoorzieningen, setNutsvoorzieningen] = useState<number>(250);
  const [verzekeringen, setVerzekeringen] = useState<number>(180);
  const [telecommunicatie, setTelecommunicatie] = useState<number>(80);
  const [abonnementen, setAbonnementen] = useState<number>(120);
  const [autoKosten, setAutoKosten] = useState<number>(300);
  
  // Variable expenses  
  const [voeding, setVoeding] = useState<number>(600);
  const [kleding, setKleding] = useState<number>(150);
  const [vervoer, setVervoer] = useState<number>(120);
  const [entertainment, setEntertainment] = useState<number>(200);
  const [zorgkosten, setZorgkosten] = useState<number>(100);
  const [overig, setOverig] = useState<number>(200);
  
  // Savings & Debt
  const [spaarrekening, setSpaarrekening] = useState<number>(200);
  const [pensioensparen, setPensioensparen] = useState<number>(109); // €1310/year = €109/month
  const [beleggingen, setBeleggingen] = useState<number>(300);
  const [noodfonds, setNoodfonds] = useState<number>(100);
  const [studielening, setStudielening] = useState<number>(0);
  const [kredietkaart, setKredietkaart] = useState<number>(0);
  const [persoonlijkKrediet, setPersoonlijkKrediet] = useState<number>(0);
  
  // Family data
  const [gezinsgrootte, setGezinsgrootte] = useState<number>(2);
  const [aantalKinderen, setAantalKinderen] = useState<number>(0);
  const [woonsituatie, setWoonsituatie] = useState<string>("huur");
  const [inkomenType, setInkomenType] = useState<string>("werknemer");
  
  const [analysis, setAnalysis] = useState<BudgetAnalysis | null>(null);

  const calculateBudget = () => {
    // Calculate total income (yearly basis then to monthly)
    const maandelijkInkomen = nettoSalaris;
    const jaarlijksExtra = vakantiegeld + eindejaarsbonus;
    const maandelijksExtra = jaarlijksExtra / 12;
    const totalIncome = maandelijkInkomen + maandelijksExtra + kindergeld + bijverdiensten;
    
    // Calculate expenses
    const fixedExpenses = huurHypotheek + nutsvoorzieningen + verzekeringen + 
                         telecommunicatie + abonnementen + autoKosten;
    const variableExpenses = voeding + kleding + vervoer + entertainment + zorgkosten + overig;
    const totalExpenses = fixedExpenses + variableExpenses;
    
    // Calculate savings and debt
    const totalSavings = spaarrekening + pensioensparen + beleggingen + noodfonds;
    const totalDebt = studielening + kredietkaart + persoonlijkKrediet;
    
    const netIncome = totalIncome - totalExpenses - totalDebt;
    const savingsRate = (totalSavings / totalIncome) * 100;
    const debtToIncomeRatio = (totalDebt / totalIncome) * 100;
    const recommendedEmergencyFund = totalExpenses * 6; // 6 months of expenses
    
    // Determine budget health
    let budgetHealth: 'excellent' | 'good' | 'warning' | 'poor' = 'excellent';
    if (netIncome < 0 || savingsRate < 10) budgetHealth = 'poor';
    else if (savingsRate < 15 || debtToIncomeRatio > 30) budgetHealth = 'warning';
    else if (savingsRate < 20 || debtToIncomeRatio > 15) budgetHealth = 'good';
    
    // Generate recommendations
    const recommendations: string[] = [];
    if (savingsRate < 10) recommendations.push("Verhoog uw spaarpercentage naar minimaal 10% van uw inkomen");
    if (savingsRate < 20) recommendations.push("Streef naar een spaarpercentage van 20% voor een comfortabele toekomst");
    if (debtToIncomeRatio > 30) recommendations.push("Uw schuldratio is te hoog - focus op schuldenafbouw");
    if (netIncome < 0) recommendations.push("Uw uitgaven zijn hoger dan uw inkomen - herzie uw budget");
    if (noodfonds * 12 < recommendedEmergencyFund) recommendations.push("Bouw een noodfonds op van 6 maanden uitgaven");
    if (voeding > totalIncome * 0.15) recommendations.push("Uw voedingskosten zijn hoog - zoek naar besparingsmogelijkheden");
    if (huurHypotheek > totalIncome * 0.33) recommendations.push("Uw woonkosten zijn hoog (>33% van inkomen)");
    
    setAnalysis({
      totalIncome,
      totalExpenses,
      totalSavings,
      totalDebt,
      netIncome,
      savingsRate,
      debtToIncomeRatio,
      recommendedEmergencyFund,
      budgetHealth,
      recommendations
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

  const pieData = analysis ? [
    { name: 'Vaste Kosten', value: huurHypotheek + nutsvoorzieningen + verzekeringen + telecommunicatie + abonnementen + autoKosten },
    { name: 'Variabele Kosten', value: voeding + kleding + vervoer + entertainment + zorgkosten + overig },
    { name: 'Sparen & Beleggen', value: analysis.totalSavings },
    { name: 'Schulden', value: analysis.totalDebt },
    { name: 'Vrij Besteedbaar', value: Math.max(0, analysis.netIncome) }
  ].filter(item => item.value > 0) : [];

  const categoryData = [
    { category: 'Wonen', amount: huurHypotheek + nutsvoorzieningen, percentage: ((huurHypotheek + nutsvoorzieningen) / (analysis?.totalIncome || 1)) * 100 },
    { category: 'Voeding', amount: voeding, percentage: (voeding / (analysis?.totalIncome || 1)) * 100 },
    { category: 'Vervoer', amount: autoKosten + vervoer, percentage: ((autoKosten + vervoer) / (analysis?.totalIncome || 1)) * 100 },
    { category: 'Sparen', amount: analysis?.totalSavings || 0, percentage: ((analysis?.totalSavings || 0) / (analysis?.totalIncome || 1)) * 100 },
    { category: 'Verzekeringen', amount: verzekeringen, percentage: (verzekeringen / (analysis?.totalIncome || 1)) * 100 },
    { category: 'Entertainment', amount: entertainment, percentage: (entertainment / (analysis?.totalIncome || 1)) * 100 }
  ];

  const getBudgetHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-orange-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getBudgetHealthText = (health: string) => {
    switch (health) {
      case 'excellent': return '✅ Uitstekend';
      case 'good': return '👍 Goed';
      case 'warning': return '⚠️ Aandacht Vereist';
      case 'poor': return '❌ Zorgwekkend';
      default: return 'Onbekend';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Tabs defaultValue="inkomen" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inkomen" data-testid="tab-inkomen">Inkomen</TabsTrigger>
          <TabsTrigger value="uitgaven" data-testid="tab-uitgaven">Uitgaven</TabsTrigger>
          <TabsTrigger value="sparen" data-testid="tab-sparen">Sparen & Schulden</TabsTrigger>
          <TabsTrigger value="analyse" data-testid="tab-analyse">Budget Analyse</TabsTrigger>
        </TabsList>

        <TabsContent value="inkomen" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-coins mr-3 text-green-600"></i>
                Maandelijks Inkomen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="netto-salaris">Netto Maandsalaris (€)</Label>
                    <Input
                      id="netto-salaris"
                      data-testid="input-netto-salaris"
                      type="number"
                      value={nettoSalaris}
                      onChange={(e) => setNettoSalaris(Number(e.target.value))}
                      step="50"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="vakantiegeld">Vakantiegeld per jaar (€)</Label>
                    <Input
                      id="vakantiegeld"
                      data-testid="input-vakantiegeld"
                      type="number"
                      value={vakantiegeld}
                      onChange={(e) => setVakantiegeld(Number(e.target.value))}
                      step="100"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="eindejaarsbonus">13de Maand / Eindejaarsbonus (€)</Label>
                    <Input
                      id="eindejaarsbonus"
                      data-testid="input-eindejaarsbonus"
                      type="number"
                      value={eindejaarsbonus}
                      onChange={(e) => setEindejaarsbonus(Number(e.target.value))}
                      step="100"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="kindergeld">Kindergeld per maand (€)</Label>
                    <Input
                      id="kindergeld"
                      data-testid="input-kindergeld"
                      type="number"
                      value={kindergeld}
                      onChange={(e) => setKindergeld(Number(e.target.value))}
                      step="25"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bijverdiensten">Bijverdiensten per maand (€)</Label>
                    <Input
                      id="bijverdiensten"
                      data-testid="input-bijverdiensten"
                      type="number"
                      value={bijverdiensten}
                      onChange={(e) => setBijverdiensten(Number(e.target.value))}
                      step="50"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="inkomen-type">Type Inkomen</Label>
                    <Select value={inkomenType} onValueChange={setInkomenType}>
                      <SelectTrigger data-testid="select-inkomen-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="werknemer">Werknemer</SelectItem>
                        <SelectItem value="zelfstandige">Zelfstandige</SelectItem>
                        <SelectItem value="ambtenaar">Ambtenaar</SelectItem>
                        <SelectItem value="gepensioneerde">Gepensioneerde</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Card className="bg-green-50 dark:bg-green-950">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600" data-testid="text-totaal-inkomen">
                      {formatCurrency(nettoSalaris + (vakantiegeld + eindejaarsbonus)/12 + kindergeld + bijverdiensten)}
                    </div>
                    <p className="text-muted-foreground">Totaal Maandelijks Inkomen</p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uitgaven" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <i className="fas fa-home mr-3 text-blue-600"></i>
                  Vaste Uitgaven
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="huur-hypotheek">Huur / Hypotheek (€)</Label>
                  <Input
                    id="huur-hypotheek"
                    data-testid="input-huur-hypotheek"
                    type="number"
                    value={huurHypotheek}
                    onChange={(e) => setHuurHypotheek(Number(e.target.value))}
                    step="50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="nutsvoorzieningen">Gas, Water, Elektriciteit (€)</Label>
                  <Input
                    id="nutsvoorzieningen"
                    data-testid="input-nutsvoorzieningen"
                    type="number"
                    value={nutsvoorzieningen}
                    onChange={(e) => setNutsvoorzieningen(Number(e.target.value))}
                    step="25"
                  />
                </div>
                
                <div>
                  <Label htmlFor="verzekeringen">Verzekeringen (€)</Label>
                  <Input
                    id="verzekeringen"
                    data-testid="input-verzekeringen"
                    type="number"
                    value={verzekeringen}
                    onChange={(e) => setVerzekeringen(Number(e.target.value))}
                    step="25"
                  />
                </div>
                
                <div>
                  <Label htmlFor="telecommunicatie">Internet, TV, Telefoon (€)</Label>
                  <Input
                    id="telecommunicatie"
                    data-testid="input-telecommunicatie"
                    type="number"
                    value={telecommunicatie}
                    onChange={(e) => setTelecommunicatie(Number(e.target.value))}
                    step="10"
                  />
                </div>
                
                <div>
                  <Label htmlFor="abonnementen">Abonnementen (€)</Label>
                  <Input
                    id="abonnementen"
                    data-testid="input-abonnementen"
                    type="number"
                    value={abonnementen}
                    onChange={(e) => setAbonnementen(Number(e.target.value))}
                    step="10"
                  />
                </div>
                
                <div>
                  <Label htmlFor="auto-kosten">Auto Kosten (€)</Label>
                  <Input
                    id="auto-kosten"
                    data-testid="input-auto-kosten"
                    type="number"
                    value={autoKosten}
                    onChange={(e) => setAutoKosten(Number(e.target.value))}
                    step="25"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <i className="fas fa-shopping-cart mr-3 text-orange-600"></i>
                  Variabele Uitgaven
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="voeding">Voeding & Dranken (€)</Label>
                  <Input
                    id="voeding"
                    data-testid="input-voeding"
                    type="number"
                    value={voeding}
                    onChange={(e) => setVoeding(Number(e.target.value))}
                    step="25"
                  />
                </div>
                
                <div>
                  <Label htmlFor="kleding">Kleding & Schoenen (€)</Label>
                  <Input
                    id="kleding"
                    data-testid="input-kleding"
                    type="number"
                    value={kleding}
                    onChange={(e) => setKleding(Number(e.target.value))}
                    step="25"
                  />
                </div>
                
                <div>
                  <Label htmlFor="vervoer">Openbaar Vervoer (€)</Label>
                  <Input
                    id="vervoer"
                    data-testid="input-vervoer"
                    type="number"
                    value={vervoer}
                    onChange={(e) => setVervoer(Number(e.target.value))}
                    step="10"
                  />
                </div>
                
                <div>
                  <Label htmlFor="entertainment">Entertainment & Hobby (€)</Label>
                  <Input
                    id="entertainment"
                    data-testid="input-entertainment"
                    type="number"
                    value={entertainment}
                    onChange={(e) => setEntertainment(Number(e.target.value))}
                    step="25"
                  />
                </div>
                
                <div>
                  <Label htmlFor="zorgkosten">Zorgkosten (€)</Label>
                  <Input
                    id="zorgkosten"
                    data-testid="input-zorgkosten"
                    type="number"
                    value={zorgkosten}
                    onChange={(e) => setZorgkosten(Number(e.target.value))}
                    step="25"
                  />
                </div>
                
                <div>
                  <Label htmlFor="overig">Overige Uitgaven (€)</Label>
                  <Input
                    id="overig"
                    data-testid="input-overig"
                    type="number"
                    value={overig}
                    onChange={(e) => setOverig(Number(e.target.value))}
                    step="25"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sparen" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <i className="fas fa-piggy-bank mr-3 text-green-600"></i>
                  Sparen & Beleggen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="spaarrekening">Spaarrekening (€)</Label>
                  <Input
                    id="spaarrekening"
                    data-testid="input-spaarrekening"
                    type="number"
                    value={spaarrekening}
                    onChange={(e) => setSpaarrekening(Number(e.target.value))}
                    step="25"
                  />
                </div>
                
                <div>
                  <Label htmlFor="pensioensparen">Pensioensparen (€)</Label>
                  <Input
                    id="pensioensparen"
                    data-testid="input-pensioensparen"
                    type="number"
                    value={pensioensparen}
                    onChange={(e) => setPensioensparen(Number(e.target.value))}
                    step="25"
                    max="109"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Max: €109/maand (€1.310/jaar)</p>
                </div>
                
                <div>
                  <Label htmlFor="beleggingen">Beleggingen (€)</Label>
                  <Input
                    id="beleggingen"
                    data-testid="input-beleggingen"
                    type="number"
                    value={beleggingen}
                    onChange={(e) => setBeleggingen(Number(e.target.value))}
                    step="50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="noodfonds">Noodfonds (€)</Label>
                  <Input
                    id="noodfonds"
                    data-testid="input-noodfonds"
                    type="number"
                    value={noodfonds}
                    onChange={(e) => setNoodfonds(Number(e.target.value))}
                    step="25"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <i className="fas fa-credit-card mr-3 text-red-600"></i>
                  Schulden & Leningen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="studielening">Studielening (€)</Label>
                  <Input
                    id="studielening"
                    data-testid="input-studielening"
                    type="number"
                    value={studielening}
                    onChange={(e) => setStudielening(Number(e.target.value))}
                    step="25"
                  />
                </div>
                
                <div>
                  <Label htmlFor="kredietkaart">Kredietkaart Afbetaling (€)</Label>
                  <Input
                    id="kredietkaart"
                    data-testid="input-kredietkaart"
                    type="number"
                    value={kredietkaart}
                    onChange={(e) => setKredietkaart(Number(e.target.value))}
                    step="25"
                  />
                </div>
                
                <div>
                  <Label htmlFor="persoonlijk-krediet">Persoonlijk Krediet (€)</Label>
                  <Input
                    id="persoonlijk-krediet"
                    data-testid="input-persoonlijk-krediet"
                    type="number"
                    value={persoonlijkKrediet}
                    onChange={(e) => setPersoonlijkKrediet(Number(e.target.value))}
                    step="25"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gezinsgrootte">Gezinsgrootte</Label>
                    <Input
                      id="gezinsgrootte"
                      data-testid="input-gezinsgrootte"
                      type="number"
                      value={gezinsgrootte}
                      onChange={(e) => setGezinsgrootte(Number(e.target.value))}
                      min="1"
                      max="10"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="aantal-kinderen">Aantal Kinderen</Label>
                    <Input
                      id="aantal-kinderen"
                      data-testid="input-aantal-kinderen"
                      type="number"
                      value={aantalKinderen}
                      onChange={(e) => setAantalKinderen(Number(e.target.value))}
                      min="0"
                      max="8"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={calculateBudget} 
              size="lg" 
              className="px-12"
              data-testid="button-bereken-budget"
            >
              <i className="fas fa-calculator mr-2"></i>
              Analyseer Mijn Budget
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="analyse" className="space-y-6">
          {analysis && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600" data-testid="text-totaal-inkomen-analyse">
                        {formatCurrency(analysis.totalIncome)}
                      </div>
                      <p className="text-muted-foreground">Totaal Inkomen</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600" data-testid="text-totaal-uitgaven">
                        {formatCurrency(analysis.totalExpenses)}
                      </div>
                      <p className="text-muted-foreground">Totaal Uitgaven</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600" data-testid="text-spaarpercentage">
                        {analysis.savingsRate.toFixed(1)}%
                      </div>
                      <p className="text-muted-foreground">Spaarpercentage</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getBudgetHealthColor(analysis.budgetHealth)}`} data-testid="text-budget-gezondheid">
                        {getBudgetHealthText(analysis.budgetHealth)}
                      </div>
                      <p className="text-muted-foreground">Budget Gezondheid</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Verdeling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Uitgaven per Categorie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis tickFormatter={(value) => `${value.toFixed(0)}%`} />
                        <Tooltip 
                          formatter={(value, name) => [
                            name === 'amount' ? formatCurrency(Number(value)) : `${Number(value).toFixed(1)}%`,
                            name === 'amount' ? 'Bedrag' : 'Percentage van inkomen'
                          ]} 
                        />
                        <Bar dataKey="percentage" fill="#3b82f6" name="Percentage" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Aanbevelingen</CardTitle>
                </CardHeader>
                <CardContent>
                  {analysis.recommendations.length > 0 ? (
                    <div className="space-y-3">
                      {analysis.recommendations.map((recommendation, index) => (
                        <Alert key={index}>
                          <i className="fas fa-lightbulb"></i>
                          <AlertDescription>{recommendation}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  ) : (
                    <Alert>
                      <i className="fas fa-check-circle text-green-600"></i>
                      <AlertDescription>
                        <strong>Uitstekend!</strong> Uw budget is goed in balans. Blijf uw huidige koers volgen.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Overzicht</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Netto Overschot:</span>
                        <span className={`font-semibold ${analysis.netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`} data-testid="text-netto-overschot">
                          {formatCurrency(analysis.netIncome)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Schuld-Inkomen Ratio:</span>
                        <span className={`font-semibold ${analysis.debtToIncomeRatio > 30 ? 'text-red-600' : 'text-green-600'}`} data-testid="text-schuld-ratio">
                          {analysis.debtToIncomeRatio.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Aanbevolen Noodfonds:</span>
                        <span className="font-semibold" data-testid="text-aanbevolen-noodfonds">
                          {formatCurrency(analysis.recommendedEmergencyFund)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Huidig Noodfonds:</span>
                        <span className="font-semibold">
                          {formatCurrency(noodfonds * 12)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm">Noodfonds Voortgang:</span>
                        <Progress 
                          value={Math.min((noodfonds * 12 / analysis.recommendedEmergencyFund) * 100, 100)} 
                          className="mt-1"
                        />
                        <span className="text-xs text-muted-foreground">
                          {((noodfonds * 12 / analysis.recommendedEmergencyFund) * 100).toFixed(0)}% van doel
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {!analysis && (
            <Card>
              <CardContent className="py-12 text-center">
                <i className="fas fa-chart-pie text-4xl text-muted-foreground mb-4"></i>
                <p className="text-lg text-muted-foreground">
                  Vul uw budget gegevens in en klik op "Analyseer Mijn Budget" om uw analyse te zien.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}