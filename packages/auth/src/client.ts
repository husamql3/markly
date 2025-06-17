import { SERVER_BASE_URL } from "@markly/utils";
import { createAuthClient } from "better-auth/client";

export const { signIn, signOut, useSession } = createAuthClient({
	baseURL: SERVER_BASE_URL,
});
