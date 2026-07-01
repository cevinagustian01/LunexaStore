import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/aktivasi',
        destination: '/aktivasi.html'
      },
      {
        source: '/api/:path*',
        destination: 'http://berkah.pteroqhost.web.id:5422/api/:path*'
      },
      {
        source: '/netflix-tool/:path*',
        destination: 'http://berkah.pteroqhost.web.id:5422/:path*'
      }
    ]
  }
};

export default nextConfig;
