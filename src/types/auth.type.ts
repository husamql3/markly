import type { Session, User } from "@/db/schema/auth";

export type UserT = typeof User.$inferSelect;
export type SessionT = typeof Session.$inferSelect;
