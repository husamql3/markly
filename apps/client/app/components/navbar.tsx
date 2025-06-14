import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(100);
  const SCROLL_THRESHOLD_PERCENT = 40; // Renamed for clarity
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setWidth(100);
      return;
    }

    const fullHeight = document.documentElement.clientHeight;
    const threshold = (fullHeight * SCROLL_THRESHOLD_PERCENT) / 100;

    if (scrollY > threshold) {
      setWidth(50);
    } else {
      setWidth(100);
    }
  }, [scrollY, isMobile]);

  return (
    <header className="my-5 px-3">
      <motion.nav
        id="navbar"
        className={cn(
          "bg-foreground mx-auto flex max-w-7xl transform-gpu items-center justify-between rounded-lg border p-2 px-3 backdrop-blur-sm transition-all duration-500 ease-out",
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, width: `${width}%` }}
        transition={{ duration: 0.5, type: "spring", bounce: 0 }}
      >
        hi
      </motion.nav>
    </header>
  );
};
