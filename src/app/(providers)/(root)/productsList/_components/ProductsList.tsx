'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '../../(home)/_components/ProductCard';
import { GoodsDataResponse, Product } from '@/types/product';

interface ProductsListProps {
  initialData: Product[];
  totalItems: number;
  itemsPerPage: number;
  fetchMoreData: (limit: number, offset: number) => Promise<GoodsDataResponse>;
}

export default function ProductsList({
  initialData,
  totalItems,
  itemsPerPage,
  fetchMoreData
}: ProductsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [goodsData, setGoodsData] = useState<Product[]>(initialData);

  useEffect(() => {
    const fetchGoodsData = async () => {
      const offset = (currentPage - 1) * itemsPerPage;
      const { Product } = await fetchMoreData(itemsPerPage, offset);
      setGoodsData(Product || []);
    };

    fetchGoodsData();
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <section className="mx-auto lg:mt-[80px] lg:mb-[180px]">
      <h2 className="text-[32px] text-center lg:mb-[48px]">상품 목록</h2>
      <div className="flex justify-between lg:mb-[24px]">
        <div>
          <p>전체 {totalItems}개</p>
        </div>
        <div>{/* <ProductsSortDropdown onCategoryChange={} /> */}</div>
      </div>
      <div className="grid grid-cols-4 gap-x-[20px] gap-y-[24px] m:grid-cols-3 s:grid-cols-2 justify-items-center">
        {goodsData?.map((product) => <ProductCard product={product} key={product.product_id} />)}
      </div>
      <div className="flex justify-center mt-10">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`w-8 h-8 mx-[6px] px-3 py-1 rounded-full ${currentPage === index + 1 ? 'border border-Line/Strong' : 'bg-white'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
