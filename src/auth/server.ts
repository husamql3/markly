import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink, oAuthProxy } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/db";
import { Account, Session, User, Verification } from "@/db/schema";

import { env } from "@/env";
import {
  CLIENT_BASE_URL,
  MAGIC_LINK_EXPIRY,
  SERVER_BASE_URL,
} from "@/utils/constants";
import { log } from "@/utils/logger";
import { sendMagicLinkEmail } from "@/utils/email/sendMagicEmail";

/**
 * Initialize the authentication service.
 * Handles both magic link and OAuth authentication flows.
 */
export const auth = betterAuth({
  baseURL: `${SERVER_BASE_URL}/auth`,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: User,
      session: Session,
      account: Account,
      verification: Verification,
    },
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    twitter: {
      clientId: env.TWITTER_CLIENT_ID,
      clientSecret: env.TWITTER_CLIENT_SECRET,
      version: "2.0",
      scope: ["bookmark.read", "tweet.read", "users.read"],
      authorization: {
        params: {
          scope: "bookmark.read tweet.read users.read offline.access",
        },
      },
    },
  },
  trustedOrigins: [CLIENT_BASE_URL],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  secret: env.BETTER_AUTH_SECRET,
  plugins: [
    oAuthProxy(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await sendMagicLinkEmail({ email, url });
        log.debug(`Magic link flow completed for ${email}, ${url}`);
      },
      expiresIn: MAGIC_LINK_EXPIRY,
    }),
    nextCookies(),
  ],
});
