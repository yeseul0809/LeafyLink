'use client';
import { createClient } from '@/supabase/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import useSeller from '@/hooks/user/useSeller';
import useUser from '@/hooks/user/useUser';
import { useQueryClient } from '@tanstack/react-query';

function HeaderLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isLogin, setIsLogin, setLogout } = useAuthStore();
  const [profileLink, setProfileLink] = useState('/');

  const { userData } = useUser()!;
  const { sellerData } = useSeller(userData?.user_id!);
  console.log(userData);

  // 페이지 네비게이션
  const redirect = (e: string) => {
    router.push(`${e}`);
  };

  // 로그인 상태
  useEffect(() => {
    if (userData) {
      setIsLogin(true);
      if (sellerData) {
        setProfileLink('/seller/mypage/profile');
      } else {
        setProfileLink('/buyer/mypage/profile');
      }
    } else {
      setIsLogin(false);
    }
  }, [userData]);

  // if (isPending) {
  //   // 로딩중일 때
  //   return (
  //     <div className="w-full h-20 flex items-center justify-between">
  //       <div></div>
  //       <div className="로그인X">
  //         <button className="mr-10 text-zinc-500 hover:text-zinc-950 bg-red-800 w-100 h-30">
  //           Loading..
  //         </button>
  //         <button
  //           className="text-zinc-500 hover:text-zinc-950 bg-red-800 w-100 h-30"
  //           onClick={() => {
  //             redirect('/login');
  //           }}
  //         >
  //           Loading..
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <section>
      <div className="w-full h-20 flex items-center justify-between">
        <Link href={'/'}>
          <Image src="/icons/logo.svg" alt="logo" width={152} height={41} />
        </Link>
        {isLogin ? (
          <div className="로그인O flex items-center text-zinc-500">
            <Image
              src={userData?.avatar_url || '/icons/default-avatar.png'}
              alt="user profile image"
              width={28}
              height={28}
              className="rounded-full h-[28px]"
            />
            <Link href={profileLink}>
              <p className="ml-3 hover:text-zinc-950">
                {sellerData?.business_name || userData?.user_name}
              </p>
            </Link>
            <button
              className="ml-10 hover:text-zinc-950"
              onClick={() => {
                setLogout(isLogin);
                queryClient.removeQueries({ queryKey: ['user'] }); // 로그아웃 시 user 박스 삭제
              }}
            >
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
