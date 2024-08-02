'use client';

import React, { useEffect, useState } from 'react';
import { getUserSession, allToggleCheckbox, Product } from '../actions';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/supabase/supabaseClient';
import { useCartStore } from '@/stores';

// const getClientUserData = async () => {
//   const supabase = createClient();
//   const { data, error } = await supabase.auth.getUser();
//   if (error) {
//     console.error(error);
//   }

//   return data.user!.id;
// };

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
    queryFn: () => getCartStatus(userId!),
    enabled: !!userId
  });

  useEffect(() => {
    if (isCartFetched && cartStatus) {
      const allChecked = cartStatus.every((item: any) => item.is_checked);
      setIsChecked(allChecked);
    }
  }, [cartStatus, isCartFetched]);

  useEffect(() => {
    updateCartCheck(userId, isChecked);
  }, [userId, isChecked, updateCartCheck]);

  const handleAllToggle = async () => {
    const newCheckedStatus = !isChecked;
    setIsChecked(newCheckedStatus);
    if (userId) {
      await allToggleCheckbox(userId, newCheckedStatus);

      await Promise.all(
        productIds.map((productId) =>
          queryClient.invalidateQueries({ queryKey: ['getCartIschecked', productId] })
        )
      );

      // queryClient.invalidateQueries({ queryKey: ['getCartStatus', userId] });
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
      <label htmlFor="allcheck">모두 선택</label>
    </div>
  );
}
