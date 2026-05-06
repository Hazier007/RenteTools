import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CryptoWinstVerliesCalculator from "@/components/calculators/crypto-winst-verlies-calculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";
import RelatedCalculators from "@/components/seo/RelatedCalculators";
import EducationalDeepDive from "@/seo/EducationalDeepDive";
import { cryptoWinstVerliesCalculatorContent } from "@/seo/calculator-content/crypto-winst-verlies-calculator";
import { TrendingUp, Calculator, Target, AlertTriangle } from "lucide-react";

export default function CryptoWinstVerliesCalculatorPage() {
  const seoConfig = getSeoConfig("crypto-winst-verlies-calculator");
  useSeoTags("crypto-winst-verlies-calculator");

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center gap-4">
            <TrendingUp className="h-12 w-12" />
            Crypto Winst/Verlies Calculator
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken uw werkelijke winst of verlies op crypto trades inclusief alle transactiekosten. 
            Ontdek uw ROI, break-even prijs en cost basis per coin.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
            <p className="text-lg font-semibold mb-2">💰 Wat berekent deze tool:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• <strong>Netto winst/verlies:</strong> Na aftrek van alle kosten</li>
              <li>• <strong>ROI percentage:</strong> Rendement op uw investering</li>
              <li>• <strong>Break-even prijs:</strong> Minimale verkoopprijs zonder verlies</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center">
          <GoogleAdsense slot="banner" className="hidden lg:block" />
          <GoogleAdsense slot="banner" className="lg:hidden" />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <CryptoWinstVerliesCalculator />

          <div className="flex justify-center py-4">
            <GoogleAdsense slot="banner" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Hoe bereken je crypto winst correct?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Bij het berekenen van crypto winst of verlies is het belangrijk om alle kosten 
                mee te nemen. Veel beleggers vergeten transactiekosten waardoor ze hun 
                werkelijke rendement verkeerd inschatten.
              </p>
              
              <h3>Formule voor netto winst/verlies:</h3>
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm">
                <p>Netto Winst = Huidige Waarde - Totale Investering - Verkoopkosten</p>
                <p className="mt-2">Totale Investering = (Aankoopprijs × Aantal) + Aankoopkosten</p>
              </div>
              
              <h3>Kosten om mee te rekenen:</h3>
              <ul>
                <li><strong>Trading fees:</strong> 0,1% - 0,5% per transactie (Binance, Coinbase)</li>
                <li><strong>Spread kosten:</strong> Verschil tussen koop- en verkoopprijs</li>
                <li><strong>Network fees:</strong> Gas fees bij het verplaatsen van crypto</li>
                <li><strong>Stortingskosten:</strong> Fees voor SEPA of creditcard betalingen</li>
                <li><strong>Opnamekosten:</strong> Fees voor het uitbetalen naar bankrekening</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Target className="h-5 w-5" />
                Cost basis en belastingaangifte
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Uw cost basis is cruciaal voor de belastingaangifte. In België wordt crypto 
                belast afhankelijk van uw classificatie (goede huisvader, speculatief of professioneel).
              </p>
              
              <h3>Cost basis methoden:</h3>
              <ul>
                <li>
                  <strong>FIFO (First In, First Out):</strong> Eerst gekochte coins worden 
                  eerst verkocht. Dit is de standaard methode in België.
                </li>
                <li>
                  <strong>LIFO (Last In, First Out):</strong> Laatst gekochte coins worden 
                  eerst verkocht. Niet toegestaan in België.
                </li>
                <li>
                  <strong>Gemiddelde kostprijs:</strong> Gemiddelde van alle aankopen. 
                  Eenvoudig bij veel transacties.
                </li>
              </ul>
              
              <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Belgische belastingregels:
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Goede huisvader:</strong> Winsten zijn belastingvrij</li>
                  <li>• <strong>Speculatief:</strong> 33% belasting op meerwaarden</li>
                  <li>• <strong>Professioneel:</strong> Progressieve tarieven tot 50%</li>
                </ul>
                <p className="text-sm mt-2">
                  Bewaar alle transactiebewijzen voor eventuele controle door de fiscus.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Educational Deep-Dive (CAL-139) */}
          <EducationalDeepDive
            title="Crypto winst/verlies in detail — formules, fiscaliteit en FAQ"
            content={cryptoWinstVerliesCalculatorContent}
            related={[
              { href: "/beleggen/crypto-belasting-calculator", label: "Crypto Belasting Calculator" },
              { href: "/beleggen/cryptocurrency-calculator", label: "Cryptocurrency Calculator" },
              { href: "/beleggen/staking-apy-calculator", label: "Staking APY Calculator" },
            ]}
          />

          {seoConfig && seoConfig.authorityLinks.length > 0 && (
            <AuthorityLinks links={seoConfig.authorityLinks} />
          )}

          <RelatedCalculators currentSlug="crypto-winst-verlies-calculator" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
