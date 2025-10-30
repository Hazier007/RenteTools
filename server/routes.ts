import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { 
  spaarrenteCalculationSchema, 
  samengesteldeRenteSchema, 
  hypotheekCalculationSchema,
  insertBankSchema,
  insertProductSchema,
  insertRateSchema,
  insertBlogPostSchema,
  insertRssFeedSchema
} from "@shared/schema";
import { storage } from "./storage";
import { submitToIndexNow, submitAllCalculators, ALL_CALCULATOR_URLS } from "./indexnow";
import { blogAutomationService } from "./services/blog-automation";
import { requireAdmin } from "./middleware/auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.role = user.role;

      res.json({ 
        success: true,
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/session", async (req, res) => {
    if (req.session.userId) {
      res.json({
        authenticated: true,
        user: {
          id: req.session.userId,
          username: req.session.username,
          role: req.session.role
        }
      });
    } else {
      res.json({ authenticated: false });
    }
  });

  // Spaarrente calculation endpoint
  app.post("/api/calculate/spaarrente", async (req, res) => {
    try {
      const data = spaarrenteCalculationSchema.parse(req.body);
      
      // Calculation logic would be implemented here
      // For now, return a simple response
      const result = {
        eindbedrag: data.startbedrag * Math.pow(1 + data.rente / 100, data.looptijd),
        totaleInterest: 0,
        inbreng: data.startbedrag,
        yearlyBreakdown: []
      };
      
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid input data" });
    }
  });

  // Samengestelde rente calculation endpoint
  app.post("/api/calculate/samengestelde-rente", async (req, res) => {
    try {
      const data = samengesteldeRenteSchema.parse(req.body);
      
      const samengesteld = data.kapitaal * Math.pow(1 + data.rendement / 100 / data.frequentie, data.frequentie * data.termijn);
      const enkelvoudig = data.kapitaal + (data.kapitaal * data.rendement / 100 * data.termijn);
      
      const result = {
        samengesteld,
        enkelvoudig,
        verschil: samengesteld - enkelvoudig,
        comparison: []
      };
      
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid input data" });
    }
  });

  // Hypotheek calculation endpoint
  app.post("/api/calculate/hypotheek", async (req, res) => {
    try {
      const data = hypotheekCalculationSchema.parse(req.body);
      
      const maandRente = data.rentevoet / 100 / 12;
      const aantalMaanden = data.looptijd * 12;
      
      const maandelijksBedrag = (data.leningsbedrag * maandRente * Math.pow(1 + maandRente, aantalMaanden)) / 
                               (Math.pow(1 + maandRente, aantalMaanden) - 1);
      
      const result = {
        maandelijksBedrag,
        totaalBetaald: maandelijksBedrag * aantalMaanden,
        totaleInterest: (maandelijksBedrag * aantalMaanden) - data.leningsbedrag,
        kapitaalDeel: 0,
        interestDeel: 0,
        kapitaalPercentage: 0,
        interestPercentage: 0
      };
      
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid input data" });
    }
  });

  // Banking API Routes
  
  // Banks endpoints
  app.get("/api/banks", async (req, res) => {
    try {
      const banks = await storage.getBanks();
      res.json(banks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch banks" });
    }
  });

  app.get("/api/banks/:id", async (req, res) => {
    try {
      const bank = await storage.getBank(req.params.id);
      if (!bank) {
        return res.status(404).json({ error: "Bank not found" });
      }
      res.json(bank);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bank" });
    }
  });

  app.get("/api/banks/:id/products", async (req, res) => {
    try {
      const bankWithProducts = await storage.getBankWithProducts(req.params.id);
      if (!bankWithProducts) {
        return res.status(404).json({ error: "Bank not found" });
      }
      res.json(bankWithProducts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bank with products" });
    }
  });

  app.post("/api/banks", async (req, res) => {
    try {
      const data = insertBankSchema.parse(req.body);
      const bank = await storage.createBank(data);
      res.status(201).json(bank);
    } catch (error: any) {
      if (error.issues) {
        res.status(400).json({ error: "Validation error", details: error.issues });
      } else {
        res.status(500).json({ error: "Failed to create bank" });
      }
    }
  });

  app.put("/api/banks/:id", async (req, res) => {
    try {
      const data = insertBankSchema.partial().parse(req.body);
      const bank = await storage.updateBank(req.params.id, data);
      if (!bank) {
        return res.status(404).json({ error: "Bank not found" });
      }
      res.json(bank);
    } catch (error: any) {
      if (error.issues) {
        res.status(400).json({ error: "Validation error", details: error.issues });
      } else {
        res.status(500).json({ error: "Failed to update bank" });
      }
    }
  });

  app.delete("/api/banks/:id", async (req, res) => {
    try {
      const success = await storage.deleteBank(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Bank not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete bank" });
    }
  });

  // Products endpoints
  app.get("/api/products", async (req, res) => {
    try {
      const { type, bankId } = req.query;
      let products;
      
      if (type) {
        products = await storage.getProductsByType(type as string);
      } else if (bankId) {
        products = await storage.getProductsByBank(bankId as string);
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.get("/api/products/:id/details", async (req, res) => {
    try {
      const productDetails = await storage.getProductWithDetails(req.params.id);
      if (!productDetails) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(productDetails);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product details" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const data = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(data);
      res.status(201).json(product);
    } catch (error: any) {
      if (error.issues) {
        res.status(400).json({ error: "Validation error", details: error.issues });
      } else {
        res.status(500).json({ error: "Failed to create product" });
      }
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const data = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(req.params.id, data);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      if (error.issues) {
        res.status(400).json({ error: "Validation error", details: error.issues });
      } else {
        res.status(500).json({ error: "Failed to update product" });
      }
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const success = await storage.deleteProduct(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Rates endpoints
  app.get("/api/rates", async (req, res) => {
    try {
      const { productId } = req.query;
      let rates;
      
      if (productId) {
        rates = await storage.getRatesByProduct(productId as string);
      } else {
        rates = await storage.getRates();
      }
      
      res.json(rates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch rates" });
    }
  });

  app.get("/api/rates/:id", async (req, res) => {
    try {
      const rate = await storage.getRate(req.params.id);
      if (!rate) {
        return res.status(404).json({ error: "Rate not found" });
      }
      res.json(rate);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch rate" });
    }
  });

  app.post("/api/rates", async (req, res) => {
    try {
      const data = insertRateSchema.parse(req.body);
      const rate = await storage.createRate(data);
      res.status(201).json(rate);
    } catch (error: any) {
      if (error.issues) {
        res.status(400).json({ error: "Validation error", details: error.issues });
      } else {
        res.status(500).json({ error: "Failed to create rate" });
      }
    }
  });

  app.put("/api/rates/:id", async (req, res) => {
    try {
      const data = insertRateSchema.partial().parse(req.body);
      const rate = await storage.updateRate(req.params.id, data);
      if (!rate) {
        return res.status(404).json({ error: "Rate not found" });
      }
      res.json(rate);
    } catch (error: any) {
      if (error.issues) {
        res.status(400).json({ error: "Validation error", details: error.issues });
      } else {
        res.status(500).json({ error: "Failed to update rate" });
      }
    }
  });

  app.delete("/api/rates/:id", async (req, res) => {
    try {
      const success = await storage.deleteRate(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Rate not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete rate" });
    }
  });

  // Rate comparison endpoints
  app.get("/api/compare/savings", async (req, res) => {
    try {
      const { minAmount, maxAmount } = req.query;
      const comparison = await storage.compareSavingsRates(
        minAmount ? parseFloat(minAmount as string) : undefined,
        maxAmount ? parseFloat(maxAmount as string) : undefined
      );
      res.json(comparison);
    } catch (error) {
      res.status(500).json({ error: "Failed to compare savings rates" });
    }
  });

  app.get("/api/compare/mortgage", async (req, res) => {
    try {
      const { amount, term } = req.query;
      if (!amount || !term) {
        return res.status(400).json({ error: "Amount and term are required" });
      }
      
      const comparison = await storage.compareMortgageRates(
        parseFloat(amount as string),
        parseInt(term as string)
      );
      res.json(comparison);
    } catch (error) {
      res.status(500).json({ error: "Failed to compare mortgage rates" });
    }
  });

  app.get("/api/compare/personal-loans", async (req, res) => {
    try {
      const { amount, term } = req.query;
      if (!amount || !term) {
        return res.status(400).json({ error: "Amount and term are required" });
      }
      
      const comparison = await storage.comparePersonalLoanRates(
        parseFloat(amount as string),
        parseInt(term as string)
      );
      res.json(comparison);
    } catch (error) {
      res.status(500).json({ error: "Failed to compare personal loan rates" });
    }
  });

  app.get("/api/rates/by-type/:type", async (req, res) => {
    try {
      const comparison = await storage.getCurrentRatesByType(req.params.type);
      res.json(comparison);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch rates by type" });
    }
  });

  // IndexNow routes
  app.post("/api/indexnow/submit", async (req, res) => {
    try {
      const { urls } = req.body;
      
      if (!urls || !Array.isArray(urls)) {
        return res.status(400).json({ error: "URLs array is required" });
      }

      const result = await submitToIndexNow(urls);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to submit to IndexNow" });
    }
  });

  app.post("/api/indexnow/submit-all", async (req, res) => {
    try {
      const result = await submitAllCalculators();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to submit all calculators" });
    }
  });

  app.get("/api/indexnow/urls", async (req, res) => {
    res.json({ 
      urls: ALL_CALCULATOR_URLS,
      count: ALL_CALCULATOR_URLS.length 
    });
  });

  // Blog automation routes
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const status = req.query.status as string | undefined;
      const posts = await storage.getBlogPosts(status);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog/posts", requireAdmin, async (req, res) => {
    try {
      const data = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(data);
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid blog post data" });
    }
  });

  app.patch("/api/blog/posts/:id", requireAdmin, async (req, res) => {
    try {
      const post = await storage.updateBlogPost(req.params.id, req.body);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/blog/posts/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteBlogPost(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  app.post("/api/blog/posts/:id/publish", requireAdmin, async (req, res) => {
    try {
      const post = await storage.publishBlogPost(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to publish blog post" });
    }
  });

  // RSS Feed routes
  app.get("/api/rss/feeds", async (req, res) => {
    try {
      const feeds = await storage.getRssFeeds();
      res.json(feeds);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch RSS feeds" });
    }
  });

  app.post("/api/rss/feeds", requireAdmin, async (req, res) => {
    try {
      const data = insertRssFeedSchema.parse(req.body);
      const feed = await storage.createRssFeed(data);
      res.json(feed);
    } catch (error) {
      res.status(400).json({ error: "Invalid RSS feed data" });
    }
  });

  app.patch("/api/rss/feeds/:id", requireAdmin, async (req, res) => {
    try {
      const feed = await storage.updateRssFeed(req.params.id, req.body);
      if (!feed) {
        return res.status(404).json({ error: "RSS feed not found" });
      }
      res.json(feed);
    } catch (error) {
      res.status(500).json({ error: "Failed to update RSS feed" });
    }
  });

  app.delete("/api/rss/feeds/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteRssFeed(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "RSS feed not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete RSS feed" });
    }
  });

  // Blog automation trigger routes
  app.post("/api/blog/automation/fetch-rss", requireAdmin, async (req, res) => {
    try {
      await blogAutomationService.fetchRSSFeeds();
      res.json({ success: true, message: "RSS feeds fetched and processed" });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to fetch RSS feeds" });
    }
  });

  app.post("/api/blog/automation/publish-pending", requireAdmin, async (req, res) => {
    try {
      await blogAutomationService.publishPendingPosts();
      res.json({ success: true, message: "Pending posts published" });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to publish pending posts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
