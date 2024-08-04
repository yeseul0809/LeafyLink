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

function LiveCommerce({ category }: { category: string }) {
  // 지금 진행중인 생방송 있으면 > 생방송 먼저 띄워주기
  // 지금 진행중인 생방송 없으면 > 이전 방송 띄워주기
  // 갯수는 4개

  // 페이지 네비게이션
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

  if (!isFetched) {
    return <p>로딩중</p>;
  }

  // 4개 자르기
  const videosData = recodedVideos?.slice(0, 4);
  // console.log(videosData[0]);

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
      <div className="flex">
        {videosData?.map((video) => <LivestreamingCard videosData={video} />)}
        {/* <Swiper
          slidesPerView={3}
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
          {videosData?.map((video) => <LivestreamingCard key={video.uid} />)}

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
        </Swiper> */}
      </div>
    </section>
  );
  // }
}

export default LiveCommerce;
