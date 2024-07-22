'use client';

import React, { useEffect } from 'react';

declare global {
  interface Window {
    daum: any; // Daum Postcode API
    foldDaumPostcode: () => void; // 우편번호 검색 숨기기
    sample3_execDaumPostcode: () => void; // 우편번호 검색 실행
  }
}

interface AddressData {
  zonecode: string; // 우편번호
  roadAddress: string; // 도로명 주소
  jibunAddress: string; // 지번 주소
  userSelectedType: string; // 주소 타입
  bname: string; // 동, 로, 가 등
  buildingName: string; // 건물 이름
  apartment: string; // 아파트 여부
}

const AddressForm = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    document.body.appendChild(script);

    script.onload = () => {
      const elementWrap = document.getElementById('wrap') as HTMLDivElement;

      window.foldDaumPostcode = () => {
        if (elementWrap) {
          elementWrap.style.display = 'none';
        }
      };

      window.sample3_execDaumPostcode = () => {
        const currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

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
              (document.getElementById('sample3_extraAddress') as HTMLInputElement).value =
                extraAddr;
            } else {
              (document.getElementById('sample3_extraAddress') as HTMLInputElement).value = '';
            }

            (document.getElementById('sample3_postcode') as HTMLInputElement).value = data.zonecode;
            (document.getElementById('sample3_address') as HTMLInputElement).value = addr;
            (document.getElementById('sample3_detailAddress') as HTMLInputElement)?.focus();
            if (elementWrap) {
              elementWrap.style.display = 'none';
            }
            document.body.scrollTop = currentScroll;
          },
          onresize: () => {},
          width: '100%',
          height: '100%'
        }).embed(elementWrap);

        if (elementWrap) {
          elementWrap.style.display = 'block';
        }
      };
    };

    return () => {
      const script = document.querySelector(
        'script[src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]'
      );
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="p-4">
      <input type="text" id="sample3_postcode" placeholder="우편번호" className="border p-2 mb-2" />
      <input
        type="button"
        onClick={() => window.sample3_execDaumPostcode()}
        value="우편번호 찾기"
        className="bg-blue-500 text-white p-2 mb-2 cursor-pointer"
      />
      {/* iframe을 이용하여 페이지에 끼워 넣기*/}

      <div
        id="wrap"
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
      <input type="text" id="sample3_address" placeholder="주소" className="border p-2 mb-2" />
      <br />
      <input
        type="text"
        id="sample3_detailAddress"
        placeholder="상세주소"
        className="border p-2 mb-2"
      />
      <input
        type="text"
        id="sample3_extraAddress"
        placeholder="참고항목"
        className="border p-2 mb-2"
      />
    </div>
  );
};

export default AddressForm;
