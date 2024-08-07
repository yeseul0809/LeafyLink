import Weather from './Weather';
import HeaderLogin from './HeaderLogin';
import HeaderMenu from './HeaderMenu';
import HeaderIconBar from './HeaderIconBar';

function Header() {
  return (
    <section className="w-full h-auto bg-white sticky top-0 z-20 border-b ">
      <Weather />
      <div className="w-[1240px] mx-auto relative">
        <HeaderLogin />
        <div className="w-full h-[62px] flex justify-between items-center">
          <HeaderMenu />
          <HeaderIconBar />
        </div>
      </div>
    </section>
  );
}
export default Header;
