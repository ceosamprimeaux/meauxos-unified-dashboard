/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Use webpack instead of Turbopack for compatibility
  experimental: {
    turbo: false,
  },
};

module.exports = nextConfig;
