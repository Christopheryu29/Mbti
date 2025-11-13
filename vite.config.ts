import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow access from local network
    port: 5173, // Default Vite port
    strictPort: false, // If port is in use, try next available port
  },
  build: {
    // Optimize for production while maintaining CSS consistency
    cssCodeSplit: false, // Keep CSS in one file (better for your large CSS file)
    minify: "esbuild", // Faster minification (handles both JS and CSS)
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
    // Ensure consistent CSS output
    cssTarget: "chrome80", // Target modern browsers for consistent CSS
    rollupOptions: {
      output: {
        // Ensure consistent asset paths
        assetFileNames: "assets/[name].[hash][extname]",
        // Preserve CSS structure
        manualChunks: undefined, // Don't split chunks to maintain consistency
      },
    },
  },
  // Ensure base path works correctly on Vercel
  base: "/",
  // CSS configuration for consistency
  css: {
    devSourcemap: false, // Disable sourcemaps in dev for consistency
    postcss: undefined, // Don't use PostCSS to avoid transformations
  },
});
