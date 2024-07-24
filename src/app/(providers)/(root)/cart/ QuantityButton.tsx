'use client';

import supabase from '@/supabase/supabaseClient';
import React, { useEffect, useState } from 'react';
import { useQuantityStore } from '@/stores';

export default function QuantityButton({ productId, price }: { productId: string; price: number }) {
  const setQuantity = useQuantityStore((state) => state.setQuantity);
  const [value, setValue] = useState<number>(1);

  useEffect(() => {
    const getProductQuantity = async () => {
      const { data: cartData, error } = await supabase
        .from('Cart')
        .select()
        .eq('cart_product_id', productId);
      if (error) {
        console.error('Error fetching quantity:', error);
        return;
      }
      const quantity = cartData[0]?.count ?? 1;

      setValue(quantity);
    };
    getProductQuantity();
  }, [productId]);

  useEffect(() => {
    setQuantity(productId, value, price);
  }, [value, productId, price, setQuantity]);

  const handleDecrease = () => {
    setValue((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setValue((prev) => prev + 1);
  };

  return (
    <div className="number-input">
      <button className="minus" onClick={handleDecrease}>
        -
      </button>
      <input
        type="number"
        className="text-center"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setValue(Number(event.target.value))
        }
        min="1"
      />
      <button className="plus" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
}
