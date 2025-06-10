import type { bookmark, platformEnum } from "../schema/bookmark";

export type BookmarkT = typeof bookmark.$inferSelect;
export type BookmarkInsertT = typeof bookmark.$inferInsert;

export type PlatformT = (typeof platformEnum.enumValues)[number];
