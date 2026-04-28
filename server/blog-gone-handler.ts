import type { Express } from "express";
import { storage } from "./storage";

const GONE_HTML = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Artikel niet meer beschikbaar | Interesten.be</title>
  <meta name="robots" content="noindex">
  <meta name="description" content="Dit artikel is niet langer beschikbaar op Interesten.be. Bekijk onze actuele rekentools en gidsen voor sparen, lenen, beleggen en planning.">
  <link rel="canonical" href="https://interesten.be/blog">
  <style>
    body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; max-width: 720px; margin: 0 auto; padding: 48px 24px; line-height: 1.6; color: #1f2937; }
    h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
    .subtitle { color: #6b7280; margin-bottom: 2rem; }
    .links { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-top: 24px; }
    .links a { display: block; padding: 12px 16px; background: #f3f4f6; border-radius: 8px; text-decoration: none; color: #2563eb; font-weight: 500; }
    .links a:hover { background: #e5e7eb; }
  </style>
</head>
<body>
  <h1>Dit artikel is niet meer beschikbaar</h1>
  <p class="subtitle">410 Gone &middot; Interesten.be</p>
  <p>
    Het blogartikel dat u zocht is verwijderd of werd nooit gepubliceerd op Interesten.be.
    Onze redactie houdt het blog actueel, dus oudere of niet-gepubliceerde URL's blijven niet bewaard.
  </p>
  <p>
    U vindt actuele inhoud over rentevoeten, hypotheken, spaarrekeningen en beleggen via onderstaande secties:
  </p>
  <div class="links">
    <a href="/blog">Blog overzicht</a>
    <a href="/sparen">Sparen calculators</a>
    <a href="/lenen">Lenen calculators</a>
    <a href="/beleggen">Beleggen calculators</a>
    <a href="/planning">Financi&euml;le planning</a>
    <a href="/">Homepage</a>
  </div>
</body>
</html>`;

export function registerBlogGoneHandler(app: Express): void {
  app.get('/blog/:slug', async (req, res, next) => {
    const slug = req.params.slug;
    if (!slug || slug === 'index.html') {
      return next();
    }
    try {
      const post = await storage.getBlogPost(slug);
      if (!post) {
        return res
          .status(410)
          .type('text/html')
          .set('Cache-Control', 'public, max-age=300, s-maxage=3600')
          .send(GONE_HTML);
      }
      return next();
    } catch (error) {
      console.error(`[blog-gone] storage.getBlogPost failed for slug="${slug}":`, error);
      return next();
    }
  });
}
