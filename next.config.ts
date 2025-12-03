import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "13.202.250.74",
        port: "8083",
        pathname: "/images/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
