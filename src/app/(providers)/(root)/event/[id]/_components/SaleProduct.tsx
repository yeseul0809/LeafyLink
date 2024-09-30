'use client';
import React, { useEffect, useState } from 'react';
import { getRelatedProducts } from '../action';
import Link from 'next/link';
import { Product, SaleProductProps } from '../Event';
import useSalePercent from '@/utils/(sale)/useSalePercent';

export default function SaleProduct({ eventId }: SaleProductProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [discounts, setDiscounts] = useState<{ [productId: string]: number | null }>({});

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      const data: Product[] | null = await getRelatedProducts(eventId);
      if (data) {
        setProducts(data);

        const discountPromises = data.map(async (product) => {
          const discount = await useSalePercent(product.product_id);
          return { productId: product.product_id, discount };
        });

        const discountResults = await Promise.all(discountPromises);
        const discountMap = discountResults.reduce(
          (acc, { productId, discount }) => {
            acc[productId] = discount;
            return acc;
          },
          {} as { [productId: string]: number | null }
        );

        setDiscounts(discountMap);
      } else {
        setError('제품을 가져오는 데 오류가 발생했습니다.');
      }
      setLoading(false);
    };

    fetchRelatedProducts();
  }, [eventId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-5 flex flex-col items-center ">세일 중인 상품</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <li key={product.product_id} className="flex flex-col items-start gap-5">
            <Link href={`/products/${product.product_id}`}>
              <div className="flex-col justify-start items-start gap-5 inline-flex">
                {product.thumbnail_url && (
                  <img
                    src={product.thumbnail_url}
                    alt={product.title}
                    className="w-[295px] h-[295px] object-cover rounded-[20px]"
                  />
                )}
                <div className="flex-col justify-start items-start gap-2 flex">
                  <div className="flex-col justify-start items-start gap-3 flex">
                    <div className="flex-col justify-start items-start gap-0.5 flex">
                      <div className="w-full text-[#111111] text-sm font-semibold leading-tight">
                        {product.title}
                      </div>
                      <div className="w-full text-[#555555] text-sm font-normal leading-tight">
                        {product.title}
                      </div>
                    </div>
                    <div className="justify-start items-center gap-2 inline-flex">
                      <div className="justify-start items-start gap-1.5 flex">
                        <div className="text-[#3bb873] text-lg font-semibold leading-relaxed">
                          {discounts[product.product_id] ? `${discounts[product.product_id]}%` : ''}
                        </div>
                        <div className="text-[#111111] text-lg font-semibold leading-relaxed">
                          {product.sale_price?.toLocaleString()} 원
                        </div>
                      </div>
                      <div className="text-[#767676] text-base font-normal line-through leading-normal">
                        {product.price.toLocaleString()} 원
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
