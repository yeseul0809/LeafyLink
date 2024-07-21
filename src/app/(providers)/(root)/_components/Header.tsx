'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  console.log(isOpen);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section>
      <div className="w-full h-[45px] text-center flex items-center justify-center bg-zinc-300 px-[190px]">
        오늘의 날씨는 비내림, 물을 주지 않아도 되겠어요!
      </div>

      <div className="w-full h-20 px-[190px] flex items-center justify-between">
        <Link href={'/'}>
          <Image src="/icons/logo.svg" alt="logo" width={100} height={30}></Image>
        </Link>
        <div>
          <button className="mr-10 text-zinc-500 hover:text-zinc-950">로그인</button>
          <button className="text-zinc-500 hover:text-zinc-950">회원가입</button>
        </div>
        {/* <div>
          <Image></Image> <p>{user.name}님</p>
          <button>로그아웃</button>
        </div> */}
      </div>

      <div className="h-[62px] flex items-center justify-between px-[190px] border-b">
        <div className="flex">
          <button onClick={toggleMenu}>
            <Image src="/icons/icon-menu.svg" alt="menu" width={24} height={24}></Image>
          </button>
          <button className="ml-7 flex text-[#FF0000]">
            라이브커머스{' '}
            <Image src="/icons/icon-live.svg" alt="live" width={18} height={15}></Image>
          </button>
          <button className="ml-7">베스트셀러</button>
          <button className="ml-7">식집사템</button>
        </div>

        {isOpen && (
          <div className="flex" ref={dropdownRef}>
            <button className="ml-[48px]">
              <Image src="/icons/icon-search.svg" alt="search" width={32} height={32}></Image>
            </button>
            <button className="ml-[48px]">
              <Image src="/icons/icon-message.svg" alt="search" width={32} height={32}></Image>
            </button>
            <button className="ml-[48px]">
              <Image src="/icons/icon-cart.svg" alt="search" width={32} height={32}></Image>
            </button>
            <button className="ml-[48px]">
              <Image src="/icons/icon-mypage.svg" alt="search" width={32} height={32}></Image>
            </button>
          </div>
        )}
      </div>

      <div className="w-full h-auto py-[30px] px-[190px] border-b">
        <ul className="flex">
          <li className="text-zinc-500 hover:text-zinc-950">
            <a href="#">씨앗</a>
          </li>
          <li className="ml-7 text-zinc-500 hover:text-zinc-950">
            <a href="#">모종</a>
          </li>
          <li className="ml-7 text-zinc-500 hover:text-zinc-950">
            <a href="#">재배키트</a>
          </li>
          <li className="ml-7 text-zinc-500 hover:text-zinc-950">
            <a href="#">흙/비료</a>
          </li>
          <li className="ml-7 text-zinc-500 hover:text-zinc-950">
            <a href="#">원예용품</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Header;
