import { motion } from "framer-motion";
import { Link } from "wouter";
import { TrendingUp, Scale, CheckCircle } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useSeoTags } from "@/hooks/use-seo-tags";
import { getCalculatorsByCategory, getCalculatorBySlug, getNewRoutePath } from "@/lib/routeRegistry";
import { 
  AnimatedMeshBackground, 
  GlassCard, 
  GradientText, 
  FloatingNumber, 
  CalculatorCard 
} from "@/components/design";
import { staggerChildren, fadeInUp } from "@/lib/animations";

export default function Home() {
  useSeoTags("home");

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const topCalculators = {
    sparen: [
      "hoogste-spaarrente-belgie",
      "deposito-calculator",
      "samengestelde-interest-berekenen"
    ].map(slug => getCalculatorBySlug(slug)).filter((calc): calc is NonNullable<typeof calc> => calc !== null),
    
    lenen: [
      "hypothecaire-lening-berekenen",
      "persoonlijke-lening-berekenen",
      "autolening-berekenen"
    ].map(slug => getCalculatorBySlug(slug)).filter((calc): calc is NonNullable<typeof calc> => calc !== null),
    
    beleggen: [
      "etf-calculator",
      "aandelen-calculator",
      "portfolio-diversificatie-calculator"
    ].map(slug => getCalculatorBySlug(slug)).filter((calc): calc is NonNullable<typeof calc> => calc !== null),
    
    planning: [
      "pensioensparen-calculator",
      "fire-calculator",
      "budget-planner"
    ].map(slug => getCalculatorBySlug(slug)).filter((calc): calc is NonNullable<typeof calc> => calc !== null)
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatedMeshBackground variant="hero" />
      <Header />

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center py-32 px-4"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        data-testid="hero-section"
      >
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <motion.div variants={fadeInUp} className="space-y-6">
            <GradientText as="h1" className="text-4xl md:text-6xl lg:text-7xl">
              Interesten.be - 57+ Financiële Calculators
            </GradientText>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto" data-testid="hero-subtitle">
              Bereken spaarrente, leningen en beleggingen. Gratis, snel en betrouwbaar.
            </p>
          </motion.div>

          {/* Floating Stats */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
            variants={fadeInUp}
            data-testid="stats-grid"
          >
            <GlassCard className="p-6">
              <FloatingNumber value={57} suffix="+ Tools" className="text-4xl md:text-5xl block mb-2" />
              <p className="text-sm text-muted-foreground">Financiële calculators</p>
            </GlassCard>
            <GlassCard className="p-6">
              <FloatingNumber value={100} suffix="% Gratis" className="text-4xl md:text-5xl block mb-2" />
              <p className="text-sm text-muted-foreground">Altijd toegankelijk</p>
            </GlassCard>
            <GlassCard className="p-6">
              <FloatingNumber value={10} suffix="K+ Gebruikers" className="text-4xl md:text-5xl block mb-2" />
              <p className="text-sm text-muted-foreground">Vertrouwen ons</p>
            </GlassCard>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
            data-testid="cta-buttons"
          >
            <Button 
              size="lg" 
              onClick={() => scrollToSection("sparen-section")}
              data-testid="button-ontdek-tools"
              className="text-lg px-8"
            >
              Ontdek Tools
            </Button>
            <Link href="/over-ons">
              <Button 
                variant="outline" 
                size="lg"
                data-testid="button-over-ons"
                className="text-lg px-8 w-full sm:w-auto"
              >
                Over Ons
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* USP Section */}
      <section className="py-20 px-4 relative" data-testid="usp-section">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <GlassCard hover className="p-8 h-full">
                <TrendingUp className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Actuele Bankrentes</h3>
                <p className="text-muted-foreground">
                  Real-time updates van Belgische banken en actuele tarieven
                </p>
              </GlassCard>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <GlassCard hover className="p-8 h-full">
                <Scale className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Belgische Fiscaliteit</h3>
                <p className="text-muted-foreground">
                  Roerende voorheffing & belastingregels specifiek voor België
                </p>
              </GlassCard>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <GlassCard hover className="p-8 h-full">
                <CheckCircle className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">100% Gratis</h3>
                <p className="text-muted-foreground">
                  Geen verborgen kosten, altijd toegankelijk voor iedereen
                </p>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sparen Section */}
      <section 
        id="sparen-section" 
        className="py-20 px-4 relative scroll-mt-20" 
        data-testid="silo-section-sparen"
        data-category="sparen"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <GradientText as="h2" className="text-3xl md:text-5xl mb-4">
              Spaarrekeningen
            </GradientText>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vergelijk spaarrentes, deposito's en ontdek de kracht van samengestelde interest
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            {topCalculators.sparen.map((calc) => (
              <Link key={calc.slug} href={getNewRoutePath(calc.slug)}>
                <CalculatorCard
                  title={calc.seoConfig.pageTitle}
                  description={calc.seoConfig.metaDescription}
                  slug={calc.slug}
                  category={calc.category}
                  previewImage={calc.seoConfig.previewImage}
                />
              </Link>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/sparen">
              <Button variant="outline" size="lg" data-testid="button-view-all-sparen">
                Bekijk alle Spaartools →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lenen Section */}
      <section 
        id="lenen-section" 
        className="py-20 px-4 bg-muted/30 relative scroll-mt-20" 
        data-testid="silo-section-lenen"
        data-category="lenen"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <GradientText as="h2" className="text-3xl md:text-5xl mb-4">
              Leningen
            </GradientText>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bereken hypotheken, persoonlijke leningen en autoleningen met actuele tarieven
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            {topCalculators.lenen.map((calc) => (
              <Link key={calc.slug} href={getNewRoutePath(calc.slug)}>
                <CalculatorCard
                  title={calc.seoConfig.pageTitle}
                  description={calc.seoConfig.metaDescription}
                  slug={calc.slug}
                  category={calc.category}
                  previewImage={calc.seoConfig.previewImage}
                />
              </Link>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/lenen">
              <Button variant="outline" size="lg" data-testid="button-view-all-lenen">
                Bekijk alle Leentools →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Beleggen Section */}
      <section 
        id="beleggen-section" 
        className="py-20 px-4 relative scroll-mt-20" 
        data-testid="silo-section-beleggen"
        data-category="beleggen"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <GradientText as="h2" className="text-3xl md:text-5xl mb-4">
              Beleggen
            </GradientText>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Optimaliseer uw portfolio met ETF's, aandelen en diversificatie strategieën
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            {topCalculators.beleggen.map((calc) => (
              <Link key={calc.slug} href={getNewRoutePath(calc.slug)}>
                <CalculatorCard
                  title={calc.seoConfig.pageTitle}
                  description={calc.seoConfig.metaDescription}
                  slug={calc.slug}
                  category={calc.category}
                  previewImage={calc.seoConfig.previewImage}
                />
              </Link>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/beleggen">
              <Button variant="outline" size="lg" data-testid="button-view-all-beleggen">
                Bekijk alle Beleggingstools →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Planning Section */}
      <section 
        id="planning-section" 
        className="py-20 px-4 bg-muted/30 relative scroll-mt-20" 
        data-testid="silo-section-planning"
        data-category="planning"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <GradientText as="h2" className="text-3xl md:text-5xl mb-4">
              Financiële Planning
            </GradientText>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Plan uw pensioen, FIRE strategie en budget met geavanceerde tools
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            {topCalculators.planning.map((calc) => (
              <Link key={calc.slug} href={getNewRoutePath(calc.slug)}>
                <CalculatorCard
                  title={calc.seoConfig.pageTitle}
                  description={calc.seoConfig.metaDescription}
                  slug={calc.slug}
                  category={calc.category}
                  previewImage={calc.seoConfig.previewImage}
                />
              </Link>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/planning">
              <Button variant="outline" size="lg" data-testid="button-view-all-planning">
                Bekijk alle Planningtools →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
