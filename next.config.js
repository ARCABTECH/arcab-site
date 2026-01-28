/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuração para export estático (GitHub Pages)
  output: 'export',
  trailingSlash: true,
  // Configuração de imagens (necessário para export estático)
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
