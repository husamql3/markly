import type { collection } from "../schema/collection";

export type CollectionT = typeof collection.$inferSelect;
export type CollectionInsertT = typeof collection.$inferInsert;
