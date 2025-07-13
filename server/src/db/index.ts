<<<<<<< HEAD
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import { env } from "../env";
import * as authSchema from "./schema/auth";
import * as bookmarkSchema from "./schema/bookmark";
import * as collectionSchema from "./schema/collection";

export const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
    ssl: true,
  },
  schema: {
    ...authSchema,
    ...bookmarkSchema,
    ...collectionSchema,
  },
});
=======
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "@/lib/env";
import postgres from "postgres";
import * as schema from "./schema";

export const queryClient = postgres(env.DATABASE_URL);

export const db = drizzle(queryClient, { schema });
>>>>>>> bhvr
