'use client';

import { createClient } from '@/supabase/supabaseClient';
import React, { useEffect, useState } from 'react';
import { useQuantityStore } from '@/stores';

export default function QuantityButton({ productId, price }: { productId: string; price: number }) {
  const setQuantity = useQuantityStore((state) => state.setQuantity);
  const [value, setValue] = useState<number>(1);

  useEffect(() => {
    const getProductQuantity = async () => {
      const supabase = createClient();
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

  const handleIncrease = async () => {
    const supabase = createClient();
    const { data: cartData, error: fetchError } = await supabase
      .from('Cart')
      .select('count')
      .eq('cart_product_id', productId)
      .single(); // 단일 데이터만 필요하므로 .single() 사용

    if (fetchError) {
      console.error('Error fetching cart data:', fetchError);
      return;
    }

    const currentCount = cartData?.count ?? 0;
    const newCount = currentCount + 1;

    const { error: updateError } = await supabase
      .from('Cart')
      .update({ count: newCount })
      .eq('cart_product_id', productId);

    if (updateError) {
      console.error('Error updating cart count:', updateError);
      return;
    }

    setValue((prev) => prev + 1);
  };

  const handleDecrease = async () => {
    const supabase = createClient();
    const { data: cartData, error: fetchError } = await supabase
      .from('Cart')
      .select('count')
      .eq('cart_product_id', productId)
      .single(); // 단일 데이터만 필요하므로 .single() 사용

    if (fetchError) {
      console.error('Error fetching cart data:', fetchError);
      return;
    }

    const currentCount = cartData?.count ?? 0;
    const newCount = currentCount - 1;

    const { error: updateError } = await supabase
      .from('Cart')
      .update({ count: newCount })
      .eq('cart_product_id', productId);

    if (updateError) {
      console.error('Error updating cart count:', updateError);
      return;
    }

    setValue((prev) => prev - 1);
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
