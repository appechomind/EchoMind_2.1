/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/EchoMind_2.1',
  trailingSlash: true,
}

module.exports = nextConfig 