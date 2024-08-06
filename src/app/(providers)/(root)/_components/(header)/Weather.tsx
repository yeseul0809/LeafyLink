import React, { useEffect, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import WeatherComment from './WeatherComment';

interface Weather {
  id: number;
  main: string;
  description: string;
}

function Weather() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weather, setWeather] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // user 위치
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
      },
      (error) => {
        setLoading(false);
      }
    );
  }, []);
  // 뭐지
  // 타입 에러는 props에서 타입 지정이 잘못되었네용
  // 날씨 api
  useEffect(() => {
    if (latitude && longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_API_KEY}&lang=kr`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('날씨를 불러오지 못했습니다 :(');
          }
          return response.json();
        })
        .then((data) => {
          setWeather(data.weather[0].description);
          setLoading(false);
        });
    }
  }, [latitude, longitude]);

  // 날씨 안내 문구
  //   const weatherComment1 = (description: string) => {
  //     if (
  //       description.includes('구름') ||
  //       description.includes('흐림') ||
  //       description.includes('박무') ||
  //       description.includes('안개')
  //     ) {
  //       return '상대적으로 습도가 높아 물주기를 줄여도 좋아요';
  //     } else if (description.includes('맑음') || description.includes('해')) {
  //       return '식물이 흡수할 수 있도록 아침이나 저녁에 물을 주는 것이 좋아요';
  //     } else if (description.includes('비')) {
  //       return '물을 주지 않아도 괜찮아요. 대신 과습 방지를 위해 물빠짐이 좋은 화분을 사용해요';
  //     } else if (description.includes('눈') || description.includes('우박')) {
  //       return '물주기를 줄이고 흙이 얼어붙지 않도록 주의해요';
  //     } else {
  //       return '날씨 정보가 없어요.';
  //     }
  //   };

  //   const weatherComment2 = (description: string) => {
  //     if (
  //       description.includes('구름') ||
  //       description.includes('흐림') ||
  //       description.includes('박무') ||
  //       description.includes('안개')
  //     ) {
  //       return '실내 식물의 경우, 온도와 빛의 양을 체크해주세요';
  //     } else if (description.includes('맑음') || description.includes('해')) {
  //       return '강한 햇빛을 받는 식물은 그늘로 이동시켜주세요!';
  //     } else if (description.includes('비')) {
  //       return '실내 식물의 경우, 통풍이 잘 되는 곳에 두세요';
  //     } else if (description.includes('눈') || description.includes('우박')) {
  //       return '실내 식물은 난방기구와 멀리, 외부 식물은 바람막이 설치!';
  //     }
  //   };

  return (
    <section className="w-full lg:h-[45px] md:h-[40px] flex items-center justify-center">
      <WeatherComment weather={weather} />
    </section>
  );
}

export default Weather;
