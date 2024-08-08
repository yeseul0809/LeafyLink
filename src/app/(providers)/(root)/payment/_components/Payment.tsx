'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { getUserDate, updateUserData } from '../actions';
import UserEditForm from './AddressForm';
import paymentHandler from '../payment';
import { createClient } from '@/supabase/supabaseClient';

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
  business_name: string;
}

export interface ProductInfo {
  combinedData: CombinedProductData[];
  totalCost: number;
  cart: boolean;
}

const getUserInfo = async () => {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const userInfo = await getUserDate(userData.user?.id!);
  return userInfo![0];
};

export default function PaymentPage() {
  const [isOrderAble, setIsOrderAble] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneParts, setPhoneParts] = useState(['', '', '']);
  const [phoneError, setPhoneError] = useState(['', '', '']);
  const [restAddress, setRestAddress] = useState('');
  const [isFormCheck, setIsFormCheck] = useState<boolean>(true);
  const [isFormAlldone, setIsFormAlldone] = useState(false);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [formError, setFormError] = useState('');

  const {
    data: userData,
    error: userError,
    isFetched: userFetched
  } = useQuery({
    queryKey: ['getUserInfo'],
    queryFn: getUserInfo
  });

  let products: Product[] = [];
  const searchParams = useSearchParams();
  const dataString = searchParams.get('data');
  const productId = searchParams.get('productId');
  const quantity = searchParams.get('quantity');
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      setPhoneNumber(userData.phone);
      setPhoneParts([
        userData.phone.slice(0, 3),
        userData.phone.slice(3, 7),
        userData.phone.slice(7)
      ]);
      setRestAddress(userData.address_detail || '');
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
    let newPhoneError = [...phoneError];

    switch (id) {
      case 'phone1':
        newPhoneParts[0] = value.slice(0, 3);
        newPhoneError[0] = value.length < 3 ? '최소 3글자를 입력하세요.' : '';
        break;
      case 'phone2':
        newPhoneParts[1] = value.slice(0, 4);
        newPhoneError[1] = value.length < 4 ? '최소 4글자를 입력하세요.' : '';

        break;
      case 'phone3':
        newPhoneParts[2] = value.slice(0, 4);
        newPhoneError[2] = value.length < 4 ? '최소 4글자를 입력하세요.' : '';
        break;
      default:
        break;
    }

    setPhoneParts(newPhoneParts);
    setPhoneNumber(newPhoneParts.join(''));
    setPhoneError(newPhoneError);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let newPhoneError = [...phoneError];

    switch (id) {
      case 'phone1':
        newPhoneError[0] = value.length < 3 ? '최소 3글자를 입력하세요.' : '';
        break;
      case 'phone2':
        newPhoneError[1] = value.length < 4 ? '최소 4글자를 입력하세요.' : '';
        break;
      case 'phone3':
        newPhoneError[2] = value.length < 4 ? '최소 4글자를 입력하세요.' : '';
        break;
      default:
        break;
    }

    setPhoneError(newPhoneError);
  };

  useEffect(() => {
    if (isFormCheck && restAddress && phoneNumber) {
      setIsFormAlldone(true);
    } else {
      setIsFormAlldone(false);
    }
  }, [isFormCheck, restAddress, phoneNumber]);

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

    // Step 2: Extract seller IDs from product data
    const sellerIds = productData.map((product) => product.product_seller_id);

    // Step 3: Fetch seller data
    const { data: sellerData, error: sellerError } = await supabase
      .from('Seller')
      .select('seller_id, business_name')
      .in('seller_id', sellerIds);

    if (sellerError) {
      console.error('Error fetching seller data:', sellerError);
      return null;
    }

    // Step 4: Combine product data with seller data
    const combinedData = productData.map((product) => {
      const matchingProduct = products.find((p) => p.productId === product.product_id);
      const matchingSeller = sellerData.find(
        (seller) => seller.seller_id === product.product_seller_id
      );
      return {
        ...product,
        quantity: matchingProduct ? matchingProduct.quantity : 0,
        business_name: matchingSeller ? matchingSeller.business_name : 'Unknown'
      };
    });

    // const combinedData = productData.map((product) => {
    //   const matchingProduct = products.find((p) => p.productId === product.product_id);
    //   return {
    //     ...product,
    //     quantity: matchingProduct ? matchingProduct.quantity : 0
    //   };
    // });

    const totalCost = combinedData.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    return { combinedData, totalCost, cart: !!dataString };
  };

  const handleFormCheckChange = (isFormCheck: boolean) => {
    setIsFormCheck(isFormCheck);
  };

  const {
    data: productData,
    error: productError,
    isFetched: productFetched
  } = useQuery({
    queryKey: ['getProductInfo'],
    queryFn: getProductInfo
  });

  const handleAgreementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreementChecked(event.target.checked);
  };

  useEffect(() => {
    setIsOrderAble(
      isFormAlldone && isAgreementChecked && phoneError.every((error) => error === '')
    );
  }, [isFormAlldone, isAgreementChecked, phoneError]);

  const queryClient = useQueryClient();

  const updateCartCount = async (productData: any, userId: string) => {
    const supabase = createClient();
    for (const product of productData.combinedData) {
      if (product.quantity > product.stock) {
        const { error } = await supabase
          .from('Cart')
          .update({ count: product.stock })
          .eq('cart_product_id', product.product_id)
          .eq('cart_user_id', userData.user_id);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
    queryClient.invalidateQueries({ queryKey: ['getProductInfo'] });
  };

  console.log('productData::', productData);

  if (!userFetched) {
    return null;
  }

  if (userData && productData) {
    return (
      <div className="pt-[80px] pb-[180px] xs:pt-[62px] xs:pb-[45px] px-[20px]">
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
            onFormCheckChange={handleFormCheckChange}
          />
          <div className="flex flex-col">
            <div className="flex gap-[16px] xs:gap-0">
              <label
                htmlFor="phone"
                className="xs:mb-[8px] xs:mt-[16px] w-[120px] xs:w-0 xs:mr-0"
              ></label>
              <input
                type="text"
                placeholder="나머지 상세주소"
                className="border p-3 mb-3 rounded w-full"
                defaultValue={userData.address_detail}
                onChange={(e) => setRestAddress(e.target.value)}
              />
            </div>
            <div className="h-[50px] flex xs:flex-col xs:mb-[16px] w-full gap-[16px] xs:gap-0 mb-[18px]">
              <label htmlFor="phone" className="xs:mb-[8px] xs:mt-[16px] w-[120px]">
                휴대폰번호
              </label>
              <div className="w-full flex items-start">
                <div className="flex flex-col w-1/4">
                  <input
                    className="border p-3 rounded w-full"
                    type="text"
                    id="phone1"
                    defaultValue={userData.phone.slice(0, 3)}
                    maxLength={3}
                    onChange={handlePhoneNumber}
                    onBlur={handleBlur}
                  />
                  {phoneError[0] && <p className="text-red-500 text-[14px]">{phoneError[0]}</p>}
                </div>
                <span className="mx-2 self-center">-</span>
                <div className="flex flex-col w-1/4">
                  <input
                    className="border p-3 rounded w-full"
                    type="text"
                    id="phone2"
                    defaultValue={userData.phone.slice(3, 7)}
                    maxLength={4}
                    onChange={handlePhoneNumber}
                    onBlur={handleBlur}
                  />
                  {phoneError[1] && <p className="text-red-500 text-[14px]">{phoneError[1]}</p>}
                </div>
                <span className="mx-2 self-center">-</span>
                <div className="flex flex-col w-1/4">
                  <input
                    className="border p-3 rounded w-full"
                    type="text"
                    id="phone3"
                    defaultValue={userData.phone.slice(7)}
                    maxLength={4}
                    onChange={handlePhoneNumber}
                    onBlur={handleBlur}
                  />
                  {phoneError[2] && <p className="text-red-500 text-[14px]">{phoneError[2]}</p>}
                </div>
              </div>
            </div>
            <div className="flex xs:flex-col xs:mt-[42px] xs:gap-0 gap-[16px]">
              <label htmlFor="email" className="w-[120px] xs:mb-[8px]">
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
              <input
                type="checkbox"
                id="saveData"
                className="green-checkbox"
                defaultChecked={false}
                onChange={saveRestData}
              />
              <label htmlFor="saveData">기본 배송지로 저장</label>
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
                    <div className="w-[150px] h-[150px] relative">
                      <Image
                        src={product.thumbnail_url}
                        alt={product.title}
                        fill
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="mb-[8px] font-semibold">{product.business_name}</p>
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
          <div className="border border-[#787878] w-[400px] h-[48px] rounded-md flex items-center gap-2 justify-center max_sm:w-full xs:w-full">
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
        <section>
          <div className="mb-10 flex items-center gap-2">
            <input
              type="checkbox"
              id="agreement"
              className="green-checkbox"
              checked={isAgreementChecked}
              onChange={handleAgreementChange}
            />
            <label htmlFor="agreement" className="text-[15px]">
              주문 내용을 확인하였으며 약관에 동의합니다.
            </label>
          </div>
          {formError && <p className="text-red-500">{formError}</p>}
          <button
            onClick={async () => {
              const exceedsStock = productData.combinedData.some(
                (product) => product.quantity > product.stock
              );

              if (!isOrderAble) {
                setFormError('모든 필드를 올바르게 입력해 주세요.');
                return;
              } else if (exceedsStock) {
                setFormError(
                  `재고가 부족한 상품이 존재합니다. 구매 수량을 재고 수량으로 수정했습니다.`
                );
                await updateCartCount(productData, userData.user_id);
                router.push('/cart');
                return;
              }
              setFormError('');
              await updateUserData(userData.user_id, restAddress, phoneNumber);
              paymentHandler(productData as ProductInfo, userData.user_id);
            }}
            className={`w-full ${isOrderAble ? 'bg-[#3BB873]' : 'bg-primary-green-100'} rounded-md h-[48px] text-white`}
          >
            {productData?.totalCost.toLocaleString()}원 결제하기
          </button>
        </section>
      </div>
    );
  }
}
