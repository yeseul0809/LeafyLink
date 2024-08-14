'use client';

import React, { useEffect, useState } from 'react';
import { getUserSession, allToggleCheckbox, Product } from '../actions';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/supabase/supabaseClient';
import { useCartStore } from '@/stores';

export default function AllCheckbox({
  productIds,
  userId
}: {
  productIds: string[];
  userId: string;
}) {
  const { selectAll, toggleSelectAll } = useCartStore((state) => ({
    selectAll: state.selectAll,
    toggleSelectAll: state.toggleSelectAll
  }));
  const queryClient = useQueryClient();

  const handleAllToggle = async () => {
    const newCheckedStatus = !selectAll;
    if (userId) {
      toggleSelectAll(userId, productIds, newCheckedStatus);

      productIds.forEach((productId) => {
        queryClient.setQueryData(['getCartIschecked', productId, userId], (oldData: any) => {
          return { ...oldData, is_checked: newCheckedStatus };
        });
      });

      queryClient.invalidateQueries({ queryKey: ['getCartStatus', userId] });
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id="allcheck"
        onChange={handleAllToggle}
        checked={selectAll}
        className="w-[18px] h-[18px] mr-2 green-checkbox"
      />
      <label htmlFor="allcheck" className="xs:text-[14px] xs:w-[20px] xs:h-[20px]">
        모두 선택
      </label>
    </div>
  );
}
