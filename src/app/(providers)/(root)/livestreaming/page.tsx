import React from 'react';
import {
  addProductIdsToVideos,
  getAllLiveStreamDB,
  getAllRecodeStramDB,
  getLiveInput,
  getVideos
} from './actions';
import Link from 'next/link';
import Image from 'next/image';
import { Video } from '@/types/livestream';

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
    Pragma: 'no-cache',
    Expires: '0'
  }
};

async function LiveStreamingPage() {
  // const videos = (await getVideos()).result as Video[];
  const recodedVideos = (await getVideos()) as Video[];
  console.log('videos22::', recodedVideos[0].streamData[0]);

  // const inputdata = await getLiveInput(recodedVideos[0].liveInput);
  // console.log('inputdata:::', inputdata);

  // const videosWithProductIds = await addProductIdsToVideos(videos);
  // console.log(videosWithProductIds);
  const liveStreamDatas = await getAllLiveStreamDB();
  console.log('liveStreamDatas:', liveStreamDatas);

  // fetch(
  //   `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs`,
  //   options // 여기에서 메타데이터 끄집어올수있음
  // )
  //   .then((response) => response.json())
  //   // .then((response) => console.log(response.result[0].meta))
  //   .then((response) => console.log(response))
  //   .catch((err) => console.error(err));

  // fetch(
  //   // `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs/c51340789d6ec0668e198fe4ab7e9029/outputs`, // uid입력
  //   `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs/21719c624de096ce04a0d9fe4932d365/outputs`, // liveinput입력
  //   options
  // )
  //   .then((response) => response.json())
  //   .then((response) => console.log(response))
  //   .catch((err) => console.error(err));

  const recodeStreamDatas = await getAllRecodeStramDB();
  // // console.log('recodeStreamDatas::', recodeStreamDatas);

  return (
    <div className="flex flex-col">
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
      <p>------------------------------이전방송---------------------------------</p>
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

export default LiveStreamingPage;
