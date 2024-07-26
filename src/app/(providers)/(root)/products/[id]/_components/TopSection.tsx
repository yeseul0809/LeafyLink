'use client';

import { Product } from '@/types/product';
import showSwal from '@/utils/swal';
import Image from 'next/image';
import React from 'react';

export interface TopSectionProps {
  product: Product;
  averageRating: number;
  reviewCount: number;
}

function TopSection({ product, averageRating, reviewCount }: TopSectionProps) {
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showSwal({ icon: 'success', title: '링크가 복사되었습니다!' });
    } catch (error) {
      console.error('클립보드로 링크복사 실패', error);
    }
  };
  const filledStars = Math.floor(averageRating);

  return (
    <div className="flex flex-col items-center md:items-start md:text-left">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          {Array.from({ length: filledStars }).map((_, index) => (
            <span key={index} className="text-green-300">
              ★
            </span>
          ))}
          {Array.from({ length: 5 - filledStars }).map((_, index) => (
            <span key={index} className="text-gray-300">
              ★
            </span>
          ))}
          <p className="text-lg ml-2">
            {averageRating.toFixed(1)} ({reviewCount}개의 리뷰)
          </p>
        </div>
        <Image
          src="/icons/share.svg"
          alt="share"
          width={30}
          height={30}
          style={{ width: 'auto', height: 'auto' }}
          onClick={handleCopyToClipboard}
          className="cursor-pointer"
        />
      </div>
      <div className="border-t-2 border-b-2 my-4 py-2 w-full">
        <p className="text-xl font-semibold mb-2">판매가: {product.price} 원</p>
        <p className="text-md">배송비: 3,000원</p>
      </div>
    </div>
  );
}

export default TopSection;
