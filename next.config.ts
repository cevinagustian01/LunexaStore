import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/netflix-tool/:path*',
        destination: 'http://157.20.32.218:5006/:path*'
      }
    ]
  }
};

export default nextConfig;
