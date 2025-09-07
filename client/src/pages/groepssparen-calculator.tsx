import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function GroepssparenCalculatorPage() {
  const [aantalDeelnemers, setAantalDeelnemers] = useState<number>(10);
  const [maandelijkeBijdrage, setMaandelijkeBijdrage] = useState<number>(50);
  const [looptijd, setLooptijd] = useState<number>(24);
  const [organisatieKosten, setOrganisatieKosten] = useState<number>(2);
  const [verdeling, setVerdeling] = useState<string>("gelijk");
  const [doel, setDoel] = useState<string>("feest");
  const [rente, setRente] = useState<number>(1.5);

  // Calculate group savings scenarios
  const berekenGroepssparen = () => {
    const totaalMaandelijks = aantalDeelnemers * maandelijkeBijdrage;
    const totaalIngelegd = totaalMaandelijks * looptijd;
    
    // Organization costs
    const kostenTotaal = (totaalIngelegd * organisatieKosten) / 100;
    const nettoIngelegd = totaalIngelegd - kostenTotaal;
    
    // Interest calculation (simple for group savings)
    const renteOpbrengst = (nettoIngelegd * rente * looptijd) / (100 * 12);
    const eindwaarde = nettoIngelegd + renteOpbrengst;
    
    // Distribution calculation
    let verdelingDetails;
    if (verdeling === "gelijk") {
      const perPersone = eindwaarde / aantalDeelnemers;
      verdelingDetails = Array.from({length: aantalDeelnemers}, (_, i) => ({
        persoon: i + 1,
        bijdrage: maandelijkeBijdrage * looptijd,
        uitkering: perPersone,
        verschil: perPersone - (maandelijkeBijdrage * looptijd)
      }));
    } else if (verdeling === "bijdrage") {
      // Distribution based on contribution
      verdelingDetails = Array.from({length: aantalDeelnemers}, (_, i) => {
        const persoonBijdrage = maandelijkeBijdrage * looptijd;
        const uitkering = (persoonBijdrage / totaalIngelegd) * eindwaarde;
        return {
          persoon: i + 1,
          bijdrage: persoonBijdrage,
          uitkering,
          verschil: uitkering - persoonBijdrage
        };
      });
    } else {
      // Lottery system - one person gets all (minus contributions back)
      const winnaar = Math.floor(Math.random() * aantalDeelnemers) + 1;
      const bijdrageTerug = maandelijkeBijdrage * looptijd;
      const bonus = eindwaarde - totaalIngelegd;
      
      verdelingDetails = Array.from({length: aantalDeelnemers}, (_, i) => ({
        persoon: i + 1,
        bijdrage: bijdrageTerug,
        uitkering: i + 1 === winnaar ? bijdrageTerug + bonus : bijdrageTerug,
        verschil: i + 1 === winnaar ? bonus : 0
      }));
    }
    
    return {
      totaalMaandelijks,
      totaalIngelegd,
      kostenTotaal,
      nettoIngelegd,
      renteOpbrengst,
      eindwaarde,
      verdelingDetails,
      gemiddeldeWinst: (eindwaarde - totaalIngelegd) / aantalDeelnemers
    };
  };

  const groepssparen = berekenGroepssparen();

  // Goal definitions
  const doelen: Record<string, { naam: string; beschrijving: string; typischBedrag: number }> = {
    "feest": { naam: "Groepsfeest organiseren", beschrijving: "Uitgebreid feest voor alle deelnemers", typischBedrag: 2000 },
    "uitstap": { naam: "Groepsuitstap", beschrijving: "Weekend weg of daguitstap", typischBedrag: 1500 },
    "cadeau": { naam: "Groepscadeau", beschrijving: "Groot cadeau voor iemand", typischBedrag: 1000 },
    "vakantie": { naam: "Groepsvakantie", beschrijving: "Vakantie met de hele groep", typischBedrag: 5000 },
    "investering": { naam: "Gezamenlijke investering", beschrijving: "Samen investeren in project", typischBedrag: 10000 }
  };

  const huidigDoel = doelen[doel];
  const doelBereikt = groepssparen.eindwaarde >= huidigDoel.typischBedrag;

  // Timeline showing monthly progression
  const maandelijksProgressie = () => {
    const progressie = [];
    let cumulatief = 0;
    
    for (let maand = 0; maand <= looptijd; maand++) {
      if (maand > 0) {
        cumulatief += groepssparen.totaalMaandelijks;
        // Add monthly interest
        cumulatief += (cumulatief * rente) / (100 * 12);
      }
      
      progressie.push({
        maand,
        bedrag: Math.round(cumulatief),
        doel: huidigDoel.typischBedrag,
        doelBereikt: cumulatief >= huidigDoel.typischBedrag
      });
    }
    
    return progressie;
  };

  const progressie = maandelijksProgressie();

  // Compare different group sizes
  const vergelijkGroepsgroottes = () => {
    const groottes = [5, 10, 15, 20, 25];
    return groottes.map(grootte => {
      const totaalMaand = grootte * maandelijkeBijdrage;
      const totaalInleg = totaalMaand * looptijd;
      const kosten = (totaalInleg * organisatieKosten) / 100;
      const netto = totaalInleg - kosten;
      const renteOpbrengst = (netto * rente * looptijd) / (100 * 12);
      const eind = netto + renteOpbrengst;
      
      return {
        grootte,
        totaalMaandelijks: totaalMaand,
        eindwaarde: Math.round(eind),
        perPersoon: Math.round(eind / grootte),
        winstPerPersoon: Math.round((eind - totaalInleg) / grootte)
      };
    });
  };

  const grootteVergelijking = vergelijkGroepsgroottes();

  return (
    <div className="min-h-screen bg-background">
      <Header activeCalculator="groepssparen" onCalculatorChange={() => {}} />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Groepssparen Calculator België - Samen Sparen voor Gezamenlijke Doelen
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Plan en bereken groepssparen met vrienden, familie of collega's. Ontdek hoe u samen 
            kunt sparen voor feesten, uitstappen, cadeaus of grote gezamenlijke doelen.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">👥 Kracht van samen sparen:</p>
            <p className="text-sm opacity-90">
              Groepssparen maakt grote doelen bereikbaar en creëert samen verantwoordelijkheid voor financiële planning.
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
            
            {/* Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  <i className="fas fa-users mr-3 text-primary"></i>
                  Groepssparen Calculator - Plan samen sparen
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken hoe u met vrienden, familie of collega's samen kunt sparen voor 
                  gezamenlijke doelen en ontdek verschillende verdelingssystemen.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Input Form */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-600">👥 Groep details</h3>
                    
                    <div>
                      <Label htmlFor="deelnemers">Aantal deelnemers</Label>
                      <Select value={aantalDeelnemers.toString()} onValueChange={(value) => setAantalDeelnemers(Number(value))}>
                        <SelectTrigger data-testid="select-deelnemers">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 personen</SelectItem>
                          <SelectItem value="5">5 personen</SelectItem>
                          <SelectItem value="8">8 personen</SelectItem>
                          <SelectItem value="10">10 personen</SelectItem>
                          <SelectItem value="15">15 personen</SelectItem>
                          <SelectItem value="20">20 personen</SelectItem>
                          <SelectItem value="25">25 personen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="bijdrage">Maandelijkse bijdrage per persoon (€)</Label>
                      <Input
                        id="bijdrage"
                        type="number"
                        value={maandelijkeBijdrage}
                        onChange={(e) => setMaandelijkeBijdrage(Number(e.target.value))}
                        placeholder="50"
                        data-testid="input-bijdrage"
                      />
                    </div>

                    <div>
                      <Label htmlFor="looptijd">Spaartijd (maanden)</Label>
                      <Select value={looptijd.toString()} onValueChange={(value) => setLooptijd(Number(value))}>
                        <SelectTrigger data-testid="select-looptijd">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 maanden</SelectItem>
                          <SelectItem value="12">12 maanden</SelectItem>
                          <SelectItem value="18">18 maanden</SelectItem>
                          <SelectItem value="24">24 maanden</SelectItem>
                          <SelectItem value="36">36 maanden</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="verdeling">Verdelingssysteem</Label>
                      <Select value={verdeling} onValueChange={setVerdeling}>
                        <SelectTrigger data-testid="select-verdeling">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gelijk">Gelijk verdelen</SelectItem>
                          <SelectItem value="bijdrage">Naar bijdrage</SelectItem>
                          <SelectItem value="loterij">Loterij systeem</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="doel">Spaardoel</Label>
                      <Select value={doel} onValueChange={setDoel}>
                        <SelectTrigger data-testid="select-doel">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="feest">Groepsfeest (€2.000)</SelectItem>
                          <SelectItem value="uitstap">Groepsuitstap (€1.500)</SelectItem>
                          <SelectItem value="cadeau">Groepscadeau (€1.000)</SelectItem>
                          <SelectItem value="vakantie">Groepsvakantie (€5.000)</SelectItem>
                          <SelectItem value="investering">Gezamenlijke investering (€10.000)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="kosten">Organisatiekosten (%)</Label>
                      <Input
                        id="kosten"
                        type="number"
                        step="0.5"
                        value={organisatieKosten}
                        onChange={(e) => setOrganisatieKosten(Number(e.target.value))}
                        placeholder="2"
                        data-testid="input-kosten"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Kosten voor beheer, administratie, bank
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="rente">Verwachte rente (%)</Label>
                      <Input
                        id="rente"
                        type="number"
                        step="0.1"
                        value={rente}
                        onChange={(e) => setRente(Number(e.target.value))}
                        placeholder="1.5"
                        data-testid="input-rente"
                      />
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">📊 Groepssparen resultaten:</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Deelnemers:</span>
                        <span className="font-semibold">{aantalDeelnemers} personen</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Totaal per maand:</span>
                        <span className="font-semibold" data-testid="result-monthly">€{groepssparen.totaalMaandelijks.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Spaartijd:</span>
                        <span className="font-semibold">{looptijd} maanden</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Totaal ingelegd:</span>
                        <span className="font-semibold">€{groepssparen.totaalIngelegd.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Organisatiekosten:</span>
                        <span className="font-semibold text-red-600" data-testid="result-costs">-€{Math.round(groepssparen.kostenTotaal).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Rente opbrengst:</span>
                        <span className="font-semibold text-green-600" data-testid="result-interest">+€{Math.round(groepssparen.renteOpbrengst).toLocaleString()}</span>
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="font-semibold">Totale eindwaarde:</span>
                          <span className="font-bold text-primary text-lg" data-testid="result-total">€{Math.round(groepssparen.eindwaarde).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Gemiddelde winst per persoon:</span>
                        <span className="font-semibold text-green-600" data-testid="result-profit">€{Math.round(groepssparen.gemiddeldeWinst).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-background rounded">
                      <h4 className="font-semibold mb-2">🎯 Doel: {huidigDoel.naam}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{huidigDoel.beschrijving}</p>
                      <div className="flex justify-between text-sm">
                        <span>Benodigde bedrag:</span>
                        <span className="font-semibold">€{huidigDoel.typischBedrag.toLocaleString()}</span>
                      </div>
                      <Badge variant={doelBereikt ? "default" : "secondary"} className="mt-2">
                        {doelBereikt ? "✅ Doel bereikt!" : "⏳ Nog niet bereikt"}
                      </Badge>
                      {!doelBereikt && (
                        <p className="text-xs text-orange-600 mt-1">
                          Tekort: €{(huidigDoel.typischBedrag - groepssparen.eindwaarde).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Distribution Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-green-600">💰 Verdeling per persoon</h3>
                    
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg max-h-64 overflow-y-auto">
                      <h4 className="font-semibold mb-3">Systeem: {
                        verdeling === "gelijk" ? "Gelijk verdelen" :
                        verdeling === "bijdrage" ? "Naar bijdrage" : "Loterij systeem"
                      }</h4>
                      
                      {groepssparen.verdelingDetails.slice(0, 10).map((persoon, index) => (
                        <div key={index} className="flex justify-between items-center py-1 border-b border-green-200 dark:border-green-800 last:border-b-0">
                          <span className="text-sm">Persoon {persoon.persoon}:</span>
                          <div className="text-right">
                            <div className="text-sm font-semibold">€{Math.round(persoon.uitkering).toLocaleString()}</div>
                            <div className={`text-xs ${persoon.verschil >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {persoon.verschil >= 0 ? '+' : ''}€{Math.round(persoon.verschil).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {aantalDeelnemers > 10 && (
                        <p className="text-xs text-muted-foreground mt-2">
                          ... en {aantalDeelnemers - 10} andere deelnemers
                        </p>
                      )}
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      <p><strong>Gelijk verdelen:</strong> Iedereen krijgt hetzelfde bedrag</p>
                      <p><strong>Naar bijdrage:</strong> Verdeling op basis van individuele bijdrage</p>
                      <p><strong>Loterij:</strong> Één persoon krijgt alle winst, rest krijgt bijdrage terug</p>
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h4 className="font-semibold mb-3">Maandelijkse progressie naar doel</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={progressie}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="maand" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number, name: string) => [
                              `€${value.toLocaleString()}`,
                              name === 'bedrag' ? 'Gespaard bedrag' : 'Doel'
                            ]}
                            labelFormatter={(maand) => `Maand ${maand}`}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="bedrag" 
                            stroke="#22c55e" 
                            strokeWidth={2}
                            name="bedrag"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="doel" 
                            stroke="#ef4444" 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="doel"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Vergelijking groepsgroottes</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={grootteVergelijking}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="grootte" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number, name: string) => [
                              `€${value.toLocaleString()}`,
                              name === 'perPersoon' ? 'Per persoon' : 'Winst per persoon'
                            ]}
                          />
                          <Bar dataKey="perPersoon" fill="#3b82f6" name="perPersoon" />
                          <Bar dataKey="winstPerPersoon" fill="#22c55e" name="winstPerPersoon" />
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
                <CardTitle className="text-xl">Groepssparen in België: Tips en trucs</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3>👥 Voordelen van groepssparen</h3>
                    <ul>
                      <li><strong>Grote doelen:</strong> Samen bereiken wat alleen moeilijk is</li>
                      <li><strong>Motivatie:</strong> Sociale druk om vol te houden</li>
                      <li><strong>Gedeelde kosten:</strong> Lagere kosten per persoon</li>
                      <li><strong>Samen beleven:</strong> Gezamenlijke ervaring en herinneringen</li>
                      <li><strong>Financiële discipline:</strong> Verplicht regelmatig sparen</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3>⚠️ Aandachtspunten</h3>
                    <ul>
                      <li><strong>Duidelijke afspraken:</strong> Maak alles van tevoren schriftelijk vast</li>
                      <li><strong>Uitvallers:</strong> Plan wat er gebeurt bij uitval van deelnemers</li>
                      <li><strong>Transparantie:</strong> Houd iedereen op de hoogte van de voortgang</li>
                      <li><strong>Beheer:</strong> Wijs één persoon aan als penningmeester</li>
                      <li><strong>Bankmandaat:</strong> Gebruik een aparte rekening voor het groepssparen</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">📋 Populaire groepssparen doelen in België:</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>Familie/vrienden:</strong>
                      <ul className="mt-1">
                        <li>• Groepsvakantie</li>
                        <li>• Familiefeest</li>
                        <li>• Verjaardagsfeest</li>
                        <li>• Groepscadeau</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Werk/vereniging:</strong>
                      <ul className="mt-1">
                        <li>• Teamuitstap</li>
                        <li>• Eindejaarfeest</li>
                        <li>• Groepsactiviteit</li>
                        <li>• Verenigingsproject</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Buren/buurt:</strong>
                      <ul className="mt-1">
                        <li>• Buurtfeest</li>
                        <li>• Gezamenlijke tuin</li>
                        <li>• Speelpleininrichting</li>
                        <li>• Buurtverbetering</li>
                      </ul>
                    </div>
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