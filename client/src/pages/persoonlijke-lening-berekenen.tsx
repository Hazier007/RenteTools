import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PersoonlijkeLeningCalculator from "@/components/calculators/persoonlijke-lening-calculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";

export default function PersoonlijkeLeningBerekenen() {
  const seoConfig = getSeoConfig("persoonlijke-lening-berekenen");

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Persoonlijke Lening Berekenen - Kostprijs & JKP Calculator
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken de kosten van uw persoonlijke lening. Vergelijk tarieven, 
            simuleer verschillende bedragen en ontdek de voordeligste financiering.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">💳 Persoonlijke lening tarieven 2025:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Vanaf 4,9% JKP voor beste klanten</li>
              <li>• Gemiddeld 8-12% JKP</li>
              <li>• Tot €75.000 mogelijk</li>
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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
            
            {/* Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  <i className="fas fa-credit-card mr-3 text-primary"></i>
                  Persoonlijke Lening Calculator - Bereken uw maandlast
                </CardTitle>
                <p className="text-muted-foreground">
                  Simuleer uw persoonlijke lening en bereken de totale kosten. 
                  Vergelijk verschillende looptijden en bedragen voor de beste deal.
                </p>
              </CardHeader>
              <CardContent>
                <PersoonlijkeLeningCalculator />
              </CardContent>
            </Card>

            {/* Ad After Calculator */}
            <div className="flex justify-center py-4">
              <GoogleAdsense slot="banner" />
            </div>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Wat is een persoonlijke lening?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Een persoonlijke lening is een krediet waarbij u een vast bedrag leent 
                  en dit in maandelijkse termijnen terugbetaalt. U hoeft geen onderpand 
                  te geven en kunt het geld vrij besteden.
                </p>
                
                <h3>Kenmerken persoonlijke lening:</h3>
                <ul>
                  <li><strong>Geen onderpand:</strong> Geen hypotheek of borg nodig</li>
                  <li><strong>Vrije besteding:</strong> Voor elke doelstelling te gebruiken</li>
                  <li><strong>Vaste rente:</strong> Maandlast blijft hetzelfde</li>
                  <li><strong>Vaste looptijd:</strong> Meestal 12 tot 84 maanden</li>
                </ul>
                
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">📋 Veelgebruikt voor:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Verbouwingen en renovaties</li>
                    <li>• Aankoop auto of motor</li>
                    <li>• Schulden samenvoegen</li>
                    <li>• Vakantie of huwelijk</li>
                    <li>• Onverwachte uitgaven</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">JKP uitgelegd - Wat kost een lening écht?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Het Jaarlijkse Kostenpercentage (JKP) is het belangrijkste getal bij het 
                  vergelijken van leningen. Het toont de werkelijke kosten inclusief alle verborgen kosten.
                </p>
                
                <h3>Wat zit er in de JKP?</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Inbegrepen</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Rentevoet</li>
                      <li>• Dossierkosten</li>
                      <li>• Verplichte verzekeringen</li>
                      <li>• Administratiekosten</li>
                      <li>• Alle andere verplichte kosten</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">❌ Niet inbegrepen</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Optionele verzekeringen</li>
                      <li>• Kosten bij laattijdige betaling</li>
                      <li>• Notariskosten (hypotheek)</li>
                      <li>• Vervroegde terugbetalingskosten</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">💡 Vergelijken tip:</h4>
                  <p className="text-sm">
                    Vergelijk altijd de JKP, niet alleen de rentevoet. Een lage rente met hoge 
                    dossierkosten kan duurder uitkomen dan een hogere rente zonder extra kosten.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Lening herfinancieren - Wanneer loont het?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Herfinancieren betekent uw bestaande lening vervangen door een nieuwe 
                  met betere voorwaarden. Dit kan u honderden euro's besparen.
                </p>
                
                <h3>Wanneer is herfinancieren interessant?</h3>
                <ul>
                  <li><strong>Lagere rentes:</strong> Markt rentes zijn gedaald</li>
                  <li><strong>Betere inkomen:</strong> U komt in aanmerking voor lagere rente</li>
                  <li><strong>Schulden samenvoegen:</strong> Meerdere leningen combineren</li>
                  <li><strong>Lagere maandlast:</strong> Looptijd verlengen</li>
                </ul>
                
                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">⚖️ Let op de kosten:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Vervroegde terugbetalingskosten oude lening</li>
                    <li>• Dossierkosten nieuwe lening</li>
                    <li>• Bereken of de besparing opweegt tegen de kosten</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Veelgestelde vragen over persoonlijke leningen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  
                  <div>
                    <h3 className="font-semibold mb-2">Hoeveel kan ik maximaal lenen?</h3>
                    <p className="text-sm text-muted-foreground">
                      De meeste banken lenen tot €75.000. Het exacte bedrag hangt af van uw 
                      inkomen, uitgaven en kredietgeschiedenis.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Hoe snel krijg ik het geld?</h3>
                    <p className="text-sm text-muted-foreground">
                      Bij goedkeuring krijgt u het geld meestal binnen 1-3 werkdagen op uw rekening. 
                      Online aanvragen gaan vaak sneller dan in de bank.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Wat als mijn aanvraag wordt afgewezen?</h3>
                    <p className="text-sm text-muted-foreground">
                      U kunt proberen bij een andere bank of een kleiner bedrag aanvragen. 
                      Wacht eerst enkele weken voordat u opnieuw aanvraagt.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Is een persoonlijke lening belastbaar aftrekbaar?</h3>
                    <p className="text-sm text-muted-foreground">
                      Nee, rente op persoonlijke leningen is niet fiscaal aftrekbaar in België, 
                      behalve in specifieke gevallen zoals renovatieleningen.
                    </p>
                  </div>

                </div>
              </CardContent>
            </Card>

        </div>
      </section>

      {/* Bottom Ad */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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