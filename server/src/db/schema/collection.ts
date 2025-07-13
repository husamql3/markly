import { relations, sql } from "drizzle-orm";
import { jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";

<<<<<<< HEAD
import { user } from "../schema/auth";
import { bookmark } from "../schema/bookmark";

export const collection = pgTable("collection", {
=======
import { User } from "./auth";
import { Bookmark } from "./bookmark";

export const Collection = pgTable("collection", {
>>>>>>> bhvr
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  title: text("title").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  description: text("description").notNull(),
  userId: text("user_id")
<<<<<<< HEAD
    .references(() => user.id)
    .notNull(),
});

export const collectionRelations = relations(collection, ({ one, many }) => ({
  bookmarks: many(bookmark),
  user: one(user, {
    fields: [collection.userId],
    references: [user.id],
=======
    .references(() => User.id)
    .notNull(),
});

export const collectionRelations = relations(Collection, ({ one, many }) => ({
  bookmarks: many(Bookmark),
  user: one(User, {
    fields: [Collection.userId],
    references: [User.id],
>>>>>>> bhvr
  }),
}));
