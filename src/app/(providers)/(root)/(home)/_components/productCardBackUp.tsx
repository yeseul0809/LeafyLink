// import { createPostponedAbortSignal } from 'next/dist/server/app-render/dynamic-rendering';
// import ProductCard from './_components/ProductCard';
// import { getProducts } from './actions';
// import { getAllProduct } from '@/apis/product/products';

// async function NewProduct() {
//   const newProductsData = await getProducts();
//   const sortedProducts = newProductsData.sort(
//     (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//   );

//   return (
//     <section className="lg:w-[1240px] mx-auto lg:mt-[93px] mt-[55px] px-5 lg:px-0">
//       <h2 className="text-[32px] text-center lg:mb-[43px] mb-[16px]">신제품</h2>
//       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-[20px] lg:gap-y-[24px] justify-items-center">
//         {sortedProducts.slice(0, 8).map((product) => (
//           <div key={product.product_id}>
//             <ProductCard product={product} />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default NewProduct;

// -------------------------------------------------------------------------------------------------

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

const ProductCard2 = ({ product }: { product: Product }) => {
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
      is_checked: true
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
    <div>
      <div className="lg:w-[295px]">
        <div className="relative ">
          <div
            onClick={() => redirect(`/products/${product.product_id}`)}
            className="cursor-pointer opacity-0 lg:w-[295px] lg:h-[295px] w-[164px] h-[164px] z-1 lg:flex justify-center items-center absolute z-5 hover:backdrop-blur-sm hover:opacity-100"
          >
            <button className="mr-10" onClick={handleAddCartClick}>
              <img src="/icons/icon-card-cart.svg" alt="cart" />
            </button>
            <button onClick={handleBuyNowClick}>
              <img src="/icons/icon-card.svg" alt="card" />
            </button>
          </div>

          <Link href={'/상세페이지'}>
            {/* <Link href={`/products/${product.product_id}`}> */}
            <img
              src={product.thumbnail_url}
              // alt="product_image"
              // layout="fill"
              className="lg:w-[295px] lg:h-[295px] w-[164px] h-[164px] bg-zinc-300 rounded-2xl hover:bg-white cursor-pointer object-cover"
            ></img>
          </Link>
        </div>
      </div>
      <p className="lg:w-[295px] w-[164px] mt-[24px] text-sm font-semibold">{businessName}</p>
      <p className="lg:w-[295px] w-[164px] lg:line-clamp-2 line-clamp-1 text-sm text-[#555555] text-ellipsis overflow-hidden">
        {product.title}
      </p>
      <p className="mt-[10px] font-semibold text-lg">{formatPrice(product.price ?? 0)}원</p>
    </div>
  );
};

export default ProductCard2;
