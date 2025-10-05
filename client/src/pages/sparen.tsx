import { motion } from 'framer-motion';
import { AnimatedMeshBackground, GradientText, FloatingNumber, CalculatorCard } from '@/components/design';
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
    <div className="min-h-screen relative">
      <AnimatedMeshBackground variant="subtle" />
      
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

              <div className="flex flex-wrap justify-center gap-6 pt-4">
                <div className="text-center" data-testid="stat-tools">
                  <FloatingNumber value="11" suffix="+" className="text-5xl text-primary" />
                  <p className="text-sm text-muted-foreground mt-2">Spaartools</p>
                </div>
                <div className="text-center" data-testid="stat-rente">
                  <FloatingNumber value="3.5" suffix="%" className="text-5xl text-primary" />
                  <p className="text-sm text-muted-foreground mt-2">Tot 3,5% Rente</p>
                </div>
                <div className="text-center" data-testid="stat-gratis">
                  <FloatingNumber value="100" suffix="%" className="text-5xl text-primary" />
                  <p className="text-sm text-muted-foreground mt-2">Gratis</p>
                </div>
              </div>
            </motion.div>

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
