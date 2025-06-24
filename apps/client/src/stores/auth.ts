import { create } from "zustand";

import type { SessionT } from "@markly/db";
import { authClient } from "@markly/auth";
import { log } from "@markly/utils";

export type AuthState = {
  user: SessionT | null;
  isLoading: boolean;
  error: Error | null;
  fetchSession: () => Promise<void>;
  loginWithMagicLink: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

/**
 * Zustand store for authentication state and operations.
 */
export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  /**
   * Fetches the current user session from the authentication client.
   */
  fetchSession: async () => {
    set({ isLoading: true });
    try {
      const { data } = await authClient.getSession();
      if (!data) {
        set({ user: null, isLoading: false });
        return;
      }

      const session = data.session
        ? {
            ...data.session,
            ipAddress: data.session.ipAddress ?? null,
            userAgent: data.session.userAgent ?? null,
          }
        : null;

      set({ user: session, isLoading: false });
    } catch (e) {
      log.error("FETCH SESSION ERROR", e);
      set({
        error: e instanceof Error ? e : new Error("Failed to fetch session"),
        isLoading: false,
      });
    }
  },

  /**
   * Initiates a magic link login.
   * On success, refetches the session to update user data.
   */
  loginWithMagicLink: async (email: string) => {
    set({ isLoading: true });
    try {
      const { error: e } = await authClient.signIn.magicLink({
        email,
        callBackUrl: "/",
      });
      if (e) {
        log.error("LOGIN WITH MAGIC LINK ERROR:", e);
        set({
          error: e instanceof Error ? e : new Error("Login failed"),
          isLoading: false,
        });
        return;
      }

      const { data } = await authClient.getSession();
      if (!data) {
        set({ user: null, isLoading: false });
        return;
      }

      const session = data.session
        ? {
            ...data.session,
            ipAddress: data.session.ipAddress ?? null,
            userAgent: data.session.userAgent ?? null,
          }
        : null;
      set({ user: session, isLoading: false, error: null });
    } catch (e) {
      log.error("LOGIN WITH MAGIC LINK ERROR:", e);
      set({
        error: e instanceof Error ? e : new Error("Login failed"),
        isLoading: false,
      });
    }
  },

  /**
   * Signs out the current user and clears the session.
   */
  signOut: async () => {
    set({ isLoading: true });
    try {
      await authClient.signOut();
      set({ user: null, isLoading: false, error: null });
    } catch (e) {
      log.error("SIGN OUT ERROR:", e);
      set({
        error: e instanceof Error ? e : new Error("Sign out failed"),
        isLoading: false,
      });
    }
  },
}));

// Initialize session fetch on store creation
useAuth.getState().fetchSession();

// Set up periodic session refresh
const sessionRefreshInterval = setInterval(
  () => {
    useAuth.getState().fetchSession();
  },
  5 * 60 * 1000,
);

// Clear session refresh interval on window unload
if (typeof window !== "undefined") {
  window.addEventListener("unload", () =>
    clearInterval(sessionRefreshInterval),
  );
}
