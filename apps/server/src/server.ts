import bodyParser from "body-parser";
import cors from "cors";
import express, { type Express } from "express";
import morgan from "morgan";

export const createServer = (): Express => {
	const app = express();
	app
		.disable("x-powered-by")
		.use(morgan("dev"))
		.use(bodyParser.urlencoded({ extended: true }))
		.use(bodyParser.json())
		.use(cors())
		.get("/message/:name", (req, res) => {
			return res.json({ message: `hello ${req.params.name}` });
		})
		.get("/status", (_, res) => {
			return res.json({ ok: true });
		});

	return app;
};
