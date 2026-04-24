import { Suspense } from 'react';
import { useParams, useLocation } from 'wouter';
import { getCalculatorBySlug } from '@/lib/routeRegistry';
import { getCalculatorComponent } from '@/lib/calculatorComponentRegistry';
import CalculatorBreadcrumb from '@/components/calculator-breadcrumb';
import RelatedCalculators from '@/components/related-calculators';
import NotFound from '@/pages/not-found';

export default function DynamicCalculatorPage() {
  const params = useParams();
  const [location] = useLocation();
  const slug = params.slug as string;

  const calculatorRoute = getCalculatorBySlug(slug);

  if (!calculatorRoute) {
    return <NotFound />;
  }

  const CalculatorComponent = getCalculatorComponent(slug);

  if (!CalculatorComponent) {
    return <NotFound />;
  }

  const categoryPath = `/${calculatorRoute.category.toLowerCase()}`;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <CalculatorBreadcrumb
          category={calculatorRoute.category}
          categoryPath={categoryPath}
          currentTitle={calculatorRoute.seoConfig.breadcrumbTitle}
        />
      </div>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-4 text-muted-foreground">Calculator laden...</p>
          </div>
        </div>
      }>
        <CalculatorComponent />
      </Suspense>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <RelatedCalculators
          currentSlug={slug}
          category={calculatorRoute.category}
        />
      </div>
    </>
  );
}
