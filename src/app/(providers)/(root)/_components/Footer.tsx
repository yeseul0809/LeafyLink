import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <section className="w-full h-auto flex">
      <div className="w-full h-auto px-[190px] py-[37px] border-y text-[14px] text-[#505050]">
        <Link href={'/'}>
          <Image src="/icons/logo.svg" alt="logo" width={100} height={30}></Image>
        </Link>
        <div className="flex justify-left items-center mt-5 mb-7">
          <a href="#">회사소개</a>
          <span className="px-7">|</span>
          <a href="#">이용약관</a>
          <span className="px-7">|</span>
          <a href="#" className="font-semibold text-black">
            개인정보처리방침
          </a>
          <span className="px-7">|</span>
          <a href="#">제휴광고</a>
        </div>
        <div className="leading-loose text-[13px]">
          <p>
            대표이사 : 십시일반 | 서울특별시 내배캠 유튜브 99, 스파르타 사옥
            <br />
            사업자등록번호 : 123-45-67890 | 통신판매업신고 : 9999-12345호
            <br />
            개인정보보호책임자 : 십시일반 | 이메일 : sipsiilban@naver.com
            <br />
            Copyright ⓒ SIPSIILBAN DESIGNER ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Footer;
