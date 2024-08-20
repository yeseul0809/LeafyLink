'use client';
import HeaderLogin from './HeaderLogin';
import HeaderMenu from './HeaderMenu';
import HeaderIconBar from './HeaderIconBar';
import HeaderMobile from './HeaderMobile';
import { useCallback, useEffect, useState } from 'react';

function Header() {
  const [visible, setVisible] = useState<boolean>(true);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    const currentPosition = window.pageYOffset;
    if (currentPosition <= 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="w-full h-auto bg-white sticky top-0 z-20 border-b">
      <div className="hidden max_sm:block">
        <HeaderMobile />
      </div>
      <div className="w-full mx-auto relative max-w-container-l px-[20px] block max_sm:hidden">
        {visible ? <HeaderLogin /> : null}
        <div className="w-full h-[62px] flex justify-between items-center block max_sm:hidden">
          <HeaderMenu
            isOpenMenu={isOpenMenu}
            setIsOpenMenu={setIsOpenMenu}
            setIsOpenSearch={setIsOpenSearch}
          />
          <div className="block max_md:hidden block max_sm:hidden">
            <HeaderIconBar
              setIsOpenMenu={setIsOpenMenu}
              setIsOpenSearch={setIsOpenSearch}
              isOpenSearch={isOpenSearch}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Header;
