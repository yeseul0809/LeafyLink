'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface BottomTabProps {
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

function BottomTab({ productState }: BottomTabProps) {
  const { count, setCount, handleAddToCart, handleBuyNow, product } = productState;
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition > 100 && scrollPosition + viewportHeight < documentHeight) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-1000 max-w-[1240px] mx-auto px-8 py-4 bg-white border border-Line/Regular transition-transform transform ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-[1240px] mx-auto flex justify-between items-center">
        <p className="flex text-[24px]">{product.title}</p>
        <section className="flex items-center">
          <p className="text-sm ml-5 mr-2">총 상품금액 </p>
          <p className="text-xl font-bold">{(+product.price * count).toLocaleString('ko-KR')} 원</p>
          <div className="flex items-center ml-[20px]">
            <button
              className="items-center justify-center flex w-9 h-9 border border-Line/Regular "
              onClick={() => {
                if (count > 1) {
                  setCount(count - 1);
                }
              }}
            >
              <Image src="/icons/minus.svg" alt="-" width={16} height={16} />
            </button>
            <div className="border border-Line/Regular p-2 items-center justify-center flex w-[52px] h-9">
              {count}
            </div>
            <button
              className="items-center justify-center flex w-9 h-9 border border-Line/Regular "
              onClick={() => setCount(count + 1)}
            >
              <Image src="/icons/plus.svg" alt="+" width={16} height={16} />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center ml-10 p-3 w-[102px] h-[44px] border rounded-md border-primary-green-500 hover:bg-primary-green-50"
          >
            <p className="text-sm font-semibold text-primary-green-500">장바구니</p>
            <Image src="/icons/productcart.svg" alt="장바구니" width={20} height={20} />
          </button>

          <button
            onClick={handleBuyNow}
            className="flex items-center justify-center ml-[6px] p-3 w-[102px] h-[44px] rounded-md bg-primary-green-500 text-white hover:bg-primary-green-700"
          >
            <p className="text-sm font-semibold">바로구매</p>
            <Image src="/icons/productcard.svg" alt="바로구매" width={20} height={20} />
          </button>
        </section>
      </div>
    </div>
  );
}

export default BottomTab;
