import { useState, lazy, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChartSkeleton } from "@/components/ui/chart-skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

const PensioenPillarsChart = lazy(() => import("./pensioen-pillars-chart"));
const PensioenScenariosChart = lazy(() => import("./pensioen-scenarios-chart"));

interface PensioenResult {
  eersteEijler: number;
  tweedePijler: number;
  derdePijler: number;
  totaalMaandelijks: number;
  vervangingsratio: number;
  tekort: number;
  doelInkomen: number;
  scenarios: Array<{
    jaar: number;
    spaardoel: number;
    werkelijk: number;
    tekort: number;
  }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function PensioenCalculator() {
  // Persoonlijke gegevens
  const [leeftijd, setLeeftijd] = useState<number>(35);
  const [pensioenLeeftijd, setPensioenLeeftijd] = useState<number>(67);
  const [huidigInkomen, setHuidigInkomen] = useState<number>(3500);
  const [geslacht, setGeslacht] = useState<string>("man");
  const [burgerlijkeStaat, setBurgerlijkeStaat] = useState<string>("gehuwd");
  
  // Carrière gegevens
  const [werkjaren, setWerkjaren] = useState<number>(42);
  const [gemiddeldInkomen, setGemiddeldInkomen] = useState<number>(3200);
  const [salarisgroei, setSalarisgroei] = useState<number>(2);
  
  // Tweede pijler
  const [werkgeversPensioen, setWerkgeversPensioen] = useState<number>(0);
  const [werkgeversPercentage, setWerkgeversPercentage] = useState<number>(3);
  const [werknemersPercentage, setWerknemersPercentage] = useState<number>(3);
  
  // Derde pijler
  const [pensioensparen, setPensioensparen] = useState<number>(1310);
  const [vrijePensioenBijdrage, setVrijePensioenBijdrage] = useState<number>(0);
  const [verwachtRendement, setVerwachtRendement] = useState<number>(4);
  
  // Doelen
  const [gewenstVervangingsratio, setGewenstVervangingsratio] = useState<number>(75);
  const [inflatie, setInflatie] = useState<number>(2);
  
  const [result, setResult] = useState<PensioenResult | null>(null);

  const berekenPensioen = () => {
    const jarenTotPensioen = pensioenLeeftijd - leeftijd;
    const toekomstigInkomen = huidigInkomen * Math.pow(1 + salarisgroei/100, jarenTotPensioen);
    
    // Eerste pijler berekening (vereenvoudigd)
    const basisPensioen = 1364; // Gemiddeld in 2024
    const maximumPensioen = 1732; // Maximum wettelijk pensioen
    const pensioensFactor = Math.min(werkjaren / 45, 1); // Max 45 jaar
    const inkomensVerhouding = Math.min(gemiddeldInkomen / 4000, 1); // Vereenvoudigd
    const eersteEijler = basisPensioen + (maximumPensioen - basisPensioen) * pensioensFactor * inkomensVerhouding;
    
    // Tweede pijler berekening
    const jaarlijkseBijdrage = huidigInkomen * 12 * (werkgeversPercentage + werknemersPercentage) / 100;
    const toekomstigKapitaal2ePijler = jaarlijkseBijdrage * (((Math.pow(1 + verwachtRendement/100, jarenTotPensioen) - 1) / (verwachtRendement/100)));
    const tweedePijler = (toekomstigKapitaal2ePijler + werkgeversPensioen) / 12 / 20; // 20 jaar uitkering
    
    // Derde pijler berekening
    const jaarlijksPensioensparen = pensioensparen + vrijePensioenBijdrage;
    const toekomstigKapitaal3ePijler = jaarlijksPensioensparen * (((Math.pow(1 + verwachtRendement/100, jarenTotPensioen) - 1) / (verwachtRendement/100)));
    const derdePijler = toekomstigKapitaal3ePijler / 12 / 20; // 20 jaar uitkering
    
    const totaalMaandelijks = eersteEijler + tweedePijler + derdePijler;
    const doelInkomen = (toekomstigInkomen * gewenstVervangingsratio) / 100;
    const vervangingsratio = (totaalMaandelijks / toekomstigInkomen) * 100;
    const tekort = Math.max(0, doelInkomen - totaalMaandelijks);
    
    // Scenario berekening voor de komende jaren
    const scenarios = [];
    for (let jaar = 0; jaar <= jarenTotPensioen; jaar += 5) {
      const jarenResterend = jarenTotPensioen - jaar;
      const huidigKapitaal = jaarlijksPensioensparen * jaar;
      const benodigdKapitaal = tekort * 12 * 20; // 20 jaar uitkering
      const spaardoel = benodigdKapitaal / ((Math.pow(1 + verwachtRendement/100, jarenResterend) - 1) / (verwachtRendement/100));
      
      scenarios.push({
        jaar: leeftijd + jaar,
        spaardoel: Math.max(0, spaardoel),
        werkelijk: huidigKapitaal,
        tekort: Math.max(0, spaardoel - huidigKapitaal)
      });
    }
    
    setResult({
      eersteEijler,
      tweedePijler,
      derdePijler,
      totaalMaandelijks,
      vervangingsratio,
      tekort,
      doelInkomen,
      scenarios
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-BE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const pieData = result ? [
    { name: '1e Pijler (Staat)', value: result.eersteEijler, color: '#0088FE' },
    { name: '2e Pijler (Werkgever)', value: result.tweedePijler, color: '#00C49F' },
    { name: '3e Pijler (Eigen)', value: result.derdePijler, color: '#FFBB28' }
  ] : [];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Tabs defaultValue="gegevens" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gegevens" data-testid="tab-gegevens">Persoonlijke Gegevens</TabsTrigger>
          <TabsTrigger value="pijlers" data-testid="tab-pijlers">Pensioen Pijlers</TabsTrigger>
          <TabsTrigger value="resultaten" data-testid="tab-resultaten">Resultaten & Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="gegevens" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-user mr-3 text-primary"></i>
                Persoonlijke Informatie
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="leeftijd">Huidige Leeftijd</Label>
                  <Input
                    id="leeftijd"
                    data-testid="input-leeftijd"
                    type="number"
                    value={leeftijd}
                    onChange={(e) => setLeeftijd(Number(e.target.value))}
                    min="18"
                    max="67"
                  />
                </div>
                
                <div>
                  <Label htmlFor="pensioen-leeftijd">Gewenste Pensioenleeftijd</Label>
                  <Input
                    id="pensioen-leeftijd"
                    data-testid="input-pensioen-leeftijd"
                    type="number"
                    value={pensioenLeeftijd}
                    onChange={(e) => setPensioenLeeftijd(Number(e.target.value))}
                    min="60"
                    max="70"
                  />
                </div>
                
                <div>
                  <Label htmlFor="huidig-inkomen">Huidig Bruto Maandinkomen (€)</Label>
                  <Input
                    id="huidig-inkomen"
                    data-testid="input-huidig-inkomen"
                    type="number"
                    value={huidigInkomen}
                    onChange={(e) => setHuidigInkomen(Number(e.target.value))}
                    step="100"
                  />
                </div>

                <div>
                  <Label htmlFor="geslacht">Geslacht</Label>
                  <Select value={geslacht} onValueChange={setGeslacht}>
                    <SelectTrigger data-testid="select-geslacht">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="man">Man</SelectItem>
                      <SelectItem value="vrouw">Vrouw</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="werkjaren">Totaal Aantal Werkjaren</Label>
                  <Input
                    id="werkjaren"
                    data-testid="input-werkjaren"
                    type="number"
                    value={werkjaren}
                    onChange={(e) => setWerkjaren(Number(e.target.value))}
                    min="1"
                    max="50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="gemiddeld-inkomen">Gemiddeld Inkomen Carrière (€)</Label>
                  <Input
                    id="gemiddeld-inkomen"
                    data-testid="input-gemiddeld-inkomen"
                    type="number"
                    value={gemiddeldInkomen}
                    onChange={(e) => setGemiddeldInkomen(Number(e.target.value))}
                    step="100"
                  />
                </div>
                
                <div>
                  <Label htmlFor="salarisgroei">Verwachte Salarisgroei (%)</Label>
                  <Input
                    id="salarisgroei"
                    data-testid="input-salarisgroei"
                    type="number"
                    value={salarisgroei}
                    onChange={(e) => setSalarisgroei(Number(e.target.value))}
                    step="0.5"
                    min="0"
                    max="10"
                  />
                </div>

                <div>
                  <Label htmlFor="burgerlijke-staat">Burgerlijke Staat</Label>
                  <Select value={burgerlijkeStaat} onValueChange={setBurgerlijkeStaat}>
                    <SelectTrigger data-testid="select-burgerlijke-staat">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alleenstaand">Alleenstaand</SelectItem>
                      <SelectItem value="gehuwd">Gehuwd</SelectItem>
                      <SelectItem value="wettelijk_samenwonend">Wettelijk Samenwonend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pijlers" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <i className="fas fa-landmark mr-3 text-blue-600"></i>
                  1e Pijler - Wettelijk Pensioen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertDescription>
                    Automatisch berekend op basis van uw werkjaren en gemiddeld inkomen.
                    Maximum: €1.732/maand (2024).
                  </AlertDescription>
                </Alert>
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Het wettelijk pensioen wordt berekend door de RVP/SFP op basis van uw volledige carrière.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <i className="fas fa-building mr-3 text-green-600"></i>
                  2e Pijler - Aanvullend Pensioen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="werkgevers-pensioen">Bestaand Werkgeverspensioen (€)</Label>
                  <Input
                    id="werkgevers-pensioen"
                    data-testid="input-werkgevers-pensioen"
                    type="number"
                    value={werkgeversPensioen}
                    onChange={(e) => setWerkgeversPensioen(Number(e.target.value))}
                    step="1000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="werkgevers-percentage">Werkgeversbijdrage (%)</Label>
                  <Input
                    id="werkgevers-percentage"
                    data-testid="input-werkgevers-percentage"
                    type="number"
                    value={werkgeversPercentage}
                    onChange={(e) => setWerkgeversPercentage(Number(e.target.value))}
                    step="0.5"
                    min="0"
                    max="10"
                  />
                </div>
                
                <div>
                  <Label htmlFor="werknemers-percentage">Werknemersbijdrage (%)</Label>
                  <Input
                    id="werknemers-percentage"
                    data-testid="input-werknemers-percentage"
                    type="number"
                    value={werknemersPercentage}
                    onChange={(e) => setWerknemersPercentage(Number(e.target.value))}
                    step="0.5"
                    min="0"
                    max="10"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <i className="fas fa-piggy-bank mr-3 text-orange-600"></i>
                  3e Pijler - Eigen Pensioenopbouw
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="pensioensparen">Pensioensparen per jaar (€)</Label>
                  <Input
                    id="pensioensparen"
                    data-testid="input-pensioensparen"
                    type="number"
                    value={pensioensparen}
                    onChange={(e) => setPensioensparen(Number(e.target.value))}
                    step="50"
                    max="1310"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Maximum: €1.310 (belastingvoordeel)</p>
                </div>
                
                <div>
                  <Label htmlFor="vrije-pensioen-bijdrage">Vrije Pensioen Aanvulling (€/jaar)</Label>
                  <Input
                    id="vrije-pensioen-bijdrage"
                    data-testid="input-vrije-pensioen-bijdrage"
                    type="number"
                    value={vrijePensioenBijdrage}
                    onChange={(e) => setVrijePensioenBijdrage(Number(e.target.value))}
                    step="100"
                  />
                </div>
                
                <div>
                  <Label htmlFor="verwacht-rendement">Verwacht Rendement (%)</Label>
                  <Input
                    id="verwacht-rendement"
                    data-testid="input-verwacht-rendement"
                    type="number"
                    value={verwachtRendement}
                    onChange={(e) => setVerwachtRendement(Number(e.target.value))}
                    step="0.5"
                    min="0"
                    max="12"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-bullseye mr-3 text-primary"></i>
                Pensioen Doelstellingen
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="gewenst-vervangingsratio">Gewenste Vervangingsratio (%)</Label>
                <Input
                  id="gewenst-vervangingsratio"
                  data-testid="input-gewenst-vervangingsratio"
                  type="number"
                  value={gewenstVervangingsratio}
                  onChange={(e) => setGewenstVervangingsratio(Number(e.target.value))}
                  step="5"
                  min="50"
                  max="100"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Aanbevolen: 75-85% van laatste salaris
                </p>
              </div>
              
              <div>
                <Label htmlFor="inflatie">Verwachte Inflatie (%)</Label>
                <Input
                  id="inflatie"
                  data-testid="input-inflatie"
                  type="number"
                  value={inflatie}
                  onChange={(e) => setInflatie(Number(e.target.value))}
                  step="0.1"
                  min="0"
                  max="5"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button 
              onClick={berekenPensioen} 
              size="lg" 
              className="px-12"
              data-testid="button-bereken-pensioen"
            >
              <i className="fas fa-calculator mr-2"></i>
              Bereken Mijn Pensioen
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="resultaten" className="space-y-6">
          {result && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary" data-testid="text-totaal-pensioen">
                        {formatCurrency(result.totaalMaandelijks)}
                      </div>
                      <p className="text-muted-foreground">Totaal Pensioen/Maand</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600" data-testid="text-vervangingsratio">
                        {result.vervangingsratio.toFixed(1)}%
                      </div>
                      <p className="text-muted-foreground">Vervangingsratio</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600" data-testid="text-doel-inkomen">
                        {formatCurrency(result.doelInkomen)}
                      </div>
                      <p className="text-muted-foreground">Doel Pensioeninkomen</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${result.tekort > 0 ? 'text-red-600' : 'text-green-600'}`} data-testid="text-tekort">
                        {result.tekort > 0 ? `-${formatCurrency(result.tekort)}` : '✓ Voldoende'}
                      </div>
                      <p className="text-muted-foreground">Maandelijks Tekort</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Verdeling Pensioen Pijlers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div style={{ height: 300 }}>
                      <Suspense fallback={<ChartSkeleton />}>
                        <PensioenPillarsChart data={pieData} colors={COLORS} />
                      </Suspense>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Detailanalyse per Pijler</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <div className="flex items-center">
                          <i className="fas fa-landmark mr-3 text-blue-600"></i>
                          <span className="font-medium">1e Pijler (Wettelijk)</span>
                        </div>
                        <Badge variant="secondary" data-testid="badge-eerste-pijler">
                          {formatCurrency(result.eersteEijler)}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                        <div className="flex items-center">
                          <i className="fas fa-building mr-3 text-green-600"></i>
                          <span className="font-medium">2e Pijler (Werkgever)</span>
                        </div>
                        <Badge variant="secondary" data-testid="badge-tweede-pijler">
                          {formatCurrency(result.tweedePijler)}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                        <div className="flex items-center">
                          <i className="fas fa-piggy-bank mr-3 text-orange-600"></i>
                          <span className="font-medium">3e Pijler (Eigen)</span>
                        </div>
                        <Badge variant="secondary" data-testid="badge-derde-pijler">
                          {formatCurrency(result.derdePijler)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {result.scenarios.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Spaardoel Scenario's</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div style={{ height: 300 }}>
                      <Suspense fallback={<ChartSkeleton />}>
                        <PensioenScenariosChart data={result.scenarios} />
                      </Suspense>
                    </div>
                  </CardContent>
                </Card>
              )}

              {result.tekort > 0 && (
                <Alert>
                  <i className="fas fa-exclamation-triangle"></i>
                  <AlertDescription>
                    <strong>Actie Vereist:</strong> U heeft een maandelijks tekort van {formatCurrency(result.tekort)}. 
                    Overweeg uw pensioensparen te verhogen of langer door te werken.
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}

          {!result && (
            <Card>
              <CardContent className="py-12 text-center">
                <i className="fas fa-calculator text-4xl text-muted-foreground mb-4"></i>
                <p className="text-lg text-muted-foreground">
                  Vul uw gegevens in en klik op "Bereken Mijn Pensioen" om uw pensioenplanning te zien.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}