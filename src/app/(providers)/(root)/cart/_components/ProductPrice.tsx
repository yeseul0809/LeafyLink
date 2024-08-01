// 'use client';

// import React from 'react';
// import { useQuantityStore } from '@/stores';
// import { Product } from '../actions';

// export default function ProductPrice() {
//   const quantities = useQuantityStore((state) => state.quantities);
//   const totalAmount = Object.values(quantities).reduce(
//     (total, { quantity, price }) => total + quantity * price,
//     0
//   );
//   return <span className="font-semibold">{totalAmount.toLocaleString()}원</span>;
// }

// export default async function ProductPrice({ userId }: { userId: string }) {
//   const checkedCartDatas = await getCheckedCartDatas(userId);
//   console.log('checkedCartDatas::', checkedCartDatas);

//   return <span></span>;
// }

// export default function ProductPrice({ checkedDatas }: { checkedDatas: Product[] }) {
//   console.log('checkedDatas::', checkedDatas);
//   const totalAmount = checkedDatas.reduce((acc, product) => {
//     return acc + product.price * product.count;
//   }, 0);

//   return <span>{totalAmount}</span>;
// }

'use client';

import React, { useEffect } from 'react';
import { useQuantityStore, useCartStore } from '@/stores';

export default function ProductPrice({ userId }: { userId: string }) {
  const quantities = useQuantityStore((state) => state.quantities);
  // const cart = useCartStore((state) => state.cart);
  const { cart, initializeCart } = useCartStore((state) => ({
    cart: state.cart,
    initializeCart: state.initializeCart
  }));

  useEffect(() => {
    initializeCart(userId); // Fetch cart data on mount
  }, [initializeCart, userId]);

  // console.log('Quantities:', quantities);
  // console.log('Cart:', cart);

  // const validQuantities = Object.entries(quantities).reduce(
  //   (acc, [productId, data]) => {
  //     if (cart[productId]) {
  //       acc[productId] = data;
  //     }
  //     return acc;
  //   },
  //   {} as { [key: string]: { quantity: number; price: number } }
  // );

  // const totalAmount = Object.values(validQuantities).reduce(
  //   (total, { quantity, price }) => total + quantity * price,
  //   0
  // );

  // Filter valid quantities based on `isChecked`
  const validQuantities = Object.entries(quantities).reduce(
    (acc, [productId, data]) => {
      if (cart[productId]?.isChecked) {
        acc[productId] = data;
      }
      return acc;
    },
    {} as { [key: string]: { quantity: number; price: number } }
  );

  // Calculate the total amount based on the filtered valid quantities
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
