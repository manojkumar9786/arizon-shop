/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["fakestoreapi.com", "images.unsplash.com", "randomuser.me"],
    unoptimized: true,
  },
}

module.exports = nextConfig
