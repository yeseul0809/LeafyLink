'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createCartItem } from '../../products/[id]/_actions/cartActions';
import showSwal, { showSwalContinue } from '@/utils/swal';
import { createClient } from '@/supabase/supabaseClient';
import Image from 'next/image';
import { ProductWithBusinessName } from '../actions';
import { useCartStore } from '@/stores';

const ProductCard = ({ product }: { product: ProductWithBusinessName }) => {
  const [isSale, setIsSale] = useState(true);
  const router = useRouter();

  const { initializeCart } = useCartStore((state) => ({
    initializeCart: state.initializeCart
  }));
  const getUserData = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    return data;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
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
      showSwalContinue('장바구니에 상품이 정상적으로 담겼습니다.', router);
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
    <div className="flex flex-col w-full max-w-xs rounded-lg overflow-hidden">
      <div className="relative group cursor-pointer w-full">
        <Link href={`/products/${product.product_id}`} className="block">
          <div className="relative block w-full h-full">
            <div className="relative overflow-hidden w-full rounded-[20px] h-[165px] md:h-[172px] lg:h-[295px]">
              <Image
                src={product.thumbnail_url}
                alt="상세상품"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="rounded-[20px] max-w-full max-h-full object-cover"
              />
            </div>
          </div>
        </Link>
        <div
          className="absolute top-[calc(100%-63px)] h-[63px] bg-white rounded-b-[19px] inset-0 flex justify-evenly items-center opacity-0 group-hover:opacity-80 transition-opacity duration-300 hover:backdrop-blur-sm"
          onClick={() => router.push(`/products/${product.product_id}`)}
        >
          <div
            onClick={handleAddCartClick}
            className="w-full h-full flex items-center justify-center"
          >
            <button type="button">
              <Image src="/icons/icon-card-cart.svg" alt="cart" width={21} height={21} />
            </button>
          </div>
          <div className="w-[1px] h-full border-r-[1px] border-[#CACAD7]"></div>
          <div
            onClick={handleBuyNowClick}
            className="w-full h-full flex items-center justify-center"
          >
            <button type="button">
              <Image src="/icons/icon-card.svg" alt="card" width={26} height={21} />
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
        {isSale ? (
          <p className="text-font/main text-14-sb-20-35 webkit-box md:text-18-sb-26-45 ">
            <span>{formatPrice(product.price ?? 0)}할인원</span>
            <span className="line-through text-[#767676] text-[16px] pl-2">
              {formatPrice(product.price ?? 0)}
            </span>
          </p>
        ) : (
          <p className="text-font/main text-14-sb-20-35 webkit-box md:text-18-sb-26-45">
            {formatPrice(product.price ?? 0)}원
          </p>
        )}
      </div>
    </div>
  );
};
export default ProductCard;
