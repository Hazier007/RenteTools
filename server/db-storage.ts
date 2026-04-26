import { eq, and, desc, gte } from 'drizzle-orm';
import { db, usersTable, banksTable, productsTable, ratesTable, rateHistoryTable, blogPostsTable, rssFeedsTable } from './database';
import type { IStorage } from './storage';
import type { 
  User,
  InsertUser,
  Bank,
  InsertBank,
  Product,
  InsertProduct,
  Rate,
  InsertRate,
  BankWithProducts,
  ProductWithDetails,
  RateComparison,
  BlogPost,
  InsertBlogPost,
  RssFeed,
  InsertRssFeed
} from '@shared/schema';

export class DatabaseStorage implements IStorage {
  
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(usersTable).where(eq(usersTable.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(usersTable).where(eq(usersTable.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(usersTable).values(user).returning();
    return result[0];
  }

  // Bank operations
  async getBanks(): Promise<Bank[]> {
    return await db.select().from(banksTable).where(eq(banksTable.isActive, true));
  }

  async getBank(id: string): Promise<Bank | undefined> {
    const result = await db.select().from(banksTable).where(eq(banksTable.id, id));
    return result[0];
  }

  async getBankWithProducts(id: string): Promise<BankWithProducts | undefined> {
    const bank = await this.getBank(id);
    if (!bank) return undefined;

    const products = await db.select().from(productsTable).where(eq(productsTable.bankId, id));
    
    // Get current rates for each product
    const productsWithRates = await Promise.all(
      products.map(async (product) => {
        const currentRate = await db.select()
          .from(ratesTable)
          .where(and(
            eq(ratesTable.productId, product.id),
            eq(ratesTable.isActive, true)
          ))
          .orderBy(desc(ratesTable.effectiveDate))
          .limit(1);
        
        return {
          ...product,
          currentRate: currentRate[0] || undefined
        };
      })
    );

    return {
      ...bank,
      products: productsWithRates
    };
  }

  async createBank(bank: InsertBank): Promise<Bank> {
    const result = await db.insert(banksTable).values(bank).returning();
    return result[0];
  }

  async updateBank(id: string, bank: Partial<InsertBank>): Promise<Bank | undefined> {
    const result = await db.update(banksTable)
      .set({ ...bank, updatedAt: new Date() })
      .where(eq(banksTable.id, id))
      .returning();
    return result[0];
  }

  async deleteBank(id: string): Promise<boolean> {
    // Soft delete by setting isActive to false
    const result = await db.update(banksTable)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(banksTable.id, id))
      .returning();
    return result.length > 0;
  }

  // Product operations
  async getProducts(): Promise<Product[]> {
    return await db.select().from(productsTable).where(eq(productsTable.isActive, true));
  }

  async getProductsByType(type: string): Promise<Product[]> {
    return await db.select().from(productsTable)
      .where(and(
        eq(productsTable.productType, type as any),
        eq(productsTable.isActive, true)
      ));
  }

  async getProductsByBank(bankId: string): Promise<Product[]> {
    return await db.select().from(productsTable)
      .where(and(
        eq(productsTable.bankId, bankId),
        eq(productsTable.isActive, true)
      ));
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(productsTable).where(eq(productsTable.id, id));
    return result[0];
  }

  async getProductWithDetails(id: string): Promise<ProductWithDetails | undefined> {
    const product = await this.getProduct(id);
    if (!product) return undefined;

    const bank = await this.getBank(product.bankId);
    if (!bank) return undefined;

    const currentRate = await db.select()
      .from(ratesTable)
      .where(and(
        eq(ratesTable.productId, id),
        eq(ratesTable.isActive, true)
      ))
      .orderBy(desc(ratesTable.effectiveDate))
      .limit(1);

    const rateHistory = await db.select()
      .from(rateHistoryTable)
      .where(eq(rateHistoryTable.rateId, currentRate[0]?.id || ''))
      .orderBy(desc(rateHistoryTable.changeDate));

    return {
      ...product,
      bank,
      currentRate: currentRate[0] || null,
      rateHistory
    };
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db.insert(productsTable).values(product).returning();
    return result[0];
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const result = await db.update(productsTable)
      .set({ ...product, updatedAt: new Date() })
      .where(eq(productsTable.id, id))
      .returning();
    return result[0];
  }

  async deleteProduct(id: string): Promise<boolean> {
    // Soft delete by setting isActive to false
    const result = await db.update(productsTable)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(productsTable.id, id))
      .returning();
    return result.length > 0;
  }

  // Rate operations
  async getRates(): Promise<Rate[]> {
    return await db.select().from(ratesTable).where(eq(ratesTable.isActive, true));
  }

  async getRatesByProduct(productId: string): Promise<Rate[]> {
    return await db.select().from(ratesTable)
      .where(and(
        eq(ratesTable.productId, productId),
        eq(ratesTable.isActive, true)
      ));
  }

  async getCurrentRatesByType(productType: string): Promise<RateComparison> {
    const query = `
      SELECT 
        b.name as bank_name,
        p.name as product_name,
        r.base_rate,
        r.loyalty_bonus,
        (r.base_rate + COALESCE(r.loyalty_bonus, 0)) as total_rate,
        r.min_amount,
        r.max_amount,
        p.conditions
      FROM rates r
      JOIN products p ON r.product_id = p.id
      JOIN banks b ON p.bank_id = b.id
      WHERE p.product_type = $1
        AND r.is_active = true
        AND p.is_active = true
        AND b.is_active = true
      ORDER BY total_rate DESC
    `;

    const rawResults = await db.execute({
      sql: query,
      args: [productType]
    });

    const rates = rawResults.rows.map((row: any) => ({
      bankName: row.bank_name,
      productName: row.product_name,
      baseRate: parseFloat(row.base_rate),
      loyaltyBonus: parseFloat(row.loyalty_bonus || '0'),
      totalRate: parseFloat(row.total_rate),
      minAmount: row.min_amount ? parseFloat(row.min_amount) : null,
      maxAmount: row.max_amount ? parseFloat(row.max_amount) : null,
      conditions: row.conditions
    }));

    return {
      productType,
      rates
    };
  }

  async getRate(id: string): Promise<Rate | undefined> {
    const result = await db.select().from(ratesTable).where(eq(ratesTable.id, id));
    return result[0];
  }

  async createRate(rate: InsertRate): Promise<Rate> {
    const result = await db.insert(ratesTable).values(rate).returning();
    return result[0];
  }

  async updateRate(id: string, rate: Partial<InsertRate>): Promise<Rate | undefined> {
    // First get the old rate for history tracking
    const oldRate = await this.getRate(id);
    
    const result = await db.update(ratesTable)
      .set({ ...rate, updatedAt: new Date() })
      .where(eq(ratesTable.id, id))
      .returning();

    // Track the change in history
    if (oldRate && result[0] && rate.baseRate) {
      await db.insert(rateHistoryTable).values({
        rateId: id,
        oldRate: oldRate.baseRate,
        newRate: rate.baseRate,
        changeReason: 'Rate updated',
        changedBy: 'system'
      });
    }

    return result[0];
  }

  async deleteRate(id: string): Promise<boolean> {
    // Soft delete by setting isActive to false
    const result = await db.update(ratesTable)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(ratesTable.id, id))
      .returning();
    return result.length > 0;
  }

  // Comparison operations
  async compareSavingsRates(minAmount?: number, maxAmount?: number): Promise<RateComparison> {
    let whereClause = "WHERE p.product_type = 'spaarrekening'";
    const args: any[] = [];
    
    if (minAmount) {
      whereClause += " AND (r.min_amount IS NULL OR r.min_amount <= $" + (args.length + 1) + ")";
      args.push(minAmount);
    }
    
    if (maxAmount) {
      whereClause += " AND (r.max_amount IS NULL OR r.max_amount >= $" + (args.length + 1) + ")";
      args.push(maxAmount);
    }

    const query = `
      SELECT 
        b.name as bank_name,
        p.name as product_name,
        r.base_rate,
        r.loyalty_bonus,
        (r.base_rate + COALESCE(r.loyalty_bonus, 0)) as total_rate,
        r.min_amount,
        r.max_amount,
        p.conditions
      FROM rates r
      JOIN products p ON r.product_id = p.id
      JOIN banks b ON p.bank_id = b.id
      ${whereClause}
        AND r.is_active = true 
        AND p.is_active = true 
        AND b.is_active = true
        AND (r.expiry_date IS NULL OR r.expiry_date > NOW())
      ORDER BY total_rate DESC
    `;

    const rawResults = await db.execute({
      sql: query,
      args
    });

    const rates = rawResults.rows.map((row: any) => ({
      bankName: row.bank_name,
      productName: row.product_name,
      baseRate: parseFloat(row.base_rate),
      loyaltyBonus: parseFloat(row.loyalty_bonus || '0'),
      totalRate: parseFloat(row.total_rate),
      minAmount: row.min_amount ? parseFloat(row.min_amount) : null,
      maxAmount: row.max_amount ? parseFloat(row.max_amount) : null,
      conditions: row.conditions
    }));

    return {
      productType: 'spaarrekening',
      rates
    };
  }

  async compareMortgageRates(amount: number, term: number): Promise<RateComparison> {
    const query = `
      SELECT 
        b.name as bank_name,
        p.name as product_name,
        r.base_rate,
        r.loyalty_bonus,
        (r.base_rate + COALESCE(r.loyalty_bonus, 0)) as total_rate,
        r.min_amount,
        r.max_amount,
        p.conditions
      FROM rates r
      JOIN products p ON r.product_id = p.id
      JOIN banks b ON p.bank_id = b.id
      WHERE p.product_type = 'hypotheek'
        AND (r.min_amount IS NULL OR r.min_amount <= $1)
        AND (r.max_amount IS NULL OR r.max_amount >= $1)
        AND (p.min_term IS NULL OR p.min_term <= $2)
        AND (p.max_term IS NULL OR p.max_term >= $2)
        AND r.is_active = true 
        AND p.is_active = true 
        AND b.is_active = true
        AND (r.expiry_date IS NULL OR r.expiry_date > NOW())
      ORDER BY total_rate ASC
    `;

    const rawResults = await db.execute({
      sql: query,
      args: [amount, term]
    });

    const rates = rawResults.rows.map((row: any) => ({
      bankName: row.bank_name,
      productName: row.product_name,
      baseRate: parseFloat(row.base_rate),
      loyaltyBonus: parseFloat(row.loyalty_bonus || '0'),
      totalRate: parseFloat(row.total_rate),
      minAmount: row.min_amount ? parseFloat(row.min_amount) : null,
      maxAmount: row.max_amount ? parseFloat(row.max_amount) : null,
      conditions: row.conditions
    }));

    return {
      productType: 'hypotheek',
      rates
    };
  }

  async comparePersonalLoanRates(amount: number, term: number): Promise<RateComparison> {
    const query = `
      SELECT 
        b.name as bank_name,
        p.name as product_name,
        r.base_rate,
        r.loyalty_bonus,
        (r.base_rate + COALESCE(r.loyalty_bonus, 0)) as total_rate,
        r.min_amount,
        r.max_amount,
        p.conditions
      FROM rates r
      JOIN products p ON r.product_id = p.id
      JOIN banks b ON p.bank_id = b.id
      WHERE p.product_type = 'persoonlijke_lening'
        AND (r.min_amount IS NULL OR r.min_amount <= $1)
        AND (r.max_amount IS NULL OR r.max_amount >= $1)
        AND (p.min_term IS NULL OR p.min_term <= $2)
        AND (p.max_term IS NULL OR p.max_term >= $2)
        AND r.is_active = true 
        AND p.is_active = true 
        AND b.is_active = true
        AND (r.expiry_date IS NULL OR r.expiry_date > NOW())
      ORDER BY total_rate ASC
    `;

    const rawResults = await db.execute({
      sql: query,
      args: [amount, term]
    });

    const rates = rawResults.rows.map((row: any) => ({
      bankName: row.bank_name,
      productName: row.product_name,
      baseRate: parseFloat(row.base_rate),
      loyaltyBonus: parseFloat(row.loyalty_bonus || '0'),
      totalRate: parseFloat(row.total_rate),
      minAmount: row.min_amount ? parseFloat(row.min_amount) : null,
      maxAmount: row.max_amount ? parseFloat(row.max_amount) : null,
      conditions: row.conditions
    }));

    return {
      productType: 'persoonlijke_lening',
      rates
    };
  }

  // Blog operations
  async getBlogPosts(status?: string): Promise<BlogPost[]> {
    if (status) {
      return await db.select().from(blogPostsTable)
        .where(eq(blogPostsTable.status, status as any))
        .orderBy(desc(blogPostsTable.publishDate));
    }
    return await db.select().from(blogPostsTable)
      .orderBy(desc(blogPostsTable.publishDate));
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const result = await db.select().from(blogPostsTable)
      .where(eq(blogPostsTable.slug, slug));
    return result[0];
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    const result = await db.select().from(blogPostsTable)
      .where(eq(blogPostsTable.id, id));
    return result[0];
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const result = await db.insert(blogPostsTable).values(post).returning();
    return result[0];
  }

  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const result = await db.update(blogPostsTable)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPostsTable.id, id))
      .returning();
    return result[0];
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPostsTable)
      .where(eq(blogPostsTable.id, id))
      .returning();
    return result.length > 0;
  }

  async publishBlogPost(id: string): Promise<BlogPost | undefined> {
    const result = await db.update(blogPostsTable)
      .set({ status: 'published', updatedAt: new Date() })
      .where(eq(blogPostsTable.id, id))
      .returning();
    return result[0];
  }

  async getRecentBlogPosts(sinceDate: Date): Promise<BlogPost[]> {
    return await db.select().from(blogPostsTable)
      .where(and(
        eq(blogPostsTable.status, 'published'),
        gte(blogPostsTable.publishDate, sinceDate)
      ))
      .orderBy(desc(blogPostsTable.publishDate));
  }

  // RSS Feed operations
  async getRssFeeds(): Promise<RssFeed[]> {
    return await db.select().from(rssFeedsTable)
      .where(eq(rssFeedsTable.isActive, true));
  }

  async getRssFeed(id: string): Promise<RssFeed | undefined> {
    const result = await db.select().from(rssFeedsTable)
      .where(eq(rssFeedsTable.id, id));
    return result[0];
  }

  async createRssFeed(feed: InsertRssFeed): Promise<RssFeed> {
    const result = await db.insert(rssFeedsTable).values(feed).returning();
    return result[0];
  }

  async updateRssFeed(id: string, feed: Partial<InsertRssFeed>): Promise<RssFeed | undefined> {
    const result = await db.update(rssFeedsTable)
      .set(feed)
      .where(eq(rssFeedsTable.id, id))
      .returning();
    return result[0];
  }

  async deleteRssFeed(id: string): Promise<boolean> {
    const result = await db.update(rssFeedsTable)
      .set({ isActive: false })
      .where(eq(rssFeedsTable.id, id))
      .returning();
    return result.length > 0;
  }

  async updateRssFeedFetchTime(id: string): Promise<void> {
    await db.update(rssFeedsTable)
      .set({ lastFetched: new Date() })
      .where(eq(rssFeedsTable.id, id));
  }
}