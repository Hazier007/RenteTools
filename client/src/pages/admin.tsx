import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Building2, CreditCard, TrendingUp, LogOut, Share2, BookOpen, Loader2, RefreshCw, Send, Eye, ImageIcon } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminLogin from "@/components/admin-login";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BlogPostEditor } from "@/components/blog-editor";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Bank, Product, Rate, BlogPost, InsertBlogPost, RssFeed } from "@shared/schema";

function AdminDashboard() {
  const { logout } = useAdminAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("banks");

  // Fetch data - these hooks are always called since this component only renders when authenticated
  const { data: banks = [] } = useQuery<Bank[]>({ queryKey: ["/api/banks"] });
  const { data: products = [] } = useQuery<Product[]>({ queryKey: ["/api/products"] });
  const { data: rates = [] } = useQuery<Rate[]>({ queryKey: ["/api/rates"] });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Beheer banken, producten en rentevoeten voor Interesten.be
              </p>
            </div>
            <Button variant="outline" onClick={logout} data-testid="button-admin-logout">
              <LogOut size={16} className="mr-2" />
              Uitloggen
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="banks" className="flex items-center gap-2">
              <Building2 size={16} />
              Banken ({banks.length})
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <CreditCard size={16} />
              Producten ({products.length})
            </TabsTrigger>
            <TabsTrigger value="rates" className="flex items-center gap-2">
              <TrendingUp size={16} />
              Rentes ({rates.length})
            </TabsTrigger>
            <TabsTrigger value="blogrss" className="flex items-center gap-2">
              <BookOpen size={16} />
              Blog & RSS
            </TabsTrigger>
            <TabsTrigger value="indexnow" className="flex items-center gap-2">
              <Share2 size={16} />
              IndexNow
            </TabsTrigger>
          </TabsList>

          <TabsContent value="banks">
            <BanksManager banks={banks} />
          </TabsContent>

          <TabsContent value="products">
            <ProductsManager products={products} banks={banks} />
          </TabsContent>

          <TabsContent value="rates">
            <RatesManager rates={rates} products={products} banks={banks} />
          </TabsContent>

          <TabsContent value="blogrss">
            <BlogRssManager />
          </TabsContent>

          <TabsContent value="indexnow">
            <IndexNowManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function BanksManager({ banks }: { banks: Bank[] }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [editingBank, setEditingBank] = useState<Bank | null>(null);

  const createBankMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/banks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create bank");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banks"] });
      setIsAdding(false);
      toast({ title: "Bank toegevoegd", description: "De bank is succesvol toegevoegd." });
    },
    onError: () => {
      toast({ title: "Fout", description: "Er is een fout opgetreden bij het toevoegen van de bank.", variant: "destructive" });
    },
  });

  const updateBankMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await fetch(`/api/banks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update bank");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banks"] });
      setEditingBank(null);
      toast({ title: "Bank bijgewerkt", description: "De bank is succesvol bijgewerkt." });
    },
    onError: () => {
      toast({ title: "Fout", description: "Er is een fout opgetreden bij het bijwerken van de bank.", variant: "destructive" });
    },
  });

  const deleteBankMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/banks/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete bank");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banks"] });
      toast({ title: "Bank verwijderd", description: "De bank is succesvol verwijderd." });
    },
    onError: () => {
      toast({ title: "Fout", description: "Er is een fout opgetreden bij het verwijderen van de bank.", variant: "destructive" });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Banken Beheer</h2>
        <Button onClick={() => setIsAdding(true)} data-testid="button-add-bank">
          <Plus size={16} className="mr-2" />
          Bank Toevoegen
        </Button>
      </div>

      {(isAdding || editingBank) && (
        <Card>
          <CardHeader>
            <CardTitle>{isAdding ? "Nieuwe Bank Toevoegen" : "Bank Bewerken"}</CardTitle>
          </CardHeader>
          <CardContent>
            <BankForm
              bank={editingBank}
              onSubmit={(data) => {
                if (editingBank) {
                  updateBankMutation.mutate({ id: editingBank.id, data });
                } else {
                  createBankMutation.mutate(data);
                }
              }}
              onCancel={() => {
                setIsAdding(false);
                setEditingBank(null);
              }}
              isLoading={createBankMutation.isPending || updateBankMutation.isPending}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {banks.map((bank) => (
          <Card key={bank.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold" data-testid={`text-bank-name-${bank.id}`}>
                      {bank.name}
                    </h3>
                    <Badge variant="secondary">{bank.type}</Badge>
                    {bank.isActive ? (
                      <Badge variant="default">Actief</Badge>
                    ) : (
                      <Badge variant="destructive">Inactief</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {bank.description}
                  </p>
                  <div className="text-sm text-gray-500">
                    <p>Website: {bank.website}</p>
                    <p>BIC: {bank.bic}</p>
                    <p>Telefoon: {bank.phone}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingBank(bank)}
                    data-testid={`button-edit-bank-${bank.id}`}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteBankMutation.mutate(bank.id)}
                    data-testid={`button-delete-bank-${bank.id}`}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BankForm({
  bank,
  onSubmit,
  onCancel,
  isLoading,
}: {
  bank?: Bank | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    name: bank?.name || "",
    shortName: bank?.shortName || "",
    website: bank?.website || "",
    type: (bank?.type || "retail") as "retail" | "online" | "cooperative" | "investment",
    bic: bank?.bic || "",
    phone: bank?.phone || "",
    email: bank?.email || "",
    description: bank?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Bank Naam *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            data-testid="input-bank-name"
          />
        </div>
        <div>
          <Label htmlFor="shortName">Korte Naam *</Label>
          <Input
            id="shortName"
            value={formData.shortName}
            onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
            required
            data-testid="input-bank-short-name"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            data-testid="input-bank-website"
          />
        </div>
        <div>
          <Label htmlFor="type">Type Bank</Label>
          <Select 
            value={formData.type} 
            onValueChange={(value: "retail" | "online" | "cooperative" | "investment") => 
              setFormData({ ...formData, type: value })
            }
          >
            <SelectTrigger data-testid="select-bank-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retail">Retail Bank</SelectItem>
              <SelectItem value="online">Online Bank</SelectItem>
              <SelectItem value="cooperative">Coöperatieve Bank</SelectItem>
              <SelectItem value="investment">Investment Bank</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="bic">BIC Code</Label>
          <Input
            id="bic"
            value={formData.bic}
            onChange={(e) => setFormData({ ...formData, bic: e.target.value })}
            data-testid="input-bank-bic"
          />
        </div>
        <div>
          <Label htmlFor="phone">Telefoon</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            data-testid="input-bank-phone"
          />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            data-testid="input-bank-email"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Beschrijving</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          data-testid="textarea-bank-description"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isLoading} data-testid="button-submit-bank">
          {isLoading ? "Opslaan..." : "Opslaan"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel-bank">
          Annuleren
        </Button>
      </div>
    </form>
  );
}

function ProductsManager({ products, banks }: { products: Product[]; banks: Bank[] }) {
  // Similar structure to BanksManager but for products
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Producten Beheer</h2>
        <Button data-testid="button-add-product">
          <Plus size={16} className="mr-2" />
          Product Toevoegen
        </Button>
      </div>

      <div className="grid gap-4">
        {products.map((product) => {
          const bank = banks.find(b => b.id === product.bankId);
          return (
            <Card key={product.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold" data-testid={`text-product-name-${product.id}`}>
                        {product.name}
                      </h3>
                      <Badge variant="secondary">{product.productType}</Badge>
                      <Badge variant="outline">{bank?.shortName}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {product.description}
                    </p>
                    <div className="text-sm text-gray-500">
                      {product.minAmount && <span>Min: €{product.minAmount} </span>}
                      {product.maxAmount && <span>Max: €{product.maxAmount} </span>}
                      {product.minTerm && <span>Min termijn: {product.minTerm} maanden </span>}
                      {product.maxTerm && <span>Max termijn: {product.maxTerm} maanden</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" data-testid={`button-edit-product-${product.id}`}>
                      <Pencil size={14} />
                    </Button>
                    <Button variant="destructive" size="sm" data-testid={`button-delete-product-${product.id}`}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function RatesManager({ rates, products, banks }: { rates: Rate[]; products: Product[]; banks: Bank[] }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Rentevoeten Beheer</h2>
        <Button data-testid="button-add-rate">
          <Plus size={16} className="mr-2" />
          Rente Toevoegen
        </Button>
      </div>

      <div className="grid gap-4">
        {rates.map((rate) => {
          const product = products.find(p => p.id === rate.productId);
          const bank = banks.find(b => b.id === product?.bankId);
          const totalRate = parseFloat(rate.baseRate) + parseFloat(rate.loyaltyBonus || '0');
          
          return (
            <Card key={rate.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold" data-testid={`text-rate-product-${rate.id}`}>
                        {product?.name}
                      </h3>
                      <Badge variant="outline">{bank?.shortName}</Badge>
                      <Badge variant={rate.rateType === 'promotional' ? 'default' : 'secondary'}>
                        {rate.rateType}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Basisrente:</span>
                        <div className="text-lg font-bold text-green-600" data-testid={`text-base-rate-${rate.id}`}>
                          {rate.baseRate}%
                        </div>
                      </div>
                      {rate.loyaltyBonus && parseFloat(rate.loyaltyBonus) > 0 && (
                        <div>
                          <span className="font-medium">Loyaliteitsbonus:</span>
                          <div className="text-lg font-bold text-blue-600">
                            +{rate.loyaltyBonus}%
                          </div>
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Totale rente:</span>
                        <div className="text-xl font-bold text-primary" data-testid={`text-total-rate-${rate.id}`}>
                          {totalRate.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                    {rate.promotionalRate && (
                      <div className="mt-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                        <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                          Actierente: {rate.promotionalRate}% voor {rate.promotionalPeriod} maanden
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" data-testid={`button-edit-rate-${rate.id}`}>
                      <Pencil size={14} />
                    </Button>
                    <Button variant="destructive" size="sm" data-testid={`button-delete-rate-${rate.id}`}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function BlogRssManager() {
  const { toast } = useToast();
  const [newFeedUrl, setNewFeedUrl] = useState("");
  const [newFeedName, setNewFeedName] = useState("");
  const [newFeedCategory, setNewFeedCategory] = useState<"Sparen" | "Lenen" | "Beleggen" | "Planning">("Sparen");
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postFormData, setPostFormData] = useState({
    title: "",
    excerpt: "",
    category: "Sparen" as "Sparen" | "Lenen" | "Beleggen" | "Planning",
    authorName: "Sophie Janssens",
    image: "",
    content: "",
  });

  const { data: draftPosts = [], isLoading: loadingDrafts } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts', 'draft'],
    queryFn: async () => {
      const response = await fetch('/api/blog/posts?status=draft');
      return response.json();
    }
  });

  const { data: publishedPosts = [], isLoading: loadingPublished } = useQuery<BlogPost[]>({
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

  const generateImagesMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await fetch(`/api/blog/automation/generate-images/${postId}`, { 
        method: 'POST' 
      });
      if (!response.ok) throw new Error('Failed to generate images');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Afbeeldingen gegenereerd",
        description: "Featured image en inline afbeeldingen zijn toegevoegd.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
      if (editingPost) {
        setShowPostDialog(false);
        setEditingPost(null);
      }
    },
    onError: () => {
      toast({
        title: "Fout bij genereren",
        description: "Er is een fout opgetreden bij het genereren van afbeeldingen.",
        variant: "destructive",
      });
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

  const createPostMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create post');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Blog post aangemaakt",
        description: "De blog post is succesvol aangemaakt.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
      setShowPostDialog(false);
      resetPostForm();
    },
    onError: (error: any) => {
      toast({
        title: "Fout bij aanmaken",
        description: error.message || "Er is een fout opgetreden.",
        variant: "destructive",
      });
    }
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await fetch(`/api/blog/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update post');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Blog post bijgewerkt",
        description: "De blog post is succesvol bijgewerkt.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
      setShowPostDialog(false);
      setEditingPost(null);
      resetPostForm();
    },
    onError: (error: any) => {
      toast({
        title: "Fout bij bijwerken",
        description: error.message || "Er is een fout opgetreden.",
        variant: "destructive",
      });
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

  const resetPostForm = () => {
    setPostFormData({
      title: "",
      excerpt: "",
      category: "Sparen",
      authorName: "Sophie Janssens",
      image: "",
      content: "",
    });
  };

  const openCreateDialog = () => {
    resetPostForm();
    setEditingPost(null);
    setShowPostDialog(true);
  };

  const openEditDialog = (post: BlogPost) => {
    setEditingPost(post);
    setPostFormData({
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      authorName: post.authorName,
      image: post.image,
      content: post.content,
    });
    setShowPostDialog(true);
  };

  const handleSavePost = (publishImmediately: boolean = false) => {
    const slug = postFormData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const wordCount = postFormData.content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 250);

    const postData = {
      ...postFormData,
      slug: editingPost?.slug || slug,
      seoTitle: postFormData.title,
      seoDescription: postFormData.excerpt,
      seoKeywords: [postFormData.category.toLowerCase()],
      publishDate: new Date().toISOString(),
      readTime,
      status: publishImmediately ? 'published' : 'draft',
    };

    if (editingPost) {
      updatePostMutation.mutate({ id: editingPost.id, data: postData });
    } else {
      createPostMutation.mutate(postData);
    }
  };

  return (
    <div className="space-y-6">
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
          <TabsTrigger value="draft" data-testid="tab-blog-draft">
            Concepten ({draftPosts.length})
          </TabsTrigger>
          <TabsTrigger value="published" data-testid="tab-blog-published">
            Gepubliceerd ({publishedPosts.length})
          </TabsTrigger>
          <TabsTrigger value="feeds" data-testid="tab-blog-feeds">
            RSS Feeds ({rssFeeds.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="draft" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Concept Posts</h2>
            <Button onClick={openCreateDialog} data-testid="button-create-post">
              <Plus size={16} className="mr-2" />
              Nieuwe Post
            </Button>
          </div>

          {loadingDrafts ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : draftPosts.length === 0 ? (
            <Card className="glassmorphic">
              <CardContent className="py-12 text-center text-gray-500 dark:text-gray-400">
                Geen concept posts beschikbaar.
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
                        onClick={() => openEditDialog(post)}
                        variant="outline"
                        data-testid={`button-edit-${post.slug}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
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
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Gepubliceerde Posts</h2>
            <Button onClick={openCreateDialog} data-testid="button-create-post-published">
              <Plus size={16} className="mr-2" />
              Nieuwe Post
            </Button>
          </div>

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
                        onClick={() => openEditDialog(post)}
                        variant="outline"
                        data-testid={`button-edit-${post.slug}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
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

      <Dialog open={showPostDialog} onOpenChange={(open) => {
        setShowPostDialog(open);
        if (!open) {
          setEditingPost(null);
          resetPostForm();
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="dialog-post-editor">
          <DialogHeader>
            <DialogTitle>{editingPost ? 'Blog Post Bewerken' : 'Nieuwe Blog Post'}</DialogTitle>
            <DialogDescription>
              {editingPost ? 'Bewerk de blog post gegevens' : 'Vul de gegevens in voor de nieuwe blog post'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="post-title">Titel *</Label>
              <Input
                id="post-title"
                value={postFormData.title}
                onChange={(e) => setPostFormData({ ...postFormData, title: e.target.value })}
                placeholder="Voer de titel in"
                data-testid="input-post-title"
              />
            </div>

            <div>
              <Label htmlFor="post-excerpt">Excerpt *</Label>
              <Textarea
                id="post-excerpt"
                value={postFormData.excerpt}
                onChange={(e) => setPostFormData({ ...postFormData, excerpt: e.target.value })}
                placeholder="Korte samenvatting van de post"
                rows={3}
                data-testid="textarea-post-excerpt"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="post-category">Categorie *</Label>
                <Select 
                  value={postFormData.category} 
                  onValueChange={(v: any) => setPostFormData({ ...postFormData, category: v })}
                >
                  <SelectTrigger data-testid="select-post-category">
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

              <div>
                <Label htmlFor="post-author">Auteur</Label>
                <Select 
                  value={postFormData.authorName} 
                  onValueChange={(v: string) => setPostFormData({ ...postFormData, authorName: v })}
                >
                  <SelectTrigger data-testid="select-post-author">
                    <SelectValue placeholder="Kies een auteur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sophie Janssens">Sophie Janssens</SelectItem>
                    <SelectItem value="Thomas Vermeulen">Thomas Vermeulen</SelectItem>
                    <SelectItem value="Lisa De Vries">Lisa De Vries</SelectItem>
                    <SelectItem value="Marc Peeters">Marc Peeters</SelectItem>
                    <SelectItem value="Emma Claes">Emma Claes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="post-image">Afbeelding URL *</Label>
              <div className="flex gap-2">
                <Input
                  id="post-image"
                  value={postFormData.image}
                  onChange={(e) => setPostFormData({ ...postFormData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  data-testid="input-post-image"
                  className="flex-1"
                />
                {editingPost && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => generateImagesMutation.mutate(editingPost.id)}
                    disabled={generateImagesMutation.isPending}
                    data-testid="button-generate-images"
                  >
                    {generateImagesMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ImageIcon className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {editingPost ? "Klik op de knop om automatisch een featured image en inline afbeeldingen te genereren" : "Featured image URL wordt automatisch gegenereerd bij RSS posts"}
              </p>
            </div>

            <div>
              <Label>Content *</Label>
              <BlogPostEditor
                content={postFormData.content}
                onChange={(html) => setPostFormData({ ...postFormData, content: html })}
                placeholder="Schrijf hier de inhoud van je blog post..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowPostDialog(false);
                setEditingPost(null);
                resetPostForm();
              }}
            >
              Annuleren
            </Button>
            <Button 
              variant="secondary"
              onClick={() => handleSavePost(false)}
              disabled={createPostMutation.isPending || updatePostMutation.isPending || !postFormData.title || !postFormData.content}
              data-testid="button-save-draft"
            >
              {createPostMutation.isPending || updatePostMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Opslaan als Concept
            </Button>
            <Button 
              onClick={() => handleSavePost(true)}
              disabled={createPostMutation.isPending || updatePostMutation.isPending || !postFormData.title || !postFormData.content}
              data-testid="button-publish-now"
            >
              {createPostMutation.isPending || updatePostMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Publiceren
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function IndexNowManager() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  const { data: urlsData } = useQuery<{ urls: string[], count: number }>({ 
    queryKey: ["/api/indexnow/urls"] 
  });

  const submitAllMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/indexnow/submit-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit to IndexNow");
      }
      return response.json();
    },
    onSuccess: (data) => {
      setSubmissionResult(data);
      toast({ 
        title: "IndexNow Submission Successful", 
        description: `${data.submittedUrls || 0} URLs submitted to Bing, Yandex, and other search engines.` 
      });
    },
    onError: (error: any) => {
      toast({ 
        title: "IndexNow Submission Failed", 
        description: error.message, 
        variant: "destructive" 
      });
    },
  });

  const handleSubmitAll = () => {
    setIsSubmitting(true);
    submitAllMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 size={20} />
            IndexNow - Instant Search Engine Indexing
          </CardTitle>
          <CardDescription>
            Submit all calculator pages to Bing, Yandex, Naver, and other IndexNow-supporting search engines for instant indexing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white rounded-full p-2">
                <Share2 size={16} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  What is IndexNow?
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  IndexNow is a protocol that instantly notifies search engines when content is published or updated. 
                  Instead of waiting days or weeks for crawlers to find your pages, IndexNow sends direct notifications 
                  to Bing, Yandex, and other participating search engines.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-primary text-primary-foreground rounded-full p-1.5">
                  <TrendingUp size={14} />
                </div>
                <h4 className="font-semibold">Total URLs</h4>
              </div>
              <div className="text-3xl font-bold text-primary">
                {urlsData?.count || 0}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Calculator pages + info pages
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-green-500 text-white rounded-full p-1.5">
                  <Share2 size={14} />
                </div>
                <h4 className="font-semibold">Supported Engines</h4>
              </div>
              <div className="text-sm space-y-1 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Bing (Microsoft)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Yandex</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Naver, Seznam, Yep</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Submit All URLs</h3>
                <p className="text-sm text-muted-foreground">
                  Send all {urlsData?.count || 0} calculator pages to IndexNow search engines
                </p>
              </div>
              <Button 
                onClick={handleSubmitAll} 
                disabled={submitAllMutation.isPending}
                size="lg"
                data-testid="button-submit-indexnow"
              >
                {submitAllMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Share2 size={16} className="mr-2" />
                    Submit to IndexNow
                  </>
                )}
              </Button>
            </div>

            {submissionResult && (
              <div className={`p-4 rounded-lg ${
                submissionResult.success 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`${
                    submissionResult.success 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  } rounded-full p-2`}>
                    {submissionResult.success ? '✓' : '✗'}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      submissionResult.success 
                        ? 'text-green-900 dark:text-green-100' 
                        : 'text-red-900 dark:text-red-100'
                    }`}>
                      {submissionResult.success ? 'Submission Successful' : 'Submission Failed'}
                    </h4>
                    <p className={`text-sm mt-1 ${
                      submissionResult.success 
                        ? 'text-green-700 dark:text-green-300' 
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      {submissionResult.message}
                    </p>
                    {submissionResult.success && (
                      <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                        Status Code: {submissionResult.statusCode} | 
                        URLs: {submissionResult.submittedUrls}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
              Important Notes
            </h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• IndexNow submits URLs to Bing, Yandex, and participating search engines</li>
              <li>• Google does NOT support IndexNow (use XML sitemaps for Google)</li>
              <li>• Only submit when content is actually updated or newly published</li>
              <li>• Response code 200 or 202 means the submission was received (not necessarily indexed)</li>
              <li>• Check Bing Webmaster Tools for verification and detailed insights</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminPage() {
  const { isAuthenticated, isLoading, login } = useAdminAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Laden...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  // Show admin dashboard when authenticated
  return <AdminDashboard />;
}