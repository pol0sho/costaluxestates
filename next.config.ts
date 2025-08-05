import type { NextConfig } from 'next';


const nextConfig: NextConfig = {
  output: 'export',

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true, // <- this disables _next/image optimization
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