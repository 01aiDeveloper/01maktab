/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maktab01-dev-files.s3.eu-north-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.ustozai-app.uz',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.01ai.uz' }],
        destination: 'https://01ai.uz/:path*',
        permanent: true,
      },
    ];
  },
}

export default nextConfig
