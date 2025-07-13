import path from "node:path";
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: path.resolve(__dirname, "../.env") });

export default defineConfig({
	schema: "./src/db/schema/*",
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
