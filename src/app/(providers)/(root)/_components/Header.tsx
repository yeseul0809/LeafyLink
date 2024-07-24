'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const toggleSearch = () => {
    setIsOpenSearch(!isOpenSearch);
  };

  console.log(isOpenMenu);

  const redirect = (e: string) => {
    router.push(`${e}`);
  };

  return (
    <section>
      <div className="w-full h-[45px] text-center flex items-center justify-center bg-zinc-100 px-[190px]">
        수원시의 날씨는 비내림☔, 물을 주지 않아도 되겠어요!
      </div>

      <div className="w-full h-20 px-[190px] flex items-center justify-between">
        <Link href={'/'}>
          <Image src="/icons/logo.svg" alt="logo" width={100} height={30}></Image>
        </Link>
        <div>
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
        {/* <div>
          <Image></Image> <p>{user.name}님</p>
          <button>로그아웃</button>
        </div> */}
      </div>

      <div className="w-full h-[62px] flex items-center justify-between px-[190px] border-b relative">
        <div className="flex">
          <button onClick={toggleMenu}>
            <Image src="/icons/icon-menu.svg" alt="menu" width={24} height={24}></Image>
          </button>
          {isOpenMenu && (
            <div
              className="w-full h-auto py-[30px] px-[190px] border-b bg-white absolute top-12 right-0 text-center"
              ref={dropdownRef}
            >
              <ul className="flex">
                <li className="text-zinc-700 hover:text-zinc-950">
                  <a href="#">씨앗</a>
                </li>
                <li className="ml-7 text-zinc-700 hover:text-zinc-950">
                  <a href="#">모종</a>
                </li>
                <li className="ml-7 text-zinc-700 hover:text-zinc-950">
                  <a href="#">재배키트</a>
                </li>
                <li className="ml-7 text-zinc-700 hover:text-zinc-950">
                  <a href="#">흙/비료</a>
                </li>
                <li className="ml-7 text-zinc-700 hover:text-zinc-950">
                  <a href="#">원예용품</a>
                </li>
              </ul>
            </div>
          )}
          <button className="ml-7 flex text-[#FF0000]">
            라이브커머스{' '}
            <Image src="/icons/icon-live.svg" alt="live" width={18} height={15}></Image>
          </button>
          <button
            className="ml-7"
            onClick={() => {
              redirect('/livestreaming');
            }}
          >
            베스트셀러
          </button>
          <button className="ml-7">식집사템</button>
        </div>

        <div className="flex">
          <button className="ml-[48px]" onClick={toggleSearch}>
            <Image src="/icons/icon-search.svg" alt="search" width={32} height={32}></Image>
          </button>
          <button className="ml-[48px]">
            <Image src="/icons/icon-message.svg" alt="message" width={32} height={32}></Image>
          </button>
          <button className="ml-[48px]">
            <Image src="/icons/icon-cart.svg" alt="cart" width={32} height={32}></Image>
          </button>
          <button className="ml-[48px]">
            <Image src="/icons/icon-mypage.svg" alt="mypage" width={32} height={32}></Image>
          </button>
          {isOpenSearch && (
            <div className="absolute w-full h-auto flex justify-between py-[30px] px-[190px] border-b bg-white top-12 right-0 text-center">
              <p className="bold">SEARCH</p>
              <form
                action="submit"
                className="flex justify-center items-center w-[500px] h-10 border rounded-full px-4"
              >
                <input type="text" className="w-[450px] h-8" />
                <button type="submit">
                  <Image src="/icons/icon-search.svg" alt="search" width={24} height={24}></Image>
                </button>
              </form>
              <button onClick={toggleSearch}>
                <Image src="/icons/icon-close.svg" alt="close" width={30} height={30}></Image>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Header;
