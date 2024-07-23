'use client';

import React, { useEffect, useRef, useState } from 'react';
import supabase from '@/supabase/supabaseClient';

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
  avatarUrl: string;
  userId: string;
}

const AddressForm = ({
  initialAddress,
  initialDetailAddress,
  initialAddressCode,
  initialUserName,
  avatarUrl,
  userId
}: AddressFormProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [address, setAddress] = useState<string>(initialAddress);
  const [postcode, setPostcode] = useState<string>(initialAddressCode);
  const [detailAddress, setDetailAddress] = useState<string>(initialDetailAddress);
  const [extraAddress, setExtraAddress] = useState<string>('');
  const [userName, setUserName] = useState<string>(initialUserName);

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
        user_name: userName
      })
      .eq('user_id', userId);
    if (error) {
      console.error('Error updating address:', error);
    }
  };

  const handleSave = () => {
    const fullAddress = `${address}${extraAddress}`;
    handleAddressUpdate(fullAddress, detailAddress, postcode, extraAddress);
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <img src={avatarUrl} alt="Profile Image" className="w-16 h-16 rounded-full mr-4" />
      </div>
      <input
        type="text"
        className="border p-2 rounded w-full"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        id="sample3_postcode"
        placeholder="우편번호"
        className="border p-2 mb-2"
        value={postcode}
        readOnly
      />
      <input
        type="button"
        onClick={() => window.sample3_execDaumPostcode()}
        value="우편번호 찾기"
        className="bg-blue-500 text-white p-2 mb-2 cursor-pointer"
      />
      <div
        id="wrap"
        ref={wrapRef}
        className="border w-full max-w-lg h-96 relative hidden bg-white rounded-lg shadow-lg"
      >
        <div className="flex justify-between items-center bg-gray-100 p-2 border-b border-gray-300">
          <h1 className="text-black font-bold">주소 검색</h1>
          <img
            src="//t1.daumcdn.net/postcode/resource/images/close.png"
            id="btnFoldWrap"
            className="cursor-pointer w-6 h-6"
            onClick={() => window.foldDaumPostcode()}
            alt="접기 버튼"
          />
        </div>
      </div>
      <br />
      <input
        type="text"
        id="sample3_address"
        placeholder="주소"
        className="border p-2 mb-2"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <br />
      <input
        type="text"
        id="sample3_detailAddress"
        placeholder="상세주소"
        className="border p-2 mb-2"
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
      />
      <button onClick={handleSave} className="bg-green-500 text-white p-2 mt-4 cursor-pointer">
        저장
      </button>
    </div>
  );
};

export default AddressForm;
