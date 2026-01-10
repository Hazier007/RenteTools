import { Link } from "wouter";
import { getSeoConfig, calculatorsByCategory, type SiloCategory } from "@/seo/calculatorSeoConfig";
import { getNewRoutePath } from "@/lib/routeRegistry";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calculator } from "lucide-react";

interface RelatedCalculatorsProps {
  currentSlug: string;
  maxItems?: number;
}

export default function RelatedCalculators({ currentSlug, maxItems = 4 }: RelatedCalculatorsProps) {
  const currentConfig = getSeoConfig(currentSlug);
  if (!currentConfig) return null;

  const category = currentConfig.category as SiloCategory;
  if (category === "Overige") return null;

  const categoryCalculators = calculatorsByCategory[category] || [];
  
  const relatedSlugs = categoryCalculators
    .filter(slug => slug !== currentSlug)
    .slice(0, maxItems);

  if (relatedSlugs.length === 0) return null;

  const relatedCalculators = relatedSlugs
    .map(slug => {
      const config = getSeoConfig(slug);
      if (!config) return null;
      return {
        slug,
        title: config.breadcrumbTitle || config.pageTitle,
        path: getNewRoutePath(slug)
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (relatedCalculators.length === 0) return null;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Gerelateerde tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-3">
          {relatedCalculators.map((calc) => (
            <Link
              key={calc.slug}
              href={calc.path}
              className="group flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary hover:bg-accent transition-colors"
            >
              <span className="font-medium text-sm group-hover:text-primary transition-colors">
                {calc.title}
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
