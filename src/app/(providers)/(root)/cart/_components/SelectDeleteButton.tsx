'use client';

import React from 'react';
import { useCartStore } from '@/stores';

export default function SelectDeleteButton({ userId }: { userId: string }) {
  const { removeSelectedItems } = useCartStore((state) => ({
    removeSelectedItems: state.removeSelectedItems
  }));

  const handleDelete = () => {
    removeSelectedItems(userId);
  };

  return (
    <button onClick={handleDelete} className="xs:text-[14px]">
      선택 상품 삭제
    </button>
  );
}
