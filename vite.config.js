import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'docs'       // ← NEW: write the production build into /docs
  },
  server: {
    proxy: {
      "/api/v1": {
        target: "https://api.paak-ble-project.me",
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: {
          "api.paak-ble-project.me": "localhost",
        },
        headers: {
          Connection: "keep-alive",
        },
      },
    },
  },
});
