import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { AnimatedMeshBackground, GradientText, GlassCard } from '@/components/design';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useSeoTags } from '@/hooks/use-seo-tags';
import { staggerChildren, fadeInUp } from '@/lib/animations';
import { FileText, Shield, ScrollText, Map } from 'lucide-react';

export default function OverigePage() {
  const [, setLocation] = useLocation();

  useSeoTags("overige");

  const infoPages = [
    {
      title: "Over Ons",
      description: "Lees meer over Interesten.be en onze missie om financiële educatie toegankelijk te maken.",
      slug: "over-ons",
      icon: FileText
    },
    {
      title: "Privacy Beleid",
      description: "Ontdek hoe we uw privacy beschermen en welke gegevens we verzamelen.",
      slug: "privacy",
      icon: Shield
    },
    {
      title: "Gebruiksvoorwaarden",
      description: "Lees de algemene voorwaarden voor het gebruik van onze calculators en tools.",
      slug: "voorwaarden",
      icon: ScrollText
    },
    {
      title: "Sitemap",
      description: "Overzicht van alle pagina's en calculators op Interesten.be.",
      slug: "sitemap",
      icon: Map
    }
  ];

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
                Informatie & Support
              </GradientText>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-description">
                Meer informatie over Interesten.be, privacy beleid en gebruiksvoorwaarden.
              </p>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
              data-testid="grid-info-pages"
            >
              {infoPages.map((page) => {
                const IconComponent = page.icon;
                return (
                  <motion.div
                    key={page.slug}
                    variants={fadeInUp}
                    className="cursor-pointer"
                    onClick={() => setLocation(`/${page.slug}`)}
                    data-testid={`link-${page.slug}`}
                  >
                    <GlassCard hover tilt>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-primary/10">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <GradientText as="h3" className="text-2xl font-bold">
                            {page.title}
                          </GradientText>
                        </div>
                        
                        <p className="text-muted-foreground">
                          {page.description}
                        </p>

                        <div className="flex items-center justify-end pt-2 border-t border-white/10 dark:border-white/5">
                          <span className="text-sm text-primary flex items-center gap-2">
                            Lees meer
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
