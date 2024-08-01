'use client';
import React, { useState } from 'react';
import { Product } from '@/types/product';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ProductCard = ({ product }: { product: Product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };
  const router = useRouter();

  // 페이지 네비게이션
  const redirect = (e: string) => {
    router.push(`${e}`);
  };

  return (
    <div>
      <div className="lg:w-[295px]">
        <div className="relative ">
          <div
            onClick={() => redirect(`/products/${product.product_id}`)}
            className="cursor-pointer opacity-0 lg:w-[295px] lg:h-[295px] w-[164px] h-[164px] z-1 flex justify-center items-center absolute z-5 hover:backdrop-blur-sm hover:opacity-100"
          >
            <Link href={'cart'} className="mr-10" onClick={(event) => event.stopPropagation()}>
              <img src="/icons/icon-card-cart.svg" alt="cart" />
            </Link>
            <Link href={''} onClick={(event) => event.stopPropagation()}>
              <img src="/icons/icon-card.svg" alt="card" />
            </Link>
          </div>

          <Link href={'/상세페이지'}>
            <img
              src={product.thumbnail_url}
              className="lg:w-[295px] lg:h-[295px] w-[164px] h-[164px] bg-zinc-300 rounded-2xl hover:bg-white cursor-pointer"
            ></img>
          </Link>
        </div>
      </div>
      <p className="lg:w-[295px] w-[164px] mt-[24px] text-sm font-semibold">{product.title}</p>
      <p className="lg:w-[295px] w-[164px] lg:line-clamp-2 line-clamp-1 text-sm text-[#555555] text-ellipsis overflow-hidden">
        {product.description}
      </p>
      <p className="mt-[10px] font-semibold text-lg">{formatPrice(product.price ?? 0)}원</p>
    </div>
  );
};

export default ProductCard;
