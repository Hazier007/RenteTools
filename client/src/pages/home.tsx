import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Scale, Receipt, Trophy, Home as HomeIcon, TrendingUp, Shield, MapPin, Heart, ArrowRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  AnimatedMeshBackground,
  GlassCard,
  GradientText,
  FloatingNumber
} from "@/components/design";
import { staggerChildren, fadeInUp } from "@/lib/animations";
import heroBackgroundWebp from "@assets/hero-2026-lg.webp";
import heroBackgroundAvif from "@assets/hero-2026-lg.avif";
import { getActueleRentevoeten, formatPercent, B2B_FORFAIT_EUR } from "@shared/wettelijke-interest";
import { calculatorRegistry, type CalculatorCategory } from "@shared/calculator-registry";
import { homeContent } from "@/seo/calculator-content/home";

// Zelfde H1 als de server-side HTML (server/seo-config.ts, entry "home").
const HOME_H1 = "Interesten berekenen in België: wettelijke, nalatigheids- en spaarinteresten";
const HOME_TITLE = `Interesten Berekenen België ${new Date().getFullYear()}: Wettelijke Interest & Spaarrente`;
const HOME_DESCRIPTION = "Bereken wettelijke interest en nalatigheidsinterest op onbetaalde facturen (incl. €40 forfait), spaarrente en leningen. Gratis Belgische calculators.";
const wettelijkeActueel = getActueleRentevoeten();
const calculatorCategories: CalculatorCategory[] = ["Sparen", "Lenen", "Beleggen", "Planning"];

export default function Home() {
  useEffect(() => {
    document.title = HOME_TITLE;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", HOME_DESCRIPTION);
    } else {
      const el = document.createElement("meta");
      el.name = "description";
      el.content = HOME_DESCRIPTION;
      document.head.appendChild(el);
    }
  }, []);

  const featuredCalculators = [
    {
      slug: "wettelijke-rentevoet-belgie",
      icon: Scale,
      title: `Wettelijke Interest & Nalatigheidsinterest ${wettelijkeActueel.jaar}`,
      description: `Bereken de interest op een onbetaalde factuur of schuld: ${formatPercent(wettelijkeActueel.burgerlijk)} wettelijk, ${formatPercent(wettelijkeActueel.handelS1)} B2B (incl. €${B2B_FORFAIT_EUR} forfait), ${formatPercent(wettelijkeActueel.fiscaal)} fiscaal. Per jaar of semester, bron FOD Financiën.`,
      category: "lenen"
    },
    {
      slug: "hoogste-spaarrente-belgie",
      icon: Trophy,
      title: "Spaarrente Berekenen",
      description: "Bereken wat uw spaarrekening netto opbrengt: basisrente, getrouwheidspremie, de vrijstelling van €1.020 en 15% roerende voorheffing daarboven.",
      category: "sparen"
    },
    {
      slug: "hypothecaire-lening-berekenen",
      icon: HomeIcon,
      title: "Hypotheek Berekenen België",
      description: "Bereken uw maandlast, de totale interest en de aankoopkosten: registratierechten per gewest, notaris en hypothecaire inschrijving.",
      category: "lenen"
    },
    {
      slug: "samengestelde-interest-berekenen",
      icon: TrendingUp,
      title: "Samengestelde Interest Berekenen",
      description: "Zie hoe uw kapitaal groeit met rente op rente, en wat roerende voorheffing en inflatie daarvan afhalen.",
      category: "sparen"
    }
  ];

  const categories = [
    {
      title: "Sparen",
      href: "/sparen",
      items: ["Hoogste spaarrente", "Deposito & termijnrekening", "Samengestelde interest", "Kinderrekening & meer"]
    },
    {
      title: "Lenen",
      href: "/lenen",
      items: ["Wettelijke interest & nalatigheidsinterest", "Hypothecaire lening", "Persoonlijke & autolening", "Herfinancieren"]
    },
    {
      title: "Beleggen",
      href: "/beleggen",
      items: ["ETF & aandelen calculator", "Roerende voorheffing", "Portfolio diversificatie", "Crypto & obligaties"]
    },
    {
      title: "Financiële Planning",
      href: "/planning",
      items: ["Pensioensparen", "FIRE & budget planner", "Inflatie calculator", "Noodfonds & meer"]
    }
  ];

  const trustPoints = [
    {
      icon: TrendingUp,
      title: "Actueel & betrouwbaar",
      description: `Wettelijke interestvoeten en fiscaliteit bijgewerkt voor ${wettelijkeActueel.jaar}, met bronvermelding.`
    },
    {
      icon: Shield,
      title: "Volledig anoniem",
      description: "Geen account nodig, geen gegevens opgeslagen."
    },
    {
      icon: MapPin,
      title: "Specifiek voor België",
      description: "Roerende voorheffing, registratierechten, getrouwheidspremie – alles correct berekend."
    },
    {
      icon: Heart,
      title: "Gratis voor altijd",
      description: "Geen verborgen kosten of upsells."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AnimatedMeshBackground variant="hero" />
      <Header />

      {/* Hero Section with Background Image */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center py-24 px-4 overflow-hidden"
        data-testid="hero-section"
      >
        <picture>
          <source type="image/avif" srcSet={heroBackgroundAvif} />
          <source type="image/webp" srcSet={heroBackgroundWebp} />
          <img
            src={heroBackgroundWebp}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-[center_right] -z-10"
            {...({ fetchpriority: "high" } as Record<string, string>)}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="relative max-w-7xl mx-auto text-center space-y-10">
          <div className="space-y-6">
            <div className="inline-block bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl px-6 py-4 md:px-10 md:py-6 shadow-lg border border-white/20 dark:border-white/10">
              <GradientText as="h1" className="text-3xl md:text-5xl lg:text-6xl leading-tight">
                {HOME_H1}
              </GradientText>
              <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 max-w-3xl mx-auto mt-4" data-testid="hero-subtitle">
                <strong>Elke Belgische interest, correct berekend.</strong> Van de wettelijke interestvoet en de nalatigheidsinterest op een onbetaalde factuur tot uw spaarrente, roerende voorheffing of de maandlast van een lening. Gratis, anoniem en met vermelding van de officiële bronnen.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            data-testid="stats-grid"
          >
            <GlassCard className="p-4 md:p-6">
              <FloatingNumber value={70} suffix="+ Tools" className="text-2xl md:text-4xl block mb-1" />
              <p className="text-xs md:text-sm text-muted-foreground">Financiële calculators</p>
            </GlassCard>
            <GlassCard className="p-4 md:p-6">
              <FloatingNumber value={100} suffix="% Gratis" className="text-2xl md:text-4xl block mb-1" />
              <p className="text-xs md:text-sm text-muted-foreground">Altijd toegankelijk</p>
            </GlassCard>
            <GlassCard className="p-4 md:p-6">
              <FloatingNumber value={100} suffix="% Belgisch" className="text-2xl md:text-4xl block mb-1" />
              <p className="text-xs md:text-sm text-muted-foreground">Wetgeving &amp; fiscaliteit {new Date().getFullYear()}</p>
            </GlassCard>
            <GlassCard className="p-4 md:p-6">
              <FloatingNumber value={100} suffix="% Privacy" className="text-2xl md:text-4xl block mb-1" />
              <p className="text-xs md:text-sm text-muted-foreground">Geen registratie</p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Featured Calculators Section */}
      <section className="py-20 px-4 relative" data-testid="featured-calculators-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <GradientText as="h2" className="text-2xl md:text-4xl mb-4">
              Meest gebruikte calculators – start direct
            </GradientText>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            {featuredCalculators.map((calc) => {
              const IconComponent = calc.icon;
              return (
                <motion.div key={calc.slug} variants={fadeInUp}>
                  <Link href={`/${calc.category}/${calc.slug}`} data-testid={`link-featured-${calc.slug}`}>
                    <GlassCard hover tilt className="p-6 md:p-8 h-full cursor-pointer group" data-testid={`card-featured-${calc.slug}`}>
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                            {calc.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {calc.description}
                          </p>
                          <div className="flex items-center text-primary font-semibold group-hover:gap-3 transition-all">
                            <span>Direct berekenen</span>
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* B2B: onbetaalde facturen */}
      <section className="py-12 px-4 relative" data-testid="b2b-section">
        <div className="max-w-5xl mx-auto">
          <GlassCard className="p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="p-4 rounded-xl bg-primary/10 text-primary shrink-0 self-start">
                <Receipt className="w-10 h-10" />
              </div>
              <div className="flex-1 space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold">
                  Onbetaalde factuur? Bereken de nalatigheidsinterest en het €{B2B_FORFAIT_EUR}-forfait
                </h2>
                <p className="text-muted-foreground">
                  Betaalt een zakelijke klant te laat, dan mag u van rechtswege {formatPercent(wettelijkeActueel.handelS1)} interest
                  aanrekenen vanaf de dag na de vervaldag (1e semester {wettelijkeActueel.jaar}), plus €{B2B_FORFAIT_EUR} forfaitaire
                  schadevergoeding per factuur. Bereken het bedrag voor uw aanmaning in enkele seconden.
                </p>
                <p className="text-sm text-muted-foreground">
                  Blijft de factuur onbetaald?{" "}
                  <a href="https://collectpro.be" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                    CollectPro.be
                  </a>{" "}
                  neemt de minnelijke invordering voor kmo&apos;s over. Transparantie: CollectPro.be en Interesten.be hebben dezelfde oprichter.
                </p>
              </div>
              <Link href="/lenen/wettelijke-rentevoet-belgie">
                <Button size="lg" data-testid="button-b2b-nalatigheidsinterest">
                  Nalatigheidsinterest berekenen <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-muted/30 relative" data-testid="categories-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <GradientText as="h2" className="text-2xl md:text-4xl mb-4">
              Ontdek al onze categorieën
            </GradientText>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            {categories.map((category) => (
              <motion.div key={category.title} variants={fadeInUp}>
                <GlassCard hover className="p-6 h-full" data-testid={`card-category-${category.title.toLowerCase()}`}>
                  <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                  <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                    {category.items.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={category.href}>
                    <Button variant="outline" className="w-full group" data-testid={`button-view-${category.title.toLowerCase()}`}>
                      Bekijk alle {category.title.toLowerCase()}tools
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 relative" data-testid="trust-section">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <GradientText as="h2" className="text-2xl md:text-4xl mb-4">
              Waarom Belgen op Interesten.be rekenen
            </GradientText>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            {trustPoints.map((point, index) => {
              const IconComponent = point.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <GlassCard className="p-6 h-full text-center" data-testid={`card-trust-${index}`}>
                    <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold mb-2" data-testid={`text-trust-title-${index}`}>{point.title}</h3>
                    <p className="text-sm text-muted-foreground">{point.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Links */}
          <motion.div
            className="text-center mt-12 space-x-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/over-ons">
              <Button variant="outline" size="lg" data-testid="button-over-ons">
                Meer over ons <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="lg" data-testid="button-blog">
                Lees onze tips & nieuws <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Alle calculators: crawlbare lijst, ook in de server-side HTML */}
      <section className="py-16 px-4 bg-muted/30 relative" data-testid="all-calculators-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Alle calculators op Interesten.be</h2>
          <nav aria-label="Alle calculators" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {calculatorCategories.map((category) => (
              <div key={category}>
                <h3 className="font-bold mb-3">
                  <Link href={`/${category.toLowerCase()}`} className="hover:text-primary transition-colors">
                    {category}
                  </Link>
                </h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {calculatorRegistry
                    .filter((calc) => calc.category === category)
                    .map((calc) => (
                      <li key={calc.slug}>
                        <Link href={calc.url} className="hover:text-primary transition-colors">
                          {calc.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </section>

      {/* FAQ: dezelfde vragen als in server/seo-config.ts (homeContent) */}
      <section className="py-16 px-4 relative" data-testid="home-faq-section">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Veelgestelde vragen over interesten berekenen</h2>
          <div className="space-y-4">
            {homeContent.faqs.map((faq) => (
              <GlassCard key={faq.question} className="p-6">
                <h3 className="font-bold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
