'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import paymentHandler from './payment';
import supabaseSever from '@/supabase/supabaseServer';
import UserEditForm from './_components/AddressForm';
import { getUserDate } from './actions';
import supabase from '@/supabase/supabaseClient';
import { useQuery } from '@tanstack/react-query';

export default function PaymentPage() {
  const url = new URL(window.location.href);
  // console.log('url::', url);

  const searchParams = new URLSearchParams(url.search);
  // console.log('searchParams::', searchParams);

  const productId = searchParams.get('productId');
  // console.log('productId::', productId);

  const quantity = searchParams.get('quantity');
  // console.log('quantity::', quantity);

  const getProductInfo = async () => {
    const { data: productData, error } = await supabase
      .from('Product')
      .select()
      .eq('product_id', productId!);
    return productData;
  };

  const {
    data: productData,
    error: productError,
    isFetched: productFeched
  } = useQuery({
    queryKey: ['getProductInfo'],
    queryFn: getProductInfo
  });
  console.log('productData::', productData);

  const getUserInfo = async () => {
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

  // const { data: productData } = await supabaseSever
  //   .from('Product')
  //   .select()
  //   .eq('product_id', '0a1ace37-0c0b-41c7-a09b-54a19ded6c9c');
  // let product;
  // if (productData) {
  //   product = productData[0];
  // }

  // let UserEditFormProps = {};
  // if (userInfo) {
  //   UserEditFormProps = {
  //     initialAddress: userInfo[0].address,
  //     initialDetailAddress: userInfo[0].address_detail,
  //     initialAddressCode: userInfo[0].address_code,
  //     initialUserName: userInfo[0].user_name,
  //     initialPhone: userInfo[0].phone,
  //     userId: userInfo[0].user_id
  //   };
  // }

  // const phoneNumber = userInfo![0].phone;

  if (!userFetched) {
    return null;
  }

  if (userData) {
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
              {/* <Image
               // src={`${product?.thumbnail_url}`}
               alt="테스트이미지"
               width={150}
               height={150}
             /> */}
              <div>
                {/* <p>{product?.title}</p> */}
                {/* <p>{product?.price}원</p> */}
              </div>
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
            <span>99,999원</span>
          </div>
          <div>
            <span>배송비</span>
            <span>무료</span>
          </div>
          <div>
            <span>최종 결제 금액</span>
            <span>99,999원</span>
          </div>
        </section>
        <section>
          <h2>결제수단</h2>
          <p>결제수단 선택</p>
          <div>카카오 페이</div>
        </section>
        <button onClick={paymentHandler}>결제하기</button>
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
