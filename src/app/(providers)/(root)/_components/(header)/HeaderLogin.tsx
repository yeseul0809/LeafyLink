'use client';
import { createClient } from '@/supabase/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

function HeaderLogin() {
  const router = useRouter();
  const { isLogin, setIsLogin } = useAuthStore();
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [profileLink, setProfileLink] = useState('/');
  const [businessName, setBusinessName] = useState('');

  // 페이지 네비게이션
  const redirect = (e: string) => {
    router.push(`${e}`);
  };

  // 로그인 상태
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async (res) => {
      if (res.data.user) {
        setIsLogin(true);
        const userId = res.data.user.id;
        setUserName(res.data.user.identities![0].identity_data?.full_name);
        setUserAvatar(res.data.user.identities![0].identity_data?.avatar_url);

        const fetchSellerData = async (userId: string) => {
          try {
            const { data, error } = await supabase
              .from('Seller')
              .select('seller_id, business_name')
              .eq('seller_id', userId)
              .maybeSingle();

            if (error) {
              return null;
            }

            return data;
          } catch (error) {
            return null;
          }
        };

        const sellerData = await fetchSellerData(userId);
        if (sellerData) {
          setBusinessName(sellerData.business_name);
          setProfileLink('/seller/mypage/profile');
        } else {
          setProfileLink('/buyer/mypage/profile');
        }
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  // 로그아웃 상태
  const logout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('로그아웃 실패', error);
    } else {
      window.location.href = '/';
    }
  };
  return (
    <section>
      <div className="w-full h-20 flex items-center justify-between">
        <Link href={'/'}>
          <Image src="/icons/logo.svg" alt="logo" width={152} height={41} />
        </Link>
        {isLogin ? (
          <div className="로그인O flex items-center text-zinc-500">
            <Image
              src={userAvatar}
              alt="user profile image"
              width={28}
              height={28}
              className="rounded-full h-[28px]"
            />
            <Link href={profileLink}>
              <p className="ml-3 hover:text-zinc-950">{businessName || userName}</p>
            </Link>
            <button className="ml-10 hover:text-zinc-950" onClick={logout}>
              로그아웃
            </button>
          </div>
        ) : (
          <div className="로그인X">
            <button
              className="mr-10 text-zinc-500 hover:text-zinc-950"
              onClick={() => {
                redirect('/login');
              }}
            >
              로그인
            </button>
            <button
              className="text-zinc-500 hover:text-zinc-950"
              onClick={() => {
                redirect('/login');
              }}
            >
              회원가입
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default HeaderLogin;
