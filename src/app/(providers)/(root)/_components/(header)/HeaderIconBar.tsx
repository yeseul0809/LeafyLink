'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { createClient } from '@/supabase/supabaseClient';

function HeaderIconBar() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
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

        const fetchSellerData = async (userId: string) => {
          try {
            const { data, error } = await supabase
              .from('Seller')
              .select('seller_id, business_name')
              .eq('seller_id', userId)
              .maybeSingle();

            if (error) {
              return null;
            }

            return data;
          } catch (error) {
            return null;
          }
        };

        const sellerData = await fetchSellerData(userId);
        if (sellerData) {
          setBusinessName(sellerData.business_name);
          setProfileLink('/seller/mypage/profile');
        } else {
          setProfileLink('/buyer/mypage/profile');
        }
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  // 페이지 네비게이션
  const redirect = (e: string) => {
    router.push(`${e}`);
  };
  // 검색창 토글
  const toggleSearch = () => {
    setIsOpenSearch(!isOpenSearch);
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
    <section>
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
        <button className="ml-[48px]">
          <Link href={profileLink}>
            <Image src="/icons/icon-mypage.svg" alt="mypage" width={32} height={32}></Image>
          </Link>
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
    </section>
  );
}

export default HeaderIconBar;
