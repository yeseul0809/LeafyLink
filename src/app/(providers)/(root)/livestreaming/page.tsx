import React from 'react';
import { addProductIdsToVideos, getAllLiveStreamDB, getVideos } from './actions';
import Link from 'next/link';
import Image from 'next/image';
import { Video } from '@/types/livestream';

async function LiveStreamingPage() {
  // const videos = (await getVideos()).result as Video[];
  // const videosWithProductIds = await addProductIdsToVideos(videos);
  // console.log(videosWithProductIds);
  // console.log(videos);
  const streamDatas = await getAllLiveStreamDB();
  console.log(streamDatas);

  return (
    <div className="grid grid-cols-2">
      {streamDatas.map((data) => {
        return (
          <div key={data.livestream_id}>
            <Link href={`/livestreaming/${data.livestream_product_id}_${data.stream_id}`}>
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

export default LiveStreamingPage;
