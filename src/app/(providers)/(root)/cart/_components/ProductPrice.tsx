'use client';

import React, { useEffect } from 'react';
import { useQuantityStore, useCartStore } from '@/stores';

export default function ProductPrice({ userId }: { userId: string }) {
  const quantities = useQuantityStore((state) => state.quantities);
  const { cart, initializeCart } = useCartStore((state) => ({
    cart: state.cart,
    initializeCart: state.initializeCart
  }));

  useEffect(() => {
    initializeCart(userId);
  }, [initializeCart, userId]);

  const validQuantities = Object.entries(quantities).reduce(
    (acc, [productId, data]) => {
      if (cart[productId]?.isChecked) {
        acc[productId] = data;
      }
      return acc;
    },
    {} as { [key: string]: { quantity: number; price: number } }
  );

  const totalAmount = Object.entries(validQuantities).reduce(
    (total, [productId, { quantity, price }]) => {
      const cartItem = cart[productId];
      if (cartItem?.isChecked) {
        return total + quantity * price;
      }
      return total;
    },
    0
  );

  return <span className="font-semibold">{totalAmount.toLocaleString()}원</span>;
}
