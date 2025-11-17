import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    lightningcss: false,  // disable lightningcss (fix @tailwind errors)
  },
  build: {
    sourcemap: false,
    minify: "terser",     // safer than esbuild for some packages
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "framer-motion";
            if (id.includes("tsparticles")) return "tsparticles";
            return "vendor";
          }
        },
      },
    },
  },
});
