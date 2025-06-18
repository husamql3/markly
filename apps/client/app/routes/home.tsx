import { Hero } from "@/components/home/hero";
import { SplineAnimation } from "@/components/home/spline-animation";
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
    <div className="container mx-auto flex flex-col px-3">
      <motion.div
        className="flex flex-col items-center justify-center gap-4 py-14 text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <Hero />
        <SplineAnimation />
      </motion.div>
    </div>
  );
};

export default Index;
