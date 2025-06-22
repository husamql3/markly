import { fromNodeHeaders } from "better-auth/node";
import { toNodeHandler } from "better-auth/node";

import { env } from "@markly/lib";
import { auth } from "@markly/auth";
import { log } from "@markly/utils";
import { createServer } from "./server";

const port = env.PORT;
const server = await createServer();

server.all("/api/auth/*", toNodeHandler(auth));

server.listen(port, () => {
  log.debug(`http://localhost:${port}/`);
});
