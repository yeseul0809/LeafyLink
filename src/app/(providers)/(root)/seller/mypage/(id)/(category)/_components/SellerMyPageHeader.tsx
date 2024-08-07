'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const SellerMyPageHeader = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const linkClassName =
    ' text-font/main border-line-gray-50 border-b-2 text-18-n-26-45 xs:text-14-n-20-35';
  const activeLinkClassName =
    'text-18-sb-26-45 xs:text-14-sb-20-35 text-primary-green-500  border-primary-green-500 border-b-2 overflow-hidden text-center truncate ';

  return (
    <div className="max-w-screen-xl mx-auto mt-20  xs:my-[16px] ">
      {/* Title */}
      <h1 className="text-32-sb-42-80 xs:text-20-sb-28-50 text-center text-font/main mb-[32px] xs:mb-[0px]">
        마이페이지
      </h1>

      {/* Links */}
      <ul className="flex items-start  ">
        <li
          className={`w-1/3  p-4 text-center xs:p-[12px] ${linkClassName} ${activeLink === `/seller/mypage/orders` ? activeLinkClassName : ''}`}
        >
          <Link href={`/seller/mypage/orders`}>
            <div className="webkit-box">주문내역</div>
          </Link>
        </li>
        <li
          className={`w-1/3  p-4 text-center xs:p-[12px] ${linkClassName} ${activeLink === `/seller/mypage/products` ? activeLinkClassName : ''}`}
        >
          <Link href={`/seller/mypage/products`}>
            <div className="webkit-box">판매중인 상품</div>
          </Link>
        </li>
        <li
          className={`w-1/3  p-4 text-center xs:p-[12px] ${linkClassName} ${activeLink === `/seller/mypage/profile` ? activeLinkClassName : ''}`}
        >
          <Link href={`/seller/mypage/profile`}>
            <div className="webkit-box">회원정보 변경</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SellerMyPageHeader;
