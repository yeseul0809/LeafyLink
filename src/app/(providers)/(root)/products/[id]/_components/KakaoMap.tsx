'use client';

import { useEffect, useRef, useState } from 'react';
import { getSellerAddressCode } from '../_actions/productActions';
import Link from 'next/link';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  productId: string;
}

const KakaoMap = ({ productId }: KakaoMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [navUrl, setNavUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadKakaoMap = async () => {
      try {
        // product_id를 통해 판매자의 business_name과 address 가져옴
        const { businessName: fetchedBusinessName, address: fetchedAddress } =
          await getSellerAddressCode(productId);
        setBusinessName(fetchedBusinessName);
        setAddress(fetchedAddress);

        if (typeof window !== 'undefined') {
          const script = document.createElement('script');
          script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false&libraries=services`;
          script.onload = () => {
            window.kakao.maps.load(() => {
              const geocoder = new window.kakao.maps.services.Geocoder();

              // 판매자 주소를 좌표로 변환
              geocoder.addressSearch(fetchedAddress, (result: any, status: any) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  const sellerCoords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                  const mapOption = { center: sellerCoords, level: 3 };
                  const map = new window.kakao.maps.Map(mapContainer.current, mapOption);

                  // 판매자 위치 마커 생성 및 지도에 표시
                  const sellerMarker = new window.kakao.maps.Marker({ position: sellerCoords });
                  sellerMarker.setMap(map);

                  // 공통 길찾기 URL 생성
                  const generatedNavUrl = `https://map.kakao.com/link/to/${fetchedAddress},${sellerCoords.getLat()},${sellerCoords.getLng()}`;
                  setNavUrl(generatedNavUrl);

                  // 인포윈도우에 표시할 내용
                  const iwContent = `
                    <div style="padding:5px; font-size:12px;">
                      <b>${fetchedBusinessName}</b><br>
                      <a href="${generatedNavUrl}" style="color:blue" target="_blank">길찾기</a>
                    </div>
                  `;

                  const infowindow = new window.kakao.maps.InfoWindow({
                    content: iwContent,
                    removable: true
                  });

                  infowindow.open(map, sellerMarker);

                  // 마커 클릭 시 카카오 길찾기 URL로 이동
                  window.kakao.maps.event.addListener(sellerMarker, 'click', () => {
                    window.open(generatedNavUrl, '_blank');
                  });

                  // 줌 및 지도 유형 컨트롤 추가
                  const zoomControl = new window.kakao.maps.ZoomControl();
                  map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
                  const mapTypeControl = new window.kakao.maps.MapTypeControl();
                  map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
                } else {
                  console.error('주소 변환에 실패했습니다:', status);
                }
              });
            });
          };
          document.head.appendChild(script);
        }
      } catch (error) {
        console.error('카카오 지도 로딩 중 오류 발생:', error);
      }
    };

    loadKakaoMap();
  }, [productId]);

  return (
    <div className="flex flex-col items-center">
      <div>픽업위치</div>
      <div className="max-w-[1030px] w-full h-auto pb-9 bg-white rounded-[28px] shadow flex-col justify-start items-center gap-6 inline-flex">
        <div
          ref={mapContainer}
          className="w-full h-[40vh] md:h-[579px] rounded-tl-[28px] rounded-tr-[28px] overflow-hidden"
        />

        <div className="w-full max-w-[958px] flex flex-col md:flex-row justify-between items-center">
          <div className="flex-col justify-start items-start gap-2 inline-flex">
            <div className="self-stretch text-[#111111] text-base font-semibold leading-normal">
              {businessName}
            </div>
            <div className="self-stretch text-[#555555] text-[13px] font-normal leading-[18px]">
              {address}
            </div>
          </div>

          <div className="justify-start items-center gap-5 flex flex-wrap mt-4 md:mt-0">
            <div className="px-4 py-3.5 bg-white rounded-md border border-[#3bb873] justify-center items-center gap-2.5 flex">
              <div className="justify-center items-center gap-1 flex">
                <div className="text-center text-[#3bb873] text-sm font-semibold leading-tight">
                  상담톡 하기
                </div>
              </div>
            </div>
            {navUrl && (
              <Link href={navUrl} target="_blank">
                <div className="px-4 py-3.5 bg-[#3bb873] rounded-md justify-center items-center gap-2.5 flex cursor-pointer">
                  <div className="justify-center items-center gap-1 flex">
                    <div className="text-center text-white text-sm font-semibold leading-tight">
                      가는 길 검색
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KakaoMap;
