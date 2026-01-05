/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ignore favicon during build
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ico$/,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig;
