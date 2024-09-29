'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

function FooterMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFooter = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section className="w-full h-auto bg-white sticky bottom-0 z-20 border-t mt-[70px]">
      <div className="max-w-container-l m:max-w-container-m s:max-w-container-s mx-auto py-[28px] text-[14px] text-[#505050] text-center text-left">
        <div className="flex justify-center items-center my-[16px]">
          <Link href={'/'}>
            <Image
              src="/icons/logo.svg"
              alt="logo"
              width={100}
              height={30}
              className="w-[100px] "
            ></Image>
          </Link>
          <button className="ml-2 w-auto h-auto" onClick={toggleFooter}>
            <Image src="/icons/icon-dropdown.svg" width={12} height={12} alt="드롭다운버튼" />
          </button>
        </div>
        {isOpen && (
          <div>
            <div className="flex justify-between my-5 w-auto text-[13px] mx-auto px-4">
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
            <div className="leading-loose text-[13px] text-[12px] text-center mb-4">
              <p>
                대표이사 : 십시일반 | 서울특별시 내배캠 유튜브 99, 스파르타 사옥
                <br />
                사업자등록번호 : 123-45-67890 | 통신판매업신고 : 9999-12345호
                <br />
                개인정보보호책임자 : 십시일반 | 이메일 : sipsiilban@naver.com
                <br />
              </p>
            </div>
          </div>
        )}
        <p>Copyright ⓒ SIPSIILBAN DESIGNER ALL RIGHTS RESERVED.</p>
      </div>
    </section>
  );
}

export default FooterMobile;
