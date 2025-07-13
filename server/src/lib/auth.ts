import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
<<<<<<< HEAD
import { magicLink, oAuthProxy } from "better-auth/plugins";

import { db } from "../db";
import { env } from "../env";
import { log } from "shared/dist";
import * as schema from "../db/schema/auth";
=======
import { env } from "@/lib/env";
import { db } from "@/db";
>>>>>>> bhvr

export const auth = betterAuth({
  baseURL: env.SERVER_BASE_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
<<<<<<< HEAD
    schema,
=======
>>>>>>> bhvr
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
<<<<<<< HEAD
      redirectURI: "", // todo
    },
  },
  plugins: [
    oAuthProxy(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        log.info("MAGIC LINK EMAIL", { email, url });
        // For now, just log - in production you would send the email
        // TODO: Implement actual email sending with Resend
        return Promise.resolve();
      },
      expiresIn: 60 * 30, // 30 minutes instead of 5 minutes
    }),
  ],
=======
      // redirectURI: `${env.SERVER_BASE_URL}${GOOGLE_CALLBACK_PATH}`,
    },
  },
>>>>>>> bhvr
  trustedOrigins: [env.CLIENT_BASE_URL],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
<<<<<<< HEAD
  secret: env.BETTER_AUTH_SECRET,
=======
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
>>>>>>> bhvr
});
