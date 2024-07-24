import { Product } from '@/types/product';
import React from 'react';

interface TopSectionProps {
  product: Product;
}

function TopSection({ product }: TopSectionProps) {
  return (
    <section className="flex flex-col md:flex-row mb-8">
      <div className="md:w-1/2 flex justify-end">
        <img
          src={product.thumbnail_url}
          alt={product.title}
          className="h-80 w-full md:w-80 rounded-lg"
        />
      </div>
      <div className="md:w-1/2 mt-4 md:mt-0 md:ml-4 pt-6">
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-lg mb-2">★★★★★ 13개의 리뷰</p>
        <div className="border-t-2 border-b-2 mb-4">
          <p className="text-xl font-semibold mb-2">가격: {product.price} 원</p>
          <p className="text-md">배송비: 무료</p>
        </div>
        <input type="number" placeholder="구매수량" className="border p-2 w-40 mb-4" />
        <div className="flex items-center gap-2">
          <button className="bg-black text-white p-2 rounded">문의</button>
          <button className="bg-black text-white p-2 rounded">장바구니</button>
          <button className="bg-black text-white p-2 rounded">바로구매</button>
        </div>
      </div>
    </section>
  );
}

export default TopSection;
