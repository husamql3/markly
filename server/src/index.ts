import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

import { env } from "@/lib/env";
import { auth } from "@/lib/auth";

export type AppType = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};

const app = new Hono<{ Variables: AppType }>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use(
  "/api/auth/*",
  cors({
    origin: env.CLIENT_BASE_URL,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

// Mount the auth routes - use app.all to catch all HTTP methods
app.all("/api/auth/*", async (c) => {
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

const server = serve(
  {
    fetch: app.fetch,
    port: Number(env.PORT),
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

process.on("SIGINT", () => {
  server.close();
  process.exit(0);
});

process.on("SIGTERM", () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
