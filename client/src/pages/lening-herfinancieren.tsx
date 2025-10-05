import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";

export default function LeningHerfinancieren() {
  const seoConfig = getSeoConfig("lening-herfinancieren");

  const [huidigeSaldo, setHuidigeSaldo] = useState<string>("150000");
  const [huidigeRente, setHuidigeRente] = useState<string>("4.2");
  const [restLooptijd, setRestLooptijd] = useState<string>("15");
  const [nieuweRente, setNieuweRente] = useState<string>("3.1");
  const [herfinancieringsKosten, setHerfinancieringsKosten] = useState<string>("2500");
  
  const berekenHerfinanciering = () => {
    const saldo = parseFloat(huidigeSaldo) || 0;
    const oudRente = parseFloat(huidigeRente) || 0;
    const nieuwRente = parseFloat(nieuweRente) || 0;
    const looptijd = parseInt(restLooptijd) || 0;
    const kosten = parseFloat(herfinancieringsKosten) || 0;
    
    // Maandelijkse betalingen berekenen
    const maandenOud = looptijd * 12;
    const maandRenteOud = oudRente / 100 / 12;
    const maandRenteNieuw = nieuwRente / 100 / 12;
    
    // Huidige maandlast
    const huidigeMaandlast = saldo * (maandRenteOud * Math.pow(1 + maandRenteOud, maandenOud)) / 
                            (Math.pow(1 + maandRenteOud, maandenOud) - 1);
    
    // Nieuwe maandlast
    const nieuweMaandlast = saldo * (maandRenteNieuw * Math.pow(1 + maandRenteNieuw, maandenOud)) / 
                           (Math.pow(1 + maandRenteNieuw, maandenOud) - 1);
    
    // Besparingen
    const maandelijkeBesparing = huidigeMaandlast - nieuweMaandlast;
    const totaleBesparing = maandelijkeBesparing * maandenOud;
    const nettoBesparing = totaleBesparing - kosten;
    
    // Break-even punt
    const breakEvenMaanden = kosten / maandelijkeBesparing;
    
    // Totale interest oude vs nieuwe lening
    const totaleInterestOud = (huidigeMaandlast * maandenOud) - saldo;
    const totaleInterestNieuw = (nieuweMaandlast * maandenOud) - saldo;
    
    return {
      huidigeMaandlast,
      nieuweMaandlast,
      maandelijkeBesparing,
      totaleBesparing,
      nettoBesparing,
      breakEvenMaanden,
      totaleInterestOud,
      totaleInterestNieuw,
      renteverschil: oudRente - nieuwRente,
      loontHet: nettoBesparing > 0
    };
  };
  
  const resultaat = berekenHerfinanciering();

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Lening Herfinancieren Calculator - Voordeligste Herfinanciering Berekenen
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken of herfinanciering van uw hypotheek of lening loont. Vergelijk kosten, 
            besparingen en ontdek wanneer u break-even bent met uw nieuwe lening.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">💰 Waarom herfinancieren?</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Rentes zijn gedaald sinds uw originele lening</li>
              <li>• Lagere maandlast voor meer financiële ruimte</li>
              <li>• Duizenden euro's besparen over looptijd</li>
            </ul>
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
                  <i className="fas fa-sync-alt mr-3 text-primary"></i>
                  Herfinanciering Calculator - Lening Samenvoegen Berekenen
                </CardTitle>
                <p className="text-muted-foreground">
                  Bereken of het financieel interessant is om uw hypotheek of lening te herfinancieren 
                  bij een lagere rente. Inclusief alle kosten en break-even analyse.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="saldo">Huidig uitstaand saldo (€)</Label>
                      <Input
                        id="saldo"
                        type="number"
                        value={huidigeSaldo}
                        onChange={(e) => setHuidigeSaldo(e.target.value)}
                        placeholder="150000"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Het bedrag dat u nog verschuldigd bent
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="rente-oud">Huidige rentevoet (%)</Label>
                      <Input
                        id="rente-oud"
                        type="number"
                        step="0.1"
                        value={huidigeRente}
                        onChange={(e) => setHuidigeRente(e.target.value)}
                        placeholder="4.2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Uw huidige rentevoet per jaar
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="looptijd">Resterende looptijd (jaar)</Label>
                      <Input
                        id="looptijd"
                        type="number"
                        value={restLooptijd}
                        onChange={(e) => setRestLooptijd(e.target.value)}
                        placeholder="15"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Aantal jaren dat uw lening nog loopt
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="rente-nieuw">Nieuwe rentevoet (%)</Label>
                      <Input
                        id="rente-nieuw"
                        type="number"
                        step="0.1"
                        value={nieuweRente}
                        onChange={(e) => setNieuweRente(e.target.value)}
                        placeholder="3.1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Aangeboden rentevoet voor herfinanciering
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="kosten">Herfinancieringskosten (€)</Label>
                      <Input
                        id="kosten"
                        type="number"
                        value={herfinancieringsKosten}
                        onChange={(e) => setHerfinancieringsKosten(e.target.value)}
                        placeholder="2500"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Notaris, registratie, bank kosten
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Card className={`${resultaat.loontHet ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'}`}>
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-4">
                          {resultaat.loontHet ? '✅ Herfinanciering Loont!' : '❌ Herfinanciering Loont Niet'}
                        </h3>
                        <div className="space-y-3">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Netto besparing totaal:</p>
                            <p className={`text-2xl font-bold ${resultaat.loontHet ? 'text-green-600' : 'text-red-600'}`}>
                              {resultaat.nettoBesparing >= 0 ? '+' : ''}€{resultaat.nettoBesparing.toLocaleString('nl-BE', {maximumFractionDigits: 0})}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Renteverschil:</span>
                              <p className="font-semibold">{resultaat.renteverschil.toFixed(2)}%</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Break-even:</span>
                              <p className="font-semibold">{resultaat.breakEvenMaanden.toFixed(0)} mnd</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-primary/5">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-4">Maandlast Vergelijking</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span>Huidige maandlast:</span>
                            <span>€{resultaat.huidigeMaandlast.toLocaleString('nl-BE', {maximumFractionDigits: 0})}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Nieuwe maandlast:</span>
                            <span>€{resultaat.nieuweMaandlast.toLocaleString('nl-BE', {maximumFractionDigits: 0})}</span>
                          </div>
                          <div className="border-t pt-3">
                            <div className="flex justify-between font-semibold">
                              <span>Maandelijkse besparing:</span>
                              <span className="text-green-600">
                                €{resultaat.maandelijkeBesparing.toLocaleString('nl-BE', {maximumFractionDigits: 0})}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-blue-50 dark:bg-blue-950">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-4">Totale Interest Vergelijking</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span>Interest huidige lening:</span>
                            <span>€{resultaat.totaleInterestOud.toLocaleString('nl-BE', {maximumFractionDigits: 0})}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Interest nieuwe lening:</span>
                            <span>€{resultaat.totaleInterestNieuw.toLocaleString('nl-BE', {maximumFractionDigits: 0})}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Herfinancieringskosten:</span>
                            <span className="text-red-600">€{parseFloat(herfinancieringsKosten || "0").toLocaleString('nl-BE')}</span>
                          </div>
                          <div className="border-t pt-3">
                            <div className="flex justify-between font-semibold">
                              <span>Bruto interest besparing:</span>
                              <span className="text-green-600">
                                €{resultaat.totaleBesparing.toLocaleString('nl-BE', {maximumFractionDigits: 0})}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Sections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Wanneer Loont Lening Herfinancieren? - Complete Gids</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Herfinancieren van uw hypotheek of lening kan duizenden euro's besparen, 
                  maar het heeft ook kosten. Een zorgvuldige berekening toont of het de moeite waard is.
                </p>
                
                <h3>Wanneer is Herfinancieren Interessant?</h3>
                <ul>
                  <li><strong>Renteverschil {'>'}  0,5%:</strong> Significant verschil met huidige rente</li>
                  <li><strong>Restlooptijd {'>'} 5 jaar:</strong> Voldoende tijd om kosten terug te verdienen</li>
                  <li><strong>Break-even {'<'} 2-3 jaar:</strong> Snel terugverdienen van kosten</li>
                  <li><strong>Stabiele financiële situatie:</strong> Geen risico op extra kosten</li>
                </ul>
                
                <h3>Kosten van Herfinanciering België:</h3>
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">💰 Typische Herfinancieringskosten:</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Notariskosten:</strong></p>
                      <ul className="ml-4">
                        <li>• €800 - €1.500</li>
                        <li>• Afhankelijk van leningbedrag</li>
                        <li>• Hypotheekakte en registratie</li>
                      </ul>
                    </div>
                    <div>
                      <p><strong>Bankkosten:</strong></p>
                      <ul className="ml-4">
                        <li>• €500 - €1.000</li>
                        <li>• Dossierkosten nieuwe bank</li>
                        <li>• Taxatie van onroerend goed</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">✅ Voordelen van Herfinanciering:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Lagere maandlast = meer financiële ruimte</li>
                    <li>• Totale interest besparing over looptijd</li>
                    <li>• Mogelijk andere voorwaarden onderhandelen</li>
                    <li>• Leningen kunnen worden samengevoegd</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Herfinanciering Hypotheek Calculator - Stap voor Stap Process</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Het herfinancieren van een hypotheek vereist een gestructureerde aanpak. 
                  Volg deze stappen voor een succesvolle herfinanciering.
                </p>
                
                <h3>Herfinanciering Process - 7 Stappen:</h3>
                <ol>
                  <li><strong>Situatie Analyseren:</strong> Bereken huidige kosten en restschuld</li>
                  <li><strong>Markt Verkennen:</strong> Vergelijk rentes van verschillende banken</li>
                  <li><strong>Kosten Berekenen:</strong> Tel alle herfinancieringskosten op</li>
                  <li><strong>Break-even Bepalen:</strong> Wanneer verdient u de kosten terug?</li>
                  <li><strong>Aanvraag Indienen:</strong> Start proces bij nieuwe bank</li>
                  <li><strong>Documentatie:</strong> Verzamel alle benodigde papieren</li>
                  <li><strong>Afsluiting:</strong> Onderteken nieuwe hypotheekakte</li>
                </ol>
                
                <h3>Alternatieve Opties voor Herfinanciering:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🏦 Rente Heronderhandelen</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Bij huidige bank lagere rente vragen</li>
                      <li>• Minder kosten dan volledige herfinanciering</li>
                      <li>• Gebruik marktprijzen als onderhandelingsmiddel</li>
                      <li>• Vaak mogelijk bij goede klantrelatie</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">🔄 Leningen Samenvoegen</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Meerdere leningen in één nieuwe lening</li>
                      <li>• Eén maandlast in plaats van meerdere</li>
                      <li>• Mogelijk betere voorwaarden</li>
                      <li>• Vereenvoudiging van financiën</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">⚠️ Let op bij Herfinanciering:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Boeterente bij vervroegde aflossing huidige lening</li>
                    <li>• Wijziging in persoonlijke omstandigheden</li>
                    <li>• Taxatiewaarde woning kan zijn gedaald</li>
                    <li>• Nieuwe voorwaarden kunnen strenger zijn</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Veelgestelde Vragen - Lening Herfinancieren</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Wanneer loont het om mijn hypotheek te herfinancieren?</h3>
                    <p className="text-sm text-muted-foreground">
                      Herfinanciering loont meestal als het renteverschil minstens 0,5% is en u nog minimaal 
                      5 jaar looptijd heeft. Bereken altijd alle kosten mee in uw beslissing.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Wat zijn de kosten van herfinanciering in België?</h3>
                    <p className="text-sm text-muted-foreground">
                      Typische kosten zijn €1.500-€3.000 inclusief notaris, registratie en bankkosten. 
                      Het exacte bedrag hangt af van uw leningbedrag en gekozen bank.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Hoe lang duurt het herfinanciering process?</h3>
                    <p className="text-sm text-muted-foreground">
                      Een herfinanciering duurt gemiddeld 6-8 weken van aanvraag tot ondertekening. 
                      Dit hangt af van de complexiteit en snelheid van documentatie.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Kan ik meerdere leningen samenvoegen bij herfinanciering?</h3>
                    <p className="text-sm text-muted-foreground">
                      Ja, u kunt vaak uw hypotheek, persoonlijke leningen en kredieten samenvoegen 
                      in één nieuwe lening met mogelijk betere voorwaarden.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <GoogleAdsense slot="rectangle" />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Gerelateerde Calculators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/hypothecaire-lening-berekenen">
                      <i className="fas fa-home mr-2"></i>
                      Hypotheek Calculator
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/persoonlijke-lening-berekenen">
                      <i className="fas fa-hand-holding-usd mr-2"></i>
                      Persoonlijke Lening
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/kredietvergelijker-belgie">
                      <i className="fas fa-balance-scale mr-2"></i>
                      Krediet Vergelijken
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} />}

      <Footer />
    </div>
  );
}