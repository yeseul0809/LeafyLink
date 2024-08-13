'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

function RedirectOrderButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push('/buyer/mypage/orders?page=1')}
      className="w-full p-[16px] text-primary-green-400 bg-primary-green-50 rounded-[8px] max_sm:w-1/2 sm:hidden"
    >
      구매내역 조회
    </button>
  );
}

export default RedirectOrderButton;
