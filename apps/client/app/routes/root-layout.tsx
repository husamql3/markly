import { Outlet } from "react-router";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <Navbar />

      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;
