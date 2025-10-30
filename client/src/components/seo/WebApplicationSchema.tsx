import { useEffect } from "react";

interface WebApplicationSchemaProps {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem?: string;
}

export default function WebApplicationSchema({ 
  name, 
  description, 
  url,
  applicationCategory,
  operatingSystem = "Any"
}: WebApplicationSchemaProps) {
  useEffect(() => {
    const webAppSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": name,
      "description": description,
      "url": url,
      "applicationCategory": applicationCategory,
      "operatingSystem": operatingSystem,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      },
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "inLanguage": "nl-BE",
      "isAccessibleForFree": true
    };
    
    const scriptId = `webapp-schema-${name.replace(/\s+/g, '-').toLowerCase()}`;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(webAppSchema);
    script.id = scriptId;
    document.head.appendChild(script);
    
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [name, description, url, applicationCategory, operatingSystem]);

  return null;
}
