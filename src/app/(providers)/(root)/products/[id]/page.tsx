'use client';

import { getProductById } from '@/services/product';
import { Product } from '@/types/product';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { useParams } from 'next/navigation';
import React, { act, useRef, useState } from 'react';
import ProductReview from './_components/Review';

interface ParamsProps {
  params: { id: string };
}

function ProductDetailPage() {
  const params = useParams<ParamsProps['params']>();
  const id = params.id;

  const {
    data: product,
    error,
    isPending
  }: UseQueryResult<Product> = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id
  });

  const [activeTab, setActiveTab] = useState('description');
  const reviewRef = useRef<HTMLDivElement | null>(null);

  if (isPending) {
    return <p>Loading ...</p>;
  }

  if (error || !product) {
    return <p> 해당 상품이 없습니다. </p>;
  }

  const handleScrollToReview = () => {
    if (reviewRef.current) {
      reviewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sanitizedProduct = DOMPurify.sanitize(product.description || '');

  return (
    <div className="container mx-auto p-4">
      <section className="flex flex-col md:flex-row">
        <div className="md:w-1/2 flex justify-end">
          <img
            src={product.thumbnail_url}
            alt={product.title}
            className="h-80 w-full md:w-80 rounded-lg"
          />
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0 md:ml-4 pt-6">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-lg mb-2">★★★★★ 13개의 리뷰</p>
          <div className="border-t-2 border-b-2 mb-4">
            <p className="text-xl font-semibold mb-2">가격: {product.price} 원</p>
            <p className="text-md">배송비: 무료</p>
          </div>
          <input type="number" placeholder="구매수량" className="border p-2 w-40 mb-4" />
          <div className="flex items-center gap-2">
            <button className="bg-black text-white p-2 rounded">문의</button>
            <button className="bg-black text-white p-2 rounded">장바구니</button>
            <button className="bg-black text-white p-2 rounded">바로구매</button>
          </div>
        </div>
      </section>

      <nav className="flex justify-center gap-3">
        <button
          onClick={() => {
            setActiveTab('description');
          }}
          className={`border-b-2 ${activeTab === 'description' ? 'border-b-black' : 'border-b-gray-200'}`}
        >
          제품상세
        </button>
        <button
          onClick={() => {
            setActiveTab('reviews');
            handleScrollToReview();
          }}
          className={`border-b-2 ${activeTab === 'reviews' ? 'border-b-black' : 'border-b-gray-200'}`}
        >
          리뷰
        </button>
      </nav>

      <section className="my-8 flex flex-col items-center">
        <div className="text-center border-4 mb-10">
          <h1 className="text-xl font-bold mb-4">상품 상세내용</h1>
          <div dangerouslySetInnerHTML={{ __html: sanitizedProduct }} />
        </div>
        <div ref={reviewRef} className="text-center border-4">
          <h1 className="text-xl font-bold mb-4">리뷰</h1>
          <ProductReview review_product_id={id} />
        </div>
      </section>
    </div>
  );
}

export default ProductDetailPage;
