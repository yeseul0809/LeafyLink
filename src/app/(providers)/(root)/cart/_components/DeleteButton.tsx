'use client';

import React from 'react';
import Image from 'next/image';
import { useCartStore } from '@/stores';

export default function DeleteButton({ productId }: { productId: string }) {
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <button
      onClick={() => removeItem(productId)}
      className="relative w-[24px] h-[24px] max_sm:absolute max_sm:top-0 max_sm:right-0"
    >
      <Image src="/icons/icon-close.svg" alt="closeButton" fill />
    </button>
  );
}
