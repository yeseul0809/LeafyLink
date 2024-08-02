'use client';

import React from 'react';
import { createClient } from '@/supabase/supabaseClient';
import Image from 'next/image';

type OAuthProvider = 'google' | 'kakao';

const handleSocialLogin = async (provider: OAuthProvider) => {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
      // redirectTo: `${process.env.NEXT_PUBLIC_REDIRECT_URL}/auth/callback`
    }
  });

  if (error) {
    console.error(`Error logging in with ${provider}:`, error.message);
  }
};

function SocialLoginButtons() {
  const handleLogin =
    (provider: OAuthProvider) => async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      await handleSocialLogin(provider);
    };

  return (
    <form className="flex flex-col gap-[20px] xs:gap-[4px]">
      <button
        onClick={handleLogin('kakao')}
        className="w-[400px] h-[56px] rounded-md font-semibold bg-[#F9DB00] flex justify-center items-center gap-[4px] text-[16px] xs:w-[295px]"
      >
        <Image src="/icons/kakao.png" alt="kakaoImg" width={20} height={20} />
        카카오톡 로그인/회원가입
      </button>
      <button
        onClick={handleLogin('google')}
        className="w-[400px] h-[56px] font-semibold border border-grayscale-gray-500 rounded-[6px] flex items-center justify-center gap-[4px] xs:w-[295px]"
      >
        <Image src="/icons/google.png" alt="googleImg" width={20} height={20} />
        구글 로그인/회원가입
      </button>
    </form>
  );
}

export default SocialLoginButtons;
