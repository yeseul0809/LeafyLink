'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface ImagesType {
  images: string[];
}
function Carousel({ images }: ImagesType) {
  return (
    <div className="w-full lg:h-[461px] sm:h-[200px] h-[200px]">
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
        className="mySwiper w-full max-h-[461px] "
      >
        <div className="max_xs:hidden max_sm:hidden max_md:block max_lg:block block">
          {images.map((src, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center relative ">
              <Image
                src={src}
                width={1240}
                height={500}
                sizes="(max-width: 1024px) 100vw, 1240px"
                className="object-cover w-full lg:h-[461px] sm:h-[200px] h-[200px]"
                alt={`slide-${index}`}
              />
            </SwiperSlide>
          ))}
        </div>

        {/* <div className="sm:block hidden">
          {mobileImages.map((src, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center relative ">
              <img
                src={src}
                className="object-cover w-full lg:h-[461px] sm:h-[200px] h-[200px]"
                alt={`slide-${index}`}
              />
            </SwiperSlide>
          ))}
        </div> */}

        <div className="w-full flex justify-between items-center z-10 absolute lg:top-1/3 md:top-1/3 sm:top-1/3 xs:top-3/5 ">
          <div className="custom-swiper-button custom-swiper-button-prev cursor-pointer ">
            <img src="/icons/button-left.svg" alt="left button" className="w-[56px] h-[80px]" />
          </div>
          <div className="custom-swiper-button custom-swiper-button-next cursor-pointer ">
            <img src="/icons/button-right.svg" alt="right button" className="w-[56px] h-[80px]" />
          </div>
        </div>
      </Swiper>
    </div>
  );
}

export default Carousel;
