'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import StreamSection from './_components/StreamSection';
import { createClient } from '@/supabase/supabaseClient';

export default function StreamListPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleClick = (buttonId: string) => {
    setActiveCategory(buttonId);
  };

  const checkSellerUser = async () => {
    const supabase = createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userData) {
      const { data: sellerData, error: sellerError } = await supabase
        .from('Seller')
        .select()
        .eq('seller_id', userData!.user!.id);
      if (sellerData && sellerData.length !== 0) {
        return true;
      }
    }
    return false;
  };

  const {
    data: sellerCheck,
    error,
    isFetched
  } = useQuery({
    queryKey: ['getSellerSessionCheck'],
    queryFn: checkSellerUser
  });

  if (!isFetched) {
    return (
      <div className="h-screen flex justify-center items-center z-1000">
        <Image src="/loading.gif" alt="로딩이미지" width={463} height={124} />
      </div>
    );
  }

  const categories = [
    { label: '전체보기', value: 'all' },
    { label: '씨앗', value: '씨앗' },
    { label: '모종', value: '모종' },
    { label: '재배키트', value: '재배키트' },
    { label: '흙/비료', value: '흙,비료' },
    { label: '원예용품', value: '원예용품' }
  ];

  return (
    <div className="pt-[80px] pb-[180px] xs:pt-[16px] xs:pb-[70px] px-[20px]">
      <h1 className="text-[32px] font-semibold text-center mb-[32px] xs:mb-[16px] xs:text-[20px]">
        라이브 커머스
      </h1>
      <div className="flex justify-between xs:flex-col xs:gap-[8px] max_sm:flex-col max_sm:gap-[6px]">
        <div className="hidden max_sm:block">
          <Swiper spaceBetween={8} slidesPerView={'auto'}>
            {categories.map((category) => (
              <SwiperSlide key={category.value} style={{ width: 'auto' }}>
                <button
                  className={`border px-[12px] py-[10px] rounded-md ${
                    activeCategory === category.value
                      ? 'bg-primary-green-500 text-white border-transparent'
                      : 'bg-none'
                  } text-[14px]`}
                  onClick={() => handleClick(category.value)}
                >
                  {category.label}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex gap-[12px] max_sm:hidden">
          {categories.map((category) => (
            <button
              key={category.value}
              className={`border px-[16px] py-[14px] xs:py-[4px] rounded-md ${
                activeCategory === category.value
                  ? 'bg-primary-green-500 text-white border-transparent'
                  : 'bg-none'
              } text-[14px]`}
              onClick={() => handleClick(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
        {sellerCheck && (
          <Link href={'/livestreaming/register'} className="xs:hidden">
            <button className="flex items-center text-[13px] text-primary-green-500 border border-primary-green-500 rounded px-[12px] py-[9px]">
              <Image src="/icons/start-stream.png" alt="startStream-icon" width={16} height={16} />
              방송시작
            </button>
          </Link>
        )}
      </div>
      <div className="mt-[80px] flex flex-col gap-[20px] xs:mt-[24px] max_sm:mt-[32px]">
        <StreamSection category={activeCategory} />
      </div>
    </div>
  );
}
