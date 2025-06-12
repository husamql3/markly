import { auth } from "./auth";

/**
 * Login with a social provider
 * @param provider: social media provider
 */
export const login = (provider: "google" | "apple") => {
  auth.api.signInSocial({
    body: {
      provider,
      scopes: ["email", "profile"],
    },
  });
};
