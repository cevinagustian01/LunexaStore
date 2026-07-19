import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/aktivasi',
        destination: '/aktivasi.html'
      },
      {
        source: '/cms',
        destination: '/cms.html'
      },
      {
        source: '/api/:path*',
        destination: 'http://43.133.43.13:8002/api/:path*'
      },
      {
        source: '/netflix-tool/:path*',
        destination: 'http://43.133.43.13:8002/:path*'
      }
    ]
  }
};

export default nextConfig;
