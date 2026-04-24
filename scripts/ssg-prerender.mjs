#!/usr/bin/env node
// SSG prerender: runs server/seo-config.ts#injectSeoMeta at build time
// for every route in prerender-routes.json and writes static per-route
// index.html into .vercel/output/static. Vercel CDN then serves these
// directly without invoking the Express function for crawler/LCP paths.
//
// This replaces the Puppeteer-based scripts/prerender.mjs for the SSG path:
// it is ~60x faster (no browser), deterministic, and needs no chromium.
// Puppeteer prerender is still kept for the optional fully-hydrated output.

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const ROOT = process.cwd();
const DIST_STATIC = path.join(ROOT, '.vercel', 'output', 'static');
const TMP_DIR = path.join(ROOT, '.vercel', 'tmp');
const TMP_SEO_BUNDLE = path.join(TMP_DIR, 'seo-config.mjs');
const ROUTES_PATH = path.join(ROOT, 'prerender-routes.json');
const INDEX_HTML_PATH = path.join(ROOT, 'dist', 'public', 'index.html');

async function main() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    throw new Error(`index.html not found at ${INDEX_HTML_PATH}. Run vite build first.`);
  }
  if (!fs.existsSync(ROUTES_PATH)) {
    throw new Error(`${ROUTES_PATH} not found.`);
  }

  fs.mkdirSync(TMP_DIR, { recursive: true });
  fs.mkdirSync(DIST_STATIC, { recursive: true });

  console.log('[ssg] bundling server/seo-config.ts for build-time use...');
  execSync(
    `npx esbuild server/seo-config.ts --bundle --platform=node --format=esm --outfile=${JSON.stringify(TMP_SEO_BUNDLE)}`,
    { stdio: 'inherit', cwd: ROOT },
  );

  const seoMod = await import(pathToFileURL(TMP_SEO_BUNDLE).href);
  const { injectSeoMeta } = seoMod;
  if (typeof injectSeoMeta !== 'function') {
    throw new Error('Bundled seo-config did not export injectSeoMeta');
  }

  const routes = JSON.parse(fs.readFileSync(ROUTES_PATH, 'utf8'));
  const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');

  console.log(`[ssg] prerendering ${routes.length} routes -> ${DIST_STATIC}`);

  let written = 0;
  for (const route of routes) {
    const html = injectSeoMeta(baseHtml, route);
    const outPath =
      route === '/'
        ? path.join(DIST_STATIC, 'index.html')
        : path.join(DIST_STATIC, route.replace(/^\//, ''), 'index.html');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, 'utf8');
    written += 1;
  }

  console.log(`[ssg] wrote ${written} prerendered HTML files`);
}

main().catch((err) => {
  console.error('[ssg] prerender failed:', err);
  process.exit(1);
});
