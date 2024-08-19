'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderMenuDropdown from './HeaderMenuDropdown';

function HeaderMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const router = useRouter();

  // 페이지 네비게이션
  const redirect = (e: string) => {
    router.push(`${e}`);
    setIsOpenMenu(false);
  };
  // 메뉴 토글
  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <section>
      <div className="w-[339px]">
        <div className="flex items-center justify-between">
          <button onClick={toggleMenu}>
            <Image src="/icons/icon-menu.svg" alt="menu" width={24} height={24}></Image>
          </button>

          <button
            className="flex text-[#3BB873] font-semibold"
            onClick={() => {
              redirect('/livestreaming');
            }}
          >
            라이브커머스
            <Image
              src="/icons/icon-live.svg"
              alt="live"
              width={18}
              height={15}
              className="ml-1 mt-1"
            ></Image>
          </button>
          <button
            className=""
            onClick={() => {
              redirect('/#bestSeller');
            }}
          >
            베스트셀러
          </button>
          <button
            className=""
            onClick={() => {
              redirect('/#goods');
            }}
          >
            식집사템
          </button>
        </div>
      </div>
      {isOpenMenu && <HeaderMenuDropdown />}
    </section>
  );
}

export default HeaderMenu;
