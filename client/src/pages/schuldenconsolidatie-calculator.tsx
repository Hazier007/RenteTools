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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

interface Schuld {
  id: number;
  naam: string;
  bedrag: number;
  rente: number;
  maandlast: number;
  restLooptijd: number;
}

export default function SchuldenconsolidatieCalculatorPage() {
  const seoConfig = getSeoConfig("schuldenconsolidatie-calculator");
  useSeoTags("schuldenconsolidatie-calculator");

  const [schulden, setSchulden] = useState<Schuld[]>([
    { id: 1, naam: "Kredietkaart", bedrag: 8000, rente: 18.5, maandlast: 240, restLooptijd: 48 },
    { id: 2, naam: "Persoonlijke lening", bedrag: 15000, rente: 7.2, maandlast: 350, restLooptijd: 60 },
    { id: 3, naam: "Autolening", bedrag: 12000, rente: 5.8, maandlast: 285, restLooptijd: 42 }
  ]);

  const [consolidatieRente, setConsolidatieRente] = useState<number>(6.5);
  const [consolidatieLooptijd, setConsolidatieLooptijd] = useState<number>(84);
  const [eenmaligKosten, setEenmaligKosten] = useState<number>(250);

  // Add new debt
  const addSchuld = () => {
    const newId = Math.max(...schulden.map(s => s.id)) + 1;
    setSchulden([...schulden, {
      id: newId,
      naam: "Nieuwe schuld",
      bedrag: 5000,
      rente: 8.0,
      maandlast: 150,
      restLooptijd: 36
    }]);
  };

  // Remove debt
  const removeSchuld = (id: number) => {
    setSchulden(schulden.filter(s => s.id !== id));
  };

  // Update debt
  const updateSchuld = (id: number, field: keyof Schuld, value: string | number) => {
    setSchulden(schulden.map(schuld => 
      schuld.id === id ? { ...schuld, [field]: value } : schuld
    ));
  };

  // Calculate consolidation benefits
  const berekenConsolidatie = () => {
    const totaalSchuld = schulden.reduce((sum, s) => sum + s.bedrag, 0);
    const totaalMaandlast = schulden.reduce((sum, s) => sum + s.maandlast, 0);
    const gemiddeldeRente = schulden.reduce((sum, s) => sum + (s.rente * s.bedrag), 0) / totaalSchuld;
    
    // Calculate weighted average remaining time
    const gemiddeldeLooptijd = schulden.reduce((sum, s) => sum + (s.restLooptijd * s.bedrag), 0) / totaalSchuld;
    
    // Calculate total cost of current debts
    let totaalKostenHuidig = 0;
    schulden.forEach(schuld => {
      totaalKostenHuidig += schuld.maandlast * schuld.restLooptijd;
    });
    
    // Calculate consolidation loan
    const maandRente = consolidatieRente / 100 / 12;
    const aantalMaanden = consolidatieLooptijd;
    
    let nieuweMaandlast = 0;
    if (maandRente > 0) {
      nieuweMaandlast = totaalSchuld * 
        (maandRente * Math.pow(1 + maandRente, aantalMaanden)) /
        (Math.pow(1 + maandRente, aantalMaanden) - 1);
    } else {
      nieuweMaandlast = totaalSchuld / aantalMaanden;
    }
    
    const totaalKostenNieuw = (nieuweMaandlast * aantalMaanden) + eenmaligKosten;
    const totaleRenteNieuw = totaalKostenNieuw - totaalSchuld - eenmaligKosten;
    const totaleRenteHuidig = totaalKostenHuidig - totaalSchuld;
    
    const besparing = totaalKostenHuidig - totaalKostenNieuw;
    const maandlastBesparing = totaalMaandlast - nieuweMaandlast;
    const renteBesparing = totaleRenteHuidig - totaleRenteNieuw;
    
    return {
      totaalSchuld,
      totaalMaandlast,
      gemiddeldeRente,
      gemiddeldeLooptijd,
      totaalKostenHuidig,
      nieuweMaandlast,
      totaalKostenNieuw,
      besparing,
      maandlastBesparing,
      renteBesparing,
      isVoordelig: besparing > 0
    };
  };

  const consolidatie = berekenConsolidatie();

  // Create debt breakdown chart data
  const schuldBreakdown = schulden.map((schuld, index) => ({
    ...schuld,
    color: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff88', '#0088ff'][index % 6]
  }));

  // Create comparison chart data
  const vergelijkingData = [
    {
      aspect: "Maandlast",
      huidig: Math.round(consolidatie.totaalMaandlast),
      nieuw: Math.round(consolidatie.nieuweMaandlast)
    },
    {
      aspect: "Totale kosten",
      huidig: Math.round(consolidatie.totaalKostenHuidig),
      nieuw: Math.round(consolidatie.totaalKostenNieuw)
    },
    {
      aspect: "Rente totaal",
      huidig: Math.round(consolidatie.totaalKostenHuidig - consolidatie.totaalSchuld),
      nieuw: Math.round(consolidatie.totaalKostenNieuw - consolidatie.totaalSchuld - eenmaligKosten)
    }
  ];

  // Create timeline comparison
  const createTimelineComparison = () => {
    const data = [];
    const maxLooptijd = Math.max(consolidatieLooptijd, Math.max(...schulden.map(s => s.restLooptijd)));
    
    for (let maand = 0; maand <= maxLooptijd; maand += 6) {
      let huidigTotaal = 0;
      schulden.forEach(schuld => {
        if (maand < schuld.restLooptijd) {
          huidigTotaal += schuld.maandlast;
        }
      });
      
      let nieuwTotaal = 0;
      if (maand < consolidatieLooptijd) {
        nieuwTotaal = consolidatie.nieuweMaandlast;
      }
      
      data.push({
        maand: `M${maand}`,
        huidig: Math.round(huidigTotaal),
        nieuw: Math.round(nieuwTotaal),
        besparing: Math.round(huidigTotaal - nieuwTotaal)
      });
    }
    
    return data;
  };

  const timelineData = createTimelineComparison();

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header activeCalculator="schuldenconsolidatie-calculator" onCalculatorChange={() => {}} />
      
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Schuldenconsolidatie Calculator België
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Voeg meerdere leningen samen tot één krediet. Bereken mogelijke besparingen 
              op rente, maandlasten en ontdek of consolidatie voordelig is voor uw situatie.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Meerdere Schulden
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Eén Maandlast
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Rentebesparing
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Top Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GoogleAdsense slot="banner" className="w-full max-w-4xl mx-auto" />
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-layer-group mr-3 text-primary"></i>
                  Huidige Schulden
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {schulden.map((schuld, index) => (
                  <div key={schuld.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <Input
                        value={schuld.naam}
                        onChange={(e) => updateSchuld(schuld.id, 'naam', e.target.value)}
                        className="flex-1 mr-2"
                        data-testid={`input-schuld-naam-${index}`}
                      />
                      {schulden.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSchuld(schuld.id)}
                          data-testid={`button-remove-schuld-${index}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-sm">Bedrag</Label>
                        <Input
                          type="number"
                          value={schuld.bedrag}
                          onChange={(e) => updateSchuld(schuld.id, 'bedrag', Number(e.target.value))}
                          data-testid={`input-schuld-bedrag-${index}`}
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Rente (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={schuld.rente}
                          onChange={(e) => updateSchuld(schuld.id, 'rente', Number(e.target.value))}
                          data-testid={`input-schuld-rente-${index}`}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-sm">Maandlast</Label>
                        <Input
                          type="number"
                          value={schuld.maandlast}
                          onChange={(e) => updateSchuld(schuld.id, 'maandlast', Number(e.target.value))}
                          data-testid={`input-schuld-maandlast-${index}`}
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Rest looptijd</Label>
                        <Input
                          type="number"
                          value={schuld.restLooptijd}
                          onChange={(e) => updateSchuld(schuld.id, 'restLooptijd', Number(e.target.value))}
                          data-testid={`input-schuld-looptijd-${index}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  onClick={addSchuld} 
                  className="w-full" 
                  variant="outline"
                  data-testid="button-add-schuld"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Schuld Toevoegen
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-compress-arrows-alt mr-3 text-primary"></i>
                  Consolidatie Lening
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="consolidatieRente">Rente (%)</Label>
                  <Input
                    id="consolidatieRente"
                    type="number"
                    step="0.1"
                    value={consolidatieRente}
                    onChange={(e) => setConsolidatieRente(Number(e.target.value))}
                    data-testid="input-consolidatie-rente"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Aangeboden rente voor consolidatie
                  </p>
                </div>

                <div>
                  <Label htmlFor="consolidatieLooptijd">Looptijd (maanden)</Label>
                  <Select value={consolidatieLooptijd.toString()} onValueChange={(value) => setConsolidatieLooptijd(Number(value))}>
                    <SelectTrigger data-testid="select-consolidatie-looptijd">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60 maanden (5 jaar)</SelectItem>
                      <SelectItem value="72">72 maanden (6 jaar)</SelectItem>
                      <SelectItem value="84">84 maanden (7 jaar)</SelectItem>
                      <SelectItem value="96">96 maanden (8 jaar)</SelectItem>
                      <SelectItem value="120">120 maanden (10 jaar)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="eenmaligKosten">Eenmalige kosten</Label>
                  <Input
                    id="eenmaligKosten"
                    type="number"
                    value={eenmaligKosten}
                    onChange={(e) => setEenmaligKosten(Number(e.target.value))}
                    data-testid="input-eenmalig-kosten"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Afsluitkosten nieuwe lening
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Key Results */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Maandlast Besparing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${consolidatie.maandlastBesparing > 0 ? 'text-green-600' : 'text-red-600'}`} data-testid="text-maandlast-besparing">
                    €{Math.round(Math.abs(consolidatie.maandlastBesparing))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {consolidatie.maandlastBesparing > 0 ? 'Besparing per maand' : 'Extra kosten per maand'}
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Huidig:</span>
                      <span>€{Math.round(consolidatie.totaalMaandlast)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nieuw:</span>
                      <span>€{Math.round(consolidatie.nieuweMaandlast)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Totale Besparing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${consolidatie.besparing > 0 ? 'text-green-600' : 'text-red-600'}`} data-testid="text-totale-besparing">
                    €{Math.round(Math.abs(consolidatie.besparing)).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {consolidatie.besparing > 0 ? 'Over volledige looptijd' : 'Extra kosten totaal'}
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Totale schuld:</span>
                      <span>€{Math.round(consolidatie.totaalSchuld).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rentebesparing:</span>
                      <span className={consolidatie.renteBesparing > 0 ? 'text-green-600' : 'text-red-600'}>
                        €{Math.round(Math.abs(consolidatie.renteBesparing)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle>Aanbeveling</CardTitle>
              </CardHeader>
              <CardContent>
                {consolidatie.isVoordelig ? (
                  <Alert>
                    <AlertDescription>
                      ✅ <strong>Schuldenconsolidatie is voordelig!</strong> U bespaart €{Math.round(consolidatie.besparing).toLocaleString()} 
                      in totaal en €{Math.round(consolidatie.maandlastBesparing)} per maand aan maandlasten.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert>
                    <AlertDescription>
                      ⚠️ <strong>Schuldenconsolidatie is niet voordelig.</strong> U betaalt €{Math.round(Math.abs(consolidatie.besparing)).toLocaleString()} 
                      meer in totaal. Overweeg andere opties of onderhandel over betere voorwaarden.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Current Debts Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Huidige Schulden Overzicht</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={schuldBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ naam, bedrag }) => `${naam}: €${Math.round(bedrag).toLocaleString()}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="bedrag"
                      >
                        {schuldBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Gemiddelde rente:</strong>
                    <div>{consolidatie.gemiddeldeRente.toFixed(1)}%</div>
                  </div>
                  <div>
                    <strong>Gemiddelde looptijd:</strong>
                    <div>{Math.round(consolidatie.gemiddeldeLooptijd)} maanden</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mid Ad */}
            <GoogleAdsense slot="rectangle" />

            {/* Before vs After Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Voor vs Na Vergelijking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vergelijkingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="aspect" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
                      <Bar dataKey="huidig" fill="#8884d8" name="Huidige situatie" />
                      <Bar dataKey="nieuw" fill="#82ca9d" name="Na consolidatie" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Timeline Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Maandlast Evolutie</CardTitle>
                <p className="text-muted-foreground">
                  Vergelijking van maandlasten over de tijd
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="maand" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number, name: string) => [
                          `€${Math.round(value)}`,
                          name === 'huidig' ? 'Huidige situatie' : name === 'nieuw' ? 'Na consolidatie' : 'Besparing'
                        ]}
                      />
                      <Line type="monotone" dataKey="huidig" stroke="#8884d8" name="huidig" />
                      <Line type="monotone" dataKey="nieuw" stroke="#82ca9d" name="nieuw" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Summary Table */}
            <Card>
              <CardHeader>
                <CardTitle>Gedetailleerde Vergelijking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Aspect</th>
                        <th className="text-right p-2">Huidige Situatie</th>
                        <th className="text-right p-2">Na Consolidatie</th>
                        <th className="text-right p-2">Verschil</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">Aantal leningen</td>
                        <td className="p-2 text-right">{schulden.length}</td>
                        <td className="p-2 text-right">1</td>
                        <td className="p-2 text-right text-green-600">-{schulden.length - 1}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Maandlast</td>
                        <td className="p-2 text-right">€{Math.round(consolidatie.totaalMaandlast)}</td>
                        <td className="p-2 text-right">€{Math.round(consolidatie.nieuweMaandlast)}</td>
                        <td className={`p-2 text-right ${consolidatie.maandlastBesparing > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          €{Math.round(consolidatie.maandlastBesparing)}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Gemiddelde rente</td>
                        <td className="p-2 text-right">{consolidatie.gemiddeldeRente.toFixed(1)}%</td>
                        <td className="p-2 text-right">{consolidatieRente}%</td>
                        <td className={`p-2 text-right ${consolidatie.gemiddeldeRente > consolidatieRente ? 'text-green-600' : 'text-red-600'}`}>
                          {(consolidatieRente - consolidatie.gemiddeldeRente).toFixed(1)}%
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Totale kosten</td>
                        <td className="p-2 text-right">€{Math.round(consolidatie.totaalKostenHuidig).toLocaleString()}</td>
                        <td className="p-2 text-right">€{Math.round(consolidatie.totaalKostenNieuw).toLocaleString()}</td>
                        <td className={`p-2 text-right ${consolidatie.besparing > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          €{Math.round(consolidatie.besparing).toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rate Comparison Widget */}
      <RateComparisonWidget productType="schuldenconsolidatie" title="Vergelijk Consolidatie Aanbiedingen" />

      {/* Bottom Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GoogleAdsense slot="banner" className="w-full max-w-4xl mx-auto" />
      </section>

      {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} />}

      <Footer />
    </div>
  );
}