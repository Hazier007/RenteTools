import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function EindejaarsbonosCalculatorPage() {
  const seoConfig = getSeoConfig("eindejaarsbonus-calculator");
  useSeoTags("eindejaarsbonus-calculator");
  const [brutoMaandloon, setBrutoMaandloon] = useState<number>(3500);
  const [werkRegime, setWerkRegime] = useState<string>("voltijds");
  const [bedrijfBonus, setBedrijfBonus] = useState<number>(0);
  const [strategieKeuze, setStrategieKeuze] = useState<string>("sparen");
  const [spaarRente, setSpaarRente] = useState<number>(2.5);
  const [schuldenRente, setSchuldenRente] = useState<number>(8.5);
  const [beleggingRendement, setBeleggingRendement] = useState<number>(6.0);
  const [belastingVoordeel, setBelastingVoordeel] = useState<boolean>(false);

  // Calculate 13th month (eindejaarsbonus) in Belgium
  const berekenEindejaarsbonus = () => {
    const werkRegimes: Record<string, number> = {
      "voltijds": 1.0,
      "4/5de": 0.8,
      "halftijds": 0.5,
      "3/5de": 0.6
    };
    
    const werkRegimeMultiplier = werkRegimes[werkRegime] || 1.0;
    
    // 13th month = one month gross salary (pro rata for part-time)
    const dertiendeMaand = brutoMaandloon * werkRegimeMultiplier;
    
    // Additional company bonus (optional)
    const extraBonus = bedrijfBonus;
    
    const totaalBruto = dertiendeMaand + extraBonus;
    
    // Tax calculation (simplified - 13th month often has favorable tax treatment)
    const belastingPercentage = belastingVoordeel ? 25 : 35; // Favorable vs normal rate
    const belasting = totaalBruto * (belastingPercentage / 100);
    const nettoBonus = totaalBruto - belasting;
    
    return {
      dertiendeMaand,
      extraBonus,
      totaalBruto,
      belasting,
      nettoBonus,
      belastingPercentage
    };
  };

  const eindejaarsbonus = berekenEindejaarsbonus();

  // Calculate different strategies for using the bonus
  const berekenStrategieen = () => {
    const nettoBedrag = eindejaarsbonus.nettoBonus;
    
    // Strategy 1: Save in savings account
    const spaarStrategie = {
      naam: "Sparen op spaarrekening",
      bedrag: nettoBedrag,
      rendement1jaar: nettoBedrag * (1 + spaarRente / 100),
      rendement5jaar: nettoBedrag * Math.pow(1 + spaarRente / 100, 5),
      risico: "Laag",
      liquiditeit: "Hoog"
    };
    
    // Strategy 2: Pay off debts
    const schuldenAflossenBedrag = Math.min(nettoBedrag, 10000); // Assume max €10k debt
    const schuldenStrategie = {
      naam: "Schulden aflossen",
      bedrag: schuldenAflossenBedrag,
      rendement1jaar: schuldenAflossenBedrag * (1 + schuldenRente / 100), // Money saved on interest
      rendement5jaar: schuldenAflossenBedrag * Math.pow(1 + schuldenRente / 100, 5),
      risico: "Geen",
      liquiditeit: "Permanent voordeel"
    };
    
    // Strategy 3: Invest in ETFs/stocks
    const beleggingStrategie = {
      naam: "Beleggen (ETF/aandelen)",
      bedrag: nettoBedrag,
      rendement1jaar: nettoBedrag * (1 + beleggingRendement / 100),
      rendement5jaar: nettoBedrag * Math.pow(1 + beleggingRendement / 100, 5),
      risico: "Gemiddeld tot hoog",
      liquiditeit: "Gemiddeld"
    };
    
    // Strategy 4: Mixed approach
    const mixBedragSparen = nettoBedrag * 0.3;
    const mixBedragSchuld = nettoBedrag * 0.3;
    const mixBedragBeleggen = nettoBedrag * 0.4;
    
    const mixStrategie = {
      naam: "Gemengde strategie (30/30/40)",
      bedrag: nettoBedrag,
      rendement1jaar: 
        (mixBedragSparen * (1 + spaarRente / 100)) +
        (mixBedragSchuld * (1 + schuldenRente / 100)) +
        (mixBedragBeleggen * (1 + beleggingRendement / 100)),
      rendement5jaar: 
        (mixBedragSparen * Math.pow(1 + spaarRente / 100, 5)) +
        (mixBedragSchuld * Math.pow(1 + schuldenRente / 100, 5)) +
        (mixBedragBeleggen * Math.pow(1 + beleggingRendement / 100, 5)),
      risico: "Gemiddeld",
      liquiditeit: "Gemengd"
    };
    
    return [spaarStrategie, schuldenStrategie, beleggingStrategie, mixStrategie];
  };

  const strategieen = berekenStrategieen();

  // Calculate compound growth over time for selected strategy
  const berekenGroeiProjectie = () => {
    const geselecteerdeStrategie = strategieen.find(s => s.naam.toLowerCase().includes(strategieKeuze)) || strategieen[0];
    const startBedrag = eindejaarsbonus.nettoBonus;
    
    let rendement;
    switch (strategieKeuze) {
      case "sparen": rendement = spaarRente; break;
      case "schulden": rendement = schuldenRente; break;
      case "beleggen": rendement = beleggingRendement; break;
      case "mix": rendement = (spaarRente * 0.3 + schuldenRente * 0.3 + beleggingRendement * 0.4); break;
      default: rendement = spaarRente;
    }
    
    const projectie = [];
    for (let jaar = 0; jaar <= 10; jaar++) {
      const waarde = jaar === 0 ? startBedrag : startBedrag * Math.pow(1 + rendement / 100, jaar);
      const winst = waarde - startBedrag;
      
      projectie.push({
        jaar,
        waarde: Math.round(waarde),
        winst: Math.round(winst),
        startBedrag: Math.round(startBedrag)
      });
    }
    
    return projectie;
  };

  const groeiProjectie = berekenGroeiProjectie();

  // Calculate tax optimization scenarios
  const berekenBelastingOptimalisatie = () => {
    const scenarios = [];
    
    // Scenario 1: Normal taxation
    const normaal = {
      naam: "Normale belasting",
      brutoBedrag: eindejaarsbonus.totaalBruto,
      belastingPercentage: 35,
      belasting: eindejaarsbonus.totaalBruto * 0.35,
      netto: eindejaarsbonus.totaalBruto * 0.65
    };
    
    // Scenario 2: Favorable taxation
    const voordelig = {
      naam: "Voordelige belasting",
      brutoBedrag: eindejaarsbonus.totaalBruto,
      belastingPercentage: 25,
      belasting: eindejaarsbonus.totaalBruto * 0.25,
      netto: eindejaarsbonus.totaalBruto * 0.75
    };
    
    // Scenario 3: Spread over multiple years
    const spreiden = {
      naam: "Spreiden over jaren",
      brutoBedrag: eindejaarsbonus.totaalBruto,
      belastingPercentage: 30, // Average
      belasting: eindejaarsbonus.totaalBruto * 0.30,
      netto: eindejaarsbonus.totaalBruto * 0.70
    };
    
    scenarios.push(normaal, voordelig, spreiden);
    return scenarios;
  };

  const belastingScenarios = berekenBelastingOptimalisatie();

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Eindejaarsbonus Calculator België - 13de Maand Optimaliseren
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken uw eindejaarsbonus (13de maand) en ontdek de beste strategie om dit extra 
            geld optimaal in te zetten: sparen, beleggen, schulden aflossen of investeren.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">💰 13de maand slim inzetten:</p>
            <p className="text-sm opacity-90">
              Plan vooruit en maximaliseer het rendement van uw eindejaarsbonus met de juiste financiële strategie.
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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
            
            {/* Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  <i className="fas fa-gift mr-3 text-primary"></i>
                  Eindejaarsbonus Calculator - Optimaliseer uw 13de maand
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken uw eindejaarsbonus en vergelijk verschillende strategieën om dit extra 
                  geld optimaal te benutten voor uw financiële doelen.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Input Form */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-600">💼 Uw situatie</h3>
                    
                    <div>
                      <Label htmlFor="maandloon">Bruto maandloon (€)</Label>
                      <Input
                        id="maandloon"
                        type="number"
                        value={brutoMaandloon}
                        onChange={(e) => setBrutoMaandloon(Number(e.target.value))}
                        placeholder="3500"
                        data-testid="input-maandloon"
                      />
                    </div>

                    <div>
                      <Label htmlFor="werkregime">Werkregime</Label>
                      <Select value={werkRegime} onValueChange={setWerkRegime}>
                        <SelectTrigger data-testid="select-werkregime">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="voltijds">Voltijds (100%)</SelectItem>
                          <SelectItem value="4/5de">4/5de (80%)</SelectItem>
                          <SelectItem value="3/5de">3/5de (60%)</SelectItem>
                          <SelectItem value="halftijds">Halftijds (50%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="bedrijfbonus">Extra bedrijfsbonus (€)</Label>
                      <Input
                        id="bedrijfbonus"
                        type="number"
                        value={bedrijfBonus}
                        onChange={(e) => setBedrijfBonus(Number(e.target.value))}
                        placeholder="0"
                        data-testid="input-bedrijfbonus"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Optioneel: extra bonus bovenop 13de maand
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="strategie">Gewenste strategie</Label>
                      <Select value={strategieKeuze} onValueChange={setStrategieKeuze}>
                        <SelectTrigger data-testid="select-strategie">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sparen">Sparen op spaarrekening</SelectItem>
                          <SelectItem value="schulden">Schulden aflossen</SelectItem>
                          <SelectItem value="beleggen">Beleggen (ETF/aandelen)</SelectItem>
                          <SelectItem value="mix">Gemengde strategie</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="belastingvoordeel"
                        checked={belastingVoordeel}
                        onChange={(e) => setBelastingVoordeel(e.target.checked)}
                        className="rounded"
                        data-testid="checkbox-belastingvoordeel"
                      />
                      <Label htmlFor="belastingvoordeel" className="text-sm">
                        Voordelige belastingregeling toepassen
                      </Label>
                    </div>

                    <div>
                      <Label htmlFor="spaarrente">Spaarrente (%)</Label>
                      <Input
                        id="spaarrente"
                        type="number"
                        step="0.1"
                        value={spaarRente}
                        onChange={(e) => setSpaarRente(Number(e.target.value))}
                        placeholder="2.5"
                        data-testid="input-spaarrente"
                      />
                    </div>

                    <div>
                      <Label htmlFor="schuldrente">Schuldenrente (%)</Label>
                      <Input
                        id="schuldrente"
                        type="number"
                        step="0.1"
                        value={schuldenRente}
                        onChange={(e) => setSchuldenRente(Number(e.target.value))}
                        placeholder="8.5"
                        data-testid="input-schuldrente"
                      />
                    </div>

                    <div>
                      <Label htmlFor="beleggingrendement">Verwacht beleggingrendement (%)</Label>
                      <Input
                        id="beleggingrendement"
                        type="number"
                        step="0.1"
                        value={beleggingRendement}
                        onChange={(e) => setBeleggingRendement(Number(e.target.value))}
                        placeholder="6.0"
                        data-testid="input-beleggingrendement"
                      />
                    </div>
                  </div>

                  {/* Bonus Calculation */}
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">🎁 Uw eindejaarsbonus 2025:</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Bruto maandloon:</span>
                        <span className="font-semibold">€{brutoMaandloon.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Werkregime:</span>
                        <span className="font-semibold">{werkRegime}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>13de maand:</span>
                        <span className="font-semibold" data-testid="result-13th">€{Math.round(eindejaarsbonus.dertiendeMaand).toLocaleString()}</span>
                      </div>
                      
                      {eindejaarsbonus.extraBonus > 0 && (
                        <div className="flex justify-between">
                          <span>Extra bedrijfsbonus:</span>
                          <span className="font-semibold text-green-600" data-testid="result-extra">€{Math.round(eindejaarsbonus.extraBonus).toLocaleString()}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span>Totaal bruto bonus:</span>
                        <span className="font-semibold text-blue-600" data-testid="result-gross">€{Math.round(eindejaarsbonus.totaalBruto).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Belasting ({eindejaarsbonus.belastingPercentage}%):</span>
                        <span className="font-semibold text-red-600" data-testid="result-tax">-€{Math.round(eindejaarsbonus.belasting).toLocaleString()}</span>
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="font-semibold">Netto eindejaarsbonus:</span>
                          <span className="font-bold text-primary text-lg" data-testid="result-net">€{Math.round(eindejaarsbonus.nettoBonus).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-background rounded">
                      <h4 className="font-semibold mb-2">💡 Belastingtips:</h4>
                      <p className="text-xs text-muted-foreground">
                        {belastingVoordeel ? 
                          "✅ U gebruikt voordelige belastingregeling (25%)" :
                          "⚠️ Overweeg voordelige belastingregeling aan te vinken voor lagere belasting"
                        }
                      </p>
                    </div>
                  </div>

                  {/* Strategy Results */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-green-600">📈 Strategie vergelijking</h3>
                    
                    {strategieen.map((strategie, index) => (
                      <div key={index} className={`p-4 rounded-lg ${
                        strategie.naam.toLowerCase().includes(strategieKeuze) ? 
                        'bg-green-100 dark:bg-green-900 border-2 border-green-500' : 
                        'bg-gray-50 dark:bg-gray-900'
                      }`}>
                        <h4 className="font-semibold mb-2">{strategie.naam}</h4>
                        
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Bedrag:</span>
                            <span className="font-semibold">€{Math.round(strategie.bedrag).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Na 1 jaar:</span>
                            <span className="font-semibold">€{Math.round(strategie.rendement1jaar).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Na 5 jaar:</span>
                            <span className="font-semibold text-green-600">€{Math.round(strategie.rendement5jaar).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Risico:</span>
                            <span className="text-xs">{strategie.risico}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Liquiditeit:</span>
                            <span className="text-xs">{strategie.liquiditeit}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h4 className="font-semibold mb-3">Groei van uw gekozen strategie (10 jaar)</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={groeiProjectie}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="jaar" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number, name: string) => [
                              `€${value.toLocaleString()}`,
                              name === 'waarde' ? 'Totale waarde' : name === 'winst' ? 'Winst' : 'Start bedrag'
                            ]}
                            labelFormatter={(jaar) => `Na ${jaar} jaar`}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="waarde" 
                            stroke="#22c55e" 
                            strokeWidth={2}
                            name="waarde"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="startBedrag" 
                            stroke="#64748b" 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="startBedrag"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Strategieën vergelijking (5 jaar)</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={strategieen}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="naam" angle={-45} textAnchor="end" height={80} />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`, 'Waarde na 5 jaar']}
                          />
                          <Bar dataKey="rendement5jaar" fill="#22c55e" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ad After Calculator */}
            <div className="flex justify-center py-4">
              <GoogleAdsense slot="banner" />
            </div>

            {/* Tax Optimization */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Belasting optimalisatie scenarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Scenario</th>
                        <th className="text-center p-2">Bruto Bonus</th>
                        <th className="text-center p-2">Belasting %</th>
                        <th className="text-center p-2">Belasting €</th>
                        <th className="text-center p-2">Netto Bonus</th>
                        <th className="text-center p-2">Voordeel</th>
                      </tr>
                    </thead>
                    <tbody>
                      {belastingScenarios.map((scenario, index) => {
                        const isHuidig = 
                          (belastingVoordeel && scenario.belastingPercentage === 25) ||
                          (!belastingVoordeel && scenario.belastingPercentage === 35);
                        const basisNetto = belastingScenarios[0].netto;
                        const voordeel = scenario.netto - basisNetto;
                        
                        return (
                          <tr key={index} className={`border-b ${isHuidig ? 'bg-blue-50 dark:bg-blue-950' : ''}`}>
                            <td className="p-2 font-semibold">
                              {scenario.naam}
                              {isHuidig && <Badge variant="secondary" className="ml-2">Huidig</Badge>}
                            </td>
                            <td className="text-center p-2">€{Math.round(scenario.brutoBedrag).toLocaleString()}</td>
                            <td className="text-center p-2">{scenario.belastingPercentage}%</td>
                            <td className="text-center p-2">€{Math.round(scenario.belasting).toLocaleString()}</td>
                            <td className="text-center p-2 font-semibold">€{Math.round(scenario.netto).toLocaleString()}</td>
                            <td className="text-center p-2">
                              <span className={voordeel >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {voordeel >= 0 ? '+' : ''}€{Math.round(voordeel).toLocaleString()}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Educational Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Eindejaarsbonus optimaal benutten</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3>💰 Slimme strategieën</h3>
                    <ul>
                      <li><strong>Schulden eerst:</strong> Los dure kredieten af (8%+ rente)</li>
                      <li><strong>Noodfonds:</strong> Versterk uw financiële buffer</li>
                      <li><strong>Beleggen:</strong> Voor langetermijn vermogensopbouw</li>
                      <li><strong>Sparen:</strong> Voor korte termijn doelen</li>
                      <li><strong>Gemengd:</strong> Spreid risico over meerdere doelen</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3>⚖️ Belasting optimalisatie</h3>
                    <ul>
                      <li><strong>Timing:</strong> Soms uitstellen naar volgend jaar voordelig</li>
                      <li><strong>Spreiding:</strong> Verdeel grote bonussen over jaren</li>
                      <li><strong>Voordelige regeling:</strong> Vraag werkgever naar opties</li>
                      <li><strong>Bruto voor netto:</strong> Overweeg bruto voor netto regelingen</li>
                      <li><strong>Pensioensparen:</strong> Extra bijdrage voor belastingvoordeel</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">🎯 Prioriteitsvolgorde voor uw eindejaarsbonus:</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>🥇 Prioriteit 1:</strong>
                      <ul className="mt-1">
                        <li>• Dure schulden aflossen (&gt;6% rente)</li>
                        <li>• Noodfonds aanvullen (3-6 maanden)</li>
                        <li>• Belastingvoordelige spaarproducten</li>
                      </ul>
                    </div>
                    <div>
                      <strong>🥈 Prioriteit 2:</strong>
                      <ul className="mt-1">
                        <li>• Langetermijn beleggen (ETFs)</li>
                        <li>• Extra pensioensparen</li>
                        <li>• Huis renovaties (waardeverhogend)</li>
                      </ul>
                    </div>
                    <div>
                      <strong>🥉 Prioriteit 3:</strong>
                      <ul className="mt-1">
                        <li>• Persoonlijke doelen (vakantie)</li>
                        <li>• Luxe uitgaven</li>
                        <li>• Hobby investeringen</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

        </div>
      </section>

      {/* Bottom Ad */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <GoogleAdsense slot="banner" className="hidden lg:block" />
          <GoogleAdsense slot="banner" className="lg:hidden" />
        </div>
      </section>

      {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} />}

      <Footer />
    </div>
  );
}