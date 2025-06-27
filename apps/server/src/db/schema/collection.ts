import { relations, sql } from "drizzle-orm";
import { jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { User } from "../schema/auth";
import { Bookmark } from "../schema/bookmark";

export const Collection = pgTable("collection", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  title: text("title").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  description: text("description").notNull(),
  userId: text("user_id")
    .references(() => User.id)
    .notNull(),
});

export const collectionRelations = relations(Collection, ({ one, many }) => ({
  bookmarks: many(Bookmark),
  user: one(User, {
    fields: [Collection.userId],
    references: [User.id],
  }),
}));
