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

<<<<<<< HEAD
import { user } from "../schema/auth";
import { collection } from "../schema/collection";

export const platformEnum = pgEnum("platform", [
=======
import { User } from "./auth";
import { Collection } from "./collection";

export const PlatformEnum = pgEnum("platform", [
>>>>>>> bhvr
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

<<<<<<< HEAD
export const bookmark = pgTable(
=======
export const Bookmark = pgTable(
>>>>>>> bhvr
  "bookmark",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    url: text("url").notNull(),
<<<<<<< HEAD
    platform: platformEnum().notNull(),
=======
    platform: PlatformEnum().notNull(),
>>>>>>> bhvr
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
<<<<<<< HEAD
      .references(() => user.id),
    collectionId: uuid("collection_id").references(() => collection.id),
=======
      .references(() => User.id),
    collectionId: uuid("collection_id").references(() => Collection.id),
>>>>>>> bhvr
  },
  (t) => [
    index("bookmark_user_id_idx").on(t.userId),
    index("bookmark_platform_idx").on(t.platform),
<<<<<<< HEAD
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
=======
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
>>>>>>> bhvr
  }),
}));
