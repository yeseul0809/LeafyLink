'use client';

import React from 'react';
import supabase from '@/supabase/supabaseClient';
import { getProductData } from '../actions';
import { useQuantityStore } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function PurchaseButton() {
  const router = useRouter();
  // const quantities = useQuantityStore((state) => state.quantities);

  // const purchaseProducts = async () => {
  //   const {
  //     data: { user }
  //   } = await supabase.auth.getUser();

  //   if (user) {
  //     const { data: cartData, error: cartError } = await supabase
  //       .from('Cart')
  //       .select()
  //       .eq('cart_user_id', user.id);

  //     if (cartError) {
  //       console.error('Error fetching cart data:', cartError);
  //       return;
  //     }

  //     // const productsData = await getProductData(cartData);

  //     // const orders = productsData?.map((product) => {
  //     //   const quantity = quantities[product.product_id]?.quantity || 1;
  //     //   return {
  //     //     order_user_id: user.id,
  //     //     order_product_id: product.product_id,
  //     //     quantity: quantity,
  //     //     cost: Number(product.price) * quantity,
  //     //     is_payed: false
  //     //   };
  //     // });

  //     // const { data: orderData, error: orderError } = await supabase.from('Order').insert(orders!);
  //     // if (orderError) {
  //     //   console.error('Error posting order data:', cartError);
  //     //   return;
  //     // }
  //   }
  // };

  const getCartData = async () => {
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
      const transformData = cartData.map((data) => ({
        productId: data.cart_product_id,
        quantity: data.count
      }));
      return transformData;
    }
  };

  const { data, error, isFetched } = useQuery({ queryKey: ['getCartInfo'], queryFn: getCartData });
  console.log('purchase data::', data);

  if (error) {
    console.error('Error fetching cart info:', error);
    return <p>Error fetching cart info. Please try again later.</p>;
  }

  if (!isFetched) {
    return <p>Loading...</p>;
  }

  const handleNavigate = (products: any) => {
    const encodedData = encodeURIComponent(JSON.stringify(products));
    router.push(`/payment?data=${encodedData}`);
  };

  return <button onClick={() => handleNavigate(data)}>구매하기</button>;
}
