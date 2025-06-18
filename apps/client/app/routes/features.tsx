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

const Features = () => {
  return (
    <main className="flex h-svh items-center justify-center">Features</main>
  );
};

export default Features;
