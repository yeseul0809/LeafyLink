'use client';

import React from 'react';
import supabase from '@/supabase/supabaseClient';
import { getProductData } from '../actions';

export default function PurchaseButton() {
  const purchaseProducts = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      const { data: cartData, error: cartError } = await supabase
        .from('Cart')
        .select()
        .eq('cart_user_id', user.id);

      if (cartError) {
        console.error('Error fetching cart data:', cartError);
        return;
      }

      const productsData = await getProductData(cartData);

      const orders = productsData?.map((product) => ({
        order_user_id: user.id,
        order_product_id: product.product_id,
        quantity: Number(product.count),
        cost: Number(product.price) * Number(product.count),
        is_payed: false
      }));

      const { data: orderData, error: orderError } = await supabase.from('Order').insert(orders!);
      if (orderError) {
        console.error('Error posting order data:', cartError);
        return;
      }
    }
  };

  return <button onClick={purchaseProducts}>구매하기</button>;
}
