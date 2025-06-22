import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink, oAuthProxy } from "better-auth/plugins";

import { db } from "@markly/db";
import { Account, Session, User, Verification } from "@markly/db/src/schema";
import { env } from "@markly/lib";
import { sendMagicLinkEmail } from "@markly/lib/src/email";
import {
  CLIENT_BASE_URL,
  GOOGLE_CALLBACK_PATH,
  MAGIC_LINK_EXPIRY,
  SERVER_BASE_URL,
} from "@markly/utils";
import { log } from "@markly/utils";

/**
 * Initialize the authentication service.
 * Handles both magic link and OAuth authentication flows.
 */
export const auth = betterAuth({
  baseURL: SERVER_BASE_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      User,
      Session,
      Account,
      Verification,
    },
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: `${SERVER_BASE_URL}${GOOGLE_CALLBACK_PATH}`,
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
        log.debug(`Initiating magic link flow for ${email}`);
        await sendMagicLinkEmail({ email, url });
        log.debug(`Magic link flow completed for ${email}`);
      },
      expiresIn: MAGIC_LINK_EXPIRY,
    }),
  ],
});
