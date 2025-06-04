import { log } from "@markly/utils";
import { createServer } from "@/server";
import { env } from "@markly/lib";

const port = env.PORT || 8080;
const server = createServer();

server.listen(port, () => {
  log.debug(`http://localhost:${port}/`);
});
