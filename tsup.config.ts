import { defineConfig } from "tsup";
import { readdirSync, cpSync } from "fs";

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
  },
  onSuccess: async () => {
    cpSync("src/tokens", "dist/tokens", { recursive: true });
    cpSync("src/fonts", "dist/fonts", { recursive: true });
  },
});
