import { Hono } from "hono";

import { auth } from "@/lib/auth";

export const app = new Hono();
const routes = [auth] as const;

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export type AppType = (typeof routes)[number];
