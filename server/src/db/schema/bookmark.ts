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

import { User } from "./auth";
import { Collection } from "./collection";

export const PlatformEnum = pgEnum("platform", [
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

export const Bookmark = pgTable(
  "bookmark",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    url: text("url").notNull(),
    platform: PlatformEnum().notNull(),
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
      .references(() => User.id),
    collectionId: uuid("collection_id").references(() => Collection.id),
  },
  (t) => [
    index("bookmark_user_id_idx").on(t.userId),
    index("bookmark_platform_idx").on(t.platform),
  ],
);

export const UserRelations = relations(User, ({ many }) => ({
  bookmarks: many(Bookmark),
}));

export const BookmarkRelations = relations(Bookmark, ({ one }) => ({
  user: one(User, {
    fields: [Bookmark.userId],
    references: [User.id],
  }),
  collection: one(Collection, {
    fields: [Bookmark.collectionId],
    references: [Collection.id],
  }),
}));
