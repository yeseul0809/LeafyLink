'use client';

import { useCartStore } from '@/stores';
import Image from 'next/image';
import React from 'react';

export default function DeleteButton({ productId }: { productId: string }) {
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <button
      onClick={() => removeItem(productId)}
      className="relative w-[24px] h-[24px] ml-[32px] xs:ml-0"
    >
      <Image src="/icons/icon-close.svg" alt="closeButton" fill />
    </button>
  );
}
