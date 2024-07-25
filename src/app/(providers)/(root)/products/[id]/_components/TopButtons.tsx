'use client';

import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { createCartItem } from '../_actions/cartActions';

interface TopButtonsProps {
  productId: string;
  productPrice: string | number;
}

function TopButtons({ productId, productPrice = 1 }: TopButtonsProps) {
  const [count, setCount] = useState(1);
  const { user } = useUser();
  const router = useRouter();

  const handleAddToCart = async () => {
    const cartItemData = {
      cart_product_id: productId,
      count: count,
      cart_user_id: user.id
    };
    const result = await createCartItem(cartItemData);

    if (result) {
      alert('선택하신 상품이 장바구니에 추가되었습니다.');
      router.push(`/cart`);
    }
  };

  const handleBuyNow = () => {
    router.push(`/payment?productId=${productId}&quantity=${count}`);
  };

  return (
    <>
      <div className="mb-4">
        <input
          type="number"
          placeholder="구매수량"
          value={count}
          onChange={(e) => setCount(+e.target.value)}
          className="border p-2 w-20 text-center mb-2"
        />
        <p className="text-xl font-bold">총 상품금액: {+productPrice * count} 원</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="bg-black text-white px-4 py-2 rounded">문의</button>
        <button onClick={handleAddToCart} className="bg-black text-white px-4 py-2 rounded">
          장바구니
        </button>
        <button onClick={handleBuyNow} className="bg-black text-white px-4 py-2 rounded">
          바로구매
        </button>
      </div>
    </>
  );
}

export default TopButtons;
