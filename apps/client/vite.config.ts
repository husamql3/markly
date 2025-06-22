import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

import { SERVER_BASE_URL } from "@markly/utils";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  root: "./apps/client",
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  optimizeDeps: {
    include: ["better-auth/client"],
    exclude: ["@markly/auth"]
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      external: ["postgres", "@markly/auth", "perf_hooks"],
    },
  },
  server: {
    cors: {
      origin: SERVER_BASE_URL,  
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      credentials: true,
    },
  },
});
