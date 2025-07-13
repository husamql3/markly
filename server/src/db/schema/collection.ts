import { relations, sql } from "drizzle-orm";
import { jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { user } from "../schema/auth";
import { bookmark } from "../schema/bookmark";

export const collection = pgTable("collection", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  title: text("title").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  description: text("description").notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
});

export const collectionRelations = relations(collection, ({ one, many }) => ({
  bookmarks: many(bookmark),
  user: one(user, {
    fields: [collection.userId],
    references: [user.id],
  }),
}));
