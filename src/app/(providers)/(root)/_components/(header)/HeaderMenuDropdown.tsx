'use client';
import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import useUser from '@/hooks/user/useUser';
import useSeller from '@/hooks/user/useSeller';

function HeaderMenuDropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLogin, setLogout } = useAuthStore();
  const { userData } = useUser()!;
  const { sellerData } = useSeller(userData?.user_id!);

  return (
    <div className="max-w-[1240px] ">
      <div
        className="h-[246px] w-full flex justify-between max-w-container-lv2 p-4 mt-[1px] pt-8 flex absolute top-full leading-5 text-center bg-white text-sm"
        ref={dropdownRef}
      >
        <ul className="flex w-[624px] justify-between">
          <li className="">
            <a href="/productsList/seed">씨앗</a>
          </li>
          <li>
            <a href="/productsList/seedling">모종</a>
          </li>
          <li>
            <a href="/productsList/kit">재배키트</a>
          </li>
          <li>
            <a href="/productsList/soil">흙/비료</a>
          </li>
          <li>
            <a href="/productsList/goods">원예용품</a>
          </li>
        </ul>
        {/* xl:ml-[343px] lg:ml-[300px]  md:ml-[150px] sm:ml-[100px] */}
        <div className="w-[273px] flex justify-between text-left">
          <div className="h-[110px] border-l"></div>
          <ul className="w-[112px]">
            {sellerData ? (
              <>
                <li className="pb-2">
                  <Link href="/seller/mypage/orders">주문 내역</Link>
                </li>
                <li className="pb-2">
                  <Link href="/seller/mypage/products">판매중인 상품</Link>
                </li>
                <li className="pb-2">
                  <Link href="/seller/mypage/profile">회원정보 변경</Link>
                </li>
              </>
            ) : (
              <>
                <li className="pb-2">
                  <Link href="/buyer/mypage/profile">마이페이지</Link>
                </li>
                <li className="pb-2 text-[##767676]">
                  <Link href="/buyer/mypage/orders">구매내역 조회</Link>
                </li>
                <li className="pb-2 text-[##767676]">
                  <Link href="/buyer/mypage/profile">회원정보 변경</Link>
                </li>
                <li className="pb-2 text-[##767676]">
                  <Link href="/buyer/mypage/BusinessCheck">사업자 인증</Link>
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
                  <button>로그인</button>
                </li>
                <li className="pb-2">
                  <button>회원가입</button>
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
