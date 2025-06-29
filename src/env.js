import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod/v4";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    DATABASE_URL: z.url(),

    // OAuth
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    X_CLIENT_ID: z.string(),
    X_CLIENT_SECRET: z.string(),
    X_BEARER_TOKEN: z.string(),

    // BetterAuth
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.url(),

    // Email
    SMTP_USER: z.email(),
    SMTP_PASSWORD: z.string(),

    // Utils
    CLIENT_BASE_URL: z.url(),
    SERVER_BASE_URL: z.url(),
  },
  client: {},
  runtimeEnv: process.env,
  skipValidation: process.env.NODE_ENV !== "development",
});
