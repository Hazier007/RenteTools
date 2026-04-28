/**
 * Generate all routes for pre-rendering
 * This script extracts all routes from calculatorSeoConfig and outputs them for react-snap
 */

const fs = require('fs');
const path = require('path');

// Read the SEO config file
const seoConfigPath = path.join(__dirname, '../client/src/seo/calculatorSeoConfig.ts');
const seoConfigContent = fs.readFileSync(seoConfigPath, 'utf8');

// Extract calculatorsByCategory
const categoryMatch = seoConfigContent.match(/export const calculatorsByCategory[\s\S]*?= \{([\s\S]*?)\n\};/);
if (!categoryMatch) {
  console.error('Could not find calculatorsByCategory in seoConfig');
  process.exit(1);
}

// Parse the categories
const categories = {
  Sparen: [],
  Lenen: [],
  Beleggen: [],
  Planning: [],
  Overige: []
};

const categoryBlock = categoryMatch[1];
for (const category of Object.keys(categories)) {
  const regex = new RegExp(`${category}:\\s*\\[([^\\]]+)\\]`, 's');
  const match = categoryBlock.match(regex);
  if (match) {
    const slugs = match[1].match(/"([^"]+)"/g);
    if (slugs) {
      categories[category] = slugs.map(s => s.replace(/"/g, ''));
    }
  }
}

// Build full route list
const routes = [
  '/',
  '/blog',
  '/nieuws',
  '/sparen',
  '/lenen',
  '/beleggen',
  '/planning',
  '/over-ons',
  '/privacy',
  '/voorwaarden',
  '/contact'
];

// Add calculator routes with category prefix
for (const [category, slugs] of Object.entries(categories)) {
  if (category === 'Overige') continue;

  const categoryPath = category.toLowerCase();
  for (const slug of slugs) {
    routes.push(`/${categoryPath}/${slug}`);
  }
}

// Add blog post routes for SSG so each post gets unique <title>/og:* meta
// (CAL-162). Parses slug literals from blogPosts.ts; when posts are added
// there, regenerate prerender-routes.json before the next deploy.
const blogPostsPath = path.join(__dirname, '../client/src/data/blogPosts.ts');
const blogPostsContent = fs.readFileSync(blogPostsPath, 'utf8');
const blogSlugMatches = blogPostsContent.matchAll(/^\s*slug:\s*"([^"]+)"/gm);
for (const match of blogSlugMatches) {
  routes.push(`/blog/${match[1]}`);
}

// Output as JSON
console.log(JSON.stringify(routes, null, 2));

// Also write to a file for react-snap
const outputPath = path.join(__dirname, '../prerender-routes.json');
fs.writeFileSync(outputPath, JSON.stringify(routes, null, 2));
console.error(`\nGenerated ${routes.length} routes to ${outputPath}`);
