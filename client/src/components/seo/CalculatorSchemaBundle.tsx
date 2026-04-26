import { useEffect } from "react";
import type { CalculatorSeoConfig, SiloCategory } from "@/seo/calculatorSeoConfig";

interface CalculatorSchemaBundleProps {
  seoConfig: CalculatorSeoConfig;
  category: SiloCategory;
}

/**
 * Comprehensive schema.org bundle for calculator pages.
 * Injects: FAQPage + WebApplication + HowTo schemas automatically.
 * Use this on any calculator page for maximum rich snippet coverage.
 */
export default function CalculatorSchemaBundle({ seoConfig, category }: CalculatorSchemaBundleProps) {
  useEffect(() => {
    const schemas: object[] = [];
    const categoryPath = category.toLowerCase();
    const url = `https://interesten.be/${categoryPath}/${seoConfig.slug}`;

    // 1. FAQPage schema (if FAQs exist)
    if (seoConfig.faqs && seoConfig.faqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": seoConfig.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      });
    }

    // 2. WebApplication schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": seoConfig.pageTitle || seoConfig.breadcrumbTitle,
      "description": seoConfig.metaDescription,
      "url": url,
      "applicationCategory": "FinanceApplication",
      "applicationSubCategory": getCategorySubType(category),
      "operatingSystem": "Web Browser",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      },
      "inLanguage": "nl-BE",
      "isAccessibleForFree": true,
      "provider": {
        "@type": "Organization",
        "name": "Interesten.be",
        "url": "https://interesten.be"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Belgische consumenten",
        "geographicArea": {
          "@type": "Country",
          "name": "BE"
        }
      }
    });

    // 3. HowTo schema (generic for calculator usage)
    schemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `Hoe gebruik je de ${seoConfig.breadcrumbTitle}`,
      "description": `Stap-voor-stap uitleg om de ${seoConfig.breadcrumbTitle} te gebruiken op Interesten.be`,
      "totalTime": "PT2M",
      "step": getHowToSteps(seoConfig.breadcrumbTitle, category)
    });

    // 4. BreadcrumbList schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://interesten.be/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": category,
          "item": `https://interesten.be/${categoryPath}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": seoConfig.breadcrumbTitle,
          "item": url
        }
      ]
    });

    // Inject all schemas
    const scriptId = `calculator-schema-bundle-${seoConfig.slug}`;
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      document.head.removeChild(existingScript);
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemas);
    script.id = scriptId;
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) {
        document.head.removeChild(el);
      }
    };
  }, [seoConfig, category]);

  return null;
}

function getCategorySubType(category: SiloCategory): string {
  switch (category) {
    case "Sparen": return "Savings Calculator";
    case "Lenen": return "Loan Calculator";
    case "Beleggen": return "Investment Calculator";
    case "Planning": return "Financial Planning Tool";
    default: return "Finance Calculator";
  }
}

function getHowToSteps(toolName: string, category: SiloCategory): object[] {
  const baseSteps = [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Ga naar de calculator",
      "text": `Open de ${toolName} op Interesten.be`
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Vul uw gegevens in",
      "text": getInputStepText(category)
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Bekijk het resultaat",
      "text": "De calculator toont direct uw resultaat met een gedetailleerde uitsplitsing en eventuele grafiek."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Vergelijk scenario's",
      "text": "Pas de waarden aan om verschillende scenario's te vergelijken en de beste optie te vinden."
    }
  ];

  return baseSteps;
}

function getInputStepText(category: SiloCategory): string {
  switch (category) {
    case "Sparen":
      return "Voer uw startbedrag, maandelijkse storting, rentevoet en looptijd in.";
    case "Lenen":
      return "Vul het gewenste leningsbedrag, rentevoet, looptijd en eventuele extra kosten in.";
    case "Beleggen":
      return "Voer uw beleggingsbedrag, verwacht rendement, beleggingshorizon en kosten in.";
    case "Planning":
      return "Vul uw huidige financiële situatie, doelbedrag en tijdshorizon in.";
    default:
      return "Voer de gevraagde financiële gegevens in de calculator in.";
  }
}
