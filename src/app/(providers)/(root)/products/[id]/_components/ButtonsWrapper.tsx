'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/useUser';
import TopButtons from './TopButtons';
import BottomTab from './BottomTab';
import { createCartItem } from '../_actions/cartActions';
import showSwal, { showSwalContinue } from '@/utils/swal';
import useGetUser from '@/hooks/user/useUser';

interface ButtonsWrapperProps {
  productId: string;
  productPrice: string | number;
  productTitle: string;
  productSellerId: string;
}

function ButtonsWrapper({
  productId,
  productPrice,
  productTitle,
  productSellerId
}: ButtonsWrapperProps) {
  const [count, setCount] = useState(1);
  const { userData } = useGetUser();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!userData) {
      showSwal('로그인이 필요한 서비스입니다.<br>로그인 후 이용해주세요.');
      router.push(`/login`);
      return;
    }

    const cartItemData = {
      cart_product_id: productId,
      count: count,
      cart_user_id: userData.user_id,
      is_checked: true
    };
    const result = await createCartItem(cartItemData, userData.user_id);

    if (result) {
      showSwalContinue('장바구니에 상품이 정상적으로 담겼습니다.', router);
    }
  };

  const handleBuyNow = () => {
    router.push(`/payment?productId=${productId}&quantity=${count}`);
  };

  const productState = {
    count,
    setCount,
    handleAddToCart,
    handleBuyNow,
    product: {
      product_id: productId,
      price: productPrice,
      title: productTitle,
      product_seller_id: productSellerId
    }
  };

  return (
    <>
      <TopButtons productState={productState} />
      <BottomTab productState={productState} />
    </>
  );
}

export default ButtonsWrapper;
