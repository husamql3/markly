import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { env } from "@/lib/env";
import { db } from "@/db";
import { magicLink, oAuthProxy } from "better-auth/plugins";

export const auth = betterAuth({
  baseURL: env.SERVER_BASE_URL,
  basePath: "/api/auth",
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      // redirectURI: `${env.SERVER_BASE_URL}${GOOGLE_CALLBACK_PATH}`,
    },
  },
  trustedOrigins: [env.CLIENT_BASE_URL],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  secret: env.BETTER_AUTH_SECRET,
  plugins: [
    oAuthProxy(),
    magicLink({
      sendMagicLink: ({ email, url }) => {
        // url: http://localhost:8080/api/auth/magic-link/verify?token=qdezEaaUsWdUXptXvBVYOaieVKPSUFlW&callbackURL=/
        console.debug(`Initiating magic link flow for ${email}, ${url}`);
        // await sendMagicLinkEmail({ email, url });
        // log.debug(`Magic link flow completed for ${email}`);
      },
      // expiresIn: MAGIC_LINK_EXPIRY,
    }),
  ],
  // TODO:
  // user: {
  //   additionalFields: {
  //     roles: {
  //       type: [Role.STUDENT, Role.CREATOR, Role.ADMIN],
  //       required: true,
  //       defaultValue: [Role.STUDENT],
  //     },
  //   },
  // },
});
