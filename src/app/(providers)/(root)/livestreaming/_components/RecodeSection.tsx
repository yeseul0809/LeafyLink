'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAllRecodeStramDB, getVideos } from '../actions';
import Link from 'next/link';
import Image from 'next/image';

export default function RecodeSection({ category }: { category: string }) {
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

  if (recodedVideos && isFetched) {
    return (
      <div>
        {recodedVideos.map((video) => {
          return (
            <div key={video.uid}>
              <Link
                href={`/livestreaming/video/${video.streamData[0].livestream_product_id}_${video.streamData[0].livestream_id}_${video.uid}`}
              >
                <Image
                  src={video.streamData[0].thumbnail_url}
                  alt="방송썸네일"
                  width={200}
                  height={150}
                />
                <div>
                  <h2>{video.streamData[0].stream_title}</h2>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
