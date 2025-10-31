import { useEffect } from "react";

interface NewsArticleSchemaProps {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    authorName: string;
    publishDate: string;
    image: string;
    seoKeywords?: string[];
    updatedAt?: string;
  };
}

export default function NewsArticleSchema({ post }: NewsArticleSchemaProps) {
  useEffect(() => {
    // Calculate word count from content (strip HTML/markdown and count words)
    const plainText = post.content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '');
    const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;

    const newsArticleSchema = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": post.title.substring(0, 110),
      "image": [post.image],
      "datePublished": new Date(post.publishDate).toISOString(),
      "dateModified": post.updatedAt 
        ? new Date(post.updatedAt).toISOString() 
        : new Date(post.publishDate).toISOString(),
      "author": {
        "@type": "Person",
        "name": post.authorName
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
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://interesten.be/blog/${post.slug}`
      },
      "description": post.excerpt,
      "keywords": post.seoKeywords?.join(', '),
      "articleSection": post.category,
      "wordCount": wordCount,
      "inLanguage": "nl-BE"
    };
    
    const scriptId = `news-article-schema-${post.slug}`;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(newsArticleSchema);
    script.id = scriptId;
    document.head.appendChild(script);
    
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [post]);

  return null;
}
