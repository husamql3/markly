import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@markly/lib";
import { log } from "@markly/utils";
import { tryCatch } from "@markly/utils";

export const migrationClient = postgres(env.DATABASE_URL, { max: 1 });

async function main() {
	const result = await tryCatch(async () => {
		log.debug("Dropping database schema...");

		const migrationDb = drizzle(migrationClient);

		// Drop all tables in the public schema
		await migrationDb.execute(sql`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO postgres;
      GRANT ALL ON SCHEMA public TO public;
    `);

		// Drop the drizzle schema and its tables
		await migrationDb.execute(sql`DROP SCHEMA IF EXISTS drizzle CASCADE;`);

		log.debug("Database schema dropped successfully");
	});

	if (!result.isSuccess) {
		log.error("Failed to drop database schema:", result.error);
		process.exit(1);
	}

	process.exit(0);
}

main();
