import Link from 'next/link';
import React from 'react';

function Advertising() {
  return (
    <section>
      <div
        className="w-full h-[180px] mt-[180px] text-center bg-no-repeat bg-center bg-cover max_xs:hidden max_sm:hidden max_md:block max_lg:block mx-auto"
        style={{ backgroundImage: "url('/bg-advertising.webp')" }}
      >
        <Link
          href={'/livestreaming'}
          className="w-full h-full cursor-pointer	 flex justify-center items-center"
        >
          <p>
            <span className="text-[32px]">식물의 매력을 실시간으로!</span>
            <br />
            실시간으로 만나는 식물, 직접 확인하고 선택하세요.
          </p>
        </Link>
      </div>
      <div className="w-full h-[120px] mt-[70px] max_xs:block max_sm:block max_md:hidden max_lg:hidden hidden mx-auto">
        <Link
          href={'/livestreaming'}
          className="w-full h-full cursor-pointer	bg-no-repeat bg-center bg-cover flex justify-center items-center"
          style={{ backgroundImage: "url('/mobile-bg-advertising.svg')" }}
        ></Link>
      </div>
    </section>
  );
}

export default Advertising;
