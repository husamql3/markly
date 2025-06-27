import type { Collection } from "../db/schema/collection";

export type CollectionT = typeof Collection.$inferSelect;
export type CollectionInsertT = typeof Collection.$inferInsert;
