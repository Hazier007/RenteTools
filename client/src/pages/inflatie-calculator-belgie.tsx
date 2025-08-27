import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import InflatieCalculator from "@/components/calculators/inflatie-calculator";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InflatieCalculatorBelgie() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeCalculator="inflatie" onCalculatorChange={() => {}} />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Inflatie Calculator België - Koopkracht & Geldontwaarding Berekenen
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken het effect van inflatie op uw koopkracht. Ontdek wat uw geld waard is over 10 jaar 
            en hoe inflatie uw spaargeld beïnvloedt.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">📊 Inflatie België 2025:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Actuele inflatie: ~2,8% (januari 2025)</li>
              <li>• ECB doelstelling: 2,0%</li>
              <li>• 10-jaars gemiddelde: 2,1%</li>
            </ul>
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
                  <i className="fas fa-trending-down mr-3 text-destructive"></i>
                  Inflatie Calculator - Bereken Koopkrachtverlies
                </CardTitle>
                <p className="text-muted-foreground">
                  Ontdek hoe inflatie uw koopkracht beïnvloedt. Bereken wat uw geld over 5, 10 of 20 jaar 
                  nog waard is en vergelijk met uw spaarrente.
                </p>
              </CardHeader>
              <CardContent>
                <InflatieCalculator />
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Wat is inflatie en hoe beïnvloedt het uw geld?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Inflatie is de stijging van het algemene prijsniveau van goederen en diensten. 
                  Dit betekent dat uw geld minder koopkracht heeft - u kunt er minder mee kopen 
                  dan vroeger.
                </p>
                
                <h3>Voorbeelden van inflatie in het dagelijks leven:</h3>
                <ul>
                  <li><strong>Brood:</strong> Kostte €2,50 in 2015, nu ~€3,20 (+28%)</li>
                  <li><strong>Benzine:</strong> Van €1,20 naar €1,65 per liter (+37%)</li>
                  <li><strong>Huur:</strong> Gemiddeld 3-4% stijging per jaar</li>
                  <li><strong>Energie:</strong> Sterk gestegen door internationale factoren</li>
                </ul>
                
                <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">⚠️ De impact op uw spaargeld:</h4>
                  <p className="text-sm">
                    Als de inflatie hoger is dan uw spaarrente, verliest u koopkracht. 
                    Bij 3% inflatie en 1% spaarrente verliest u eigenlijk 2% per jaar!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Reële rente berekenen - Inflatie vs Spaarrente</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  De reële rente is uw werkelijke rendement na aftrek van inflatie. 
                  Dit geeft het echte beeld van hoe uw vermogen groeit of krimpt.
                </p>
                
                <h3>Formule reële rente:</h3>
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <p className="font-mono text-center text-lg">
                    Reële rente = Nominale rente - Inflatie
                  </p>
                </div>
                
                <h3>Voorbeelden verschillende scenario's:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-2 text-left">Spaarrente</th>
                        <th className="border border-border p-2 text-left">Inflatie</th>
                        <th className="border border-border p-2 text-left">Reële rente</th>
                        <th className="border border-border p-2 text-left">Resultaat</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-2">2,5%</td>
                        <td className="border border-border p-2">2,0%</td>
                        <td className="border border-border p-2 text-green-600">+0,5%</td>
                        <td className="border border-border p-2">Koopkracht groeit</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2">1,5%</td>
                        <td className="border border-border p-2">2,8%</td>
                        <td className="border border-border p-2 text-red-600">-1,3%</td>
                        <td className="border border-border p-2">Koopkracht daalt</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2">3,0%</td>
                        <td className="border border-border p-2">3,0%</td>
                        <td className="border border-border p-2">0,0%</td>
                        <td className="border border-border p-2">Koopkracht stabiel</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">💡 Tips om inflatie te verslaan:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Zoek spaarrekeningen met rente hoger dan inflatie</li>
                    <li>• Overweeg beleggen voor hoger rendement</li>
                    <li>• Diversifieer uw vermogen over verschillende assets</li>
                    <li>• Let op termijnrekeningen met vaste hoge rente</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Wat is mijn geld waard over 10 jaar?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Door inflatie daalt de waarde van geld over tijd. Wat u vandaag voor €100 kunt kopen, 
                  kost over 10 jaar meer. Hier enkele voorbeelden:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg text-center">
                    <h4 className="font-semibold mb-2">2% Inflatie</h4>
                    <p className="text-2xl font-bold">€82</p>
                    <p className="text-sm">waarde na 10 jaar</p>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg text-center">
                    <h4 className="font-semibold mb-2">3% Inflatie</h4>
                    <p className="text-2xl font-bold">€74</p>
                    <p className="text-sm">waarde na 10 jaar</p>
                  </div>
                  
                  <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-center">
                    <h4 className="font-semibold mb-2">4% Inflatie</h4>
                    <p className="text-2xl font-bold">€68</p>
                    <p className="text-sm">waarde na 10 jaar</p>
                  </div>
                </div>
                
                <p className="mt-4">
                  <strong>Voorbeeld:</strong> Een broodje van €3 vandaag kost bij 3% inflatie over 10 jaar €4,03. 
                  Uw €100 van vandaag heeft dan nog maar de koopkracht van €74.
                </p>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Veelgestelde vragen over inflatie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  
                  <div>
                    <h3 className="font-semibold mb-2">Hoe wordt inflatie gemeten in België?</h3>
                    <p className="text-sm text-muted-foreground">
                      Statbel (Statistiek België) meet inflatie via de consumptieprijsindex (CPI). 
                      Deze kijkt naar prijsveranderingen van een mandje typische aankopen.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Is inflatie altijd slecht?</h3>
                    <p className="text-sm text-muted-foreground">
                      Matige inflatie (2-3%) is normaal in een gezonde economie. Te lage of te hoge 
                      inflatie kan economische problemen signaleren.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Hoe bescherm ik mijn vermogen tegen inflatie?</h3>
                    <p className="text-sm text-muted-foreground">
                      Zoek investeringen die meer opbrengen dan de inflatie: aandelen, obligaties, 
                      vastgoed, of spaarrekeningen met hoge rente.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Waarom stijgen de prijzen sneller dan mijn loon?</h3>
                    <p className="text-sm text-muted-foreground">
                      Lonen stijgen vaak trager dan prijzen, vooral bij plotselinge inflatieschokken. 
                      In België is er wel automatische indexering van lonen.
                    </p>
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