import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCw, Send, Trash2, Plus, Eye } from "lucide-react";
import type { BlogPost as DBBlogPost, RssFeed } from "@shared/schema";

export default function BlogAutomationPage() {
  const { toast } = useToast();
  const [newFeedUrl, setNewFeedUrl] = useState("");
  const [newFeedName, setNewFeedName] = useState("");
  const [newFeedCategory, setNewFeedCategory] = useState<"Sparen" | "Lenen" | "Beleggen" | "Planning">("Sparen");

  const { data: draftPosts = [], isLoading: loadingDrafts } = useQuery<DBBlogPost[]>({
    queryKey: ['/api/blog/posts', 'draft'],
    queryFn: async () => {
      const response = await fetch('/api/blog/posts?status=draft');
      return response.json();
    }
  });

  const { data: publishedPosts = [], isLoading: loadingPublished } = useQuery<DBBlogPost[]>({
    queryKey: ['/api/blog/posts', 'published'],
    queryFn: async () => {
      const response = await fetch('/api/blog/posts?status=published');
      return response.json();
    }
  });

  const { data: rssFeeds = [], isLoading: loadingFeeds } = useQuery<RssFeed[]>({
    queryKey: ['/api/rss/feeds'],
  });

  const fetchRssMutation = useMutation({
    mutationFn: async () => {
      return await fetch('/api/blog/automation/fetch-rss', { method: 'POST' });
    },
    onSuccess: () => {
      toast({
        title: "RSS Feeds ophalen gestart",
        description: "De RSS feeds worden verwerkt. Dit kan enkele minuten duren.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts', 'draft'] });
    },
    onError: () => {
      toast({
        title: "Fout bij RSS fetch",
        description: "Er is een fout opgetreden bij het ophalen van RSS feeds.",
        variant: "destructive",
      });
    }
  });

  const publishPendingMutation = useMutation({
    mutationFn: async () => {
      return await fetch('/api/blog/automation/publish-pending', { method: 'POST' });
    },
    onSuccess: () => {
      toast({
        title: "Blog posts gepubliceerd",
        description: "Alle concept posts zijn gepubliceerd.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
    }
  });

  const addFeedMutation = useMutation({
    mutationFn: async (data: { name: string; url: string; category: string }) => {
      return await fetch('/api/rss/feeds', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      toast({
        title: "RSS Feed toegevoegd",
        description: "De RSS feed is succesvol toegevoegd.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/rss/feeds'] });
      setNewFeedUrl("");
      setNewFeedName("");
    }
  });

  const deleteFeedMutation = useMutation({
    mutationFn: async (id: string) => {
      return await fetch(`/api/rss/feeds/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      toast({
        title: "RSS Feed verwijderd",
        description: "De RSS feed is succesvol verwijderd.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/rss/feeds'] });
    }
  });

  const publishPostMutation = useMutation({
    mutationFn: async (id: string) => {
      return await fetch(`/api/blog/posts/${id}/publish`, { method: 'POST' });
    },
    onSuccess: () => {
      toast({
        title: "Blog post gepubliceerd",
        description: "De blog post is succesvol gepubliceerd.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
    }
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      return await fetch(`/api/blog/posts/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      toast({
        title: "Blog post verwijderd",
        description: "De blog post is succesvol verwijderd.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
    }
  });

  const handleAddFeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFeedUrl && newFeedName) {
      addFeedMutation.mutate({
        name: newFeedName,
        url: newFeedUrl,
        category: newFeedCategory
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Blog Automatisering
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Beheer RSS feeds en automatisch gegenereerde blog posts
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle>Automatisering Acties</CardTitle>
              <CardDescription>Start geautomatiseerde processen</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button
                onClick={() => fetchRssMutation.mutate()}
                disabled={fetchRssMutation.isPending}
                data-testid="button-fetch-rss"
              >
                {fetchRssMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                RSS Feeds Ophalen
              </Button>
              <Button
                onClick={() => publishPendingMutation.mutate()}
                disabled={publishPendingMutation.isPending || draftPosts.length === 0}
                variant="secondary"
                data-testid="button-publish-pending"
              >
                {publishPendingMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Publiceer Alle Concepten ({draftPosts.length})
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="draft" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="draft" data-testid="tab-draft">
              Concepten ({draftPosts.length})
            </TabsTrigger>
            <TabsTrigger value="published" data-testid="tab-published">
              Gepubliceerd ({publishedPosts.length})
            </TabsTrigger>
            <TabsTrigger value="feeds" data-testid="tab-feeds">
              RSS Feeds ({rssFeeds.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="draft" className="space-y-4">
            {loadingDrafts ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : draftPosts.length === 0 ? (
              <Card className="glassmorphic">
                <CardContent className="py-12 text-center text-gray-500 dark:text-gray-400">
                  Geen concept posts beschikbaar. Klik op "RSS Feeds Ophalen" om nieuwe content te genereren.
                </CardContent>
              </Card>
            ) : (
              draftPosts.map((post) => (
                <Card key={post.id} className="glassmorphic" data-testid={`draft-post-${post.slug}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                        <CardDescription>{post.excerpt}</CardDescription>
                        <div className="flex gap-2 mt-2">
                          <span className="text-sm bg-blue-500/20 px-2 py-1 rounded text-blue-700 dark:text-blue-300">
                            {post.category}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {post.readTime} min leestijd
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                          variant="outline"
                          data-testid={`button-preview-${post.slug}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => publishPostMutation.mutate(post.id)}
                          disabled={publishPostMutation.isPending}
                          data-testid={`button-publish-${post.slug}`}
                        >
                          Publiceer
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deletePostMutation.mutate(post.id)}
                          disabled={deletePostMutation.isPending}
                          data-testid={`button-delete-${post.slug}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="published" className="space-y-4">
            {loadingPublished ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : publishedPosts.length === 0 ? (
              <Card className="glassmorphic">
                <CardContent className="py-12 text-center text-gray-500 dark:text-gray-400">
                  Nog geen gepubliceerde posts.
                </CardContent>
              </Card>
            ) : (
              publishedPosts.map((post) => (
                <Card key={post.id} className="glassmorphic" data-testid={`published-post-${post.slug}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                        <CardDescription>{post.excerpt}</CardDescription>
                        <div className="flex gap-2 mt-2">
                          <span className="text-sm bg-green-500/20 px-2 py-1 rounded text-green-700 dark:text-green-300">
                            {post.category}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Gepubliceerd: {new Date(post.publishDate).toLocaleDateString('nl-BE')}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                          variant="outline"
                          data-testid={`button-view-${post.slug}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deletePostMutation.mutate(post.id)}
                          disabled={deletePostMutation.isPending}
                          data-testid={`button-delete-published-${post.slug}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="feeds" className="space-y-4">
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Nieuwe RSS Feed Toevoegen</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddFeed} className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="feed-name">Feed Naam</Label>
                      <Input
                        id="feed-name"
                        value={newFeedName}
                        onChange={(e) => setNewFeedName(e.target.value)}
                        placeholder="Bijv. De Tijd - Financiën"
                        data-testid="input-feed-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="feed-url">RSS Feed URL</Label>
                      <Input
                        id="feed-url"
                        type="url"
                        value={newFeedUrl}
                        onChange={(e) => setNewFeedUrl(e.target.value)}
                        placeholder="https://example.com/rss"
                        data-testid="input-feed-url"
                      />
                    </div>
                    <div>
                      <Label htmlFor="feed-category">Categorie</Label>
                      <Select value={newFeedCategory} onValueChange={(v: any) => setNewFeedCategory(v)}>
                        <SelectTrigger data-testid="select-feed-category">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sparen">Sparen</SelectItem>
                          <SelectItem value="Lenen">Lenen</SelectItem>
                          <SelectItem value="Beleggen">Beleggen</SelectItem>
                          <SelectItem value="Planning">Planning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button type="submit" disabled={addFeedMutation.isPending || !newFeedUrl || !newFeedName} data-testid="button-add-feed">
                    {addFeedMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Plus className="mr-2 h-4 w-4" />
                    )}
                    Feed Toevoegen
                  </Button>
                </form>
              </CardContent>
            </Card>

            {loadingFeeds ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : rssFeeds.length === 0 ? (
              <Card className="glassmorphic">
                <CardContent className="py-12 text-center text-gray-500 dark:text-gray-400">
                  Nog geen RSS feeds geconfigureerd.
                </CardContent>
              </Card>
            ) : (
              rssFeeds.map((feed) => (
                <Card key={feed.id} className="glassmorphic" data-testid={`rss-feed-${feed.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg mb-1">{feed.name}</CardTitle>
                        <CardDescription className="break-all">{feed.url}</CardDescription>
                        <div className="flex gap-2 mt-2">
                          <span className="text-sm bg-purple-500/20 px-2 py-1 rounded text-purple-700 dark:text-purple-300">
                            {feed.category}
                          </span>
                          {feed.lastFetched && (
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Laatst opgehaald: {new Date(feed.lastFetched).toLocaleDateString('nl-BE')}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteFeedMutation.mutate(feed.id)}
                        disabled={deleteFeedMutation.isPending}
                        data-testid={`button-delete-feed-${feed.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
