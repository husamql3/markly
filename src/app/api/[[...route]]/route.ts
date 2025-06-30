import { Hono } from "hono";
import { handle } from "hono/vercel";

import type { ServerT } from "@/types";
import { authRoute } from "@/routes/auth.route";
import { indexRoute } from "@/routes/index.route";
import { middlewareRoute } from "@/routes/middleware.route";
import { xRoute } from "@/routes/x.route";

export const runtime = "nodejs";

const app = new Hono<ServerT>().basePath("/api");

app.route("*", middlewareRoute);
app.route("/", indexRoute);
app.route("/auth", authRoute);
app.route("/x", xRoute);

export const GET = handle(app);
export const POST = handle(app);
