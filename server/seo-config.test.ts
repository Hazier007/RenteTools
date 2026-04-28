import { describe, it, expect } from 'vitest';
import {
  injectSeoMeta,
  getSeoConfigForUrl,
  generateFallbackSeo,
} from './seo-config';

const baseHtml = `<!DOCTYPE html>
<html lang="nl-BE">
  <head>
    <title>Interesten.be - Belgische Financiele Calculators | Sparen, Lenen &amp; Beleggen</title>
    <meta name="description" content="Default" />
  </head>
  <body><div id="root"></div></body>
</html>`;

function extractTitle(html: string): string {
  const m = html.match(/<title>([^<]*)<\/title>/);
  return m ? m[1] : '';
}

describe('CAL-158 duplicate-title prevention', () => {
  it('legacy last-segment match (/blog/sparen) does NOT inherit /sparen title', () => {
    const a = extractTitle(injectSeoMeta(baseHtml, '/sparen'));
    const b = extractTitle(injectSeoMeta(baseHtml, '/blog/sparen'));
    expect(a).not.toEqual(b);
    expect(a.length).toBeGreaterThan(0);
    expect(b.length).toBeGreaterThan(0);
  });

  it('phantom URL (/vastgoed-calculator) gets a unique fallback title, not the static default', () => {
    const phantomTitle = extractTitle(injectSeoMeta(baseHtml, '/vastgoed-calculator'));
    const homeTitle = extractTitle(injectSeoMeta(baseHtml, '/'));
    const defaultStatic = extractTitle(baseHtml);
    expect(phantomTitle).not.toEqual(defaultStatic);
    expect(phantomTitle).not.toEqual(homeTitle);
    expect(phantomTitle).toMatch(/Vastgoed Calculator/);
  });

  it('two unrelated phantom URLs receive different titles', () => {
    const t1 = extractTitle(injectSeoMeta(baseHtml, '/foo-bar'));
    const t2 = extractTitle(injectSeoMeta(baseHtml, '/baz-qux'));
    expect(t1).not.toEqual(t2);
  });

  it('known canonical paths still resolve to their configured SEO titles', () => {
    const home = getSeoConfigForUrl('/');
    expect(home).not.toBeNull();
    expect(home!.metaTitle).toMatch(/Hoogste Spaarrente/);

    const fire = getSeoConfigForUrl('/planning/fire-calculator');
    expect(fire).not.toBeNull();
    expect(fire!.metaTitle).toMatch(/FIRE Calculator/);

    const etf = getSeoConfigForUrl('/beleggen/etf-calculator');
    expect(etf).not.toBeNull();
    expect(etf!.metaTitle).toMatch(/ETF Calculator/);
  });

  it('non-canonical paths (/blog/<x>, /sparen/sparen, unknown) return null SEO config', () => {
    expect(getSeoConfigForUrl('/blog/sparen')).toBeNull();
    expect(getSeoConfigForUrl('/sparen/sparen')).toBeNull();
    expect(getSeoConfigForUrl('/lenen/lenen')).toBeNull();
    expect(getSeoConfigForUrl('/vastgoed-calculator')).toBeNull();
    expect(getSeoConfigForUrl('/random/foo/bar')).toBeNull();
  });

  it('trailing slash and query string normalize correctly', () => {
    expect(getSeoConfigForUrl('/sparen/')).not.toBeNull();
    expect(getSeoConfigForUrl('/sparen?utm_source=foo')).not.toBeNull();
  });

  it('fallback titles are unique across a representative phantom set', () => {
    const phantoms = [
      '/vastgoed-calculator',
      '/blog/sparen',
      '/blog/lenen',
      '/blog/random-post',
      '/sparen/sparen',
      '/lenen/lenen',
      '/old-page',
      '/another/old/path',
    ];
    const titles = phantoms.map((p) => extractTitle(injectSeoMeta(baseHtml, p)));
    const unique = new Set(titles);
    expect(unique.size).toEqual(phantoms.length);
  });

  it('generateFallbackSeo prepends prettified last segment', () => {
    const fb = generateFallbackSeo('/some-thing/with-dashes');
    expect(fb.metaTitle).toMatch(/^With Dashes/);
    expect(fb.metaTitle).toMatch(/Interesten\.be$/);
  });
});
