'use client';

import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createChatroom, findExistingChatroom } from '../../../chat/_utils/chatroomUtils';

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
      product_seller_id: string;
    };
  };
}

function TopButtons({ productState }: TopButtonsProps) {
  const { count, setCount, handleAddToCart, handleBuyNow, product } = productState;
  const router = useRouter();
  const { user } = useUser();

  const handleStartChat = async () => {
    if (!user) {
      console.error('사용자가 로그인되어 있지 않습니다.');
      return;
    }

    // 기존채팅방 확인
    const existingChatrooms = await findExistingChatroom(
      user.id,
      product.product_seller_id,
      product.product_id
    );

    if (existingChatrooms && existingChatrooms.length > 0) {
      const existingChatroom = existingChatrooms[0];
      console.log('기존채팅방이 존재합니다', existingChatroom);
      router.push(`/chat/${existingChatroom.chatroom_id}`);
    } else {
      const chatroomId = uuidv4();
      const newChatroom = await createChatroom(
        chatroomId,
        user.id,
        product.product_seller_id,
        product.product_id
      );
      console.log('새로운 채팅방이 생성되었습니다.', newChatroom);
      router.push(`/chat/${chatroomId}`);
    }
  };

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
        <button onClick={handleStartChat} className="bg-black text-white px-4 py-2 rounded flex-1">
          문의하기
        </button>
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
