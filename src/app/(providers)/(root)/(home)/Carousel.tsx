'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Carousel() {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src="/carousel(1).jpg"
            alt="carousel"
            width={1020}
            height={461}
            className="w-auto h-[461px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/carousel(2).jpg"
            alt="carousel"
            width={1020}
            height={461}
            className="w-auto h-[461px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/carousel(3).jpg"
            alt="carousel"
            width={1020}
            height={461}
            className="w-auto h-[461px]"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Carousel;
