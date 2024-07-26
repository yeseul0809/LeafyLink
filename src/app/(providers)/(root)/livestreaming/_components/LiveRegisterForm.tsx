'use client';

import React, { useState } from 'react';
import SelectDropdown from './SelectDropdown';
import { useFormState } from 'react-dom';
import { startLiveStreaming } from '../actions';

function LiveRegisterForm() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [preview, setPreview] = useState('');
  const [state, formAction] = useFormState(startLiveStreaming, null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files }
    } = event;

    if (!files) return;
    const file = files[0];

    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (file) {
      if (!validImageTypes.includes(file.type)) {
        alert('jpeg,jpg,png,gif 이미지 파일만 업로드 가능합니다');
        event.target.value = '';
        return;
      }

      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        alert('파일 크기는 2MB 이하이어야 합니다');
        event.target.value = '';
        return;
      }

      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview('');
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <form action={formAction}>
      <div>
        <label htmlFor="liveTitle">라이브 타이틀</label>
        <input
          type="text"
          id="liveTitle"
          name="liveTitle"
          placeholder="라이브 타이틀을 입력하세요 (최대 20글자)"
          className="w-[40%] h-10 border"
          maxLength={20}
          required
        />
      </div>
      <div className="flex">
        <div className="flex">
          <div>대표 이미지 등록</div>
          <div>
            <label
              htmlFor="thumbnail"
              className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
              style={{
                backgroundImage: `url(${preview})`,
                width: '128px',
                height: '128px'
              }}
            >
              {preview === '' && (
                <>
                  <div className="text-neutral-400 text-sm">대표 이미지</div>
                </>
              )}
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              className="hidden"
              required
              onChange={handleImageChange}
              accept="image/jpeg, image/png, image/jpg"
            />
          </div>
        </div>
        <div>
          <p>- 최대 용량: 2MB</p>
          <p>썸네일을 등록해주세요.</p>
          <p>jpg,jpeg,png 파일형식만 등록가능합니다.</p>
          <p>글자가 포함되지 않은 이미지를 사용해주세요.</p>
        </div>
      </div>
      <div>
        <label htmlFor="product">소개할 상품</label>
        <input
          type="text"
          id="product"
          name="product"
          placeholder="상품 URL을 입력해서 상품을 등록하세요."
          className="w-[40%] h-10 border"
          required
        />
      </div>
      <div className="flex">
        <label htmlFor="category">카테고리</label>
        <SelectDropdown onCategoryChange={handleCategoryChange} />
      </div>
      <div>
        <label htmlFor="description">라이브 한줄 설명</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="라이브에 대한 간단한 설명을 입력하세요."
          className="w-[40%] h-10 border"
          required
        />
      </div>
      <input type="hidden" name="category" value={selectedCategory || ''} />
      <button>라이브 시작하기</button>
    </form>
  );
}

export default LiveRegisterForm;
