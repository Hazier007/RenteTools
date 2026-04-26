import { useEffect } from "react";

interface FinancialProductSchemaProps {
  name: string;
  description: string;
  url: string;
  provider: string;
  category: "SavingsAccount" | "LoanOrCredit" | "InvestmentFund" | "DepositAccount";
  interestRate?: number;
  currency?: string;
}

export default function FinancialProductSchema({
  name,
  description,
  url,
  provider,
  category,
  interestRate,
  currency = "EUR"
}: FinancialProductSchemaProps) {
  useEffect(() => {
    const schema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      "name": name,
      "description": description,
      "url": url,
      "provider": {
        "@type": "FinancialService",
        "name": provider,
        "url": "https://interesten.be"
      },
      "category": category,
      "feesAndCommissionsSpecification": "Gratis - geen kosten verbonden aan het gebruik van deze calculator",
      "areaServed": {
        "@type": "Country",
        "name": "BE"
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceType": "Online calculator",
        "serviceUrl": url,
        "availableLanguage": {
          "@type": "Language",
          "name": "Dutch",
          "alternateName": "nl"
        }
      }
    };

    if (interestRate !== undefined) {
      schema["interestRate"] = {
        "@type": "QuantitativeValue",
        "value": interestRate,
        "unitText": "PERCENT"
      };
    }

    if (currency) {
      schema["currency"] = currency;
    }

    const scriptId = `financial-product-schema-${name.replace(/\s+/g, '-').toLowerCase()}`;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = scriptId;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [name, description, url, provider, category, interestRate, currency]);

  return null;
}
