'use client';
import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import useUser from '@/hooks/user/useUser';
import useSeller from '@/hooks/user/useSeller';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

function HeaderMobileDropdown() {
  const queryClient = useQueryClient();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLogin, setLogout } = useAuthStore();
  const { userData } = useUser()!;
  const { sellerData } = useSeller(userData?.user_id!);
  const router = useRouter();
  // 페이지 네비게이션
  const redirect = (e: string) => {
    router.push(`${e}`);
  };
  return (
    <section className="w-1/2 h-auto py-8 bg-zinc-100 z-20 absolute top-full left-0">
      <div className="leading-5 text-sm" ref={dropdownRef}>
        <ul className="w-full px-4 border-b flex justify-between items-center">
          <li>
            <button
              onClick={() => {
                redirect('/buyer/mypage/profile');
              }}
            >
              {/* <Image src={userData?.avatar_url} alt="프로필 이미지" width={24} height={24} /> */}
              {userData?.user_name}님
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setLogout(isLogin);
                queryClient.removeQueries({ queryKey: ['user'] });
              }}
            >
              로그아웃
            </button>
          </li>
        </ul>
        <ul className="text-start">
          <li className="pb-2">
            <Link href={'/productsList/seed'}>씨앗</Link>
          </li>
          <li className="pb-2">
            <Link href={'/productsList/seedling'}>모종</Link>
          </li>
          <li className="pb-2">
            <Link href={'/productsList/kit'}>재배키트</Link>
          </li>
          <li className="pb-2">
            <Link href={'/productsList/soil'}>흙/비료</Link>
          </li>
          <li className="pb-2">
            <Link href={'/productsList/goods'}>원예용품</Link>
          </li>
        </ul>
        <div className="">
          <ul className="flex justify-between items-start border-t">
            {sellerData ? (
              <>
                <li className="pb-2">
                  <Link href={'/buyer/mypage/profile'}>마이페이지</Link>
                </li>
                <li className="pb-2 pl-2 text-[##767676] text-sm">
                  <Link href={'/seller/mypage/orders'}>주문 내역</Link>
                </li>
                <li className="pb-2 pl-2 text-[##767676] text-sm">
                  <Link href={'/seller/mypage/products'}>판매중인 상품</Link>
                </li>
                <li className="pb-2 pl-2 text-[##767676] text-sm">
                  <Link href={'/seller/mypage/profile'}>회원정보 변경</Link>
                </li>
              </>
            ) : (
              <>
                <li className="pb-2">
                  <Link href={'/buyer/mypage/profile'}>마이페이지</Link>
                </li>
                <li className="pb-2 pl-2 text-[##767676] text-sm">
                  <Link href={'/buyer/mypage/orders'}>구매내역 조회</Link>
                </li>
                <li className="pb-2 pl-2 text-[##767676] text-sm">
                  <Link href={'/buyer/mypage/profile'}>회원정보 변경</Link>
                </li>
                <li className="pb-2 pl-2 text-[##767676] text-sm">
                  <Link href={'/buyer/mypage/BusinessCheck'}>사업자 인증</Link>
                </li>
              </>
            )}
          </ul>
          <ul>
            {isLogin ? (
              <li className="pb-2">
                <button
                  onClick={() => {
                    setLogout(isLogin);
                  }}
                >
                  로그아웃
                </button>
              </li>
            ) : (
              <>
                <li className="pb-2">
                  <button
                    onClick={() => {
                      redirect('/login');
                    }}
                  >
                    로그인
                  </button>
                </li>
                <li className="pb-2">
                  <button
                    onClick={() => {
                      redirect('/login');
                    }}
                  >
                    회원가입
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default HeaderMobileDropdown;
