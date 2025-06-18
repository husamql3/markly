export const meta = () => {
  return [
    { title: "About - Markly" },
    {
      property: "og:title",
      content: "About Markly",
    },
    {
      name: "description",
      content: "Learn more about Markly!",
    },
  ];
};

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">About Markly</h1>
        <div className="prose prose-zinc prose-invert max-w-none">
          <p className="text-lg text-zinc-300 leading-relaxed">
            Markly is a powerful markdown editor and viewer designed to make writing and organizing your content effortless.
          </p>
          <p className="text-zinc-400 mt-4">
            Built with modern web technologies, Markly provides a seamless experience for creating, editing, and sharing markdown documents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
