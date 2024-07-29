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

  return (
    <div>
      <h1 className="text-[36px] text-center">장바구니</h1>
      {cartData && (
        <h2 className="text-[18px] font-semibold">{`장바구니 상품(${cartData?.length})`}</h2>
      )}
      <div className="border-t border-gray-300 mt-2" />
      <div className="flex items-start *:my-14">
        {productData && productData.length !== 0 ? (
          <section className="w-full border-[#D9D9D9] border rounded-md flex py-[52px] px-[87px] flex-col">
            {productData.map((data) => {
              return (
                <div
                  key={data.product_id}
                  className="flex border-b-2 last:border-none mb-[52px] last:mb-0 pb-[52px] last:pb-0 items-center justify-between"
                >
                  <div className="flex items-center">
                    <Image src={data.thumbnail_url} alt={data.title} width={150} height={150} />
                    <div className="ml-8">
                      <p className="text-[18px] font-semibold mb-2">{data.title}</p>
                      <p className="text-[12px]">배송비 무료</p>
                      <QuantityButton productId={data.product_id} price={data.price} />
                    </div>
                  </div>
                  <div className="flex gap-12">
                    <div className="text-[18px] font-semibold">{data.price.toLocaleString()}원</div>
                    <DeleteButton productId={data.product_id} />
                  </div>
                </div>
              );
            })}            
          </section>
        ) : (
          <p className="text-[20px] w-full text-center">장바구니가 비어 있습니다</p>
        )}

        {productData && productData.length !== 0 && (
          <div className="flex flex-col w-[370px] h-[219px] ml-4">
            <div className="ring-1 ring-[#D9D9D9] rounded-md w-full h-full flex flex-col items-end justify-center p-6">
              <div className="text-[14px] w-full text-center flex justify-between mb-3">
                <span>총 상품금액</span>
                <ProductPrice />
              </div>
              <div className="text-[14px] w-full text-center flex justify-between mb-3">
                <span>총 배송비</span>
                <span>무료</span>
              </div>
              <div className="border-t border-gray-300 mt-2 w-full" />
              <div className="w-full text-center flex justify-between text-[18px] mt-5">
                <span>결제 예정 금액</span>
                <ProductPrice />
              </div>
            </div>
            <PurchaseButton />
          </div>
        )}
      </div>
      {/* <div className="border-t border-gray-300 mt-2" /> */}
    </div>
  );
}
