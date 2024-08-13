'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const MyPageHeader = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const linkClassName =
    ' text-font/main border-line-gray-50 border-b-2 text-14-n-20-35 font/sub2 md:text-18-n-26-45';
  const activeLinkClassName =
    ' text-18-sb-26-45 xs:text-14-sb-20-35 text-primary-green-500  border-primary-green-500 border-b-2 overflow-hidden text-center truncate  ';

  return (
    <div className="max-w-screen-xl mx-auto md:mt-20 md:mb-20  mb-[24px] mt-[16px] ">
      <h1 className="text-32-sb-42-80 xs:text-20-sb-28-50 text-center text-font/main mb-[32px] xs:mb-[0px] xs:mt-[16px]">
        마이페이지
      </h1>

      <ul className="flex items-start s:px-[20px]  ">
        <li
          className={`w-1/3  p-4 text-center xs:p-[12px] ${linkClassName} ${activeLink === `/buyer/mypage/orders` ? activeLinkClassName : ''}`}
        >
          <Link href={`/buyer/mypage/orders`}>
            <div className="webkit-box">구매내역 조회</div>
          </Link>
        </li>
        <li
          className={`w-1/3 p-4 text-center xs:p-[12px] ${linkClassName} ${activeLink === `/buyer/mypage/profile` ? activeLinkClassName : ''}`}
        >
          <Link href={`/buyer/mypage/profile`}>
            <div className="webkit-box">회원정보 변경</div>
          </Link>
        </li>
        <li
          className={`w-1/3 p-4 text-center xs:p-[12px] ${linkClassName} ${activeLink === `/buyer/mypage/BusinessCheck` ? activeLinkClassName : ''}`}
        >
          <Link href={`/buyer/mypage/BusinessCheck`}>
            <div className="webkit-box">사업자 인증</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MyPageHeader;
