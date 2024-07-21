import Image from 'next/image';
import React from 'react';

function Header() {
  return (
    <section>
      <div className="w-full h-[45px] text-center flex items-center justify-center bg-zinc-300 px-[190px]">
        오늘의 날씨는 비내림, 물을 주지 않아도 되겠어요!
      </div>
      <div className="w-full h-20 px-[190px] flex items-center justify-between">
        <div>
          <Image src="/icons/logo.svg" alt="logo" width={100} height={30}></Image>
        </div>
        <div>
          <button className="mr-10">로그인</button>
          <button>회원가입</button>
        </div>
        {/* <div>
          <Image></Image> <p>{user.name}님</p>
          <button>로그아웃</button>
        </div> */}
      </div>
      <div className="h-[62px] flex items-center justify-between px-[190px]">
        <div className="flex">
          <Image src="/icons/icon-menu.svg" alt="menu" width={24} height={24}></Image>
          <button className="ml-7 flex text-[#FF0000]">
            라이브커머스{' '}
            <Image src="/icons/icon-live.svg" alt="live" width={18} height={15}></Image>
          </button>
          <button className="ml-7">베스트셀러</button>
          <button className="ml-7">식집사템</button>
        </div>
        <div className="flex">
          <Image src="/icons/icon-search.svg" alt="search" width={32} height={32}></Image>
          <Image
            src="/icons/icon-message.svg"
            alt="search"
            width={32}
            height={32}
            className="ml-[48px]"
          ></Image>
          <Image
            src="/icons/icon-cart.svg"
            alt="search"
            width={32}
            height={32}
            className="ml-[48px]"
          ></Image>
          <Image
            src="/icons/icon-mypage.svg"
            alt="search"
            width={32}
            height={32}
            className="ml-[48px]"
          ></Image>
        </div>
      </div>
      <hr></hr>
    </section>
  );
}

export default Header;
