'use client';
import '@/app/globals.css';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import Image from 'next/image';
import { useState } from 'react';

// Product 타입
interface Product {
  title: string;
}

// User 타입
interface User {
  user_name: string;
  phone: string;
  address: string;
  address_detail: string;
  email: string;
}

// Order 타입
interface Order {
  order_id: number;
  order_product_id: string;
  cost: number;
  quantity: number;
  order_date: string;
  order_user_id: string;
  order_seller_id: string;
  Product: Product;
  User: User;
}

interface AccordionMenuProps {
  orders: Order[];
}

export default function AccordionMenu({ orders }: AccordionMenuProps) {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const handleClick = (orderId: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  function formatPhoneNumber(phoneNumber: string) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);

    return match ? `${match[1]}-${match[2]}-${match[3]}` : phoneNumber;
  }

  const formatCurrency = (value: number | null): string => {
    if (value === null) {
      return 'N/A';
    }
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
      currencyDisplay: 'code'
    })
      .format(value)
      .replace('KRW', '')
      .trim();
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-20 mb-20">
      <div className="flex items-star bg-secondary-yellow-100 text-center">
        <span className="w-[178px] text-font/main text-16-n-24-40 p-4 text-center">주문 번호</span>
        <span className="flex-1 text-font/main text-16-n-24-40 p-4 text-center">상품명</span>
      </div>
      <div>
        <Accordion>
          {orders.map((order) => (
            <AccordionItem
              key={order.order_id}
              header={
                <div
                  className="flex items-start cursor-pointer"
                  onClick={() => handleClick(order.order_id)}
                >
                  <div className="flex items-start py-[22px]">
                    <span className="w-[178px] text-16-n-24-40 text-font/sub2 text-center px-4">
                      {order.order_id}
                    </span>
                    <span className="flex-1 text-font/main text-16-n-24-40 px-4 overflow-hidden whitespace-nowrap text-ellipsis text-left">
                      {order.Product?.title || '제품 없음'}
                    </span>
                  </div>
                  <div className="flex items-center ml-auto py-[22px] px-[16px]">
                    <Image
                      src={openItems[order.order_id] ? '/icons/down.png' : '/icons/up.png'}
                      alt={openItems[order.order_id] ? '다운 이미지' : '업 이미지'}
                      className="flex-shrink-0"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              }
            >
              <div className="flex flex-col sm:flex-row justify-between gap-x-6 px-4 sm:px-8 pt-4 sm:pt-8 pb-8 my-2">
                <div className="w-full sm:w-1/2 ">
                  <div className="pb-6 text-font/sub1 text-14-n-20-35">[상품 정보]</div>
                  <div className="flex flex-col">
                    <div className="flex">
                      <div className="flex w-[101px] p-[16px_0_16px_16px] items-start self-stretch bg-BG/Light border-t border-Line/Light text-14-n-20-35 text-font/main">
                        결제금액
                      </div>
                      <div className="flex-1 p-4 justify-center items-center border-b border-t border-Line/Light text-14-n-20-35 text-font/main truncate">
                        {formatCurrency(order.cost)}원
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex w-[101px] p-[16px_0_16px_16px] items-start self-stretch bg-BG/Light border-t border-Line/Light text-14-n-20-35 text-font/main">
                        수량
                      </div>
                      <div className="flex-1 p-4 justify-center items-center border-b border-t border-Line/Light text-14-n-20-35 text-font/main truncate">
                        {order.quantity}개
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex w-[101px] p-[16px_0_16px_16px] items-start self-stretch bg-BG/Light border-t border-Line/Light text-14-n-20-35 text-font/main">
                        주문일자
                      </div>
                      <div className="flex-1 p-4 justify-center items-center border-b border-t border-Line/Light text-14-n-20-35 text-font/main truncate">
                        {formatDate(order.order_date)}
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex w-[101px] p-[16px_0_16px_16px] items-start self-stretch bg-BG/Light border-t border-Line/Light text-14-n-20-35 text-font/main">
                        주문자
                      </div>
                      <div className="flex-1 p-4 justify-center items-center border-b border-t border-Line/Light text-14-n-20-35 text-font/main truncate">
                        {order.User?.user_name || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <div className="pb-6 text-font/sub1 text-14-n-20-35">[주문자 정보]</div>
                  <div className="flex flex-col">
                    <div className="flex">
                      <div className="flex w-[101px] p-[16px_0_16px_16px] items-start self-stretch bg-BG/Light border-t border-Line/Light text-14-n-20-35 text-font/main">
                        이름
                      </div>
                      <div className="flex-1 p-4 justify-center items-center border-b border-t border-Line/Light text-14-n-20-35 text-font/main truncate">
                        {order.User?.user_name || 'N/A'}
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex w-[101px] p-[16px_0_16px_16px] items-start self-stretch bg-BG/Light border-t border-Line/Light text-14-n-20-35 text-font/main">
                        전화번호
                      </div>
                      <div className="flex-1 p-4 justify-center items-center border-b border-t border-Line/Light text-14-n-20-35 text-font/main truncate">
                        {formatPhoneNumber(order.User?.phone) || 'N/A'}
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex w-[101px] p-[16px_0_16px_16px] items-start self-stretch bg-BG/Light border-t border-Line/Light text-14-n-20-35 text-font/main">
                        주소
                      </div>
                      <div className="flex-1 p-4 justify-center items-center border-b border-t border-Line/Light text-14-n-20-35 text-font/main truncate">
                        {order.User?.address || 'N/A'} {order.User?.address_detail || 'N/A'}
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex w-[101px] p-[16px_0_16px_16px] items-start self-stretch bg-BG/Light border-t border-Line/Light text-14-n-20-35 text-font/main">
                        이메일
                      </div>
                      <div className="flex-1 p-4 justify-center items-center border-b border-t border-Line/Light text-14-n-20-35 text-font/main truncate">
                        {order.User?.email || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
