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
    {
      protocol: 'https',
      hostname: 'pub-92a3e730cf1d484e9d173f1d83f999f2.r2.dev',
      port: '',
      pathname: '/**',
    },
  ],
},
};

export default nextConfig;