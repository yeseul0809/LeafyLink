'use client';
import Weather from './Weather';
import HeaderLogin from './HeaderLogin';
import HeaderMenu from './HeaderMenu';
import HeaderIconBar from './HeaderIconBar';
import HeaderMobile from './HeaderMobile';
import HeaderMobileDropdown from './HeaderMobileDropDown';

function Header() {
  return (
    <section className="w-full h-auto bg-white sticky top-0 z-20 border-b">
      <div className="hidden max_sm:block">
        <HeaderMobile />
      </div>
      <div className="w-full mx-auto relative max-w-container-l px-[20px] block max_sm:hidden">
        <HeaderLogin />
        <div className="w-full h-[62px]  flex justify-between items-center block max_sm:hidden">
          <HeaderMenu />
          <div className="block max_md:hidden block max_sm:hidden">
            <HeaderIconBar />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Header;
