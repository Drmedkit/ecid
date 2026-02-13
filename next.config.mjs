/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['*.worf.replit.dev', '*.replit.dev'],
  serverExternalPackages: ['bcryptjs'],
}

export default nextConfig
