import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/",
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "public/assets/images"),
      "@Nav": path.resolve(__dirname, "src/components/Nav/Nav.jsx"),
      "@container": path.resolve(__dirname, "src/Style/container.css"),
      "@Index": path.resolve(__dirname, "src/index.css"),
    },
  },
});
