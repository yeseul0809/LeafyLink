'use client';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const SellerMyPageHeader = () => {
  const params = useParams();
  const pathname = usePathname();
  const id = params.id;

  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const linkClassName = '  hover:no-underline';
  const activeLinkClassName = 'font-bold border-b-2 border-blue-500';

  return (
    <div className="max-w-screen-lg mx-auto  mb-20">
      {/* Title */}
      <h1 className="text-center text-2xl font-bold mb-6"> 마이페이지</h1>

      {/* Links */}
      <ul className="flex">
        <li className="w-1/3">
          <Link href={`/seller/mypage/${id}/orders`}>
            <div
              className={`block text-center ${linkClassName} ${activeLink === `/seller/mypage/${id}/orders` ? activeLinkClassName : ''}`}
            >
              주문 내역
            </div>
          </Link>
        </li>
        <li className="w-1/3">
          <Link href={`/seller/mypage/${id}/products`}>
            <div
              className={`block text-center ${linkClassName} ${activeLink === `/seller/mypage/${id}/products` ? activeLinkClassName : ''}`}
            >
              판매중인 상품
            </div>
          </Link>
        </li>
        <li className="w-1/3">
          <Link href={`/seller/mypage/${id}/profile`}>
            <div
              className={`block text-center ${linkClassName} ${activeLink === `/seller/mypage/${id}/profile` ? activeLinkClassName : ''}`}
            >
              회원정보 변경
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SellerMyPageHeader;
