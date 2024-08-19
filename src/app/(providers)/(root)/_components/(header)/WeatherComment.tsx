import Image from 'next/image';
import React from 'react';

const WeatherComment = ({ weather }: { weather: string }) => {
  if (
    weather.includes('구름') ||
    weather.includes('흐림') ||
    weather.includes('박무') ||
    weather.includes('안개')
  ) {
    return (
      <div className="w-full h-full bg-[url('/bg-weather-cloud.webp')] bg-cover text-sm tracking-wide flex justify-center">
        <span className="flex items-center justify-center">
          내 위치는 오늘 흐림
          <Image
            src="/icons/icon-cloud.svg"
            alt="흐림"
            width={20}
            height={13}
            className="ml-2"
          ></Image>
        </span>
        <span className="pl-8 flex items-center justify-center hidden lg:flex">
          {weather && '상대적으로 습도가 높아 물주기를 줄여도 좋아요'}
        </span>
        <span className="pl-8 flex items-center justify-center hidden lg:flex">
          {weather && '실내 식물의 경우, 온도와 빛의 양을 체크해주세요'}
        </span>
      </div>
    );
  } else if (weather.includes('맑음') || weather.includes('해')) {
    // 👀
    return (
      <div className="w-full h-full bg-[url('/bg-weather-sun.webp')] bg-cover text-sm tracking-wide flex justify-center">
        <span className="flex items-center justify-center">
          내 위치는 오늘 맑음
          <Image
            src="/icons/icon-sun.svg"
            alt="맑음"
            width={20}
            height={13}
            className="ml-2"
          ></Image>
        </span>
        <span className="pl-8 items-center justify-center hidden lg:flex">
          {weather && '식물이 흡수할 수 있도록 아침이나 저녁에 물을 주는 것이 좋아요'}
        </span>
        <span className="pl-8 items-center justify-center hidden lg:flex">
          {weather && '강한 햇빛을 받는 식물은 그늘로 이동시켜주세요!'}
        </span>
      </div>
    );
  } else if (weather.includes('비')) {
    return (
      <div className="w-full h-full bg-[url('/bg-weather-rain.webp')] bg-cover text-sm tracking-wide flex justify-center">
        <span className="flex items-center justify-center">
          내 위치는 오늘 비
          <Image
            src="/icons/icon-rain.svg"
            alt="비"
            width={20}
            height={13}
            className="ml-2"
          ></Image>
        </span>
        <span className="pl-8 items-center justify-center hidden lg:flex">
          {weather &&
            '물을 주지 않아도 괜찮아요. 대신 과습 방지를 위해 물빠짐이 좋은 화분을 사용해요'}
        </span>
        <span className="pl-8  items-center justify-center hidden lg:flex">
          {weather && '실내 식물의 경우, 통풍이 잘 되는 곳에 두세요'}
        </span>
      </div>
    );
  } else if (weather.includes('눈')) {
    return (
      <div className="w-full h-full bg-[url('/bg-weather-cold.webp')] bg-cover text-sm tracking-wide flex justify-center">
        <span className="flex items-center justify-center">
          내 위치는 오늘 눈
          <Image
            src="/icons/icon-cold.svg"
            alt="눈"
            width={20}
            height={13}
            className="ml-2"
          ></Image>
        </span>
        <span className="pl-8  items-center justify-center hidden lg:flex">
          {weather && '물주기를 줄이고 흙이 얼어붙지 않도록 주의해요'}
        </span>
        <span className="pl-8  items-center justify-center hidden lg:flex">
          {weather && '실내 식물은 난방기구와 멀리, 외부 식물은 바람막이 설치!'}
        </span>
      </div>
    );
  }
  return null;
};

export default WeatherComment;
