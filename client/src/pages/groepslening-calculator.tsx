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
import { useState, useEffect } from "react";
import { UserPlus, Trash2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";

interface Deelnemer {
  id: number;
  naam: string;
  inkomen: number;
  aandeel: number;
  maandlast: number;
}

export default function GroepsleningCalculatorPage() {
  const seoConfig = getSeoConfig("groepslening-calculator");

  useEffect(() => {
    document.title = "Groepslening Calculator België - Samen Lenen";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Bereken groepslening met vrienden of familie in België. Verdeel kosten eerlijk, beheer risicos en simuleer verschillende scenario\'s voor gezamenlijk lenen.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Bereken groepslening met vrienden of familie in België. Verdeel kosten eerlijk, beheer risicos en simuleer verschillende scenario\'s voor gezamenlijk lenen.';
      document.head.appendChild(meta);
    }
  }, []);

  const [deelnemers, setDeelnemers] = useState<Deelnemer[]>([
    { id: 1, naam: "Uzelf", inkomen: 3500, aandeel: 40, maandlast: 0 },
    { id: 2, naam: "Partner", inkomen: 3200, aandeel: 35, maandlast: 0 },
    { id: 3, naam: "Vriend", inkomen: 2800, aandeel: 25, maandlast: 0 }
  ]);

  const [lening, setLening] = useState({
    bedrag: 45000,
    doel: "vastgoed",
    rente: 5.2,
    looptijd: 84,
    afsluitkosten: 450
  });

  const [verdelingType, setVerdelingType] = useState<string>("inkomen");

  // Add new participant
  const addDeelnemer = () => {
    const newId = Math.max(...deelnemers.map(d => d.id)) + 1;
    setDeelnemers([...deelnemers, {
      id: newId,
      naam: `Deelnemer ${newId}`,
      inkomen: 2500,
      aandeel: 0,
      maandlast: 0
    }]);
  };

  // Remove participant
  const removeDeelnemer = (id: number) => {
    if (deelnemers.length > 2) {
      setDeelnemers(deelnemers.filter(d => d.id !== id));
    }
  };

  // Update participant
  const updateDeelnemer = (id: number, field: keyof Deelnemer, value: string | number) => {
    setDeelnemers(deelnemers.map(deelnemer => 
      deelnemer.id === id ? { ...deelnemer, [field]: value } : deelnemer
    ));
  };

  // Calculate loan distribution
  const berekenVerdeling = () => {
    const totaalInkomen = deelnemers.reduce((sum, d) => sum + d.inkomen, 0);
    
    // Calculate monthly payment
    const maandRente = lening.rente / 100 / 12;
    const aantalMaanden = lening.looptijd;
    
    let maandlast = 0;
    if (maandRente > 0) {
      maandlast = lening.bedrag * 
        (maandRente * Math.pow(1 + maandRente, aantalMaanden)) /
        (Math.pow(1 + maandRente, aantalMaanden) - 1);
    } else {
      maandlast = lening.bedrag / aantalMaanden;
    }

    const totaalBetaald = maandlast * aantalMaanden;
    const totaleRente = totaalBetaald - lening.bedrag;
    const totaleKosten = totaalBetaald + lening.afsluitkosten;

    // Calculate distribution based on type
    let bijgewerktDeelnemers = [...deelnemers];
    
    if (verdelingType === "inkomen") {
      // Income-based distribution
      bijgewerktDeelnemers = deelnemers.map(deelnemer => ({
        ...deelnemer,
        aandeel: (deelnemer.inkomen / totaalInkomen) * 100,
        maandlast: (deelnemer.inkomen / totaalInkomen) * maandlast
      }));
    } else if (verdelingType === "gelijk") {
      // Equal distribution
      const gelijkAandeel = 100 / deelnemers.length;
      const gelijkMaandlast = maandlast / deelnemers.length;
      bijgewerktDeelnemers = deelnemers.map(deelnemer => ({
        ...deelnemer,
        aandeel: gelijkAandeel,
        maandlast: gelijkMaandlast
      }));
    } else {
      // Custom distribution - normalize to 100%
      const totaalAandeel = deelnemers.reduce((sum, d) => sum + d.aandeel, 0);
      if (totaalAandeel > 0) {
        bijgewerktDeelnemers = deelnemers.map(deelnemer => ({
          ...deelnemer,
          aandeel: (deelnemer.aandeel / totaalAandeel) * 100,
          maandlast: (deelnemer.aandeel / totaalAandeel) * maandlast
        }));
      }
    }

    // Calculate risk factors
    const minInkomen = Math.min(...bijgewerktDeelnemers.map(d => d.inkomen));
    const maxInkomen = Math.max(...bijgewerktDeelnemers.map(d => d.inkomen));
    const inkomenskloof = ((maxInkomen - minInkomen) / minInkomen) * 100;
    
    const hoogsteSchuld = Math.max(...bijgewerktDeelnemers.map(d => (d.maandlast / d.inkomen) * 100));
    const risicoProfiel = hoogsteSchuld > 35 ? "Hoog" : hoogsteSchuld > 25 ? "Gemiddeld" : "Laag";

    return {
      maandlast,
      totaalBetaald,
      totaleRente,
      totaleKosten,
      bijgewerktDeelnemers,
      totaalInkomen,
      inkomenskloof,
      hoogsteSchuld,
      risicoProfiel
    };
  };

  const verdeling = berekenVerdeling();

  // Update participants with calculated values
  useEffect(() => {
    if (verdelingType !== "custom") {
      setDeelnemers(verdeling.bijgewerktDeelnemers);
    }
  }, [verdelingType, lening, deelnemers.length]);

  // Chart data
  const verdelingData = verdeling.bijgewerktDeelnemers.map((deelnemer, index) => ({
    ...deelnemer,
    color: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff88'][index % 5]
  }));

  const risicoData = verdeling.bijgewerktDeelnemers.map(deelnemer => ({
    naam: deelnemer.naam,
    schuldRatio: (deelnemer.maandlast / deelnemer.inkomen) * 100,
    inkomen: deelnemer.inkomen
  }));

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header activeCalculator="groepslening-calculator" onCalculatorChange={() => {}} />
      
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Groepslening Calculator België
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Bereken en verdeel een lening eerlijk tussen vrienden, familie of partners. 
              Simuleer verschillende verdelingsscenario's en beheer risico's bij gezamenlijk lenen.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Samen Lenen
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Eerlijke Verdeling
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Risicobeheer
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
          <div className="lg:col-span-1 space-y-6">
            
            {/* Loan Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-handshake mr-3 text-primary"></i>
                  Lening Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bedrag">Lening bedrag</Label>
                  <Input
                    id="bedrag"
                    type="number"
                    value={lening.bedrag}
                    onChange={(e) => setLening({...lening, bedrag: Number(e.target.value)})}
                    data-testid="input-lening-bedrag"
                  />
                </div>

                <div>
                  <Label htmlFor="doel">Doel van lening</Label>
                  <Select value={lening.doel} onValueChange={(value) => setLening({...lening, doel: value})}>
                    <SelectTrigger data-testid="select-lening-doel">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vastgoed">Vastgoed investering</SelectItem>
                      <SelectItem value="renovatie">Renovatie project</SelectItem>
                      <SelectItem value="business">Business venture</SelectItem>
                      <SelectItem value="auto">Voertuig aankoop</SelectItem>
                      <SelectItem value="vakantie">Gezamenlijke vakantie</SelectItem>
                      <SelectItem value="ander">Andere doeleinden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rente">Rente (%)</Label>
                  <Input
                    id="rente"
                    type="number"
                    step="0.1"
                    value={lening.rente}
                    onChange={(e) => setLening({...lening, rente: Number(e.target.value)})}
                    data-testid="input-lening-rente"
                  />
                </div>

                <div>
                  <Label htmlFor="looptijd">Looptijd (maanden)</Label>
                  <Select value={lening.looptijd.toString()} onValueChange={(value) => setLening({...lening, looptijd: Number(value)})}>
                    <SelectTrigger data-testid="select-lening-looptijd">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="36">36 maanden (3 jaar)</SelectItem>
                      <SelectItem value="60">60 maanden (5 jaar)</SelectItem>
                      <SelectItem value="84">84 maanden (7 jaar)</SelectItem>
                      <SelectItem value="120">120 maanden (10 jaar)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="afsluitkosten">Afsluitkosten</Label>
                  <Input
                    id="afsluitkosten"
                    type="number"
                    value={lening.afsluitkosten}
                    onChange={(e) => setLening({...lening, afsluitkosten: Number(e.target.value)})}
                    data-testid="input-afsluitkosten"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Distribution Type */}
            <Card>
              <CardHeader>
                <CardTitle>Verdeling Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={verdelingType} onValueChange={setVerdelingType}>
                  <SelectTrigger data-testid="select-verdeling-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inkomen">Op basis van inkomen</SelectItem>
                    <SelectItem value="gelijk">Gelijke verdeling</SelectItem>
                    <SelectItem value="custom">Aangepaste verdeling</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Deelnemers
                  <Button onClick={addDeelnemer} size="sm" data-testid="button-add-deelnemer">
                    <UserPlus className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {deelnemers.map((deelnemer, index) => (
                  <div key={deelnemer.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <Input
                        value={deelnemer.naam}
                        onChange={(e) => updateDeelnemer(deelnemer.id, 'naam', e.target.value)}
                        className="flex-1 mr-2"
                        data-testid={`input-deelnemer-naam-${index}`}
                      />
                      {deelnemers.length > 2 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDeelnemer(deelnemer.id)}
                          data-testid={`button-remove-deelnemer-${index}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div>
                      <Label className="text-sm">Maandelijks inkomen</Label>
                      <Input
                        type="number"
                        value={deelnemer.inkomen}
                        onChange={(e) => updateDeelnemer(deelnemer.id, 'inkomen', Number(e.target.value))}
                        data-testid={`input-deelnemer-inkomen-${index}`}
                      />
                    </div>

                    {verdelingType === "custom" && (
                      <div>
                        <Label className="text-sm">Aandeel (%)</Label>
                        <Input
                          type="number"
                          value={deelnemer.aandeel}
                          onChange={(e) => updateDeelnemer(deelnemer.id, 'aandeel', Number(e.target.value))}
                          data-testid={`input-deelnemer-aandeel-${index}`}
                        />
                      </div>
                    )}

                    <div className="text-sm text-muted-foreground">
                      <div>Aandeel: {deelnemer.aandeel.toFixed(1)}%</div>
                      <div>Maandlast: €{Math.round(deelnemer.maandlast)}</div>
                      <div>Schuldgraad: {((deelnemer.maandlast / deelnemer.inkomen) * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Key Results */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Totale Maandlast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary" data-testid="text-totale-maandlast">
                    €{Math.round(verdeling.maandlast)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Voor {lening.looptijd} maanden
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Totaal betaald:</span>
                      <span>€{Math.round(verdeling.totaalBetaald).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Totale rente:</span>
                      <span>€{Math.round(verdeling.totaleRente).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Risico Profiel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${verdeling.risicoProfiel === 'Laag' ? 'text-green-600' : verdeling.risicoProfiel === 'Gemiddeld' ? 'text-orange-600' : 'text-red-600'}`} data-testid="text-risico-profiel">
                    {verdeling.risicoProfiel}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Hoogste schuldgraad: {verdeling.hoogsteSchuld.toFixed(1)}%
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Inkomenskloof:</span>
                      <span>{verdeling.inkomenskloof.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deelnemers:</span>
                      <span>{deelnemers.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Warnings */}
            {verdeling.hoogsteSchuld > 35 && (
              <Alert>
                <AlertDescription>
                  ⚠️ Een deelnemer heeft een schuldgraad van {verdeling.hoogsteSchuld.toFixed(1)}%, wat de aanbevolen 35% overschrijdt.
                </AlertDescription>
              </Alert>
            )}

            {verdeling.inkomenskloof > 100 && (
              <Alert>
                <AlertDescription>
                  ⚠️ Grote inkomenskloof van {verdeling.inkomenskloof.toFixed(0)}% tussen deelnemers kan tot problemen leiden.
                </AlertDescription>
              </Alert>
            )}

            {/* Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Verdeling Overzicht</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={verdelingData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ naam, aandeel }) => `${naam}: ${aandeel.toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="aandeel"
                      >
                        {verdelingData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Mid Ad */}
            <GoogleAdsense slot="rectangle" />

            {/* Risk Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Risico Analyse per Deelnemer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={risicoData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="naam" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number, name: string) => [
                          name === 'schuldRatio' ? `${value.toFixed(1)}%` : `€${Math.round(value).toLocaleString()}`,
                          name === 'schuldRatio' ? 'Schuldgraad' : 'Inkomen'
                        ]}
                      />
                      <Bar dataKey="schuldRatio" fill="#8884d8" name="schuldRatio" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Gedetailleerde Verdeling</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Deelnemer</th>
                        <th className="text-right p-2">Inkomen</th>
                        <th className="text-right p-2">Aandeel</th>
                        <th className="text-right p-2">Maandlast</th>
                        <th className="text-right p-2">Schuldgraad</th>
                        <th className="text-right p-2">Totaal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {verdeling.bijgewerktDeelnemers.map((deelnemer, index) => {
                        const totaalBetaling = deelnemer.maandlast * lening.looptijd;
                        const schuldgraad = (deelnemer.maandlast / deelnemer.inkomen) * 100;
                        return (
                          <tr key={index} className="border-b">
                            <td className="p-2 font-medium">{deelnemer.naam}</td>
                            <td className="p-2 text-right">€{deelnemer.inkomen.toLocaleString()}</td>
                            <td className="p-2 text-right">{deelnemer.aandeel.toFixed(1)}%</td>
                            <td className="p-2 text-right">€{Math.round(deelnemer.maandlast)}</td>
                            <td className={`p-2 text-right ${schuldgraad > 35 ? 'text-red-600' : schuldgraad > 25 ? 'text-orange-600' : 'text-green-600'}`}>
                              {schuldgraad.toFixed(1)}%
                            </td>
                            <td className="p-2 text-right">€{Math.round(totaalBetaling).toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Aanbevelingen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Alert>
                    <AlertDescription>
                      📋 Stel een duidelijk contract op met afspraken over betalingen, wat er gebeurt bij wanbetaling, en hoe u de lening kunt beëindigen.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert>
                    <AlertDescription>
                      💡 Overweeg een hoofdelijke aansprakelijkheid als alle deelnemers financieel stabiel zijn, of kies voor individuele aansprakelijkheid bij risico's.
                    </AlertDescription>
                  </Alert>
                  
                  {verdeling.hoogsteSchuld > 30 && (
                    <Alert>
                      <AlertDescription>
                        ⚠️ Eén of meerdere deelnemers hebben een hoge schuldgraad. Overweeg een lagere lening of langere looptijd.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rate Comparison Widget */}
      <RateComparisonWidget productType="groepslening" title="Vergelijk Groepslening Aanbiedingen" />

      {/* Bottom Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GoogleAdsense slot="banner" className="w-full max-w-4xl mx-auto" />
      </section>

      {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} />}

      <Footer />
    </div>
  );
}