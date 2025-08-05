import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ❌ REMOVE THIS:
  // output: 'export', // This is ONLY for static export. Remove it for SSR.

  trailingSlash: true, // optional — keep if your routes depend on it

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    // ❌ REMOVE THIS if using SSR (only needed for static export)
    // unoptimized: true,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.lawants.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.idiliqhotels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.theolivepress.es',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;