/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack(config) {
    config.resolve.modules.push(__dirname); // 추가
    return config;
  },

  env: {
    DOMAIN: 'https://next-pizza-gilt.vercel.app/api',
  },
};
