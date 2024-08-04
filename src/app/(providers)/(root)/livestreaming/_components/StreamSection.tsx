'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAllRecodeStramDB, getVideos } from '../actions';
import Link from 'next/link';
import Image from 'next/image';

export default function StreamSection({ category }: { category: string }) {
  const {
    data: recodedVideos,
    error,
    isFetched
  } = useQuery({
    queryKey: ['getRecodeStreamList', category],
    queryFn: () => getVideos(category!)
  });

  if (!isFetched) {
    return <p>로딩중</p>;
  }
  console.log(recodedVideos);
  if (recodedVideos && isFetched) {
    return (
      <div className="grid grid-cols-2 w-full gap-[20px] xs:grid-cols-1">
        {recodedVideos.map((video) => {
          const hasStreamData = video.streamData && video.streamData.length > 0;
          return (
            <div key={video.uid} className="w-full relative">
              {hasStreamData && (
                <>
                  <div className="relative w-full h-[342px] xs:h-[183px]">
                    <Image
                      src={video.streamData[0].thumbnail_url}
                      alt="방송썸네일"
                      fill
                      className="rounded-2xl"
                    />
                  </div>
                  <div className="flex justify-between mt-4 pr-6 xs:pr-0 xs:flex-col xs:mt-[16px]">
                    <div>
                      <h2 className="font-semibold">{video.streamData[0].stream_title}</h2>
                      <p className="text-[#555555]">{video.streamData[0].description}</p>
                    </div>
                    <Link
                      href={`/livestreaming/video/${video.streamData[0].livestream_product_id}_${video.streamData[0].livestream_id}_${video.uid}`}
                    >
                      <button className="bg-[#3BB873] text-white px-6 py-3 rounded-lg xs:mt-[16px] xs:w-full">
                        구매하러가기
                      </button>
                    </Link>
                  </div>
                  {video.readyToStream === true ? (
                    <Image
                      src="/icons/recode-stream.png"
                      alt="recodeIcon"
                      width={50}
                      height={26}
                      quality={100}
                      className="absolute top-4 left-4"
                    />
                  ) : (
                    <Image
                      src="/icons/on-live.png"
                      alt="라이브"
                      width={50}
                      height={26}
                      quality={100}
                      className="absolute top-4 left-4"
                    />
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
