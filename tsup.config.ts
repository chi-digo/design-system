import { defineConfig } from "tsup";
import { readdirSync, cpSync, existsSync } from "fs";

const componentFiles = readdirSync("src/components")
  .filter((f) => f.endsWith(".tsx") && f !== "index.ts")
  .map((f) => `src/components/${f}`);

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/tailwind-preset.ts",
    "src/components/index.ts",
    ...componentFiles,
  ],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.jsx = "automatic";
    options.banner = { js: '"use client";' };
  },
  onSuccess: async () => {
    cpSync("src/tokens", "dist/tokens", { recursive: true });
    if (existsSync("src/fonts")) cpSync("src/fonts", "dist/fonts", { recursive: true });
  },
});
