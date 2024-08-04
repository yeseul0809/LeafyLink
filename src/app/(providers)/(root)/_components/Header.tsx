'use client';

import { createClient } from '@/supabase/supabaseClient';
import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

function Header() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weather, setWeather] = useState<Weather>();
  const [loading, setLoading] = useState(true);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [profileLink, setProfileLink] = useState('/');
  const [businessName, setBusinessName] = useState('');

  // 로그인 상태
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async (res) => {
      if (res.data.user) {
        setIsLogin(true);
        const userId = res.data.user.id;
        setUserName(res.data.user.identities![0].identity_data?.full_name);
        setUserAvatar(res.data.user.identities![0].identity_data?.avatar_url);

        // Seller 테이블에서 seller_id를 확인하여 프로필 링크 설정
        const fetchSellerData = async (userId: string) => {
          try {
            const { data, error } = await supabase
              .from('Seller')
              .select('seller_id, business_name')
              .eq('seller_id', userId)
              .maybeSingle();

            if (error) {
              console.log('Error fetching seller data:', error);
              return null;
            }

            console.log('Fetched Seller Data:', data); // 데이터 구조 확인
            return data; // seller_id와 business_name이 포함된 데이터 반환
          } catch (error) {
            console.log('Error in fetchSellerData:', error);
            return null;
          }
        };

        const sellerData = await fetchSellerData(userId);
        if (sellerData) {
          console.log('Seller Data:', sellerData); // sellerData 확인
          setBusinessName(sellerData.business_name); // business_name 설정
          console.log('Updated Business Name:', sellerData.business_name); // 추가된 로그
          setProfileLink('/seller/mypage/profile');
        } else {
          setProfileLink('/buyer/mypage/profile');
        }
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  // 로그인 상태
  // useEffect(() => {
  //   const getUserData = async () => {
  //     const userInfo = await getUserInfo();
  //     if (userInfo != null) {
  //       setIsLogin(true);
  //       setUserName(userInfo?.identities![0].identity_data?.full_name);
  //       setUserAvatar(userInfo?.identities![0].identity_data?.avatar_url);
  //       setUserId(userInfo?.identities![0].user_id!);
  //     }
  //   };
  //   getUserData();
  // }, [isLogin]);

  // 로그아웃 상태
  const logout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('로그아웃 실패', error);
    } else {
      window.location.href = '/';
    }
  };
  // user 위치
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
      },
      (error) => {
        setLoading(false);
        console.log('위도경도 에러', error);
      }
    );
  }, []);
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
          setWeather(data.weather[0]);
          setLoading(false);
        });
    }
  }, [latitude, longitude]);
  // 날씨 안내 문구
  const weatherComment = (description: string) => {
    if (description.includes('구름') || description.includes('흐림')) {
      return '🌥, 광합성 하기 어려운 날이에요.';
    } else if (description.includes('맑음') || description.includes('해')) {
      return '🌞, 광합성 하기 딱 좋은 날!';
    } else if (description.includes('비')) {
      return '☔, 물을 주지 않아도 되겠어요 :)';
    } else if (description.includes('눈') || description.includes('우박')) {
      return '⛄, 식물이 얼지 않게 주의하세요!';
    } else if (description.includes('박무') || description.includes('안개')) {
      return '🌫, 안개가 끼어 습도가 높아요';
    } else {
      return '날씨 정보가 없어요.';
    }
  };
  // 메뉴 토글
  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
    setIsOpenSearch(false);
  };
  // 검색창 토글
  const toggleSearch = () => {
    setIsOpenSearch(!isOpenSearch);
    setIsOpenMenu(false);
  };
  // 페이지 네비게이션
  const redirect = (e: string) => {
    router.push(`${e}`);
  };

  // 검색 로직
  const searchKeyword = (_: any, formData: FormData) => {
    const keyword = formData.get('keyword') as string;
    if (keyword === '') {
      return;
    }
    setIsOpenSearch(false);
    router.push(`/search?keyword=${encodeURIComponent(keyword)}&page=${1}`);
  };
  const [state, formAction] = useFormState(searchKeyword, null);

  return (
    <section className="w-full h-auto bg-white sticky top-0 z-20">
      <div className="w-full lg:h-[45px] md:h-[40px] text-center flex items-center justify-center bg-zinc-50">
        {loading ? (
          <p className="text-sm md:text-xs text-zinc-300 tracking-widest">Loading...☀</p>
        ) : (
          <p className="text-sm tracking-wide text-zinc-600">
            지금 내 위치 날씨는 {weather && weather.description}
            {weather && weatherComment(weather.description)}
          </p>
        )}
      </div>
      <div className="w-full h-20 lg:px-[190px] md:px-[24px] flex items-center justify-between">
        <Link href={'/'}>
          <Image src="/icons/logo.svg" alt="logo" width={152} height={41} />
        </Link>
        {isLogin ? (
          <div className="로그인O flex items-center text-zinc-500">
            <Image
              src={userAvatar}
              alt="user profile image"
              width={28}
              height={28}
              className="rounded-full h-[28px]"
            />
            <Link href={profileLink}>
              <p className="ml-3 hover:text-zinc-950">{businessName || userName}</p>
            </Link>
            <button className="ml-10 hover:text-zinc-950" onClick={logout}>
              로그아웃
            </button>
          </div>
        ) : (
          <div className="로그인X">
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
        )}
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
                  <a href="/productsList/seed">씨앗</a>
                </li>
                <li className="ml-7 text-zinc-700 hover:text-zinc-950">
                  <a href="/productsList/seedling">모종</a>
                </li>
                <li className="ml-7 text-zinc-700 hover:text-zinc-950">
                  <a href="/productsList/kit">재배키트</a>
                </li>
                <li className="ml-7 text-zinc-700 hover:text-zinc-950">
                  <a href="/productsList/soil">흙/비료</a>
                </li>
                <li className="ml-7 text-zinc-700 hover:text-zinc-950">
                  <a href="/productsList/goods">원예용품</a>
                </li>
              </ul>
            </div>
          )}
          <button
            className="ml-2 lg:ml-7 flex text-[#3BB873] font-semibold"
            onClick={() => {
              redirect('/livestreaming');
            }}
          >
            라이브커머스
            <Image
              src="/icons/icon-live.svg"
              alt="live"
              width={18}
              height={15}
              className="ml-1 mt-1"
            ></Image>
          </button>
          <button
            className="ml-2 lg:ml-7 "
            onClick={() => {
              redirect('/#bestSeller');
            }}
          >
            베스트셀러
          </button>
          <button
            className="ml-2 lg:ml-7 "
            onClick={() => {
              redirect('/#goods');
            }}
          >
            식집사템
          </button>
        </div>
        <div className="flex">
          <button className="ml-[48px]" onClick={toggleSearch}>
            <Image src="/icons/icon-search.svg" alt="search" width={32} height={32}></Image>
          </button>
          <button
            className="ml-[48px]"
            onClick={() => {
              redirect('/chat');
            }}
          >
            <Image src="/icons/icon-message.svg" alt="message" width={32} height={32}></Image>
          </button>
          <button
            className="ml-[48px]"
            onClick={() => {
              redirect('/cart');
            }}
          >
            <Image src="/icons/icon-cart.svg" alt="cart" width={32} height={32}></Image>
          </button>
          <button
            className="ml-[48px]"
            onClick={() => {
              redirect(`/mypage`);
            }}
          >
            <Image src="/icons/icon-mypage.svg" alt="mypage" width={32} height={32}></Image>
          </button>

          {isOpenSearch && (
            <div className="absolute w-full h-auto flex justify-between py-[30px] px-[190px] border-b bg-white top-12 right-0 text-center">
              <p className="bold text-2xl font-semibold">SEARCH</p>
              <form
                action={formAction}
                className="flex justify-center items-center w-[540px] h-10 border rounded-full px-4"
              >
                <input
                  type="text"
                  className="w-11/12 h-8"
                  placeholder="어떤 식물을 찾으시나요?"
                  name="keyword"
                />
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
