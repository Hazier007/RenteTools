import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";
import { getCalculatorsByCategory } from "@/lib/routeRegistry";
import logoUrl from "../../assets/logo-new.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const categories = [
    { name: "Sparen", path: "/sparen", icon: "fas fa-piggy-bank" },
    { name: "Lenen", path: "/lenen", icon: "fas fa-credit-card" },
    { name: "Beleggen", path: "/beleggen", icon: "fas fa-chart-line" },
    { name: "Planning", path: "/planning", icon: "fas fa-calculator" }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity" data-testid="logo-link">
            <img src={logoUrl} alt="Interesten.be" className="w-[200px] h-[90px]" />
          </Link>
          
          <nav className="hidden md:flex space-x-1">
            {categories.map((category) => (
              <div 
                key={category.path}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(category.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href={category.path}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 transition-all duration-200"
                  data-testid={`nav-${category.name.toLowerCase()}`}
                >
                  <i className={`${category.icon} text-sm`}></i>
                  {category.name}
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </Link>

                {activeDropdown === category.name && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-72 bg-background backdrop-blur-xl border border-border/50 rounded-lg shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                    data-testid={`dropdown-${category.name.toLowerCase()}`}
                  >
                    <div className="space-y-1 max-h-96 overflow-y-auto scrollbar-hide">
                      {getCalculatorsByCategory(category.name as any).slice(0, 6).map((calc) => (
                        <Link
                          key={calc.slug}
                          href={`${category.path}/${calc.slug}`}
                          className="block px-3 py-2 rounded-md hover:bg-accent/50 transition-colors"
                          data-testid={`dropdown-item-${calc.slug}`}
                        >
                          <div className="font-medium text-sm text-foreground">
                            {calc.seoConfig.breadcrumbTitle}
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                            {calc.seoConfig.metaDescription}
                          </div>
                        </Link>
                      ))}
                      <Link
                        href={category.path}
                        className="block px-3 py-2 mt-1 text-sm font-medium text-primary hover:bg-accent/50 rounded-md transition-colors border-t border-border/50"
                        data-testid={`view-all-${category.name.toLowerCase()}`}
                      >
                        Bekijk alle {category.name.toLowerCase()} tools →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link 
              href="/blog"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 transition-all duration-200"
              data-testid="nav-blog"
            >
              <i className="fas fa-newspaper text-sm"></i>
              Blog
            </Link>
          </nav>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-background backdrop-blur-xl border-t border-border/50">
          <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
            {categories.map((category) => (
              <div key={category.path} className="space-y-1">
                <Link
                  href={category.path}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-nav-${category.name.toLowerCase()}`}
                >
                  <i className={`${category.icon} text-sm`}></i>
                  {category.name}
                </Link>
                <div className="pl-6 space-y-1 pb-2">
                  {getCalculatorsByCategory(category.name as any).slice(0, 4).map((calc) => (
                    <Link
                      key={calc.slug}
                      href={`${category.path}/${calc.slug}`}
                      className="block px-3 py-1.5 text-sm text-muted-foreground hover:text-primary hover:bg-accent/30 rounded transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`mobile-dropdown-item-${calc.slug}`}
                    >
                      {calc.seoConfig.breadcrumbTitle}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
