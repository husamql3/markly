import { Hono } from "hono";
import { cors } from "hono/cors";

import type { ApiResponse } from "shared/dist";
import { env } from "./env";
import { auth } from "./lib/auth";

export type AppType = {
	user: typeof auth.$Infer.Session.user | null;
	session: typeof auth.$Infer.Session.session | null;
};

export const app = new Hono<{ Variables: AppType }>().use(
	cors({
		origin: env.CLIENT_BASE_URL,
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

// Mount better-auth routes
app.all("/api/auth/*", (c) => {
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

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.get("/hello", (c) => {
	const data: ApiResponse = {
		message: "Hello BHVR!",
		success: true,
	};

	return c.json(data, { status: 200 });
});

export default app;
