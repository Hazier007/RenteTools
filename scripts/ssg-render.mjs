#!/usr/bin/env node
// SSG render: build a server bundle of client/src/entry-server.tsx with vite,
// then for each route in prerender-routes.json call render(url) to produce
// real <div id="root">…</div> markup. Splice that into the prebuilt
// client/index.html, then chain through server/seo-config.ts#injectSeoMeta to
// keep per-route meta tags. Output goes to .vercel/output/static so Vercel CDN
// serves SEO'd, hero-prerendered HTML straight from the edge — no Express
// function involvement on the LCP path.
//
// Replaces scripts/ssg-prerender.mjs (which only ran injectSeoMeta and left
// <div id="root"></div> empty, leaving LCP gated on React hydration).
//
// Routes that are eager-imported in App.tsx are fully SSG'd. Routes that hit
// React.lazy boundaries (calculator pages via DynamicCalculatorPage) keep the
// meta-only path for now — SSR would only render the Suspense fallback there,
// which buys nothing for LCP. Re-evaluate per-calculator SSG in a follow-up.

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const ROOT = process.cwd();
const VERCEL_STATIC = path.join(ROOT, '.vercel', 'output', 'static');
const TMP_DIR = path.join(ROOT, '.vercel', 'tmp');
const SSR_OUT_DIR = path.join(TMP_DIR, 'ssr');
const TMP_SEO_BUNDLE = path.join(TMP_DIR, 'seo-config.mjs');
const ROUTES_PATH = path.join(ROOT, 'prerender-routes.json');
const INDEX_HTML_PATH = path.join(ROOT, 'dist', 'public', 'index.html');

// Routes whose page component is eager-imported in App.tsx. These benefit
// from full renderToString — the markup ships in initial HTML and React
// hydrates over it. React.lazy routes (over-ons, privacybeleid, voorwaarden,
// contact, all calculator pages) would only SSR their Suspense fallback,
// which is just a spinner — no LCP benefit, so they stay on the meta-only
// path.
const FULL_SSG_ROUTES = new Set([
  '/',
  '/sparen',
  '/lenen',
  '/beleggen',
  '/planning',
]);

const ROOT_PLACEHOLDER = '<div id="root"></div>';

async function main() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    throw new Error(`index.html not found at ${INDEX_HTML_PATH}. Run vite build first.`);
  }
  if (!fs.existsSync(ROUTES_PATH)) {
    throw new Error(`${ROUTES_PATH} not found.`);
  }

  fs.mkdirSync(TMP_DIR, { recursive: true });
  fs.mkdirSync(VERCEL_STATIC, { recursive: true });

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

  console.log('[ssg] building SSR bundle (vite --ssr)...');
  if (fs.existsSync(SSR_OUT_DIR)) {
    fs.rmSync(SSR_OUT_DIR, { recursive: true, force: true });
  }
  execSync(
    `npx vite build --ssr src/entry-server.tsx --outDir ${JSON.stringify(SSR_OUT_DIR)} --emptyOutDir`,
    { stdio: 'inherit', cwd: ROOT },
  );
  const ssrEntry = path.join(SSR_OUT_DIR, 'entry-server.js');
  if (!fs.existsSync(ssrEntry)) {
    throw new Error(`SSR bundle missing at ${ssrEntry}`);
  }
  const { render } = await import(pathToFileURL(ssrEntry).href);
  if (typeof render !== 'function') {
    throw new Error('SSR bundle did not export render(url)');
  }

  const routes = JSON.parse(fs.readFileSync(ROUTES_PATH, 'utf8'));
  const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
  if (!baseHtml.includes(ROOT_PLACEHOLDER)) {
    throw new Error(`index.html does not contain expected ${ROOT_PLACEHOLDER}`);
  }

  console.log(`[ssg] rendering ${routes.length} routes -> ${VERCEL_STATIC}`);

  let fullCount = 0;
  let metaCount = 0;
  let fallbackCount = 0;

  for (const route of routes) {
    let html;
    if (FULL_SSG_ROUTES.has(route)) {
      try {
        const appHtml = render(route);
        html = baseHtml.replace(
          ROOT_PLACEHOLDER,
          `<div id="root">${appHtml}</div>`,
        );
        html = injectSeoMeta(html, route);
        fullCount++;
      } catch (err) {
        console.warn(`[ssg] full SSR failed for ${route}, falling back to meta-only:`, err.message);
        html = injectSeoMeta(baseHtml, route);
        fallbackCount++;
      }
    } else {
      html = injectSeoMeta(baseHtml, route);
      metaCount++;
    }

    const outPath =
      route === '/'
        ? path.join(VERCEL_STATIC, 'index.html')
        : path.join(VERCEL_STATIC, route.replace(/^\//, ''), 'index.html');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, 'utf8');
  }

  console.log(
    `[ssg] done — ${fullCount} full SSR, ${metaCount} meta-only, ${fallbackCount} fell back`,
  );
}

main().catch((err) => {
  console.error('[ssg] render failed:', err);
  process.exit(1);
});
