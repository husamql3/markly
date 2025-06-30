import { Hono } from "hono";
import { cors } from "hono/cors";

import { env } from "@/env";
import { auth } from "@/auth/server";

export const authRoute = new Hono();
authRoute.use(
  "/*",
  cors({
    origin: env.PUBLIC_SERVER_BASE_URL,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

authRoute.on(["POST", "GET"], "/*", (c) => {
  return auth.handler(c.req.raw);
});
