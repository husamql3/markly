import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { IoLogoGithub } from "react-icons/io";

import { cn } from "@/lib/utils";
import { LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(100);
  const [scrollY, setScrollY] = useState(0);
  const SCROLL_THRESHOLD_PERCENT = 40;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
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
    <motion.nav
      id="navbar"
      className={cn(
        "fixed top-4 left-1/2 container flex -translate-x-1/2 transform-gpu items-center justify-between rounded-lg border bg-zinc-950/50 px-4 py-2 backdrop-blur-sm transition-all duration-500 ease-out",
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, width: `${width}%` }}
      transition={{ duration: 0.5, type: "spring", bounce: 0 }}
    >
      <div className="flex items-center space-x-6">
        <Link className="font-semibold" to="/">
          Markly
        </Link>

        <div className="space-x-3 text-sm font-light text-zinc-400">
          {LINKS.map((links) => (
            <Link
              key={links.href}
              to={links.href}
              className="transition-colors duration-300 hover:text-zinc-50"
            >
              {links.label}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <Link to="https://github.com/husamql3/markly">
          <Button variant="ghost" size="icon">
            <IoLogoGithub />
          </Button>
        </Link>
      </div>
    </motion.nav>
  );
};
