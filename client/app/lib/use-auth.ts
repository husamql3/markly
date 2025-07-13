import { useNavigate } from "react-router";
import { authClient } from "./auth-client";

export function useAuth() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  const signOut = async () => {
    try {
      await authClient.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const isAuthenticated = !!session;
  const user = session?.user;

  return {
    user,
    session,
    isAuthenticated,
    isPending,
    signOut,
  };
} 