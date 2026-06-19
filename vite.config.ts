import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // CAL-471: keep hero LCP variants as files (don't base64-inline them).
    // Vite's default 4096-byte threshold would bake the smallest mobile
    // hero variants into the bundle, which (a) inflates the SSR HTML +
    // route JS the browser must parse before LCP, and (b) breaks the
    // <link rel="preload"> path because data: URLs can't be preloaded
    // — exactly the case we ship variants to optimise. Other small assets
    // keep the default behaviour.
    assetsInlineLimit(filePath) {
      if (/hero-2026-(360|414|480)\.(avif|webp)$/.test(filePath)) {
        return false;
      }
      return undefined;
    },
    rollupOptions: {
      output: {
        // Split the React runtime into its own long-cacheable chunk so the
        // route entry stays small. Other vendors (radix, framer, tanstack,
        // lucide) stay under Rollup's default smart-splitting so lazy route
        // chunks keep their tree-shaken share instead of being pulled eager.
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          // Match only top-level react/react-dom/scheduler/react-is, not
          // sub-packages like @tiptap/react or @radix-ui/react-checkbox.
          if (
            /[\\/]node_modules[\\/](react|react-dom|scheduler|react-is)[\\/]/.test(id)
          ) {
            return "react-vendor";
          }
          // framer-motion is ~37 KB gzipped and used by Home + every category
          // hub (all eager). Split it so the route entry stays small and the
          // chunk can be cached across navigation.
          if (/[\\/]node_modules[\\/]framer-motion[\\/]/.test(id)) {
            return "framer-motion";
          }
          return undefined;
        },
      },
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
