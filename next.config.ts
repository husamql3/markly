import type { NextConfig } from "next";

import "@/env";

const nextConfig: NextConfig = {
  output: "standalone",
  distDir: process.env.NODE_ENV === "production" ? ".next" : ".next-dev",
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
