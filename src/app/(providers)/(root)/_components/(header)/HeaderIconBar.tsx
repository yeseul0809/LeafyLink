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
import useUser from '@/hooks/useUser';
import { useCartStore } from '@/stores';

function HeaderIconBar() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
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
  const { user } = useUser();
  const { chatrooms: chatroomList } = useChatrooms(user ? user.id : '');

  const unreadMessageCount = unreadCountStore((state) =>
    Object.values(state.unreadCounts).reduce((sum, count) => sum + count, 0)
  );

  const cartProductsCount = Object.keys(cart).length;

  // 로그인 상태
  useEffect(() => {
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

  // chatroomList가 업데이트되면 안 읽은 메시지 수를 계산
  useEffect(() => {
    const updateUnreadCounts = async () => {
      if (isLogin && chatroomList.length > 0) {
        const setUnreadCounts = unreadCountStore.getState().setUnreadCounts;
        await fetchUnreadCounts(user, chatroomList, setUnreadCounts);
      }
    };

    updateUnreadCounts();
  }, [chatroomList, isLogin, user]);

  useEffect(() => {
    if (user) {
      initializeCart(user.id);
    }
  }, [user, initializeCart]);

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
