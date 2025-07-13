import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/use-auth";

export function meta() {
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
    <div className="flex h-svh items-center justify-center">
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
