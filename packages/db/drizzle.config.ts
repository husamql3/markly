import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: "postgres://postgres:password@localhost:5432/markly",
  },
} satisfies Config;
