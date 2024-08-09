'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const images = ['/carousel(1).jpg', '/carousel(2).jpg', '/carousel(3).jpg'];

function Carousel() {
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
        className="mySwiper w-full h-[461px] "
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center relative">
            <img
              src={src}
              className="object-cover w-full  lg:h-[461px] sm:h-[200px] h-[200px]"
              alt={`slide-${index}`}
            />
          </SwiperSlide>
        ))}
        <div className="w-full flex justify-between items-center z-10 absolute top-1/2">
          <div className="custom-swiper-button custom-swiper-button-prev lg:px-10 px-[20px]">
            <img src="/icons/button-left.svg" alt="left button" className="lg:h-[72px] h-[40px]" />
          </div>
          <div className="custom-swiper-button custom-swiper-button-next lg:px-10 px-[20px]">
            <img
              src="/icons/button-right.svg"
              alt="right button"
              className="w-full lg:h-[72px] h-[40px]"
            />
          </div>
        </div>
      </Swiper>
    </div>
  );
}

export default Carousel;
