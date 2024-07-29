import React from 'react';

function BestSeller() {
  return (
    <section className="w-[1240px] mx-auto mt-[140px] mb-[180px]">
      <h2 className="text-[32px] text-center mb-[34px]">베스트 셀러</h2>
      <div className=" grid grid-cols-4 gap-x-[20px] gap-y-[24px] justify-items-center">
        <div className="w-[295px]">
          <div className="w-[295px] h-[295px] bg-zinc-300 rounded-2xl"></div>
          <p className="mt-[24px] text-sm font-semibold	">브랜드</p>
          <p className="text-sm text-[#555555]">상품설명</p>
          <p className="mt-[20px] font-semibold text-lg">19,800원</p>
        </div>
        <div className="w-[295px]">
          <div className="w-[295px] h-[295px] bg-zinc-300 rounded-2xl"></div>
          <p className="mt-[24px] text-sm font-semibold	">브랜드</p>
          <p className="text-sm text-[#555555]">상품설명</p>
          <p className="mt-[20px] font-semibold text-lg">19,800원</p>
        </div>
        <div className="w-[295px]">
          <div className="w-[295px] h-[295px] bg-zinc-300 rounded-2xl"></div>
          <p className="mt-[24px] text-sm font-semibold	">브랜드</p>
          <p className="text-sm text-[#555555]">상품설명</p>
          <p className="mt-[20px] font-semibold text-lg">19,800원</p>
        </div>
        <div className="w-[295px]">
          <div className="w-[295px] h-[295px] bg-zinc-300 rounded-2xl"></div>
          <p className="mt-[24px] text-sm font-semibold	">브랜드</p>
          <p className="text-sm text-[#555555]">상품설명</p>
          <p className="mt-[20px] font-semibold text-lg">19,800원</p>
        </div>
      </div>
    </section>
  );
}

export default BestSeller;
