import { relations, sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { user } from "../schema/auth";
import { collection } from "../schema/collection";

export const platformEnum = pgEnum("platform", [
  "facebook",
  "x",
  "instagram",
  "youtube",
  "tiktok",
  "linkedin",
  "reddit",
  "pinterest",
  "threads",
  "medium",
  "dev",
]);

export const bookmark = pgTable(
  "bookmark",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    url: text("url").notNull(),
    platform: platformEnum().notNull(),
    content: text("content"),
    mediaUrls: jsonb("media_urls").$type<string[]>().default([]),
    tags: jsonb("tags").$type<string[]>().default([]),
    createdAt: timestamp("created_at")
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => new Date())
      .notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    collectionId: uuid("collection_id").references(() => collection.id),
  },
  (t) => [
    index("bookmark_user_id_idx").on(t.userId),
    index("bookmark_platform_idx").on(t.platform),
  ]
);

export const userRelations = relations(user, ({ many }) => ({
  bookmarks: many(bookmark),
}));

export const bookmarkRelations = relations(bookmark, ({ one }) => ({
  user: one(user, {
    fields: [bookmark.userId],
    references: [user.id],
  }),
  collection: one(collection, {
    fields: [bookmark.collectionId],
    references: [collection.id],
  }),
}));
