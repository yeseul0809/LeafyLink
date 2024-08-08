'use client';
import { useAuthStore } from '@/stores/authStore';
import React, { useRef } from 'react';

function HeaderMenuDropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLogin, setLogout } = useAuthStore();
  return (
    <div>
      <div
        className="w-full h-[246px] p-4 mt-[1px] pt-8 flex absolute top-full leading-5 text-center bg-white text-sm"
        ref={dropdownRef}
      >
        <ul className="flex">
          <li>
            <a href="/productsList/seed">씨앗</a>
          </li>
          <li className="ml-[100px]">
            <a href="/productsList/seedling">모종</a>
          </li>
          <li className="ml-[100px]">
            <a href="/productsList/kit">재배키트</a>
          </li>
          <li className="ml-[100px]">
            <a href="/productsList/soil">흙/비료</a>
          </li>
          <li className="ml-[100px]">
            <a href="/productsList/goods">원예용품</a>
          </li>
        </ul>

        <div className="flex justify-start text-left">
          <div className="h-[110px] border-l pl-8 ml-[343px]"></div>
          <ul className="w-[112px]">
            <li className="pb-2">
              <a href="">마이페이지</a>
            </li>
            <li className="pb-2 text-[##767676]">
              <a href="">주문내역 조회</a>
            </li>
            <li className="pb-2 text-[##767676]">
              <a href="">회원정보 변경</a>
            </li>
            <li className="pb-2 text-[##767676]">
              <a href="">사업자 인증</a>
            </li>
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
