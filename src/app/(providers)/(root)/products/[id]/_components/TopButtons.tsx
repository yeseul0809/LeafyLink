'use client';

import React from 'react';

interface TopButtonsProps {
  productState: {
    count: number;
    setCount: (value: number) => void;
    handleAddToCart: () => void;
    handleBuyNow: () => void;
    product: {
      product_id: string;
      price: string | number;
      title: string;
    };
  };
}

function TopButtons({ productState }: TopButtonsProps) {
  const { count, setCount, handleAddToCart, handleBuyNow, product } = productState;

  return (
    <>
      <div className="mb-5 flex justify-end">
        <div>
          <div className="mb-3 flex items-center">
            <button className="border px-4 py-2 rounded" onClick={() => setCount(count - 1)}>
              -
            </button>
            <div className="border p-2 text-center w-12 mx-2 rounded">{count}</div>
            <button className="border px-4 py-2 rounded" onClick={() => setCount(count + 1)}>
              +
            </button>
          </div>
          <p className="text-xl font-bold text-right">총 상품금액: {+product.price * count} 원</p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2">
        <button className="bg-black text-white px-4 py-2 rounded flex-1">문의</button>
        <button onClick={handleAddToCart} className="bg-black text-white px-4 py-2 rounded flex-1">
          장바구니
        </button>
        <button onClick={handleBuyNow} className="bg-black text-white px-4 py-2 rounded flex-1">
          바로구매
        </button>
      </div>
    </>
  );
}

export default TopButtons;
