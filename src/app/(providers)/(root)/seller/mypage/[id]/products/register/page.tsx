'use client';

import React, { useState } from 'react';
import QuillEditor from './_components/QuillEditor';
import { INITIAL_STATE } from './_utils/constants';
import InputField from './_components/InputField';
import { ProductState } from './types/product';
import handleSubmit from './_utils/handleSubmit';

function ProductRegisterPage() {
  const [state, setState] = useState<ProductState>(INITIAL_STATE);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setState((prev) => ({ ...prev, thumbnail: file }));
    }
  };

  const handleDescriptionChange = (content: string) => {
    setState((prev) => ({ ...prev, description: content }));
  };

  const handleInputSubmit = async () => {
    await handleSubmit({ state, setState });
    setState(INITIAL_STATE);
    setImagePreview(null);
  };

  return (
    <div className="container mx-auto p-6 flex flex-col">
      <h1 className="text-3xl text-center font-bold my-6">상품 등록</h1>
      <div className="flex justify-end mb-2">
        <button className="px-4 py-2 bg-black text-white rounded-md" onClick={handleInputSubmit}>
          등록하기
        </button>
      </div>
      <div className="grid grid-cols-6 gap-6">
        <section className="col-span-2 border p-4 rounded-md">
          <h2 className="text-xl text-center font-semibold mb-4">상품 설정</h2>

          <div className="mb-4">
            <label className="block font-semibold mb-1" htmlFor="category">
              카테고리
            </label>
            <select
              name="category"
              value={state.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
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
            id="name"
            name="name"
            value={state.name}
            onChange={handleChange}
            placeholder="상품명을 입력해주세요"
            labelText="이름"
          />

          <InputField
            type="number"
            id="price"
            name="price"
            value={state.price}
            onChange={handleChange}
            placeholder="원"
            labelText="정가"
          />

          <div className="mb-4">
            <label className="block font-semibold mb-1" htmlFor="image">
              대표 이미지
            </label>
            <div className="w-full h-48 flex flex-col items-center justify-center border-dashed border-2 rounded-md">
              <input type="file" className="text-gray-400" onChange={handleThumbnailChange} />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="썸네일 미리보기"
                  className="mt-2 max-h-full max-w-full"
                />
              )}
            </div>
          </div>

          <InputField
            type="number"
            id="stock"
            name="stock"
            value={state.stock}
            onChange={handleChange}
            placeholder="개"
            labelText="수량"
          />
        </section>

        <section className="col-span-4 border p-4 rounded-md">
          <h2 className="text-xl text-center font-semibold mb-4">상세 설명</h2>
          <QuillEditor value={state.description} onChange={handleDescriptionChange} />
        </section>
      </div>
    </div>
  );
}

export default ProductRegisterPage;
