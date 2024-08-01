'use client';

import React from 'react';
import { createClient } from '@/supabase/supabaseClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function PurchaseButton() {
  const router = useRouter();

  const getCartData = async () => {
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      const { data: cartData, error: cartError } = await supabase
        .from('Cart')
        .select()
        .eq('cart_user_id', user.id)
        .eq('is_checked', true);

      if (cartError) {
        console.error('Error fetching cart data:', cartError);
        return;
      }
      const transformData = cartData.map((data) => ({
        productId: data.cart_product_id,
        quantity: data.count
      }));
      return transformData;
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const cartData = await getCartData();
      return cartData;
    },
    onSuccess: (data) => {
      const encodedData = encodeURIComponent(JSON.stringify(data));
      router.push(`/payment?data=${encodedData}`);
    }
  });

  const handleNavigate = async () => {
    try {
      await mutation.mutateAsync();
    } catch (error) {
      console.error('Error during mutation:', error);
    }
  };

  if (mutation.isError) {
    console.error('Error fetching cart info:', mutation.error);
    return <p>Error fetching cart info. Please try again later.</p>;
  }

  return (
    <button onClick={handleNavigate} className="bg-[#3BB873] mt-4 h-[51px] rounded-md text-[16px]">
      구매하기
    </button>
  );
}
