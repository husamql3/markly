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
    TWITTER_CLIENT_ID: z.string(),
    TWITTER_CLIENT_SECRET: z.string(),

    // BetterAuth
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.url(),

    // Email
    SMTP_USER: z.email(),
    SMTP_PASSWORD: z.string(),

    // Utils
    CLIENT_BASE_URL: z.url(),
    SERVER_BASE_URL: z.url(),
    PUBLIC_CLIENT_BASE_URL: z.url(),
    PUBLIC_SERVER_BASE_URL: z.url(),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
    TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    CLIENT_BASE_URL: process.env.CLIENT_BASE_URL,
    SERVER_BASE_URL: process.env.SERVER_BASE_URL,
    PUBLIC_CLIENT_BASE_URL: process.env.PUBLIC_CLIENT_BASE_URL,
    PUBLIC_SERVER_BASE_URL: process.env.PUBLIC_SERVER_BASE_URL,
  },
  skipValidation: process.env.NODE_ENV !== "development",
});
