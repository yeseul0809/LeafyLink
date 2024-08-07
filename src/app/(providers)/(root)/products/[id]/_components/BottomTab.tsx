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
      className={`fixed bottom-0 left-0 right-0 z-1000 md:max-w-[1240px] mx-auto md:px-8 md:py-4 bg-white border border-Line/Regular transition-transform transform ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-[375px] md:max-w-[1240px] xs:mx-auto flex flex-col md:flex-row md:justify-between md:items-center p-[8px_20px_20px_20px] md:p-[0px]">
        <div className="flex justify-center items-center md:hidden">
          <button className="w-4 h-4 flex items-center justify-center pb-3 md:pb-0">
            <Image src="/icons/bottomTab.svg" alt="hidden" width={16} height={16} />
          </button>
        </div>
        <p className="flex text-[16px] md:justify-start md:text-left md:text-[24px]">
          {product.title}
        </p>
        <section className="flex flex-col md:flex-row items-center justify-between w-full md:w-auto">
          <div className="flex items-center justify-between mt-[17px] pb-5 md:pb-0 md:mt-0 w-full">
            <div className="flex items-center justify-start md:ml-[20px]">
              <p className="text-sm mr-2">총 상품금액</p>
              <p className="text-[18px] md:text-xl md:mr-8 font-bold">
                {(+product.price * count).toLocaleString('ko-KR')} 원
              </p>
            </div>
            <div className="h-[26px] flex justify-end items-center">
              <button
                className="w-6 h-6 md:w-9 md:h-9 border flex items-center justify-center"
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
              <div className="w-10 h-6 md:w-[52px] md:h-9 border flex items-center justify-center">
                {count}
              </div>
              <button
                className="w-6 h-6 md:w-9 md:h-9 border flex items-center justify-center"
                onClick={() => setCount(count + 1)}
              >
                <Image
                  src="/icons/plus.svg"
                  alt="+"
                  width={12}
                  height={12}
                  className="md:w-4 md:h-4"
                />
              </button>
            </div>
          </div>

          <div className="flex mt-3 mb-3 ml-5 mr-5 md:ml-5 md:mr-5 md:mb-0 md:mt-0">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center p-3 xs:w-[165.5px] xs:h-[48px] w-[165.5px] h-[48px] border rounded-md border-primary-green-500 hover:bg-primary-green-50"
            >
              <p className="text-sm font-semibold text-primary-green-500">장바구니</p>
              <Image src="/icons/productcart.svg" alt="장바구니" width={20} height={20} />
            </button>

            <button
              onClick={handleBuyNow}
              className="flex items-center justify-center ml-[6px] p-3 xs:w-[165.5px] xs:h-[48px] w-[165.5px] h-[48px] rounded-md bg-primary-green-500 text-white hover:bg-primary-green-700"
            >
              <p className="text-sm font-semibold">바로구매</p>
              <Image src="/icons/productcard.svg" alt="바로구매" width={20} height={20} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BottomTab;
