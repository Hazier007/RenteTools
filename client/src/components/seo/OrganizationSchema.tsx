import { useEffect } from "react";

export default function OrganizationSchema() {
  useEffect(() => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Interesten.be",
      "description": "Gratis financiële calculators voor sparen, lenen, beleggen en financiële planning in België",
      "url": "https://interesten.be",
      "logo": {
        "@type": "ImageObject",
        "url": "https://interesten.be/logo-new.png",
        "width": "200",
        "height": "90"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "BE",
        "addressRegion": "België",
        "addressLocality": "Brussels"
      },
      "areaServed": {
        "@type": "Country",
        "name": "België"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "availableLanguage": ["Dutch", "French"],
        "areaServed": "BE"
      },
      "sameAs": [
        "https://www.facebook.com/interesten.be",
        "https://twitter.com/interesten_be"
      ],
      "knowsAbout": [
        "Spaarrente calculators",
        "Hypotheek berekeningen",
        "Beleggingsrendement",
        "Financiële planning België"
      ],
      "offers": {
        "@type": "Offer",
        "description": "Gratis financiële calculators en tools voor Belgische consumenten",
        "price": "0",
        "priceCurrency": "EUR"
      }
    };
    
    const scriptId = 'organization-schema-interesten';
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(organizationSchema);
    script.id = scriptId;
    document.head.appendChild(script);
    
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return null;
}
