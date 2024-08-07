'use client';

import { Product } from '@/types/product';
import showSwal from '@/utils/swal';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getSellerName } from '../../../(home)/actions';
import { useSellerStore } from '@/stores/sellerStore';

export interface TopSectionProps {
  product: Product;
  averageRating: number;
  reviewCount: number;
}

function TopSection({ product, averageRating, reviewCount }: TopSectionProps) {
  const { businessName, setbusinessName } = useSellerStore();

  useEffect(() => {
    setbusinessName(product.product_seller_id);
  }, [product.product_seller_id]);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showSwal('링크가 복사되었습니다!');
    } catch (error) {
      showSwal('링크복사를 실패했습니다.');
    }
  };
  const filledStars = Math.floor(averageRating);

  return (
    <div className="flex w-[335px] md:w-full flex-col md:items-start md:text-left">
      <p className="text-[12px] leading-[18px] font-semibold md:text-sm">{businessName}</p>
      <h1 className="text-[16px] md:text-2xl md:mb-4">{product.title}</h1>
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          {Array.from({ length: filledStars }).map((_, index) => (
            <span key={index} className="text-primary-green-500">
              ★
            </span>
          ))}
          {Array.from({ length: 5 - filledStars }).map((_, index) => (
            <span key={index} className="text-Line/Regular">
              ★
            </span>
          ))}
          <p className="text-sm ml-2">{reviewCount}개의 리뷰</p>
        </div>
        <Image
          src="/icons/link.svg"
          alt="share"
          width={20}
          height={20}
          onClick={handleCopyToClipboard}
          className="cursor-pointer w-[20px] h-[20px] md:w-[24px] md:h-[24px]"
        />
      </div>
      <div className="border-t border-b border-Line/Regular mt-[16px] md:mt-8 py-4 md:py-8 w-full">
        <div className="flex items-center font-semibold">
          <p className="text-[12px] md:text-sm">판매가</p>
          <p className="text-[20px] md:text-[32px] ml-[55px] md:ml-[69px]">
            {product.price?.toLocaleString('ko-KR')} 원
          </p>
        </div>
        <div className="flex text-[12px] md:text-sm">
          <p>배송비 </p>
          <p className="ml-[55px] md:ml-[69px]">무료</p>
        </div>
      </div>
    </div>
  );
}

export default TopSection;
