import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
import path from "path";

// Load environment variables
config({ path: path.resolve(__dirname, "../.env") });

export default defineConfig({
  schema: "./src/db/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
}); 