'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function LiveCommerce() {
  // 페이지 네비게이션
  const router = useRouter();
  const redirect = (e: string) => {
    router.push(`${e}`);
  };

  return (
    <section className="w-full h-[800px] bg-[#F7FDFA] mx-auto lg:mt-[145px] lg:pb-[145px] mt-[48px] pb-[48px]">
      <div className="flex justify-around items-end text-center">
        <div></div>
        <h2 className="text-center text-[32px] lg:mb-[38px] lg:pt-[85px] pt-[16px]">
          라이브커머스
        </h2>
        <button
          className=" border-2 px-3 py-2 text-[13px] "
          onClick={() => {
            redirect('/livestreaming');
          }}
        >
          더보기 &gt;
        </button>
      </div>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          navigation={{
            nextEl: '.custom-swiper-button-next',
            prevEl: '.custom-swiper-button-prev'
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper lg:w-full lg:h-[461px] sm:w-[375px] sm:h-[200px] w-[375px] h-[200px]"
        >
          {/* {images.map((src, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center relative">
              <img
                src={src}
                className="object-cover lg:w-full lg:h-[461px] sm:w-[375px] sm:h-[200px] w-[375px] h-[200px]"
                alt={`slide-${index}`}
              />
            </SwiperSlide>
          ))} */}
          <div className="w-full flex justify-between items-center z-10 absolute top-1/2">
            <div className="custom-swiper-button custom-swiper-button-prev lg:px-10 px-[20px]">
              <img
                src="/icons/button-left.svg"
                alt="left button"
                className="lg:w-[72px] lg:h-[72px] w-[40px] h-[40px]"
              />
            </div>
            <div className="custom-swiper-button custom-swiper-button-next lg:px-10 px-[20px]">
              <img
                src="/icons/button-right.svg"
                alt="right button"
                className="lg:w-[72px] lg:h-[72px] w-[40px] h-[40px]"
              />
            </div>
          </div>
        </Swiper>
      </div>
    </section>
  );
}

export default LiveCommerce;
