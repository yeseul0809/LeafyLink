'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getVideos } from '../actions';

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
    return (
      <div className="w-full h-[200px] flex justify-center items-center">
        <Image src="/loading.gif" alt="로딩이미지" width={200} height={100} className="" />
      </div>
    );
  }

  if (recodedVideos && isFetched) {
    return (
      <div className="grid grid-cols-2 w-full gap-[20px] max_sm:grid-cols-1">
        {recodedVideos.map((video) => {
          const hasStreamData = video.streamData && video.streamData.length > 0;
          return (
            <div key={video.uid} className="w-full relative xs:mb-[32px]">
              {hasStreamData && (
                <>
                  <div className="relative w-full h-[342px] xs:h-[183px]">
                    <Link
                      href={`/livestreaming/video/${video.streamData[0].livestream_product_id}_${video.streamData[0].livestream_id}_${video.uid}`}
                    >
                      <Image
                        src={video.streamData[0].thumbnail_url}
                        alt="방송썸네일"
                        fill
                        className="rounded-2xl"
                      />
                    </Link>
                  </div>
                  <div className="flex justify-between mt-4 pr-6 xs:pr-0 xs:flex-col xs:mt-[16px] max_lg:flex max_lg:flex-col max_lg:gap-[4px]">
                    <div>
                      <h2 className="font-semibold">{video.streamData[0].stream_title}</h2>
                      <p className="text-[#555555]">{video.streamData[0].description}</p>
                    </div>
                    <Link
                      href={`/products/${video.streamData[0].livestream_product_id}`}
                      className="cursor-pointer"
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
