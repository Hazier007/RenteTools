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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function LoyaltyBonusCalculatorPage() {
  const seoConfig = getSeoConfig("loyalty-bonus-calculator");
  useSeoTags("loyalty-bonus-calculator");
  const [spaarbedrag, setSpaarbedrag] = useState<number>(15000);
  const [huidigeBank, setHuidigeBank] = useState<string>("KBC");
  const [huidigeRente, setHuidigeRente] = useState<number>(1.8);
  const [loyaltyBonus, setLoyaltyBonus] = useState<number>(0.5);
  const [nieuweBank, setNieuweBank] = useState<string>("ING");
  const [nieuweRente, setNieuweRente] = useState<number>(2.3);
  const [maandenBijBank, setMaandenBijBank] = useState<number>(8);

  // Belgian banks with typical loyalty bonuses
  const belgischeBanken: Record<string, { basisRente: number; loyaltyBonus: number; voorwaarden: string }> = {
    "KBC": { basisRente: 1.8, loyaltyBonus: 0.5, voorwaarden: "Na 12 maanden trouw" },
    "ING": { basisRente: 2.3, loyaltyBonus: 0.3, voorwaarden: "Na 12 maanden + groeivoorwaarde" },
    "Belfius": { basisRente: 2.0, loyaltyBonus: 0.6, voorwaarden: "Na 12 maanden trouw" },
    "Argenta": { basisRente: 1.9, loyaltyBonus: 0.7, voorwaarden: "Na 12 maanden + maandelijkse groei" },
    "Keytrade": { basisRente: 2.4, loyaltyBonus: 0.0, voorwaarden: "Geen loyalty bonus" },
    "Fortis (BNP)": { basisRente: 1.7, loyaltyBonus: 0.4, voorwaarden: "Na 12 maanden trouw" }
  };

  // Calculate loyalty bonus scenarios
  const berekenLoyaltyScenarios = () => {
    const huidigeData = belgischeBanken[huidigeBank];
    const nieuweData = belgischeBanken[nieuweBank];
    
    // Current bank scenario (with loyalty bonus if eligible)
    const heeftLoyalty = maandenBijBank >= 12;
    const huidigeTotaleRente = huidigeData.basisRente + (heeftLoyalty ? huidigeData.loyaltyBonus : 0);
    const huidigeJaarOpbrengst = (spaarbedrag * huidigeTotaleRente) / 100;
    
    // New bank scenario (first year without loyalty, second year with)
    const nieuweEersteJaar = (spaarbedrag * nieuweData.basisRente) / 100;
    const nieuweTweedeJaar = (spaarbedrag * (nieuweData.basisRente + nieuweData.loyaltyBonus)) / 100;
    
    // When is switching profitable?
    const switchingBreakeven = nieuweData.basisRente - huidigeTotaleRente;
    const maandenTotWinst = switchingBreakeven > 0 ? 0 : nieuweData.loyaltyBonus > 0 ? 12 : 999;
    
    return {
      huidige: {
        rente: huidigeTotaleRente,
        jaarOpbrengst: huidigeJaarOpbrengst,
        heeftLoyalty
      },
      nieuwe: {
        eersteJaar: nieuweEersteJaar,
        tweedeJaar: nieuweTweedeJaar,
        basisRente: nieuweData.basisRente,
        loyaltyBonus: nieuweData.loyaltyBonus
      },
      switchAdvies: {
        isWinstgevend: switchingBreakeven > 0 || (switchingBreakeven <= 0 && nieuweData.loyaltyBonus > 0),
        maandenTotWinst,
        jaarlijksVerschil: nieuweEersteJaar - huidigeJaarOpbrengst,
        tweedeJaarVerschil: nieuweTweedeJaar - huidigeJaarOpbrengst
      }
    };
  };

  const scenario = berekenLoyaltyScenarios();

  // Generate comparison timeline for 5 years
  const vergelijkingTimeline = () => {
    const timeline = [];
    let huidigeWaarde = spaarbedrag;
    let nieuweWaarde = spaarbedrag;
    
    for (let jaar = 0; jaar <= 5; jaar++) {
      if (jaar > 0) {
        // Current bank (always with loyalty if eligible)
        const huidigeRenteJaar = scenario.huidige.rente;
        huidigeWaarde += (huidigeWaarde * huidigeRenteJaar) / 100;
        
        // New bank (loyalty bonus starts from year 2)
        const nieuweRenteJaar = jaar === 1 ? 
          scenario.nieuwe.basisRente : 
          scenario.nieuwe.basisRente + scenario.nieuwe.loyaltyBonus;
        nieuweWaarde += (nieuweWaarde * nieuweRenteJaar) / 100;
      }
      
      timeline.push({
        jaar,
        huidigeBank: Math.round(huidigeWaarde),
        nieuweBank: Math.round(nieuweWaarde),
        verschil: Math.round(nieuweWaarde - huidigeWaarde)
      });
    }
    
    return timeline;
  };

  const timeline = vergelijkingTimeline();

  // Calculate optimal switching strategy
  const optimaleStrategie = () => {
    const alleBanken = Object.entries(belgischeBanken)
      .map(([naam, data]) => ({
        naam,
        ...data,
        totaleRente: data.basisRente + data.loyaltyBonus,
        eersteJaarRente: data.basisRente
      }))
      .sort((a, b) => b.totaleRente - a.totaleRente);
    
    return alleBanken;
  };

  const bankenRanking = optimaleStrategie();

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header activeCalculator="loyalty-bonus" onCalculatorChange={() => {}} />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Getrouwheidspremie Calculator België - Loyalty Bonus Optimaliseren
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken of het de moeite loont om van bank te wisselen en hoelang u moet wachten 
            om te profiteren van getrouwheidspremies bij Belgische banken.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">🎯 Loyalty bonus strategie:</p>
            <p className="text-sm opacity-90">
              Ontdek wanneer wisselen van spaarrekening rendabel is en hoe u kunt profiteren van de hoogste getrouwheidspremies.
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
                  <i className="fas fa-award mr-3 text-primary"></i>
                  Getrouwheidspremie Calculator - Optimaliseer uw loyalty bonus
                </CardTitle>
                <p className="text-muted-foreground">
                  Vergelijk uw huidige spaarrekening met andere banken en ontdek of en wanneer 
                  wisselen financieel interessant is.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Current Situation */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-600">💼 Huidige situatie</h3>
                    
                    <div>
                      <Label htmlFor="spaarbedrag">Spaarbedrag (€)</Label>
                      <Input
                        id="spaarbedrag"
                        type="number"
                        value={spaarbedrag}
                        onChange={(e) => setSpaarbedrag(Number(e.target.value))}
                        placeholder="15000"
                        data-testid="input-spaarbedrag"
                      />
                    </div>

                    <div>
                      <Label htmlFor="huidige-bank">Huidige bank</Label>
                      <Select value={huidigeBank} onValueChange={(value) => {
                        setHuidigeBank(value);
                        const bankData = belgischeBanken[value];
                        setHuidigeRente(bankData.basisRente);
                        setLoyaltyBonus(bankData.loyaltyBonus);
                      }}>
                        <SelectTrigger data-testid="select-huidige-bank">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(belgischeBanken).map(bank => (
                            <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="maanden">Maanden bij huidige bank</Label>
                      <Select value={maandenBijBank.toString()} onValueChange={(value) => setMaandenBijBank(Number(value))}>
                        <SelectTrigger data-testid="select-maanden">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 maand</SelectItem>
                          <SelectItem value="3">3 maanden</SelectItem>
                          <SelectItem value="6">6 maanden</SelectItem>
                          <SelectItem value="8">8 maanden</SelectItem>
                          <SelectItem value="10">10 maanden</SelectItem>
                          <SelectItem value="12">12 maanden</SelectItem>
                          <SelectItem value="18">18 maanden</SelectItem>
                          <SelectItem value="24">24 maanden</SelectItem>
                          <SelectItem value="36">36+ maanden</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded">
                      <h4 className="font-semibold mb-2">Huidige voorwaarden:</h4>
                      <p className="text-sm">Basisrente: {belgischeBanken[huidigeBank].basisRente}%</p>
                      <p className="text-sm">Loyalty bonus: {belgischeBanken[huidigeBank].loyaltyBonus}%</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {belgischeBanken[huidigeBank].voorwaarden}
                      </p>
                      <Badge variant={scenario.huidige.heeftLoyalty ? "default" : "secondary"} className="mt-2">
                        {scenario.huidige.heeftLoyalty ? "✅ Loyalty actief" : "⏳ Nog geen loyalty"}
                      </Badge>
                    </div>
                  </div>

                  {/* New Bank Option */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-green-600">🏦 Andere bank overwegen</h3>
                    
                    <div>
                      <Label htmlFor="nieuwe-bank">Vergelijk met bank</Label>
                      <Select value={nieuweBank} onValueChange={(value) => {
                        setNieuweBank(value);
                        const bankData = belgischeBanken[value];
                        setNieuweRente(bankData.basisRente);
                      }}>
                        <SelectTrigger data-testid="select-nieuwe-bank">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(belgischeBanken).map(bank => (
                            <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
                      <h4 className="font-semibold mb-2">Nieuwe bank voorwaarden:</h4>
                      <p className="text-sm">Basisrente: {belgischeBanken[nieuweBank].basisRente}%</p>
                      <p className="text-sm">Loyalty bonus: {belgischeBanken[nieuweBank].loyaltyBonus}%</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {belgischeBanken[nieuweBank].voorwaarden}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Eerste jaar rente:</span>
                        <span className="font-semibold">{belgischeBanken[nieuweBank].basisRente}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Vanaf jaar 2:</span>
                        <span className="font-semibold">
                          {(belgischeBanken[nieuweBank].basisRente + belgischeBanken[nieuweBank].loyaltyBonus).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Results & Advice */}
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">🎯 Switch advies:</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Huidige jaaropbrengst:</span>
                        <span className="font-semibold text-blue-600" data-testid="result-current">
                          €{Math.round(scenario.huidige.jaarOpbrengst).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Nieuwe bank (jaar 1):</span>
                        <span className="font-semibold" data-testid="result-new-year1">
                          €{Math.round(scenario.nieuwe.eersteJaar).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Nieuwe bank (jaar 2+):</span>
                        <span className="font-semibold text-green-600" data-testid="result-new-year2">
                          €{Math.round(scenario.nieuwe.tweedeJaar).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span>Eerste jaar verschil:</span>
                          <span className={`font-semibold ${scenario.switchAdvies.jaarlijksVerschil >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {scenario.switchAdvies.jaarlijksVerschil >= 0 ? '+' : ''}€{Math.round(scenario.switchAdvies.jaarlijksVerschil).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tweede jaar verschil:</span>
                          <span className={`font-semibold ${scenario.switchAdvies.tweedeJaarVerschil >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {scenario.switchAdvies.tweedeJaarVerschil >= 0 ? '+' : ''}€{Math.round(scenario.switchAdvies.tweedeJaarVerschil).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-background rounded">
                      <h4 className="font-semibold mb-2">💡 Advies:</h4>
                      {scenario.switchAdvies.isWinstgevend ? (
                        <div>
                          <p className="text-sm text-green-600 mb-2">
                            ✅ Wisselen is financieel interessant!
                          </p>
                          {scenario.switchAdvies.maandenTotWinst === 0 ? (
                            <p className="text-xs">Direct voordeel vanaf de eerste maand.</p>
                          ) : scenario.switchAdvies.maandenTotWinst <= 12 ? (
                            <p className="text-xs">Grootste voordeel na {scenario.switchAdvies.maandenTotWinst} maanden.</p>
                          ) : (
                            <p className="text-xs">Winst op lange termijn (2+ jaar) door loyalty bonus.</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-red-600">
                          ❌ Wisselen is momenteel niet voordelig. Blijf bij uw huidige bank.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h4 className="font-semibold mb-3">5-jaar vergelijking</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timeline}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="jaar" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number, name: string) => [
                              `€${value.toLocaleString()}`,
                              name === 'huidigeBank' ? huidigeBank : nieuweBank
                            ]}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="huidigeBank" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            name="huidigeBank"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="nieuweBank" 
                            stroke="#22c55e" 
                            strokeWidth={2}
                            name="nieuweBank"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Banken ranking (totale rente)</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={bankenRanking} layout="horizontal">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="naam" type="category" width={80} />
                          <Tooltip 
                            formatter={(value: number) => [`${value}%`, 'Totale rente']}
                          />
                          <Bar dataKey="totaleRente" fill="#22c55e" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bank Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Uitgebreide bank vergelijking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Bank</th>
                        <th className="text-center p-2">Basisrente</th>
                        <th className="text-center p-2">Loyalty Bonus</th>
                        <th className="text-center p-2">Totale Rente</th>
                        <th className="text-left p-2">Voorwaarden</th>
                        <th className="text-center p-2">Jaaropbrengst op €{spaarbedrag.toLocaleString()}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bankenRanking.map((bank, index) => {
                        const jaaropbrengst = (spaarbedrag * bank.totaleRente) / 100;
                        const isHuidigeBank = bank.naam === huidigeBank;
                        const isNieuweBank = bank.naam === nieuweBank;
                        
                        return (
                          <tr key={bank.naam} className={`border-b ${
                            isHuidigeBank ? 'bg-blue-50 dark:bg-blue-950' : 
                            isNieuweBank ? 'bg-green-50 dark:bg-green-950' : ''
                          }`}>
                            <td className="p-2 font-semibold">
                              {bank.naam}
                              {index === 0 && <Badge variant="default" className="ml-2">🥇 Beste</Badge>}
                              {isHuidigeBank && <Badge variant="secondary" className="ml-2">Huidig</Badge>}
                            </td>
                            <td className="text-center p-2">{bank.basisRente}%</td>
                            <td className="text-center p-2">{bank.loyaltyBonus}%</td>
                            <td className="text-center p-2 font-bold">{bank.totaleRente.toFixed(1)}%</td>
                            <td className="p-2 text-xs">{bank.voorwaarden}</td>
                            <td className="text-center p-2 font-semibold">€{Math.round(jaaropbrengst).toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Educational Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Alles over getrouwheidspremies in België</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3>🎯 Hoe werken loyalty bonuses?</h3>
                    <ul>
                      <li><strong>Wachttijd:</strong> Meestal na 12 maanden trouw bij dezelfde bank</li>
                      <li><strong>Voorwaarden:</strong> Vaak gekoppeld aan groei van spaartegoed</li>
                      <li><strong>Automatisch:</strong> Bonus wordt automatisch toegepast</li>
                      <li><strong>Jaarlijks:</strong> Hernieuwd elk jaar als u blijft voldoen</li>
                      <li><strong>Maximumbedrag:</strong> Soms gelimiteerd tot bepaald spaarbedrag</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3>💡 Strategieën voor maximaal rendement</h3>
                    <ul>
                      <li><strong>Timing:</strong> Wissel kort na het behalen van loyalty bonus</li>
                      <li><strong>Dubbele strategie:</strong> Verdeel geld over 2 banken</li>
                      <li><strong>Groeivoorwaarden:</strong> Let op minimale maandelijkse groei</li>
                      <li><strong>Acties:</strong> Profiteer van tijdelijke verhoogde bonuses</li>
                      <li><strong>Alertheid:</strong> Controleer jaarlijks of uw bank nog concurrerend is</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">⚠️ Valkuilen om te vermijden:</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>🚫 Veelgemaakte fouten:</strong>
                      <ul className="mt-1">
                        <li>• Te vroeg wisselen (voor loyalty bonus)</li>
                        <li>• Groeivoorwaarden niet nakomen</li>
                        <li>• Vergeten om jaarlijks te vergelijken</li>
                      </ul>
                    </div>
                    <div>
                      <strong>📋 Let altijd op:</strong>
                      <ul className="mt-1">
                        <li>• Exacte voorwaarden per bank</li>
                        <li>• Maximum bedrag voor bonus</li>
                        <li>• Einddatum van promoties</li>
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