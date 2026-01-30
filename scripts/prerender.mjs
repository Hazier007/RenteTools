#!/usr/bin/env node
/**
 * Static Site Pre-renderer for Interesten.be
 * 
 * This script pre-renders all routes to static HTML for SEO optimization.
 * It uses Puppeteer to visit each page and capture the rendered HTML.
 * 
 * Usage: node scripts/prerender.mjs
 * 
 * Prerequisites:
 * - Run `npm run build` first to generate the Vite build
 * - Have chromium installed (via nix or system package)
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist', 'public');

// Find chromium executable
function findChromium() {
  const paths = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    '/nix/store/*/bin/chromium',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome'
  ];
  
  try {
    const nixPath = execSync('which chromium 2>/dev/null').toString().trim();
    if (nixPath) return nixPath;
  } catch (e) {}
  
  for (const p of paths) {
    if (p && fs.existsSync(p)) return p;
  }
  
  throw new Error('Chromium not found. Install via: nix-env -iA nixpkgs.chromium');
}

// Load routes from prerender-routes.json (always regenerate to ensure freshness)
function loadRoutes() {
  console.log('Generating routes from calculatorSeoConfig...');
  execSync('node scripts/generate-routes.cjs', { cwd: rootDir, stdio: 'inherit' });
  const routesPath = path.join(rootDir, 'prerender-routes.json');
  return JSON.parse(fs.readFileSync(routesPath, 'utf8'));
}

// Start a simple static server for the dist folder
async function startServer(port) {
  const express = (await import('express')).default;
  const app = express();
  
  // Serve static files
  app.use(express.static(distDir));
  
  // SPA fallback - serve index.html for all routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
  
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Static server running on http://localhost:${port}`);
      resolve(server);
    });
    
    server.on('error', reject);
  });
}

// Pre-render a single route
async function prerenderRoute(browser, baseUrl, route) {
  const page = await browser.newPage();
  
  try {
    const url = `${baseUrl}${route}`;
    console.log(`  Rendering: ${route}`);
    
    // Navigate and wait for network idle
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Wait a bit more for React to fully render
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get the rendered HTML
    const html = await page.content();
    
    // Determine output path
    let outputPath;
    if (route === '/') {
      outputPath = path.join(distDir, 'index.html');
    } else {
      // Create directory structure: /sparen/kasbon-calculator -> dist/public/sparen/kasbon-calculator/index.html
      const routeDir = path.join(distDir, route);
      fs.mkdirSync(routeDir, { recursive: true });
      outputPath = path.join(routeDir, 'index.html');
    }
    
    // Write the pre-rendered HTML
    fs.writeFileSync(outputPath, html);
    
    return { route, success: true };
  } catch (error) {
    console.error(`  Error rendering ${route}: ${error.message}`);
    return { route, success: false, error: error.message };
  } finally {
    await page.close();
  }
}

// Main pre-render function
async function prerender() {
  console.log('\n🚀 Starting pre-render process...\n');
  
  // Check if dist exists
  if (!fs.existsSync(distDir)) {
    console.error('Error: dist/public not found. Run "npm run build" first.');
    process.exit(1);
  }
  
  // Find chromium
  const chromiumPath = findChromium();
  console.log(`Using Chromium: ${chromiumPath}\n`);
  
  // Load routes
  const routes = loadRoutes();
  console.log(`Found ${routes.length} routes to pre-render\n`);
  
  // Start static server
  const port = 3456;
  const server = await startServer(port);
  const baseUrl = `http://localhost:${port}`;
  
  // Launch Puppeteer
  const puppeteer = (await import('puppeteer-core')).default;
  const browser = await puppeteer.launch({
    executablePath: chromiumPath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-web-security'
    ]
  });
  
  try {
    const results = [];
    const concurrency = 3; // Process 3 routes at a time
    
    for (let i = 0; i < routes.length; i += concurrency) {
      const batch = routes.slice(i, i + concurrency);
      const batchResults = await Promise.all(
        batch.map(route => prerenderRoute(browser, baseUrl, route))
      );
      results.push(...batchResults);
    }
    
    // Summary
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success);
    
    console.log('\n📊 Pre-render Summary:');
    console.log(`  ✅ Successful: ${successful}/${routes.length}`);
    
    if (failed.length > 0) {
      console.log(`  ❌ Failed: ${failed.length}`);
      failed.forEach(f => console.log(`     - ${f.route}: ${f.error}`));
    }
    
    console.log('\n✨ Pre-render complete!\n');
    
  } finally {
    await browser.close();
    server.close();
  }
}

// Run
prerender().catch(err => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
