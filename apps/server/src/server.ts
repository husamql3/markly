import bodyParser from "body-parser";
import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import morgan from "morgan";

import { auth } from "@markly/auth";
import { CLIENT_BASE_URL } from "@markly/utils";
import { log, tryCatch } from "@markly/utils";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";

// API Routes
const AUTH_ROUTE = "/api/auth";
const ME_ROUTE = "/api/me";

/**
 * Creates and configures the Express server
 * @returns Configured Express application
 */
export const createServer = (): Express => {
	const app = express();

	app.use(
		cors({
			origin: CLIENT_BASE_URL,
			methods: ["GET", "POST", "PUT", "DELETE"],
			credentials: true,
		}),
	);

	// Auth routes
	app.all(`${AUTH_ROUTE}/{*any}`, toNodeHandler(auth));

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(morgan("dev"));

	// User routes
	app.get(ME_ROUTE, async (req: Request, res: Response) => {
		const result = await tryCatch(async () => {
			log.debug("Fetching user session");
			const session = await auth.api.getSession({
				headers: fromNodeHeaders(req.headers),
			});
			return session;
		});

		if (!result.isSuccess) {
			log.error("Failed to fetch user session:", result.error);
			return res.status(500).json({ error: "Failed to fetch user session" });
		}

		return res.json(result.data);
	});

	// Error handling middleware
	app.use((err: Error, req: Request, res: Response, next: express.NextFunction) => {
		log.error("Unhandled error:", err);
		res.status(500).json({ error: "Internal server error" });
	});

	return app;
};
