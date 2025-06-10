import baseConfig from "@markly/jest-presets/node/jest-preset";
import type { Config } from "jest";

const config: Config = {
	...baseConfig,
	displayName: "server",
	testEnvironment: "node",
	testMatch: ["**/__tests__/**/*.test.ts"],
	transform: {
		"^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
	},
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
};

export default config;
