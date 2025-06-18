import { motion } from "motion/react";

export const Hero = () => {
  return (
    <>
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
    </>
  );
};
