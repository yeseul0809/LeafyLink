'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getVideos } from '../livestreaming/actions';
import LivestreamingCard from './_components/LivestreamingCard';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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

  const videosData = recodedVideos?.slice(0, 6);

  return (
    <section className="w-full h-[604px] mx-auto mt-[140px] pb-[48px]">
      <div className="flex justify-around items-end text-center lg:pt-[85px] pt-[16px] mb-8">
        <div className="px-3 py-2 text-[13px] my-auto text-white">더보기 &gt;</div>
        <h2 className="text-center text-[32px] lg:mb-[38px] font-semibold ">라이브커머스</h2>
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
            <SwiperSlide key={video.streamData[0].livestream_id}>
              <LivestreamingCard videosData={video} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default LiveCommerce;
