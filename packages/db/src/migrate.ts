import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { env } from "@markly/lib";
import { log, tryCatch } from "@markly/utils";

export const migrationClient = postgres(env.DATABASE_URL, { max: 1 });

async function main() {
  const result = await tryCatch(async () => {
    log.debug("Running migrations...");

		const migrationDb = drizzle(migrationClient);

		await migrate(migrationDb, {
			migrationsFolder: "./drizzle",
		});

    log.debug("Migrations completed successfully");
  });

  if (!result.isSuccess) {
    log.error("Migration failed:", result.error);
    process.exit(1);
  }

  process.exit(0);
}

main();
