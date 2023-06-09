/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/api/external/**',
      },
      {
        protocol: 'https',
        hostname: 'images.lct23.dev.40ants.com',
        port: '',
        pathname: '/get/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.cloudflare.steamstatic.com',
        port: '',
        pathname: '/**',
      },
      
    ],
  },
}

module.exports = nextConfig
