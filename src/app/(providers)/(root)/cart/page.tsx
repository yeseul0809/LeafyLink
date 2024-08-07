import React from 'react';
import Image from 'next/image';
import { getCartData, getProductData, getUserSession } from './actions';
import QuantityButton from './_components/QuantityButton';
import ProductPrice from './_components/ProductPrice';
import DeleteButton from './_components/DeleteButton';
import PurchaseButton from './_components/PurchaseButton';
import Checkbox from './_components/Checkbox';
import AllCheckbox from './_components/AllCheckbox';
import SelectDeleteButton from './_components/SelectDeleteButton';

export default async function CartPage() {
  const userData = await getUserSession();

  let cartData, allProductData, checkedTrueDatas;
  if (userData) {
    cartData = await getCartData(userData.user.id);
    if (cartData) {
      allProductData = await getProductData(cartData, 'all');
      checkedTrueDatas = await getProductData(cartData, 'checked');
    }
  }

  const productIds = allProductData?.map((data) => data.product_id);

  return (
    <div className="pt-[80px] pb-[180px] xs:pt-[24px] xs:pb-[43px]">
      <h1 className="text-[36px] text-center xs:mb-[30px]">장바구니</h1>
      {cartData && (
        <h2 className="text-[18px] font-semibold">{`장바구니 상품(${cartData?.length})`}</h2>
      )}
      <div className="border-t border-gray-300 mt-4" />
      <div className="flex items-start my-4 xs:flex-col">
        {allProductData && allProductData.length !== 0 ? (
          <section className="w-full rounded-md flex flex-col">
            <div className="flex items-center gap-4 xs:gap-[12px]">
              <AllCheckbox productIds={productIds!} userId={userData?.user.id!} />
              <div className="border-l border-[#E5E5EC] h-[22px] xs:h-[12px]" />
              <SelectDeleteButton userId={userData?.user.id!} />
            </div>
            {allProductData.map((data) => {
              return (
                <div
                  key={data.product_id}
                  className="flex border-b-2 last:border-none last:mb-0 pb-[52px] last:pb-0 items-start justify-between relative pl-8 mt-[48px] w-full h-[145px] xs:h-[160px]"
                >
                  <Checkbox productId={data.product_id} userId={userData?.user.id!} />
                  <div className="flex items-start w-full mr-[32px]">
                    <div className="relative w-[96px] h-[96px] xs:w-[80px] xs:h-[80px]">
                      <Image
                        src={data.thumbnail_url}
                        alt={data.title}
                        fill
                        className="rounded-[6px]"
                      />
                    </div>
                    <div className="flex justify-between items-center w-full xs:flex-col xs:items-start">
                      <div className="ml-[20px] xs:ml-[15px]">
                        <p className="text-[18px] font-semibold mb-2 xs:text-[14px]">
                          {data.title}
                        </p>
                        <p className="text-[12px]">배송비 무료</p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex xs:flex-col xs:mt-[12px] xs:ml-[15px] items-center xs:items-start">
                          <QuantityButton
                            productId={data.product_id}
                            price={data.price}
                            userId={userData?.user.id!}
                          />
                          <div className="text-[18px] font-semibold xs:text-[13px] xs:mt-[20px]">
                            {data.price.toLocaleString()}원
                          </div>
                        </div>
                        <DeleteButton productId={data.product_id} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        ) : (
          <p className="text-[15px] w-full text-center mt-[80px] xs:mt-[41px] xs:text-[13px]">
            장바구니가 비어 있습니다
          </p>
        )}

        {allProductData && allProductData.length !== 0 && (
          <div className="flex flex-col w-[370px] ml-[20px] bg-[#FEFEFA] mt-14 xs:w-[335px] xs:ml-0">
            <div className="ring-1 ring-[#D9D9D9] rounded-md w-full h-full flex flex-col items-end justify-center p-6">
              <div className="text-[14px] w-full text-center flex justify-between mb-3">
                <span>총 상품금액</span>
                <ProductPrice userId={userData?.user.id!} />
              </div>
              <div className="text-[14px] w-full text-center flex justify-between mb-3">
                <span>총 배송비</span>
                <span>무료</span>
              </div>
              <div className="border-t border-gray-300 mt-2 w-full" />
              <div className="w-full text-center flex justify-between text-[16px] mt-5">
                <span>결제 예정 금액</span>
                <ProductPrice userId={userData?.user.id!} />
              </div>
            </div>
            <PurchaseButton userId={userData?.user.id!} />
          </div>
        )}
      </div>
    </div>
  );
}
