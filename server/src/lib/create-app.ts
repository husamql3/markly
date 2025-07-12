import { Hono } from "hono";

import type { auth } from "@/lib/auth";

export type AuthType = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

export function createRouter() {
  return new Hono<{ Bindings: AuthType }>({
    strict: false,
  });
}

export function createApp() {
  return createRouter();
}
