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
      }
    ]
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY
  }
};

export default nextConfig;
