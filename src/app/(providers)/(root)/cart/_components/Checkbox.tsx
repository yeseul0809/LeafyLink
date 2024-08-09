'use client';

import React from 'react';
import { useCartStore } from '@/stores';

export default function Checkbox({ productId, userId }: { productId: string; userId: string }) {
  const { cart, updateItem } = useCartStore((state) => ({
    cart: state.cart,
    updateItem: state.updateItem
  }));

  const isChecked = cart[productId]?.isChecked || false;

  const handleToggle = async () => {
    const newCheckedStatus = !isChecked;
    updateItem(productId, newCheckedStatus, userId);
  };

  return (
    <input
      type="checkbox"
      className="absolute -top-[0%] left-[0%] w-[18px] h-[18px] green-checkbox"
      checked={isChecked}
      onChange={handleToggle}
    />
  );
}
