'use client';
import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import useUser from '@/hooks/user/useUser';
import useSeller from '@/hooks/user/useSeller';
import { useRouter } from 'next/navigation';

function HeaderMenuDropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLogin, setLogout } = useAuthStore();
  const { userData } = useUser()!;
  const { sellerData } = useSeller(userData?.user_id!);
  const router = useRouter();

  const redirect = (e: string) => {
    router.push(`${e}`);
  };

  return (
    <div className="max-w-[1240px] z-10">
      <div
        className="h-[246px] w-full flex justify-between max-w-container-lv2 p-4 mt-[1px] pt-8 flex absolute top-full leading-5 text-center bg-white text-sm"
        ref={dropdownRef}
      >
        <ul className="flex w-[624px] justify-between font-semibold">
          <li>
            <button
              onClick={() => {
                redirect('/productsList/씨앗');
              }}
            >
              씨앗
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                redirect('/productsList/모종');
              }}
            >
              모종
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                redirect('/productsList/재배키트');
              }}
            >
              재배키트
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                redirect('/productsList/흙,비료');
              }}
            >
              흙/비료
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                redirect('/productsList/원예용품');
              }}
            >
              원예용품
            </button>
          </li>
        </ul>
        <div className="w-[273px] flex justify-between text-left">
          <div className="h-[110px] border-l"></div>
          <ul className="w-[112px]">
            <li className="pb-2 font-semibold">
              <Link href={'/buyer/mypage/profile'}>마이페이지</Link>
            </li>
            {sellerData ? (
              <>
                <li className="pb-2 text-[#767676]">
                  <Link href={'/seller/mypage/orders'}>주문 내역</Link>
                </li>
                <li className="pb-2 text-[#767676]">
                  <Link href={'/seller/mypage/products'}>판매중인 상품</Link>
                </li>
                <li className="pb-2 text-[#767676]">
                  <Link href={'/seller/mypage/profile'}>회원정보 변경</Link>
                </li>
              </>
            ) : (
              <>
                <li className="pb-2 text-[#767676]">
                  <Link href={'/buyer/mypage/orders'}>구매내역 조회</Link>
                </li>
                <li className="pb-2 text-[#767676]">
                  <Link href={'/buyer/mypage/profile'}>회원정보 변경</Link>
                </li>
                <li className="pb-2 text-[#767676]">
                  <Link href={'/buyer/mypage/BusinessCheck'}>사업자 인증</Link>
                </li>
              </>
            )}
          </ul>
          <ul>
            {isLogin ? (
              <li className="pb-2 font-semibold">
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
                <li className="pb-2 font-semibold">
                  <button
                    onClick={() => {
                      redirect('/login');
                    }}
                  >
                    로그인
                  </button>
                </li>
                <li className="pb-2 font-semibold">
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
    </div>
  );
}

export default HeaderMenuDropdown;
