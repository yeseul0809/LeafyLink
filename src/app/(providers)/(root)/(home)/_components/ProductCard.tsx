'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createCartItem } from '../../products/[id]/_actions/cartActions';
import showSwal from '@/utils/swal';
import { createClient } from '@/supabase/supabaseClient';
import Image from 'next/image';
import { ProductWithBusinessName } from '../actions';

const ProductCard = ({ product }: { product: ProductWithBusinessName }) => {
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
    const result = await createCartItem(cartItemData, user.id);

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
    <div className="flex flex-col items-center max_sm:mb-[20px]">
      <div className="lg:w-[295px]">
        <div className="relative">
          <div
            onClick={() => router.push(`/products/${product.product_id}`)}
            className="cursor-pointer opacity-0 lg:w-[295px] lg:h-[295px] w-[164px] h-[164px] z-1 absolute top-0 left-0 z-5 hover:backdrop-blur-sm hover:opacity-100"
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-4 max_sm:space-x-1">
              <button className="size-[30px] mr-10 relative" onClick={handleAddCartClick}>
                <Image src="/icons/icon-card-cart.svg" alt="cart" fill />
              </button>
              <button onClick={handleBuyNowClick} className="size-[30px] relative">
                <Image src="/icons/icon-card.svg" alt="card" fill />
              </button>
            </div>
          </div>

          <Link href={'/상세페이지'}>
            <img
              src={product.thumbnail_url}
              className="lg:w-[295px] lg:h-[295px] w-[164px] h-[164px] bg-zinc-300 rounded-2xl hover:bg-white cursor-pointer object-cover"
            ></img>
          </Link>
        </div>
      </div>
      <p className="lg:w-[295px] w-[164px] mt-[24px] text-sm font-semibold max_sm:mt-[16px]">
        {product.business_name}
      </p>
      <p className="lg:w-[295px] w-[164px] lg:line-clamp-2 line-clamp-1 text-sm text-[#555555] text-ellipsis overflow-hidden">
        {product.title}
      </p>
      <p className="lg:w-[295px] w-[164px] mt-[10px] font-semibold text-[14px] max_sm:mt-[8px]">
        {formatPrice(product.price ?? 0)}원
      </p>
    </div>
  );
};

export default ProductCard;
