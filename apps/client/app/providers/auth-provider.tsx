import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, type ReactNode } from "react";

import type { AuthContextT } from "@/types/auth.type";
import { authClient } from "@markly/auth";
import { log } from "@markly/utils";

/**
 * React Context for authentication-related data and functions.
 * It holds the current user, loading state, errors, and mutation functions for auth operations.
 */
const AuthContext = createContext<AuthContextT | undefined>(undefined);

/**
 * Provides authentication context to its children components.
 * It manages session data, login, and logout functionalities using TanStack Query.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  /**
   * Fetches the current user session from the authentication client.
   * The session is cached and invalidated upon auth actions like login/logout.
   */
  const {
    data: session,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data: session } = await authClient.getSession();
      return session;
    },
    retry: 1, // Retry once if the initial fetch fails
    staleTime: 5 * 60 * 1000, // Session data is considered fresh for 5 minutes
  });

  /**
   * Mutation hook for initiating a magic link login.
   */
  const loginWithMagicLink = useMutation({
    mutationFn: async (email: string) => {
      const { error: e } = await authClient.signIn.magicLink({
        email,
        callBackUrl: "/", // Redirect to home on successful login
      });

      if (e) {
        log.error("LOGIN WITH MAGIC LINK ERROR:", e);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
    onError: (e) => {
      log.error("LOGIN WITH MAGIC LINK ERROR:", e);
    },
  });

  /**
   * Mutation hook for signing out the current user.
   * Upon successful completion, clears the 'session' query data and invalidates it.
   */
  const signOut = useMutation({
    mutationFn: async () => {
      await authClient.signOut();
    },
    onSuccess: () => {
      queryClient.setQueryData(["session"], null);
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
    onError: (e) => {
      log.error("SIGN OUT ERROR:", e);
    },
  });

  const value = {
    user: session?.user || null,
    isLoading,
    error,
    signOut,
    loginWithMagicLink,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to consume the authentication context.
 * Provides access to the current user, loading state, errors, and authentication functions.
 */
export const useAuth = (): AuthContextT | undefined => {
  return useContext(AuthContext);
};
