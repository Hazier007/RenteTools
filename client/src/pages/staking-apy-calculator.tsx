import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import StakingApyCalculator from "@/components/calculators/staking-apy-calculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";
import RelatedCalculators from "@/components/seo/RelatedCalculators";
import { Coins, TrendingUp, Clock, AlertTriangle } from "lucide-react";

export default function StakingApyCalculatorPage() {
  const seoConfig = getSeoConfig("staking-apy-calculator");
  useSeoTags("staking-apy-calculator");

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center gap-4">
            <Coins className="h-12 w-12" />
            Staking APY Calculator
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken uw crypto staking rendement met nauwkeurige APY naar APR conversie. 
            Ontdek hoeveel u kunt verdienen met verschillende compounding frequenties.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
            <p className="text-lg font-semibold mb-2">📊 APY vs APR uitgelegd:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• <strong>APR:</strong> Jaarlijks percentage zonder compound effect</li>
              <li>• <strong>APY:</strong> Jaarlijks percentage mét compound effect</li>
              <li>• <strong>Belasting:</strong> 30% roerende voorheffing op staking rewards</li>
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
          <StakingApyCalculator />

          <div className="flex justify-center py-4">
            <GoogleAdsense slot="banner" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Hoe werkt crypto staking?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Crypto staking is het proces waarbij u uw cryptocurrency "vastzet" om het netwerk 
                te ondersteunen en in ruil daarvoor beloningen ontvangt. Dit is mogelijk bij 
                Proof-of-Stake (PoS) blockchains zoals Ethereum, Cardano en Polkadot.
              </p>
              
              <h3>Populaire staking opties:</h3>
              <ul>
                <li><strong>Ethereum (ETH):</strong> 3-5% APY, vereist 32 ETH voor solo staking of gebruik een staking pool</li>
                <li><strong>Cardano (ADA):</strong> 4-6% APY, geen minimum, flexibele delegatie</li>
                <li><strong>Polkadot (DOT):</strong> 10-15% APY, lock-up periodes van 28 dagen</li>
                <li><strong>Solana (SOL):</strong> 5-8% APY, geen minimum voor delegatie</li>
              </ul>
              
              <h3>Compounding frequenties:</h3>
              <ul>
                <li><strong>Dagelijks:</strong> Hoogste effectief rendement, maar meer transactiekosten</li>
                <li><strong>Wekelijks:</strong> Goede balans tussen rendement en kosten</li>
                <li><strong>Maandelijks:</strong> Lagere kosten, nog steeds compound effect</li>
                <li><strong>Jaarlijks:</strong> Simpelste optie, geen compound voordeel</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Lock-up periodes en flexibiliteit
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Bij het staken van crypto moet u rekening houden met lock-up periodes. 
                Dit is de tijd dat uw crypto vastzit en niet verhandeld kan worden.
              </p>
              
              <h3>Typen staking:</h3>
              <ul>
                <li>
                  <strong>Flexibel staking:</strong> Geen lock-up, lagere rewards (2-4%), 
                  onmiddellijk opnemen mogelijk
                </li>
                <li>
                  <strong>Locked staking:</strong> Vaste periode (30-365 dagen), 
                  hogere rewards (5-15%), geen tussentijdse opname
                </li>
                <li>
                  <strong>Liquid staking:</strong> Ontvang een token (stETH, rETH) dat 
                  verhandelbaar is terwijl uw ETH gestaked blijft
                </li>
              </ul>
              
              <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Let op:
                </h4>
                <p className="text-sm">
                  Hoge APY's zijn vaak onrealistisch of komen met hoge risico's. 
                  Wees voorzichtig met projecten die rendementen boven 20% beloven. 
                  Doe altijd grondig onderzoek (DYOR) voordat u staakt.
                </p>
              </div>
            </CardContent>
          </Card>

          {seoConfig && seoConfig.authorityLinks.length > 0 && (
            <AuthorityLinks links={seoConfig.authorityLinks} />
          )}

          <RelatedCalculators currentSlug="staking-apy-calculator" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
