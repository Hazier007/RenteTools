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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function LeasingkredietCalculatorPage() {
  const seoConfig = getSeoConfig("leasingkrediet-calculator");
  useSeoTags("leasingkrediet-calculator");

  const [leasingType, setLeasingType] = useState<string>("financial");
  const [assetType, setAssetType] = useState<string>("auto");
  const [aanschafprijs, setAanschafprijs] = useState<number>(35000);
  const [restwaarde, setRestwaarde] = useState<number>(12000);
  const [looptijd, setLooptijd] = useState<number>(48);
  const [rente, setRente] = useState<number>(4.2);
  const [btw, setBtw] = useState<number>(21);
  const [onderhoud, setOnderhoud] = useState<number>(150);
  const [verzekering, setVerzekering] = useState<number>(200);
  const [belastingvoordeel, setBelastingvoordeel] = useState<number>(33);
  const [kilometerLimiet, setKilometerLimiet] = useState<number>(20000);

  // Financial leasing calculation
  const berekenFinancialLeasing = () => {
    const financieringsBedrag = aanschafprijs - restwaarde;
    const maandRente = rente / 100 / 12;
    const aantalMaanden = looptijd;
    
    // Calculate monthly payment using annuity formula
    const maandlast = financieringsBedrag * 
      (maandRente * Math.pow(1 + maandRente, aantalMaanden)) /
      (Math.pow(1 + maandRente, aantalMaanden) - 1);
    
    const basisMaandlast = maandlast;
    const btwBedrag = basisMaandlast * (btw / 100);
    const totaalMaandlast = basisMaandlast + btwBedrag;
    
    const totaalBetaald = totaalMaandlast * aantalMaanden;
    const totaleKosten = totaalBetaald + restwaarde;
    const totaleRente = totaalBetaald - financieringsBedrag;
    
    // Tax benefits
    const maandelijksVoordeel = totaalMaandlast * (belastingvoordeel / 100);
    const nettoMaandlast = totaalMaandlast - maandelijksVoordeel;
    
    return {
      basisMaandlast,
      btwBedrag,
      totaalMaandlast,
      nettoMaandlast,
      totaalBetaald,
      totaleKosten,
      totaleRente,
      maandelijksVoordeel,
      effectieveKost: nettoMaandlast * aantalMaanden + restwaarde
    };
  };

  // Operational leasing calculation
  const berekenOperationalLeasing = () => {
    // Base monthly rate calculation (simplified operational leasing formula)
    const depreciatie = (aanschafprijs - restwaarde) / looptijd;
    const renteKost = (aanschafprijs + restwaarde) / 2 * (rente / 100) / 12;
    const basisMaandlast = depreciatie + renteKost + onderhoud + verzekering;
    
    const btwBedrag = basisMaandlast * (btw / 100);
    const totaalMaandlast = basisMaandlast + btwBedrag;
    
    const totaalBetaald = totaalMaandlast * looptijd;
    
    // Tax benefits (usually higher for operational leasing)
    const maandelijksVoordeel = totaalMaandlast * (belastingvoordeel / 100);
    const nettoMaandlast = totaalMaandlast - maandelijksVoordeel;
    
    return {
      basisMaandlast,
      btwBedrag,
      totaalMaandlast,
      nettoMaandlast,
      totaalBetaald,
      maandelijksVoordeel,
      effectieveKost: nettoMaandlast * looptijd,
      depreciatie: depreciatie,
      renteKost: renteKost * 12,
      onderhoudsKost: onderhoud * looptijd,
      verzekeringsKost: verzekering * looptijd
    };
  };

  const financialLeasing = berekenFinancialLeasing();
  const operationalLeasing = berekenOperationalLeasing();

  // Create comparison data
  const vergelijkingData = [
    {
      aspect: "Maandlast (excl. BTW)",
      financial: Math.round(financialLeasing.basisMaandlast),
      operational: Math.round(operationalLeasing.basisMaandlast)
    },
    {
      aspect: "Maandlast (incl. BTW)",
      financial: Math.round(financialLeasing.totaalMaandlast),
      operational: Math.round(operationalLeasing.totaalMaandlast)
    },
    {
      aspect: "Netto maandlast",
      financial: Math.round(financialLeasing.nettoMaandlast),
      operational: Math.round(operationalLeasing.nettoMaandlast)
    },
    {
      aspect: "Totale kosten",
      financial: Math.round(financialLeasing.effectieveKost),
      operational: Math.round(operationalLeasing.effectieveKost)
    }
  ];

  // Create cost breakdown for operational leasing
  const kostenBreakdown = [
    { name: 'Depreciatie', value: operationalLeasing.depreciatie * looptijd, color: '#8884d8' },
    { name: 'Rente', value: operationalLeasing.renteKost, color: '#82ca9d' },
    { name: 'Onderhoud', value: operationalLeasing.onderhoudsKost, color: '#ffc658' },
    { name: 'Verzekering', value: operationalLeasing.verzekeringsKost, color: '#ff7300' },
    { name: 'BTW', value: operationalLeasing.btwBedrag * looptijd, color: '#00ff88' }
  ];

  // Create monthly payment evolution
  const createPaymentEvolution = () => {
    const data = [];
    for (let maand = 6; maand <= looptijd; maand += 6) {
      data.push({
        maand: `M${maand}`,
        financial: financialLeasing.nettoMaandlast,
        operational: operationalLeasing.nettoMaandlast,
        verschil: Math.round(financialLeasing.nettoMaandlast - operationalLeasing.nettoMaandlast)
      });
    }
    return data;
  };

  const paymentEvolution = createPaymentEvolution();

  // Asset type specific calculations
  const getAssetSpecificInfo = () => {
    switch (assetType) {
      case "auto":
        return {
          title: "Auto Leasing",
          depreciation: "Snelle waardedaling",
          benefits: "Volledige aftrekbaarheid mogelijk",
          considerations: "Kilometerbeperking en onderhoud"
        };
      case "machines":
        return {
          title: "Machine Leasing",
          depreciation: "Langzame waardedaling",
          benefits: "Investering aftrekbaar",
          considerations: "Technische veroudering"
        };
      case "equipment":
        return {
          title: "Apparatuur Leasing",
          depreciation: "Variabele waardedaling",
          benefits: "Flexibiliteit en updates",
          considerations: "Technologische evolutie"
        };
      default:
        return {
          title: "Asset Leasing",
          depreciation: "Standaard waardedaling",
          benefits: "Fiscale voordelen",
          considerations: "Contractvoorwaarden"
        };
    }
  };

  const assetInfo = getAssetSpecificInfo();

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Leasingkrediet Calculator België
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Vergelijk financial en operational leasing voor auto's, machines en apparatuur. 
              Bereken kosten, fiscale voordelen en maak de beste keuze voor uw onderneming.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Financial Leasing
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Operational Leasing
              </Badge>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                Fiscale Voordelen
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
                  <i className="fas fa-car mr-3 text-primary"></i>
                  Leasing Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="assetType">Type Asset</Label>
                  <Select value={assetType} onValueChange={setAssetType}>
                    <SelectTrigger data-testid="select-asset-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto/Voertuig</SelectItem>
                      <SelectItem value="machines">Machines</SelectItem>
                      <SelectItem value="equipment">Apparatuur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="aanschafprijs">Aanschafprijs</Label>
                  <Input
                    id="aanschafprijs"
                    type="number"
                    value={aanschafprijs}
                    onChange={(e) => setAanschafprijs(Number(e.target.value))}
                    data-testid="input-aanschafprijs"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Nieuwprijs van het asset
                  </p>
                </div>

                <div>
                  <Label htmlFor="restwaarde">Restwaarde</Label>
                  <Input
                    id="restwaarde"
                    type="number"
                    value={restwaarde}
                    onChange={(e) => setRestwaarde(Number(e.target.value))}
                    data-testid="input-restwaarde"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Verwachte waarde eind contract
                  </p>
                </div>

                <div>
                  <Label htmlFor="looptijd">Looptijd (maanden)</Label>
                  <Select value={looptijd.toString()} onValueChange={(value) => setLooptijd(Number(value))}>
                    <SelectTrigger data-testid="select-looptijd">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24">24 maanden</SelectItem>
                      <SelectItem value="36">36 maanden</SelectItem>
                      <SelectItem value="48">48 maanden</SelectItem>
                      <SelectItem value="60">60 maanden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rente">Rentevoet (%)</Label>
                  <Input
                    id="rente"
                    type="number"
                    step="0.1"
                    value={rente}
                    onChange={(e) => setRente(Number(e.target.value))}
                    data-testid="input-rente"
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Operationele Kosten</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="onderhoud">Onderhoud (per maand)</Label>
                      <Input
                        id="onderhoud"
                        type="number"
                        value={onderhoud}
                        onChange={(e) => setOnderhoud(Number(e.target.value))}
                        data-testid="input-onderhoud"
                      />
                    </div>

                    <div>
                      <Label htmlFor="verzekering">Verzekering (per maand)</Label>
                      <Input
                        id="verzekering"
                        type="number"
                        value={verzekering}
                        onChange={(e) => setVerzekering(Number(e.target.value))}
                        data-testid="input-verzekering"
                      />
                    </div>

                    <div>
                      <Label htmlFor="btw">BTW (%)</Label>
                      <Input
                        id="btw"
                        type="number"
                        value={btw}
                        onChange={(e) => setBtw(Number(e.target.value))}
                        data-testid="input-btw"
                      />
                    </div>

                    <div>
                      <Label htmlFor="belastingvoordeel">Belastingvoordeel (%)</Label>
                      <Input
                        id="belastingvoordeel"
                        type="number"
                        value={belastingvoordeel}
                        onChange={(e) => setBelastingvoordeel(Number(e.target.value))}
                        data-testid="input-belastingvoordeel"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Uw marginaal belastingtarief
                      </p>
                    </div>
                  </div>
                </div>

                {assetType === "auto" && (
                  <div className="border-t pt-4">
                    <div>
                      <Label htmlFor="kilometerLimiet">Kilometer limiet (per jaar)</Label>
                      <Input
                        id="kilometerLimiet"
                        type="number"
                        value={kilometerLimiet}
                        onChange={(e) => setKilometerLimiet(Number(e.target.value))}
                        data-testid="input-kilometer-limiet"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Asset Type Info */}
            <Card>
              <CardHeader>
                <CardTitle>{assetInfo.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Waardedaling:</strong>
                    <p className="text-muted-foreground">{assetInfo.depreciation}</p>
                  </div>
                  <div>
                    <strong>Voordelen:</strong>
                    <p className="text-muted-foreground">{assetInfo.benefits}</p>
                  </div>
                  <div>
                    <strong>Aandachtspunten:</strong>
                    <p className="text-muted-foreground">{assetInfo.considerations}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leasing Comparison */}
            <Tabs defaultValue="vergelijking" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="vergelijking">Vergelijking</TabsTrigger>
                <TabsTrigger value="financial">Financial Leasing</TabsTrigger>
                <TabsTrigger value="operational">Operational Leasing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="vergelijking" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial vs Operational Leasing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={vergelijkingData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="aspect" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
                          <Bar dataKey="financial" fill="#8884d8" name="Financial Leasing" />
                          <Bar dataKey="operational" fill="#82ca9d" name="Operational Leasing" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-600">Financial Leasing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Netto maandlast:</span>
                          <span className="font-bold" data-testid="text-financial-netto">
                            €{Math.round(financialLeasing.nettoMaandlast)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Totale kosten:</span>
                          <span>€{Math.round(financialLeasing.effectieveKost).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Belastingvoordeel:</span>
                          <span className="text-green-600">€{Math.round(financialLeasing.maandelijksVoordeel)}/maand</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Eigendom einde:</span>
                          <span className="text-blue-600">Optie tot koop</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-green-600">Operational Leasing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Netto maandlast:</span>
                          <span className="font-bold" data-testid="text-operational-netto">
                            €{Math.round(operationalLeasing.nettoMaandlast)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Totale kosten:</span>
                          <span>€{Math.round(operationalLeasing.effectieveKost).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Belastingvoordeel:</span>
                          <span className="text-green-600">€{Math.round(operationalLeasing.maandelijksVoordeel)}/maand</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Eigendom einde:</span>
                          <span className="text-orange-600">Geen eigendom</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="financial" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Leasing Details</CardTitle>
                    <p className="text-muted-foreground">
                      U financiert het asset en wordt eigenaar
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Basis maandlast:</span>
                          <div className="font-bold">€{Math.round(financialLeasing.basisMaandlast)}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">BTW:</span>
                          <div>€{Math.round(financialLeasing.btwBedrag)}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Totaal incl. BTW:</span>
                          <div>€{Math.round(financialLeasing.totaalMaandlast)}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Belastingvoordeel:</span>
                          <div className="text-green-600">-€{Math.round(financialLeasing.maandelijksVoordeel)}</div>
                        </div>
                      </div>
                      
                      <Alert>
                        <AlertDescription>
                          Bij financial leasing wordt u eigenaar van het asset en kunt u het afschrijven. 
                          De restwaarde van €{restwaarde.toLocaleString()} komt bij u terecht.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="operational" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Operational Leasing Details</CardTitle>
                    <p className="text-muted-foreground">
                      All-in service met onderhoud en verzekering
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={kostenBreakdown}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {kostenBreakdown.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => [`€${Math.round(value).toLocaleString()}`]} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <Alert>
                        <AlertDescription>
                          Bij operational leasing zijn onderhoud en verzekering meestal inbegrepen. 
                          U blijft geen eigenaar maar heeft wel volledige aftrekbaarheid.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Mid Ad */}
            <GoogleAdsense slot="rectangle" />

            {/* Monthly Evolution */}
            <Card>
              <CardHeader>
                <CardTitle>Maandlast Evolutie</CardTitle>
                <p className="text-muted-foreground">
                  Vergelijking netto maandlasten over de contractperiode
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={paymentEvolution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="maand" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number, name: string) => [
                          `€${Math.round(value)}`, 
                          name === 'financial' ? 'Financial' : name === 'operational' ? 'Operational' : 'Verschil'
                        ]}
                      />
                      <Line type="monotone" dataKey="financial" stroke="#8884d8" name="financial" />
                      <Line type="monotone" dataKey="operational" stroke="#82ca9d" name="operational" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recommendation */}
            <Card>
              <CardHeader>
                <CardTitle>Aanbeveling</CardTitle>
              </CardHeader>
              <CardContent>
                {operationalLeasing.nettoMaandlast < financialLeasing.nettoMaandlast ? (
                  <Alert>
                    <AlertDescription>
                      💡 <strong>Operational leasing</strong> is €{Math.round(financialLeasing.nettoMaandlast - operationalLeasing.nettoMaandlast)} per maand goedkoper 
                      en biedt meer flexibiliteit met inbegrepen services.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert>
                    <AlertDescription>
                      💡 <strong>Financial leasing</strong> is €{Math.round(operationalLeasing.nettoMaandlast - financialLeasing.nettoMaandlast)} per maand goedkoper 
                      en u wordt eigenaar van het asset.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rate Comparison Widget */}
      <RateComparisonWidget productType="leasing" title="Vergelijk Leasing Aanbiedingen" />

      {/* Bottom Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <GoogleAdsense slot="banner" className="w-full max-w-4xl mx-auto" />
      </section>

      {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} />}

      <Footer />
    </div>
  );
}