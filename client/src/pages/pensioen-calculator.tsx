import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function PensioenCalculatorPage() {
  const [huidigeLeeftijd, setHuidigeLeeftijd] = useState<number>(30);
  const [pensioenLeeftijd, setPensioenLeeftijd] = useState<number>(65);
  const [huidigSalaris, setHuidigSalaris] = useState<number>(45000);
  const [maandelijkseInleg, setMaandelijkseInleg] = useState<number>(300);
  const [verwachtRendement, setVerwachtRendement] = useState<number>(5);
  const [gewensteInkomen, setGewensteInkomen] = useState<number>(70);

  const jarenTotPensioen = pensioenLeeftijd - huidigeLeeftijd;
  const maandenTotPensioen = jarenTotPensioen * 12;
  const jaarlijkseInleg = maandelijkseInleg * 12;

  // Calculate pension pot growth
  const toekomstigePensioenpot = () => {
    const maandelijksRendement = verwachtRendement / 100 / 12;
    const futureValue = maandelijkseInleg * (Math.pow(1 + maandelijksRendement, maandenTotPensioen) - 1) / maandelijksRendement;
    return futureValue;
  };

  const pensioenpot = toekomstigePensioenpot();
  const totaalIngelegd = jaarlijkseInleg * jarenTotPensioen;
  
  // Estimate Belgian state pension (rough calculation)
  const wettelijkPensioen = (huidigSalaris * 0.6 * (jarenTotPensioen / 45)) * 0.8; // Simplified calculation
  
  // Calculate monthly income from pension pot (4% withdrawal rule)
  const maandelijksInkomenUitPot = (pensioenpot * 0.04) / 12;
  const maandelijksWettelijkPensioen = wettelijkPensioen / 12;
  const totaalMaandelijksInkomen = maandelijksInkomenUitPot + maandelijksWettelijkPensioen;
  
  const gewenstMaandelijksInkomen = (huidigSalaris * (gewensteInkomen / 100)) / 12;
  const tekortOverschot = totaalMaandelijksInkomen - gewenstMaandelijksInkomen;

  // Data for charts
  const pieData = [
    { name: 'Wettelijk pensioen', value: maandelijksWettelijkPensioen, color: '#3b82f6' },
    { name: 'Aanvullend pensioen', value: maandelijksInkomenUitPot, color: '#10b981' }
  ];

  const barData = [
    { name: 'Gewenst inkomen', waarde: gewenstMaandelijksInkomen },
    { name: 'Verwacht inkomen', waarde: totaalMaandelijksInkomen }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header activeCalculator="pensioen" onCalculatorChange={() => {}} />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Pensioen Calculator België - Plan uw Pensioen
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken uw pensioeninkomen en ontdek hoeveel u moet sparen voor een zorgeloze oude dag. 
            Plan uw aanvullend pensioen bovenop het wettelijk pensioen.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">🏛️ Belgisch pensioensysteem:</p>
            <p className="text-sm opacity-90">
              Combineer wettelijk pensioen, bedrijfspensioen en persoonlijke pensioensparen voor optimale zekerheid.
            </p>
          </div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <AdPlaceholder size="leaderboard" className="hidden lg:block" />
          <AdPlaceholder size="banner" className="lg:hidden" />
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
                  <i className="fas fa-piggy-bank mr-3 text-primary"></i>
                  Pensioen Calculator - Plan uw toekomst
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken uw verwachte pensioeninkomen en ontdek of u voldoende spaart 
                  voor uw gewenste levensstandaard na pensionering.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Input Form */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="leeftijd">Huidige leeftijd</Label>
                      <Input
                        id="leeftijd"
                        type="number"
                        value={huidigeLeeftijd}
                        onChange={(e) => setHuidigeLeeftijd(Number(e.target.value))}
                        min="18"
                        max="65"
                        data-testid="input-leeftijd"
                      />
                    </div>

                    <div>
                      <Label htmlFor="pensioen-leeftijd">Gewenste pensioenleeftijd</Label>
                      <Select value={pensioenLeeftijd.toString()} onValueChange={(value) => setPensioenLeeftijd(Number(value))}>
                        <SelectTrigger data-testid="select-pensioen-leeftijd">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="60">60 jaar</SelectItem>
                          <SelectItem value="62">62 jaar</SelectItem>
                          <SelectItem value="65">65 jaar (wettelijk)</SelectItem>
                          <SelectItem value="67">67 jaar</SelectItem>
                          <SelectItem value="70">70 jaar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="salaris">Huidige jaarlijks bruto salaris (€)</Label>
                      <Input
                        id="salaris"
                        type="number"
                        value={huidigSalaris}
                        onChange={(e) => setHuidigSalaris(Number(e.target.value))}
                        placeholder="45000"
                        data-testid="input-salaris"
                      />
                    </div>

                    <div>
                      <Label htmlFor="maandelijks">Maandelijkse pensioensparen (€)</Label>
                      <Input
                        id="maandelijks"
                        type="number"
                        value={maandelijkseInleg}
                        onChange={(e) => setMaandelijkseInleg(Number(e.target.value))}
                        placeholder="300"
                        data-testid="input-maandelijks"
                      />
                    </div>

                    <div>
                      <Label htmlFor="rendement">Verwacht jaarlijks rendement (%)</Label>
                      <Select value={verwachtRendement.toString()} onValueChange={(value) => setVerwachtRendement(Number(value))}>
                        <SelectTrigger data-testid="select-rendement">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3% (Conservatief)</SelectItem>
                          <SelectItem value="4">4% (Gematigd)</SelectItem>
                          <SelectItem value="5">5% (Balanced)</SelectItem>
                          <SelectItem value="6">6% (Agressief)</SelectItem>
                          <SelectItem value="7">7% (Zeer agressief)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="gewenst">Gewenst pensioeninkomen (% van huidig salaris)</Label>
                      <Select value={gewensteInkomen.toString()} onValueChange={(value) => setGewensteInkomen(Number(value))}>
                        <SelectTrigger data-testid="select-gewenst">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="60">60%</SelectItem>
                          <SelectItem value="70">70%</SelectItem>
                          <SelectItem value="80">80%</SelectItem>
                          <SelectItem value="90">90%</SelectItem>
                          <SelectItem value="100">100%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Uw pensioenprognose:</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Jaren tot pensioen:</span>
                        <span className="font-semibold" data-testid="result-years">{jarenTotPensioen} jaar</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pensioenpot:</span>
                        <span className="font-semibold text-primary" data-testid="result-pot">€{Math.round(pensioenpot).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wettelijk pensioen:</span>
                        <span className="font-semibold" data-testid="result-legal">€{Math.round(maandelijksWettelijkPensioen).toLocaleString()}/mnd</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Aanvullend pensioen:</span>
                        <span className="font-semibold" data-testid="result-supplementary">€{Math.round(maandelijksInkomenUitPot).toLocaleString()}/mnd</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="font-semibold">Totaal pensioeninkomen:</span>
                          <span className="font-bold text-primary" data-testid="result-total">€{Math.round(totaalMaandelijksInkomen).toLocaleString()}/mnd</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span>Gewenst inkomen:</span>
                        <span className="font-semibold" data-testid="result-desired">€{Math.round(gewenstMaandelijksInkomen).toLocaleString()}/mnd</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{tekortOverschot >= 0 ? 'Overschot' : 'Tekort'}:</span>
                        <span className={`font-bold ${tekortOverschot >= 0 ? 'text-green-600' : 'text-red-600'}`} data-testid="result-gap">
                          €{Math.abs(Math.round(tekortOverschot)).toLocaleString()}/mnd
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Charts */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Verdeling pensioeninkomen</h4>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={80}
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `€${Math.round(value).toLocaleString()}`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Gewenst vs Verwacht</h4>
                      <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => `€${Math.round(value).toLocaleString()}`} />
                            <Bar dataKey="waarde" fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pensioen Pijlers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">De 3 pijlers van het Belgisch pensioensysteem</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🏛️ Eerste Pijler</h4>
                    <p className="text-sm mb-2"><strong>Wettelijk pensioen</strong></p>
                    <ul className="text-sm space-y-1">
                      <li>• Verplicht voor alle werknemers</li>
                      <li>• Gebaseerd op loopbaangeschiedenis</li>
                      <li>• Gemiddeld 60% van laatste salaris</li>
                      <li>• Minimumpensioen gegarandeerd</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">🏢 Tweede Pijler</h4>
                    <p className="text-sm mb-2"><strong>Bedrijfspensioen</strong></p>
                    <ul className="text-sm space-y-1">
                      <li>• Georganiseerd door werkgever</li>
                      <li>• Groepsverzekering of pensioenfonds</li>
                      <li>• Fiscaal voordelig</li>
                      <li>• Niet alle werkgevers bieden dit aan</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">💰 Derde Pijler</h4>
                    <p className="text-sm mb-2"><strong>Individueel pensioensparen</strong></p>
                    <ul className="text-sm space-y-1">
                      <li>• Persoonlijke verantwoordelijkheid</li>
                      <li>• Pensioensparen & -beleggen</li>
                      <li>• Belastingvermindering mogelijk</li>
                      <li>• Flexibele inleg en rendement</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
          
          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            <AdPlaceholder size="rectangle" />
            <AdPlaceholder size="rectangle" />
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <AdPlaceholder size="leaderboard" className="hidden lg:block" />
          <AdPlaceholder size="banner" className="lg:hidden" />
        </div>
      </section>

      <Footer />
    </div>
  );
}