import { Hono } from "hono";

import type { ServerT } from "@/types";
import { auth } from "@/auth/server";

export const middlewareRoute = new Hono<ServerT>();

middlewareRoute.get("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});
