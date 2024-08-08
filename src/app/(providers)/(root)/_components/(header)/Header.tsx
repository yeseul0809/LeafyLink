import Weather from './Weather';
import HeaderLogin from './HeaderLogin';
import HeaderMenu from './HeaderMenu';
import HeaderIconBar from './HeaderIconBar';

function Header() {
  return (
    <section className="w-full h-auto bg-white sticky top-0 z-20 border-b">
      <div className="w-full mx-auto relative max-w-container-l px-[20px]">
        <HeaderLogin />
        <div className="w-full h-[62px]  flex justify-between items-center">
          <HeaderMenu />
          <div className="block max_md:hidden">
            <HeaderIconBar />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Header;
