import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/tailwind-preset.ts",
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
    const { cpSync } = await import("fs");
    cpSync("src/tokens", "dist/tokens", { recursive: true });
    cpSync("src/fonts", "dist/fonts", { recursive: true });
  },
});
