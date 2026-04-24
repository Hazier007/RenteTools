import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import {
  calculatorsByCategory,
  calculatorSeoConfigs,
  type SiloCategory,
} from "@/seo/calculatorSeoConfig";

interface RelatedCalculatorsProps {
  currentSlug: string;
  category: SiloCategory;
}

export default function RelatedCalculators({
  currentSlug,
  category,
}: RelatedCalculatorsProps) {
  const categorySlugs = calculatorsByCategory[category] || [];

  const relatedSlugs = categorySlugs
    .filter((slug) => slug !== currentSlug)
    .slice(0, 4);

  if (relatedSlugs.length === 0) {
    return null;
  }

  const categoryPath = `/${category.toLowerCase()}`;

  return (
    <section className="mt-12 pt-8 border-t border-border/50">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        Gerelateerde tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedSlugs.map((slug) => {
          const seoConfig = calculatorSeoConfigs[slug];
          if (!seoConfig) return null;

          return (
            <Link
              key={slug}
              href={`${categoryPath}/${slug}`}
              className="group block p-4 rounded-lg border border-border/50 bg-card hover:bg-accent/30 hover:border-primary/30 transition-all duration-200"
            >
              <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                {seoConfig.breadcrumbTitle}
              </h3>
              <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                {seoConfig.metaDescription}
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-primary/70 mt-2 group-hover:text-primary transition-colors">
                Bekijk tool
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
