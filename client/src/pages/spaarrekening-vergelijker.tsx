import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useQuery } from "@tanstack/react-query";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Building2, Star, TrendingUp, Filter, ArrowUpDown } from "lucide-react";
import type { RateComparison } from "@shared/schema";
import { useCanonical } from "@/hooks/use-canonical";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";

export default function SpaarrekeningVergelijkerPage() {
  useCanonical();
  const seoConfig = getSeoConfig("spaarrekening-vergelijker");
  useSeoTags("spaarrekening-vergelijker");
  const [bedrag, setBedrag] = useState<number>(25000);
  const [filterType, setFilterType] = useState<string>("alle");
  const [sortBy, setSortBy] = useState<string>("totalRate");
  const [minimumRente, setMinimumRente] = useState<string>("");

  // Fetch rates data
  const { data: comparison, isLoading } = useQuery<RateComparison>({
    queryKey: ["/api/rates/by-type", "spaarrekening"],
    queryFn: async () => {
      const response = await fetch(`/api/rates/by-type/spaarrekening`);
      if (!response.ok) throw new Error("Failed to fetch rates");
      return response.json();
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  // Filter and sort rates
  const gefilterdeSparrekeningen = comparison?.rates ? comparison.rates
    .filter(rate => {
      if (filterType === "hoge-rente" && rate.totalRate < 2.0) return false;
      if (filterType === "geen-voorwaarden" && (rate.loyaltyBonus > 0 || rate.conditions)) return false;
      if (minimumRente && rate.totalRate < parseFloat(minimumRente)) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "totalRate": return b.totalRate - a.totalRate;
        case "baseRate": return b.baseRate - a.baseRate;
        case "bankName": return a.bankName.localeCompare(b.bankName);
        default: return b.totalRate - a.totalRate;
      }
    }) : [];

  // Calculate potential earnings for user's amount
  const berekenJaarlijkseRente = (rate: number) => {
    const jaarlijkseRente = (bedrag * rate) / 100;
    const belastbareRente = Math.max(0, jaarlijkseRente - 980); // €980 belastingvrij
    const belasting = belastbareRente * 0.30; // 30% roerende voorheffing
    const nettoRente = jaarlijkseRente - belasting;
    return { bruto: jaarlijkseRente, netto: nettoRente };
  };

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      {/* SEO Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Spaarrekening Vergelijker België - Beste Spaarrentes 2026
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Vergelijk alle spaarrekeningen van Belgische banken in real-time. Vind de hoogste 
            spaarrente en ontdek welke bank het meeste rendement biedt op uw spaargeld.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-lg font-semibold mb-2">🔄 Live data van alle banken:</p>
            <p className="text-sm opacity-90">
              Automatisch bijgewerkte tarieven, basisrentes, getrouwheidspremies en voorwaarden van alle grote Belgische banken.
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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
            
            {/* Filter Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Filter size={20} />
                  Filter en zoek uw ideale spaarrekening
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="bedrag">Uw spaarbedrag (€)</Label>
                    <Input
                      id="bedrag"
                      type="number"
                      value={bedrag}
                      onChange={(e) => setBedrag(Number(e.target.value))}
                      placeholder="25000"
                      data-testid="input-bedrag"
                    />
                  </div>

                  <div>
                    <Label htmlFor="filter">Filter type</Label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger data-testid="select-filter">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alle">Alle spaarrekeningen</SelectItem>
                        <SelectItem value="hoge-rente">Hoge rente (&gt;2%)</SelectItem>
                        <SelectItem value="geen-voorwaarden">Geen voorwaarden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="sort">Sorteren op</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger data-testid="select-sort">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="totalRate">Totale rente (hoog-laag)</SelectItem>
                        <SelectItem value="baseRate">Basisrente (hoog-laag)</SelectItem>
                        <SelectItem value="bankName">Bank naam (A-Z)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="minimum">Min. rente (%)</Label>
                    <Input
                      id="minimum"
                      type="number"
                      step="0.1"
                      value={minimumRente}
                      onChange={(e) => setMinimumRente(e.target.value)}
                      placeholder="1.5"
                      data-testid="input-minimum"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building2 size={16} />
                    {gefilterdeSparrekeningen.length} spaarrekeningen gevonden
                  </span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>Automatisch bijgewerkt elke 5 minuten</span>
                </div>
              </CardContent>
            </Card>

            {/* Ad After Calculator */}
            <div className="flex justify-center py-4">
              <GoogleAdsense slot="banner" />
            </div>

            {/* Results */}
            {isLoading ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p>Laden van actuele spaarrentes...</p>
                </CardContent>
              </Card>
            ) : gefilterdeSparrekeningen.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Geen spaarrekeningen gevonden met de huidige filters.</p>
                  <Button onClick={() => { setFilterType("alle"); setMinimumRente(""); }} className="mt-4">
                    Filters resetten
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {gefilterdeSparrekeningen.map((spaarrekening, index) => {
                  const renteBerekening = berekenJaarlijkseRente(spaarrekening.totalRate);
                  const isTop3 = index < 3;
                  
                  return (
                    <Card key={`${spaarrekening.bankName}-${spaarrekening.productName}`} 
                          className={`transition-all hover:shadow-lg ${isTop3 ? 'border-primary bg-primary/5' : ''}`}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                index === 0 ? 'bg-yellow-500 text-white' :
                                index === 1 ? 'bg-gray-400 text-white' :
                                index === 2 ? 'bg-amber-600 text-white' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                {index + 1}
                              </div>
                              
                              <div>
                                <h3 className="text-lg font-semibold" data-testid={`bank-${spaarrekening.bankName}`}>
                                  {spaarrekening.bankName}
                                </h3>
                                <p className="text-sm text-muted-foreground" data-testid={`product-${spaarrekening.productName}`}>
                                  {spaarrekening.productName}
                                </p>
                              </div>

                              {isTop3 && (
                                <Badge variant="default" className="ml-2">
                                  <Star size={12} className="mr-1" />
                                  Top {index + 1}
                                </Badge>
                              )}
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                              <div className="bg-muted/50 rounded p-3">
                                <p className="text-xs text-muted-foreground">Basisrente</p>
                                <p className="text-lg font-bold text-blue-600" data-testid={`base-rate-${spaarrekening.bankName}`}>
                                  {spaarrekening.baseRate.toFixed(2)}%
                                </p>
                              </div>

                              {spaarrekening.loyaltyBonus > 0 && (
                                <div className="bg-muted/50 rounded p-3">
                                  <p className="text-xs text-muted-foreground">Getrouwheidspremie</p>
                                  <p className="text-lg font-bold text-green-600">
                                    +{spaarrekening.loyaltyBonus.toFixed(2)}%
                                  </p>
                                </div>
                              )}

                              <div className="bg-primary/10 rounded p-3">
                                <p className="text-xs text-muted-foreground">Totale rente</p>
                                <p className="text-xl font-bold text-primary" data-testid={`total-rate-${spaarrekening.bankName}`}>
                                  {spaarrekening.totalRate.toFixed(2)}%
                                </p>
                              </div>
                            </div>

                            {spaarrekening.conditions && (
                              <div className="mb-4">
                                <p className="text-xs text-muted-foreground mb-1">Voorwaarden:</p>
                                <p className="text-sm bg-orange-50 dark:bg-orange-950 p-2 rounded text-orange-700 dark:text-orange-300">
                                  {spaarrekening.conditions}
                                </p>
                              </div>
                            )}

                            {(spaarrekening.minAmount || spaarrekening.maxAmount) && (
                              <div className="mb-4">
                                <p className="text-xs text-muted-foreground mb-1">Bedraglimieten:</p>
                                <div className="flex gap-4 text-sm">
                                  {spaarrekening.minAmount && (
                                    <span>Minimum: €{Number(spaarrekening.minAmount).toLocaleString()}</span>
                                  )}
                                  {spaarrekening.maxAmount && (
                                    <span>Maximum: €{Number(spaarrekening.maxAmount).toLocaleString()}</span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="text-right ml-6">
                            <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4">
                              <p className="text-xs text-green-700 dark:text-green-300 mb-1">
                                Jaarlijkse opbrengst op €{bedrag.toLocaleString()}:
                              </p>
                              <p className="text-lg font-bold text-green-600" data-testid={`earnings-${spaarrekening.bankName}`}>
                                €{Math.round(renteBerekening.bruto).toLocaleString()}
                              </p>
                              <p className="text-xs text-green-700 dark:text-green-300">
                                (Netto: €{Math.round(renteBerekening.netto).toLocaleString()})
                              </p>
                            </div>

                            <Button className="mt-3 w-full" data-testid={`select-${spaarrekening.bankName}`}>
                              Meer info
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Educational Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Hoe kiest u de beste spaarrekening?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3>🎯 Belangrijkste factoren</h3>
                    <ul>
                      <li><strong>Totale rente:</strong> Basisrente + getrouwheidspremie</li>
                      <li><strong>Voorwaarden:</strong> Zijn er verplichtingen of beperkingen?</li>
                      <li><strong>Flexibiliteit:</strong> Kunt u vrij opnemen wanneer nodig?</li>
                      <li><strong>Bedraglimieten:</strong> Tot welk bedrag geldt de rente?</li>
                      <li><strong>Bank stabiliteit:</strong> Betrouwbaarheid van de instelling</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3>💡 Praktische tips</h3>
                    <ul>
                      <li><strong>Spreiding:</strong> Verdeel over meerdere banken (€100k garantie per bank)</li>
                      <li><strong>Loyaliteit:</strong> Getrouwheidspremie geldt pas na 12 maanden</li>
                      <li><strong>Acties:</strong> Let op einddatum van promotionele tarieven</li>
                      <li><strong>Belasting:</strong> Eerste €980 rente is belastingvrij</li>
                      <li><strong>Vergelijken:</strong> Controleer regelmatig nieuwe aanbiedingen</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold mb-2">📊 Interpretatie van de resultaten:</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>🥇 Top 3 spaarrekeningen:</strong>
                      <p>Beste totale rentes beschikbaar op dit moment.</p>
                    </div>
                    <div>
                      <strong>💰 Jaarlijkse opbrengst:</strong>
                      <p>Berekend op uw ingevoerde bedrag, inclusief belastingen.</p>
                    </div>
                    <div>
                      <strong>🔄 Live updates:</strong>
                      <p>Tarieven worden automatisch bijgewerkt van onze database.</p>
                    </div>
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

      {/* Authority Links */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {seoConfig && <AuthorityLinks links={seoConfig.authorityLinks} />}
      </section>

      <Footer />
    </div>
  );
}