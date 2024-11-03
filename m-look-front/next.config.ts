import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    NEXT_BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
