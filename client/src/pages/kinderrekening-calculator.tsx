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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function KinderrekeningCalculatorPage() {
  const seoConfig = getSeoConfig("kinderrekening-calculator");
  useSeoTags("kinderrekening-calculator");
  const [startbedrag, setStartbedrag] = useState<number>(1000);
  const [maandelijksBedrag, setMaandelijksBedrag] = useState<number>(50);
  const [kinderLeeftijd, setKinderLeeftijd] = useState<number>(5);
  const [doelLeeftijd, setDoelLeeftijd] = useState<number>(18);
  const [spaarDoel, setSpaarDoel] = useState<string>("studie");
  const [rente, setRente] = useState<number>(2.5);
  const [grootouders, setGrootouders] = useState<number>(0);

  const jarenTotDoel = doelLeeftijd - kinderLeeftijd;
  const maandenTotDoel = jarenTotDoel * 12;

  // Calculate future value with monthly contributions
  const berekenKinderrekening = () => {
    const maandelijksRente = rente / 100 / 12;
    
    // Future value of initial amount
    const fvInitial = startbedrag * Math.pow(1 + maandelijksRente, maandenTotDoel);
    
    // Future value of monthly contributions (annuity)
    const fvAnnuity = maandelijksBedrag * (Math.pow(1 + maandelijksRente, maandenTotDoel) - 1) / maandelijksRente;
    
    // Future value of yearly contributions from grandparents
    const jaarlijkseGift = grootouders * 12;
    const fvGifts = jaarlijkseGift * (Math.pow(1 + rente / 100, jarenTotDoel) - 1) / (rente / 100);
    
    const totaleEindwaarde = fvInitial + fvAnnuity + fvGifts;
    const totaalIngelegd = startbedrag + (maandelijksBedrag * maandenTotDoel) + (jaarlijkseGift * jarenTotDoel);
    const totaleRente = totaleEindwaarde - totaalIngelegd;
    
    return {
      eindwaarde: totaleEindwaarde,
      totaalIngelegd,
      totaleRente,
      fvInitial,
      fvAnnuity,
      fvGifts
    };
  };

  const resultaat = berekenKinderrekening();

  // Generate growth timeline
  const groeiTimeline = () => {
    const timeline = [];
    const maandelijksRente = rente / 100 / 12;
    let waarde = startbedrag;
    
    for (let jaar = 0; jaar <= jarenTotDoel; jaar++) {
      const maanden = jaar * 12;
      
      // Calculate accumulated value at this point
      const fvInitial = startbedrag * Math.pow(1 + maandelijksRente, maanden);
      const fvAnnuity = maanden > 0 ? maandelijksBedrag * (Math.pow(1 + maandelijksRente, maanden) - 1) / maandelijksRente : 0;
      const fvGifts = jaar > 0 ? (grootouders * 12) * (Math.pow(1 + rente / 100, jaar) - 1) / (rente / 100) : 0;
      
      const huidigeWaarde = fvInitial + fvAnnuity + fvGifts;
      const huidigeInleg = startbedrag + (maandelijksBedrag * maanden) + (grootouders * 12 * jaar);
      
      timeline.push({
        jaar: kinderLeeftijd + jaar,
        waarde: Math.round(huidigeWaarde),
        ingelegd: Math.round(huidigeInleg),
        rente: Math.round(huidigeWaarde - huidigeInleg)
      });
    }
    
    return timeline;
  };

  const timeline = groeiTimeline();

  // Spending goals data
  const spaarDoelen: Record<string, { bedrag: number; naam: string; kleur: string }> = {
    studie: { bedrag: 50000, naam: "Universitaire studies", kleur: "#3b82f6" },
    auto: { bedrag: 15000, naam: "Eerste auto", kleur: "#ef4444" },
    huis: { bedrag: 25000, naam: "Bijdrage eerste huis", kleur: "#22c55e" },
    wereldreis: { bedrag: 8000, naam: "Wereldreis na studies", kleur: "#f59e0b" },
    startup: { bedrag: 30000, naam: "Start eigen bedrijf", kleur: "#8b5cf6" }
  };

  const huidigDoel = spaarDoelen[spaarDoel];
  const doelBereikt = resultaat.eindwaarde >= huidigDoel.bedrag;

  // Pie chart data for final amount breakdown
  const verdeling = [
    { name: 'Startbedrag + rente', value: resultaat.fvInitial, color: '#3b82f6' },
    { name: 'Maandelijkse inleg + rente', value: resultaat.fvAnnuity, color: '#22c55e' },
    { name: 'Giften + rente', value: resultaat.fvGifts, color: '#f59e0b' }
  ].filter(item => item.value > 0);

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Kinderrekening Calculator België - Sparen voor Kinderen
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Plan het sparen voor uw kinderen en bereken hoeveel u nodig heeft voor studies, 
            eerste auto of andere dromen. Vergelijk kinderrekeningen van Belgische banken.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">👶 Kinderrekening voordelen:</p>
            <p className="text-sm opacity-90">
              Vaak betere rentes dan gewone spaarrekeningen, fiscale voordelen en speciaal ontworpen voor de toekomst van uw kind.
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
            
            {/* Live Rate Comparison */}
            <RateComparisonWidget 
              productType="kinderrekening"
              title="👶 Beste Kinderrekening Tarieven België 2025"
              showTop={5}
              className="mb-8"
            />

            {/* Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  <i className="fas fa-baby mr-3 text-primary"></i>
                  Kinderrekening Calculator - Plan de toekomst van uw kind
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken hoeveel u moet sparen voor uw kind en ontdek welke kinderrekening 
                  het beste rendement biedt voor zijn of haar toekomst.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Input Form */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="startbedrag">Startbedrag (€)</Label>
                      <Input
                        id="startbedrag"
                        type="number"
                        value={startbedrag}
                        onChange={(e) => setStartbedrag(Number(e.target.value))}
                        placeholder="1000"
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
                        placeholder="50"
                        data-testid="input-maandelijks"
                      />
                    </div>

                    <div>
                      <Label htmlFor="leeftijd">Huidige leeftijd kind</Label>
                      <Select value={kinderLeeftijd.toString()} onValueChange={(value) => setKinderLeeftijd(Number(value))}>
                        <SelectTrigger data-testid="select-leeftijd">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0 jaar (pasgeboren)</SelectItem>
                          <SelectItem value="1">1 jaar</SelectItem>
                          <SelectItem value="2">2 jaar</SelectItem>
                          <SelectItem value="3">3 jaar</SelectItem>
                          <SelectItem value="4">4 jaar</SelectItem>
                          <SelectItem value="5">5 jaar</SelectItem>
                          <SelectItem value="6">6 jaar</SelectItem>
                          <SelectItem value="8">8 jaar</SelectItem>
                          <SelectItem value="10">10 jaar</SelectItem>
                          <SelectItem value="12">12 jaar</SelectItem>
                          <SelectItem value="14">14 jaar</SelectItem>
                          <SelectItem value="16">16 jaar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="doelleeftijd">Doel leeftijd</Label>
                      <Select value={doelLeeftijd.toString()} onValueChange={(value) => setDoelLeeftijd(Number(value))}>
                        <SelectTrigger data-testid="select-doelleeftijd">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="16">16 jaar (start hoger onderwijs)</SelectItem>
                          <SelectItem value="18">18 jaar (meerderjarig)</SelectItem>
                          <SelectItem value="21">21 jaar (afstuderen bachelor)</SelectItem>
                          <SelectItem value="23">23 jaar (afstuderen master)</SelectItem>
                          <SelectItem value="25">25 jaar (start carrière)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="spaardoel">Spaardoel</Label>
                      <Select value={spaarDoel} onValueChange={setSpaarDoel}>
                        <SelectTrigger data-testid="select-spaardoel">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="studie">Universitaire studies (€50.000)</SelectItem>
                          <SelectItem value="auto">Eerste auto (€15.000)</SelectItem>
                          <SelectItem value="huis">Bijdrage eerste huis (€25.000)</SelectItem>
                          <SelectItem value="wereldreis">Wereldreis (€8.000)</SelectItem>
                          <SelectItem value="startup">Start eigen bedrijf (€30.000)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="rente">Verwachte jaarlijkse rente (%)</Label>
                      <Input
                        id="rente"
                        type="number"
                        step="0.1"
                        value={rente}
                        onChange={(e) => setRente(Number(e.target.value))}
                        placeholder="2.5"
                        data-testid="input-rente"
                      />
                    </div>

                    <div>
                      <Label htmlFor="grootouders">Maandelijkse gift grootouders (€)</Label>
                      <Input
                        id="grootouders"
                        type="number"
                        value={grootouders}
                        onChange={(e) => setGrootouders(Number(e.target.value))}
                        placeholder="0"
                        data-testid="input-grootouders"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Optioneel: extra bijdragen van familie
                      </p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Resultaten op {doelLeeftijd} jaar:</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Spaartijd:</span>
                        <span className="font-semibold">{jarenTotDoel} jaar</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Totaal ingelegd:</span>
                        <span className="font-semibold" data-testid="result-invested">€{Math.round(resultaat.totaalIngelegd).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Totale rente:</span>
                        <span className="font-semibold text-green-600" data-testid="result-interest">€{Math.round(resultaat.totaleRente).toLocaleString()}</span>
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="font-semibold">Eindwaarde:</span>
                          <span className="font-bold text-primary text-lg" data-testid="result-total">€{Math.round(resultaat.eindwaarde).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Goal Achievement */}
                    <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: doelBereikt ? '#dcfce7' : '#fef3c7' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Spaardoel: {huidigDoel.naam}</span>
                        <Badge variant={doelBereikt ? "default" : "secondary"}>
                          {doelBereikt ? "✅ Bereikt!" : "⚠️ Tekort"}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Benodigde bedrag:</span>
                        <span className="font-semibold">€{huidigDoel.bedrag.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{doelBereikt ? 'Overschot:' : 'Tekort:'}</span>
                        <span className={`font-semibold ${doelBereikt ? 'text-green-600' : 'text-red-600'}`}>
                          €{Math.abs(Math.round(resultaat.eindwaarde - huidigDoel.bedrag)).toLocaleString()}
                        </span>
                      </div>
                      
                      {!doelBereikt && (
                        <div className="mt-3 p-2 bg-background rounded text-xs">
                          <strong>💡 Tip:</strong> Verhoog uw maandelijkse inleg met €
                          {Math.ceil((huidigDoel.bedrag - resultaat.eindwaarde) / maandenTotDoel)} 
                          om uw doel te bereiken.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Charts */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Groei van het spaargeld</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={timeline}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="jaar" />
                            <YAxis />
                            <Tooltip 
                              formatter={(value: number) => [`€${value.toLocaleString()}`, '']}
                              labelFormatter={(jaar) => `Leeftijd: ${jaar} jaar`}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="waarde" 
                              stroke="#2563eb" 
                              strokeWidth={2}
                              name="Totale waarde"
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

                    {verdeling.length > 1 && (
                      <div>
                        <h4 className="font-semibold mb-3">Verdeling eindwaarde</h4>
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={verdeling}
                                cx="50%"
                                cy="50%"
                                innerRadius={30}
                                outerRadius={70}
                                dataKey="value"
                              >
                                {verdeling.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value: number) => `€${Math.round(value).toLocaleString()}`} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Educational Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Voordelen van kinderrekeningen in België</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3>💰 Financiële Voordelen</h3>
                    <ul>
                      <li><strong>Betere rentes:</strong> Vaak 0,5-1% hoger dan gewone spaarrekeningen</li>
                      <li><strong>Geen kosten:</strong> Meestal gratis beheer en geen transactiekosten</li>
                      <li><strong>Fiscale voordelen:</strong> Gifts aan kinderen tot €3.558 per jaar belastingvrij</li>
                      <li><strong>Depositogarantie:</strong> Tot €100.000 gedekt per bank</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3>🎯 Educatieve Voordelen</h3>
                    <ul>
                      <li><strong>Leren sparen:</strong> Kinderen leren de waarde van geld</li>
                      <li><strong>Lange termijn denken:</strong> Doelen stellen en volhouden</li>
                      <li><strong>Financiële geletterdheid:</strong> Begrip van rente en groei</li>
                      <li><strong>Verantwoordelijkheid:</strong> Eigen rekening beheren vanaf 12-16 jaar</li>
                    </ul>
                  </div>
                </div>
                
                <h3>📋 Praktische overwegingen:</h3>
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <ul className="text-sm space-y-1">
                    <li><strong>Minimum leeftijd:</strong> Meestal vanaf geboorte mogelijk</li>
                    <li><strong>Toegang tot geld:</strong> Tot 12-16 jaar alleen ouders, daarna samen</li>
                    <li><strong>Overstap naar volwassen rekening:</strong> Meestal automatisch op 18 jaar</li>
                    <li><strong>Opnames:</strong> Sommige banken beperken opnames tot studie of specifieke doelen</li>
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