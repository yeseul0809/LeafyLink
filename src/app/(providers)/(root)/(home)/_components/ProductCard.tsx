'use client';
import React from 'react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { createCartItem } from '../../products/[id]/_actions/cartActions';
import showSwal from '@/utils/swal';
import { createClient } from '@/supabase/supabaseClient';
import Image from 'next/image';
import { ProductWithBusinessName } from '../actions';
import { useCartStore } from '@/stores';

const ProductCard = ({ product }: { product: ProductWithBusinessName }) => {
  const { initializeCart } = useCartStore((state) => ({
    initializeCart: state.initializeCart
  }));
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };
  const router = useRouter();
  const getUserData = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    return data;
  };

  const handleAddToCart = async () => {
    const { user } = await getUserData();
    if (!user) {
      showSwal('로그인이 필요한 서비스입니다.<br>로그인 후 이용해주세요.');
      router.push(`/login`);
      return;
    }

    const cartItemData = {
      cart_product_id: product.product_id,
      count: 1,
      cart_user_id: user.id,
      is_checked: false
    };
    const result = await createCartItem(cartItemData, user.id, initializeCart);

    if (result) {
      showSwal('장바구니에 상품이 정상적으로 담겼습니다.');
    }
  };

  function handleAddCartClick(event: React.MouseEvent) {
    event.stopPropagation();
    handleAddToCart();
  }

  const handleBuyNow = () => {
    router.push(`/payment?productId=${product.product_id}&quantity=1`);
  };
  function handleBuyNowClick(event: React.MouseEvent) {
    event.stopPropagation();
    handleBuyNow();
  }

  return (
    <div className="flex flex-col w-full max-w-xs  rounded-lg overflow-hidden">
      <div className="relative group cursor-pointer w-full max-w-xs">
        <Link href={`/products/${product.product_id}`} className="block">
          <div className="relative block w-full h-full">
            <div className="relative overflow-hidden w-full  rounded-[20px] h-[165px] md:h-[172px] lg:h-[295px]">
              <Image
                src={product.thumbnail_url}
                alt="상세상품"
                fill
                sizes="(max-width: 1024px) 100vw, 295px"
                style={{ objectFit: 'cover' }}
                className="rounded-[20px] max-w-full max-h-full"
              />
            </div>
          </div>
        </Link>
        <div
          className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:backdrop-blur-sm hover:opacity-100"
          onClick={() => redirect(`/products/${product.product_id}`)}
        >
          <div className="flex gap-2">
            <button className="p-4" onClick={handleAddCartClick} type="button">
              <img src="/icons/icon-card-cart.svg" alt="cart" />
            </button>
            <button className="p-4" onClick={handleBuyNowClick} type="button">
              <img src="/icons/icon-card.svg" alt="card" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-[20px]">
        <p className="text-font/main text-12-sb-18-3 webkit-box md:text-14-sb-20-35">
          {product.business_name}
        </p>
        <p className="text-font/sub1 text-13-n-18-325 webkit-box md:text-14-n-20-35 mb-[8px]">
          {product.title}
        </p>
        <p className="text-font/main text-14-sb-20-35 webkit-box md:text-18-sb-26-45">
          {formatPrice(product.price ?? 0)}원
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
