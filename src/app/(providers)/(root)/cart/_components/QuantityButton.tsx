'use client';

import React, { useEffect, useState } from 'react';
import { useQuantityStore, useCartStore } from '@/stores';
import { createClient } from '@/supabase/supabaseClient';

export default function QuantityButton({
  productId,
  price,
  userId
}: {
  productId: string;
  price: number;
  userId: string;
}) {
  const setQuantity = useQuantityStore((state) => state.setQuantity);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const [value, setValue] = useState<number>(1);

  useEffect(() => {
    const getProductQuantity = async () => {
      const supabase = createClient();
      const { data: cartData, error } = await supabase
        .from('Cart')
        .select('count')
        .eq('cart_product_id', productId)
        .eq('cart_user_id', userId)
        .single();
      if (error) {
        console.error('Error fetching quantity:', error);
        return;
      }
      const quantity = cartData?.count ?? 1;
      setValue(quantity);
    };
    getProductQuantity();
  }, [productId, userId]);

  useEffect(() => {
    setQuantity(productId, value, price);
  }, [value, productId, price, setQuantity]);

  const handleIncrease = async (): Promise<void> => {
    const newValue = value + 1;
    setValue(newValue);
    updateQuantity(productId, newValue);
  };

  const handleDecrease = async () => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);
      updateQuantity(productId, newValue);
    }
  };

  return (
    <>
      <div className="ring-1 ring-[#E5E5EC] w-[98px] h-[24px] flex justify-center mr-[20px]">
        <button
          className="border-r border-[#E5E5EC] h-[24px] w-[24px] flex items-center justify-center"
          onClick={handleDecrease}
        >
          -
        </button>
        <input
          type="number"
          className="text-center h-[24px] w-[40px]"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setValue(Number(event.target.value))
          }
          min="1"
        />
        <button
          className="flex border-l border-[#E5E5EC] h-[24px] w-[24px] justify-center items-center"
          onClick={handleIncrease}
        >
          +
        </button>
      </div>

      <style jsx>
        {`
          input[type='number']::-webkit-outer-spin-button,
          input[type='number']::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type='number'] {
            -moz-appearance: textfield; /* Firefox */
          }
        `}
      </style>
    </>
  );
}
