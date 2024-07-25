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
      }
    ],
    domains: ['k.kakaocdn.net'] // 여기에 이미지 호스트명을 추가합니다.
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY
  }
};

export default nextConfig;
