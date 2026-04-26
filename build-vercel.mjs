#!/usr/bin/env node
/**
 * Build script for Vercel deployment using Build Output API v3.
 *
 * This pre-bundles the API serverless function with esbuild
 * so Vercel's ncc doesn't need to resolve path aliases.
 *
 * Usage: node build-vercel.mjs
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, '.vercel', 'output');

console.log('=== Vercel Build Output API v3 ===\n');

// Step 1: Clean previous output
if (fs.existsSync(OUTPUT)) {
  fs.rmSync(OUTPUT, { recursive: true });
}

// Step 2: Build frontend with Vite
console.log('[1/5] Building frontend with Vite...');
execSync('npx vite build', { stdio: 'inherit', cwd: ROOT });

// Step 3: Bundle API function with esbuild (resolves all path aliases)
console.log('\n[2/5] Bundling API function with esbuild...');
execSync(
  `npx esbuild server/vercel-handler.ts --bundle --platform=node --format=esm --outfile=.vercel/output/functions/api.func/index.mjs --banner:js="import{createRequire}from'module';const require=createRequire(import.meta.url);"`,
  { stdio: 'inherit', cwd: ROOT }
);

// Step 4: Create function config
console.log('[3/5] Setting up Build Output structure...');

// Function .vc-config.json
fs.writeFileSync(
  path.join(OUTPUT, 'functions', 'api.func', '.vc-config.json'),
  JSON.stringify({
    runtime: 'nodejs20.x',
    handler: 'index.mjs',
    launcherType: 'Nodejs',
    maxDuration: 30
  }, null, 2)
);

// Copy index.html into the function directory so it can read it at runtime
const indexHtmlSrc = path.join(ROOT, 'dist', 'public', 'index.html');
const indexHtmlDest = path.join(OUTPUT, 'functions', 'api.func', 'index.html');
if (fs.existsSync(indexHtmlSrc)) {
  fs.copyFileSync(indexHtmlSrc, indexHtmlDest);
  console.log('   Copied index.html into function directory');
}

// Step 5: Copy static files
const staticDir = path.join(OUTPUT, 'static');
fs.mkdirSync(staticDir, { recursive: true });

// Copy dist/public contents to static/
const publicDir = path.join(ROOT, 'dist', 'public');
copyDirRecursive(publicDir, staticDir);
console.log('   Copied static assets');

// Step 5b: Prerender all routes from prerender-routes.json into static/
// Eager routes (home, /sparen, /lenen, /beleggen, /planning, etc.) get a
// full React renderToString into <div id="root">…</div> so the hero markup
// reaches the browser as initial HTML — closes the LCP gate that
// injectSeoMeta-only could not move past CAL-47. Calculator routes still
// get meta-only prerender because they hit React.lazy boundaries.
console.log('\n[4/5] Prerendering routes via SSG render-to-string...');
execSync('node scripts/ssg-render.mjs', { stdio: 'inherit', cwd: ROOT });

// Step 6: Create config.json (routing)
// Filesystem handler picks up the prerendered /<route>/index.html files;
// anything not prerendered (e.g. /api/*, blog posts, admin) falls through
// to the Express function.
const config = {
  version: 3,
  routes: [
    // Cache immutable assets (hashed filenames)
    {
      src: '/assets/(.*)',
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
      continue: true
    },
    // Cache images
    {
      src: '/(.*)\\.png',
      headers: { 'Cache-Control': 'public, max-age=86400' },
      continue: true
    },
    {
      src: '/(.*)\\.ico',
      headers: { 'Cache-Control': 'public, max-age=86400' },
      continue: true
    },
    // Short cache on prerendered HTML so stale /<year>/<month> labels get
    // refreshed on next deploy without needing a full purge.
    {
      src: '/(.*)\\.html',
      headers: { 'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400' },
      continue: true
    },
    // Try serving static files first (picks up prerendered /<route>/index.html)
    { handle: 'filesystem' },
    // Everything else goes to the API function
    { src: '/(.*)', dest: '/api' }
  ]
};

fs.writeFileSync(
  path.join(OUTPUT, 'config.json'),
  JSON.stringify(config, null, 2)
);

console.log('\n[5/5] Build Output structure created!');
console.log(`   Output: ${OUTPUT}`);
console.log('   Deploy with: vercel deploy --prebuilt --prod\n');

// Helper function
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
