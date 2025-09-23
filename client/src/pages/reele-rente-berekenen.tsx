import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ReeleRenteBerekenen() {
  const [nominaleRente, setNominaleRente] = useState<string>("2.5");
  const [inflatie, setInflatie] = useState<string>("2.1");
  const [kapitaal, setKapitaal] = useState<string>("10000");
  const [jaren, setJaren] = useState<string>("10");
  
  const berekenReeleRente = () => {
    const nomRente = parseFloat(nominaleRente) || 0;
    const inflatiePerc = parseFloat(inflatie) || 0;
    const startKapitaal = parseFloat(kapitaal) || 0;
    const periode = parseInt(jaren) || 0;
    
    // Fisher formule: (1 + nominale rente) / (1 + inflatie) - 1
    const reeleRente = ((1 + nomRente/100) / (1 + inflatiePerc/100) - 1) * 100;
    
    // Toekomstige waarde
    const nominaalEindKapitaal = startKapitaal * Math.pow(1 + nomRente/100, periode);
    const koopkrachtEindKapitaal = nominaalEindKapitaal / Math.pow(1 + inflatiePerc/100, periode);
    const reelEindKapitaal = startKapitaal * Math.pow(1 + reeleRente/100, periode);
    
    // Koopkrachtverlies/winst
    const koopkrachtVerschil = koopkrachtEindKapitaal - startKapitaal;
    const koopkrachtPercentage = ((koopkrachtEindKapitaal - startKapitaal) / startKapitaal) * 100;
    
    return {
      reeleRente: reeleRente,
      nominaalEindKapitaal,
      koopkrachtEindKapitaal,
      reelEindKapitaal,
      koopkrachtVerschil,
      koopkrachtPercentage,
      jaarlijkseRealeLosser: reeleRente < 0
    };
  };
  
  const resultaat = berekenReeleRente();

  return (
    <div className="min-h-screen bg-background">
      <Header activeCalculator="overig" onCalculatorChange={() => {}} />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Reële Rente Berekenen - Inflatie vs Spaarrente Calculator
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken uw werkelijke rendement na inflatie. Ontdek of uw spaargeld koopkracht 
            wint of verliest en vergelijk de reële rente met de nominale spaarrente.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">📉 Waarom reële rente belangrijk is:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Spaarrente 2,5% - Inflatie 2,1% = 0,4% reële rente</li>
              <li>• Uw geld groeit maar koopkracht amper</li>
              <li>• Negatieve reële rente = koopkrachtverlies</li>
            </ul>
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
                  <i className="fas fa-balance-scale mr-3 text-primary"></i>
                  Reële Rente Calculator - Koopkracht Sparen Berekenen
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken uw werkelijke rendement door inflatie af te trekken van uw spaarrente. 
                  Ontdek of uw geld koopkracht wint of verliest.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="rente">Nominale rente (%)</Label>
                      <Input
                        id="rente"
                        type="number"
                        step="0.1"
                        value={nominaleRente}
                        onChange={(e) => setNominaleRente(e.target.value)}
                        placeholder="2.5"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Uw spaarrente of beleggingsrendement
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="inflatie">Inflatie (%)</Label>
                      <Input
                        id="inflatie"
                        type="number"
                        step="0.1"
                        value={inflatie}
                        onChange={(e) => setInflatie(e.target.value)}
                        placeholder="2.1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Verwachte inflatie per jaar (België 2025: ~2,1%)
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="kapitaal">Startkapitaal (€)</Label>
                      <Input
                        id="kapitaal"
                        type="number"
                        value={kapitaal}
                        onChange={(e) => setKapitaal(e.target.value)}
                        placeholder="10000"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="jaren">Beleggingsperiode (jaren)</Label>
                      <Input
                        id="jaren"
                        type="number"
                        value={jaren}
                        onChange={(e) => setJaren(e.target.value)}
                        placeholder="10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Card className={`${resultaat.jaarlijkseRealeLosser ? 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800' : 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'}`}>
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-4">Reële Rente Berekening</h3>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Nominale rente:</span>
                              <p className="font-semibold text-lg">{parseFloat(nominaleRente || "0").toFixed(2)}%</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Inflatie:</span>
                              <p className="font-semibold text-lg">{parseFloat(inflatie || "0").toFixed(2)}%</p>
                            </div>
                          </div>
                          
                          <div className="border-t pt-3">
                            <div className="text-center">
                              <span className="text-muted-foreground">Reële rente:</span>
                              <p className={`font-bold text-2xl ${resultaat.jaarlijkseRealeLosser ? 'text-red-600' : 'text-green-600'}`}>
                                {resultaat.reeleRente.toFixed(2)}%
                              </p>
                              <p className={`text-sm ${resultaat.jaarlijkseRealeLosser ? 'text-red-600' : 'text-green-600'}`}>
                                {resultaat.jaarlijkseRealeLosser ? '📉 Koopkrachtverlies' : '📈 Koopkrachtwinst'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-primary/5">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-4">Projectie na {jaren} jaar</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span>Startkapitaal:</span>
                            <span>€{parseFloat(kapitaal || "0").toLocaleString('nl-BE')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Nominaal eindkapitaal:</span>
                            <span>€{resultaat.nominaalEindKapitaal.toLocaleString('nl-BE', {maximumFractionDigits: 0})}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Koopkracht eindkapitaal:</span>
                            <span className="font-semibold">€{resultaat.koopkrachtEindKapitaal.toLocaleString('nl-BE', {maximumFractionDigits: 0})}</span>
                          </div>
                          <div className="border-t pt-3">
                            <div className="flex justify-between">
                              <span className={resultaat.koopkrachtVerschil >= 0 ? 'text-green-600' : 'text-red-600'}>
                                Koopkracht {resultaat.koopkrachtVerschil >= 0 ? 'winst' : 'verlies'}:
                              </span>
                              <span className={`font-bold ${resultaat.koopkrachtVerschil >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {resultaat.koopkrachtVerschil >= 0 ? '+' : ''}€{resultaat.koopkrachtVerschil.toLocaleString('nl-BE', {maximumFractionDigits: 0})}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Percentage:</span>
                              <span className={resultaat.koopkrachtVerschil >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {resultaat.koopkrachtPercentage >= 0 ? '+' : ''}{resultaat.koopkrachtPercentage.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Sections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Wat is Reële Rente? - Inflatie vs Spaarrente Uitleg</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  De reële rente is uw werkelijke rendement na aftrek van inflatie. Het toont 
                  of uw geld daadwerkelijk koopkracht wint of verliest in de tijd.
                </p>
                
                <h3>Fisher Formule voor Reële Rente:</h3>
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <p className="font-mono text-center text-lg">
                    Reële Rente = ((1 + Nominale Rente) ÷ (1 + Inflatie)) - 1
                  </p>
                  <p className="text-sm text-center mt-2 text-muted-foreground">
                    Vereenvoudigd: Nominale Rente - Inflatie (bij lage percentages)
                  </p>
                </div>
                
                <h3>Praktijkvoorbeelden Reële Rente:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Positieve Reële Rente</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Spaarrente: 3,0%</li>
                      <li>• Inflatie: 2,0%</li>
                      <li>• Reële rente: ~1,0%</li>
                      <li>• ✅ Koopkracht stijgt</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">❌ Negatieve Reële Rente</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Spaarrente: 1,5%</li>
                      <li>• Inflatie: 3,0%</li>
                      <li>• Reële rente: -1,5%</li>
                      <li>• ❌ Koopkracht daalt</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">⚠️ Waarschuwing bij Negatieve Reële Rente:</h4>
                  <p className="text-sm">
                    Als uw spaarrente lager is dan de inflatie, verliest uw geld koopkracht. 
                    €10.000 kan over 10 jaar minder waard zijn dan vandaag, ondanks rente-inkomsten.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Koopkracht Sparen Berekenen - Strategieën tegen Inflatie</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Om uw koopkracht te beschermen tegen inflatie, moet uw rendement hoger zijn 
                  dan de inflatie. Hier zijn strategieën om dit te bereiken.
                </p>
                
                <h3>Bescherming tegen Koopkrachtverlies:</h3>
                <ul>
                  <li><strong>Hoogrentende spaarrekeningen:</strong> Zoek beste tarieven</li>
                  <li><strong>Termijnrekeningen:</strong> Vastleggen van hogere rentes</li>
                  <li><strong>Staatsobligaties:</strong> Inflatie-gelinkte bonds</li>
                  <li><strong>Beleggingen:</strong> Aandelen hebben historisch inflatie verslagen</li>
                  <li><strong>Vastgoed:</strong> Eigendom stijgt vaak mee met inflatie</li>
                </ul>
                
                <h3>Historische Inflatie België:</h3>
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">📊 Gemiddelde Inflatie per Periode:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 2020-2024: 3,2% (hoog door energiecrisis)</li>
                    <li>• 2010-2019: 1,4% (lage inflatie periode)</li>
                    <li>• 2000-2009: 2,0% (voor financiële crisis)</li>
                    <li>• Lange termijn gemiddelde: ~2,0%</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Praktische Tips Koopkracht Behouden:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Spreiding: Deel geld over sparen, beleggen en vastgoed</li>
                    <li>• Flexibiliteit: Pas strategie aan bij veranderende inflatie</li>
                    <li>• Lange termijn denken: Inflatie fluctueert, gemiddelde telt</li>
                    <li>• Regelmatig herbekijken: Check jaarlijks uw reële rendement</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Veelgestelde Vragen - Reële Rente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Waarom is reële rente belangrijker dan nominale rente?</h3>
                    <p className="text-sm text-muted-foreground">
                      Reële rente toont uw werkelijke koopkracht. 5% rente lijkt goed, maar bij 6% inflatie 
                      verliest u eigenlijk koopkracht. Alleen reële rente toont de echte waarde-ontwikkeling.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Hoe kan ik negatieve reële rente vermijden?</h3>
                    <p className="text-sm text-muted-foreground">
                      Zoek spaarrekeningen met rente boven inflatie, of overweeg beleggingen in aandelen/vastgoed 
                      die historisch beter presteren dan inflatie op lange termijn.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Hoe voorspel ik toekomstige inflatie?</h3>
                    <p className="text-sm text-muted-foreground">
                      Niemand kan inflatie perfect voorspellen. Gebruik ECB-doelstelling (~2%), 
                      historische gemiddelden, en overheidsvoorspellingen als uitgangspunt.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Is mijn geld veilig bij negatieve reële rente?</h3>
                    <p className="text-sm text-muted-foreground">
                      Uw geld is nominaal veilig, maar koopkracht daalt. €1000 blijft €1000, 
                      maar kan minder kopen door inflatie. Dit is een geleidelijk proces.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <GoogleAdsense slot="rectangle" />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Gerelateerde Calculators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/inflatie-calculator-belgie">
                      <i className="fas fa-chart-line mr-2"></i>
                      Inflatie Calculator
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/geldontwaarding-calculator">
                      <i className="fas fa-coins mr-2"></i>
                      Geldontwaarding
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/hoogste-spaarrente-belgie">
                      <i className="fas fa-piggy-bank mr-2"></i>
                      Spaarrente Vergelijken
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}