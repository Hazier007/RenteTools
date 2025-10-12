import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import RateComparisonWidget from "@/components/rate-comparison";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function TermijnrekeningCalculatorPage() {
  const seoConfig = getSeoConfig("termijnrekening-calculator");
  useSeoTags("termijnrekening-calculator");
  const [bedrag, setBedrag] = useState<number>(25000);
  const [looptijd, setLooptijd] = useState<number>(12);
  const [renteType, setRenteType] = useState<string>("vast");
  const [rente, setRente] = useState<number>(3.2);
  const [belasting, setBelasting] = useState<boolean>(true);

  // Calculate compound interest for term deposit
  const berekenTermijnrekening = () => {
    const jaarlijkseRente = rente / 100;
    const jaren = looptijd / 12;
    
    let bruttoRendement = 0;
    let nettoRendement = 0;
    let eindwaarde = bedrag;
    
    if (renteType === "vast") {
      // Simple interest for term deposits (usually paid at maturity)
      bruttoRendement = bedrag * jaarlijkseRente * jaren;
      eindwaarde = bedrag + bruttoRendement;
    } else {
      // Compound interest for variable rates
      eindwaarde = bedrag * Math.pow(1 + jaarlijkseRente, jaren);
      bruttoRendement = eindwaarde - bedrag;
    }
    
    // Belgian tax calculation (30% roerende voorheffing)
    const belastingVrij = 980; // 2025 threshold
    const belastbareRente = Math.max(0, bruttoRendement - belastingVrij);
    const verschuldigdeBelasting = belasting ? belastbareRente * 0.30 : 0;
    nettoRendement = bruttoRendement - verschuldigdeBelasting;
    const nettoEindwaarde = bedrag + nettoRendement;
    
    return {
      eindwaarde,
      bruttoRendement,
      nettoRendement,
      nettoEindwaarde,
      verschuldigdeBelasting,
      effectieveRente: (nettoRendement / bedrag / jaren) * 100
    };
  };

  const resultaat = berekenTermijnrekening();
  const jaren = looptijd / 12;

  // Generate comparison data for different terms
  const termijnVergelijking = [12, 24, 36, 48, 60].map(maanden => {
    const tempJaren = maanden / 12;
    const tempRente = rente + (maanden > 24 ? 0.2 : 0); // Higher rates for longer terms
    let tempEindwaarde = bedrag;
    
    if (renteType === "vast") {
      const tempRendement = bedrag * (tempRente / 100) * tempJaren;
      tempEindwaarde = bedrag + tempRendement;
    } else {
      tempEindwaarde = bedrag * Math.pow(1 + tempRente / 100, tempJaren);
    }
    
    return {
      looptijd: `${maanden}m`,
      rendement: tempEindwaarde - bedrag,
      eindwaarde: tempEindwaarde,
      rente: tempRente
    };
  });

  // Historical rate trends (example data)
  const renteTrends = [
    { jaar: 2020, rente: 1.2 },
    { jaar: 2021, rente: 1.5 },
    { jaar: 2022, rente: 2.1 },
    { jaar: 2023, rente: 2.8 },
    { jaar: 2024, rente: 3.2 },
    { jaar: 2025, rente: 3.2 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Termijnrekening Calculator België - Deposito Rendement Berekenen
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken het rendement van uw termijnrekening en vergelijk de beste deposito tarieven van 
            Belgische banken. Ontdek welke looptijd het meeste oplevert voor uw spaargeld.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">📊 Actuele termijnrekening tarieven:</p>
            <p className="text-sm opacity-90">
              Vergelijk hieronder de beste deposito rentes van alle grote Belgische banken voor verschillende looptijden.
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
            
            {/* Live Rate Comparison */}
            <RateComparisonWidget 
              productType="deposito"
              title="🏆 Beste Termijnrekening Tarieven België 2025"
              showTop={6}
              className="mb-8"
            />

            {/* Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  <i className="fas fa-university mr-3 text-primary"></i>
                  Termijnrekening Calculator - Bereken uw deposito rendement
                </CardTitle>
                <p className="text-muted-foreground">
                  Simuleer verschillende termijnrekening scenario's en ontdek welke looptijd 
                  en bank het beste rendement biedt voor uw inleg.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Input Form */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bedrag">Inlegbedrag (€)</Label>
                      <Input
                        id="bedrag"
                        type="number"
                        value={bedrag}
                        onChange={(e) => setBedrag(Number(e.target.value))}
                        placeholder="25000"
                        data-testid="input-bedrag"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Minimum meestal €500 - €1.000
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="looptijd">Looptijd</Label>
                      <Select value={looptijd.toString()} onValueChange={(value) => setLooptijd(Number(value))}>
                        <SelectTrigger data-testid="select-looptijd">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 maanden</SelectItem>
                          <SelectItem value="6">6 maanden</SelectItem>
                          <SelectItem value="9">9 maanden</SelectItem>
                          <SelectItem value="12">1 jaar</SelectItem>
                          <SelectItem value="18">1,5 jaar</SelectItem>
                          <SelectItem value="24">2 jaar</SelectItem>
                          <SelectItem value="36">3 jaar</SelectItem>
                          <SelectItem value="48">4 jaar</SelectItem>
                          <SelectItem value="60">5 jaar</SelectItem>
                          <SelectItem value="84">7 jaar</SelectItem>
                          <SelectItem value="120">10 jaar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="rentetype">Type rente</Label>
                      <Select value={renteType} onValueChange={setRenteType}>
                        <SelectTrigger data-testid="select-rentetype">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vast">Vaste rente</SelectItem>
                          <SelectItem value="variabel">Variabele rente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="rente">Jaarlijkse rente (%)</Label>
                      <Input
                        id="rente"
                        type="number"
                        step="0.1"
                        value={rente}
                        onChange={(e) => setRente(Number(e.target.value))}
                        placeholder="3.2"
                        data-testid="input-rente"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Huidige markt: 2.8% - 4.2% afhankelijk van looptijd
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="belasting"
                        checked={belasting}
                        onChange={(e) => setBelasting(e.target.checked)}
                        className="rounded"
                        data-testid="checkbox-belasting"
                      />
                      <Label htmlFor="belasting" className="text-sm">
                        Roerende voorheffing toepassen (30%)
                      </Label>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Uw termijnrekening resultaat:</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Inleg:</span>
                        <span className="font-semibold" data-testid="result-principal">€{bedrag.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Looptijd:</span>
                        <span className="font-semibold">{looptijd} maanden ({jaren.toFixed(1)} jaar)</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Bruto rendement:</span>
                        <span className="font-semibold text-blue-600" data-testid="result-gross">€{Math.round(resultaat.bruttoRendement).toLocaleString()}</span>
                      </div>
                      
                      {belasting && (
                        <div className="flex justify-between">
                          <span>Belasting (30%):</span>
                          <span className="font-semibold text-red-600" data-testid="result-tax">-€{Math.round(resultaat.verschuldigdeBelasting).toLocaleString()}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span>Netto rendement:</span>
                        <span className="font-semibold text-green-600" data-testid="result-net">€{Math.round(resultaat.nettoRendement).toLocaleString()}</span>
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="font-semibold">Totale uitkering:</span>
                          <span className="font-bold text-primary text-lg" data-testid="result-total">€{Math.round(resultaat.nettoEindwaarde).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Effectieve rente:</span>
                        <span className="font-semibold" data-testid="result-effective">{resultaat.effectieveRente.toFixed(2)}% per jaar</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-background rounded">
                      <h4 className="font-semibold mb-2">💡 Advies:</h4>
                      {jaren < 1 ? (
                        <p className="text-sm text-orange-600">
                          ⚡ Korte termijn: Goed voor tijdelijke liquiditeit, maar lagere rentes.
                        </p>
                      ) : jaren <= 2 ? (
                        <p className="text-sm text-blue-600">
                          👍 Gemiddelde termijn: Goede balans tussen flexibiliteit en rendement.
                        </p>
                      ) : (
                        <p className="text-sm text-green-600">
                          🎯 Lange termijn: Hoogste rentes, maar geld vastgezet voor {jaren.toFixed(1)} jaar.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Charts */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Vergelijking verschillende looptijden</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={termijnVergelijking}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="looptijd" />
                            <YAxis />
                            <Tooltip 
                              formatter={(value: number, name: string) => [
                                `€${Math.round(value).toLocaleString()}`,
                                name === 'rendement' ? 'Rendement' : 'Eindwaarde'
                              ]}
                            />
                            <Bar dataKey="rendement" fill="#22c55e" name="rendement" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Rente trend (2020-2025)</h4>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={renteTrends}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="jaar" />
                            <YAxis />
                            <Tooltip 
                              formatter={(value: number) => [`${value}%`, 'Gemiddelde rente']}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="rente" 
                              stroke="#2563eb" 
                              strokeWidth={2}
                              name="rente"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ad After Calculator */}
            <div className="flex justify-center py-4">
              <GoogleAdsense slot="banner" />
            </div>

            {/* Educational Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Termijnrekening vs andere spaarproducten</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💎 Termijnrekening</h4>
                    <ul className="text-sm space-y-1">
                      <li><strong>Voordelen:</strong></li>
                      <li>• Vaste, gegarandeerde rente</li>
                      <li>• Hoger dan spaarrekeningen</li>
                      <li>• Gedekt door depositogarantie</li>
                      <li>• Geen kosten of risico</li>
                      <li><strong>Nadelen:</strong></li>
                      <li>• Geld vastgezet voor periode</li>
                      <li>• Boete bij vroegtijdige opname</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">🏦 Spaarrekening</h4>
                    <ul className="text-sm space-y-1">
                      <li><strong>Voordelen:</strong></li>
                      <li>• Volledige flexibiliteit</li>
                      <li>• Geen minimumbedrag</li>
                      <li>• Dagelijks beschikbaar</li>
                      <li>• Getrouwheidspremie mogelijk</li>
                      <li><strong>Nadelen:</strong></li>
                      <li>• Lagere rentes</li>
                      <li>• Variabele rente risico</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">📈 Beleggen</h4>
                    <ul className="text-sm space-y-1">
                      <li><strong>Voordelen:</strong></li>
                      <li>• Hoger potentieel rendement</li>
                      <li>• Flexibiliteit in keuzes</li>
                      <li>• Inflatie bescherming</li>
                      <li>• Diversificatie mogelijk</li>
                      <li><strong>Nadelen:</strong></li>
                      <li>• Risico van verlies</li>
                      <li>• Geen garanties</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips and Strategy */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Slimme termijnrekening strategieën</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <h3>💡 Tips voor optimaal gebruik van termijnrekeningen:</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4>🎯 Ladder Strategie</h4>
                    <p className="text-sm">
                      Verdeel uw geld over verschillende looptijden. Bijvoorbeeld: 25% voor 1 jaar, 
                      25% voor 2 jaar, 25% voor 3 jaar, 25% voor 5 jaar. Zo profiteert u van 
                      verschillende rentetarieven en heeft u regelmatig toegang tot uw geld.
                    </p>
                  </div>
                  
                  <div>
                    <h4>📊 Timing de Markt</h4>
                    <p className="text-sm">
                      In een stijgende renteomgeving: kies kortere looptijden. In een dalende 
                      renteomgeving: zet in op langere looptijden om de huidige hoge rentes vast te leggen.
                    </p>
                  </div>

                  <div>
                    <h4>🏦 Bank Spreiding</h4>
                    <p className="text-sm">
                      Spreid over verschillende banken voor depositogarantie optimalisatie. 
                      Elk account is gedekt tot €100.000 per bank per persoon.
                    </p>
                  </div>

                  <div>
                    <h4>💰 Belasting Optimalisatie</h4>
                    <p className="text-sm">
                      Met €980 belastingvrije rente per jaar kunt u strategisch kiezen wanneer 
                      uw termijnrekeningen aflopen om binnen deze vrijstelling te blijven.
                    </p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">⚠️ Let op bij vroegtijdige opname:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• De meeste banken rekenen een boete (meestal 3-6 maanden rente)</li>
                    <li>• Sommige banken staan geen vroegtijdige opname toe</li>
                    <li>• Plan daarom alleen geld in dat u echt kunt missen</li>
                    <li>• Houd altijd een noodfonds op een gewone spaarrekening</li>
                  </ul>
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