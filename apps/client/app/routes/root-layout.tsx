import { Outlet } from "react-router";
import { Navbar } from "@/components/navbar";

export const meta = () => {
  return [
    { title: "Markly" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "Welcome to Markly!",
    },
  ];
};

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Optional footer */}
      <footer className="border-t border-zinc-800 px-4 py-8">
        <div className="container mx-auto text-center text-sm text-zinc-400">
          <p>&copy; 2024 Markly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
