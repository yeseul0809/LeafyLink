'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getVideos } from '../livestreaming/actions';
import LivestreamingCard from './_components/LivestreamingCard';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Virtual } from 'swiper/modules';

function LiveCommerceMobile({ category }: { category: string }) {
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
    <section className="w-full h-[400px] mx-auto mt-[70px] pb-[40px]">
      <div className="flex justify-between items-end text-center pt-[16px] mb-8">
        <div className="px-3 py-2 text-[13px] my-auto text-white">더보기 &gt;</div>
        <h2 className="text-center text-[20px] font-semibold ">라이브커머스</h2>
        <button
          className="border-[1px] px-3 py-2 text-[13px] my-auto"
          onClick={() => {
            redirect('/livestreaming');
          }}
        >
          더보기 &gt;
        </button>
      </div>
      <div className="모바일 라이브캐러셀 flex w-auto m-auto ">
        <Swiper
          modules={[Virtual, Autoplay]}
          spaceBetween={270}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false
          }}
          virtual
          loop={true}
          className="mySwiper"
        >
          {videosData?.map((video, index) => (
            <SwiperSlide
              key={video.streamData[0]?.livestream_id || `video-${index}`}
              virtualIndex={index}
            >
              <LivestreamingCard videosData={video} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default LiveCommerceMobile;
