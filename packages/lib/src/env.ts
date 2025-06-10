import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createEnv } from "@t3-oss/env-core";
import { config } from "dotenv";
import { z } from "zod/v4";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: resolve(__dirname, "../../../.env") });

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
		PORT: z.string().default("8080"),
		DATABASE_URL: z.url(),

    // OAuth
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    APPLE_CLIENT_ID: z.string().min(1),
    APPLE_CLIENT_SECRET: z.string().min(1),
    APPLE_APP_BUNDLE_IDENTIFIER: z.string().min(1),

    // Email
    SMTP_USER: z.email("Invalid email format"),
    SMTP_PASSWORD: z.string().min(1),
  },
  runtimeEnv: process.env,
});
