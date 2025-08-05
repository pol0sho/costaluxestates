import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',                // <-- Enables static HTML export
  trailingSlash: true,            // <-- Required to support nested routes like /properties

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,            // <-- Required for static export with Next.js
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