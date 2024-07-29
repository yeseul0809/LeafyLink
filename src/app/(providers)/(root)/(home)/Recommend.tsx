import React from 'react';

function Recommend() {
  return (
    <section className="w-[1240px] mx-auto mt-[140px]">
      <h2 className="text-[32px] text-center mb-[34px]">이 달의 추천 식물</h2>
      <div className=" grid grid-cols-2 gap-x-[20px] justify-items-center">
        <div className="w-[610px] h-[342px] bg-zinc-300 rounded-2xl"></div>
        <div>
          <p className="mb-[5px]">판매자명/브랜드명 최대 1줄</p>
          <h3 className="text-[32px] mb-[10px]">제품명 최대 2줄 넘어가면 말줄임표</h3>
          <h3 className="text-[32px] font-semibold mb-[15px]">99,999,999원</h3>
          <p className="line-clamp-3 text-ellipsis overflow-hidden text-[#555555]">
            이 식물을 추천하는 이유 최대 3줄까지 노출 이 식물을 추천하는 이유 최대 3줄까지 노출 이
            식물을 추천하는 이유 최대 3줄까지 노출 이 식물을 추천하는 이유 최대 3줄까지 노출 이
            식물을 추천하는 이유 최대 3줄까지 노출 이 식물을 추천하는 이유 최대 3줄까지 노출 이
            식물을 추천하는 이유 최대 3줄까지 노출 이 식물을 추천하는 이유
          </p>
          <button className="w-[610px] h-[56px] mt-[32px] rounded-md bg-[#3BB873] text-white">
            바로가기
          </button>
        </div>
      </div>
    </section>
  );
}

export default Recommend;
