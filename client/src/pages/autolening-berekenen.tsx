import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AutoleningCalculator from "@/components/calculators/autolening-calculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function AutoleningBerekenen() {
  const seoConfig = getSeoConfig("autolening-berekenen");
  useSeoTags("autolening-berekenen");

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Autolening Berekenen - Autokredit Simulator België
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken uw maandelijkse afbetaling voor een autolening. Vergelijk tarieven, 
            simuleer verschillende scenario's en vind de goedkoopste autofinanciering.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">🚗 Autolening tarieven 2025:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Nieuwe auto: vanaf 3,5% JKP</li>
              <li>• Tweedehands auto: vanaf 4,2% JKP</li>
              <li>• Met voorschot: lagere maandlast</li>
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
                  <i className="fas fa-car mr-3 text-primary"></i>
                  Autolening Calculator - Bereken uw maandelijkse afbetaling
                </CardTitle>
                <p className="text-muted-foreground">
                  Simuleer uw autolening met verschillende bedragen, looptijden en voorschotten. 
                  Ontdek wat de goedkoopste financieringsoptie is voor uw nieuwe auto.
                </p>
              </CardHeader>
              <CardContent>
                <AutoleningCalculator />
              </CardContent>
            </Card>

            {/* Ad After Calculator */}
            <div className="flex justify-center py-4">
              <GoogleAdsense slot="banner" />
            </div>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Hoe werkt een autolening in België?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  Een autolening is een persoonlijke lening specifiek voor de aankoop van een voertuig. 
                  In België kunt u kiezen tussen verschillende financieringsvormen.
                </p>
                
                <h3>Types autofinanciering:</h3>
                <ul>
                  <li><strong>Klassieke autolening:</strong> U wordt eigenaar van de auto</li>
                  <li><strong>Financial lease:</strong> Huren met optie tot koop</li>
                  <li><strong>Operational lease:</strong> All-in huur inclusief onderhoud</li>
                  <li><strong>Renting:</strong> Korte termijn verhuur</li>
                </ul>
                
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">💡 Voordelen klassieke autolening:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• U wordt direct eigenaar van het voertuig</li>
                    <li>• Geen kilometerbeperking</li>
                    <li>• Vrij in onderhoud en verzekering</li>
                    <li>• Mogelijkheid tot vervroegde terugbetaling</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Goedkoopste autolening vinden - Tips</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  De kosten van uw autolening hangen af van verschillende factoren. 
                  Met de juiste strategie bespaart u honderden euro's.
                </p>
                
                <h3>Factoren die uw rentevoet beïnvloeden:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Lagere rente</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Hoog voorschot (20%+)</li>
                      <li>• Nieuwe auto</li>
                      <li>• Korte looptijd</li>
                      <li>• Goede kredietgeschiedenis</li>
                      <li>• Vaste baan</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">⚠️ Hogere rente</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Geen voorschot</li>
                      <li>• Oude tweedehands auto</li>
                      <li>• Lange looptijd (7+ jaar)</li>
                      <li>• Zwakke kredietgeschiedenis</li>
                      <li>• Onzeker inkomen</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">💰 Bespaartips:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Vergelijk minimaal 3 verschillende banken</li>
                    <li>• Onderhandel over de rentevoet</li>
                    <li>• Betaal zo veel mogelijk voorschot</li>
                    <li>• Kies de kortst mogelijke looptijd</li>
                    <li>• Let op verborgen kosten (dossierkosten, verzekeringen)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Veelgestelde vragen over autoleningen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  
                  <div>
                    <h3 className="font-semibold mb-2">Wat is het verschil tussen JKP en rentevoet?</h3>
                    <p className="text-sm text-muted-foreground">
                      De JKP (Jaarlijkse Kostenpercentage) is het totale kostenpercentage inclusief 
                      alle kosten. De rentevoet is alleen de interest op de lening.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Hoeveel voorschot moet ik betalen?</h3>
                    <p className="text-sm text-muted-foreground">
                      Er is geen verplicht minimum, maar 10-20% voorschot is gebruikelijk. 
                      Meer voorschot betekent lagere maandlasten en vaak een betere rentevoet.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Kan ik mijn autolening vervroegd terugbetalen?</h3>
                    <p className="text-sm text-muted-foreground">
                      Ja, maar sommige banken rekenen vervroegde terugbetalingskosten. 
                      Check dit vooraf in uw leningscontract.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Wat gebeurt er als ik mijn afbetalingen niet kan betalen?</h3>
                    <p className="text-sm text-muted-foreground">
                      Neem direct contact op met uw bank voor een betalingsregeling. 
                      Bij blijvende problemen kan de bank de auto terugvorderen.
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

      {seoConfig && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AuthorityLinks links={seoConfig.authorityLinks} />
        </section>
      )}

      <Footer />
    </div>
  );
}