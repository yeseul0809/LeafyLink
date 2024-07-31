'use client';

import React, { useState } from 'react';
import LiveSection from './_components/LiveSection';
import RecodeSection from './_components/RecodeSection';

export default function ListCatogory() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleClick = (buttonId: string) => {
    setActiveCategory(activeCategory === buttonId ? 'none' : buttonId);
  };

  return (
    <div>
      <h1>라이브 커머스</h1>
      <div className="flex gap-3">
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
      <p>라이브섹션</p>
      <LiveSection category={activeCategory} />
      <p>이전방송섹션</p>
      <RecodeSection category={activeCategory} />
    </div>
  );
}
