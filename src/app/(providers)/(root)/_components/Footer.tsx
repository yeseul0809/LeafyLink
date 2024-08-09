import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <section className="w-full h-auto bg-white sticky bottom-0 z-20 border-t">
      <div className="max-w-container-l px-[20px] mx-auto block md:flex  justify-between py-[28px] text-[14px] text-[#505050] text-center lg:text-left">
        <div>
          <div className="flex justify-center lg:justify-start items-center mb-[16px] ">
            <Link href={'/'}>
              <Image
                src="/icons/logo.svg"
                alt="logo"
                width={100}
                height={30}
                className="lg:w-[152px]"
              ></Image>
            </Link>
          </div>
          <div className="flex  justify-between mt-5 mb-[24px] w-[386px] mt-[32px] m:text-[13px] mx-auto">
            <a href="#" className="w-auto tracking-tighter leading-5 px-0">
              회사소개
            </a>
            <span>|</span>
            <a href="#" className="w-auto tracking-tighter leading-5">
              이용약관
            </a>
            <span>|</span>
            <a href="#" className="font-semibold text-black w-auto tracking-tighter leading-5">
              개인정보처리방침
            </a>
            <span>|</span>
            <a href="#" className="w-auto tracking-tighter leading-5">
              제휴광고
            </a>
          </div>
        </div>

        <div className="leading-loose text-[13px] m:text-[12px] md:text-end ">
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
