import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function VakantiegeldSparenCalculatorPage() {
  const [brutoLoon, setBrutoLoon] = useState<number>(3500);
  const [werkRegimenNaam, setWerkRegime] = useState<string>("voltijds");
  const [vakantiegeldDoel, setVakantiegeldDoel] = useState<string>("vervroegd");
  const [huidigeReserve, setHuidigeReserve] = useState<number>(2000);
  const [extraMaandelijks, setExtraMaandelijks] = useState<number>(100);
  const [spaarRente, setSpaarRente] = useState<number>(2.5);

  // Belgian vacation pay calculation (dubbel vakantiegeld)
  const berekenVakantiegeld = () => {
    // Base calculation: 92% of monthly gross salary (for full-time)
    const werkRegimes: Record<string, number> = {
      "voltijds": 1.0,
      "4/5de": 0.8,
      "halftijds": 0.5,
      "3/5de": 0.6
    };
    
    const werkRegimeMultiplier = werkRegimes[werkRegimenNaam] || 1.0;
    const basisVakantiegeld = (brutoLoon * 0.92) * werkRegimeMultiplier;
    
    // Additional vacation pay from some employers (varies)
    const extraVakantiegeld = brutoLoon * 0.08 * werkRegimeMultiplier; // Some employers give extra
    
    const totaalVakantiegeld = basisVakantiegeld + extraVakantiegeld;
    
    // Net vacation pay (rough estimation after taxes - vacation pay is often taxed favorably)
    const nettoVakantiegeld = totaalVakantiegeld * 0.75; // Approximately 25% tax
    
    return {
      bruto: totaalVakantiegeld,
      netto: nettoVakantiegeld,
      basis: basisVakantiegeld,
      extra: extraVakantiegeld
    };
  };

  const vakantiegeld = berekenVakantiegeld();

  // Calculate different vacation savings strategies
  const berekenSpaarStrategieen = () => {
    const strategieen = [];
    
    // Strategy 1: Save entire vacation pay
    const strategie1 = {
      naam: "Volledig vakantiegeld sparen",
      inleg: vakantiegeld.netto,
      maandelijks: 0,
      beschrijving: "Leg hele vakantiegeld opzij voor volgende jaar"
    };
    
    // Strategy 2: Save vacation pay + monthly extra
    const strategie2 = {
      naam: "Vakantiegeld + maandelijks extra",
      inleg: vakantiegeld.netto,
      maandelijks: extraMaandelijks,
      beschrijving: "Vakantiegeld + €" + extraMaandelijks + " per maand extra"
    };
    
    // Strategy 3: Monthly spread of vacation pay
    const maandelijksVerdeling = vakantiegeld.netto / 12;
    const strategie3 = {
      naam: "Maandelijks verdelen",
      inleg: 0,
      maandelijks: maandelijksVerdeling,
      beschrijving: "Vakantiegeld verdelen over 12 maanden"
    };
    
    strategieen.push(strategie1, strategie2, strategie3);
    
    // Calculate growth for each strategy
    return strategieen.map(strategie => {
      const jaarlijkseInleg = strategie.inleg + (strategie.maandelijks * 12);
      const groeiNa1Jaar = (strategie.inleg + huidigeReserve) * (1 + spaarRente / 100) + 
                           (strategie.maandelijks * 12 * (1 + spaarRente / 200)); // Rough mid-year calculation
      const groeiNa5Jaar = berekenSamengesteldeGroei(
        strategie.inleg + huidigeReserve, 
        strategie.maandelijks, 
        spaarRente, 
        5
      );
      
      return {
        ...strategie,
        jaarlijkseInleg,
        na1jaar: groeiNa1Jaar,
        na5jaar: groeiNa5Jaar
      };
    });
  };

  // Helper function for compound growth calculation
  const berekenSamengesteldeGroei = (startBedrag: number, maandelijks: number, rente: number, jaren: number) => {
    const maandRente = rente / 100 / 12;
    const maanden = jaren * 12;
    
    // Future value of initial amount
    const fvInitial = startBedrag * Math.pow(1 + maandRente, maanden);
    
    // Future value of monthly contributions
    const fvAnnuity = maandelijks > 0 ? 
      maandelijks * (Math.pow(1 + maandRente, maanden) - 1) / maandRente : 0;
    
    return fvInitial + fvAnnuity;
  };

  const spaarStrategieen = berekenSpaarStrategieen();

  // Vacation goals and costs
  const vakantieDoelen: Record<string, { naam: string; kosten: number; beschrijving: string }> = {
    "vervroegd": { naam: "Vervroegd pensioen jaar", kosten: 50000, beschrijving: "1 jaar vroeger stoppen" },
    "wereldreis": { naam: "Wereldreis", kosten: 15000, beschrijving: "6 maanden reizen" },
    "luxevakantie": { naam: "Luxe vakantie", kosten: 5000, beschrijving: "Premium resort 2 weken" },
    "auto": { naam: "Nieuwe auto", kosten: 25000, beschrijving: "Upgrade naar betere wagen" },
    "huis": { naam: "Huis renovatie", kosten: 30000, beschrijving: "Grote verbouwing" }
  };

  const geselecteerdDoel = vakantieDoelen[vakantiegeldDoel];

  // Calculate timeline to reach goal
  const berekenDoelTimeline = () => {
    const jaarlijkseSparing = vakantiegeld.netto + (extraMaandelijks * 12);
    const doelBedrag = geselecteerdDoel.kosten;
    const tekort = Math.max(0, doelBedrag - huidigeReserve);
    const jarenNodig = jaarlijkseSparing > 0 ? Math.ceil(tekort / jaarlijkseSparing) : 999;
    
    return {
      doelBedrag,
      tekort,
      jarenNodig,
      jaarlijkseSparing
    };
  };

  const doelTimeline = berekenDoelTimeline();

  // Generate year-by-year progression
  const groeiProjectie = () => {
    const jaren = Math.min(10, doelTimeline.jarenNodig + 2);
    const projectie = [];
    
    for (let jaar = 0; jaar <= jaren; jaar++) {
      const waarde = berekenSamengesteldeGroei(
        huidigeReserve, 
        (vakantiegeld.netto / 12) + extraMaandelijks, 
        spaarRente, 
        jaar
      );
      
      projectie.push({
        jaar,
        waarde: Math.round(waarde),
        doelBereikt: waarde >= geselecteerdDoel.kosten
      });
    }
    
    return projectie;
  };

  const projectie = groeiProjectie();

  return (
    <div className="min-h-screen bg-background">
      <Header activeCalculator="vakantiegeld-sparen" onCalculatorChange={() => {}} />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Vakantiegeld Sparen Calculator België - Dubbel Vakantiegeld Optimaliseren
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken uw vakantiegeld en ontdek slimme spaarstrategieën om uw dubbel vakantiegeld 
            optimaal te benutten voor toekomstige doelen en dromen.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">🏖️ Vakantiegeld slim inzetten:</p>
            <p className="text-sm opacity-90">
              Plan wat u doet met uw vakantiegeld: direct uitgeven, sparen voor grote doelen, of spreiden over het jaar.
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
                  <i className="fas fa-umbrella-beach mr-3 text-primary"></i>
                  Vakantiegeld Sparen Calculator - Optimaliseer uw dubbel vakantiegeld
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken uw vakantiegeld en ontdek de beste spaarstrategie om uw vakantiegeld 
                  optimaal te benutten voor toekomstige doelen.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Input Form */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-600">💼 Uw situatie</h3>
                    
                    <div>
                      <Label htmlFor="brutoloon">Bruto maandloon (€)</Label>
                      <Input
                        id="brutoloon"
                        type="number"
                        value={brutoLoon}
                        onChange={(e) => setBrutoLoon(Number(e.target.value))}
                        placeholder="3500"
                        data-testid="input-brutoloon"
                      />
                    </div>

                    <div>
                      <Label htmlFor="werkregime">Werkregime</Label>
                      <Select value={werkRegimenNaam} onValueChange={setWerkRegime}>
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
                      <Label htmlFor="doel">Spaardoel</Label>
                      <Select value={vakantiegeldDoel} onValueChange={setVakantiegeldDoel}>
                        <SelectTrigger data-testid="select-doel">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vervroegd">Vervroegd pensioen (€50.000)</SelectItem>
                          <SelectItem value="wereldreis">Wereldreis (€15.000)</SelectItem>
                          <SelectItem value="luxevakantie">Luxe vakantie (€5.000)</SelectItem>
                          <SelectItem value="auto">Nieuwe auto (€25.000)</SelectItem>
                          <SelectItem value="huis">Huis renovatie (€30.000)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="reserve">Huidige reserve (€)</Label>
                      <Input
                        id="reserve"
                        type="number"
                        value={huidigeReserve}
                        onChange={(e) => setHuidigeReserve(Number(e.target.value))}
                        placeholder="2000"
                        data-testid="input-reserve"
                      />
                    </div>

                    <div>
                      <Label htmlFor="extra">Extra maandelijks sparen (€)</Label>
                      <Input
                        id="extra"
                        type="number"
                        value={extraMaandelijks}
                        onChange={(e) => setExtraMaandelijks(Number(e.target.value))}
                        placeholder="100"
                        data-testid="input-extra"
                      />
                    </div>

                    <div>
                      <Label htmlFor="rente">Verwachte spaarrente (%)</Label>
                      <Input
                        id="rente"
                        type="number"
                        step="0.1"
                        value={spaarRente}
                        onChange={(e) => setSpaarRente(Number(e.target.value))}
                        placeholder="2.5"
                        data-testid="input-rente"
                      />
                    </div>
                  </div>

                  {/* Vacation Pay Calculation */}
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">🏖️ Uw vakantiegeld 2025:</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Bruto maandloon:</span>
                        <span className="font-semibold">€{brutoLoon.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Werkregime:</span>
                        <span className="font-semibold">{werkRegimenNaam}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Basis vakantiegeld (92%):</span>
                        <span className="font-semibold" data-testid="result-basis">€{Math.round(vakantiegeld.basis).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Extra vakantiegeld:</span>
                        <span className="font-semibold" data-testid="result-extra">€{Math.round(vakantiegeld.extra).toLocaleString()}</span>
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span>Bruto vakantiegeld:</span>
                          <span className="font-semibold text-blue-600" data-testid="result-bruto">€{Math.round(vakantiegeld.bruto).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">Netto vakantiegeld:</span>
                          <span className="font-bold text-primary text-lg" data-testid="result-netto">€{Math.round(vakantiegeld.netto).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-background rounded">
                      <h4 className="font-semibold mb-2">🎯 Uw spaardoel:</h4>
                      <p className="text-sm mb-2">{geselecteerdDoel.naam}</p>
                      <p className="text-xs text-muted-foreground mb-2">{geselecteerdDoel.beschrijving}</p>
                      <div className="flex justify-between">
                        <span className="text-sm">Benodigde bedrag:</span>
                        <span className="font-semibold">€{geselecteerdDoel.kosten.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Nog te sparen:</span>
                        <span className="font-semibold text-orange-600">€{Math.max(0, doelTimeline.tekort).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Tijd nodig:</span>
                        <span className="font-semibold" data-testid="result-years">{doelTimeline.jarenNodig} jaar</span>
                      </div>
                    </div>
                  </div>

                  {/* Strategy Comparison */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-green-600">💰 Spaar strategieën vergelijken</h3>
                    
                    {spaarStrategieen.map((strategie, index) => (
                      <div key={index} className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">{strategie.naam}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{strategie.beschrijving}</p>
                        
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Jaarlijkse inleg:</span>
                            <span className="font-semibold">€{Math.round(strategie.jaarlijkseInleg).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Na 1 jaar:</span>
                            <span className="font-semibold">€{Math.round(strategie.na1jaar).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Na 5 jaar:</span>
                            <span className="font-semibold text-green-600">€{Math.round(strategie.na5jaar).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h4 className="font-semibold mb-3">Groei naar uw doel</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={projectie}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="jaar" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number) => [`€${value.toLocaleString()}`, 'Totale waarde']}
                            labelFormatter={(jaar) => `Na ${jaar} jaar`}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="waarde" 
                            stroke="#22c55e" 
                            strokeWidth={2}
                            name="waarde"
                          />
                          {/* Goal line */}
                          <Line 
                            type="monotone" 
                            dataKey={() => geselecteerdDoel.kosten}
                            stroke="#ef4444" 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="doel"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Strategieën vergelijking (5 jaar)</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={spaarStrategieen}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="naam" angle={-45} textAnchor="end" height={80} />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`, 'Waarde na 5 jaar']}
                          />
                          <Bar dataKey="na5jaar" fill="#22c55e" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Educational Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Alles over vakantiegeld in België</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3>🏖️ Hoe werkt vakantiegeld?</h3>
                    <ul>
                      <li><strong>Uitbetaling:</strong> Meestal in mei/juni</li>
                      <li><strong>Berekening:</strong> 92% van bruto maandloon</li>
                      <li><strong>Extra:</strong> Sommige werkgevers geven meer (tot 100%)</li>
                      <li><strong>Belasting:</strong> Vaak gunstiger belast dan gewoon loon</li>
                      <li><strong>Automatisch:</strong> Recht op vakantiegeld is wettelijk geregeld</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3>💡 Slimme strategieën</h3>
                    <ul>
                      <li><strong>Direct sparen:</strong> Leg volledig bedrag weg voor doelen</li>
                      <li><strong>Spreiden:</strong> Verdeel over 12 maanden voor budget</li>
                      <li><strong>Investeren:</strong> Beleg voor langetermijn groei</li>
                      <li><strong>Schulden aflossen:</strong> Verminder dure kredieten eerst</li>
                      <li><strong>Noodfonds:</strong> Versterk uw financiële buffer</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">🎯 Populaire doelen voor vakantiegeld:</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>Korte termijn (1-2 jaar):</strong>
                      <ul className="mt-1">
                        <li>• Luxe vakantie</li>
                        <li>• Nieuwe auto</li>
                        <li>• Huis verbeteringen</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Middellange termijn (3-7 jaar):</strong>
                      <ul className="mt-1">
                        <li>• Huis renovatie</li>
                        <li>• Kinderen studies</li>
                        <li>• Grote wereldreis</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Lange termijn (8+ jaar):</strong>
                      <ul className="mt-1">
                        <li>• Vervroegd pensioen</li>
                        <li>• Tweede woning</li>
                        <li>• Financiële onafhankelijkheid</li>
                      </ul>
                    </div>
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