import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import fs from "fs";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { calculatorRegistry } from "../shared/calculator-registry";
import { injectSeoMeta } from "./seo-config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Validate SESSION_SECRET in production
if (process.env.NODE_ENV === 'production' && !process.env.SESSION_SECRET) {
  console.error('FATAL ERROR: SESSION_SECRET environment variable is required in production');
  process.exit(1);
}

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Legacy URL redirects for SEO - must be before catch-all handler
const legacyRedirects: Record<string, string> = {
  '/de-intrest-op-mijn-spaarrekening.html': '/sparen/spaarrekening-vergelijker',
  '/intresten-rekening-courant.html': '/sparen/samengestelde-interest-berekenen',
  '/welke-interesten-krijg-ik-op-mijn-spaarrekeningen.html': '/sparen/hoogste-spaarrente-belgie',
  '/wettelijke-interesten.html': '/lenen/wettelijke-rentevoet-belgie',
  '/looif.html': '/', // No equivalent, redirect to home
};

// 301 Redirect handler for legacy URLs
app.use((req, res, next) => {
  const redirect = legacyRedirects[req.path];
  if (redirect) {
    return res.redirect(301, redirect);
  }
  next();
});

// 404 handler for legacy .html URLs that weren't redirected
// Only targets paths that look like old-style page URLs, not legitimate files
app.use((req, res, next) => {
  const path = req.path;
  
  // Skip legitimate .html files and XML sitemaps
  // Note: Be specific - only skip actual sitemap.xml and news-sitemap.xml, not sitemap.html
  if (path === '/index.html' || 
      path === '/sitemap.xml' ||
      path === '/news-sitemap.xml' ||
      path.startsWith('/assets/') || 
      path.startsWith('/static/') ||
      path.includes('google') ||
      path.includes('bing')) {
    return next();
  }
  
  // Only 404 for .html files that look like legacy page URLs
  // Pattern: /some-slug-here.html (lowercase, with dashes, at root level)
  if (path.endsWith('.html') && path.match(/^\/[a-z0-9-]+\.html$/)) {
    return res.status(404).send(`
      <!DOCTYPE html>
      <html lang="nl">
      <head>
        <meta charset="UTF-8">
        <title>Pagina niet gevonden - Interesten.be</title>
        <meta name="robots" content="noindex">
        <style>
          body { font-family: system-ui; text-align: center; padding: 50px; }
          h1 { color: #333; }
          a { color: #0066cc; }
        </style>
      </head>
      <body>
        <h1>404 - Pagina niet gevonden</h1>
        <p>De pagina die u zoekt bestaat niet of is verplaatst.</p>
        <p><a href="/">Ga naar de homepage</a></p>
      </body>
      </html>
    `);
  }
  
  next();
});

// Generate slug-to-canonical redirect map from calculator registry
const slugToCanonical: Record<string, string> = {};
for (const calc of calculatorRegistry) {
  // Map /slug to /category/slug (e.g., /kasbon-calculator → /sparen/kasbon-calculator)
  slugToCanonical[`/${calc.slug}`] = calc.url;
}

// 301 Redirect handler for non-canonical calculator URLs
app.use((req, res, next) => {
  const canonical = slugToCanonical[req.path];
  if (canonical && canonical !== req.path) {
    return res.redirect(301, canonical);
  }
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    const distPath = path.resolve(import.meta.dirname, "public");
    
    app.use(express.static(distPath));
    
    app.use("*", (req, res) => {
      const urlPath = req.originalUrl.split('?')[0];
      
      // Check for pre-rendered HTML at /route/index.html
      const prerenderedPath = path.join(distPath, urlPath, "index.html");
      
      let html: string;
      if (fs.existsSync(prerenderedPath)) {
        // Serve pre-rendered HTML (already has full content)
        html = fs.readFileSync(prerenderedPath, "utf-8");
      } else {
        // Fallback to root index.html with SEO meta injection
        const indexPath = path.resolve(distPath, "index.html");
        html = fs.readFileSync(indexPath, "utf-8");
        html = injectSeoMeta(html, req.originalUrl);
      }
      
      res.set("Content-Type", "text/html").send(html);
    });
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
