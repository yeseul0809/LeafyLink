import Link from 'next/link';
import React from 'react';

function Categories() {
  return (
    <div className="w-[1020px] grid grid-cols-5 gap-[175px] mx-auto mt-[120px] text-center justify-items-center">
      <Link href="/" className="w-[120px]">
        <img src="/icons/icon-seed.svg" alt="씨앗" className="w-[120px] h-[120px]" />
        <p className="text-center mt-6">씨앗</p>
      </Link>
      <Link href="/" className="w-[120px]">
        <img src="/icons/icon-seedling.svg" alt="모종" className="w-[120px] h-[120px]" />
        <p className="text-center mt-6">모종</p>
      </Link>
      <Link href="/" className="w-[120px]">
        <img src="/icons/icon-kit.svg" alt="재배키트" className="w-[120px] h-[120px]" />
        <p className="text-center mt-6">재배키트</p>
      </Link>
      <Link href="/" className="w-[120px]">
        <img src="/icons/icon-soil.svg" alt="흙, 비료" className="w-[120px] h-[120px]" />
        <p className="text-center mt-6">흙, 비료</p>
      </Link>
      <Link href="/" className="w-[120px]">
        <img src="/icons/icon-goods.svg" alt="원예용품" className="w-[120px] h-[120px]" />
        <p className="text-center mt-6">원예용품</p>
      </Link>
    </div>
  );
}

export default Categories;
