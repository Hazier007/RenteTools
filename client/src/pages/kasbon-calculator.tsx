import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import RateComparisonWidget from "@/components/rate-comparison";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function KasbonCalculatorPage() {
  const [bedrag, setBedrag] = useState<number>(10000);
  const [looptijd, setLooptijd] = useState<number>(1);
  const [rente, setRente] = useState<number>(3.5);

  const eindwaarde = bedrag * Math.pow(1 + rente / 100, looptijd);
  const interest = eindwaarde - bedrag;

  return (
    <div className="min-h-screen bg-background">
      <Header activeCalculator="kasbon" onCalculatorChange={() => {}} />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Kasbon Calculator België - Bereken uw Rendement
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken het rendement van kasbons en obligaties. Vergelijk verschillende 
            looptijden en vind de beste kasbon voor uw beleggingshorizon.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">💎 Kasbons voorbeelden:</p>
            <p className="text-sm opacity-90">
              Vergelijk hieronder kasbons van verschillende uitgevers en looptijden voor het beste rendement.
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
            
            {/* Live Rate Comparison */}
            <RateComparisonWidget 
              productType="kasbon"
              title="📈 Beste Kasbon Rentes België 2025"
              showTop={5}
              className="mb-8"
            />

            {/* Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  <i className="fas fa-certificate mr-3 text-primary"></i>
                  Kasbon Calculator - Bereken uw rendement
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken het totale rendement van uw kasbon investering. 
                  Vergelijk verschillende scenario's en plan uw belegging.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bedrag">Investeringsbedrag (€)</Label>
                      <Input
                        id="bedrag"
                        type="number"
                        value={bedrag}
                        onChange={(e) => setBedrag(Number(e.target.value))}
                        placeholder="10000"
                        data-testid="input-bedrag"
                      />
                    </div>

                    <div>
                      <Label htmlFor="looptijd">Looptijd (jaren)</Label>
                      <Select value={looptijd.toString()} onValueChange={(value) => setLooptijd(Number(value))}>
                        <SelectTrigger data-testid="select-looptijd">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 jaar</SelectItem>
                          <SelectItem value="2">2 jaar</SelectItem>
                          <SelectItem value="3">3 jaar</SelectItem>
                          <SelectItem value="5">5 jaar</SelectItem>
                          <SelectItem value="7">7 jaar</SelectItem>
                          <SelectItem value="10">10 jaar</SelectItem>
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
                        placeholder="3.5"
                        data-testid="input-rente"
                      />
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Resultaten:</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Investeringsbedrag:</span>
                        <span className="font-semibold" data-testid="result-investment">€{bedrag.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Eindwaarde:</span>
                        <span className="font-semibold text-primary" data-testid="result-final-value">€{eindwaarde.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Totale interest:</span>
                        <span className="font-semibold text-green-600" data-testid="result-interest">€{interest.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rendement:</span>
                        <span className="font-semibold" data-testid="result-return">{((interest / bedrag) * 100).toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Sections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Wat zijn kasbons en hoe werken ze?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Kasbons zijn schuldbewijzen uitgegeven door banken, bedrijven of overheden. 
                  Als u een kasbon koopt, leent u geld uit tegen een vaste rente voor een bepaalde periode.
                </p>
                
                <h3>Voordelen van kasbons:</h3>
                <ul>
                  <li><strong>Vaste rente:</strong> U weet vooraf wat uw rendement wordt</li>
                  <li><strong>Diversificatie:</strong> Verschillende uitgevers en looptijden beschikbaar</li>
                  <li><strong>Hoger rendement:</strong> Vaak betere rentes dan spaarrekeningen</li>
                  <li><strong>Belgische markt:</strong> Veel lokale opties beschikbaar</li>
                </ul>
                
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">💡 Tips voor kasbon beleggers:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Spreidt uw investeringen over verschillende looptijden</li>
                    <li>• Let op de kredietwaardigheid van de uitgever</li>
                    <li>• Houd rekening met inflatie bij lange looptijden</li>
                    <li>• Overweeg de fiscale behandeling (roerende voorheffing)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Types van Kasbons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Types kasbons in België</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">🏛️ Staatskasbons</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Uitgegeven door de Belgische staat</li>
                      <li>• Zeer veilig (AAA rating)</li>
                      <li>• Lagere rentes maar gegarandeerd</li>
                      <li>• Verschillende looptijden</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🏦 Bankkasbons</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Uitgegeven door Belgische banken</li>
                      <li>• Gedekt door depositogarantie</li>
                      <li>• Competitieve rentes</li>
                      <li>• Flexibele voorwaarden</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">🏢 Bedrijfskasbons</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Uitgegeven door bedrijven</li>
                      <li>• Hogere rentes mogelijk</li>
                      <li>• Meer risico betrokken</li>
                      <li>• Diversificatie belangrijk</li>
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