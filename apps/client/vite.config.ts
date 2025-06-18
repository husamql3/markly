import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { SERVER_BASE_URL } from "@markly/utils";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  root: "./apps/client",
  build: {
    outDir: "dist",
  },
  server: {
    cors: {
      origin: SERVER_BASE_URL,
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      credentials: true,
    },
  },
});
