/**
 * OG Image Generator for Interesten.be
 *
 * Generates a 1200x630 PNG image for social sharing.
 *
 * Usage: node scripts/generate-og-image.mjs
 *
 * Note: This creates an SVG that can be converted to PNG using any tool.
 * For production, you can use sharp, canvas, or an online converter.
 * Place the resulting og-image.png in client/public/
 */

import { writeFileSync } from 'fs';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#2563eb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0ea5e9;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f97316;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative circles -->
  <circle cx="100" cy="100" r="200" fill="rgba(255,255,255,0.05)"/>
  <circle cx="1100" cy="530" r="250" fill="rgba(255,255,255,0.05)"/>
  <circle cx="900" cy="100" r="150" fill="rgba(255,255,255,0.03)"/>

  <!-- Accent bar -->
  <rect x="80" y="180" width="6" height="120" rx="3" fill="url(#accent)"/>

  <!-- Main title -->
  <text x="110" y="230" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="64" font-weight="700" fill="white">
    Interesten.be
  </text>

  <!-- Subtitle -->
  <text x="110" y="290" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="32" font-weight="400" fill="rgba(255,255,255,0.85)">
    Belgische Financiele Calculators
  </text>

  <!-- Feature pills -->
  <rect x="110" y="340" width="180" height="44" rx="22" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
  <text x="145" y="368" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="500" fill="white">Sparen</text>

  <rect x="310" y="340" width="160" height="44" rx="22" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
  <text x="345" y="368" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="500" fill="white">Lenen</text>

  <rect x="490" y="340" width="200" height="44" rx="22" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
  <text x="525" y="368" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="500" fill="white">Beleggen</text>

  <rect x="710" y="340" width="200" height="44" rx="22" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
  <text x="745" y="368" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="500" fill="white">Planning</text>

  <!-- Stats -->
  <text x="110" y="460" font-family="Inter, system-ui, sans-serif" font-size="48" font-weight="700" fill="url(#accent)">48+</text>
  <text x="250" y="460" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="400" fill="rgba(255,255,255,0.7)">gratis tools</text>

  <!-- Tagline -->
  <text x="110" y="530" font-family="Inter, system-ui, sans-serif" font-size="20" font-weight="400" fill="rgba(255,255,255,0.6)">
    Bereken spaarrente, hypotheek, beleggingsrendement en meer
  </text>

  <!-- URL badge -->
  <rect x="110" y="560" width="240" height="36" rx="18" fill="rgba(255,255,255,0.2)"/>
  <text x="165" y="584" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="600" fill="white">interesten.be</text>

  <!-- Belgium flag accent -->
  <rect x="1140" y="20" width="12" height="20" fill="#000000"/>
  <rect x="1152" y="20" width="12" height="20" fill="#FDDA24"/>
  <rect x="1164" y="20" width="12" height="20" fill="#EF3340"/>
</svg>`;

writeFileSync('client/public/og-image.svg', svg);
console.log('OG Image SVG generated at client/public/og-image.svg');
console.log('');
console.log('To convert to PNG (1200x630), you can:');
console.log('1. Open the SVG in a browser and take a screenshot');
console.log('2. Use an online converter like svgtopng.com');
console.log('3. Use ImageMagick: convert og-image.svg og-image.png');
console.log('4. Use sharp: npx sharp-cli og-image.svg -o og-image.png');
console.log('');
console.log('Place the resulting og-image.png in client/public/');
