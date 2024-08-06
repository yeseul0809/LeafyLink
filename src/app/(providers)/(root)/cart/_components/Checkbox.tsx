'use client';

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCartIsChecked, toggleCheckbox } from '../actions';
import { useCartStore } from '@/stores';

export default function Checkbox({ productId, userId }: { productId: string; userId: string }) {
  const queryClient = useQueryClient();
  const updateCartCheck = useCartStore((state) => state.updateItem);

  const {
    data: isChecked,
    error,
    isFetched
  } = useQuery({
    // queryKey: ['getCartIschecked'],
    queryKey: ['getCartIschecked', productId, userId],
    queryFn: () => getCartIsChecked(productId, userId)
  });

  const handleToggle = async () => {
    const newCheckedStatus = !isChecked?.is_checked;
    updateCartCheck(productId, newCheckedStatus, userId);
    queryClient.invalidateQueries({ queryKey: ['getCartIschecked', productId, userId] });
  };

  if (isFetched && isChecked) {
    return (
      <input
        type="checkbox"
        className="absolute -top-[0%] left-[0%] w-[18px] h-[18px] green-checkbox"
        checked={isChecked?.is_checked}
        onChange={handleToggle}
      />
    );
  }

  return (
    <input
      type="checkbox"
      className="absolute -top-[0%] left-[0%] w-[18px] h-[18px] green-checkbox"
    />
  );
}
