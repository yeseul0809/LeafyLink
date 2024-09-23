'use client';

import { createClient } from '@/supabase/supabaseClient';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EVENT_INITIAL_STATE } from '../_utils/constants';
import { Event } from '@/types/event';
import handleEventSubmit from '../_utils/handleEventSubmit';
import EventInputField from './EventInputField';
import {
  fetchDiscountedProducts,
  getEventRequest
} from '@/app/(providers)/(root)/event/_actions/eventActions';
import EventQuillEditor from './EventQuillEditor';
import { handleEventValidateForm } from '../_utils/handleEventValidateForm';
import { Product } from '@/types/product';

const supabase = createClient();

function EventForm() {
  const [state, setState] = useState<Event | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [discountProductList, setDiscountProductList] = useState<Product[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]); // 선택된 상품들 저장
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // 드롭다운 토글 상태

  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const isRegisterMode = pathname.includes('eventregister');
  const sellerId = isRegisterMode ? params.id : '';
  const eventId = isRegisterMode ? null : params.id;
  const isEditMode = Boolean(eventId);

  useEffect(() => {
    const fetchEvent = async () => {
      if (isEditMode && eventId) {
        // 수정 모드: 기존 데이터를 불러옴
        const id = Array.isArray(eventId) ? eventId[0] : eventId;

        try {
          const event = await getEventRequest(id);
          if (event) {
            setState(event);
            setThumbnailPreview(event.thumbnail_url);
          } else {
            setState(null);
          }
        } catch (error) {
          console.error('해당 이벤트를 찾을 수 없습니다.', error);
          setState(null);
        }
      } else {
        // 등록 모드: 초기 상태로 설정
        setState(EVENT_INITIAL_STATE);
      }
    };

    fetchEvent();
  }, [isEditMode, eventId]);

  // 유효성 검사
  useEffect(() => {
    setIsFormValid(handleEventValidateForm(state));
  }, [state, thumbnailPreview]);

  useEffect(() => {
    const fetchDiscountedList = async () => {
      if (state?.category === '할인' && sellerId) {
        const id = Array.isArray(sellerId) ? sellerId[0] : sellerId;
        const discountedProducts = await fetchDiscountedProducts(id);
        setDiscountProductList(discountedProducts);
      } else {
        setDiscountProductList([]);
      }
    };

    fetchDiscountedList();
  }, [state?.category, sellerId]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => prev && { ...prev, [name]: value });
  };

  const handleDescriptionChange = (content: string) => {
    setState((prev) => prev && { ...prev, description: content });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
      setState((prev) => prev && { ...prev, eventThumbnail: file });
    }
  };

  // 상품 선택 핸들러 (커스텀 드롭다운 사용)
  const handleProductSelect = (product: Product) => {
    if (!relatedProducts.includes(product)) {
      setRelatedProducts([...relatedProducts, product]);
    }
    setIsDropdownOpen(false); // 드롭다운 닫기
  };

  const handleRemoveProduct = (productId: string) => {
    setRelatedProducts((prevProducts) =>
      prevProducts.filter((product) => product.product_id !== productId)
    );
  };

  const handleInputSubmit = async () => {
    if (!state) return;
    setIsLoading(true);

    if (isEditMode && eventId) {
      // 수정 모드
      const { error } = await supabase.from('Event').update(state).eq('event_id', eventId);
      if (error) {
        console.error('이벤트 데이터 수정 중 에러 발생:', error);
      } else {
        router.push('/seller/mypage/events');
      }
    } else {
      // 등록 모드
      const id = Array.isArray(sellerId) ? sellerId[0] : sellerId;
      await handleEventSubmit({
        state,
        id,
        relatedProducts: relatedProducts.map((p) => p.product_id)
      });
      setState(EVENT_INITIAL_STATE);
      setThumbnailPreview(null);
      router.push('/seller/mypage/events');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col pb-[180px]">
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-white">
          <Image src="/loading.gif" alt="로딩이미지" width={463} height={124} />
        </div>
      )}

      <div className="flex justify-end">
        <button
          className={`w-[66px] h-[30px] md:w-[80px] md:h-[44px] text-[14px] px-2 md:px-3 md:py-3 mb-3 rounded-md text-white 
      ${isFormValid ? 'bg-primary-green-500 hover:bg-primary-green-700' : 'bg-grayscale-gray-200 cursor-not-allowed'}`}
          onClick={handleInputSubmit}
          disabled={!isFormValid}
        >
          {isEditMode ? '수정하기' : '등록하기'}
        </button>
      </div>

      <div className="flex">
        <section className="flex-shrink border h-[1024px] w-[295px]">
          <h2 className="text-sm text-center font-semibold border-b py-4 mb-4">이벤트 설정</h2>
          <div className="flex justify-end p-3 text-[14px]">
            <span className="text-red-500 pr-1">*</span>
            <span>필수입력사항</span>
          </div>

          <EventInputField
            type="text"
            id="title"
            name="title"
            value={state?.title || ''}
            onChange={handleChange}
            placeholder="이벤트 타이틀을 입력하세요."
            labelText="이벤트 타이틀"
          />
          <EventInputField
            type="datetime-local"
            id="event_starttime"
            name="event_starttime"
            value={state?.event_starttime || ''}
            onChange={handleChange}
            placeholder="시작 날과 시간을 입력해주세요."
            labelText="이벤트 시작 날짜"
          />

          <EventInputField
            type="datetime-local"
            id="event_endtime"
            name="event_endtime"
            value={state?.event_endtime || ''}
            onChange={handleChange}
            placeholder="종료 날과 시간을 입력해주세요."
            labelText="이벤트 종료 날짜"
          />

          <div className="p-3 text-[14px]">
            <div className="flex">
              <span className="text-red-500 pr-1">*</span>
              <label className="text-[14px] block mb-3" htmlFor="category">
                카테고리
              </label>
            </div>
            <select
              name="category"
              value={state?.category || ''}
              onChange={handleChange}
              className="w-[271px] h-[44px] px-3 border text-font/sub2 text-right"
            >
              <option value="" disabled>
                카테고리를 선택하세요
              </option>
              <option value="증정">증정</option>
              <option value="할인">할인</option>
            </select>
          </div>

          {/* 커스텀 드롭다운 */}
          <div className="px-3 pt-3 text-[14px]">
            <label className="text-[14px] block mb-3">상품 선택</label>
            <div
              className="px-4 py-3 flex align-middle justify-end w-[271px] h-[44px] border text-font/sub2 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-sm pr-3">상품을 선택하세요</span>
              <Image
                src={isDropdownOpen ? '/icons/up.svg' : '/icons/down.svg'}
                alt={isDropdownOpen ? '업 이미지' : '다운 이미지'}
                className="flex-shrink-0"
                width={16}
                height={16}
              />
            </div>
            {isDropdownOpen && (
              <ul className="border border-gray-300 bg-white max-h-60 overflow-y-auto">
                {discountProductList.map((product) => (
                  <li
                    key={product.product_id}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleProductSelect(product)}
                  >
                    <Image
                      src={product.thumbnail_url}
                      alt={product.title}
                      width={40}
                      height={40}
                      className="mr-2"
                    />
                    <div className="flex flex-col">
                      <span className="text-[13px]">{product.title}</span>
                      <span className="text-[13px] font-semibold">{product.sale_price}원</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 선택된 상품 표시 */}
          <div className="p-3">
            {relatedProducts.map((product) => (
              <div
                key={product.product_id}
                className="selected-product flex items-center p-3 border-b border-gray-300"
              >
                <div className="product-info">
                  <p className="text-[13px]">{product.title}</p>
                  <p className="text-[13px] font-semibold">{product.sale_price}원</p>
                </div>
                <button className="ml-auto" onClick={() => handleRemoveProduct(product.product_id)}>
                  <Image
                    src="/icons/icon-close.svg"
                    alt="삭제"
                    className="flex-shrink-0"
                    width={12}
                    height={12}
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="p-3">
            <div className="flex">
              <span className="text-red-500 pr-1">*</span>
              <p className="text-[14px] mb-2">대표이미지</p>
            </div>
            <label className="pt-[3px] mb-[15px] cursor-pointer w-[60px] h-[24px] border border-primary-green-500 text-primary-green-500 text-[12px] text-center rounded-[4px] inline-block">
              파일 선택
              <input type="file" className="hidden" onChange={handleThumbnailChange} />
            </label>
            <div className="w-[271px] h-[152px] mb-6 flex flex-col text-[13px] text-font/sub2 items-center justify-center border relative overflow-hidden">
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="썸네일 미리보기"
                  className="p-1 absolute inset-0 max-h-full max-w-full object-contain"
                />
              )}
              {!thumbnailPreview && (
                <>
                  <p>썸네일을 등록해주세요.</p>
                  <p>권장 비율 1:1 (정사각형)</p>
                </>
              )}
            </div>
          </div>

          <EventInputField
            type="text"
            id="summary"
            name="summary"
            value={state?.summary || ''}
            onChange={handleChange}
            placeholder="이벤트에 대한 간단한 설명을 입력하세요"
            labelText="이벤트 한줄 설명"
          />
        </section>

        <section className="flex-1 h-[1024px] border">
          <h2 className="text-sm text-center border-b font-semibold py-4 mb-4">이벤트 상세</h2>
          <EventQuillEditor value={state?.description || ''} onChange={handleDescriptionChange} />
        </section>
      </div>
    </div>
  );
}

export default EventForm;
