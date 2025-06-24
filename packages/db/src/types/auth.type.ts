import type { Session, User } from "../schema/auth";

export type UserT = typeof User.$inferSelect;
export type SessionT = typeof Session.$inferSelect;
