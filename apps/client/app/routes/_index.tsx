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

const Root = () => {
  return <main className="flex h-svh items-center justify-center">Root</main>;
};

export default Root;
