import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { Link } from "wouter";
import { SiloCategory } from "@/seo/calculatorSeoConfig";

interface PageBreadcrumbProps {
  category: SiloCategory;
  pageTitle: string;
}

const categoryUrls: Record<SiloCategory, string> = {
  "Sparen": "/hoogste-spaarrente-belgie",
  "Lenen": "/hypothecaire-lening-berekenen",
  "Beleggen": "/beleggingsrente-calculator",
  "Planning": "/pensioensparen-calculator"
};

export default function PageBreadcrumb({ category, pageTitle }: PageBreadcrumbProps) {
  return (
    <Breadcrumb className="mb-4" data-testid="breadcrumb-navigation">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" data-testid="breadcrumb-home">
              <Home className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={categoryUrls[category]} data-testid="breadcrumb-category">
              {category}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage data-testid="breadcrumb-page">{pageTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
