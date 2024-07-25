'use client';

import React from 'react';
import { createClient } from '@/supabase/supabaseClient';

type OAuthProvider = 'google' | 'kakao';

const handleSocialLogin = async (provider: OAuthProvider) => {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
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
    <form className="flex flex-col gap-2">
      <button onClick={handleLogin('kakao')} className="w-[618px]">
        카카오 로그인
      </button>
      <button onClick={handleLogin('google')} className="w-[618px]">
        구글 로그인
      </button>
    </form>
  );
}

export default SocialLoginButtons;
