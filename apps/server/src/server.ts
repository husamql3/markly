import cors from "cors";
import morgan from "morgan";
import express, { type Express } from "express";

import { CLIENT_BASE_URL } from "@markly/utils";

export const createServer = (): Express => {
  const server = express();

  server.use(
    morgan("dev"),
    express.json(),
    express.urlencoded({ extended: true }),
    cors({
      origin: CLIENT_BASE_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }),
  );

  return server;
};
