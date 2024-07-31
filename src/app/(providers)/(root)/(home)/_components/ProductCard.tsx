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
      <div className="w-[295px]">
        <div className="relative ">
          <div
            onClick={() => redirect('/')}
            className="cursor-pointer opacity-0 w-[295px] h-[295px]  z-1 flex justify-center items-center absolute z-5 hover:backdrop-blur-sm hover:opacity-100"
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
              className="w-[295px] h-[295px] bg-zinc-300 rounded-2xl hover:bg-white cursor-pointer"
            ></img>
          </Link>
        </div>
      </div>
      <p className="max-w-[295px] w-[100%] mt-[24px] text-sm font-semibold">{product.title}</p>
      <p className="max-w-[295px] w-[100%] line-clamp-2 text-sm text-[#555555] text-ellipsis overflow-hidden">
        {product.description}
      </p>
      <p className="mt-[10px] font-semibold text-lg">{formatPrice(product.price)}원</p>
    </div>
  );
};

export default ProductCard;
