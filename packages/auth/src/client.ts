import { createAuthClient } from "better-auth/client";
import { SERVER_BASE_URL } from "@markly/utils";

export const { signIn, signOut, useSession } = createAuthClient({
    baseURL: SERVER_BASE_URL
}); 