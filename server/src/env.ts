import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4-mini";
import { config } from "dotenv";

config({ path: Bun.resolveSync("../../../.env", import.meta.path) });

export const env = createEnv({
  server: {
    SERVER_BASE_URL: z.string({ message: "SERVER_BASE_URL is required" }),
    CLIENT_BASE_URL: z.string({ message: "CLIENT_BASE_URL is required" }),

    DATABASE_URL: z.url({ message: "DATABASE_URL is required" }),

    BETTER_AUTH_SECRET: z.string({ message: "BETTER_AUTH_SECRET is required" }),
    BETTER_AUTH_URL: z.url({ message: "BETTER_AUTH_URL is required" }),

    GOOGLE_CLIENT_ID: z.string({ message: "GOOGLE_CLIENT_ID is required" }),
    GOOGLE_CLIENT_SECRET: z.string({
      message: "GOOGLE_CLIENT_SECRET is required",
    }),

    // client env validation
    VITE_SERVER_URL: z.string({ message: "VITE_SERVER_URL is required" }),
  },
  runtimeEnv: Bun.env,
});
