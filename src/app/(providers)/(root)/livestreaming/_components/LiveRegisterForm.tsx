'use client';

import React from 'react';
import SelectDropdown from './SelectDropdown';
import { useFormState } from 'react-dom';
import { startLiveStreaming } from '../actions';

function LiveRegisterForm() {
  const [state, formAction] = useFormState(startLiveStreaming, null);
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
        />
      </div>
      <div className="flex">
        <div>
          <label htmlFor="thumbnail" className="cursor-pointer">
            대표 이미지 등록
          </label>
          <input type="file" id="thumbnail" name="thumbnail" className="hidden" />
        </div>
        <div>
          <p>- 최대 용량: 2MB</p>
          <p>썸네일을 등록해주세요.</p>
          <p>글자가 포함되지 않은 이미지를 사용해주세요.</p>
        </div>
      </div>
      <div>
        <label htmlFor="productTitle">소개할 상품</label>
        <input
          type="text"
          id="productTitle"
          name="productTitle"
          placeholder="상품 URL을 입력해서 상품을 등록하세요."
          className="w-[40%] h-10 border"
        />
      </div>
      <div className="flex">
        <label htmlFor="category">카테고리</label>
        <SelectDropdown />
      </div>
      <div>
        <label htmlFor="description">라이브 한줄 설명</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="라이브에 대한 간단한 설명을 입력하세요."
          className="w-[40%] h-10 border"
        />
      </div>
      <button type="submit">라이브 시작하기</button>
    </form>
  );
}

export default LiveRegisterForm;
