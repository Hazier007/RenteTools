import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import KredietvergelijkerCalculator from "@/components/calculators/kredietvergelijker-calculator";
import AdPlaceholder from "@/components/ui/ad-placeholder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KredietvergelijkerBelgie() {
  return (
    <div className="min-h-screen bg-background">
      <Header activeCalculator="kredietvergelijker" onCalculatorChange={() => {}} />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Kredietvergelijker België - Leningen Vergelijken & Besparen
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Vergelijk kredietaanbiedingen van verschillende banken. Bereken het verschil 
            in kosten en vind de voordeligste lening voor uw situatie.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">💰 Bespaar door vergelijken:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Tot €3.000 verschil op €50.000 lening</li>
              <li>• JKP kan variëren van 4% tot 12%</li>
              <li>• Vergelijk altijd minimaal 3 offertes</li>
            </ul>
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
                  <i className="fas fa-balance-scale mr-3 text-primary"></i>
                  Kredietvergelijker - Vergelijk tot 4 leningen tegelijk
                </CardTitle>
                <p className="text-muted-foreground">
                  Vergelijk verschillende kredietaanbiedingen naast elkaar. Zie direct het verschil 
                  in maandlast, totale kosten en JKP tussen verschillende banken.
                </p>
              </CardHeader>
              <CardContent>
                <KredietvergelijkerCalculator />
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Waarom krediet vergelijken zo belangrijk is</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Het verschil tussen de duurste en goedkoopste lening kan honderden of 
                  zelfs duizenden euro's bedragen. Door goed te vergelijken bespaart u 
                  aanzienlijk op uw kredietkosten.
                </p>
                
                <h3>Praktijkvoorbeeld - €25.000 lening over 5 jaar:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-2 text-left">Bank</th>
                        <th className="border border-border p-2 text-left">JKP</th>
                        <th className="border border-border p-2 text-left">Maandlast</th>
                        <th className="border border-border p-2 text-left">Totale kosten</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-green-50 dark:bg-green-950">
                        <td className="border border-border p-2">Beste aanbod</td>
                        <td className="border border-border p-2">5,9%</td>
                        <td className="border border-border p-2">€479</td>
                        <td className="border border-border p-2">€28.740</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2">Gemiddeld aanbod</td>
                        <td className="border border-border p-2">8,5%</td>
                        <td className="border border-border p-2">€511</td>
                        <td className="border border-border p-2">€30.660</td>
                      </tr>
                      <tr className="bg-red-50 dark:bg-red-950">
                        <td className="border border-border p-2">Duurste aanbod</td>
                        <td className="border border-border p-2">12,9%</td>
                        <td className="border border-border p-2">€567</td>
                        <td className="border border-border p-2">€34.020</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">💡 Besparing door vergelijken:</h4>
                  <p className="text-sm">
                    In dit voorbeeld bespaart u €5.280 door de beste i.p.v. de duurste optie 
                    te kiezen. Dat is meer dan 20% van het geleende bedrag!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Hoe krediet effectief vergelijken?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Effectief vergelijken gaat verder dan alleen kijken naar de rentevoet. 
                  Het JKP (Jaarlijkse Kostenpercentage) is het belangrijkste vergelijkingsgetal.
                </p>
                
                <h3>Stap voor stap vergelijken:</h3>
                <ol>
                  <li><strong>Verzamel offertes:</strong> Vraag minimaal 3 verschillende banken</li>
                  <li><strong>Vergelijk JKP:</strong> Dit is het totale kostenpercentage</li>
                  <li><strong>Check voorwaarden:</strong> Flexibiliteit, vervroegde terugbetaling</li>
                  <li><strong>Bereken totaalkosten:</strong> Wat betaalt u in totaal?</li>
                  <li><strong>Let op verborgen kosten:</strong> Dossierkosten, verzekeringen</li>
                </ol>
                
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Let hier op</h4>
                    <ul className="text-sm space-y-1">
                      <li>• JKP in plaats van alleen rentevoet</li>
                      <li>• Alle verplichte kosten inbegrepen</li>
                      <li>• Flexibiliteit vervroegde terugbetaling</li>
                      <li>• Kwaliteit klantenservice</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">❌ Vermijd dit</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Alleen naar rentevoet kijken</li>
                      <li>• Eerste aanbod accepteren</li>
                      <li>• Verborgen kosten over het hoofd zien</li>
                      <li>• Onrealistische aanbiedingen geloven</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Tips voor de beste kredietonderhandeling</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Met de juiste strategie kunt u vaak betere voorwaarden onderhandelen 
                  dan de standaard aanbiedingen. Banken willen graag goede klanten binnenhalen.
                </p>
                
                <h3>Onderhandelingstips:</h3>
                <ul>
                  <li><strong>Toon concurrentie:</strong> Laat andere offertes zien</li>
                  <li><strong>Bundel producten:</strong> Vraag kortingen bij meerdere producten</li>
                  <li><strong>Bestaande klant bonus:</strong> Gebruik uw relatie met de bank</li>
                  <li><strong>Goede kredietwaardigheid:</strong> Toon bewijs van stabiel inkomen</li>
                  <li><strong>Hoger voorschot:</strong> Meer voorschot = lagere rente</li>
                </ul>
                
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🗣️ Onderhandelbare elementen:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Rentevoet (vaak 0,5-1% marge)</li>
                    <li>• Dossierkosten (kunnen soms wegvallen)</li>
                    <li>• Verplichte verzekeringen</li>
                    <li>• Vervroegde terugbetalingskosten</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Veelgestelde vragen over krediet vergelijken</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  
                  <div>
                    <h3 className="font-semibold mb-2">Hoe lang zijn kredietoffertes geldig?</h3>
                    <p className="text-sm text-muted-foreground">
                      Meestal 30 dagen, soms korter bij sterk veranderende marktrentes. 
                      Vergelijk dus binnen een korte periode en beslis snel.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Beïnvloedt het aanvragen van offertes mijn kredietrating?</h3>
                    <p className="text-sm text-muted-foreground">
                      Ja, maar minimaal. Binnen 30 dagen tellen meerdere aanvragen als één zoekopdracht. 
                      Vraag dus alle offertes binnen een maand aan.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Kan ik altijd de beste offerte krijgen?</h3>
                    <p className="text-sm text-muted-foreground">
                      Nee, de beste tarieven gelden vaak voor klanten met perfecte kredietwaardigheid. 
                      Uw persoonlijke situatie bepaalt welke tarieven u krijgt.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Wat als mijn situatie verandert na goedkeuring?</h3>
                    <p className="text-sm text-muted-foreground">
                      Informeer uw bank direct bij veranderingen in inkomen of werkgelegenheid. 
                      Ze kunnen de lening aanpassen of in extreme gevallen opzeggen.
                    </p>
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