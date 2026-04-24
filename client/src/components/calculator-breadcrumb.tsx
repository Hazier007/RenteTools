import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface CalculatorBreadcrumbProps {
  category: string;
  categoryPath: string;
  currentTitle: string;
}

export default function CalculatorBreadcrumb({
  category,
  categoryPath,
  currentTitle,
}: CalculatorBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center flex-wrap gap-1 text-sm text-muted-foreground">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="w-3.5 h-3.5 mx-1 text-muted-foreground/50" />
          <Link
            href={categoryPath}
            className="hover:text-primary transition-colors"
          >
            {category}
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="w-3.5 h-3.5 mx-1 text-muted-foreground/50" />
          <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
            {currentTitle}
          </span>
        </li>
      </ol>
    </nav>
  );
}
