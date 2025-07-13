<<<<<<< HEAD
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
=======
import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({ path: "../.env" });

export default {
  schema: "./src/db/schema/*",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
} satisfies Config;
>>>>>>> bhvr
