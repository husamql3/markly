import type { Collection } from "../schema/collection";

export type CollectionT = typeof Collection.$inferSelect;
export type CollectionInsertT = typeof Collection.$inferInsert;
