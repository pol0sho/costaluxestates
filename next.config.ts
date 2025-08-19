import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true, // optional

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
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.lawants.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.idiliqhotels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.theolivepress.es',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-92a3e730cf1d484e9d173f1d83f999f2.r2.dev',
        pathname: '/**',
      },
    ],
  },

  // 🔹 Add this block for language routing
  i18n: {
    locales: ['en', 'es', 'nl', 'fr', 'de'], // all supported langs
    defaultLocale: 'en', // fallback
  },
};

export default nextConfig;