/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuração de imagens (quando necessário)
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
