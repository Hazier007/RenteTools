import { useMemo, useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import RelatedCalculators from "@/components/seo/RelatedCalculators";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";
import { wettelijkeRentevoetBelgieContent } from "@/seo/calculator-content/wettelijke-rentevoet-belgie";
import AanmaningGenerator from "@/components/aanmaning/AanmaningGenerator";
import {
  berekenWettelijkeInterest,
  getActueleRentevoeten,
  formatPercent,
  B2B_FORFAIT_EUR,
  CONSUMENT_WACHTTERMIJN_DAGEN,
  BRON_LABEL,
  type InterestRegime,
} from "@shared/wettelijke-interest";
import {
  COLLECTPRO_CTA_LABEL,
  COLLECTPRO_DISCLOSURE,
  COLLECTPRO_URL,
  collectProCtaVanToepassing,
} from "@shared/collectpro";

const SLUG = "wettelijke-rentevoet-belgie";

interface RegimeOptie {
  id: InterestRegime;
  label: string;
  toelichting: string;
  startLabel: string;
  startHint: string;
}

const REGIMES: RegimeOptie[] = [
  {
    id: "handel",
    label: "Factuur aan een onderneming (B2B)",
    toelichting: "Wet 2 augustus 2002 · voet per semester · + €40 forfait",
    startLabel: "Startdatum interest (dag na de vervaldag)",
    startHint: "De interest loopt van rechtswege vanaf de dag na de vervaldag, zonder ingebrekestelling.",
  },
  {
    id: "consument",
    label: "Factuur aan een consument",
    toelichting: `Boek XIX WER · na gratis herinnering + ${CONSUMENT_WACHTTERMIJN_DAGEN} dagen · geplafonneerd`,
    startLabel: `Startdatum interest (na herinnering + ${CONSUMENT_WACHTTERMIJN_DAGEN} kalenderdagen)`,
    startHint: "Eerst een kosteloze eerste herinnering, dan 14 kalenderdagen wachten. Pas daarna mag interest lopen.",
  },
  {
    id: "burgerlijk",
    label: "Burgerlijke zaken (particulieren, huur, loon)",
    toelichting: "Wettelijke interestvoet · vanaf de ingebrekestelling",
    startLabel: "Datum ingebrekestelling (aanmaning)",
    startHint: "Interest loopt in principe vanaf de ingebrekestelling, tenzij de wet of het contract anders bepaalt.",
  },
  {
    id: "fiscaal",
    label: "Belastingschuld (inkomstenbelastingen)",
    toelichting: "Art. 414 WIB92 · per kalendermaand",
    startLabel: "Vervaldag van de aanslag",
    startHint: "Fiscale nalatigheidsinterest wordt per kalendermaand gerekend, niet per dag.",
  },
];

function toISODate(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function parseISODate(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

const eur = (n: number) => `€${n.toLocaleString("nl-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const datum = (d: Date) => d.toLocaleDateString("nl-BE", { day: "2-digit", month: "2-digit", year: "numeric" });

export default function WettelijkeRentevoetBelgie() {
  const seoConfig = getSeoConfig(SLUG);
  useSeoTags(SLUG);
  const actueel = getActueleRentevoeten();

  const [regime, setRegime] = useState<InterestRegime>("handel");
  const [hoofdsom, setHoofdsom] = useState<string>("5000");
  const [startDatum, setStartDatum] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 90);
    return toISODate(d);
  });
  const [eindDatum, setEindDatum] = useState<string>(() => toISODate(new Date()));
  const [metForfait, setMetForfait] = useState<boolean>(true);

  const regimeInfo = REGIMES.find((r) => r.id === regime) ?? REGIMES[0];

  const resultaat = useMemo(() => {
    const van = parseISODate(startDatum);
    const tot = parseISODate(eindDatum);
    const bedrag = parseFloat(hoofdsom.replace(",", ".")) || 0;
    if (!van || !tot) return null;
    return berekenWettelijkeInterest({ hoofdsom: bedrag, van, tot, regime, metForfait });
  }, [hoofdsom, startDatum, eindDatum, regime, metForfait]);

  const plafondOverschreden =
    resultaat !== null && resultaat.plafond !== null && resultaat.interest > resultaat.plafond;

  // Enkel B2B en enkel als bedrag of vertraging groot genoeg is (regel in shared/collectpro.ts).
  const toonCollectProCta =
    resultaat !== null &&
    collectProCtaVanToepassing({ regime, hoofdsom: resultaat.hoofdsom, dagen: resultaat.dagen });

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />

      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Wettelijke Interestvoet België {actueel.jaar}: nalatigheidsinterest berekenen
          </h1>
          <p className="text-xl mb-8 opacity-90">
            In {actueel.jaar} bedraagt de wettelijke interestvoet {formatPercent(actueel.burgerlijk)}. Voor facturen
            tussen ondernemingen geldt {formatPercent(actueel.handelS1)} (1e semester) en {formatPercent(actueel.handelS2)}{" "}
            (2e semester), voor belastingschulden {formatPercent(actueel.fiscaal)}. Kies hieronder uw situatie en bereken
            de interest per periode, inclusief het forfait van €{B2B_FORFAIT_EUR} of het plafond voor consumenten.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">⚖️ Actuele interestvoeten {actueel.jaar}</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• Burgerlijke en sociale zaken: {formatPercent(actueel.burgerlijk)} per jaar</li>
              <li>
                • Handelstransacties (B2B): {formatPercent(actueel.handelS1)} (1 jan – 30 jun) ·{" "}
                {formatPercent(actueel.handelS2)} (1 jul – 31 dec)
              </li>
              <li>• Fiscale nalatigheidsinterest: {formatPercent(actueel.fiscaal)} per jaar</li>
            </ul>
            <p className="text-xs opacity-80 mt-3">Bron: {BRON_LABEL}.</p>
          </div>
        </div>
      </section>

      {/* Bewust geen advertentie boven de calculator: de CollectPro-CTA en de
          aanmaningsgenerator zijn hier de conversie, niet AdSense. */}

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                <i className="fas fa-gavel mr-3 text-primary"></i>
                Nalatigheidsinterest berekenen
              </CardTitle>
              <p className="text-muted-foreground">
                Kies de situatie, vul de hoofdsom en de data in. De calculator splitst de interest automatisch op per
                jaar of per semester en rekent elke periode tegen de voet die toen gold.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3 mb-6" role="radiogroup" aria-label="Soort schuld">
                {REGIMES.map((optie) => (
                  <Button
                    key={optie.id}
                    type="button"
                    role="radio"
                    aria-checked={regime === optie.id}
                    variant={regime === optie.id ? "default" : "outline"}
                    className="h-auto flex-col items-start text-left py-3 whitespace-normal"
                    onClick={() => setRegime(optie.id)}
                    data-testid={`button-regime-${optie.id}`}
                  >
                    <span className="font-semibold">{optie.label}</span>
                    <span className={`text-xs ${regime === optie.id ? "opacity-90" : "text-muted-foreground"}`}>
                      {optie.toelichting}
                    </span>
                  </Button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="hoofdsom">Hoofdsom (€)</Label>
                    <Input
                      id="hoofdsom"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.01"
                      value={hoofdsom}
                      onChange={(e) => setHoofdsom(e.target.value)}
                      placeholder="5000"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Het openstaande bedrag, zonder eerder aangerekende interest.</p>
                  </div>

                  <div>
                    <Label htmlFor="startdatum">{regimeInfo.startLabel}</Label>
                    <Input id="startdatum" type="date" value={startDatum} onChange={(e) => setStartDatum(e.target.value)} />
                    <p className="text-xs text-muted-foreground mt-1">{regimeInfo.startHint}</p>
                  </div>

                  <div>
                    <Label htmlFor="einddatum">Betaaldatum (of datum van vandaag)</Label>
                    <Input id="einddatum" type="date" value={eindDatum} onChange={(e) => setEindDatum(e.target.value)} />
                    <p className="text-xs text-muted-foreground mt-1">De betaaldag zelf wordt niet meegerekend.</p>
                  </div>

                  {regime === "handel" && (
                    <label className="flex items-start gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4"
                        checked={metForfait}
                        onChange={(e) => setMetForfait(e.target.checked)}
                        data-testid="checkbox-forfait"
                      />
                      <span>
                        Forfait van €{B2B_FORFAIT_EUR} per factuur meerekenen (wet 2 augustus 2002, art. 6; van rechtswege
                        verschuldigd)
                      </span>
                    </label>
                  )}
                </div>

                <div className="space-y-4">
                  <Card className="bg-primary/5">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-4">Resultaat</h3>
                      {!resultaat || resultaat.dagen <= 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Kies een startdatum die vóór de betaaldatum ligt om de interest te berekenen.
                        </p>
                      ) : (
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span>Hoofdsom</span>
                            <span className="font-semibold">{eur(resultaat.hoofdsom)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Periode</span>
                            <span>
                              {datum(resultaat.van)} – {datum(resultaat.tot)} (
                              {regime === "fiscaal"
                                ? `${resultaat.maanden ?? 0} volle maand${(resultaat.maanden ?? 0) === 1 ? "" : "en"}`
                                : `${resultaat.dagen} dagen`}
                              )
                            </span>
                          </div>

                          {resultaat.periodes.length > 0 && (
                            <table className="w-full text-xs border-t border-border mt-2" data-testid="table-periodes">
                              <thead>
                                <tr className="text-muted-foreground">
                                  <th className="text-left py-1 font-medium">Periode</th>
                                  <th className="text-right py-1 font-medium">{regime === "fiscaal" ? "Maand" : "Dagen"}</th>
                                  <th className="text-right py-1 font-medium">Voet</th>
                                  <th className="text-right py-1 font-medium">Interest</th>
                                </tr>
                              </thead>
                              <tbody>
                                {resultaat.periodes.map((periode, index) => (
                                  <tr key={index} className="border-t border-border/50">
                                    <td className="py-1">{periode.label}</td>
                                    <td className="py-1 text-right">{regime === "fiscaal" ? 1 : periode.dagen}</td>
                                    <td className="py-1 text-right">{formatPercent(periode.rentevoet)}</td>
                                    <td className="py-1 text-right">{eur(periode.interest)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}

                          <div className="flex justify-between border-t pt-2">
                            <span>Nalatigheidsinterest</span>
                            <span className="font-semibold" data-testid="text-interest">
                              {eur(resultaat.interest)}
                            </span>
                          </div>
                          {resultaat.forfait > 0 && (
                            <div className="flex justify-between">
                              <span>Forfaitaire schadevergoeding</span>
                              <span className="font-semibold">{eur(resultaat.forfait)}</span>
                            </div>
                          )}
                          <div className="border-t pt-3">
                            <div className="flex justify-between text-lg">
                              <span className="font-semibold">Totaal te betalen</span>
                              <span className="font-bold text-primary" data-testid="text-totaal">
                                {eur(resultaat.totaal)}
                              </span>
                            </div>
                          </div>

                          {resultaat.plafond !== null && (
                            <div
                              className={`rounded-md p-3 text-xs ${
                                plafondOverschreden
                                  ? "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100"
                                  : "bg-muted text-muted-foreground"
                              }`}
                              data-testid="text-plafond"
                            >
                              <strong>Boek XIX WER:</strong> interest en kosten samen mogen bij dit saldo maximaal{" "}
                              {eur(resultaat.plafond)} bedragen.
                              {plafondOverschreden
                                ? " De berekende interest overschrijdt dat plafond: reken niet meer aan dan het plafond, en enkel als uw voorwaarden een schadebeding voorzien."
                                : " Elk bijkomend schadebeding telt mee voor dit plafond."}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {toonCollectProCta && resultaat && (
                    <div className="rounded-lg border border-primary/30 bg-primary/5 p-4" data-testid="cta-collectpro">
                      <p className="font-semibold mb-1">Blijft de factuur onbetaald?</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Bij {eur(resultaat.hoofdsom)} en {resultaat.dagen} dagen vertraging loont het om de invordering uit
                        handen te geven. Stuur eerst de aanmaning hieronder; betaalt de klant dan nog niet, dan neemt
                        CollectPro.be de minnelijke invordering voor kmo&apos;s over, no cure no pay.
                      </p>
                      <Button asChild className="w-full sm:w-auto">
                        <a
                          href={`${COLLECTPRO_URL}?utm_source=interesten&utm_medium=calculator&utm_campaign=wettelijke-rentevoet`}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid="link-collectpro"
                        >
                          {COLLECTPRO_CTA_LABEL}
                        </a>
                      </Button>
                      <p className="text-xs text-muted-foreground mt-3">{COLLECTPRO_DISCLOSURE}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aanmaning downloaden (lead-capture); enkel voor B2B- en consumentenfacturen */}
          <AanmaningGenerator regime={regime} berekening={resultaat} />

          {/* Ad After Calculator */}
          <div className="flex justify-center py-4">
            <GoogleAdsense slot="banner" />
          </div>

          {/* Uitleg: dezelfde inhoud als de server-side HTML */}
          {wettelijkeRentevoetBelgieContent.sections.map((section) => (
            <Card key={section.heading}>
              <CardHeader>
                <CardTitle className="text-xl">{section.heading}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                {section.blocks.map((block, index) => {
                  if (block.kind === "p") return <p key={index}>{block.text}</p>;
                  if (block.kind === "formula") {
                    return (
                      <p key={index} className="bg-muted rounded-md px-4 py-3 font-mono text-sm">
                        {block.text}
                      </p>
                    );
                  }
                  return (
                    <ul key={index}>
                      {block.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  );
                })}
              </CardContent>
            </Card>
          ))}

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Veelgestelde vragen over wettelijke interest</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {wettelijkeRentevoetBelgieContent.faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
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

      {/* Related Calculators */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <RelatedCalculators currentSlug={SLUG} />
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} title="Officiële bronnen" />}
      </section>

      <Footer />
    </div>
  );
}
