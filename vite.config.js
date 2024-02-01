import { defineConfig, splitVendorChunkPlugin } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin(), visualizer()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("react-plotly.js")) {
            return "plotly-react";
          } else if (id.includes("plotly.js-cartesian-dist-min")) {
            return "plotly-min";
          } else if (id.includes("@ag-grid-community/react")) {
            return "agGrid-react";
          } else if (
            id.includes("@ag-grid-community/client-side-row-model") ||
            id.includes("@ag-grid-community/styles")
          ) {
            return "agGrid-community";
          } else if (id.includes("@ag-grid-community/core/dist/esm/es6")) {
            return "agGrid-core-es6";
          }
        },
      },
    },
  },
});
