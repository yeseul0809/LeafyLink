'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/supabase/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getUserDate } from '../actions';
import UserEditForm from './AddressForm';
import paymentHandler from '../payment';

interface Product {
  productId: string;
  quantity: number;
}

export interface CombinedProductData {
  product_id: string;
  product_seller_id: string;
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

  const [isOrderAble, setIsOrderAble] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(userData && userData.phone);
  const [phoneParts, setPhoneParts] = useState([
    userData?.phone.slice(0, 3) || '',
    userData?.phone.slice(3, 7) || '',
    userData?.phone.slice(7) || ''
  ]);

  const [restAddress, setRestAddress] = useState(userData && userData.address_detail);

  let products: Product[] = [];
  const searchParams = useSearchParams();
  const dataString = searchParams.get('data');
  const productId = searchParams.get('productId');
  const quantity = searchParams.get('quantity');

  useEffect(() => {
    if (userData) {
      setPhoneNumber(userData.phone);
      setPhoneParts([
        userData.phone.slice(0, 3),
        userData.phone.slice(3, 7),
        userData.phone.slice(7)
      ]);
    }
  }, [userData]);

  const saveRestData = async () => {
    const supabase = createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('User')
      .update({
        address_detail: restAddress,
        phone: phoneNumber
      })
      .eq('user_id', userData!.user!.id);
  };

  const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    let newPhoneParts = [...phoneParts];

    switch (id) {
      case 'phone1':
        newPhoneParts[0] = value.slice(0, 3);
        break;
      case 'phone2':
        newPhoneParts[1] = value.slice(0, 4);
        break;
      case 'phone3':
        newPhoneParts[2] = value.slice(0, 4);
        break;
      default:
        break;
    }

    setPhoneParts(newPhoneParts);
    setPhoneNumber(newPhoneParts.join(''));
  };

  const handleOrderAble = () => {
    setIsOrderAble((prev) => !prev);
  };

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

  if (!userFetched) {
    return null;
  }

  if (userData && productData) {
    return (
      <div className="pt-[80px] pb-[180px] xs:pt-[62px] xs:pb-[45px]">
        <h1 className="text-[32px] font-semibold text-center">주문/결제</h1>
        <p className="mt-[32px] mb-[20px]">주문자</p>
        <form action="" className="flex items-center gap-[8px] xs:mt-[16px]">
          <input type="radio" id="sameaddress" defaultChecked className="w-[20px] h-[20px]" />
          <label htmlFor="sameaddress">회원 정보와 동일</label>
        </form>
        <section className="mt-[16px]">
          <UserEditForm
            initialAddress={userData.address}
            initialDetailAddress={userData.address_detail}
            initialAddressCode={userData.address_code}
            initialUserName={userData.user_name}
            initialPhone={userData.phone}
            userId={userData.user_id}
          />
          <div className="flex flex-col">
            <div className="flex">
              <label
                htmlFor="phone"
                className="xs:mb-[8px] xs:mt-[16px] mr-[48px] w-[80px] xs:w-0 xs:mr-0"
              ></label>
              <input
                type="text"
                placeholder="나머지 상세주소"
                className="border p-3 mb-3 rounded w-full xs:ml-0"
                defaultValue={userData.address_detail}
                onChange={(e) => setRestAddress(e.target.value)}
              />
            </div>
            <div className="h-[64px] flex xs:flex-col xs:mb-[16px]">
              <label htmlFor="phone" className="w-20 mr-[38px] xs:mb-[8px] xs:mt-[16px]">
                휴대폰번호
              </label>
              <div>
                <input
                  className="border p-3 mb-3 rounded w-1/4"
                  type="text"
                  id="phone1"
                  defaultValue={userData.phone.slice(0, 3)}
                  maxLength={3}
                  onChange={handlePhoneNumber}
                />
                <span className="mx-2">-</span>
                <input
                  className="border p-3 mb-3 rounded w-1/4"
                  type="text"
                  id="phone2"
                  defaultValue={userData.phone.slice(3, 7)}
                  maxLength={4}
                  onChange={handlePhoneNumber}
                />
                <span className="mx-2">-</span>
                <input
                  className="border p-3 mb-3 rounded w-1/4"
                  type="text"
                  id="phone3"
                  defaultValue={userData.phone.slice(7)}
                  maxLength={4}
                  onChange={handlePhoneNumber}
                />
              </div>
            </div>
            <div className="flex xs:flex-col xs:mt-[42px] xs:gap-[8px]">
              <label htmlFor="email" className="mr-[44px] w-[80px]">
                이메일
              </label>
              <input
                type="text"
                id="email"
                defaultValue={userData.email}
                className="border p-3 mb-3 rounded w-full h-[54px]"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="saveData">기본 배송지 정보로 저장</label>
              <input
                type="checkbox"
                id="saveData"
                className="green-checkbox"
                defaultChecked={false}
                onChange={saveRestData}
              />
            </div>
          </div>
          <div className="border-t w-full my-10" />
        </section>
        <section>
          <h2 className="text-[20px] font-semibold">
            주문상품 {productData.combinedData.length}개
          </h2>
          <div>
            <div className="flex flex-col">
              {productData?.combinedData?.map((product) => {
                return (
                  <div
                    key={product.product_id}
                    className="flex gap-6 items-center border-b w-full py-10"
                  >
                    <Image
                      src={product.thumbnail_url}
                      alt={product.title}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                    <div>
                      <p>{product.title}</p>
                      <div className="flex mt-4">
                        <span className="text-[18px] font-semibold">
                          {(product.price * product.quantity).toLocaleString()}
                        </span>
                        <span className="ml-1 text-[18px]">원</span>
                        <div className="border-l mx-4" />
                        <p>{product.quantity}개</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="mt-6">
          <h2 className="text-[20px] font-semibold">결제정보</h2>
          <div className="flex justify-between mt-4">
            <span>총 상품 금액</span>
            <span>{productData?.totalCost.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>배송비</span>
            <span>무료</span>
          </div>
          <div className="flex justify-between text-[20px] font-semibold">
            <span>최종 결제 금액</span>
            <span>{productData?.totalCost.toLocaleString()}원</span>
          </div>
        </section>
        <div className="w-full border-b my-6" />
        <section>
          <h2 className="text-[20px] font-semibold mb-4">결제수단</h2>
          <p className="mb-4">결제수단 선택</p>
          <div className="border border-[#787878] w-[400px] h-[48px] rounded-md flex items-center gap-2 justify-center xs:w-full">
            <Image
              src="/icons/kakaotalk.png"
              alt="kakaotalk"
              width={20}
              height={20}
              quality={100}
            />
            <p>카카오 페이</p>
          </div>
        </section>
        <div className="border-b w-full my-10" />
        <div className="mb-10 flex items-center gap-2">
          <input
            type="checkbox"
            id="agreement"
            className="green-checkbox"
            onChange={handleOrderAble}
          />
          <label htmlFor="agreement" className="text-[15px]">
            주문 내용을 확인하였으며 약관에 동의합니다.
          </label>
        </div>
        <button
          onClick={() => paymentHandler(productData as ProductInfo, userData.user_id)}
          className={`w-full ${!isOrderAble === false ? 'bg-[#3BB873]' : 'bg-primary-green-100'}  rounded-md h-[48px] text-white`}
          disabled={!isOrderAble}
        >
          {productData?.totalCost.toLocaleString()}원 결제하기
        </button>
      </div>
    );
  }
}
