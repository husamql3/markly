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
	console.log(import.meta.env.DEV);
	return <main className="flex h-svh items-center justify-center">Home</main>;
};

export default Index;
