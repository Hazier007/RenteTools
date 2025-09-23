import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function BudgetPlannerPage() {
  const [inkomen, setInkomen] = useState({
    salaris: 3500,
    bijverdiensten: 0,
    uitkeringen: 0,
    overig: 0
  });

  const [uitgaven, setUitgaven] = useState({
    wonen: 1200,
    voeding: 400,
    transport: 300,
    verzekeringen: 150,
    kleding: 100,
    gezondheid: 80,
    entertainment: 200,
    sparen: 300,
    overig: 270
  });

  const totaalInkomen = Object.values(inkomen).reduce((sum, val) => sum + val, 0);
  const totaalUitgaven = Object.values(uitgaven).reduce((sum, val) => sum + val, 0);
  const overschot = totaalInkomen - totaalUitgaven;

  // Data for charts
  const uitgavenData = [
    { name: 'Wonen', value: uitgaven.wonen, color: '#ef4444' },
    { name: 'Voeding', value: uitgaven.voeding, color: '#f97316' },
    { name: 'Transport', value: uitgaven.transport, color: '#eab308' },
    { name: 'Verzekeringen', value: uitgaven.verzekeringen, color: '#22c55e' },
    { name: 'Kleding', value: uitgaven.kleding, color: '#3b82f6' },
    { name: 'Gezondheid', value: uitgaven.gezondheid, color: '#a855f7' },
    { name: 'Entertainment', value: uitgaven.entertainment, color: '#ec4899' },
    { name: 'Sparen', value: uitgaven.sparen, color: '#10b981' },
    { name: 'Overig', value: uitgaven.overig, color: '#6b7280' }
  ];

  const budgetAdvies = () => {
    const wonenPercentage = (uitgaven.wonen / totaalInkomen) * 100;
    const sparenPercentage = (uitgaven.sparen / totaalInkomen) * 100;
    
    let advies = [];
    if (wonenPercentage > 35) {
      advies.push("🏠 Uw woonkosten zijn hoog (>35% van inkomen). Overweeg goedkopere huisvesting.");
    }
    if (sparenPercentage < 10) {
      advies.push("💰 Probeer minstens 10-20% van uw inkomen te sparen voor de toekomst.");
    }
    if (overschot < 0) {
      advies.push("⚠️ U geeft meer uit dan u verdient. Herzie uw uitgavenpatroon.");
    }
    
    return advies;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeCalculator="budget" onCalculatorChange={() => {}} />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Budget Planner België - Plan uw Financiën
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Maak een compleet overzicht van uw inkomsten en uitgaven. Ontdek waar uw geld naartoe gaat 
            en krijg persoonlijk advies om uw financiële doelen te bereiken.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">💡 Smart budgetteren:</p>
            <p className="text-sm opacity-90">
              De 50/30/20 regel: 50% noodzakelijke uitgaven, 30% wensen, 20% sparen en schulden afbetalen.
            </p>
          </div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <GoogleAdsense slot="banner" className="hidden lg:block" />
          <GoogleAdsense slot="banner" className="lg:hidden" />
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            
            {/* Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  <i className="fas fa-chart-pie mr-3 text-primary"></i>
                  Budget Planner - Beheer uw financiën
                </CardTitle>
                <p className="text-muted-foreground">
                  Vul uw maandelijkse inkomsten en uitgaven in voor een compleet overzicht 
                  van uw financiële situatie en krijg persoonlijk advies.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Inkomsten */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-green-600">💰 Maandelijkse Inkomsten</h3>
                    
                    <div>
                      <Label htmlFor="salaris">Netto salaris (€)</Label>
                      <Input
                        id="salaris"
                        type="number"
                        value={inkomen.salaris}
                        onChange={(e) => setInkomen({...inkomen, salaris: Number(e.target.value)})}
                        data-testid="input-salaris"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bijverdiensten">Bijverdiensten (€)</Label>
                      <Input
                        id="bijverdiensten"
                        type="number"
                        value={inkomen.bijverdiensten}
                        onChange={(e) => setInkomen({...inkomen, bijverdiensten: Number(e.target.value)})}
                        data-testid="input-bijverdiensten"
                      />
                    </div>

                    <div>
                      <Label htmlFor="uitkeringen">Uitkeringen (€)</Label>
                      <Input
                        id="uitkeringen"
                        type="number"
                        value={inkomen.uitkeringen}
                        onChange={(e) => setInkomen({...inkomen, uitkeringen: Number(e.target.value)})}
                        data-testid="input-uitkeringen"
                      />
                    </div>

                    <div>
                      <Label htmlFor="overig-inkomen">Overige inkomsten (€)</Label>
                      <Input
                        id="overig-inkomen"
                        type="number"
                        value={inkomen.overig}
                        onChange={(e) => setInkomen({...inkomen, overig: Number(e.target.value)})}
                        data-testid="input-overig-inkomen"
                      />
                    </div>

                    <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
                      <div className="flex justify-between">
                        <span className="font-semibold">Totaal Inkomen:</span>
                        <span className="font-bold text-green-600" data-testid="total-income">€{totaalInkomen.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Uitgaven */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-red-600">💸 Maandelijkse Uitgaven</h3>
                    
                    <div>
                      <Label htmlFor="wonen">Wonen (huur/hypotheek) (€)</Label>
                      <Input
                        id="wonen"
                        type="number"
                        value={uitgaven.wonen}
                        onChange={(e) => setUitgaven({...uitgaven, wonen: Number(e.target.value)})}
                        data-testid="input-wonen"
                      />
                    </div>

                    <div>
                      <Label htmlFor="voeding">Voeding & boodschappen (€)</Label>
                      <Input
                        id="voeding"
                        type="number"
                        value={uitgaven.voeding}
                        onChange={(e) => setUitgaven({...uitgaven, voeding: Number(e.target.value)})}
                        data-testid="input-voeding"
                      />
                    </div>

                    <div>
                      <Label htmlFor="transport">Transport (€)</Label>
                      <Input
                        id="transport"
                        type="number"
                        value={uitgaven.transport}
                        onChange={(e) => setUitgaven({...uitgaven, transport: Number(e.target.value)})}
                        data-testid="input-transport"
                      />
                    </div>

                    <div>
                      <Label htmlFor="verzekeringen">Verzekeringen (€)</Label>
                      <Input
                        id="verzekeringen"
                        type="number"
                        value={uitgaven.verzekeringen}
                        onChange={(e) => setUitgaven({...uitgaven, verzekeringen: Number(e.target.value)})}
                        data-testid="input-verzekeringen"
                      />
                    </div>

                    <div>
                      <Label htmlFor="kleding">Kleding (€)</Label>
                      <Input
                        id="kleding"
                        type="number"
                        value={uitgaven.kleding}
                        onChange={(e) => setUitgaven({...uitgaven, kleding: Number(e.target.value)})}
                        data-testid="input-kleding"
                      />
                    </div>

                    <div>
                      <Label htmlFor="gezondheid">Gezondheid (€)</Label>
                      <Input
                        id="gezondheid"
                        type="number"
                        value={uitgaven.gezondheid}
                        onChange={(e) => setUitgaven({...uitgaven, gezondheid: Number(e.target.value)})}
                        data-testid="input-gezondheid"
                      />
                    </div>

                    <div>
                      <Label htmlFor="entertainment">Entertainment (€)</Label>
                      <Input
                        id="entertainment"
                        type="number"
                        value={uitgaven.entertainment}
                        onChange={(e) => setUitgaven({...uitgaven, entertainment: Number(e.target.value)})}
                        data-testid="input-entertainment"
                      />
                    </div>

                    <div>
                      <Label htmlFor="sparen">Sparen & beleggen (€)</Label>
                      <Input
                        id="sparen"
                        type="number"
                        value={uitgaven.sparen}
                        onChange={(e) => setUitgaven({...uitgaven, sparen: Number(e.target.value)})}
                        data-testid="input-sparen"
                      />
                    </div>

                    <div>
                      <Label htmlFor="overig-uitgaven">Overige uitgaven (€)</Label>
                      <Input
                        id="overig-uitgaven"
                        type="number"
                        value={uitgaven.overig}
                        onChange={(e) => setUitgaven({...uitgaven, overig: Number(e.target.value)})}
                        data-testid="input-overig-uitgaven"
                      />
                    </div>

                    <div className="bg-red-50 dark:bg-red-950 p-3 rounded">
                      <div className="flex justify-between">
                        <span className="font-semibold">Totaal Uitgaven:</span>
                        <span className="font-bold text-red-600" data-testid="total-expenses">€{totaalUitgaven.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Resultaten en Analyse */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">📊 Uw Budget Overzicht</h3>
                      
                      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between">
                          <span>Totaal Inkomen:</span>
                          <span className="font-semibold text-green-600" data-testid="result-income">€{totaalInkomen.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Totaal Uitgaven:</span>
                          <span className="font-semibold text-red-600" data-testid="result-expenses">€{totaalUitgaven.toLocaleString()}</span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between">
                            <span className="font-semibold">{overschot >= 0 ? 'Overschot:' : 'Tekort:'}</span>
                            <span className={`font-bold ${overschot >= 0 ? 'text-green-600' : 'text-red-600'}`} data-testid="result-balance">
                              €{Math.abs(overschot).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pie Chart */}
                    <div>
                      <h4 className="font-semibold mb-3">Uitgaven Verdeling</h4>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={uitgavenData.filter(item => item.value > 0)}
                              cx="50%"
                              cy="50%"
                              innerRadius={30}
                              outerRadius={70}
                              dataKey="value"
                            >
                              {uitgavenData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `€${value.toLocaleString()}`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Persoonlijk Advies */}
                    <div>
                      <h4 className="font-semibold mb-3">💡 Persoonlijk Advies</h4>
                      <div className="space-y-2">
                        {budgetAdvies().map((advies, index) => (
                          <div key={index} className="text-sm bg-orange-50 dark:bg-orange-950 p-2 rounded">
                            {advies}
                          </div>
                        ))}
                        {budgetAdvies().length === 0 && (
                          <div className="text-sm bg-green-50 dark:bg-green-950 p-2 rounded">
                            ✅ Uw budget ziet er gezond uit! Blijf uw uitgaven monitoren.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Budget Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Budget Tips voor Belgen</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3>💰 De 50/30/20 Regel</h3>
                    <ul>
                      <li><strong>50% Noodzakelijke uitgaven:</strong> Huur, voeding, transport, verzekeringen</li>
                      <li><strong>30% Wensen:</strong> Entertainment, hobby's, restaurants</li>
                      <li><strong>20% Sparen & schulden:</strong> Noodfonds, pensioen, schulden afbetalen</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3>🎯 Budget Optimalisatie</h3>
                    <ul>
                      <li><strong>Woonkosten:</strong> Max 35% van uw inkomen</li>
                      <li><strong>Transport:</strong> Overweeg openbaar vervoer</li>
                      <li><strong>Verzekeringen:</strong> Vergelijk jaarlijks tarieven</li>
                      <li><strong>Abonnementen:</strong> Controleer ongebruikte diensten</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
          
          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            <GoogleAdsense slot="rectangle" />
            <GoogleAdsense slot="rectangle" />
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <GoogleAdsense slot="banner" className="hidden lg:block" />
          <GoogleAdsense slot="banner" className="lg:hidden" />
        </div>
      </section>

      <Footer />
    </div>
  );
}