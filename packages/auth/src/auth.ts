import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { betterAuth } from "better-auth";

import { user, session, account, verification } from "@markly/db/src/schema";
import { db } from "@markly/db";
import { SERVER_BASE_URL } from "@markly/utils";

/**
 * Initialize the authentication service.
 */
export const auth = betterAuth({
  baseURL: SERVER_BASE_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackUrl: "/auth/google/callback",
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.name.split(" ")[0],
          lastName: profile.name.split(" ")[1],
        };
      },
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID as string,
      clientSecret: process.env.APPLE_CLIENT_SECRET as string,
      appBundleIdentifier: process.env.APPLE_APP_BUNDLE_IDENTIFIER as string,
      callbackUrl: "/auth/apple/callback",
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.name.split(" ")[0],
          lastName: profile.name.split(" ")[1],
        };
      },
    },
  },
  trustedOrigins: ["https://appleid.apple.com"],
  plugins: [
    magicLink({
      sendMagicLink: ({ email, token, url }, request) => {
        console.log("Sending magic link to", { email, token, url, request });
        // Send magic link to user's email
      },
    }),
  ],
});
