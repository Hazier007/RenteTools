import { useEffect } from "react";

interface ArticleSchemaProps {
  headline: string;
  description: string;
  author: {
    name: string;
    bio: string;
  };
  publishDate: string;
  image: string;
  category: string;
}

export default function ArticleSchema({ headline, description, author, publishDate, image, category }: ArticleSchemaProps) {
  useEffect(() => {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": headline,
      "description": description,
      "image": image,
      "datePublished": publishDate,
      "dateModified": publishDate,
      "author": {
        "@type": "Person",
        "name": author.name,
        "description": author.bio
      },
      "publisher": {
        "@type": "Organization",
        "name": "Interesten.be",
        "logo": {
          "@type": "ImageObject",
          "url": "https://interesten.be/logo-new.png",
          "width": "200",
          "height": "90"
        }
      },
      "articleSection": category,
      "inLanguage": "nl-BE"
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(articleSchema);
    script.id = `article-schema-${headline.replace(/\s+/g, '-').toLowerCase()}`;
    document.head.appendChild(script);
    
    return () => {
      const existingScript = document.getElementById(script.id);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [headline, description, author, publishDate, image, category]);

  return null;
}
