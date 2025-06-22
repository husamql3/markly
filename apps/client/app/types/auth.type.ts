import type { UseMutationResult } from "@tanstack/react-query";

import type { Session } from "@markly/db";

export type AuthContextT = {
  user: Session | null;
  isLoading: boolean;
  error: Error | null;
  signOut: UseMutationResult<void, unknown, void, unknown>;
  loginWithMagicLink: UseMutationResult<void, unknown, string, unknown>;
};
