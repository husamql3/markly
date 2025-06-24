import type { Bookmark, PlatformEnum } from "../schema/bookmark";

export type BookmarkT = typeof Bookmark.$inferSelect;
export type BookmarkInsertT = typeof Bookmark.$inferInsert;

export type PlatformT = (typeof PlatformEnum.enumValues)[number];
