'use client';

import Image from 'next/image';
import React from 'react';
import paymentHandler from './payment';
import UserEditForm from './_components/AddressForm';
import { getUserDate } from './actions';
import { createClient } from '@/supabase/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

interface Product {
  productId: string;
  quantity: number;
}

interface CombinedProductData {
  product_id: string;
  productseller_id: string;
  category: string;
  title: string;
  price: number;
  quantity: number;
  stock: number;
  thumbnail_url: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ProductInfo {
  combinedData: CombinedProductData[];
  totalCost: number;
  cart: boolean;
}

export default function PaymentPage() {
  let products: Product[] = [];
  const searchParams = useSearchParams();
  const dataString = searchParams.get('data');
  const productId = searchParams.get('productId');
  const quantity = searchParams.get('quantity');

  if (dataString) {
    try {
      const decodedData = decodeURIComponent(dataString);
      products = JSON.parse(decodedData);
    } catch (error) {
      console.error('Error decoding or parsing query data:', error);
    }
  } else if (productId && quantity) {
    products = [{ productId, quantity: Number(quantity) }];
  }

  const getProductInfo = async () => {
    const productIds = products.map((product) => product.productId);
    const supabase = createClient();
    const { data: productData, error } = await supabase
      .from('Product')
      .select()
      .in('product_id', productIds);
    if (error) {
      console.error('Error fetching product data:', error);
      return null;
    }

    const combinedData = productData.map((product) => {
      const matchingProduct = products.find((p) => p.productId === product.product_id);
      return {
        ...product,
        quantity: matchingProduct ? matchingProduct.quantity : 0
      };
    });

    const totalCost = combinedData.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    return { combinedData, totalCost, cart: !!dataString };
  };

  const {
    data: productData,
    error: productError,
    isFetched: productFeched
  } = useQuery({
    queryKey: ['getProductInfo'],
    queryFn: getProductInfo
  });

  const getUserInfo = async () => {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    const userInfo = await getUserDate(userData.user?.id!);
    return userInfo![0];
  };

  const {
    data: userData,
    error: userError,
    isFetched: userFetched
  } = useQuery({
    queryKey: ['getUserInfo'],
    queryFn: getUserInfo
  });

  if (!userFetched) {
    return null;
  }

  if (userData && productData) {
    return (
      <div>
        <h1>주문/결제</h1>
        <section>
          <UserEditForm
            initialAddress={userData.address}
            initialDetailAddress={userData.address_detail}
            initialAddressCode={userData.address_code}
            initialUserName={userData.user_name}
            initialPhone={userData.phone}
            userId={userData.user_id}
          />
          <div className="flex flex-col">
            <div>
              <label htmlFor="phone">휴대폰번호</label>
              <input
                className="w-20"
                type="text"
                id="phone"
                defaultValue={userData.phone.split('-')[0]}
                maxLength={3}
              />
              <span>-</span>
              <input
                type="text"
                id="phone"
                defaultValue={userData.phone.split('-')[1]}
                maxLength={4}
              />
              <span>-</span>
              <input
                type="text"
                id="phone"
                defaultValue={userData.phone.split('-')[2]}
                maxLength={4}
              />
              <label htmlFor=""></label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="email">이메일</label>
              <input type="text" id="email" defaultValue={userData.email} />
              <select name="" id="">
                <option value="">gmail.com</option>
                <option value="">naver.com</option>
                <option value="">hanmail.net</option>
              </select>
            </div>
            <div>
              <input type="checkbox" id="default" />
              <label htmlFor="default">기본 배송지로 저장</label>
            </div>
          </div>
        </section>
        <section>
          <h2>주문상품 1개</h2>
          <div>
            <div className="flex">
              {productData?.combinedData?.map((product) => {
                return (
                  <div key={product.product_id}>
                    <Image
                      src={product.thumbnail_url}
                      alt={product.title}
                      width={150}
                      height={150}
                    />
                    <div>
                      <p>{product.title}</p>
                      <p>{product.price * product.quantity}원</p>
                      <p>{product.quantity}개</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <span>배송비</span>
              <span>무료</span>
            </div>
          </div>
        </section>
        <section>
          <h2>결제정보</h2>
          <div>
            <span>총 상품 금액</span>
            <span>{productData?.totalCost}원</span>
          </div>
          <div>
            <span>배송비</span>
            <span>무료</span>
          </div>
          <div>
            <span>최종 결제 금액</span>
            <span>{productData?.totalCost}원</span>
          </div>
        </section>
        <section>
          <h2>결제수단</h2>
          <p>결제수단 선택</p>
          <div>카카오 페이</div>
        </section>
        <button onClick={() => paymentHandler(productData as ProductInfo)}>결제하기</button>
      </div>
    );
  }
}

// 상품id,수량 을 쿼리로 주고받는 방식

// 1. 상세페이지에서 router.push(클라이언트 컴포넌트)
// router.push(`/payment?productId=${productId}&quantity=${quantity}`);

// 2. 상세페이지에서 Link(서버컴포넌트)
//  const url = `/payment?productId=${productId}&quantity=${quantity}`;
// return (
//   <div>
//     <h1>Home Page</h1>
//     {/* 클라이언트 측에서 이 URL을 사용하여 페이지를 이동시킵니다 */}
//     <Link href={url}>Go to Payment</Link>
//   </div>
// );

// -> 둘 중 택1

// 받는곳 - 결제페이지
// const quantity = searchParams.get('productId'); // 쿼리 문자열 파라미터 - 상품id 캐치
// const quantity = searchParams.get('quantity'); // 쿼리 문자열 파라미터 - 수량 캐치
