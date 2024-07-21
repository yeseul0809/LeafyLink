'use client';
import supabase from '../../../../../supabase/index';
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
    <div>
      <form className="flex flex-col gap-6">
        <button onClick={handleLogin('google')}>Google</button>
        <button onClick={handleLogin('kakao')}>Kakao</button>
      </form>
    </div>
  );
}

export default LoginPage;
