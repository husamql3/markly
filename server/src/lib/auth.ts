import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "@/lib/env";
import { db } from "@/db";

export const auth = betterAuth({
  baseURL: env.SERVER_BASE_URL,
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
