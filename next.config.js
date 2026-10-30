/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  async redirects() {
    return [
      {
        source: '/:locale/villes/mantes-la-ville',
        destination: '/:locale/villes/limoges',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
