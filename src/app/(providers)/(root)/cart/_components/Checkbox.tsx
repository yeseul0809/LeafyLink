'use client';

import React, { useState } from 'react';
import { getCartIsChecked, toggleCheckbox } from '../actions';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCartStore } from '@/stores';

export default function Checkbox({ productId, userId }: { productId: string; userId: string }) {
  const queryClient = useQueryClient();
  const updateCartCheck = useCartStore((state) => state.updateItem);
  const {
    data: isChecked,
    error,
    isFetched
  } = useQuery({
    queryKey: ['getCartIschecked', productId],
    queryFn: () => getCartIsChecked(productId)
  });

  const handleToggle = async () => {
    const newCheckedStatus = !isChecked?.is_checked;
    await toggleCheckbox(productId, newCheckedStatus);
    updateCartCheck(productId, newCheckedStatus, userId);
    queryClient.invalidateQueries({ queryKey: ['getCartIschecked', productId] });
  };

  if (isFetched && isChecked) {
    return (
      <input
        type="checkbox"
        className="absolute -top-0 left-0 w-[18px] h-[18px]"
        checked={isChecked?.is_checked}
        onChange={handleToggle}
      />
    );
  }
}
