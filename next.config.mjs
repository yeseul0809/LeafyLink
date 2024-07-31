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
<<<<<<< HEAD
        hostname: 'sitem.ssgcdn.com'
      }
    ],
    domains: ['k.kakaocdn.net']
=======
        hostname: 'k.kakaocdn.net'
      },
      {
        hostname: '*.googleusercontent.com'
      }
    ],
    domains: ['k.kakaocdn.net', 't1.kakaocdn.net']
>>>>>>> ff597c7c843360b6b5ef576ae431555291602497
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY
  }
};

export default nextConfig;
