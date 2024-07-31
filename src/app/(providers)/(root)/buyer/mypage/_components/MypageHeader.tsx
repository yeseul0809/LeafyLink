'use client';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const MyPageHeader = () => {
  const params = useParams();
  const pathname = usePathname();
  const id = params.id;

  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const linkClassName = ' border-line-gray-50 border-b-2';
  const activeLinkClassName =
    'text-primary-green-500 font-bole  border-primary-green-500 border-b-2 ';

  return (
    <div className="max-w-screen-xl mx-auto mt-20 mb-20  w-m-[1240px] ">
      {/* Title */}
      <h1 className="text-center text-2xl font-bold mb-8">마이페이지</h1>

      {/* Links */}
      <ul className="flex items-start  ">
        <li
          className={`w-1/3  p-4 text-center ${linkClassName} ${activeLink === `/buyer/mypage/${id}/orders` ? activeLinkClassName : ''}`}
        >
          <Link href={`/buyer/mypage/${id}/orders`}>
            <div className=" text-lg font-normal leading-7 tracking-tight">구매내역 조회</div>
          </Link>
        </li>
        <li
          className={`w-1/3 p-4 text-center ${linkClassName} ${activeLink === `/buyer/mypage/${id}/profile` ? activeLinkClassName : ''}`}
        >
          <Link href={`/buyer/mypage/${id}/profile`}>
            <div className=" text-lg font-normal leading-7 tracking-tight">회원정보 변경</div>
          </Link>
        </li>
        <li
          className={`w-1/3 p-4 text-center ${linkClassName} ${activeLink === `/buyer/mypage/${id}/BusinessCheck` ? activeLinkClassName : ''}`}
        >
          <Link href={`/buyer/mypage/${id}/BusinessCheck`}>
            <div className=" text-lg font-normal leading-7 tracking-tight">사업자 인증</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MyPageHeader;
