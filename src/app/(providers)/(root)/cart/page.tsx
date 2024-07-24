import React from 'react';
import { deleteCart, getCartData, getProductData, getUserSession } from './actions';
import Image from 'next/image';
import QuantityButton from './_components/QuantityButton';
import ProductPrice from './_components/ProductPrice';
import DeleteButton from './_components/DeleteButton';
import PurchaseButton from './_components/PurchaseButton';

export default async function CartPage() {
  const userData = await getUserSession();

  let cartData, productData;
  if (userData) {
    cartData = await getCartData(userData.user.id);
    if (cartData) {
      productData = await getProductData(cartData);
    }
  }

  console.log('productData::', productData);

  return (
    <div>
      <h1>장바구니</h1>
      {cartData && <h2>{`장바구니 상품(${cartData?.length})`}</h2>}
      <div className="border-t border-gray-300 mt-2" />
      <div className="flex items-start *:my-14">
        <section className="w-[60%] ring-1 flex">
          <div className="w-full">
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
                    <div>{data.price}원</div>
                    <DeleteButton productId={data.product_id} />
                  </div>
                );
              })}
          </div>
        </section>
        <div className="flex flex-col">
          <div className="ring-1 h-[30%]">
            <div>
              <span>총 상품금액</span>
              <ProductPrice />
            </div>
            <div>
              <span>총 배송비</span>
              <span>무료</span>
            </div>
            <div>
              <span>결제 예정 금액</span>
              <ProductPrice />
            </div>
          </div>
          <PurchaseButton />
        </div>
      </div>
      <div className="border-t border-gray-300 mt-2" />
    </div>
  );
}
