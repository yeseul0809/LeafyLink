'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/supabase/supabaseClient';

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

interface AddressFormProps {
  initialAddress: string;
  initialDetailAddress: string;
  initialAddressCode: string;
  initialUserName: string;
  initialPhone: string;
  userId: string;
  onFormCheckChange: (isFormCheck: boolean) => void;
}

export default function UserEditForm({
  initialAddress,
  initialDetailAddress,
  initialAddressCode,
  initialUserName,
  initialPhone,
  userId,
  onFormCheckChange
}: AddressFormProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [address, setAddress] = useState<string>(initialAddress);
  const [postcode, setPostcode] = useState<string>(initialAddressCode);
  const [detailAddress, setDetailAddress] = useState<string>(initialDetailAddress);
  const [extraAddress, setExtraAddress] = useState<string>('');
  const [userName, setUserName] = useState<string>(initialUserName);
  const [phone, setPhone] = useState<string>(initialPhone);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    document.body.appendChild(script);

    const handleScriptLoad = () => {
      if (wrapRef.current) {
        window.foldDaumPostcode = () => {
          if (wrapRef.current) {
            wrapRef.current.style.display = 'none';
          }
        };

        window.sample3_execDaumPostcode = () => {
          const currentScroll = Math.max(
            document.body.scrollTop,
            document.documentElement.scrollTop
          );

          new window.daum.Postcode({
            oncomplete: (data: AddressData) => {
              let addr = '';
              let extraAddr = '';

              addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;

              if (data.userSelectedType === 'R') {
                if (data.bname && /[동|로|가]$/g.test(data.bname)) {
                  extraAddr += data.bname;
                }
                if (data.buildingName && data.apartment === 'Y') {
                  extraAddr += extraAddr ? ', ' + data.buildingName : data.buildingName;
                }
                if (extraAddr) {
                  extraAddr = ' (' + extraAddr + ')';
                }
                setExtraAddress(extraAddr);
              } else {
                setExtraAddress('');
              }

              setPostcode(data.zonecode);
              setAddress(addr);
              setDetailAddress('');
              if (wrapRef.current) {
                wrapRef.current.style.display = 'none';
              }
              document.body.scrollTop = currentScroll;

              handleAddressUpdate(addr, '', data.zonecode, extraAddr);
            },
            width: '100%',
            height: '100%'
          }).embed(wrapRef.current);

          if (wrapRef.current) {
            wrapRef.current.style.display = 'block';
          }
        };
      }
    };

    script.onload = handleScriptLoad;

    return () => {
      const existingScript = document.querySelector(
        'script[src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]'
      );
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  useEffect(() => {
    const isFormCheck = address !== '' && postcode !== '';
    onFormCheckChange(isFormCheck);
  }, [address, postcode, onFormCheckChange]);

  const handleAddressUpdate = async (
    newAddress: string,
    newDetailAddress: string,
    newAddressCode: string,
    extraAddress: string
  ) => {
    const fullAddress = `${newAddress}${extraAddress}`;
    const supabase = createClient();
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
      console.error('Error updating address:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center xs:flex-col xs:items-start gap-[16px] xs:gap-0">
        <label htmlFor="receiver" className="w-[120px]">
          받는 사람
        </label>
        <input
          id="receiver"
          type="text"
          className="border rounded w-full p-3 mb-3 mt-3"
          value={userName}
          placeholder="이름"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div className="flex xs:flex-col xs:items-start gap-[16px] xs:gap-0">
        <div className="w-[120px] xs:mb-[8px] xs:mt-[12px]">주소</div>
        <div className="w-full">
          <input
            type="text"
            id="sample3_postcode"
            placeholder="우편번호"
            className="border p-3 mb-3 rounded w-[140px]"
            value={postcode}
            readOnly
          />

          <input
            type="button"
            onClick={() => window.sample3_execDaumPostcode()}
            value="주소검색"
            className="bg-white text-[#3BB873] border border-[#3BB873] cursor-pointer rounded w-[87px] h-[50px] ml-3"
          />

          <div
            id="wrap"
            ref={wrapRef}
            className="border w-full max-w-lg h-96 relative hidden bg-white rounded-lg shadow-lg"
          >
            <div className="flex justify-between items-centerbg-gray-100 border-b border-gray-300">
              <h1 className="text-black font-bold">주소 검색</h1>
              <Image
                src="https://t1.daumcdn.net/postcode/resource/images/close.png"
                id="btnFoldWrap"
                className="cursor-pointer w-6 h-6"
                onClick={() => window.foldDaumPostcode()}
                alt="접기 버튼"
                width={10}
                height={10}
              />
            </div>
          </div>

          <input
            type="text"
            placeholder="기본주소"
            className="border p-3 mb-3 w-full rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
