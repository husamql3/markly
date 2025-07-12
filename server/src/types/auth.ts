import type { authClient } from "@/lib/auth-client";

export type Session = typeof authClient.$Infer.Session;
export type User = typeof authClient.$Infer.Session.user;
