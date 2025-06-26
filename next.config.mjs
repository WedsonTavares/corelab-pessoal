/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilitar standalone para Docker
  output: 'standalone',

  // Configurações de imagem para otimização
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },

  // Configurações de compilação
  compiler: {
    // Remove console.log em produção
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Configurações experimentais
  serverExternalPackages: ['mongoose'],
};

export default nextConfig;
