import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
  console.log(videosData);
  return (
    <div className="w-[505px]">
      <div>
        <div>
          <Link
            href={`/livestreaming/video/${videosData.streamData[0].livestream_product_id}_${videosData.streamData[0].livestream_id}_${videosData.streamData[0].uid}`}
          >
            <img
              src={videosData.streamData[0].thumbnail_url}
              className="w-full h-[284px] bg-zinc-300 rounded-2xl cursor-pointer"
            ></img>
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
          href={`/livestreaming/${videosData.livestream_product_id}_${videosData.livestream_id}_${videosData.uid}`}
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