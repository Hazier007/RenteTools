import { motion } from 'framer-motion';
import { AnimatedMeshBackground, GlassCard, GradientText, FloatingNumber, CalculatorCard } from '@/components/design';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AuthorityLinks from '@/components/seo/AuthorityLinks';
import FaqSchema from '@/components/seo/FaqSchema';
import { useSeoTags } from '@/hooks/use-seo-tags';
import { getCalculatorsByCategory } from '@/lib/routeRegistry';
import { getSeoConfig } from '@/seo/calculatorSeoConfig';
import { staggerChildren, fadeInUp } from '@/lib/animations';

export default function SparenPage() {
  const calculators = getCalculatorsByCategory("Sparen");
  const seoConfig = getSeoConfig("sparen");

  useSeoTags("sparen");

  return (
    <div className="min-h-screen bg-background">
      <AnimatedMeshBackground variant="hero" />
      
      <div className="relative z-10">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center space-y-6">
              <GradientText as="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold" data-testid="heading-main">
                Spaarrekening Calculators België
              </GradientText>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-description">
                Vergelijk de beste spaarrekeningen, deposito's en termijnrekeningen in België. Bereken uw rendement met onze gratis tools.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4">
                <GlassCard className="p-6" data-testid="stat-tools">
                  <FloatingNumber value={11} suffix="+" className="text-4xl md:text-5xl block mb-2" />
                  <p className="text-sm text-muted-foreground">Spaartools</p>
                </GlassCard>
                <GlassCard className="p-6" data-testid="stat-rente">
                  <FloatingNumber value={3.5} suffix="%" className="text-4xl md:text-5xl block mb-2" />
                  <p className="text-sm text-muted-foreground">Tot 3,5% Rente</p>
                </GlassCard>
                <GlassCard className="p-6" data-testid="stat-gratis">
                  <FloatingNumber value={100} suffix="%" className="text-4xl md:text-5xl block mb-2" />
                  <p className="text-sm text-muted-foreground">Gratis</p>
                </GlassCard>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold mb-4">Slim sparen in België: alles wat je moet weten</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    België kent een uniek spaarsysteem met basisrente én getrouwheidspremie. De hoogste gecombineerde 
                    rentes liggen momenteel rond <strong>2,5% tot 2,85%</strong>, maar voorwaarden verschillen sterk per bank. 
                    Onze spaartools helpen je de beste keuze maken.
                  </p>
                  <p>
                    <strong>Waarom sparen via onze tools?</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Vergelijk actuele rentes van alle Belgische banken</li>
                    <li>Bereken je netto-opbrengst inclusief roerende voorheffing</li>
                    <li>Ontdek termijnrekeningen en kasbons als alternatief</li>
                    <li>Plan doelgericht sparen voor auto, vakantie of noodfonds</li>
                  </ul>
                </div>
              </GlassCard>
            </motion.div>

            {seoConfig && seoConfig.faqs.length > 0 && (
              <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Veelgestelde vragen</h2>
                <div className="space-y-4">
                  {seoConfig.faqs.map((faq, index) => (
                    <GlassCard key={index} className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </GlassCard>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-testid="grid-calculators"
            >
              {calculators.map((calc) => (
                <CalculatorCard
                  key={calc.slug}
                  title={calc.seoConfig.pageTitle}
                  description={calc.seoConfig.metaDescription}
                  slug={calc.slug}
                  category={calc.category}
                  previewImage={calc.seoConfig.previewImage}
                />
              ))}
            </motion.div>

            {seoConfig && seoConfig.authorityLinks.length > 0 && (
              <motion.div variants={fadeInUp}>
                <AuthorityLinks links={seoConfig.authorityLinks} />
              </motion.div>
            )}
          </motion.div>
        </div>

        <Footer />
      </div>

      {seoConfig && seoConfig.faqs.length > 0 && (
        <FaqSchema faqs={seoConfig.faqs} />
      )}
    </div>
  );
}
