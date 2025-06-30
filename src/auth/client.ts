import { createAuthClient } from "better-auth/client";
import {
  inferAdditionalFields,
  magicLinkClient,
} from "better-auth/client/plugins";

import type { auth } from "@/auth/server";
import { env } from "@/env";

/**
 * Better Auth client configuration for browser use
 */
export const authClient = createAuthClient({
  baseURL: `${env.PUBLIC_SERVER_BASE_URL}/auth`,
  plugins: [magicLinkClient(), inferAdditionalFields<typeof auth>()],
});
