import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderMobileDropdown from './HeaderMobileDropDown';

function HeaderMobile() {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const router = useRouter();

  // 페이지 네비게이션
  const redirect = (e: string) => {
    router.push(`${e}`);
    setIsOpenMobileMenu(false);
  };

  // 메뉴 토글
  const toggleMobileMenu = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu);
    console.log(isOpenMobileMenu);
  };

  return (
    <section className="flex justify-between items-center w-full h-[56px] bg-white px-[20px] mx-auto relative">
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

      <button
        className="w-[18px] h-[18px] "
        onClick={() => {
          redirect('/search');
        }}
      >
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
      {isOpenMobileMenu && <HeaderMobileDropdown />}
    </section>
  );
}

export default HeaderMobile;
