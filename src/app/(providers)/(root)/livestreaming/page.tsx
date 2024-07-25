import React from 'react';
import { getVideos } from './actions';
import Link from 'next/link';
import Image from 'next/image';

async function LiveStreamingPage() {
  const videos = (await getVideos()).result;
  return (
    <div className="grid grid-cols-2">
      {videos.map((video: any) => {
        return (
          <div key={video.uid} className="w-52 h-40 mt-5 relative">
            <Link href={`livestreaming/${video.uid}`}>
              <Image
                src={video.thumbnail}
                alt="방송썸네일"
                // width={200}
                // height={150}
                fill
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default LiveStreamingPage;
