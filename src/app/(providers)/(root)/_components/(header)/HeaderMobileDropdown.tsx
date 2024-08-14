'use client';
import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import useUser from '@/hooks/user/useUser';
import useSeller from '@/hooks/user/useSeller';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

function HeaderMobileDropdown({
  setIsOpenMobileMenu
}: {
  setIsOpenMobileMenu: (value: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLogin, setLogout } = useAuthStore();
  const { userData } = useUser()!;
  const { sellerData } = useSeller(userData?.user_id!);
  const router = useRouter();

  // 페이지 네비게이션
  const redirect = (e: string) => {
    setIsOpenMobileMenu(false);
    router.push(`${e}`);
  };

  return (
    <section className="w-1/2 h-auto py-6 bg-white z-20 absolute top-full left-0">
      <div className="leading-5 text-sm" ref={dropdownRef}>
        <ul className="w-full px-4 pb-5 border-b flex justify-between items-center">
          {isLogin ? (
            <>
              <li>
                <button
                  className="flex justify-between items-center"
                  onClick={() => {
                    redirect('/buyer/mypage/profile');
                  }}
                >
                  <Image
                    src={userData?.avatar_url!}
                    alt="프로필 이미지"
                    width={24}
                    height={24}
                    className="rounded-full w-[24px] h-[24px] mr-2"
                  />
                  {userData?.user_name}
                </button>
              </li>
              <li className="bold">
                <button
                  onClick={() => {
                    setLogout(isLogin);
                    queryClient.removeQueries({ queryKey: ['user'] });
                  }}
                >
                  로그아웃
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="pb-2 bold">
                <button
                  onClick={() => {
                    redirect('/login');
                  }}
                >
                  로그인
                </button>
              </li>
              <li className="pb-2 bold">
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
        <ul className="text-start pl-5 pt-5 pb-5">
          <li className="pb-5 bold">
            <button
              onClick={() => {
                redirect('/productsList/씨앗');
              }}
            >
              씨앗
            </button>
          </li>
          <li className="pb-5 bold">
            <button
              onClick={() => {
                redirect('/productsList/모종');
              }}
            >
              모종
            </button>
          </li>
          <li className="pb-5 bold">
            <button
              onClick={() => {
                redirect('/productsList/재배키트');
              }}
            >
              재배키트
            </button>
          </li>
          <li className="pb-5 bold">
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
        <div className="">
          <ul className="border-t pl-4 pb-5 pt-5">
            {sellerData ? (
              <>
                <li className="pb-5 bold">
                  <button
                    onClick={() => {
                      redirect('/buyer/mypage/profile');
                    }}
                  >
                    마이페이지
                  </button>
                </li>
                <li className="pb-5 pl-4 text-[#767676] text-sm">
                  <button
                    onClick={() => {
                      redirect('/seller/mypage/orders');
                    }}
                  >
                    주문 내역
                  </button>
                </li>
                <li className="pb-5 pl-4 text-[#767676] text-sm">
                  <button
                    onClick={() => {
                      redirect('/seller/mypage/products');
                    }}
                  >
                    판매중인 상품
                  </button>
                </li>
                <li className="pb-5 pl-4 text-[#767676] text-sm">
                  <button
                    onClick={() => {
                      redirect('/seller/mypage/profile');
                    }}
                  >
                    회원정보 변경
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="pb-5">
                  <button
                    onClick={() => {
                      redirect('/buyer/mypage/profile');
                    }}
                  >
                    마이페이지
                  </button>
                </li>
                <li className="pb-5 pl-4 text-[#767676] text-sm">
                  <button
                    onClick={() => {
                      redirect('/buyer/mypage/orders');
                    }}
                  >
                    구매내역 조회
                  </button>
                </li>
                <li className="pb-5 pl-4 text-[#767676] text-sm">
                  <button
                    onClick={() => {
                      redirect('/buyer/mypage/profile');
                    }}
                  >
                    회원정보 변경
                  </button>
                </li>
                <li className="pb-5 pl-4 text-[#767676] text-sm">
                  <button
                    onClick={() => {
                      redirect('/buyer/mypage/BusinessCheck');
                    }}
                  >
                    사업자 인증
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
