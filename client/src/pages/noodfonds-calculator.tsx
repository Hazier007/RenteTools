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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function NoodfondsCalculatorPage() {
  const seoConfig = getSeoConfig("noodfonds-calculator");
  useSeoTags("noodfonds-calculator");
  const [maandelijkseUitgaven, setMaandelijkseUitgaven] = useState({
    wonen: 1200,
    voeding: 400,
    transport: 300,
    verzekeringen: 150,
    nutsbedrijven: 200,
    telefoon: 50,
    overig: 300
  });
  
  const [inkomensSituatie, setInkomensSituatie] = useState<string>("dubbel");
  const [werkzekerheid, setWerkzekerheid] = useState<string>("gemiddeld");
  const [gezinsSituatie, setGezinsSituatie] = useState<string>("stel");
  const [huidigeReserve, setHuidigeReserve] = useState<number>(5000);
  const [maandelijksSparen, setMaandelijksSparen] = useState<number>(200);

  const totaleUitgaven = Object.values(maandelijkseUitgaven).reduce((sum, val) => sum + val, 0);

  // Calculate recommended emergency fund
  const berekenNoodfonds = () => {
    let basisMaanden = 3; // Base recommendation
    
    // Adjust based on income situation
    if (inkomensSituatie === "enkel") basisMaanden += 2;
    if (inkomensSituatie === "freelance") basisMaanden += 3;
    
    // Adjust based on job security
    if (werkzekerheid === "laag") basisMaanden += 2;
    if (werkzekerheid === "hoog") basisMaanden -= 1;
    
    // Adjust based on family situation
    if (gezinsSituatie === "kinderen") basisMaanden += 1;
    if (gezinsSituatie === "alleenstaand") basisMaanden -= 0.5;
    
    const aanbevolenMaanden = Math.max(3, Math.min(12, basisMaanden));
    const aanbevolenBedrag = totaleUitgaven * aanbevolenMaanden;
    const tekort = Math.max(0, aanbevolenBedrag - huidigeReserve);
    const maandenNodig = maandelijksSparen > 0 ? Math.ceil(tekort / maandelijksSparen) : 0;
    
    return {
      aanbevolenMaanden,
      aanbevolenBedrag,
      tekort,
      maandenNodig,
      overschot: Math.max(0, huidigeReserve - aanbevolenBedrag)
    };
  };

  const noodfonds = berekenNoodfonds();

  // Spending categories for visualization
  const uitgavenData = [
    { name: 'Wonen', bedrag: maandelijkseUitgaven.wonen, color: '#ef4444' },
    { name: 'Voeding', bedrag: maandelijkseUitgaven.voeding, color: '#f97316' },
    { name: 'Transport', bedrag: maandelijkseUitgaven.transport, color: '#eab308' },
    { name: 'Verzekeringen', bedrag: maandelijkseUitgaven.verzekeringen, color: '#22c55e' },
    { name: 'Nutsvoorzieningen', bedrag: maandelijkseUitgaven.nutsbedrijven, color: '#3b82f6' },
    { name: 'Telefoon/Internet', bedrag: maandelijkseUitgaven.telefoon, color: '#a855f7' },
    { name: 'Overig', bedrag: maandelijkseUitgaven.overig, color: '#6b7280' }
  ];

  // Risk levels comparison
  const risicoVergelijking = [
    { scenario: 'Minimum (3 maanden)', bedrag: totaleUitgaven * 3, risico: 'Hoog', kleur: '#ef4444' },
    { scenario: 'Aanbevolen', bedrag: noodfonds.aanbevolenBedrag, risico: 'Laag', kleur: '#22c55e' },
    { scenario: 'Conservatief (6+ maanden)', bedrag: totaleUitgaven * 6, risico: 'Zeer laag', kleur: '#3b82f6' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header activeCalculator="noodfonds" onCalculatorChange={() => {}} />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Noodfonds Calculator België - Emergency Fund Berekenen
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken hoeveel u moet sparen voor onverwachte gebeurtenissen zoals werkloosheid, 
            ziekte of grote uitgaven. Plan uw financiële zekerheid met een solide noodfonds.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">🛡️ Waarom een noodfonds?</p>
            <p className="text-sm opacity-90">
              3-6 maanden uitgaven als buffer voor onverwachte situaties. Financiële zekerheid en gemoedsrust.
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
                  <i className="fas fa-shield-alt mr-3 text-primary"></i>
                  Noodfonds Calculator - Bereken uw financiële buffer
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken hoeveel u moet sparen als noodfonds gebaseerd op uw uitgaven, 
                  inkomen situatie en persoonlijke omstandigheden.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Input Form */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-red-600">💸 Maandelijkse vaste uitgaven</h3>
                    
                    <div>
                      <Label htmlFor="wonen">Wonen (huur/hypotheek) (€)</Label>
                      <Input
                        id="wonen"
                        type="number"
                        value={maandelijkseUitgaven.wonen}
                        onChange={(e) => setMaandelijkseUitgaven({...maandelijkseUitgaven, wonen: Number(e.target.value)})}
                        data-testid="input-wonen"
                      />
                    </div>

                    <div>
                      <Label htmlFor="voeding">Voeding & boodschappen (€)</Label>
                      <Input
                        id="voeding"
                        type="number"
                        value={maandelijkseUitgaven.voeding}
                        onChange={(e) => setMaandelijkseUitgaven({...maandelijkseUitgaven, voeding: Number(e.target.value)})}
                        data-testid="input-voeding"
                      />
                    </div>

                    <div>
                      <Label htmlFor="transport">Transport (€)</Label>
                      <Input
                        id="transport"
                        type="number"
                        value={maandelijkseUitgaven.transport}
                        onChange={(e) => setMaandelijkseUitgaven({...maandelijkseUitgaven, transport: Number(e.target.value)})}
                        data-testid="input-transport"
                      />
                    </div>

                    <div>
                      <Label htmlFor="verzekeringen">Verzekeringen (€)</Label>
                      <Input
                        id="verzekeringen"
                        type="number"
                        value={maandelijkseUitgaven.verzekeringen}
                        onChange={(e) => setMaandelijkseUitgaven({...maandelijkseUitgaven, verzekeringen: Number(e.target.value)})}
                        data-testid="input-verzekeringen"
                      />
                    </div>

                    <div>
                      <Label htmlFor="nutsbedrijven">Gas/water/elektriciteit (€)</Label>
                      <Input
                        id="nutsbedrijven"
                        type="number"
                        value={maandelijkseUitgaven.nutsbedrijven}
                        onChange={(e) => setMaandelijkseUitgaven({...maandelijkseUitgaven, nutsbedrijven: Number(e.target.value)})}
                        data-testid="input-nutsbedrijven"
                      />
                    </div>

                    <div>
                      <Label htmlFor="telefoon">Telefoon/Internet (€)</Label>
                      <Input
                        id="telefoon"
                        type="number"
                        value={maandelijkseUitgaven.telefoon}
                        onChange={(e) => setMaandelijkseUitgaven({...maandelijkseUitgaven, telefoon: Number(e.target.value)})}
                        data-testid="input-telefoon"
                      />
                    </div>

                    <div>
                      <Label htmlFor="overig">Overige vaste lasten (€)</Label>
                      <Input
                        id="overig"
                        type="number"
                        value={maandelijkseUitgaven.overig}
                        onChange={(e) => setMaandelijkseUitgaven({...maandelijkseUitgaven, overig: Number(e.target.value)})}
                        data-testid="input-overig"
                      />
                    </div>

                    <div className="bg-red-50 dark:bg-red-950 p-3 rounded">
                      <div className="flex justify-between">
                        <span className="font-semibold">Totale maanduitgaven:</span>
                        <span className="font-bold text-red-600" data-testid="total-expenses">€{totaleUitgaven.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Personal Situation */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-600">👤 Persoonlijke situatie</h3>
                    
                    <div>
                      <Label htmlFor="inkomen">Inkomen situatie</Label>
                      <Select value={inkomensSituatie} onValueChange={setInkomensSituatie}>
                        <SelectTrigger data-testid="select-inkomen">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dubbel">Dubbel inkomen</SelectItem>
                          <SelectItem value="enkel">Enkel inkomen</SelectItem>
                          <SelectItem value="freelance">Freelance/wisselend</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="werkzekerheid">Werkzekerheid</Label>
                      <Select value={werkzekerheid} onValueChange={setWerkzekerheid}>
                        <SelectTrigger data-testid="select-werkzekerheid">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hoog">Hoog (vast contract, stabiele sector)</SelectItem>
                          <SelectItem value="gemiddeld">Gemiddeld (normaal contract)</SelectItem>
                          <SelectItem value="laag">Laag (tijdelijk, onzekere sector)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="gezin">Gezinssituatie</Label>
                      <Select value={gezinsSituatie} onValueChange={setGezinsSituatie}>
                        <SelectTrigger data-testid="select-gezin">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="alleenstaand">Alleenstaand</SelectItem>
                          <SelectItem value="stel">Stel zonder kinderen</SelectItem>
                          <SelectItem value="kinderen">Gezin met kinderen</SelectItem>
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
                        placeholder="5000"
                        data-testid="input-reserve"
                      />
                    </div>

                    <div>
                      <Label htmlFor="sparen">Maandelijks kunnen sparen (€)</Label>
                      <Input
                        id="sparen"
                        type="number"
                        value={maandelijksSparen}
                        onChange={(e) => setMaandelijksSparen(Number(e.target.value))}
                        placeholder="200"
                        data-testid="input-sparen"
                      />
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">🛡️ Uw noodfonds advies:</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Maanduitgaven:</span>
                        <span className="font-semibold">€{totaleUitgaven.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Aanbevolen aantal maanden:</span>
                        <span className="font-semibold" data-testid="result-months">{noodfonds.aanbevolenMaanden.toFixed(1)} maanden</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Aanbevolen noodfonds:</span>
                        <span className="font-semibold text-blue-600" data-testid="result-recommended">€{Math.round(noodfonds.aanbevolenBedrag).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Huidige reserve:</span>
                        <span className="font-semibold">€{huidigeReserve.toLocaleString()}</span>
                      </div>
                      
                      <div className="border-t pt-3">
                        {noodfonds.tekort > 0 ? (
                          <>
                            <div className="flex justify-between">
                              <span className="font-semibold text-red-600">Nog te sparen:</span>
                              <span className="font-bold text-red-600" data-testid="result-shortage">€{Math.round(noodfonds.tekort).toLocaleString()}</span>
                            </div>
                            {maandelijksSparen > 0 && (
                              <div className="flex justify-between mt-2">
                                <span>Tijd nodig:</span>
                                <span className="font-semibold" data-testid="result-time">{noodfonds.maandenNodig} maanden</span>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex justify-between">
                            <span className="font-semibold text-green-600">Overschot:</span>
                            <span className="font-bold text-green-600" data-testid="result-surplus">€{Math.round(noodfonds.overschot).toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-background rounded">
                      <h4 className="font-semibold mb-2">💡 Persoonlijk advies:</h4>
                      {noodfonds.aanbevolenMaanden <= 3 ? (
                        <p className="text-sm text-green-600">
                          ✅ Uw situatie is stabiel. 3 maanden reserve is voldoende.
                        </p>
                      ) : noodfonds.aanbevolenMaanden <= 6 ? (
                        <p className="text-sm text-blue-600">
                          👍 Gemiddeld risico. 4-6 maanden reserve wordt aanbevolen.
                        </p>
                      ) : (
                        <p className="text-sm text-orange-600">
                          ⚠️ Hogere onzekerheid. 6+ maanden reserve voor meer zekerheid.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h4 className="font-semibold mb-3">Verdeling maanduitgaven</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={uitgavenData.filter(item => item.bedrag > 0)}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            dataKey="bedrag"
                          >
                            {uitgavenData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => `€${value.toLocaleString()}`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Risico scenarios</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={risicoVergelijking} layout="horizontal">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="scenario" type="category" width={100} />
                          <Tooltip 
                            formatter={(value: number) => [`€${value.toLocaleString()}`, 'Bedrag']}
                          />
                          <Bar dataKey="bedrag" fill="#3b82f6" />
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
                <CardTitle className="text-xl">Waarom is een noodfonds zo belangrijk?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3>🚨 Typische noodsituaties</h3>
                    <ul>
                      <li><strong>Werkloosheid:</strong> Overbrugging tussen banen</li>
                      <li><strong>Ziekte:</strong> Verminderd inkomen of extra kosten</li>
                      <li><strong>Auto reparaties:</strong> Onverwachte grote uitgaven</li>
                      <li><strong>Huishoudapparaten:</strong> Vervanging koelkast, wasmachine</li>
                      <li><strong>Medische kosten:</strong> Niet gedekte behandelingen</li>
                      <li><strong>Huisreparaties:</strong> Lekkages, verwarmingstoestel</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3>💰 Voordelen van een noodfonds</h3>
                    <ul>
                      <li><strong>Geen schulden:</strong> Voorkomt dure leningen</li>
                      <li><strong>Gemoedsrust:</strong> Minder stress bij tegenslag</li>
                      <li><strong>Flexibiliteit:</strong> Keuzes maken zonder druk</li>
                      <li><strong>Beter onderhandelen:</strong> Bij werkgevers of leveranciers</li>
                      <li><strong>Kansen grijpen:</strong> Investeren bij gelegenheid</li>
                      <li><strong>Slechtere tijden:</strong> Overbruggen zonder paniek</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">🏦 Waar uw noodfonds bewaren?</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>✅ Spaarrekening:</strong>
                      <ul className="mt-1">
                        <li>• Direct beschikbaar</li>
                        <li>• Veilig en gedekt</li>
                        <li>• Lage maar stabiele rente</li>
                      </ul>
                    </div>
                    <div>
                      <strong>⚡ Daguitgave rekening:</strong>
                      <ul className="mt-1">
                        <li>• Instant toegang</li>
                        <li>• Voor kleine noodgevallen</li>
                        <li>• Meestal geen rente</li>
                      </ul>
                    </div>
                    <div>
                      <strong>❌ Niet geschikt:</strong>
                      <ul className="mt-1">
                        <li>• Aandelen (volatiel)</li>
                        <li>• Termijnrekening (vastgezet)</li>
                        <li>• Crypto (te risicovol)</li>
                      </ul>
                    </div>
                  </div>
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