import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	allConfig: {
		ignorePatterns: [
			"logs",
			"*.log",
			"npm-debug.log*",
			"yarn-debug.log*",
			"yarn-error.log*",
			"pnpm-debug.log*",
			"lerna-debug.log*",
			"node_modules",
			"dist",
			"dist-ssr",
			"*.local",
			".vscode/*",
			"!.vscode/extensions.json",
			".idea",
			".DS_Store",
			"*.suo",
			"*.ntvs*",
			"*.njsproj",
			"*.sln",
			"*.sw?",
			".env.*",
			"docs/.vitepress/cache",
			"docs/.vitepress/dist",
		],
	},
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript")];

export default eslintConfig;
