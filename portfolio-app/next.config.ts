import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  turbopack: {},
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
