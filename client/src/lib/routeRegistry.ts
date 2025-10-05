import { calculatorSeoConfigs, calculatorsByCategory, type CalculatorSeoConfig, type SiloCategory } from '@/seo/calculatorSeoConfig';

export interface CalculatorRoute {
  slug: string;
  category: SiloCategory;
  seoConfig: CalculatorSeoConfig;
}

export function getCalculatorBySlug(slug: string): CalculatorRoute | null {
  const seoConfig = calculatorSeoConfigs[slug];
  if (!seoConfig) {
    return null;
  }

  return {
    slug: seoConfig.slug,
    category: seoConfig.category,
    seoConfig
  };
}

export function getCalculatorsByCategory(category: SiloCategory): CalculatorRoute[] {
  const slugs = calculatorsByCategory[category];
  if (!slugs) {
    return [];
  }

  return slugs
    .map(slug => getCalculatorBySlug(slug))
    .filter((route): route is CalculatorRoute => route !== null);
}

export function getNewRoutePath(slug: string): string {
  const route = getCalculatorBySlug(slug);
  if (!route) {
    return `/${slug}`;
  }

  if (route.category === "Overige") {
    return `/${slug}`;
  }

  const categoryPath = route.category.toLowerCase();
  return `/${categoryPath}/${slug}`;
}

export function getAllCalculators(): CalculatorRoute[] {
  return Object.keys(calculatorSeoConfigs)
    .map(slug => getCalculatorBySlug(slug))
    .filter((route): route is CalculatorRoute => route !== null);
}

export function getCalculatorsByCategories(): Record<SiloCategory, CalculatorRoute[]> {
  return {
    Sparen: getCalculatorsByCategory("Sparen"),
    Lenen: getCalculatorsByCategory("Lenen"),
    Beleggen: getCalculatorsByCategory("Beleggen"),
    Planning: getCalculatorsByCategory("Planning"),
    Overige: getCalculatorsByCategory("Overige")
  };
}
