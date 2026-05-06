import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/design-system",
  transpilePackages: ["@chidigo/design-system"],
  images: { unoptimized: true },
};

export default nextConfig;
