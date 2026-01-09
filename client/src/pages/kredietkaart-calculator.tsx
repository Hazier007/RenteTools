import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import RateComparisonWidget from "@/components/rate-comparison";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function KredietkaartCalculatorPage() {
  const seoConfig = getSeoConfig("kredietkaart-calculator");
  useSeoTags("kredietkaart-calculator");

  const [schuld, setSchuld] = useState<number>(5000);
  const [rente, setRente] = useState<number>(18.5);
  const [maandelijksBedrag, setMaandelijksBedrag] = useState<number>(200);
  const [minimumBetaling, setMinimumBetaling] = useState<number>(2.5);
  const [extraAankopen, setExtraAankopen] = useState<number>(0);

  // Calculate payoff scenarios
  const berekenAfbetaling = (bedrag: number) => {
    const maandelijksRente = rente / 100 / 12;
    let restschuld = schuld;
    let maanden = 0;
    let totaleRente = 0;
    const schema = [];

    while (restschuld > 1 && maanden < 600) { // Max 50 years protection
      const renteVandezeMaand = restschuld * maandelijksRente;
      const aflossing = Math.min(bedrag - renteVandezeMaand, restschuld);
      
      if (aflossing <= 0) {
        // Can't pay off with this amount
        return { maanden: 'Onmogelijk', totaleRente: 'Onmogelijk', schema: [] };
      }

      restschuld -= aflossing;
      totaleRente += renteVandezeMaand;
      maanden++;

      // Add extra purchases monthly
      restschuld += extraAankopen;

      if (maanden % 12 === 0 || restschuld <= 1) {
        schema.push({
          jaar: Math.floor(maanden / 12),
          maand: maanden,
          restschuld: Math.max(0, restschuld),
          totaalBetaald: (bedrag * maanden) - restschuld
        });
      }
    }

    return { 
      maanden, 
      totaleRente, 
      schema,
      totaalBetaald: bedrag * maanden
    };
  };

  const minimumBetalingBedrag = Math.max(schuld * (minimumBetaling / 100), 25);
  const gekozenBetalingResultaat = berekenAfbetaling(maandelijksBedrag);
  const minimumBetalingResultaat = berekenAfbetaling(minimumBetalingBedrag);

  // Compare scenarios for chart
  const vergelijkingData = [
    {
      scenario: 'Gekozen betaling',
      maanden: typeof gekozenBetalingResultaat.maanden === 'number' ? gekozenBetalingResultaat.maanden : 0,
      totaleKosten: typeof gekozenBetalingResultaat.totaleRente === 'number' ? 
        schuld + gekozenBetalingResultaat.totaleRente : 0
    },
    {
      scenario: 'Minimum betaling',
      maanden: typeof minimumBetalingResultaat.maanden === 'number' ? minimumBetalingResultaat.maanden : 0,
      totaleKosten: typeof minimumBetalingResultaat.totaleRente === 'number' ? 
        schuld + minimumBetalingResultaat.totaleRente : 0
    }
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
            Kredietkaart Calculator België - Bereken uw Schuld
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken hoe lang het duurt om uw kredietkaartschuld af te betalen en hoeveel rente u betaalt. 
            Vergelijk verschillende afbetalingsscenario's en vind de beste strategie.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">💳 Kredietkaart rentes België:</p>
            <p className="text-sm opacity-90">
              Ontdek hieronder de actuele kredietkaart tarieven van Belgische banken en creditcardmaatschappijen.
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
              productType="kredietkaart"
              title="💳 Laagste Kredietkaart Rentes België 2026"
              showTop={5}
              className="mb-8"
            />

            {/* Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  <i className="fas fa-credit-card mr-3 text-primary"></i>
                  Kredietkaart Calculator - Plan uw afbetaling
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken hoe lang het duurt om uw kredietkaartschuld af te betalen en hoeveel 
                  rente u totaal betaalt. Vergelijk verschillende betalingsstrategieën.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Input Form */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="schuld">Huidige schuld (€)</Label>
                      <Input
                        id="schuld"
                        type="number"
                        value={schuld}
                        onChange={(e) => setSchuld(Number(e.target.value))}
                        placeholder="5000"
                        data-testid="input-schuld"
                      />
                    </div>

                    <div>
                      <Label htmlFor="rente">Jaarlijkse rente (%)</Label>
                      <Input
                        id="rente"
                        type="number"
                        step="0.1"
                        value={rente}
                        onChange={(e) => setRente(Number(e.target.value))}
                        placeholder="18.5"
                        data-testid="input-rente"
                      />
                    </div>

                    <div>
                      <Label htmlFor="maandelijks">Maandelijkse betaling (€)</Label>
                      <Input
                        id="maandelijks"
                        type="number"
                        value={maandelijksBedrag}
                        onChange={(e) => setMaandelijksBedrag(Number(e.target.value))}
                        placeholder="200"
                        data-testid="input-maandelijks"
                      />
                    </div>

                    <div>
                      <Label htmlFor="minimum">Minimum betaling (% van schuld)</Label>
                      <Select value={minimumBetaling.toString()} onValueChange={(value) => setMinimumBetaling(Number(value))}>
                        <SelectTrigger data-testid="select-minimum">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2%</SelectItem>
                          <SelectItem value="2.5">2.5%</SelectItem>
                          <SelectItem value="3">3%</SelectItem>
                          <SelectItem value="4">4%</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Minimum bedrag: €{minimumBetalingBedrag.toFixed(0)}
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="extra">Extra maandelijkse aankopen (€)</Label>
                      <Input
                        id="extra"
                        type="number"
                        value={extraAankopen}
                        onChange={(e) => setExtraAankopen(Number(e.target.value))}
                        placeholder="0"
                        data-testid="input-extra"
                      />
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Afbetalingsscenario's:</h3>
                    
                    <div className="space-y-4">
                      <div className="border rounded p-3">
                        <h4 className="font-semibold text-green-600 mb-2">Uw gekozen betaling</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Maandelijks:</span>
                            <span className="font-semibold">€{maandelijksBedrag}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tijd om af te betalen:</span>
                            <span className="font-semibold" data-testid="result-chosen-time">
                              {typeof gekozenBetalingResultaat.maanden === 'number' ? 
                                `${Math.floor(gekozenBetalingResultaat.maanden / 12)}j ${gekozenBetalingResultaat.maanden % 12}m` : 
                                'Onmogelijk'
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Totale rente:</span>
                            <span className="font-semibold text-red-600" data-testid="result-chosen-interest">
                              {typeof gekozenBetalingResultaat.totaleRente === 'number' ? 
                                `€${Math.round(gekozenBetalingResultaat.totaleRente).toLocaleString()}` : 
                                'Onmogelijk'
                              }
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded p-3">
                        <h4 className="font-semibold text-red-600 mb-2">Minimum betaling</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Maandelijks:</span>
                            <span className="font-semibold">€{minimumBetalingBedrag.toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tijd om af te betalen:</span>
                            <span className="font-semibold" data-testid="result-minimum-time">
                              {typeof minimumBetalingResultaat.maanden === 'number' ? 
                                `${Math.floor(minimumBetalingResultaat.maanden / 12)}j ${minimumBetalingResultaat.maanden % 12}m` : 
                                'Onmogelijk'
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Totale rente:</span>
                            <span className="font-semibold text-red-600" data-testid="result-minimum-interest">
                              {typeof minimumBetalingResultaat.totaleRente === 'number' ? 
                                `€${Math.round(minimumBetalingResultaat.totaleRente).toLocaleString()}` : 
                                'Onmogelijk'
                              }
                            </span>
                          </div>
                        </div>
                      </div>

                      {typeof gekozenBetalingResultaat.totaleRente === 'number' && 
                       typeof minimumBetalingResultaat.totaleRente === 'number' && (
                        <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
                          <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">💰 Besparing:</h4>
                          <p className="text-sm">
                            Door €{maandelijksBedrag} te betalen i.p.v. het minimum bespaart u{' '}
                            <span className="font-bold">
                              €{Math.round(minimumBetalingResultaat.totaleRente - gekozenBetalingResultaat.totaleRente).toLocaleString()}
                            </span>{' '}
                            aan rente!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Chart */}
                  <div>
                    <h4 className="font-semibold mb-3">Vergelijking scenario's</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={vergelijkingData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="scenario" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number, name: string) => [
                              name === 'maanden' ? `${Math.floor(value / 12)}j ${value % 12}m` : `€${Math.round(value).toLocaleString()}`,
                              name === 'maanden' ? 'Tijd' : 'Totale kosten'
                            ]}
                          />
                          <Bar dataKey="totaleKosten" fill="#ef4444" name="totaleKosten" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {gekozenBetalingResultaat.schema.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Evolutie restschuld</h4>
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={gekozenBetalingResultaat.schema}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="jaar" />
                              <YAxis />
                              <Tooltip 
                                formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`, '']}
                                labelFormatter={(jaar) => `Jaar ${jaar}`}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="restschuld" 
                                stroke="#ef4444" 
                                strokeWidth={2}
                                name="Restschuld"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ad After Calculator */}
            <div className="flex justify-center py-4">
              <GoogleAdsense slot="banner" />
            </div>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Slimme strategieën voor kredietkaartschuld</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3>🎯 Afbetalingsstrategieën</h3>
                    <ul>
                      <li><strong>Sneeuwbal methode:</strong> Betaal eerst de kleinste schulden af</li>
                      <li><strong>Lawine methode:</strong> Betaal eerst de hoogste rentes af</li>
                      <li><strong>Consolidatie:</strong> Combineer schulden in één lening</li>
                      <li><strong>Balance transfer:</strong> Verplaats naar kaart met 0% intro rente</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3>💡 Praktische tips</h3>
                    <ul>
                      <li><strong>Stop met nieuwe aankopen</strong> op krediet</li>
                      <li><strong>Betaal meer dan minimum</strong> elke maand</li>
                      <li><strong>Gebruik windfalls</strong> (bonus, terugbetaling) voor afbetaling</li>
                      <li><strong>Overweeg een bijbaan</strong> voor extra inkomsten</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">⚠️ Waarschuwingssignalen:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• U betaalt alleen het minimum bedrag</li>
                    <li>• Uw kredietkaart is constant maximaal gebruikt</li>
                    <li>• U gebruikt een kredietkaart voor basisbehoeften</li>
                    <li>• U haalt cash van uw kredietkaart</li>
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

      {seoConfig && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AuthorityLinks links={seoConfig.authorityLinks} />
        </section>
      )}

      <Footer />
    </div>
  );
}