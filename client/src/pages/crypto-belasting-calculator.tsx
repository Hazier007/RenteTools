import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CryptoBelastingCalculator from "@/components/calculators/crypto-belasting-calculator";
import GoogleAdsense from "@/components/ui/google-adsense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FaqSchema from "@/components/seo/FaqSchema";
import AuthorityLinks from "@/components/seo/AuthorityLinks";
import PageBreadcrumb from "@/components/seo/PageBreadcrumb";
import { getSeoConfig } from "@/seo/calculatorSeoConfig";
import { useSeoTags } from "@/hooks/use-seo-tags";
import RelatedCalculators from "@/components/seo/RelatedCalculators";
import { Coins, Shield, AlertTriangle, Scale } from "lucide-react";

export default function CryptoBelastingCalculatorPage() {
  const seoConfig = getSeoConfig("crypto-belasting-calculator");
  useSeoTags("crypto-belasting-calculator");

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && <FaqSchema faqs={seoConfig.faqs} />}
      <Header />
      
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {seoConfig && <PageBreadcrumb category={seoConfig.category} pageTitle={seoConfig.breadcrumbTitle} />}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center gap-4">
            <Coins className="h-12 w-12" />
            Belgische Crypto Belasting Calculator
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Bereken uw mogelijke belasting op cryptocurrency winsten volgens Belgisch fiscaal recht. 
            Ontdek of u als hobby belegger, speculant of professioneel wordt geclassificeerd.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
            <p className="text-lg font-semibold mb-2">💡 Belgische crypto belasting regels:</p>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• <strong>Goede huisvader:</strong> Lange termijn, passief = belastingvrij</li>
              <li>• <strong>Speculatief:</strong> Korte termijn, actief = 33% diverse inkomsten</li>
              <li>• <strong>Staking rewards:</strong> 30% roerende voorheffing</li>
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
          <CryptoBelastingCalculator />

          <div className="flex justify-center py-4">
            <GoogleAdsense slot="banner" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Hoe bepaalt de fiscus uw classificatie?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                De Belgische belastingdienst (FOD Financiën) beoordeelt elke situatie individueel 
                op basis van meerdere criteria. Er is geen vaste regel, maar de volgende factoren 
                worden meegewogen:
              </p>
              
              <h3>Criteria voor "Goede Huisvader" (belastingvrij):</h3>
              <ul>
                <li>Lange houdperiode (meerdere maanden tot jaren)</li>
                <li>Beperkt aantal transacties</li>
                <li>Investering past binnen normaal vermogensbeheer</li>
                <li>Geen gebruik van geavanceerde technieken (leverage, margin)</li>
                <li>Geen professionele kennis of achtergrond in trading</li>
              </ul>
              
              <h3>Criteria voor speculatieve winsten (33%):</h3>
              <ul>
                <li>Korte houdperiode (dagen tot weken)</li>
                <li>Regelmatige aan- en verkopen</li>
                <li>Gebruik van technische analyse</li>
                <li>Significant deel van vermogen in crypto</li>
              </ul>

              <h3>Criteria voor professionele activiteit (progressief tarief):</h3>
              <ul>
                <li>Dagelijkse trading als hoofdactiviteit</li>
                <li>Systematische aanpak met winstoogmerk</li>
                <li>Gebruik van professionele tools en strategieën</li>
                <li>Aanzienlijke tijdsbesteding</li>
              </ul>
              
              <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Belangrijk:
                </h4>
                <p className="text-sm">
                  De fiscus kan achteraf uw classificatie aanpassen. Bewaar altijd alle transactiebewijzen 
                  en documenteer uw beleggingsstrategie. Bij twijfel, consulteer een erkend belastingadviseur.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Tips voor belastingoptimalisatie
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <ol>
                <li>
                  <strong>Documenteer uw strategie:</strong> Schrijf op dat u voor de lange termijn 
                  belegt en houd dit bij in uw administratie.
                </li>
                <li>
                  <strong>Beperk transacties:</strong> Minder handelen versterkt uw positie als 
                  "goede huisvader".
                </li>
                <li>
                  <strong>Houd rekening met staking:</strong> Staking rewards zijn altijd belast 
                  aan 30%, ongeacht uw classificatie voor meerwaarden.
                </li>
                <li>
                  <strong>Wacht minimaal een jaar:</strong> Een langere houdperiode ondersteunt 
                  de claim dat u passief belegt.
                </li>
                <li>
                  <strong>Splits niet kunstmatig:</strong> Artificial splitting over meerdere 
                  jaren kan als belastingontduiking worden gezien.
                </li>
              </ol>
            </CardContent>
          </Card>

          {seoConfig && seoConfig.authorityLinks.length > 0 && (
            <AuthorityLinks links={seoConfig.authorityLinks} />
          )}

          <RelatedCalculators currentSlug="crypto-belasting-calculator" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
