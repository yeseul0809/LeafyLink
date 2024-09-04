// hooks/usePostcode.ts
import { useEffect } from 'react';

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

const usePostcode = (
  setAddress: (address: string) => void,
  setPostcode: (postcode: string) => void,
  setExtraAddress: (extraAddress: string) => void,
  wrapRef: React.RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    // 스크립트가 이미 로드되었는지 확인
    if (
      !document.querySelector(
        'script[src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]'
      )
    ) {
      const script = document.createElement('script');
      script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      document.body.appendChild(script);
      script.onload = handleScriptLoad;
    } else {
      handleScriptLoad();
    }

    function handleScriptLoad() {
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
              let addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
              let extraAddr = '';

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
              document.body.scrollTop = currentScroll;

              if (wrapRef.current) {
                wrapRef.current.style.display = 'none';
              }
            },
            width: '100%',
            height: '100%'
          }).embed(wrapRef.current);

          if (wrapRef.current) {
            wrapRef.current.style.display = 'block';
          }
        };
      }
    }

    return () => {
      // Cleanup 코드 - 스크립트 제거
      const existingScript = document.querySelector(
        'script[src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]'
      );
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, [setAddress, setPostcode, setExtraAddress, wrapRef]);
};

export default usePostcode;
