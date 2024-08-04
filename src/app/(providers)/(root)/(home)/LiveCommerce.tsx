'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import StreamSection from '../livestreaming/_components/StreamSection';
import { useQuery } from '@tanstack/react-query';
import { getAllLiveStreamDB, getVideos } from '../livestreaming/actions';
import LivestreamingCard from './_components/LivestreamingCard';
import Image from 'next/image';

function LiveCommerce({ category }: { category: string }) {
  const router = useRouter();
  const redirect = (e: string) => {
    router.push(`${e}`);
  };

  const {
    data: recodedVideos,
    error,
    isFetched
  } = useQuery({
    queryKey: ['getRecodeStreamList2', category],
    queryFn: () => getVideos(category!)
  });

  // if (!isFetched) {
  //   return <Image src="/loading.gif" alt="로딩이미지" width={200} height={100} className="" />;
  // }

  const videosData = recodedVideos?.slice(0, 6);

  return (
    <section className="w-full h-[604px] bg-[#F7FDFA] mx-auto lg:mt-[145px] lg:pb-[145px] mt-[48px] pb-[48px]">
      <div className="flex justify-around items-end text-center lg:pt-[85px] pt-[16px] mb-8">
        <div></div>
        <h2 className="text-center text-[32px] lg:mb-[38px]">라이브커머스</h2>
        <button
          className=" border-[1px] px-3 py-2 text-[13px] my-auto"
          onClick={() => {
            redirect('/livestreaming');
          }}
        >
          더보기 &gt;
        </button>
      </div>
      <div className="flex w-[1240px] m-auto overflow-hidden">
        <Swiper slidesPerView={2.5} spaceBetween={80} className="mySwiper">
          {videosData?.map((video) => (
            <SwiperSlide>
              <LivestreamingCard videosData={video} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
  // }
}

export default LiveCommerce;
