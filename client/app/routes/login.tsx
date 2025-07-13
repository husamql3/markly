import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

import type { Route } from "./+types/home";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useAuth } from "@/stores/auth";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Login - Markly" },
    { name: "description", content: "Sign in to your Markly account" },
  ];
}

export default function Login() {
  const { loginWithMagicLink, signInWithGoogle, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");

  const handleMagicLinkSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Sending magic link...");
    console.log(import.meta.env.VITE_SERVER_URL);

    try {
      await loginWithMagicLink(email);

      toast.success(
        "Magic link sent! Check your email and click the link to sign in.",
        { id: toastId }
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send magic link. Please try again.",
        { id: toastId }
      );
    }
  };

  const handleGoogleSignIn = async () => {
    const toastId = toast.loading("Signing in with Google...");
    
    try {
      await signInWithGoogle();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to sign in with Google. Please try again.",
        { id: toastId }
      );
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <main className="flex h-svh flex-col items-center justify-center gap-6">
      <FlickeringGrid
        className="absolute inset-0 z-10 size-full rounded-full [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={5}
        color="#3F3F47"
        maxOpacity={0.5}
        flickerChance={0.1}
      />

      <div className="w-full max-w-sm z-20 space-y-5">
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-semibold">Welcome to Markly</h1>
            <p className="text-sm font-light text-zinc-400">
              New here or coming back? Choose how you want to continue
            </p>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Google logo</title>
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background relative z-10 px-2 text-zinc-400">
              OR
            </span>
          </div>

          <form
            className="flex flex-col gap-6"
            onSubmit={handleMagicLinkSubmit}
          >
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                autoComplete=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Magic Link"}
            </Button>
          </form>
        </div>

        <div className="*:[a]:hover:text-primary text-center text-xs text-balance text-zinc-500 *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="/terms-of-service">Terms of Service</a> and{" "}
          <a href="/privacy-policy">Privacy Policy</a>.
        </div>
      </div>
    </main>
  );
}
