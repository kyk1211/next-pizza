/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    // DOMAIN: 'http://localhost:3000',
    DOMAIN: 'https://next-pizza-theta.vercel.app',
  },
};
