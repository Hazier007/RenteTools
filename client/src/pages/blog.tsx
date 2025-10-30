import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, Calendar } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import { useSeoTags } from "@/hooks/use-seo-tags";
import GoogleAdsense from "@/components/ui/google-adsense";
import { useState } from "react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  authorName: string;
  authorBio: string;
  authorAvatar: string;
  publishDate: string;
  readTime: number;
  image: string;
  status: string;
}

export default function BlogPage() {
  useSeoTags("blog");

  const [selectedCategory, setSelectedCategory] = useState<string>("Alle");
  const categories = ["Alle", "Sparen", "Lenen", "Beleggen", "Planning"];

  const { data: blogPosts = [], isLoading, isError } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts', { status: 'published' }],
    queryFn: async () => {
      const res = await fetch('/api/blog/posts?status=published');
      if (!res.ok) throw new Error('Failed to fetch blog posts');
      return res.json();
    }
  });

  const filteredPosts = selectedCategory === "Alle" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <OrganizationSchema />
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Financiële Inzichten & Gidsen
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Expertadvies over sparen, lenen, beleggen en financiële planning in België
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={cat === selectedCategory ? "default" : "outline"}
                className={cat === selectedCategory ? "" : "glassmorphic text-gray-900 dark:text-white font-semibold hover:text-gray-900 dark:hover:text-white"}
                onClick={() => setSelectedCategory(cat)}
                data-testid={`filter-${cat.toLowerCase()}`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GoogleAdsense slot="banner" />
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Blog posts laden...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Er is een fout opgetreden</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">We konden de blog posts niet laden. Probeer het later opnieuw.</p>
            <Button onClick={() => window.location.reload()} data-testid="retry-button">Opnieuw proberen</Button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Geen blog posts gevonden.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="glassmorphic hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full" data-testid={`blog-card-${post.slug}`}>
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="glassmorphic px-3 py-1 rounded-full text-sm font-medium text-gray-900 dark:text-white">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <h2 className="text-2xl font-bold mb-3 line-clamp-2 text-gray-900 dark:text-white">
                      {post.title}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.authorName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} min</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.publishDate).toLocaleDateString('nl-BE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Bottom Banner Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GoogleAdsense slot="banner" />
      </section>

      <Footer />
    </div>
  );
}
