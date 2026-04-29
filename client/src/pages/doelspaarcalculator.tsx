import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import DoelspaarcalculatorComponent from "@/components/calculators/doelspaarcalculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCanonical } from "@/hooks/use-canonical";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import RelatedCalculators from "@/components/seo/RelatedCalculators";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";
import { SKELETON_SPEC } from "@shared/skeleton-spec";

export default function DoelspaarcalculatorPage() {
  useCanonical();
  const seoConfig = getSeoConfig("doelspaarcalculator");
  useSeoTags("doelspaarcalculator");
  
  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Doelspaarcalculator België - Plan Uw Spaardoelen
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Beheer al uw spaardoelen op één plek. Van noodfonds tot droomvakantie - 
            bereken hoeveel u maandelijks moet sparen en prioriteer slim uw doelen.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">🎯 Smart Goal Planning:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Meerdere doelen tegelijk beheren</li>
              <li>• Automatische prioritering op basis van urgentie</li>
              <li>• Belgische spaarproducten geïntegreerd</li>
              <li>• Realistische tijdslijnen en budgettering</li>
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
      {/* CAL-182: min-height matches the SSR skeleton so the post-hydration
          calculator section reserves the same vertical space the skeleton
          reserved, eliminating the wrapper-height-mismatch CLS shift. */}
      <section
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        style={{ minHeight: SKELETON_SPEC.doelspaarcalculator.minHeight }}
      >
        <div className="space-y-8">

            {/* Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  <i className="fas fa-bullseye mr-3 text-primary"></i>
                  Doelspaarcalculator - Beheer al uw spaardoelen
                </CardTitle>
                <p className="text-muted-foreground">
                  Plan en beheer meerdere spaardoelen tegelijk. Krijg inzicht in benodigde maandelijkse bedragen, 
                  prioriteiten en realistische tijdslijnen voor al uw financiële doelen.
                </p>
              </CardHeader>
              <CardContent>
                <DoelspaarcalculatorComponent />
              </CardContent>
            </Card>

            {/* Ad After Calculator */}
            <div className="flex justify-center py-4">
              <GoogleAdsense slot="banner" />
            </div>

            {/* Spaardoelen Uitleg */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-question-circle mr-3 text-blue-600"></i>
                  Waarom Doelgericht Sparen?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Doelgericht sparen helpt u uw financiële dromen om te zetten in concrete, haalbare plannen. 
                  Door specifieke doelen te stellen met tijdslijnen en bedragen, verhoogt u de kans op succes aanzienlijk.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 font-bold">1</div>
                      <h3 className="font-semibold">SMART Doelen</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Specifiek, Meetbaar, Acceptabel, Realistisch en Tijdsgebonden. 
                      Deze methodiek vergroot uw spaarsucces.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center"><i className="fas fa-check text-green-600 mr-2"></i>Duidelijke bedragen</li>
                      <li className="flex items-center"><i className="fas fa-check text-green-600 mr-2"></i>Vaste deadlines</li>
                      <li className="flex items-center"><i className="fas fa-check text-green-600 mr-2"></i>Haalbare tijdslijnen</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 font-bold">2</div>
                      <h3 className="font-semibold">Prioritering</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Niet alle doelen zijn even belangrijk. Prioriteer op basis van 
                      urgentie, impact en persoonlijke waarden.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center"><i className="fas fa-exclamation text-red-600 mr-2"></i>Hoog: Noodfonds, schulden</li>
                      <li className="flex items-center"><i className="fas fa-minus text-orange-600 mr-2"></i>Gemiddeld: Auto, verbouwing</li>
                      <li className="flex items-center"><i className="fas fa-circle text-blue-600 mr-2"></i>Laag: Luxe vakantie, hobby's</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3 font-bold">3</div>
                      <h3 className="font-semibold">Voortgang Tracking</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Regelmatige evaluatie houdt u gemotiveerd en stelt u in staat 
                      om aanpassingen te maken wanneer nodig.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center"><i className="fas fa-chart-line text-purple-600 mr-2"></i>Maandelijkse check-ins</li>
                      <li className="flex items-center"><i className="fas fa-adjust text-purple-600 mr-2"></i>Flexibele aanpassingen</li>
                      <li className="flex items-center"><i className="fas fa-trophy text-purple-600 mr-2"></i>Vier successen</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Populaire Spaardoelen */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-star mr-3 text-yellow-600"></i>
                  Populaire Spaardoelen in België
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-red-600">🚨 Essentiële Doelen</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-red-900 dark:text-red-100">🛡️ Noodfonds</span>
                          <span className="text-sm text-red-700 dark:text-red-300">€8k - €20k</span>
                        </div>
                        <div className="text-xs text-red-600 dark:text-red-400">
                          3-6 maanden uitgaven voor onverwachte kosten
                        </div>
                      </div>
                      
                      <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-orange-900 dark:text-orange-100">🏠 Eigen Woning</span>
                          <span className="text-sm text-orange-700 dark:text-orange-300">€30k - €80k</span>
                        </div>
                        <div className="text-xs text-orange-600 dark:text-orange-400">
                          Aanbetaling hypotheek + notariskosten
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-600">💚 Lifestyle Doelen</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-green-900 dark:text-green-100">🚗 Nieuwe Auto</span>
                          <span className="text-sm text-green-700 dark:text-green-300">€15k - €40k</span>
                        </div>
                        <div className="text-xs text-green-600 dark:text-green-400">
                          Vermijd autolening rente door cash te betalen
                        </div>
                      </div>
                      
                      <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-blue-900 dark:text-blue-100">✈️ Droomvakantie</span>
                          <span className="text-sm text-blue-700 dark:text-blue-300">€3k - €8k</span>
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-400">
                          Verre reizen, luxe accommodaties
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h5 className="font-semibold mb-2">💡 Pro Tip voor Belgen:</h5>
                  <p className="text-sm text-muted-foreground">
                    Gebruik verschillende spaarproducten afhankelijk van uw tijdshorizon: 
                    spaarrekening voor korte termijn (&lt;2 jaar), termijnrekening voor middellange termijn (2-5 jaar), 
                    en beleggingsfondsen voor lange termijn (&gt;5 jaar) doelen.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Belgische Spaaropties */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-landmark mr-3 text-blue-600"></i>
                  Belgische Spaaropties per Doel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-green-600 mb-3">Korte Termijn (&lt;2 jaar)</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <i className="fas fa-piggy-bank text-green-600 mr-2 mt-1"></i>
                          <div>
                            <div className="font-medium">Spaarrekening</div>
                            <div className="text-xs text-muted-foreground">1-3% rente, direct beschikbaar</div>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-calendar text-green-600 mr-2 mt-1"></i>
                          <div>
                            <div className="font-medium">Korte Termijnrekening</div>
                            <div className="text-xs text-muted-foreground">Iets hogere rente, beperkte toegang</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-blue-600 mb-3">Middellange Termijn (2-5 jaar)</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <i className="fas fa-clock text-blue-600 mr-2 mt-1"></i>
                          <div>
                            <div className="font-medium">Termijnrekening</div>
                            <div className="text-xs text-muted-foreground">2-4% rente, vaste periode</div>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-certificate text-blue-600 mr-2 mt-1"></i>
                          <div>
                            <div className="font-medium">Staatsbons</div>
                            <div className="text-xs text-muted-foreground">Gegarandeerd rendement</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-purple-600 mb-3">Lange Termijn (&gt;5 jaar)</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <i className="fas fa-chart-line text-purple-600 mr-2 mt-1"></i>
                          <div>
                            <div className="font-medium">Beleggingsfondsen</div>
                            <div className="text-xs text-muted-foreground">Hoger rendement, meer risico</div>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-umbrella text-purple-600 mr-2 mt-1"></i>
                          <div>
                            <div className="font-medium">Pensioensparen</div>
                            <div className="text-xs text-muted-foreground">Belastingvoordeel 30%</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                    <h5 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                      ⚠️ Belastingen & Vrijstellingen
                    </h5>
                    <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                      <li>• Spaarrente tot €1.020/jaar belastingvrij (per persoon, 2026)</li>
                      <li>• Pensioensparen: €1.310/jaar met 30% belastingvoordeel</li>
                      <li>• Beleggingen: meerwaarden belastingvrij voor particulieren</li>
                      <li>• Roerende voorheffing: 15% op gereglementeerde spaarrekening boven vrijstelling, 30% op termijnrekeningen en Tak 21</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Educational Deep-Dive (CAL-138) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  <i className="fas fa-graduation-cap mr-3 text-primary"></i>
                  Doelsparen in detail — formule, fiscaliteit en FAQ
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none space-y-4">
                <p>
                  De Doelspaarcalculator helpt u meerdere financiële doelen tegelijk plannen — van een nieuwe wagen tot een droomvakantie of de aanbetaling op een woning. De tool berekent voor elk doel hoeveel u maandelijks opzij moet leggen om het binnen uw gewenste tijdslijn te halen, en helpt u prioriteiten stellen wanneer uw spaarbudget beperkt is. Ideaal voor wie een gestructureerd spaarplan wil opbouwen in plaats van willekeurig te sparen zonder helder eindresultaat.
                </p>

                <h3>Hoe werkt het?</h3>
                <p>
                  De calculator gebruikt de standaardformule voor doelsparen: <strong>Maandelijks bedrag = (Doelbedrag − Huidig spaartegoed) ÷ Aantal maanden tot deadline</strong>. Voor doelen die rente opbrengen op een spaarrekening past de tool de toekomstige-waardeformule met samengestelde interest toe: M = D × i ÷ ((1+i)ⁿ − 1), waarbij D het doelbedrag is, i de maandelijkse rente, en n het aantal maanden.
                </p>
                <p>
                  U voert per doel het streefbedrag, de deadline en eventueel een huidig saldo in. De calculator toont vervolgens het maandelijks vereiste spaarbedrag en sorteert uw doelen op urgentie en haalbaarheid. Wanneer uw totale maandelijkse spaarcapaciteit ontoereikend is voor alle doelen samen, signaleert de tool dit en kunt u kiezen om deadlines te verschuiven, doelbedragen aan te passen of doelen tijdelijk te pauzeren. Realistische voorbeelden: €25.000 voor een wagen over 5 jaar = ±€385/maand zonder rente, of ±€365/maand bij 2,5% spaarrente.
                </p>

                <h3>Belgisch fiscaal kader 2026</h3>
                <p>
                  Voor doelsparen op een gereglementeerde Belgische spaarrekening is de eerste schijf interest belastingvrij: in 2026 bedraagt de vrijstelling <strong>€1.020 interest per persoon per jaar</strong> (gehuwden en wettelijk samenwonenden mogen die vrijstelling per partner toepassen). Boven dat plafond geldt <strong>15% roerende voorheffing</strong>. Voor termijnrekeningen, kasbons en spaarverzekeringen Tak 21 ligt de heffing op <strong>30% roerende voorheffing</strong>. Tak 21-spaarverzekeringen zijn pas vrijgesteld na 8 jaar en 1 dag looptijd (of bij overlijden). Voor langere doelen (&gt;8 jaar) — bijvoorbeeld een woningaankoop of pensioenaanvulling — kan een gemengde strategie met spaarrekening + Tak 21 fiscaal interessant zijn. Voor korte doelen (&lt;3 jaar) blijft een gewone spaarrekening doorgaans het eenvoudigst en meest liquide.
                </p>

                <h3>Veelgestelde vragen</h3>
                <h4>Hoeveel doelen kan ik tegelijk plannen?</h4>
                <p>Er is geen technisch maximum, maar in de praktijk werken de meeste Belgische gezinnen het best met 3-5 actieve spaardoelen. Te veel doelen versnippert uw maandbudget en maakt elk doel traag haalbaar.</p>
                <h4>Met welke spaarrente moet ik rekenen?</h4>
                <p>Voor gereglementeerde Belgische spaarrekeningen ligt de gemiddelde rente in 2026 tussen 1,5% en 3,5%. Voor termijnrekeningen op 1-3 jaar tot 3,75%. Reken voor doelen onder de 2 jaar best zonder rendement, want de getrouwheidspremie krijgt u dan niet volledig.</p>
                <h4>Wat als mijn maandbudget niet alle doelen dekt?</h4>
                <p>De calculator markeert dit en stelt drie oplossingen voor: (1) deadlines verlengen, (2) niet-essentiële doelen pauzeren, of (3) prioriteit geven aan doelen met de hoogste urgentie (bv. noodfonds eerst).</p>
                <h4>Tellen werkgeversbonus en vakantiegeld mee?</h4>
                <p>Ja, in de "extra storting"-velden. Eindejaarspremie en vakantiegeld zijn ideale boosters voor langetermijndoelen die anders te zwaar wegen op uw maandbudget.</p>

                <p className="text-sm text-muted-foreground">
                  Verder rekenen: <a href="/planning/noodfonds-calculator">Noodfonds Calculator</a> ·{" "}
                  <a href="/sparen/vakantiegeld-sparen-calculator">Vakantiegeld Sparen Calculator</a> ·{" "}
                  <a href="/sparen/spaarrekening-vergelijker">Spaarrekening Vergelijker</a>.
                </p>
              </CardContent>
            </Card>

        </div>
      </section>

      {/* Bottom Banner Ad */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <GoogleAdsense slot="banner" className="hidden lg:block" />
          <GoogleAdsense slot="banner" className="lg:hidden" />
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <RelatedCalculators currentSlug="doelspaarcalculator" />
      </section>

      {/* Authority Links */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} />}
      </section>

      <Footer />
    </div>
  );
}