import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type VideoData = {
  streamData: [
    {
      thumbnail_url: string;
      stream_title: string;
      description: string;
      livestream_id: string;
      livestream_product_id: string;
      uid: string;
    }
  ];
};

function LivestreamingCard({ videosData }: { videosData: VideoData }) {
  return (
    <div className="lg:w-[505px] w-[280px]">
      <div>
        <div>
          <Link
            href={`/livestreaming/video/${videosData.streamData[0].livestream_product_id}_${videosData.streamData[0].livestream_id}_${videosData.streamData[0].uid}`}
          >
            <Image
              alt="streaming image"
              width={280}
              height={158}
              src={videosData.streamData[0].thumbnail_url}
              className="w-full h-full bg-zinc-300 rounded-2xl cursor-pointer object-cover"
            ></Image>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div>
          <p className="lg:w-[295px] w-[164px] mt-[24px] text-sm font-semibold">
            {videosData.streamData[0].stream_title}
          </p>
          <p className="lg:w-[295px] w-[164px] line-clamp-1 text-sm text-[#555555] text-ellipsis overflow-hidden">
            {videosData.streamData[0].description}
          </p>
        </div>
        <Link
          href={`/livestreaming/${videosData.streamData[0].livestream_product_id}_${videosData.streamData[0].livestream_id}_${videosData.streamData[0].uid}`}
        >
          <button className="lg:w-[123px] lg:h-[44px] bg-[#3BB873] text-white px-6 py-3 rounded-lg text-sm">
            방송보러가기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LivestreamingCard;
