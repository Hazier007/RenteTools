import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ETFCalculatorPage() {
  const [startbedrag, setStartbedrag] = useState<number>(10000);
  const [maandelijksBedrag, setMaandelijksBedrag] = useState<number>(500);
  const [verwachtRendement, setVerwachtRendement] = useState<number>(7);
  const [looptijd, setLooptijd] = useState<number>(20);
  const [kostenRatio, setKostenRatio] = useState<number>(0.2);

  // Calculate ETF growth with monthly contributions
  const berekenETFGroei = () => {
    const maandelijksRendement = verwachtRendement / 100 / 12;
    const maanden = looptijd * 12;
    const jaarlijkeKosten = kostenRatio / 100;
    
    let waarde = startbedrag;
    const resultaten = [];
    
    for (let jaar = 0; jaar <= looptijd; jaar++) {
      const maandenVoorDitJaar = jaar * 12;
      
      // Future value with monthly contributions
      const fvAnnuity = maandelijksBedrag * (Math.pow(1 + maandelijksRendement, maandenVoorDitJaar) - 1) / maandelijksRendement;
      const fvInitial = startbedrag * Math.pow(1 + maandelijksRendement, maandenVoorDitJaar);
      const bruttoWaarde = fvInitial + fvAnnuity;
      
      // Subtract annual costs
      const nettoWaarde = bruttoWaarde * Math.pow(1 - jaarlijkeKosten, jaar);
      
      resultaten.push({
        jaar,
        waarde: Math.round(nettoWaarde),
        ingelegd: startbedrag + (maandelijksBedrag * maandenVoorDitJaar),
        winst: Math.round(nettoWaarde - (startbedrag + (maandelijksBedrag * maandenVoorDitJaar)))
      });
    }
    
    return resultaten;
  };

  const resultaten = berekenETFGroei();
  const eindresultaat = resultaten[resultaten.length - 1];
  const totaalIngelegd = startbedrag + (maandelijksBedrag * looptijd * 12);

  return (
    <div className="min-h-screen bg-background">
      <Header activeCalculator="etf" onCalculatorChange={() => {}} />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ETF Calculator België - Bereken uw Beleggingsrendement
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Simuleer de groei van uw ETF portefeuille met maandelijkse inleg. 
            Bereken uw verwachte rendement en plan uw lange termijn beleggingsstrategie.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">📊 ETF Beleggen in België:</p>
            <p className="text-sm opacity-90">
              Ontdek hoe ETF's (Exchange Traded Funds) uw vermogen kunnen laten groeien met passief beleggen.
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
                  <i className="fas fa-chart-line mr-3 text-primary"></i>
                  ETF Calculator - Simuleer uw beleggingsgroei
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken hoe uw ETF portefeuille groeit met regelmatige inleg. 
                  Inclusief kosten en belastingen voor Belgische beleggers.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Input Form */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="startbedrag">Startbedrag (€)</Label>
                      <Input
                        id="startbedrag"
                        type="number"
                        value={startbedrag}
                        onChange={(e) => setStartbedrag(Number(e.target.value))}
                        placeholder="10000"
                        data-testid="input-startbedrag"
                      />
                    </div>

                    <div>
                      <Label htmlFor="maandelijks">Maandelijkse inleg (€)</Label>
                      <Input
                        id="maandelijks"
                        type="number"
                        value={maandelijksBedrag}
                        onChange={(e) => setMaandelijksBedrag(Number(e.target.value))}
                        placeholder="500"
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
                          <SelectItem value="4">4% (Conservatief)</SelectItem>
                          <SelectItem value="5">5% (Gematigd conservatief)</SelectItem>
                          <SelectItem value="6">6% (Gematigd)</SelectItem>
                          <SelectItem value="7">7% (Historisch gemiddelde)</SelectItem>
                          <SelectItem value="8">8% (Optimistisch)</SelectItem>
                          <SelectItem value="9">9% (Zeer optimistisch)</SelectItem>
                          <SelectItem value="10">10% (Agressief)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="looptijd">Beleggingshorizon (jaren)</Label>
                      <Select value={looptijd.toString()} onValueChange={(value) => setLooptijd(Number(value))}>
                        <SelectTrigger data-testid="select-looptijd">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 jaar</SelectItem>
                          <SelectItem value="10">10 jaar</SelectItem>
                          <SelectItem value="15">15 jaar</SelectItem>
                          <SelectItem value="20">20 jaar</SelectItem>
                          <SelectItem value="25">25 jaar</SelectItem>
                          <SelectItem value="30">30 jaar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="kosten">Jaarlijkse kosten ETF (%)</Label>
                      <Select value={kostenRatio.toString()} onValueChange={(value) => setKostenRatio(Number(value))}>
                        <SelectTrigger data-testid="select-kosten">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0.1">0.1% (Zeer laag)</SelectItem>
                          <SelectItem value="0.2">0.2% (Laag)</SelectItem>
                          <SelectItem value="0.3">0.3% (Gemiddeld)</SelectItem>
                          <SelectItem value="0.5">0.5% (Hoog)</SelectItem>
                          <SelectItem value="0.7">0.7% (Zeer hoog)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Resultaten na {looptijd} jaar:</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Totaal ingelegd:</span>
                        <span className="font-semibold" data-testid="result-invested">€{totaalIngelegd.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Eindwaarde:</span>
                        <span className="font-semibold text-primary" data-testid="result-final-value">€{eindresultaat.waarde.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Totale winst:</span>
                        <span className="font-semibold text-green-600" data-testid="result-profit">€{eindresultaat.winst.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rendement:</span>
                        <span className="font-semibold" data-testid="result-return">{((eindresultaat.winst / totaalIngelegd) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Growth Chart */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">Groei van uw portefeuille</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={resultaten}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="jaar" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number) => [`€${value.toLocaleString()}`, '']}
                          labelFormatter={(jaar) => `Jaar ${jaar}`}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="waarde" 
                          stroke="#2563eb" 
                          strokeWidth={2}
                          name="Portefeuille waarde"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="ingelegd" 
                          stroke="#64748b" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          name="Totaal ingelegd"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ETF Education */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Waarom ETF's populair zijn in België</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  ETF's (Exchange Traded Funds) zijn beleggingsfondsen die aan de beurs worden verhandeld. 
                  Ze bieden een eenvoudige manier om te diversifiëren over honderden of duizenden aandelen.
                </p>
                
                <h3>Voordelen van ETF beleggen:</h3>
                <ul>
                  <li><strong>Lage kosten:</strong> Vaak minder dan 0,2% jaarlijkse kosten</li>
                  <li><strong>Diversificatie:</strong> Spreiding over vele aandelen automatisch</li>
                  <li><strong>Transparantie:</strong> U weet precies waarin u belegt</li>
                  <li><strong>Liquiditeit:</strong> Dagelijks verhandeld op de beurs</li>
                  <li><strong>Fiscaal voordeel:</strong> Geen jaarlijkse belasting op niet-gerealiseerde winsten</li>
                </ul>
                
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">💰 Fiscale behandeling in België:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Geen jaarlijkse taks op ETF's (als accumulating)</li>
                    <li>• 30% roerende voorheffing op dividenden (distributing ETF's)</li>
                    <li>• Geen belasting op kapitaalwinsten (voor particulieren)</li>
                    <li>• TOB (taks op beursverrichtingen): 0,12% voor ETF's</li>
                  </ul>
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