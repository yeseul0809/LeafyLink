import React from 'react';
import { getCartData } from './actions';

export default async function CartPage() {
  const data = await getCartData();
  console.log('cartData::', data);

  return (
    <div>
      <h1>장바구니</h1>
      <h2>장바구니 상품(0)</h2>
      <div className="border-t border-gray-300 mt-2" />
      <section>
        <p>장바구니가 비어 있습니다</p>
      </section>
      <div className="border-t border-gray-300 mt-2" />
    </div>
  );
}
