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

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentSavings: number;
  targetDate: string;
  priority: 'hoog' | 'gemiddeld' | 'laag';
  category: 'noodfonds' | 'vakantie' | 'auto' | 'huis' | 'pensioen' | 'onderwijs' | 'overig';
  monthsRemaining: number;
  requiredMonthlySavings: number;
  progress: number;
  feasible: boolean;
}

interface GoalAnalysis {
  totalMonthlyRequired: number;
  totalTargetAmount: number;
  totalCurrentSavings: number;
  averageTimeToCompletion: number;
  prioritizedPlan: SavingsGoal[];
  scenarios: Array<{
    month: number;
    totalSaved: number;
    completedGoals: number;
    remainingGoals: number;
  }>;
  recommendations: string[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const GOAL_CATEGORIES = {
  noodfonds: { name: 'Noodfonds', icon: '🛡️', color: 'text-red-600' },
  vakantie: { name: 'Vakantie', icon: '✈️', color: 'text-blue-600' },
  auto: { name: 'Auto', icon: '🚗', color: 'text-green-600' },
  huis: { name: 'Huis/Verbouwing', icon: '🏠', color: 'text-purple-600' },
  pensioen: { name: 'Pensioen Extra', icon: '👴', color: 'text-orange-600' },
  onderwijs: { name: 'Onderwijs', icon: '📚', color: 'text-pink-600' },
  overig: { name: 'Overig', icon: '🎯', color: 'text-gray-600' }
};

export default function DoelspaarcalculatorComponent() {
  const [maandelijksBudget, setMaandelijksBudget] = useState<number>(500);
  const [rentepercentage, setRentepercentage] = useState<number>(2.5);
  const [inflatie, setInflatie] = useState<number>(2);
  
  // New goal form
  const [newGoalName, setNewGoalName] = useState<string>("");
  const [newGoalAmount, setNewGoalAmount] = useState<number>(10000);
  const [newGoalCurrent, setNewGoalCurrent] = useState<number>(1000);
  const [newGoalDate, setNewGoalDate] = useState<string>("");
  const [newGoalPriority, setNewGoalPriority] = useState<string>("gemiddeld");
  const [newGoalCategory, setNewGoalCategory] = useState<string>("overig");
  
  const [goals, setGoals] = useState<SavingsGoal[]>([
    {
      id: '1',
      name: 'Noodfonds',
      targetAmount: 15000,
      currentSavings: 3000,
      targetDate: '2026-12-31',
      priority: 'hoog',
      category: 'noodfonds',
      monthsRemaining: 15,
      requiredMonthlySavings: 800,
      progress: 20,
      feasible: true
    },
    {
      id: '2',
      name: 'Zomervakantie 2026',
      targetAmount: 4000,
      currentSavings: 800,
      targetDate: '2026-06-01',
      priority: 'gemiddeld',
      category: 'vakantie',
      monthsRemaining: 8,
      requiredMonthlySavings: 400,
      progress: 20,
      feasible: true
    }
  ]);
  
  const [result, setResult] = useState<GoalAnalysis | null>(null);

  const calculateGoalAnalysis = () => {
    const updatedGoals: SavingsGoal[] = goals.map(goal => {
      const targetDate = new Date(goal.targetDate);
      const today = new Date();
      const monthsRemaining = Math.max(1, Math.round((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30)));
      
      const remainingAmount = goal.targetAmount - goal.currentSavings;
      const monthlyRate = rentepercentage / 100 / 12;
      
      // Calculate required monthly savings with compound interest
      let requiredMonthlySavings;
      if (monthlyRate > 0) {
        requiredMonthlySavings = remainingAmount / (((Math.pow(1 + monthlyRate, monthsRemaining) - 1) / monthlyRate));
      } else {
        requiredMonthlySavings = remainingAmount / monthsRemaining;
      }
      
      const progress = (goal.currentSavings / goal.targetAmount) * 100;
      const feasible = requiredMonthlySavings <= maandelijksBudget * 0.8; // 80% of budget for single goal
      
      return {
        ...goal,
        monthsRemaining,
        requiredMonthlySavings: Math.ceil(requiredMonthlySavings),
        progress,
        feasible
      };
    });
    
    // Prioritize goals: high priority first, then by target date
    const prioritizedGoals = [...updatedGoals].sort((a, b) => {
      const priorityOrder = { 'hoog': 0, 'gemiddeld': 1, 'laag': 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return a.monthsRemaining - b.monthsRemaining;
    });
    
    const totalMonthlyRequired = updatedGoals.reduce((sum, goal) => sum + goal.requiredMonthlySavings, 0);
    const totalTargetAmount = updatedGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
    const totalCurrentSavings = updatedGoals.reduce((sum, goal) => sum + goal.currentSavings, 0);
    const averageTimeToCompletion = updatedGoals.reduce((sum, goal) => sum + goal.monthsRemaining, 0) / updatedGoals.length;
    
    // Generate scenario projections
    const scenarios = [];
    let availableBudget = maandelijksBudget;
    let completedGoals = 0;
    let currentSavings = totalCurrentSavings;
    
    for (let month = 0; month <= 60; month++) { // 5 year projection
      if (month > 0) {
        currentSavings += availableBudget;
        currentSavings *= (1 + rentepercentage / 100 / 12); // Apply monthly interest
      }
      
      scenarios.push({
        month,
        totalSaved: currentSavings,
        completedGoals,
        remainingGoals: updatedGoals.length - completedGoals
      });
    }
    
    // Generate recommendations
    const recommendations = [];
    
    if (totalMonthlyRequired > maandelijksBudget) {
      recommendations.push("💰 Uw budget is ontoereikend voor alle doelen. Verhoog uw maandelijks spaarbudget of verleng de tijdshorizon.");
    }
    
    if (updatedGoals.some(g => g.category === 'noodfonds' && g.progress < 100)) {
      recommendations.push("🛡️ Prioriteer eerst uw noodfonds - dit vormt de basis van financiële zekerheid.");
    }
    
    if (updatedGoals.filter(g => !g.feasible).length > 0) {
      recommendations.push("⚠️ Sommige doelen zijn niet haalbaar binnen de gestelde tijd. Overweeg realistische aanpassingen.");
    }
    
    if (rentepercentage < inflatie) {
      recommendations.push("📈 Uw spaarrente ligt onder de inflatie. Overweeg beleggingsopties voor langetermijn doelen.");
    }
    
    if (updatedGoals.length > 5) {
      recommendations.push("🎯 Te veel gelijktijdige doelen kan focus verminderen. Prioriteer de belangrijkste 3-5 doelen.");
    }
    
    setGoals(updatedGoals);
    setResult({
      totalMonthlyRequired,
      totalTargetAmount,
      totalCurrentSavings,
      averageTimeToCompletion,
      prioritizedPlan: prioritizedGoals,
      scenarios,
      recommendations
    });
  };

  const addNewGoal = () => {
    if (!newGoalName || !newGoalDate) return;
    
    const newGoal: SavingsGoal = {
      id: Date.now().toString(),
      name: newGoalName,
      targetAmount: newGoalAmount,
      currentSavings: newGoalCurrent,
      targetDate: newGoalDate,
      priority: newGoalPriority as 'hoog' | 'gemiddeld' | 'laag',
      category: newGoalCategory as any,
      monthsRemaining: 0,
      requiredMonthlySavings: 0,
      progress: 0,
      feasible: true
    };
    
    setGoals([...goals, newGoal]);
    
    // Reset form
    setNewGoalName("");
    setNewGoalAmount(10000);
    setNewGoalCurrent(1000);
    setNewGoalDate("");
    setNewGoalPriority("gemiddeld");
    setNewGoalCategory("overig");
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-BE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-BE', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'hoog': return 'text-red-600 bg-red-50 dark:bg-red-950';
      case 'gemiddeld': return 'text-orange-600 bg-orange-50 dark:bg-orange-950';
      case 'laag': return 'text-blue-600 bg-blue-50 dark:bg-blue-950';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Tabs defaultValue="doelen" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="doelen" data-testid="tab-doelen">Mijn Doelen</TabsTrigger>
          <TabsTrigger value="instellingen" data-testid="tab-instellingen">Instellingen</TabsTrigger>
          <TabsTrigger value="planning" data-testid="tab-planning">Planning</TabsTrigger>
          <TabsTrigger value="analyse" data-testid="tab-analyse">Analyse</TabsTrigger>
        </TabsList>

        <TabsContent value="doelen" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-plus-circle mr-3 text-green-600"></i>
                Nieuw Spaardoel Toevoegen
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-goal-name">Naam van het Doel</Label>
                  <Input
                    id="new-goal-name"
                    data-testid="input-new-goal-name"
                    value={newGoalName}
                    onChange={(e) => setNewGoalName(e.target.value)}
                    placeholder="Bijv. Nieuwe auto, vakantie, noodfonds"
                  />
                </div>
                
                <div>
                  <Label htmlFor="new-goal-amount">Doelbedrag (€)</Label>
                  <Input
                    id="new-goal-amount"
                    data-testid="input-new-goal-amount"
                    type="number"
                    value={newGoalAmount}
                    onChange={(e) => setNewGoalAmount(Number(e.target.value))}
                    step="500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="new-goal-current">Huidig Saldo (€)</Label>
                  <Input
                    id="new-goal-current"
                    data-testid="input-new-goal-current"
                    type="number"
                    value={newGoalCurrent}
                    onChange={(e) => setNewGoalCurrent(Number(e.target.value))}
                    step="100"
                  />
                </div>
                
                <div>
                  <Label htmlFor="new-goal-date">Gewenste Datum</Label>
                  <Input
                    id="new-goal-date"
                    data-testid="input-new-goal-date"
                    type="date"
                    value={newGoalDate}
                    onChange={(e) => setNewGoalDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-goal-priority">Prioriteit</Label>
                  <Select value={newGoalPriority} onValueChange={setNewGoalPriority}>
                    <SelectTrigger data-testid="select-new-goal-priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hoog">Hoog</SelectItem>
                      <SelectItem value="gemiddeld">Gemiddeld</SelectItem>
                      <SelectItem value="laag">Laag</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="new-goal-category">Categorie</Label>
                  <Select value={newGoalCategory} onValueChange={setNewGoalCategory}>
                    <SelectTrigger data-testid="select-new-goal-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(GOAL_CATEGORIES).map(([key, category]) => (
                        <SelectItem key={key} value={key}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Button 
                    onClick={addNewGoal}
                    disabled={!newGoalName || !newGoalDate}
                    className="w-full"
                    data-testid="button-add-goal"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    Doel Toevoegen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-bullseye mr-3 text-primary"></i>
                Huidige Spaardoelen ({goals.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goals.map((goal) => {
                  const category = GOAL_CATEGORIES[goal.category];
                  return (
                    <div key={goal.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{category.icon}</span>
                          <div>
                            <h4 className="font-semibold">{goal.name}</h4>
                            <p className="text-sm text-muted-foreground">{category.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(goal.priority)}>
                            {goal.priority}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeGoal(goal.id)}
                            data-testid={`button-remove-goal-${goal.id}`}
                          >
                            <i className="fas fa-trash text-red-600"></i>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-muted-foreground">Doelbedrag</div>
                          <div className="font-semibold">{formatCurrency(goal.targetAmount)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Huidig Saldo</div>
                          <div className="font-semibold">{formatCurrency(goal.currentSavings)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Gewenste Datum</div>
                          <div className="font-semibold">{formatDate(goal.targetDate)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Nog Nodig</div>
                          <div className="font-semibold">{formatCurrency(goal.targetAmount - goal.currentSavings)}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Voortgang</span>
                          <span>{goal.progress?.toFixed(1)}%</span>
                        </div>
                        <Progress value={goal.progress || 0} className="h-2" />
                      </div>
                    </div>
                  );
                })}
                
                {goals.length === 0 && (
                  <div className="text-center py-8">
                    <i className="fas fa-bullseye text-4xl text-muted-foreground mb-4"></i>
                    <p className="text-lg text-muted-foreground">
                      Geen spaardoelen ingesteld. Voeg uw eerste doel toe!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instellingen" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-cogs mr-3 text-primary"></i>
                Spaar Instellingen
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="maandelijks-budget">Maandelijks Spaarbudget (€)</Label>
                  <Input
                    id="maandelijks-budget"
                    data-testid="input-maandelijks-budget"
                    type="number"
                    value={maandelijksBudget}
                    onChange={(e) => setMaandelijksBudget(Number(e.target.value))}
                    step="50"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Hoeveel kunt u maandelijks sparen voor alle doelen samen?
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="rentepercentage">Verwacht Spaarrendement (%)</Label>
                  <Input
                    id="rentepercentage"
                    data-testid="input-rentepercentage"
                    type="number"
                    value={rentepercentage}
                    onChange={(e) => setRentepercentage(Number(e.target.value))}
                    step="0.1"
                    min="0"
                    max="10"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Spaarrekening: 1-3%, Obligaties: 2-4%, Aandelen: 6-8%
                  </p>
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
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-600">💰 Belgische Spaaropties</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="font-medium text-blue-900 dark:text-blue-100">Spaarrekening</div>
                    <div className="text-blue-700 dark:text-blue-300">
                      1-3% rente, direct beschikbaar, tot €2.290 vrijgesteld
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="font-medium text-green-900 dark:text-green-100">Termijnrekening</div>
                    <div className="text-green-700 dark:text-green-300">
                      2-4% rente, vaste periode, geschikt voor doelen &gt;1 jaar
                    </div>
                  </div>
                  
                  <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div className="font-medium text-purple-900 dark:text-purple-100">Pensioensparen</div>
                    <div className="text-purple-700 dark:text-purple-300">
                      30% belastingvoordeel, €1.310/jaar, voor pensioen doel
                    </div>
                  </div>
                  
                  <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <div className="font-medium text-orange-900 dark:text-orange-100">Beleggingsfondsen</div>
                    <div className="text-orange-700 dark:text-orange-300">
                      Hoger rendement mogelijk, voor doelen &gt;5 jaar
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button 
              onClick={calculateGoalAnalysis} 
              size="lg" 
              className="px-12"
              data-testid="button-bereken-doelen"
            >
              <i className="fas fa-calculator mr-2"></i>
              Bereken Spaarplan
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="planning" className="space-y-6">
          {result && (
            <>
              <div className="grid md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600" data-testid="text-maandelijks-nodig">
                        {formatCurrency(result.totalMonthlyRequired)}
                      </div>
                      <p className="text-muted-foreground">Maandelijks Nodig</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600" data-testid="text-budget-beschikbaar">
                        {formatCurrency(maandelijksBudget)}
                      </div>
                      <p className="text-muted-foreground">Budget Beschikbaar</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${result.totalMonthlyRequired <= maandelijksBudget ? 'text-green-600' : 'text-red-600'}`} data-testid="text-budget-saldo">
                        {formatCurrency(maandelijksBudget - result.totalMonthlyRequired)}
                      </div>
                      <p className="text-muted-foreground">Budget Saldo</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600" data-testid="text-gemiddelde-tijd">
                        {result.averageTimeToCompletion.toFixed(1)}
                      </div>
                      <p className="text-muted-foreground">Maanden Gemiddeld</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Geprioriteerd Spaarplan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.prioritizedPlan.map((goal, index) => {
                      const category = GOAL_CATEGORIES[goal.category];
                      return (
                        <div key={goal.id} className="flex items-center p-4 bg-muted rounded-lg">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mr-4 font-bold">
                            {index + 1}
                          </div>
                          <div className="flex items-center mr-4">
                            <span className="text-xl mr-2">{category.icon}</span>
                            <div>
                              <div className="font-semibold">{goal.name}</div>
                              <div className="text-sm text-muted-foreground">{formatDate(goal.targetDate)}</div>
                            </div>
                          </div>
                          <div className="ml-auto text-right">
                            <div className="font-semibold">{formatCurrency(goal.requiredMonthlySavings)}/maand</div>
                            <div className="text-sm text-muted-foreground">
                              {goal.feasible ? '✅ Haalbaar' : '❌ Te hoog'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {result.scenarios.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Spaarprojektie Over Tijd</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={result.scenarios.slice(0, 36)}> {/* 3 jaar projectie */}
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value, name) => [
                          name === 'totalSaved' ? formatCurrency(Number(value)) : value,
                          name === 'totalSaved' ? 'Totaal Gespaard' : 
                          name === 'completedGoals' ? 'Voltooide Doelen' : 'Resterende Doelen'
                        ]} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="totalSaved" 
                          stroke="#8884d8" 
                          name="Totaal Gespaard"
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="completedGoals" 
                          stroke="#82ca9d" 
                          name="Voltooide Doelen"
                          strokeWidth={2}
                          yAxisId="right"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {!result && (
            <Card>
              <CardContent className="py-12 text-center">
                <i className="fas fa-chart-line text-4xl text-muted-foreground mb-4"></i>
                <p className="text-lg text-muted-foreground">
                  Klik op "Bereken Spaarplan" om uw planning te zien.
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
                    <i className="fas fa-lightbulb mr-3 text-yellow-600"></i>
                    Persoonlijke Aanbevelingen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.recommendations.map((recommendation, index) => (
                      <Alert key={index}>
                        <i className="fas fa-info-circle"></i>
                        <AlertDescription>{recommendation}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Doelen Verdeling</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-4">Per Categorie</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={goals.map(goal => ({
                              name: GOAL_CATEGORIES[goal.category].name,
                              value: goal.targetAmount,
                              color: GOAL_CATEGORIES[goal.category].color
                            }))}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                          >
                            {goals.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-4">Per Prioriteit</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={[
                          { priority: 'Hoog', amount: goals.filter(g => g.priority === 'hoog').reduce((sum, g) => sum + g.targetAmount, 0) },
                          { priority: 'Gemiddeld', amount: goals.filter(g => g.priority === 'gemiddeld').reduce((sum, g) => sum + g.targetAmount, 0) },
                          { priority: 'Laag', amount: goals.filter(g => g.priority === 'laag').reduce((sum, g) => sum + g.targetAmount, 0) }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="priority" />
                          <YAxis tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`} />
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          <Bar dataKey="amount" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Optimalisatie Suggesties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-green-600">💡 Spaar Strategieën</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <i className="fas fa-arrow-up text-green-600 mr-2 mt-1"></i>
                          <span>Verhoog automatische overschrijvingen voor consistentie</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-calendar text-green-600 mr-2 mt-1"></i>
                          <span>Stel maandelijkse evaluatie in voor voortgang tracking</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-percentage text-green-600 mr-2 mt-1"></i>
                          <span>Overweeg hogere rente producten voor langetermijn doelen</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-coins text-green-600 mr-2 mt-1"></i>
                          <span>Gebruik belastingvoordelige spaarproducten waar mogelijk</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-blue-600">🎯 Doel Optimalisatie</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <i className="fas fa-sort-amount-down text-blue-600 mr-2 mt-1"></i>
                          <span>Focus op maximaal 3-5 doelen tegelijkertijd</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-balance-scale text-blue-600 mr-2 mt-1"></i>
                          <span>Balanceer korte en lange termijn doelen</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-chart-line text-blue-600 mr-2 mt-1"></i>
                          <span>Pas doelbedragen aan voor realistische tijdslijnen</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-sync text-blue-600 mr-2 mt-1"></i>
                          <span>Herzie prioriteiten regelmatig op basis van levensveranderingen</span>
                        </li>
                      </ul>
                    </div>
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
                  Bereken eerst uw spaarplan om de analyse te zien.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}