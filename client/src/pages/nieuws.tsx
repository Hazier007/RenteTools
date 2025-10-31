import { motion } from 'framer-motion';
import { AnimatedMeshBackground, GlassCard, GradientText, FloatingNumber } from '@/components/design';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import OrganizationSchema from '@/components/seo/OrganizationSchema';
import GoogleAdsense from '@/components/ui/google-adsense';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSeoTags } from '@/hooks/use-seo-tags';
import { staggerChildren, fadeInUp } from '@/lib/animations';
import { Clock, User, Calendar, TrendingUp } from 'lucide-react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';

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

const POSTS_PER_PAGE = 9;

export default function NieuwsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Alle");
  const [displayCount, setDisplayCount] = useState(POSTS_PER_PAGE);
  
  const categories = ["Alle", "Sparen", "Lenen", "Beleggen", "Planning"];

  useSeoTags(
    "nieuws",
    "Belgisch Financieel Nieuws | Interesten.be",
    "Het laatste financiële nieuws uit België. Dagelijks updates over spaarrentes, leningen, beleggingen en financiële planning."
  );

  const { data: blogPosts = [], isLoading, isError } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts', { status: 'published' }],
    queryFn: async () => {
      const res = await fetch('/api/blog/posts?status=published');
      if (!res.ok) throw new Error('Failed to fetch blog posts');
      return res.json();
    }
  });

  const filteredPosts = useMemo(() => {
    const filtered = selectedCategory === "Alle" 
      ? blogPosts 
      : blogPosts.filter(post => post.category === selectedCategory);
    
    return filtered.sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  }, [blogPosts, selectedCategory]);

  const displayedPosts = filteredPosts.slice(0, displayCount);
  const hasMore = displayCount < filteredPosts.length;

  const stats = useMemo(() => {
    const lastUpdate = blogPosts.length > 0
      ? new Date(Math.max(...blogPosts.map(p => new Date(p.publishDate).getTime())))
      : new Date();
    
    const uniqueCategories = new Set(blogPosts.map(p => p.category));
    
    return {
      totalPosts: filteredPosts.length,
      lastUpdate: lastUpdate.toLocaleDateString('nl-BE', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      categoriesCount: uniqueCategories.size
    };
  }, [blogPosts, filteredPosts]);

  const breadcrumbItems = [
    { name: "Home", url: "https://interesten.be" },
    { name: "Nieuws", url: "https://interesten.be/nieuws" }
  ];

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Sparen': return 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30';
      case 'Lenen': return 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30';
      case 'Beleggen': return 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30';
      case 'Planning': return 'bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatedMeshBackground variant="hero" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <div className="relative z-10">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="space-y-16"
          >
            {/* Hero Section */}
            <motion.div variants={fadeInUp} className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 glassmorphic px-4 py-2 rounded-full mb-4">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium" data-testid="text-latest">Laatste financiële updates</span>
              </div>
              
              <GradientText as="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold" data-testid="heading-main">
                Belgisch Financieel Nieuws
              </GradientText>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-description">
                Blijf op de hoogte van het laatste financiële nieuws uit België. Dagelijks updates over sparen, lenen, beleggen en financiële planning.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4">
                <GlassCard className="p-6" data-testid="stat-posts">
                  <FloatingNumber 
                    value={stats.totalPosts} 
                    suffix=" artikelen" 
                    className="text-3xl md:text-4xl block mb-2" 
                  />
                  <p className="text-sm text-muted-foreground">
                    {selectedCategory === "Alle" ? "Totaal" : selectedCategory}
                  </p>
                </GlassCard>
                <GlassCard className="p-6" data-testid="stat-update">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                    {stats.lastUpdate.split(' ')[0]}
                  </div>
                  <p className="text-sm text-muted-foreground">{stats.lastUpdate.split(' ').slice(1).join(' ')}</p>
                  <p className="text-xs text-muted-foreground mt-1">Laatste update</p>
                </GlassCard>
                <GlassCard className="p-6" data-testid="stat-categories">
                  <FloatingNumber 
                    value={stats.categoriesCount} 
                    suffix=" categorieën" 
                    className="text-3xl md:text-4xl block mb-2" 
                  />
                  <p className="text-sm text-muted-foreground">Topics</p>
                </GlassCard>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-3 justify-center pt-6">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={cat === selectedCategory ? "default" : "outline"}
                    className={cat === selectedCategory 
                      ? "" 
                      : "glassmorphic text-foreground font-semibold hover:text-foreground"
                    }
                    onClick={() => {
                      setSelectedCategory(cat);
                      setDisplayCount(POSTS_PER_PAGE);
                    }}
                    data-testid={`filter-${cat.toLowerCase()}`}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Top Banner Ad */}
            <motion.div variants={fadeInUp}>
              <GoogleAdsense slot="banner" />
            </motion.div>

            {/* News Grid */}
            <motion.div variants={fadeInUp}>
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" data-testid="loading-spinner"></div>
                  <p className="mt-4 text-muted-foreground" data-testid="text-loading">Nieuws laden...</p>
                </div>
              ) : isError ? (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold mb-4" data-testid="heading-error">Er is een fout opgetreden</h2>
                  <p className="text-muted-foreground mb-6" data-testid="text-error">
                    We konden de nieuwsberichten niet laden. Probeer het later opnieuw.
                  </p>
                  <Button onClick={() => window.location.reload()} data-testid="button-retry">
                    Opnieuw proberen
                  </Button>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground" data-testid="text-empty">
                    Geen nieuwsberichten gevonden voor deze categorie.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-news">
                    {displayedPosts.map(post => (
                      <Link key={post.slug} href={`/blog/${post.slug}`}>
                        <Card 
                          className="glassmorphic hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full overflow-hidden" 
                          data-testid={`news-card-${post.slug}`}
                        >
                          <div className="relative aspect-video overflow-hidden">
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-full object-cover"
                              data-testid={`news-image-${post.slug}`}
                            />
                            <div className="absolute top-4 left-4">
                              <Badge 
                                className={`glassmorphic ${getCategoryColor(post.category)} border`}
                                data-testid={`news-category-${post.slug}`}
                              >
                                {post.category}
                              </Badge>
                            </div>
                          </div>
                          <CardHeader>
                            <h2 
                              className="text-xl font-bold mb-3 line-clamp-2" 
                              data-testid={`news-title-${post.slug}`}
                            >
                              {post.title}
                            </h2>
                            <p 
                              className="text-muted-foreground line-clamp-3 text-sm" 
                              data-testid={`news-excerpt-${post.slug}`}
                            >
                              {post.excerpt.substring(0, 150)}
                              {post.excerpt.length > 150 ? '...' : ''}
                            </p>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                              <div className="flex items-center gap-2" data-testid={`news-author-${post.slug}`}>
                                <User className="w-4 h-4" />
                                <span>{post.authorName}</span>
                              </div>
                              <div className="flex items-center gap-2" data-testid={`news-readtime-${post.slug}`}>
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime} min</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2" data-testid={`news-date-${post.slug}`}>
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(post.publishDate).toLocaleDateString('nl-BE', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>

                  {/* Load More Button */}
                  {hasMore && (
                    <div className="flex justify-center mt-12">
                      <Button
                        size="lg"
                        onClick={() => setDisplayCount(prev => prev + POSTS_PER_PAGE)}
                        className="glassmorphic text-foreground font-semibold hover:text-foreground"
                        data-testid="button-load-more"
                      >
                        Laad meer artikelen
                      </Button>
                    </div>
                  )}
                </>
              )}
            </motion.div>

            {/* Bottom Banner Ad */}
            <motion.div variants={fadeInUp}>
              <GoogleAdsense slot="banner" />
            </motion.div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
