'use client';

import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCartStore } from '@/stores';
import { createClient } from '@/supabase/supabaseClient';
import { allToggleCheckbox } from '../actions';

const getCartStatus = async (userId: string) => {
  if (!userId) {
    return [];
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('Cart')
    .select('is_checked')
    .eq('cart_user_id', userId);

  if (error) {
    console.error(error);
  }
  return data || [];
};

export default function AllCheckbox({
  productIds,
  userId
}: {
  productIds: string[];
  userId: string;
}) {
  const [isChecked, setIsChecked] = useState(false);
  const updateCartCheck = useCartStore((state) => state.toggleSelectAll);
  const queryClient = useQueryClient();

  const { data: cartStatus, isFetched: isCartFetched } = useQuery({
    queryKey: ['getCartStatus', userId],
    queryFn: () => getCartStatus(userId!)
    // enabled: !!userId
  });

  useEffect(() => {
    if (isCartFetched && cartStatus) {
      const allChecked = cartStatus.every((item: any) => item.is_checked);
      setIsChecked(allChecked);
    }
  }, [cartStatus, isCartFetched]);

  const handleAllToggle = async () => {
    const newCheckedStatus = !isChecked;
    setIsChecked(newCheckedStatus);
    if (userId) {
      updateCartCheck(userId, productIds, newCheckedStatus);

      productIds.forEach((productId) => {
        queryClient.setQueryData(['getCartIschecked', productId, userId], (oldData: any) => {
          return { ...oldData, is_checked: newCheckedStatus };
        });
      });

      await allToggleCheckbox(userId, productIds, newCheckedStatus);
      queryClient.invalidateQueries({ queryKey: ['getCartStatus', userId] });
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id="allcheck"
        onChange={handleAllToggle}
        checked={isChecked}
        className="w-[18px] h-[18px] mr-2 green-checkbox"
      />
      <label htmlFor="allcheck" className="xs:text-[14px] xs:w-[20px] xs:h-[20px]">
        모두 선택
      </label>
    </div>
  );
}
