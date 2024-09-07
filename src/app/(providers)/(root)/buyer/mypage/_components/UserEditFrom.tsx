'use client';
import React, { useEffect, useRef } from 'react';
import PhoneForm from './PhoneForm';
import { createClient } from '@/supabase/supabaseClient';
import Image from 'next/image';
import { useFormState } from '@/stores/profilEditStore';
import usePostcode from '@/hooks/usePostcode';

declare global {
  interface Window {
    daum: any;
    foldDaumPostcode: () => void;
    sample3_execDaumPostcode: () => void;
  }
}

interface AddressData {
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
  userSelectedType: string;
  bname: string;
  buildingName: string;
  apartment: string;
}

interface UserEditFormProps {
  initialData: {
    address: string;
    detailAddress: string;
    addressCode: string;
    phone: string;
    userName: string;
    avatarUrl: string;
  };
  userId: string;
}

const UserEditForm = ({ initialData, userId }: UserEditFormProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const {
    addressForm,
    phone,
    userName,
    setAddress,
    setDetailAddress,
    setPostcode,
    setExtraAddress,
    setPhone,
    setUserName
  } = useFormState();

  const { address, detailAddress, postcode, extraAddress } = addressForm;
  usePostcode(setAddress, setPostcode, setExtraAddress, wrapRef);

  const supabase = createClient();

  useEffect(() => {
    setAddress(initialData.address);
    setDetailAddress(initialData.detailAddress);
    setPostcode(initialData.addressCode);
    setPhone(initialData.phone);
    setUserName(initialData.userName);
  }, [initialData]);

  const handleAddressUpdate = async (
    newAddress: string,
    newDetailAddress: string,
    newAddressCode: string,
    extraAddress: string
  ) => {
    const fullAddress = `${newAddress}${extraAddress}`;
    const { error } = await supabase
      .from('User')
      .update({
        address: fullAddress,
        address_detail: newDetailAddress,
        address_code: newAddressCode,
        user_name: userName,
        phone: phone
      })
      .eq('user_id', userId);
    if (error) {
      console.error('에러:', error);
    }
  };

  const handlePhoneChange = (newPhone: string) => {
    setPhone(newPhone);
  };

  const handleSave = () => {
    const fullAddress = `${address}${extraAddress}`;
    handleAddressUpdate(fullAddress, detailAddress, postcode, extraAddress);
    alert('회원정보가 저장되었습니다.');
  };

  const handleCancel = () => {
    setAddress(initialData.address);
    setPostcode(initialData.addressCode);
    setDetailAddress(initialData.detailAddress);
    setExtraAddress('');
    setPhone(initialData.phone);
    setUserName(initialData.userName);
    alert('변경 사항이 취소되었습니다.');
  };

  return (
    <>
      {/* 이미지 컨테이너 */}
      <div className="flex justify-center mb-8">
        <Image
          src={initialData.avatarUrl || '/default-useravatar.png'}
          width={86}
          height={86}
          alt="/default-avatar.png"
          className="w-[86px] h-[86px] rounded-full"
        />
      </div>
      {/* 이름 입력 필드 */}
      <label className="text-16-n-24-40 text-font/main s:text-14-n-20-35">이름</label>
      <input
        type="text"
        className="border border-Line/Regular bg-white w-full p-4 mb-6 mt-3 text-16-n-24-40 text-font/main"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      {/* 우편번호 입력 필드 */}
      <label className="text-16-n-24-40 text-font/main s:text-14-n-20-35">주소</label>
      <div>
        <input
          type="text"
          id="sample3_postcode"
          placeholder="우편번호"
          className="border border-Line/Regular w-[160px] p-4 mt-3 mb-3 text-16-n-24-40 text-font/main"
          value={postcode}
          readOnly
        />

        {/* 우편번호 찾기 버튼 */}
        <input
          type="button"
          onClick={() => window.sample3_execDaumPostcode()}
          value="주소검색"
          className="border border-primary-green-500 bg-white text-primary-green-500 ml-3 cursor-pointer rounded-lg text-center p-4 text-16-n-24-40 text-font/main"
        />
      </div>
      {/* 주소 검색 컨테이너 */}
      <div
        id="wrap"
        ref={wrapRef}
        className="w-full max-w-lg h-96 relative hidden bg-white rounded-lg shadow-lg"
      >
        <div className="flex justify-between items-center bg-gray-100 p-4 border-b">
          <h1 className="text-black font-bold">주소 검색</h1>
          <Image
            src="https://t1.daumcdn.net/postcode/resource/images/close.png"
            className="cursor-pointer"
            onClick={() => window.foldDaumPostcode()}
            alt="접기 버튼"
            width={24}
            height={24}
          />
        </div>
      </div>
      {/* 주소 입력 필드 */}
      <input
        type="text"
        id="sample3_address"
        placeholder="주소"
        className="border border-Line/Regular p-4 mb-3 w-full max-w-2xl text-16-n-24-40 text-font/main"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      {/* 상세주소 입력 필드 */}
      <input
        type="text"
        id="sample3_detailAddress"
        placeholder="상세주소"
        className="border border-Line/Regular p-4 mb-6 w-full text-16-n-24-40 text-font/main"
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
      />
      {/* Phone Form 추가 */}
      <label className="text-16-n-24-40 text-font/main mb-3 s:text-14-n-20-35">휴대폰 번호</label>
      <PhoneForm initialPhone={phone} onChange={handlePhoneChange} />

      <div className="flex gap-4">
        <button
          onClick={handleCancel}
          className="flex-1 bg-primary-green-50 text-primary-green-400 font-bold p-4 cursor-pointer rounded-md 
          transition-colors duration-300 hover:bg-primary-green-100 hover:text-primary-green-400"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          className="flex-1 bg-primary-green-500 text-white p-4 font-bold cursor-pointer text-white rounded-md 
          transition-colors duration-300 hover:bg-primary-green-700 hover:text-white"
        >
          회원정보수정
        </button>
      </div>
    </>
  );
};

export default UserEditForm;
