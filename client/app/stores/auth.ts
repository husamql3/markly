import type { Session } from "shared/src/types/auth";
import { log } from "shared/src/utils/logger";
import { create } from "zustand";
import { authClient } from "@/lib/auth-client";

export type AuthState = {
	user: Session | null;
	isLoading: boolean;
	error: Error | string | null;
	fetchSession: () => Promise<void>;
	loginWithMagicLink: (email: string) => Promise<void>;
	signInWithGoogle: () => Promise<void>;
	signOut: () => Promise<void>;
};

export const useAuth = create<AuthState>((set) => ({
	user: null,
	isLoading: false,
	error: null,

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
			set({
				error: e instanceof Error ? e : new Error("Failed to fetch session"),
				isLoading: false,
			});
		}
	},

	loginWithMagicLink: async (email: string) => {
		set({ isLoading: true, error: null });
		try {
			const { error: magicLinkError } = await authClient.signIn.magicLink({
				email,
				callbackURL: `${window.location.origin}/`,
			});
			if (magicLinkError) {
				log.error("MAGIC LINK SEND ERROR", magicLinkError);
				set({
					user: null,
					isLoading: false,
					error: magicLinkError.message || "Failed to send magic link",
				});
				throw new Error(magicLinkError.message || "Failed to send magic link");
			}

			set({ isLoading: false });
		} catch (e) {
			log.error("LOGIN WITH MAGIC LINK ERROR:", e);
			set({
				error: e instanceof Error ? e : new Error("Login failed"),
				isLoading: false,
			});
			throw e;
		}
	},

	signInWithGoogle: async () => {
		set({ isLoading: true, error: null });
		try {
			await authClient.signIn.social({
				provider: "google",
				callbackURL: "/",
			});
			set({ isLoading: false });
		} catch (e) {
			log.error("GOOGLE SIGN IN ERROR:", e);
			const errorMessage =
				e instanceof Error ? e.message : "Failed to sign in with Google.";
			set({
				error: errorMessage,
				isLoading: false,
			});
			throw new Error(errorMessage);
		}
	},

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

// init session fetch on store mount
useAuth.getState().fetchSession();

// periodic session refresh
const sessionRefreshInterval = setInterval(
	() => {
		useAuth.getState().fetchSession();
	},
	5 * 60 * 1000,
);

// clear session refresh interval on window unload
if (typeof window !== "undefined") {
	window.addEventListener("unload", () => clearInterval(sessionRefreshInterval));
}
