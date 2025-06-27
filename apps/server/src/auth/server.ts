import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink, oAuthProxy } from "better-auth/plugins";

import { db } from "../db";
import { Account, Session, User, Verification } from "../db/schema";
import { env } from "@markly/lib";
import {
  CLIENT_BASE_URL,
  GOOGLE_CALLBACK_PATH,
  MAGIC_LINK_EXPIRY,
  SERVER_BASE_URL,
} from "@markly/lib";

/**
 * Initialize the authentication service.
 * Handles both magic link and OAuth authentication flows.
 */
export const auth = betterAuth({
  baseURL: SERVER_BASE_URL,
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
        // url: http://localhost:8080/api/auth/magic-link/verify?token=qdezEaaUsWdUXptXvBVYOaieVKPSUFlW&callbackURL=/
        // log.debug(`Initiating magic link flow for ${email}, ${url}`);
        // await sendMagicLinkEmail({ email, url });
        // log.debug(`Magic link flow completed for ${email}`);
      },
      expiresIn: MAGIC_LINK_EXPIRY,
    }),
  ],
});
