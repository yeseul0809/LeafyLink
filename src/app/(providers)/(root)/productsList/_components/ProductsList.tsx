'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '../../(home)/_components/ProductCard';
import { getCategoryData } from '../actions';
import { ProductWithBusinessName } from '../../(home)/actions';

interface ProductsListProps {
  initialData: ProductWithBusinessName[];
  totalItems: number;
  itemsPerPage: number;
  category: string;
}

export default function ProductsList({
  initialData,
  totalItems,
  itemsPerPage,
  category
}: ProductsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsData, setProductsData] = useState<ProductWithBusinessName[]>(initialData);

  useEffect(() => {
    const fetchProductData = async () => {
      const offset = (currentPage - 1) * itemsPerPage;
      const products = await getCategoryData(category); // category를 기준으로 데이터 가져오기
      setProductsData(products.slice(offset, offset + itemsPerPage)); // 페이지네이션 적용
    };

    fetchProductData();
  }, [currentPage, category]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <section className="mx-auto lg:mt-[80px] lg:mb-[180px]">
      <h2 className="text-[32px] text-center lg:mb-[48px]">상품 목록</h2>
      <div className="flex justify-between lg:mb-[24px]">
        <div>
          <p>전체 {totalItems}개</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-[20px] gap-y-[24px] m:grid-cols-3 s:grid-cols-2 justify-items-center">
        {productsData?.map((product) => <ProductCard product={product} key={product.product_id} />)}
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