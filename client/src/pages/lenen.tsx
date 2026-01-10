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

export default function LenenPage() {
  const calculators = getCalculatorsByCategory("Lenen");
  const seoConfig = getSeoConfig("lenen");

  useSeoTags("lenen");

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
                Lening Calculators België
              </GradientText>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-description">
                Bereken uw hypotheek, autolening of persoonlijke lening. Vergelijk rentes en vind de beste kredietvoorwaarden.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4">
                <GlassCard className="p-6" data-testid="stat-tools">
                  <FloatingNumber value={15} suffix="+" className="text-4xl md:text-5xl block mb-2" />
                  <p className="text-sm text-muted-foreground">Leentools</p>
                </GlassCard>
                <GlassCard className="p-6" data-testid="stat-rente">
                  <FloatingNumber value={2.5} suffix="%" className="text-4xl md:text-5xl block mb-2" />
                  <p className="text-sm text-muted-foreground">Vanaf 2,5% Rente</p>
                </GlassCard>
                <GlassCard className="p-6" data-testid="stat-resultaat">
                  <span className="text-4xl md:text-5xl font-bold text-primary block mb-2" data-testid="floating-number">⚡</span>
                  <p className="text-sm text-muted-foreground">Direct Resultaat</p>
                </GlassCard>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold mb-4">Lenen in België: hypotheek, autolening & meer</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    De Belgische kredietmarkt biedt diverse opties: van hypothecaire leningen met <strong>LTV tot 90%</strong> tot 
                    persoonlijke leningen en autoleningen. De vuistregel is dat uw maandlast niet hoger mag zijn dan 
                    <strong> 33% van uw netto-inkomen</strong>. Vergeet ook de bijkomende kosten niet: registratierechten, 
                    notariskosten en verzekeringen.
                  </p>
                  <p>
                    <strong>Waarom onze leentools gebruiken?</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Vergelijk actuele hypotheekrentes van Belgische banken</li>
                    <li>Bereken uw maximale leencapaciteit en maandlasten</li>
                    <li>Ontdek of herfinancieren voordeliger is</li>
                    <li>Simuleer autoleningen, persoonlijke leningen en doorlopend krediet</li>
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
