'use client';
import React, { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createCartItem } from '../../products/[id]/_actions/cartActions';
import useUser from '@/hooks/useUser';
import { getSellerName } from '../actions';
import showSwal from '@/utils/swal';
import Image from 'next/image';

const ProductCard = ({ product }: { product: Product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  const [count, setCount] = useState(1);
  const { user } = useUser();
  const router = useRouter();
  const [businessName, setbusinessName] = useState('');

  useEffect(() => {
    const sellerName = async () => {
      const business_name = await getSellerName(product.product_seller_id!);
      setbusinessName(business_name.business_name);
    };
    sellerName();
  }, []);

  const redirect = (e: string) => {
    router.push(`${e}`);
  };

  const handleAddToCart = async () => {
    if (!user) {
      showSwal('로그인이 필요한 서비스입니다.<br>로그인 후 이용해주세요.');
      router.push(`/login`);
      return;
    }

    const cartItemData = {
      cart_product_id: product.product_id,
      count: count,
      cart_user_id: user.id,
      is_checked: false
    };
    const result = await createCartItem(cartItemData, user.id);

    if (result) {
      showSwal('장바구니에 상품이 정상적으로 담겼습니다.');
    }
  };

  const handleBuyNow = () => {
    router.push(`/payment?productId=${product.product_id}&quantity=1`);
  };

  function handleBuyNowClick(event: React.MouseEvent) {
    event.stopPropagation();
    handleBuyNow();
  }

  function handleAddCartClick(event: React.MouseEvent) {
    event.stopPropagation();
    handleAddToCart();
  }

  return (
    // <div className="flex flex-col w-full max-w-xs border rounded-lg overflow-hidden">
    //   <div className="relative group cursor-pointer w-full max-w-xs aspect-w-1 aspect-h-1">
    //     <Link href={`/products/${product.product_id}`} className="block">
    //       <div className="relative block w-full h-full">
    //         <div className="relative overflow-hidden w-full h-[295px] rounded-[20px]">
    //           <Image
    //             src={product.thumbnail_url}
    //             alt="상세상품"
    //             layout="fill"
    //             objectFit="cover"
    //             className="rounded-[20px] max-w-full max-h-full"
    //           />
    //         </div>
    //       </div>
    //     </Link>
    //     <div
    //       className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:backdrop-blur-sm hover:opacity-100"
    //       onClick={() => redirect(`/products/${product.product_id}`)}
    //     >
    //       <div className="flex gap-2">
    //         <button
    //           className="p-2  rounded-full shadow-lg"
    //           onClick={handleAddCartClick}
    //           type="button"
    //         >
    //           <img src="/icons/icon-card-cart.svg" alt="cart" />
    //         </button>
    //         <button
    //           className="p-2 rounded-full shadow-lg"
    //           onClick={handleBuyNowClick}
    //           type="button"
    //         >
    //           <img src="/icons/icon-card.svg" alt="card" />
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="mt-3">
    //     <p className="text-[#111111] text-sm font-semibold">{businessName}</p>
    //     <p className="text-[#555555] text-sm font-normal">{product.title}</p>
    //     <p className="text-[#111111] text-lg font-semibold">{formatPrice(product.price ?? 0)}원</p>
    //   </div>
    // </div>
    <div className="flex flex-col w-full max-w-xs  rounded-lg overflow-hidden">
      <div className="relative group cursor-pointer w-full max-w-xs">
        <Link href={`/products/${product.product_id}`} className="block">
          <div className="relative block w-full h-full">
            <div className="relative overflow-hidden w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-[20px]">
              <Image
                src={product.thumbnail_url}
                alt="상세상품"
                layout="fill"
                objectFit="cover"
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
            <button
              className="p-2 rounded-full shadow-lg"
              onClick={handleAddCartClick}
              type="button"
            >
              <img src="/icons/icon-card-cart.svg" alt="cart" />
            </button>
            <button
              className="p-2 rounded-full shadow-lg"
              onClick={handleBuyNowClick}
              type="button"
            >
              <img src="/icons/icon-card.svg" alt="card" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-[20px]">
        <p className="text-[#111111] text-sm font-semibold">{businessName}</p>
        <p className="text-[#555555] text-sm font-normal">{product.title}</p>
        <p className="text-[#111111] text-lg font-semibold">{formatPrice(product.price ?? 0)}원</p>
      </div>
    </div>
  );
};

export default ProductCard;
