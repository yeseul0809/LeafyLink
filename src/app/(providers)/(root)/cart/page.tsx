import React from 'react';
import { getCartData, getProductData, getUserSession } from './actions';
import Image from 'next/image';
import QuantityButton from './ QuantityButton';
import supabaseSever from '@/supabase/supabaseServer';
import ProductPrice from './ProductPrice';

export default async function CartPage() {
  const userData = await getUserSession();

  let cartData, productData;
  if (userData) {
    cartData = await getCartData(userData.user.id);
    if (cartData) {
      productData = await getProductData(cartData);
    }
  }

  return (
    <div>
      <h1>장바구니</h1>
      {cartData && <h2>{`장바구니 상품(${cartData?.length})`}</h2>}
      <div className="border-t border-gray-300 mt-2" />
      <section className="w-[60%] ring-1 my-14 flex">
        <div>
          {productData &&
            productData.map((data) => {
              return (
                <div key={data.product_id} className="flex border-b-2 last:border-none">
                  <Image src={data.thumbnail_url} alt={data.title} width={150} height={150} />
                  <div>
                    <p>{data.title}</p>
                    <p>배송비 무료</p>
                    <QuantityButton productId={data.product_id} price={data.price} />
                  </div>
                </div>
              );
            })}
        </div>
        <ProductPrice />
      </section>
      <div className="border-t border-gray-300 mt-2" />
    </div>
  );
}
