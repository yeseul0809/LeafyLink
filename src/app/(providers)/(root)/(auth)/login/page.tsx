'use client';
import supabase from '@/supabase/supabaseClient';
import React from 'react';

type OAuthProvider = 'google' | 'kakao';

const handleSocialLogin = async (provider: OAuthProvider) => {
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

function LoginPage() {
  const handleLogin =
    (provider: OAuthProvider) => async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      await handleSocialLogin(provider);
    };

  return (
    <div className="flex flex-col justify-center items-center p-10 gap-10">
      <h1>로그인</h1>
      <section>
        <form className="flex flex-col gap-2">
          <button onClick={handleLogin('kakao')} className="w-[618px]">
            카카오 로그인
          </button>
          <button onClick={handleLogin('google')} className="w-[618px]">
            구글 로그인
          </button>
        </form>
      </section>
    </div>
  );
}

export default LoginPage;
