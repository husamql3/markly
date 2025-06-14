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

const Index = () => {
  return (
    <main>
      <Navbar />
    </main>
  );
};

export default Index;
