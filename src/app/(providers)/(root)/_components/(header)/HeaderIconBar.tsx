'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { createClient } from '@/supabase/supabaseClient';
import { unreadCountStore } from '@/stores/unreadCountStore';
import { fetchUnreadCounts } from '../../chat/_utils/chatroomUtils';
import useChatrooms from '../../chat/_hooks/useChatrooms';
import useUser from '@/hooks/user/useUser';
import useSeller from '@/hooks/user/useSeller';
import { useCartStore } from '@/stores';

interface HeaderMenuProps {
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenSearch: boolean;
}

function HeaderIconBar({ setIsOpenMenu, setIsOpenSearch, isOpenSearch }: HeaderMenuProps) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [profileLink, setProfileLink] = useState('/');
  const [businessName, setBusinessName] = useState('');
  const { cart, initializeCart } = useCartStore((state) => ({
    cart: state.cart,
    initializeCart: state.initializeCart
  }));

  const supabase = createClient();
  const { userData } = useUser()!;
  const { sellerData } = useSeller(userData?.user_id!);
  const { chatrooms: chatroomList } = useChatrooms(userData ? userData.user_id : '');

  const unreadMessageCount = unreadCountStore((state) =>
    Object.values(state.unreadCounts).reduce((sum, count) => sum + count, 0)
  );

  const cartProductsCount = Object.keys(cart).length;

  // 로그인 상태
  useEffect(() => {
    if (userData) {
      setIsLogin(true);
      setUserName(userData.user_name);
      setUserAvatar(userData.avatar_url);
      if (sellerData) {
        setBusinessName(sellerData.business_name);
        setProfileLink('/seller/mypage/profile');
      } else {
        setProfileLink('/buyer/mypage/profile');
      }
    } else {
      setIsLogin(false);
    }
  }, [userData, sellerData]);

  // chatroomList가 업데이트되면 안 읽은 메시지 수를 계산
  useEffect(() => {
    const updateUnreadCounts = async () => {
      if (isLogin && chatroomList.length > 0) {
        const setUnreadCounts = unreadCountStore.getState().setUnreadCounts;
        await fetchUnreadCounts(userData, chatroomList, setUnreadCounts);
      }
    };

    updateUnreadCounts();
  }, [chatroomList, isLogin, userData]);

  useEffect(() => {
    if (userData) {
      initializeCart(userData.user_id);
    }
  }, [userData, initializeCart]);

  const redirect = (e: string) => {
    router.push(`${e}`);
    setIsOpenSearch(false);
  };

  // 검색창 토글
  const toggleSearch = () => {
    setIsOpenSearch(!isOpenSearch);
    setIsOpenMenu(false);
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
          className="relative ml-[48px]"
          onClick={() => {
            redirect('/chat');
          }}
        >
          <Image src="/icons/icon-message.svg" alt="message" width={32} height={32}></Image>
          {unreadMessageCount > 0 && (
            <div className="absolute -top-0 -right-1 w-[16px] h-[16px] leading-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[11px]">
              {unreadMessageCount > 99 ? '99+' : unreadMessageCount}
            </div>
          )}
        </button>
        <button
          className="ml-[48px] relative"
          onClick={() => {
            router.push('/cart?refresh=' + Date.now());
          }}
        >
          <Image src="/icons/icon-cart.svg" alt="cart" width={32} height={32}></Image>
          {cartProductsCount > 0 && (
            <div className="absolute -top-0 -right-1 w-[16px] h-[16px] leading-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[11px]">
              {cartProductsCount > 99 ? '99+' : cartProductsCount}
            </div>
          )}
        </button>
        <button className="ml-[48px]">
          <Link href={profileLink}>
            <Image src="/icons/icon-mypage.svg" alt="mypage" width={32} height={32}></Image>
          </Link>
        </button>

        {isOpenSearch && (
          <div
            style={{
              boxShadow: '0px 2500px 0px 2500px rgb(0 0 0 / 0.6)'
            }}
            className="w-full border-b border-[#E5E5EC] absolute h-auto flex justify-between py-[30px] px-[20px] bg-white top-full right-0 text-center mt-[1px]"
          >
            <p className="bold text-2xl font-semibold">SEARCH</p>
            <form
              action={formAction}
              className="flex justify-center items-center max-w-[820px] w-full h-10 border rounded-full px-4"
            >
              <input
                type="text"
                className="max-w-[820px] w-full h-8 "
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
