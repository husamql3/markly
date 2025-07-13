import z from "zod/v4";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

	BETTER_AUTH_URL: z.url(),
	BETTER_AUTH_SECRET: z.string(),

	SERVER_BASE_URL: z.url(),
	CLIENT_BASE_URL: z.url(),

	DATABASE_URL: z.url(),

	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
});

const envServer = envSchema.safeParse({
	NODE_ENV: process.env.NODE_ENV,
	BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
	BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
	SERVER_BASE_URL: process.env.SERVER_BASE_URL,
	CLIENT_BASE_URL: process.env.CLIENT_BASE_URL,
	DATABASE_URL: process.env.DATABASE_URL,
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
});

if (!envServer.success) {
	console.error(envServer.error.issues);
	throw new Error("There is an error with the server environment variables");
}

export const env = envServer.data;
