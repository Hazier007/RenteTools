#!/usr/bin/env node
// Post-build step: bake /lenen calculator list into the prerendered
// /lenen/index.html so crawlers (Bing in particular) see real content
// instead of an empty SPA shell. CAL-137 / parent CAL-133.
//
// Why a post-build step instead of fixing SSR: LenenPage is `lazy(...)` in
// App.tsx (route-level code splitting from CAL-102). renderToString on /lenen
// only resolves the Suspense fallback (a spinner), so the prerendered HTML
// never contains the calculator list. Eager-importing LenenPage would regress
// CAL-102's bundle splits. Baking the list as <noscript> + a hidden <aside>
// keeps the runtime untouched and avoids hydration interference for users.
//
// Output is two crawler-visible blocks injected before </body>:
//   - <noscript> mirror — read by crawlers that respect noscript-only content
//     (and by clients with JS disabled).
//   - <aside hidden> — visible in source HTML for crawlers that parse all
//     elements regardless of `hidden`, but not rendered for users.
//
// AC (from CAL-137):
//   curl -s <preview>/lenen | grep -c '<a [^>]*href="/lenen/' >= 12
//   raw body word count >= 200

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const ROOT = process.cwd();
const STATIC_DIR = path.join(ROOT, '.vercel', 'output', 'static');
const LENEN_HTML_PATH = path.join(STATIC_DIR, 'lenen', 'index.html');
const TMP_DIR = path.join(ROOT, '.vercel', 'tmp');
const TMP_SEO_BUNDLE = path.join(TMP_DIR, 'calculator-seo-config.mjs');

const CATEGORY_INTRO = `<p>
  Een lening afsluiten in België vraagt om een goede vergelijking van rentevoeten,
  maandlasten en bijkomende kosten. Of u nu een hypothecaire lening voor uw eerste
  woning bekijkt, een autolening simuleert of de impact van schuldenconsolidatie
  wilt doorrekenen — onze gratis rekentools geven u meteen een realistisch beeld.
  Alle calculators zijn afgestemd op de Belgische markt: ze houden rekening met
  de wettelijke rentevoet, de 33%-regel voor maandlasten, registratierechten en
  notariskosten bij hypotheken, en de typische tarieven van Belgische banken voor
  consumenten- en autoleningen. Vergelijk hieronder de beschikbare lening
  calculators en kies de tool die past bij uw situatie.
</p>`;

async function main() {
  if (!fs.existsSync(LENEN_HTML_PATH)) {
    throw new Error(`[lenen-bake] ${LENEN_HTML_PATH} not found. Run scripts/ssg-render.mjs first.`);
  }

  fs.mkdirSync(TMP_DIR, { recursive: true });

  console.log('[lenen-bake] bundling client/src/seo/calculatorSeoConfig.ts for build-time use...');
  execSync(
    `npx esbuild client/src/seo/calculatorSeoConfig.ts --bundle --platform=node --format=esm --outfile=${JSON.stringify(TMP_SEO_BUNDLE)}`,
    { stdio: 'inherit', cwd: ROOT },
  );

  const seoMod = await import(pathToFileURL(TMP_SEO_BUNDLE).href);
  const { calculatorSeoConfigs, calculatorsByCategory } = seoMod;
  if (!calculatorSeoConfigs || !calculatorsByCategory) {
    throw new Error('[lenen-bake] bundled module missing calculatorSeoConfigs / calculatorsByCategory');
  }

  const lenenSlugs = calculatorsByCategory.Lenen || [];
  if (lenenSlugs.length < 12) {
    throw new Error(`[lenen-bake] expected at least 12 Lenen calculators, found ${lenenSlugs.length}`);
  }

  const items = lenenSlugs
    .map((slug) => {
      const cfg = calculatorSeoConfigs[slug];
      if (!cfg) return null;
      return {
        slug,
        title: cfg.pageTitle || cfg.breadcrumbTitle || slug,
        description: cfg.metaDescription || '',
      };
    })
    .filter(Boolean);

  console.log(`[lenen-bake] baking ${items.length} Lenen calculator items into /lenen/index.html`);

  const listItems = items
    .map(
      (item) => `      <li>
        <a href="/lenen/${escapeHtmlAttr(item.slug)}">
          <strong>${escapeHtml(item.title)}</strong>
          <span> — ${escapeHtml(item.description)}</span>
        </a>
      </li>`,
    )
    .join('\n');

  const sharedSection = `<h2>Lening Calculators voor België</h2>
    ${CATEGORY_INTRO}
    <h3>Beschikbare lening calculators</h3>
    <ul>
${listItems}
    </ul>`;

  const fallbackBlock = `
<noscript>
  <section aria-label="Lening calculators voor België (noscript)">
    ${sharedSection}
  </section>
</noscript>
<aside id="lenen-seo-fallback" aria-label="Lening calculators voor België" hidden>
  ${sharedSection}
</aside>
`;

  let html = fs.readFileSync(LENEN_HTML_PATH, 'utf8');

  if (html.includes('id="lenen-seo-fallback"')) {
    console.log('[lenen-bake] /lenen/index.html already baked, skipping');
    return;
  }

  if (!html.includes('</body>')) {
    throw new Error('[lenen-bake] /lenen/index.html has no </body> tag — cannot inject');
  }

  html = html.replace('</body>', `${fallbackBlock}</body>`);
  fs.writeFileSync(LENEN_HTML_PATH, html, 'utf8');

  const linkCount = (html.match(/href="\/lenen\//g) || []).length;
  const wordCount = countWords(extractBody(html));
  console.log(`[lenen-bake] done — /lenen/ link count: ${linkCount}, body word count: ${wordCount}`);

  if (linkCount < 12) {
    throw new Error(`[lenen-bake] AC failed: expected ≥12 /lenen/ links, got ${linkCount}`);
  }
  if (wordCount < 200) {
    throw new Error(`[lenen-bake] AC failed: expected ≥200 words, got ${wordCount}`);
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeHtmlAttr(s) {
  return escapeHtml(s);
}

function extractBody(html) {
  const m = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return m ? m[1] : html;
}

function countWords(s) {
  const stripped = s.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
  return stripped.split(/\s+/).filter(Boolean).length;
}

main().catch((err) => {
  console.error('[lenen-bake] failed:', err);
  process.exit(1);
});
