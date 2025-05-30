/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [
      'crests.football-data.org',
      'media.api-sports.io',
      'a.espncdn.com',
      'ui-avatars.com',
      'www.premierleague.com',
      'www.laliga.com',
      'www.bundesliga.com',
      'www.ligue1.com',
      'img.uefa.com',
      'spl.sa'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

export default nextConfig
