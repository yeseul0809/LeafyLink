'use client';

import React, { useEffect } from 'react';
import supabase from '@/supabase/supabaseClient';
import { useRouter } from 'next/navigation';

function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const saveUserToDatabase = async (user: any) => {
      const userData = {
        user_id: user.id,
        user_name: user.user_metadata.full_name,
        avatar_url: user.user_metadata.avatar_url,
        email: user.email,
        phone: '000-0000-0000',
        address: 'korean',
        created_at: user.created_at
      };

      try {
        const { error } = await supabase.from('User').upsert([userData]);
        if (error) {
          console.error('유저 정보를 데이터베이스에 저장하는 중 에러 발생:', error.message);
        } else {
          console.log('유저 정보를 데이터베이스에 성공적으로 저장');
        }
      } catch (error: any) {
        console.error('유저 정보를 데이터베이스에 저장하는 중 에러 발생:', error.message);
      }
    };

    const getUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      return data;
    };

    const handleAuthCallback = async () => {
      const { session } = await getUserSession();
      if (session) {
        await saveUserToDatabase(session.user);
        router.push('/');
      }
    };

    handleAuthCallback();
  }, [router]);

  return <div>로그인 중...</div>;
}

export default AuthCallback;
