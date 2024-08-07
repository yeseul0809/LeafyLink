'use client';

import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createChatroom, findExistingChatroom } from '../../../chat/_utils/chatroomUtils';
import Image from 'next/image';
import showSwal from '@/utils/swal';

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
      showSwal('로그인이 필요한 서비스입니다.<br>로그인 후 이용해주세요.');
      router.push(`/login`);
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
      router.push(`/chat/${existingChatroom.chatroom_id}`);
    } else {
      const chatroomId = uuidv4();
      const newChatroom = await createChatroom(
        chatroomId,
        user.id,
        product.product_seller_id,
        product.product_id
      );
      router.push(`/chat/${chatroomId}`);
    }
  };

  return (
    <>
      <div className="mb-5 flex-col w-[335px] md:w-full">
        <div className="w-[335px] md:w-full md:mt-6 md:mb-5 mt-4 mb-3 flex justify-end">
          <button
            className="items-center justify-center flex w-6 h-6 md:w-9 md:h-9 border"
            onClick={() => {
              if (count > 1) {
                setCount(count - 1);
              }
            }}
          >
            <Image
              src="/icons/minus.svg"
              alt="-"
              width={12}
              height={12}
              className="md:w-4 md:h-4"
            />
          </button>
          <div className="w-10 h-6 md:w-[52px] md:h-9 border text-center items-center justify-center flex">
            {count}
          </div>
          <button
            className="items-center justify-center flex w-6 h-6 md:w-9 md:h-9 border"
            onClick={() => setCount(count + 1)}
          >
            <Image src="/icons/plus.svg" alt="+" width={12} height={12} className="md:w-4 md:h-4" />
          </button>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-[14px]">총 상품금액</p>
          <p className="text-xl font-bold text-right">
            {(+product.price * count).toLocaleString('ko-KR')} 원
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-[6px]">
        <button
          onClick={handleStartChat}
          className="flex items-center justify-center md:p-4 w-[52px] h-[48px] md:h-[56px] border border-gray-300 hover:bg-primary-green-50 rounded-md md:rounded-lg"
        >
          <Image
            src="/icons/productchat.svg"
            alt="문의하기"
            width={20}
            height={20}
            className="md:w-6 md:h-6"
          />
        </button>

        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center md:p-4 px-4 py-[14px] w-[135.5px] h-[48px] md:w-[220.5px] md:h-[56px] border border-primary-green-500 hover:bg-primary-green-50 rounded-md md:rounded-lg"
        >
          <span className="text-[14px] md:text-[16px] text-primary-green-500">장바구니</span>
          <Image
            src="/icons/productcart.svg"
            alt="장바구니"
            width={20}
            height={20}
            className="md:w-6 md:h-6"
          />
        </button>

        <button
          onClick={handleBuyNow}
          className="flex items-center justify-center p-4 w-[135.5px] h-[48px] md:w-[220.5px] md:h-[56px] bg-primary-green-500 hover:bg-primary-green-700 text-white rounded-md md:rounded-lg"
        >
          <span className="text-[14px] md:text-[16px] mr-1">바로구매</span>
          <Image
            src="/icons/productcard.svg"
            alt="바로구매"
            width={20}
            height={20}
            className="md:w-6 md:h-6"
          />
        </button>
      </div>
    </>
  );
}

export default TopButtons;
