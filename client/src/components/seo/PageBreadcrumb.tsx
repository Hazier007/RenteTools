import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { Link } from "wouter";
import { SiloCategory } from "@/seo/calculatorSeoConfig";

interface PageBreadcrumbProps {
  category: SiloCategory;
  pageTitle: string;
}

const categoryUrls: Record<SiloCategory, string> = {
  "Sparen": "/sparen",
  "Lenen": "/lenen",
  "Beleggen": "/beleggen",
  "Planning": "/planning",
  "Overige": "/"
};

export default function PageBreadcrumb({ category, pageTitle }: PageBreadcrumbProps) {
  return (
    // Staat in de hero (section.gradient-bg): lichte tekst op de donkere gradient.
    <Breadcrumb className="mb-4" data-testid="breadcrumb-navigation">
      <BreadcrumbList className="text-primary-foreground/80 [&_a:hover]:text-primary-foreground">
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
          <BreadcrumbPage className="text-primary-foreground" data-testid="breadcrumb-page">{pageTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
