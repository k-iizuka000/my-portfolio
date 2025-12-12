/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  ...(process.env.NODE_ENV === 'production' ? {
    basePath: '/my-portfolio',
    assetPrefix: '/my-portfolio',
  } : {})
}

module.exports = nextConfig 