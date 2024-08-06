import React from 'react';
import { getStream, getSellerData, getStreamUid } from '../actions';
import { notFound } from 'next/navigation';
import { createClient } from '@/supabase/supabaseServer';
import Image from 'next/image';
import Link from 'next/link';
import LiveQuitButton from '../_components/LiveQuitButton';
import TruncatedText from '../_components/TruncatedText';

export default async function StreamingPage({ params }: { params: { id: string } }) {
  const supabaseServer = createClient();
  const streamId = params.id.split('_')[1];
  const stream = await getStream(streamId);

  const streamUid = await getStreamUid(streamId);

  if (!stream) {
    return notFound();
  }
  const sellerData = await getSellerData(stream.livestream_seller_id);
  const sessionData = await supabaseServer.auth.getUser();
  const sessionId = sessionData.data.user?.id;

  return (
    <div className="pt-[80px] pb-[180px] xs:pt-[12px] xs:pb-[188px]">
      <div className="flex items-center mb-[40px] gap-3 xs:mb-[12px]">
        <Image
          src={sellerData![0].avatar_url}
          alt="판매자프로필사진"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <span className="font-bold">{sellerData![0].user_name} </span>
          <span>님의 라이브 방송입니다.</span>
        </div>
      </div>
      <div className="relative aspect-video">
        <iframe
          src={`https://${process.env.CLOUDFLARE_DOMAIN}/${streamUid}/iframe`}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          className="w-full h-[698px] rounded-2xl xs:h-[188px]"
        ></iframe>
      </div>
      <div className="flex justify-between mt-[32px] xs:mt-[20px] xs:flex-col w-full">
        <div className="flex gap-[32px] justify-between items-start xs:mb-[16px]">
          <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[16px] items-center mb-[20px] xs:mb-[16px]">
              <div className="rounded-full bg-[#F9F3CF] px-[16px] py-[9px] text-[13px] h-[36px] text-center xs:py-[9px] xs:px-[8px] xs:w-[68px]">
                {stream.category}
              </div>
              <div>
                <p className="text-[20px] font-semibold xs:text-[16px]">{stream.stream_title}</p>
              </div>
            </div>
            <TruncatedText description={stream.description} />
          </div>
        </div>

        <Link href={`/products/${stream.livestream_product_id}`} className="cursor-pointer">
          <button className="bg-primary-green-500 text-white p-[16px] rounded-[6px] flex items-center gap-[4px] hover:bg-primary-green-700 transition-colors xs:w-full xs:justify-center">
            <div className="flex gap-[4px]">
              <p className="text-[16px] font-semibold ">구매하러 가기</p>
              <Image src="/icons/right-arrow.png" alt="rightarrow" width={20} height={20} />
            </div>
          </button>
        </Link>
      </div>

      {stream.livestream_seller_id === sessionId! ? (
        <div className="bg-yellow-200 text-black p-5 rounded-md mt-[12px] w-full flex flex-col gap-[8px]">
          <div className="flex flex-wrap gap-1">
            <span className="font-semibold">Stream URL: </span>
            <span>rtmps://live.cloudflare.com:443/live/</span>
          </div>
          <div className="flex flex-wrap gap-1">
            <span className="font-semibold">Secret Key: </span>
            <span className="break-all">{stream.stream_key}</span>
          </div>
          {/* <LiveQuitButton streamId={streamId} /> */}
        </div>
      ) : null}
    </div>
  );
}
