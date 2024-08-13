'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/supabaseClient';

function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const saveUserToDatabase = async (user: any) => {
      const userData = {
        // 구매자
        user_id: user.id,
        user_name: user.user_metadata.full_name,
        avatar_url: user.user_metadata.avatar_url || '',
        email: user.email || '',
        phone: '',
        address: '',
        created_at: user.created_at
      };

      try {
        const supabase = createClient();
        const { error } = await supabase.from('User').upsert([userData]);
        if (error) {
          console.error('유저 정보를 데이터베이스에 저장하는 중 에러 발생:', error.message);
        } else {
        }
      } catch (error: any) {
        console.error('유저 정보를 데이터베이스에 저장하는 중 에러 발생:', error.message);
      }
    };

    const checkUserExists = async (userId: string) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('User')
        .select('user_id')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('사용자 확인 중 에러 발생:', error.message);
        return false;
      }

      return data !== null;
    };

    const getUserSession = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      return data;
    };

    const handleAuthCallback = async () => {
      const { session } = await getUserSession();
      if (session) {
        const userExists = await checkUserExists(session.user.id);
        if (!userExists) {
          await saveUserToDatabase(session.user);
        }
        router.push('/');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="w-full h-[200px] flex justify-center items-center">
      <Image src="/loading.gif" alt="로딩이미지" width={200} height={100} className="" />
    </div>
  );
}

export default AuthCallback;
