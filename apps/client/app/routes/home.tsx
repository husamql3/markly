import { motion } from "motion/react";

const container = {
  hidden: {
    opacity: 0.8,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

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
    <div className="container mx-auto flex flex-col gap-24 px-3">
      <motion.div
        className="flex flex-col items-center justify-center gap-4 py-24 text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: -20,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.75,
                type: "spring",
                bounce: 0,
              },
            },
          }}
          className="font-heading flex flex-col items-center justify-center text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl"
        >
          <motion.h1>Your Go-to Image Storage</motion.h1>
          <motion.h1 className="blue-gradient">
            Simple, Secure, and Fast
          </motion.h1>
        </motion.div>

        <motion.p
          variants={{
            hidden: {
              opacity: 0,
              y: -20,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.75,
                type: "spring",
                bounce: 0,
              },
            },
          }}
          className="text-muted-foreground text-base md:text-xl"
        >
          Store and share your images with ease
          <br />
          No more cluttered hard drives or slow uploads
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Index;
