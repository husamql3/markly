import type { Config } from "drizzle-kit";

import { env } from "@markly/lib";

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
