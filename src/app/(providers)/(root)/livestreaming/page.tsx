'use client';

import React, { useState } from 'react';
import LiveSection from './_components/LiveSection';
import RecodeSection from './_components/RecodeSection';
import Image from 'next/image';
import Link from 'next/link';

export default function StreamListPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleClick = (buttonId: string) => {
    setActiveCategory(activeCategory === buttonId ? 'none' : buttonId);
  };

  return (
    <div className="pt-[80px] pb-[180px]">
      <h1 className="text-[20px] font-semibold text-center mb-4">라이브 커머스</h1>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <button
            className={`border px-3 py-2 rounded-md ${activeCategory === 'all' ? 'bg-[#3BB873] text-white border-transparent' : 'bg-none'}`}
            onClick={() => handleClick('all')}
          >
            전체보기
          </button>
          <button
            className={`border px-3 py-2 rounded-md ${activeCategory === '씨앗' ? 'bg-[#3BB873] text-white border-transparent' : 'bg-none'}`}
            onClick={() => handleClick('씨앗')}
          >
            씨앗
          </button>
          <button
            className={`border px-3 py-2 rounded-md ${activeCategory === '모종' ? 'bg-[#3BB873] text-white border-transparent' : 'bg-none'}`}
            onClick={() => handleClick('모종')}
          >
            모종
          </button>
          <button
            className={`border px-3 py-2 rounded-md ${activeCategory === '재배키트' ? 'bg-[#3BB873] text-white border-transparent' : 'bg-none'}`}
            onClick={() => handleClick('재배키트')}
          >
            재배키트
          </button>
          <button
            className={`border px-3 py-2 rounded-md ${activeCategory === '흙,비료' ? 'bg-[#3BB873] text-white border-transparent' : 'bg-none'}`}
            onClick={() => handleClick('흙,비료')}
          >
            흙/비료
          </button>
          <button
            className={`border px-3 py-2 rounded-md ${activeCategory === '원예용품' ? 'bg-[#3BB873] text-white border-transparent' : 'bg-none'}`}
            onClick={() => handleClick('원예용품')}
          >
            원예용품
          </button>
        </div>
        <Link href={'/livestreaming/register'}>
          <button className="flex items-center text-[13px] text-[#3BB873] border border-[#3BB873] rounded p-2">
            <Image src="/icons/start-stream.png" alt="startStream-icon" width={16} height={16} />
            방송시작
          </button>
        </Link>
      </div>
      <div className="mt-16">
        <LiveSection category={activeCategory} />
      </div>
      <div className="border-b w-full my-12" />
      <p className="text-2xl font-semibold">이전 방송</p>
      <div className="mt-12">
        <RecodeSection category={activeCategory} />
      </div>
    </div>
  );
}
