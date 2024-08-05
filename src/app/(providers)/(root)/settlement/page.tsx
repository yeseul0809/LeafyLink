import React from 'react';
import { TransformedProduct } from '../payment/payment';
import Image from 'next/image';
import { getUserData } from './actions';
import RedirectButton from './_components/RedirectButton';

export default async function SettlementPage({ searchParams }: { searchParams: any }) {
  const productDatas: TransformedProduct[] = JSON.parse(
    decodeURIComponent(searchParams.data || '')
  );
  const totalCost = productDatas.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const userData = await getUserData();

  return (
    <div className="pt-[80px] pb-[180px] max-w-[610px] mx-auto">
      <h1 className="text-[32px] font-semibold text-center mb-[32px]">주문 완료</h1>
      <div className="mb-[32px]">
        <p className="text-[20px] font-semibold mb-[12px]">{userData![0].user_name}</p>
        <p className="text-[15px]">{userData![0].address + userData![0].address_detail}</p>
        <div className="flex">
          <p className="text-[15px]">{userData![0].phone.slice(0, 3)}-</p>
          <p className="text-[15px]">{userData![0].phone.slice(3, 7)}-</p>
          <p className="text-[15px]">{userData![0].phone.slice(7)}</p>
        </div>
      </div>
      <div className="w-full border-b border-Line/Regular mb-[32px]" />
      <div>
        <h2 className="text-[20px] font-semibold mb-[20px]">주문상품 {productDatas.length}건</h2>
        {productDatas.map((data) => {
          return (
            <>
              <div key={data.product_id} className="flex items-center">
                <div className="w-[96px] h-[96px] relative mr-[20px]">
                  <Image
                    src={data.thumbnail_url}
                    alt="주문상품이미지"
                    fill
                    className="rounded-[10px]"
                  />
                </div>
                <div>
                  <h1 className="text-[14px] font-semibold mb-[8px]">{data.title}</h1>
                  <p className="text-font/sub2 text-[14px]">{data.quantity}개</p>
                </div>
              </div>
              <div className="w-full border-b border-Line/Regular mb-[32px] mt-[32px]" />
            </>
          );
        })}
        {/* <div className="w-full border-b border-Line/Regular mb-[32px] mt-[32px]" /> */}
        <div>
          <div className="flex items-center text-[20px] font-semibold justify-between mb-[20px]">
            <h2>최종 결제 금액</h2>
            <p>{totalCost.toLocaleString()} 원</p>
          </div>
          <div className="flex items-center text-[15px] justify-between mb-[12px]">
            <p>총 상품 금액</p>
            <p>{totalCost.toLocaleString()} 원</p>
          </div>
          <div className="flex items-center text-[15px] justify-between mb-[12px]">
            <p>배송비</p>
            <p>무료</p>
          </div>
        </div>
        <div className="w-full border-b border-Line/Regular mb-[32px] mt-[32px]" />
        <div className="mb-[32px]">
          <h2 className="text-[20px] font-semibold mb-[20px]">결제 상세</h2>
          <div className="flex justify-between items-center text-[14px]">
            <p>카카오페이</p>
            <p>{totalCost.toLocaleString()} 원</p>
          </div>
        </div>
      </div>
      <RedirectButton />
    </div>
  );
}
