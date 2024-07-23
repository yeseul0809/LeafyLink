'use client';

import { getProductById } from '@/services/product';
import { Product } from '@/types/product';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { useParams } from 'next/navigation';
import React from 'react';

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

  if (isPending) {
    return <p>Loading ...</p>;
  }

  if (error || !product) {
    return <p> 해당 상품이 없습니다. </p>;
  }

  const sanitizedProduct = DOMPurify.sanitize(product.description || '');

  return (
    <>
      <section>
        <img src={product.thumbnail_url} alt={product.title} />
        <h1>{product.title}</h1>
        <strong>가격: {product.price} 원</strong>
        <strong>카테고리: {product.category}</strong>
        <input type="number" placeholder="구매수량을 입력해주세요."></input>
      </section>

      <section>
        <h1>상품 상세내용</h1>
        <div dangerouslySetInnerHTML={{ __html: sanitizedProduct }} />
      </section>
    </>
  );
}

export default ProductDetailPage;
