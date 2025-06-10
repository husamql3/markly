import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { env } from "@markly/lib";
import { log } from "@markly/utils";

export const migrationClient = postgres(env.DATABASE_URL, { max: 1 });

async function main() {
	try {
		log.debug("Running migrations...");

		const migrationDb = drizzle(migrationClient);

		await migrate(migrationDb, {
			migrationsFolder: "./drizzle",
		});

		log.debug("Migrations completed successfully");
		process.exit(0);
	} catch (error) {
		log.error("Migration failed:", error);
		process.exit(1);
	}
}

main();
