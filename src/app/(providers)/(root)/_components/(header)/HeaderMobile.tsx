import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderMobileDropdown from './HeaderMobileDropdown';
import HeaderMobileSearch from './HeaderMobileSearch';

function HeaderMobile() {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [isOpenMobileSearch, setIsOpenMobileSearch] = useState(false);
  const router = useRouter();

  // 페이지 네비게이션
  const redirect = (e: string) => {
    setIsOpenMobileMenu(false);
    console.log('이동해');
    router.push(`${e}`);
  };

  // 메뉴 토글
  const toggleMobileMenu = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu);
    setIsOpenMobileSearch(false);
  };
  const toggleMobileSearch = () => {
    setIsOpenMobileSearch(!isOpenMobileSearch);
    setIsOpenMobileMenu(false);
  };

  return (
    <section>
      <div className="flex justify-between items-center w-full h-[56px] bg-white px-[20px] mx-auto relative">
        <button onClick={toggleMobileMenu}>
          <Image src="/icons/icon-menu.svg" alt="menu" width={18} height={18}></Image>
        </button>
        <button
          className="ml-[83px] mr-[38px]"
          onClick={() => {
            redirect('/');
          }}
        >
          <Image src="/icons/logo.svg" alt="logo" width={114} height={15} />
        </button>

        <button className="w-[18px] h-[18px] " onClick={toggleMobileSearch}>
          <Image src="/icons/icon-search.svg" alt="search" width={18} height={18}></Image>
        </button>
        <button
          className="w-[18px] h-[18px]"
          onClick={() => {
            redirect('/cart');
          }}
        >
          <Image src="/icons/icon-cart.svg" alt="cart" width={18} height={18} className=""></Image>
        </button>
      </div>
      {isOpenMobileMenu && (
        <>
          <div className="z-0 w-screen h-screen bg-black opacity-60 absolute"></div>
          <HeaderMobileDropdown setIsOpenMobileMenu={setIsOpenMobileMenu} />
        </>
      )}
      {isOpenMobileSearch && (
        <>
          <div className="z-0 w-screen h-screen bg-black opacity-60 absolute"></div>
          <HeaderMobileSearch setIsOpenMobileSearch={setIsOpenMobileSearch} />
        </>
      )}
    </section>
  );
}

export default HeaderMobile;
