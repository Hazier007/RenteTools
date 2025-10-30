import { 
  type User, 
  type InsertUser,
  type Bank,
  type InsertBank,
  type Product,
  type InsertProduct,
  type Rate,
  type InsertRate,
  type BankWithProducts,
  type ProductWithDetails,
  type RateComparison,
  type BlogPost,
  type InsertBlogPost,
  type RssFeed,
  type InsertRssFeed
} from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Bank operations
  getBanks(): Promise<Bank[]>;
  getBank(id: string): Promise<Bank | undefined>;
  getBankWithProducts(id: string): Promise<BankWithProducts | undefined>;
  createBank(bank: InsertBank): Promise<Bank>;
  updateBank(id: string, bank: Partial<InsertBank>): Promise<Bank | undefined>;
  deleteBank(id: string): Promise<boolean>;

  // Product operations
  getProducts(): Promise<Product[]>;
  getProductsByType(type: string): Promise<Product[]>;
  getProductsByBank(bankId: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductWithDetails(id: string): Promise<ProductWithDetails | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  // Rate operations
  getRates(): Promise<Rate[]>;
  getRatesByProduct(productId: string): Promise<Rate[]>;
  getCurrentRatesByType(productType: string): Promise<RateComparison>;
  getRate(id: string): Promise<Rate | undefined>;
  createRate(rate: InsertRate): Promise<Rate>;
  updateRate(id: string, rate: Partial<InsertRate>): Promise<Rate | undefined>;
  deleteRate(id: string): Promise<boolean>;

  // Comparison operations
  compareSavingsRates(minAmount?: number, maxAmount?: number): Promise<RateComparison>;
  compareMortgageRates(amount: number, term: number): Promise<RateComparison>;
  comparePersonalLoanRates(amount: number, term: number): Promise<RateComparison>;

  // Blog operations
  getBlogPosts(status?: string): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  publishBlogPost(id: string): Promise<BlogPost | undefined>;

  // RSS Feed operations
  getRssFeeds(): Promise<RssFeed[]>;
  getRssFeed(id: string): Promise<RssFeed | undefined>;
  createRssFeed(feed: InsertRssFeed): Promise<RssFeed>;
  updateRssFeed(id: string, feed: Partial<InsertRssFeed>): Promise<RssFeed | undefined>;
  deleteRssFeed(id: string): Promise<boolean>;
  updateRssFeedFetchTime(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role ?? 'admin',
      isActive: insertUser.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Stub implementations for banking operations (not used with MemStorage)
  async getBanks(): Promise<Bank[]> { return []; }
  async getBank(id: string): Promise<Bank | undefined> { return undefined; }
  async getBankWithProducts(id: string): Promise<BankWithProducts | undefined> { return undefined; }
  async createBank(bank: InsertBank): Promise<Bank> { throw new Error('Not implemented in MemStorage'); }
  async updateBank(id: string, bank: Partial<InsertBank>): Promise<Bank | undefined> { return undefined; }
  async deleteBank(id: string): Promise<boolean> { return false; }
  
  async getProducts(): Promise<Product[]> { return []; }
  async getProductsByType(type: string): Promise<Product[]> { return []; }
  async getProductsByBank(bankId: string): Promise<Product[]> { return []; }
  async getProduct(id: string): Promise<Product | undefined> { return undefined; }
  async getProductWithDetails(id: string): Promise<ProductWithDetails | undefined> { return undefined; }
  async createProduct(product: InsertProduct): Promise<Product> { throw new Error('Not implemented in MemStorage'); }
  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined> { return undefined; }
  async deleteProduct(id: string): Promise<boolean> { return false; }
  
  async getRates(): Promise<Rate[]> { return []; }
  async getRatesByProduct(productId: string): Promise<Rate[]> { return []; }
  async getCurrentRatesByType(productType: string): Promise<RateComparison> { return { productType, rates: [] }; }
  async getRate(id: string): Promise<Rate | undefined> { return undefined; }
  async createRate(rate: InsertRate): Promise<Rate> { throw new Error('Not implemented in MemStorage'); }
  async updateRate(id: string, rate: Partial<InsertRate>): Promise<Rate | undefined> { return undefined; }
  async deleteRate(id: string): Promise<boolean> { return false; }
  
  async compareSavingsRates(minAmount?: number, maxAmount?: number): Promise<RateComparison> { return { productType: 'spaarrekening', rates: [] }; }
  async compareMortgageRates(amount: number, term: number): Promise<RateComparison> { return { productType: 'hypotheek', rates: [] }; }
  async comparePersonalLoanRates(amount: number, term: number): Promise<RateComparison> { return { productType: 'persoonlijke_lening', rates: [] }; }

  async getBlogPosts(status?: string): Promise<BlogPost[]> { return []; }
  async getBlogPost(slug: string): Promise<BlogPost | undefined> { return undefined; }
  async getBlogPostById(id: string): Promise<BlogPost | undefined> { return undefined; }
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> { throw new Error('Not implemented in MemStorage'); }
  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> { return undefined; }
  async deleteBlogPost(id: string): Promise<boolean> { return false; }
  async publishBlogPost(id: string): Promise<BlogPost | undefined> { return undefined; }

  async getRssFeeds(): Promise<RssFeed[]> { return []; }
  async getRssFeed(id: string): Promise<RssFeed | undefined> { return undefined; }
  async createRssFeed(feed: InsertRssFeed): Promise<RssFeed> { throw new Error('Not implemented in MemStorage'); }
  async updateRssFeed(id: string, feed: Partial<InsertRssFeed>): Promise<RssFeed | undefined> { return undefined; }
  async deleteRssFeed(id: string): Promise<boolean> { return false; }
  async updateRssFeedFetchTime(id: string): Promise<void> { }
}

// Import and use DatabaseStorage for production
import { DatabaseStorage } from './db-storage';

// Use database storage in production, memory storage for development if needed
export const storage = process.env.NODE_ENV === 'test' ? new MemStorage() : new DatabaseStorage();
