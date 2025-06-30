import { Hono } from "hono";

export const indexRoute = new Hono();

indexRoute.get("/", (c) => c.text("Hello World!"));
