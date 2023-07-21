/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['dev-nest', 'localhost', 'api.blog.steinjun.net']
  },
}

const removeImports = require('next-remove-imports')();
module.exports = removeImports(nextConfig);

// module.exports = nextConfig
