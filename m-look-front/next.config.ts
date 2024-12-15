import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath:"/m-look",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
