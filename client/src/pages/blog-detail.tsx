import { useRoute } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { getBlogPost } from "@/data/blogPosts";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ArticleSchema from "@/components/seo/ArticleSchema";
import { useEffect } from "react";

function formatBlogContent(markdown: string): string {
  let html = markdown;
  
  html = html.replace(/### (.+)/g, '<h3>$1</h3>');
  html = html.replace(/## (.+)/g, '<h2>$1</h2>');
  html = html.replace(/# (.+)/g, '<h1>$1</h1>');
  
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  
  const lines = html.split('\n');
  let result = '';
  let inList = false;
  let inParagraph = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) {
      if (inParagraph) {
        result += '</p>';
        inParagraph = false;
      }
      if (inList) {
        result += '</ul>';
        inList = false;
      }
      continue;
    }
    
    if (line.startsWith('<h')) {
      if (inParagraph) {
        result += '</p>';
        inParagraph = false;
      }
      if (inList) {
        result += '</ul>';
        inList = false;
      }
      result += line;
    } else if (line.startsWith('- ')) {
      if (inParagraph) {
        result += '</p>';
        inParagraph = false;
      }
      if (!inList) {
        result += '<ul>';
        inList = true;
      }
      result += '<li>' + line.substring(2) + '</li>';
    } else {
      if (inList) {
        result += '</ul>';
        inList = false;
      }
      if (!inParagraph) {
        result += '<p>';
        inParagraph = true;
      } else {
        result += ' ';
      }
      result += line;
    }
  }
  
  if (inParagraph) result += '</p>';
  if (inList) result += '</ul>';
  
  return result;
}

export default function BlogDetailPage() {
  const [, params] = useRoute("/blog/:slug");
  const post = params?.slug ? getBlogPost(params.slug) : undefined;

  useEffect(() => {
    if (post) {
      document.title = post.seo.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.seo.description);
      }
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog post niet gevonden</h1>
          <Link href="/blog">
            <Button>Terug naar blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { name: "Home", url: "https://interesten.be" },
    { name: "Blog", url: "https://interesten.be/blog" },
    { name: post.title, url: `https://interesten.be/blog/${post.slug}` }
  ];

  return (
    <div className="min-h-screen bg-background">
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ArticleSchema 
        headline={post.title}
        description={post.excerpt}
        author={post.author}
        publishDate={post.publishDate}
        image={post.image}
        category={post.category}
      />
      <Header />
      
      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute top-8 left-8">
          <Link href="/blog">
            <Button variant="outline" className="glassmorphic" data-testid="back-to-blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Terug naar blog
            </Button>
          </Link>
        </div>
        <div className="absolute bottom-8 left-8">
          <span className="glassmorphic px-4 py-2 rounded-full text-sm font-medium text-gray-900 dark:text-white">
            {post.category}
          </span>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            {post.title}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl">
            {post.excerpt}
          </p>
          
          {/* Author Info */}
          <div className="flex items-start gap-4 glassmorphic p-6 rounded-lg">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-16 h-16 rounded-full"
            />
            <div className="flex-1">
              <div className="font-semibold text-lg text-gray-900 dark:text-white">{post.author.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">{post.author.bio}</div>
              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.publishDate).toLocaleDateString('nl-BE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min leestijd</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <div 
          className="prose max-w-none text-gray-800 dark:text-gray-200
            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4 prose-h1:hidden
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:mb-4 prose-p:leading-relaxed prose-p:text-base prose-p:text-gray-800 dark:prose-p:text-gray-200
            prose-ul:my-4 prose-ul:space-y-2 prose-ul:list-disc prose-ul:pl-6
            prose-li:text-gray-800 dark:prose-li:text-gray-200 prose-li:text-base
            prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: formatBlogContent(post.content) }}
        />

        {/* Call to Action */}
        <div className="glassmorphic p-8 rounded-lg mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Gebruik onze gratis calculators
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Bereken direct uw spaarrente, hypotheek, beleggingsrendement en meer
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/sparen/hoogste-spaarrente-belgie">
              <Button size="lg" data-testid="cta-spaarrente">
                Spaarrente Calculator
              </Button>
            </Link>
            <Link href="/lenen/hypothecaire-lening-berekenen">
              <Button size="lg" variant="outline" className="glassmorphic" data-testid="cta-hypotheek">
                Hypotheek Calculator
              </Button>
            </Link>
          </div>
        </div>

        {/* Author Bio */}
        <Card className="glassmorphic mt-12">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6">Over de auteur</h3>
            <div className="flex items-start gap-4">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <div className="font-bold text-xl mb-2">{post.author.name}</div>
                <div className="text-muted-foreground">{post.author.bio}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </article>

      <Footer />
    </div>
  );
}
