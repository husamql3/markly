import type { auth } from "@/auth/server";
import type { Session, User, Account } from "@/db/schema/auth";

export type UserT = typeof User.$inferSelect;
export type SessionT = typeof Session.$inferSelect;
export type AccountT = typeof Account.$inferSelect;

export type ServerT = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};
