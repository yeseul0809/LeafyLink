'use client';

import { useCartStore } from '@/stores';
import Image from 'next/image';
import React from 'react';

export default function DeleteButton({ productId }: { productId: string }) {
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <button onClick={() => removeItem(productId)}>
      <Image src="/icons/icon-close.svg" alt="closeButton" width={20} height={20} />
    </button>
  );
}
