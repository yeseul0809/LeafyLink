'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const images = ['/carousel(1).jpg', '/carousel(2).jpg', '/carousel(3).jpg'];

function Carousel() {
  return (
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
        className="mySwiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center relative">
            <img src={src} className="object-cover w-full h-[461px]" alt={`slide-${index}`} />
          </SwiperSlide>
        ))}
        <div className="w-full flex justify-between items-center z-10 absolute top-1/2">
          <div className="custom-swiper-button custom-swiper-button-prev px-10">
            <img
              src="/icons/button-left.svg"
              alt="left button"
              className="max-w-[72px] max-h-[72px]"
            />
          </div>
          <div className="custom-swiper-button custom-swiper-button-next px-10">
            <img
              src="/icons/button-right.svg"
              alt="right button"
              className="max-w-[72px] max-h-[72px]"
            />
          </div>
        </div>
      </Swiper>
    </div>
  );
}

export default Carousel;
