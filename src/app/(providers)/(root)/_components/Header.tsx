'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

function Header() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [cityName, setCityName] = useState('');
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // user 위치
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        setLoading(false);
        console.log('위도경도 에러', error);
      }
    );
  }, []);

  // 날씨 api
  // https://api.openweathermap.org/data/2.5/weather?lat=37.2801536&lon=127.0153216&appid=9c8560ee4830bd2bf81d8bb4231b40fa&lang=kr
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
          setWeather(data);
          setLoading(false);
        });
    }
  }, [latitude, longitude]);

  console.log(weather);

  // 날씨 안내 문구
  const weatherComment = () => {
    if (
      weather.weather[0].description.includes('구름') ||
      weather.weather[0].description.includes('흐림')
    ) {
      return '🌥, 광합성 하기 어려운 날이에요.';
    } else if (weather.weather[0].description.includes('맑음')) {
      return '🌞, 광합성 하기 딱 좋은 날!';
    } else if (weather.weather[0].description.includes('비')) {
      return '☔, 물을 주지 않아도 되겠어요 :)';
    } else if (weather.weather[0].description.includes('눈')) {
      return '⛄, 식물이 얼지 않게 주의하세요!';
    } else if (weather.weather[0].description.includes('박무')) {
      return '🌫, 안개가 끼어 습도가 높아요';
    } else {
      return '날씨 정보가 없어요.';
    }
  };

  // 메뉴 토글
  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  // 검색창 토글
  const toggleSearch = () => {
    setIsOpenSearch(!isOpenSearch);
  };

  // 페이지 네비게이션
  const redirect = (e: string) => {
    router.push(`${e}`);
  };

  console.log(cityName);

  return (
    <section>
      <div className="w-full h-[45px] text-center flex items-center justify-center bg-zinc-50 px-[190px]">
        {loading ? (
          <p className="text-sm text-zinc-300 tracking-widest">Loading...☀</p>
        ) : (
          <p className="text-sm tracking-wide text-zinc-600">
            지금 내 위치 날씨는 {weather.weather[0].description}
            {weatherComment(weather.weather[0].description)}
          </p>
        )}
      </div>

      <div className="w-full h-20 px-[190px] flex items-center justify-between">
        <Link href={'/'}>
          <Image src="/icons/logo.svg" alt="logo" width={100} height={30}></Image>
        </Link>
        <div>
          <button
            className="mr-10 text-zinc-500 hover:text-zinc-950"
            onClick={() => {
              redirect('/login');
            }}
          >
            로그인
          </button>
          <button
            className="text-zinc-500 hover:text-zinc-950"
            onClick={() => {
              redirect('/login');
            }}
          >
            회원가입
          </button>
        </div>
        {/* <div>
          <Image></Image> <p>{user.name}님</p>
          <button>로그아웃</button>
        </div> */}
      </div>

      <div className="w-full h-[62px] flex items-center justify-between px-[190px] border-b relative">
        <div className="flex">
          <button onClick={toggleMenu}>
            <Image src="/icons/icon-menu.svg" alt="menu" width={24} height={24}></Image>
          </button>
          {isOpenMenu && (
            <div
              className="w-full h-auto py-[30px] px-[190px] border-b bg-white absolute top-12 right-0 text-center"
              ref={dropdownRef}
            >
              <ul className="flex">
                <li className="text-zinc-700 hover:text-zinc-950">
                  <a href="#">씨앗</a>
                </li>
                <li className="ml-7 text-zinc-700 hover:text-zinc-950">
                  <a href="#">모종</a>
                </li>
                <li className="ml-7 text-zinc-700 hover:text-zinc-950">
                  <a href="#">재배키트</a>
                </li>
                <li className="ml-7 text-zinc-700 hover:text-zinc-950">
                  <a href="#">흙/비료</a>
                </li>
                <li className="ml-7 text-zinc-700 hover:text-zinc-950">
                  <a href="#">원예용품</a>
                </li>
              </ul>
            </div>
          )}
          <button className="ml-7 flex text-[#FF0000]">
            라이브커머스{' '}
            <Image src="/icons/icon-live.svg" alt="live" width={18} height={15}></Image>
          </button>
          <button
            className="ml-7"
            onClick={() => {
              redirect('/livestreaming');
            }}
          >
            베스트셀러
          </button>
          <button className="ml-7">식집사템</button>
        </div>

        <div className="flex">
          <button className="ml-[48px]" onClick={toggleSearch}>
            <Image src="/icons/icon-search.svg" alt="search" width={32} height={32}></Image>
          </button>
          <button className="ml-[48px]">
            <Image src="/icons/icon-message.svg" alt="message" width={32} height={32}></Image>
          </button>
          <button className="ml-[48px]">
            <Image src="/icons/icon-cart.svg" alt="cart" width={32} height={32}></Image>
          </button>
          <button className="ml-[48px]">
            <Image src="/icons/icon-mypage.svg" alt="mypage" width={32} height={32}></Image>
          </button>
          {isOpenSearch && (
            <div className="absolute w-full h-auto flex justify-between py-[30px] px-[190px] border-b bg-white top-12 right-0 text-center">
              <p className="bold text-2xl font-semibold">SEARCH</p>
              <form
                action="submit"
                className="flex justify-center items-center w-[540px] h-10 border rounded-full px-4"
              >
                <input type="text" className="w-11/12 h-8" placeholder="어떤 식물을 찾으시나요?" />
                <button type="submit">
                  <Image src="/icons/icon-search.svg" alt="search" width={24} height={24}></Image>
                </button>
              </form>
              <button onClick={toggleSearch}>
                <Image src="/icons/icon-close.svg" alt="close" width={30} height={30}></Image>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Header;
