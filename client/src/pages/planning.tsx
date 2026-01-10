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

export default function PlanningPage() {
  const calculators = getCalculatorsByCategory("Planning");
  const seoConfig = getSeoConfig("planning");

  useSeoTags("planning");

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
                Financiële Planning Tools
              </GradientText>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-description">
                Plan uw pensioen, budget en financiële toekomst. FIRE calculator, noodfonds en belastingplanning.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4">
                <GlassCard className="p-6" data-testid="stat-tools">
                  <FloatingNumber value={12} suffix="+" className="text-4xl md:text-5xl block mb-2" />
                  <p className="text-sm text-muted-foreground">Planning Tools</p>
                </GlassCard>
                <GlassCard className="p-6" data-testid="stat-fire">
                  <span className="text-4xl md:text-5xl font-bold text-primary block mb-2" data-testid="floating-number">🔥</span>
                  <p className="text-sm text-muted-foreground">FIRE Ondersteuning</p>
                </GlassCard>
                <GlassCard className="p-6" data-testid="stat-belasting">
                  <span className="text-4xl md:text-5xl font-bold text-primary block mb-2" data-testid="floating-number">💡</span>
                  <p className="text-sm text-muted-foreground">Belastingtips</p>
                </GlassCard>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold mb-4">Financiële planning in België: pensioen, FIRE & budget</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    België kent een <strong>pensioensysteem met 3 pijlers</strong>: wettelijk pensioen, aanvullend 
                    werkgeverspensioen en individueel pensioensparen (met tot 30% belastingvoordeel). Steeds meer 
                    Belgen streven naar financiële onafhankelijkheid via de FIRE-beweging (Financial Independence, 
                    Retire Early) met de bekende <strong>4%-regel</strong> als richtlijn.
                  </p>
                  <p>
                    <strong>Waarom onze planningtools gebruiken?</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Bereken uw pensioen en aanvullende spaarnoodzaak</li>
                    <li>Ontdek uw FIRE-getal en pad naar financiële vrijheid</li>
                    <li>Plan uw budget en bouw een noodfonds op</li>
                    <li>Houd rekening met inflatie en koopkrachtverlies</li>
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
