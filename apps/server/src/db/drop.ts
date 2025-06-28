import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import postgres from "postgres";

import { env } from "@markly/lib/server";

export const migrationClient = postgres(env.DATABASE_URL, { max: 1 });

async function main() {
  // const result = await tryCatch(async () => {
  // log.debug("Dropping database schema...");

  const migrationDb = drizzle(migrationClient);

  // Drop all tables in the public schema
  await migrationDb.execute(sql`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
    `);

  // Drop the drizzle schema and its tables
  await migrationDb.execute(sql`DROP SCHEMA IF EXISTS drizzle CASCADE;`);

  // log.debug("Database schema dropped successfully");
  // });

  // if (!result.isSuccess) {
  // log.error("Failed to drop database schema:", result.error);
  // process.exit(1);
  // }

  process.exit(0);
}

main();
