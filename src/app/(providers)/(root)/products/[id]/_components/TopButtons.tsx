'use client';

import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { createCartItem } from '../_actions/cartActions';

interface TopButtonsProps {
  productId: string;
  productPrice: number | undefined;
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
    <div>
      <input
        type="number"
        placeholder="구매수량"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="border p-2 w-40 mb-4"
      />
      <strong>총 가격 : {productPrice * count} 원</strong>
      <div className="flex items-center gap-2">
        <button className="bg-black text-white p-2 rounded">문의</button>
        <button onClick={handleAddToCart} className="bg-black text-white p-2 rounded">
          장바구니
        </button>
        <button onClick={handleBuyNow} className="bg-black text-white p-2 rounded">
          바로구매
        </button>
      </div>
    </div>
  );
}

export default TopButtons;
