'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

function RedirectButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push('/')}
      className="w-1/2 p-[16px] text-white rounded-[8px] max_sm:w-1/2 bg-primary-green-500 max_sm:text-white"
    >
      홈으로 가기
    </button>
  );
}

export default RedirectButton;
