import { createAuthClient } from "better-auth/client";
import {
  inferAdditionalFields,
  magicLinkClient,
} from "better-auth/client/plugins";

import type { auth } from "../auth/server";
import { SERVER_BASE_URL } from "@markly/lib";

/**
 * Better Auth client configuration for browser use
 */
export const authClient = createAuthClient({
  baseURL: SERVER_BASE_URL,
  plugins: [magicLinkClient(), inferAdditionalFields<typeof auth>()],
});
