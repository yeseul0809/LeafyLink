'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const images = [
  'https://via.placeholder.com/1020x461',
  'https://via.placeholder.com/1020x461',
  'https://via.placeholder.com/1020x461',
  'https://via.placeholder.com/1020x461'
];

function Carousel() {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
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
          <div className="custom-swiper-button custom-swiper-button-next px-10">
            <img
              src="/icons/button-left.svg"
              alt="left button"
              className="max-w-[72px] max-h-[72px]"
            />
          </div>
          <div className="custom-swiper-button custom-swiper-button-prev px-10">
            <img
              src="/icons/button-right.svg"
              alt="right button"
              className="max-w-[72px] max-h-[72px]"
            />
          </div>
        </div>
      </Swiper>
      {/* <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-7/12 h-[461px] bg-zinc-300"
      >
        <div>
          <SwiperSlide className="w-[1020px] h-[461px]">
            <img src="/carousel(1).jpg" alt="carousel" className="w-full object-cover h-[461px]" />
          </SwiperSlide>
          <SwiperSlide className="w-[1020px] h-auto">
            <img src="/carousel(2).jpg" alt="carousel" className="w-full object-cover h-[461px]" />
          </SwiperSlide>
          <SwiperSlide className="w-[1020px] h-auto">
            <img src="/carousel(3).jpg" alt="carousel" className="w-full object-cover h-[461px]" />
          </SwiperSlide>
        </div>

      </Swiper> */}
    </div>
  );
}

export default Carousel;
