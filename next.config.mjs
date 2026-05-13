import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

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
}

export default withNextIntl(nextConfig);
