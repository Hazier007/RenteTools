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
import { Plus, Pencil, Trash2, Building2, CreditCard, TrendingUp, LogOut } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminLogin from "@/components/admin-login";
import type { Bank, Product, Rate } from "@shared/schema";

export default function AdminPage() {
  const { isAuthenticated, isLoading, login, logout } = useAdminAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("banks");

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

  // Fetch data
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
          <TabsList className="grid w-full grid-cols-3">
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