import type { NextConfig } from "next"
// import { fileURLToPath } from "node:url";
// import { createJiti } from "jiti";

// const jiti = createJiti(fileURLToPath(import.meta.url));
// void jiti.import("./src/config/env");

const nextConfig: NextConfig = {
	output: "standalone",
	distDir: process.env.NODE_ENV === "production" ? ".next" : ".next-dev",
	// transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
	reactStrictMode: true,
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
	images: {},
}

export default nextConfig
