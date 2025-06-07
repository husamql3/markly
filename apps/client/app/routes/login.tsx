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

const Login = () => {
  return <main className="flex h-svh items-center justify-center">Auth</main>;
};

export default Login;
