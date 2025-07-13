import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink, oAuthProxy } from "better-auth/plugins";
import { log } from "shared/dist";
import { db } from "../db";
import * as schema from "../db/schema/auth";
import { env } from "../env";

export const auth = betterAuth({
	baseURL: env.SERVER_BASE_URL,
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
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
				return await Promise.resolve();
			},
			expiresIn: 60 * 30, // 30 minutes instead of 5 minutes
		}),
	],
	trustedOrigins: [env.CLIENT_BASE_URL],
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
	},
	secret: env.BETTER_AUTH_SECRET,
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
