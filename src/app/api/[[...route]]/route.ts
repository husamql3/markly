import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

import { auth } from "@/auth/server";
import { CLIENT_BASE_URL } from "@/utils/constants";

export const runtime = "nodejs";

export type AppType = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

const app = new Hono<AppType>().basePath("/api");

app.get("/", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

app.use(
  "/auth/*",
  cors({
    origin: CLIENT_BASE_URL,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.use("*", async (c, next) => {
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

export const GET = handle(app);
export const POST = handle(app);
