import { log } from "@markly/utils";
import { createServer } from "./server";

const port = process.env.PORT || 8080;
const server = createServer();

server.listen(port, () => {
  log(`server running on ${port}`);
});
