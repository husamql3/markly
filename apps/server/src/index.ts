import { createServer } from "@/server";
import { env } from "@markly/lib";
import { log } from "@markly/utils";

const port = env.PORT || 8080;
const server = createServer();

// https://www.better-auth.com/docs/integrations/express

server.listen(port, () => {
  log.debug(`http://localhost:${port}/`);
});
