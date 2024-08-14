import React from 'react';
import ProductCard from '../../(home)/_components/ProductCard';
import { Accordion } from '@szhsin/react-accordion';
import AccordionMenu from '../../seller/mypage/(id)/(category)/_components/AccordionMenu';
import SelectDropdown from '../../livestreaming/_components/SelectDropdown';
import ProductsSortDropdown from '../_components/ProductsSortDropdown';
import { getGoodsData } from '../actions';
import ProductsList from '../_components/ProductsList';

async function GoodsPage() {
  const itemsPerPage = 3;
  const { Product, totalCount } = await getGoodsData(itemsPerPage, 0);

  return (
    <ProductsList
      initialData={Product || []}
      totalItems={totalCount || 0}
      itemsPerPage={itemsPerPage}
      fetchMoreData={getGoodsData}
    />
  );
}

export default GoodsPage;
