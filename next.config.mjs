/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cirbxzxyrghkthxdsrpe.supabase.co'
      },
      {
        hostname: 't1.daumcdn.net'
      },
      {
        hostname: 'customer-jxuabwdsyao4ett2.cloudflarestream.com'
      },
      {
        hostname: 'lh3.googleusercontent.com'
      },
      {
        hostname: 'cafe24.poxo.com'
      },
      {
        hostname: 'k.kakaocdn.net'
      },
      {
        hostname: '*.googleusercontent.com'
      },
      {
        hostname: 'cafe24.poxo.com'
      },
      {
        hostname: 'sitem.ssgcdn.com'
      },
      {
        hostname: 'housoop.com'
      },
      {
        hostname: 't1.kakaocdn.net'
      },
      {
        hostname: 'image.guud.com'
      }
    ],
    disableStaticImages: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY
  }
};

export default nextConfig;
