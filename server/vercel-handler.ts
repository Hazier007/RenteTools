import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes";
import { calculatorRegistry } from "../shared/calculator-registry";
import { injectSeoMeta } from "./seo-config";
import { bootstrapBankingDataIfEmpty } from "./bootstrap-data";
import { registerBlogGoneHandler, registerUnknownTopLevelHandler } from "./blog-gone-handler";

// ESM-compatible __dirname (works on Node.js 20+)
const __filename_esm = fileURLToPath(import.meta.url);
const __dirname_esm = path.dirname(__filename_esm);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'vercel-session-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Legacy URL redirects for SEO
const legacyRedirects: Record<string, string> = {
  '/de-intrest-op-mijn-spaarrekening.html': '/sparen/spaarrekening-vergelijker',
  '/intresten-rekening-courant.html': '/sparen/samengestelde-interest-berekenen',
  '/welke-interesten-krijg-ik-op-mijn-spaarrekeningen.html': '/sparen/hoogste-spaarrente-belgie',
  '/wettelijke-interesten.html': '/lenen/wettelijke-rentevoet-belgie',
  '/looif.html': '/',
};

app.use((req, res, next) => {
  const redirect = legacyRedirects[req.path];
  if (redirect) {
    return res.redirect(301, redirect);
  }
  next();
});

// 404 handler for legacy .html URLs
app.use((req, res, next) => {
  const urlPath = req.path;

  if (urlPath === '/index.html' ||
      urlPath === '/sitemap.xml' ||
      urlPath === '/news-sitemap.xml' ||
      urlPath.startsWith('/assets/') ||
      urlPath.startsWith('/static/') ||
      urlPath.includes('google') ||
      urlPath.includes('bing')) {
    return next();
  }

  if (urlPath.endsWith('.html') && urlPath.match(/^\/[a-z0-9-]+\.html$/)) {
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

// Slug-to-canonical 301 redirects
const slugToCanonical: Record<string, string> = {};
for (const calc of calculatorRegistry) {
  slugToCanonical[`/${calc.slug}`] = calc.url;
}

app.use((req, res, next) => {
  const canonical = slugToCanonical[req.path];
  if (canonical && canonical !== req.path) {
    return res.redirect(301, canonical);
  }
  next();
});

// Register API routes (registerRoutes is async but all route registrations are synchronous)
registerRoutes(app);

// Return 410 Gone for /blog/:slug when the slug is not in the DB, plus 410
// for any unknown single-segment top-level slug (catches /vastgoed-calculator
// and similar phantoms — see CMO comment ea002f53 on CAL-138). Must come
// after /api routes (so /api/* still works) and the slug-to-canonical 301
// redirect (so legitimate bare-slug calculator URLs are 301'd first), and
// before the SPA catch-all (so unknown slugs don't return a 200 shell).
// CAL-137.
registerBlogGoneHandler(app);
registerUnknownTopLevelHandler(app);

// Fire bootstrap once per cold-start. Fire-and-forget: idempotent (no-op when
// data exists), doesn't block request handling, and any error is swallowed
// because the route layer can survive on the existing data or fall back to
// MemStorage. Without this, a fresh DATABASE_URL points at empty tables and
// /api/banks returns [] until something seeds it manually (CAL-39).
bootstrapBankingDataIfEmpty().catch((error) => {
  console.error("Failed to bootstrap banking data on cold-start:", error);
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// SPA catch-all with SEO meta injection
// Static assets are served by Vercel CDN via outputDirectory
app.use("*", (req, res) => {
  try {
    // Try multiple paths for the index.html file
    const possiblePaths = [
      path.resolve(__dirname_esm, "index.html"),
      path.resolve(process.cwd(), "index.html"),
      path.resolve(process.cwd(), "dist/public/index.html"),
      path.resolve(__dirname_esm, "../dist/public/index.html"),
      path.resolve(__dirname_esm, "../../dist/public/index.html"),
    ];

    let html = "";
    for (const indexPath of possiblePaths) {
      if (fs.existsSync(indexPath)) {
        html = fs.readFileSync(indexPath, "utf-8");
        break;
      }
    }

    if (!html) {
      return res.status(500).send("Build files not found");
    }

    html = injectSeoMeta(html, req.originalUrl);
    res.set("Content-Type", "text/html").send(html);
  } catch (error) {
    console.error("Error serving HTML:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default app;
