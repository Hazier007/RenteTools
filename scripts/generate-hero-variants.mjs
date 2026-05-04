#!/usr/bin/env node
/**
 * One-shot generator for hero LCP image variants.
 *
 * Sharp is a devDependency used at author time only — the produced files are
 * committed to attached_assets/ and shipped through Vite's static asset
 * pipeline. CAL-471: extend single LG asset with 360/414/480w mobile breakpoints
 * for AVIF + WebP so the browser picks the smallest covering variant under
 * simulated 4G / mobile viewports (~150 ms LCP win on cold cache).
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const src = path.join(repoRoot, "attached_assets", "hero-2026-lg.avif");

const widths = [360, 414, 480];
const variants = [
  { format: "avif", options: { quality: 50, effort: 6 } },
  { format: "webp", options: { quality: 70, effort: 6 } },
];

for (const w of widths) {
  for (const v of variants) {
    const out = path.join(
      repoRoot,
      "attached_assets",
      `hero-2026-${w}.${v.format}`,
    );
    const meta = await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .toFormat(v.format, v.options)
      .toFile(out);
    console.log(
      `${path.basename(out)}: ${meta.width}x${meta.height} ${meta.size} bytes`,
    );
  }
}
