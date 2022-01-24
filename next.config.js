/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    DOMAIN: 'https://next-pizza-gilt.vercel.app',
    // DOMAIN: 'http://localhost:3000',
  },
};
