'use client';

import React, { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { createClient } from '@/supabase/supabaseClient';
import InputField from '../../register/_components/InputField';
import QuillEditor from '../../register/_components/QuillEditor';
import { getProductRequest } from '@/app/(providers)/(root)/products/[id]/_actions/productActions';
import { INITIAL_STATE } from '../../register/_utils/constants';
import handleSubmit from '../../register/_utils/handleSubmit';
import useUser from '@/hooks/useUser';

const supabase = createClient();

function ProductForm() {
  const [state, setState] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const isRegisterMode = pathname.includes('register');
  const sellerId = isRegisterMode ? params.id : '';
  const productId = isRegisterMode ? null : params.id;
  const isEditMode = Boolean(productId);

  useEffect(() => {
    const fetchProduct = async () => {
      if (isEditMode && productId) {
        // 수정 모드: 기존 데이터를 불러옴
        try {
          const product = await getProductRequest(productId);
          if (product) {
            setState(product);
            setImagePreview(product.thumbnail_url);
          } else {
            setState(null); // 상품을 찾을 수 없는 경우 null로 설정
          }
        } catch (error) {
          console.error('해당 상품을 찾을 수 없습니다.', error);
          setState(null);
        }
      } else {
        // 등록 모드: 초기 상태로 설정
        setState(INITIAL_STATE);
      }
    };

    fetchProduct();
  }, [isEditMode, productId]);

  if (!state) {
    return isEditMode ? <p>해당 상품이 없습니다.</p> : null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => prev && { ...prev, [name]: value });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setState((prev) => prev && { ...prev, thumbnail: file });
    }
  };

  const handleDescriptionChange = (content: string) => {
    setState((prev) => prev && { ...prev, description: content });
  };

  const handleInputSubmit = async () => {
    if (!state) return;

    if (isEditMode && productId) {
      // 수정 모드
      const { error } = await supabase.from('Product').update(state).eq('product_id', productId);
      if (error) {
        console.error('상품 데이터 수정 중 에러 발생:', error);
      } else {
        router.push(`/products/${productId}`);
      }
    } else {
      // 등록 모드
      await handleSubmit({ state, sellerId });
      setState(INITIAL_STATE);
      setImagePreview(null);
      router.push('/seller/mypage/products');
    }
  };

  return (
    <div className="flex flex-col pb-[180px]">
      <div className="flex justify-end">
        <button
          className="w-[66px] h-[30px] md:w-[80px] md:h-[44px] text-[14px] px-2 md:px-3 md:py-3 mb-3 bg-primary-green-500 text-white rounded-md hover:bg-primary-green-700"
          onClick={handleInputSubmit}
        >
          {isEditMode ? '수정하기' : '등록하기'}
        </button>
      </div>

      <div className="flex">
        <section className="flex-shrink border h-[716px] w-[295px]">
          <h2 className="text-sm text-center font-semibold border-b py-4 mb-4">상품 설정</h2>

          <div className="mb-6 px-3 text-[14px]">
            <label className="text-[14px] block mt-6 mb-3" htmlFor="category">
              카테고리
            </label>
            <select
              name="category"
              value={state?.category || ''}
              onChange={handleChange}
              className="w-[271px] h-[44px] px-3 border text-font/sub2 text-right"
            >
              <option value="" disabled>
                카테고리를 선택하세요
              </option>
              <option value="씨앗">씨앗</option>
              <option value="모종">모종</option>
              <option value="재배키트">재배키트</option>
              <option value="흙,비료">흙,비료</option>
              <option value="원예용품">원예용품</option>
            </select>
          </div>

          <InputField
            type="text"
            id="title"
            name="title"
            value={state?.title || ''}
            onChange={handleChange}
            placeholder="상품명을 입력해주세요"
            labelText="상품명"
          />

          <InputField
            type="number"
            id="price"
            name="price"
            value={state?.price || ''}
            onChange={handleChange}
            placeholder="원"
            labelText="정가 (소비자가)"
          />

          <div className="mb-6 px-3">
            <p className="text-[14px] mt-6 mb-2">대표이미지</p>
            <label className="pt-[3px] mb-[15px] cursor-pointer w-[60px] h-[24px] border border-primary-green-500 text-primary-green-500 text-[12px] text-center rounded-[4px] inline-block">
              파일 선택
              <input type="file" className="hidden" onChange={handleThumbnailChange} />
            </label>
            <div className="w-[271px] h-[152px] mb-6 flex flex-col text-[13px] text-font/sub2 items-center justify-center border relative overflow-hidden">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="썸네일 미리보기"
                  className="p-1 absolute inset-0 max-h-full max-w-full object-contain"
                />
              )}
              {!imagePreview && (
                <>
                  <p>가로 900px 이상,</p>
                  <p>확대 기능 사용시 2000px 이상</p>
                </>
              )}
            </div>
          </div>

          <InputField
            type="number"
            id="stock"
            name="stock"
            value={state?.stock || ''}
            onChange={handleChange}
            placeholder="개"
            labelText="수량"
          />
        </section>

        <section className="flex-1 h-[716px] border">
          <h2 className="text-sm text-center border-b font-semibold py-4 mb-4">상세 설명</h2>
          <QuillEditor value={state?.description || ''} onChange={handleDescriptionChange} />
        </section>
      </div>
    </div>
  );
}

export default ProductForm;
