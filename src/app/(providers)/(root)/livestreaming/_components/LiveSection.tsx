'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAllLiveStreamDB } from '../actions';
import Link from 'next/link';
import Image from 'next/image';

export default function LiveSection({ category }: { category: string }) {
  const {
    data: liveStreamDatas,
    error,
    isFetched
  } = useQuery({
    queryKey: ['getLiveStreamList', category],
    queryFn: () => getAllLiveStreamDB(category!)
  });

  if (!isFetched) {
    return <p>로딩중</p>;
  }

  if (liveStreamDatas && isFetched) {
    return (
      <div>
        {liveStreamDatas.map((data) => {
          return (
            <div key={data.livestream_id}>
              <Link href={`/livestreaming/${data.livestream_product_id}_${data.livestream_id}`}>
                <Image src={data.thumbnail_url} alt="방송썸네일" width={200} height={150} />
                <div>
                  <h2>{data.stream_title}</h2>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
