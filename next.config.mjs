import dotenv from 'dotenv';

/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  basePath: "/inventofree-admin",
  async redirects() {
    return [
      {
          source: '/',
          destination: '/inventofree-admin',
          basePath: false,
          permanent: false
      }
    ]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.titocodes',
      },
    ],
  },
}

export default nextConfig