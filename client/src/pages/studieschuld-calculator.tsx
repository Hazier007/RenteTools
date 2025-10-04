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
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";

export default function StudieschuldCalculatorPage() {
  const seoConfig = getSeoConfig("studieschuld-calculator");

  const [studieschuld, setStudieschuld] = useState<number>(25000);
  const [rente, setRente] = useState<number>(2.1);
  const [startSalaris, setStartSalaris] = useState<number>(35000);
  const [terugbetalingsPeriode, setTerugbetalingsPeriode] = useState<number>(15);
  const [studierichting, setStudierichting] = useState<string>("bachelor");

  // Calculate monthly payment and total costs
  const maandelijksRente = rente / 100 / 12;
  const aantalMaanden = terugbetalingsPeriode * 12;
  
  let maandlast = 0;
  if (maandelijksRente > 0) {
    maandlast = studieschuld * (maandelijksRente * Math.pow(1 + maandelijksRente, aantalMaanden)) / 
                (Math.pow(1 + maandelijksRente, aantalMaanden) - 1);
  } else {
    maandlast = studieschuld / aantalMaanden;
  }

  const totaalTerugbetaald = maandlast * aantalMaanden;
  const totaleRente = totaalTerugbetaald - studieschuld;
  const percentageVanSalaris = (maandlast * 12 / startSalaris) * 100;

  // Generate amortization schedule for chart
  const genereerAflossingschema = () => {
    const schema = [];
    let restschuld = studieschuld;
    
    for (let jaar = 0; jaar <= terugbetalingsPeriode; jaar++) {
      schema.push({
        jaar,
        restschuld: Math.max(0, restschuld),
        afgbetaald: studieschuld - restschuld
      });
      
      if (jaar < terugbetalingsPeriode) {
        const jaarlijkseBetaling = maandlast * 12;
        const jaarlijkseRente = restschuld * (rente / 100);
        const aflossing = jaarlijkseBetaling - jaarlijkseRente;
        restschuld = Math.max(0, restschuld - aflossing);
      }
    }
    
    return schema;
  };

  const aflossingschema = genereerAflossingschema();

  // Study program specific info
  const studieInfo: Record<string, { duur: number; gemiddeldSalaris: number; naam: string }> = {
    bachelor: { duur: 3, gemiddeldSalaris: 35000, naam: "Bachelor" },
    master: { duur: 5, gemiddeldSalaris: 42000, naam: "Master" },
    geneeskunde: { duur: 7, gemiddeldSalaris: 60000, naam: "Geneeskunde" },
    tandheelkunde: { duur: 6, gemiddeldSalaris: 75000, naam: "Tandheelkunde" },
    ingenieur: { duur: 5, gemiddeldSalaris: 45000, naam: "Ingenieur" }
  };

  const huidigeStudie = studieInfo[studierichting];

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header activeCalculator="studieschuld" onCalculatorChange={() => {}} />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Studieschuld Calculator België - Bereken uw Studielening
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken de maandlast van uw studieschuld en plan de terugbetaling van uw studielening. 
            Ontdek hoe uw schuld evolueert en wat de impact is op uw startende carrière.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">🎓 Studielening in België:</p>
            <p className="text-sm opacity-90">
              Plan slim uw studielening en terugbetaling voor een zorgeloze start van uw carrière.
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
                  <i className="fas fa-graduation-cap mr-3 text-primary"></i>
                  Studieschuld Calculator - Plan uw terugbetaling
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken de maandlast van uw studielening en ontdek hoe lang u erover doet 
                  om uw studieschuld volledig terug te betalen.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Input Form */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="studieschuld">Totale studieschuld (€)</Label>
                      <Input
                        id="studieschuld"
                        type="number"
                        value={studieschuld}
                        onChange={(e) => setStudieschuld(Number(e.target.value))}
                        placeholder="25000"
                        data-testid="input-studieschuld"
                      />
                    </div>

                    <div>
                      <Label htmlFor="rente">Rentevoet (%)</Label>
                      <Input
                        id="rente"
                        type="number"
                        step="0.1"
                        value={rente}
                        onChange={(e) => setRente(Number(e.target.value))}
                        placeholder="2.1"
                        data-testid="input-rente"
                      />
                    </div>

                    <div>
                      <Label htmlFor="terugbetaling">Terugbetalingsperiode (jaren)</Label>
                      <Select value={terugbetalingsPeriode.toString()} onValueChange={(value) => setTerugbetalingsPeriode(Number(value))}>
                        <SelectTrigger data-testid="select-terugbetaling">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 jaar</SelectItem>
                          <SelectItem value="15">15 jaar</SelectItem>
                          <SelectItem value="20">20 jaar</SelectItem>
                          <SelectItem value="25">25 jaar</SelectItem>
                          <SelectItem value="30">30 jaar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="studierichting">Studierichting</Label>
                      <Select value={studierichting} onValueChange={setStudierichting}>
                        <SelectTrigger data-testid="select-studierichting">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bachelor">Bachelor</SelectItem>
                          <SelectItem value="master">Master</SelectItem>
                          <SelectItem value="geneeskunde">Geneeskunde</SelectItem>
                          <SelectItem value="tandheelkunde">Tandheelkunde</SelectItem>
                          <SelectItem value="ingenieur">Ingenieur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="start-salaris">Verwacht startsalaris (€)</Label>
                      <Input
                        id="start-salaris"
                        type="number"
                        value={startSalaris}
                        onChange={(e) => setStartSalaris(Number(e.target.value))}
                        placeholder={huidigeStudie.gemiddeldSalaris.toString()}
                        data-testid="input-start-salaris"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Gemiddeld voor {huidigeStudie.naam}: €{huidigeStudie.gemiddeldSalaris.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Terugbetalingsoverzicht:</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Studieschuld:</span>
                        <span className="font-semibold" data-testid="result-debt">€{studieschuld.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maandlast:</span>
                        <span className="font-semibold text-primary" data-testid="result-monthly">€{Math.round(maandlast).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Totaal terugbetaald:</span>
                        <span className="font-semibold" data-testid="result-total">€{Math.round(totaalTerugbetaald).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Totale rente:</span>
                        <span className="font-semibold text-red-600" data-testid="result-interest">€{Math.round(totaleRente).toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span>% van startsalaris:</span>
                          <span className="font-bold" data-testid="result-percentage">{percentageVanSalaris.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-background rounded">
                      <h4 className="font-semibold mb-2">💡 Financieel Advies:</h4>
                      {percentageVanSalaris > 20 ? (
                        <p className="text-sm text-red-600">
                          ⚠️ Uw maandlast is hoog (meer dan 20% van salaris). Overweeg een langere looptijd.
                        </p>
                      ) : percentageVanSalaris > 15 ? (
                        <p className="text-sm text-orange-600">
                          ⚡ Uw maandlast is gematigd (15-20% van salaris). Dit is nog behapbaar.
                        </p>
                      ) : (
                        <p className="text-sm text-green-600">
                          ✅ Uw maandlast is acceptabel (minder dan 15% van salaris). Goede balans!
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Chart */}
                  <div>
                    <h4 className="font-semibold mb-3">Evolutie van uw studieschuld</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={aflossingschema}>
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
                          <Line 
                            type="monotone" 
                            dataKey="afgbetaald" 
                            stroke="#22c55e" 
                            strokeWidth={2}
                            name="Afbetaald"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Study Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Studieleningen in België: wat moet u weten?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  In België kunt u verschillende soorten studieleningen afsluiten om uw hogere studies te financieren. 
                  Elke vorm heeft zijn eigen voorwaarden en voordelen.
                </p>
                
                <h3>Types studieleningen in België:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🏛️ Sociale Lening</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Lagere rentes (vaak 1-2%)</li>
                      <li>• Afhankelijk van inkomen ouders</li>
                      <li>• Via OCMW of sociale organisaties</li>
                      <li>• Beperkte bedragen beschikbaar</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">🏦 Commerciële Studielening</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Marktrentes (2-4%)</li>
                      <li>• Hogere bedragen mogelijk</li>
                      <li>• Via banken en kredietinstellingen</li>
                      <li>• Flexibele voorwaarden</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">💰 Tips voor studielening terugbetaling:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Start zo vroeg mogelijk met terugbetalen (ook kleine bedragen helpen)</li>
                    <li>• Gebruik belastingsvoordelen voor studiekosten</li>
                    <li>• Overweeg vervroegde terugbetaling bij extra inkomen</li>
                    <li>• Bouw eerst een noodfonds op voordat u extra afbetaalt</li>
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

      {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} />}

      <Footer />
    </div>
  );
}