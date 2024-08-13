'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

function RedirectButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push('/')}
      className="w-full p-[16px] text-primary-green-400 bg-primary-green-50 rounded-[8px] max_sm:w-1/2 max_sm:bg-primary-green-500 max_sm:text-white"
    >
      홈으로 가기
    </button>
  );
}

export default RedirectButton;
