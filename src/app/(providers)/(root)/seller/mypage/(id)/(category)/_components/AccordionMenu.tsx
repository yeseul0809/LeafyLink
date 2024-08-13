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
    <div className="max-w-screen-xl mx-auto mt-20 mb-20 s:px-[20px]">
      <div className="flex items-star bg-secondary-yellow-100 text-center">
        <span className="w-[178px] text-font/main text-16-n-24-40 p-4 text-center s:w-[86px] s:text-14-n-24-35 s:p-[12px] flex justify-center items-center ">
          주문 번호
        </span>
        <span className="flex-1 text-font/main text-16-n-24-40 p-4 text-center items-center">
          상품명
        </span>
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
                  <div className="flex items-start py-[22px] s:py-0 flex-1">
                    {/* Order ID */}
                    <span className="w-[178px] text-16-n-24-40 text-font/sub2 text-center px-4 s:w-[86px] s:text-14-n-24-35 s:p-[16px_12px] flex justify-center items-center">
                      {order.order_id}
                    </span>

                    <div className="flex-1 webkit-box s:p-[16px_12px_16px_4px]">
                      <span className="text-font/main text-16-n-24-40 text-left webkit-box">
                        {order.Product?.title || '제품 없음'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center py-[22px] px-[16px] s:p-[17px_12px_17px_0]">
                    <Image
                      src={openItems[order.order_id] ? '/icons/up.svg' : '/icons/down.svg'}
                      alt={openItems[order.order_id] ? '업 이미지' : '다운 이미지'}
                      className="flex-shrink-0"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              }
            >
              <div className="flex flex-col sm:flex-row justify-between gap-x-6 p-[32px_32px_40px_32px] my-2 border-b border-Line/Light s:p-[16px_12px] s:gap-y-px-24">
                <div className="w-full sm:w-1/2 ">
                  <div className="pb-[24px] text-font/sub1 text-14-n-20-35 s:pb-[8px]">
                    [상품 정보]
                  </div>
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
                      <div className="flex w-[101px] p-[16px_0_16px_16px] items-start self-stretch bg-BG/Light border-t border-Line/Light text-14-n-20-35 text-font/main s:pb-[8px]">
                        주문자
                      </div>
                      <div className="flex-1 p-4 justify-center items-center border-b border-t border-Line/Light text-14-n-20-35 text-font/main truncate">
                        {order.User?.user_name || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <div className="pb-[24px] text-font/sub1 text-14-n-20-35">[주문자 정보]</div>
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
