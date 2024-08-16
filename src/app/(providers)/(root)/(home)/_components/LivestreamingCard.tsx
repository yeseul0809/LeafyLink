import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type VideoData = {
  uid: string;
  streamData: [
    {
      thumbnail_url: string;
      stream_title: string;
      description: string;
      livestream_id: string;
      livestream_product_id: string;
      video_uid: string;
    }
  ];
};

function LivestreamingCard({ videosData }: { videosData: VideoData }) {
  return (
    <div className="lg:w-[505px] xs_max:w-[280px] xs_max:h-[266px] ">
      <div>
        <div>
          <Link
            href={`/livestreaming/video/${videosData.streamData[0].livestream_product_id}_${videosData.streamData[0].livestream_id}_${videosData.uid}`}
          >
            <Image
              alt="streaming image"
              width={280}
              height={158}
              src={videosData.streamData[0].thumbnail_url}
              className="w-full max_lg:h-[284px] max_md:h-[158px] rounded-2xl cursor-pointer object-cover"
            ></Image>
          </Link>
        </div>
      </div>
      <div className="lg:flex sm:block items-center justify-center">
        <div>
          <p className="lg:w-[295px] w-[164px] lg:mt-[24px] max_md:mt-4 text-sm font-semibold">
            {videosData.streamData[0].stream_title}
          </p>
          <p className="lg:w-[295px] w-[164px] line-clamp-1 text-sm text-[#555555] text-ellipsis overflow-hidden">
            {videosData.streamData[0].description}
          </p>
        </div>
        {/* <Link
          href={`/livestreaming/${videosData.streamData[0].livestream_product_id}_${videosData.streamData[0].livestream_id}_${videosData.streamData[0].uid}`}
        > */}
        <Link
          href={`/livestreaming/video/${videosData.streamData[0].livestream_product_id}_${videosData.streamData[0].livestream_id}_${videosData.uid}`}
        >
          <button className="lg:w-[123px] w-full max_md:mt-2 max_md:py-2 bg-[#3BB873] text-white px-6 py-3 rounded-lg text-sm">
            방송보러가기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LivestreamingCard;
