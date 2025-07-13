import type { Route } from "./+types/home";
import { Link } from "react-router";
import { useAuth } from "@/lib/use-auth";
import { Button } from "@/components/ui/button";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Markly" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { session, isAuthenticated, isPending, signOut } = useAuth();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-svh flex justify-center items-center">
      {isAuthenticated ? (
        <div>
          <div>{JSON.stringify(session, null, 2)}</div>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
      ) : (
        <Link to="/login">login</Link>
      )}
    </div>
  );
}
