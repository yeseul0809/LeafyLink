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
        hostname: 'th1.tmon.kr'
      },
      {
        hostname: 'cdn.011st.com'
      },
      {
        hostname: 'image.guud.com'
      },
      {
        hostname: 'mooluckmooluck.com'
      },
      {
        hostname: 'encrypted-tbn0.gstatic.com'
      },
      {
        hostname: 'gdimg.gmarket.co.kr'
      },
      {
        hostname: 'img.29cm.co.kr'
      },
      {
        hostname: 'thumbnail6.coupangcdn.com'
      },
      {
        hostname: 'asset.m-gs.kr'
      },
      {
        hostname: 'dimg.donga.com'
      },
      {
        hostname: 'm.livin.co.kr'
      },
      {
        hostname: 'thumbnail10.coupangcdn.com'
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
