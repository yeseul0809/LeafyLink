import React from 'react';
import ProductCard from '../../(home)/_components/ProductCard';
import { Accordion } from '@szhsin/react-accordion';
import AccordionMenu from '../../seller/mypage/(id)/(category)/_components/AccordionMenu';
import SelectDropdown from '../../livestreaming/_components/SelectDropdown';
import ProductsSortDropdown from '../_components/ProductsSortDropdown';
import { getCategoryData, getGoodsData } from '../actions';

async function Goods() {
  // const goodsData = await getGoodsData();
  const goodsData = await getCategoryData('원예용품');

  const countProduct = goodsData?.length;
  // countProduct === 0 ? 상품이 없다는 표시 : 상품리스트 보여주기

  return (
    <section className="mx-auto lg:mt-[80px] lg:mb-[180px]">
      <h2 className="text-[32px] text-center lg:mb-[48px]">원예용품</h2>
      <div className="flex justify-between lg:mb-[24px]">
        <div>
          <p>전체 {countProduct}개</p>
        </div>
        <div>{/* <ProductsSortDropdown onCategoryChange={} /> */}</div>
      </div>
      <div className="grid grid-cols-4 gap-x-[20px] gap-y-[24px] m:grid-cols-3 s:grid-cols-2 justify-items-center">
        {goodsData?.map((product) => <ProductCard product={product} key={product.product_id} />)}
      </div>
      <div></div>
    </section>
  );
}

export default Goods;
