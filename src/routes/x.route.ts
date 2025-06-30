import { Hono } from "hono";

import type { ServerT } from "@/types";

export const xRoute = new Hono<ServerT>();

xRoute.get("/", (c) => c.json({ message: "X API endpoint" }));
