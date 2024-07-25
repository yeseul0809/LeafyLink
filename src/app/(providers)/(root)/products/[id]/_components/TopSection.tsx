import { Product } from '@/types/product';
import React from 'react';

export interface TopSectionProps {
  product: Product;
}

function TopSection({ product }: TopSectionProps) {
  return (
    <div className="flex flex-col items-center md:items-start md:text-left">
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-lg mb-2">★★★★★ 13개의 리뷰</p>
      <div className="border-t-2 border-b-2 my-4 py-2 w-full">
        <p className="text-xl font-semibold mb-2">판매가: {product.price} 원</p>
        <p className="text-md">배송비: 3,000원</p>
      </div>
    </div>
  );
}

export default TopSection;
