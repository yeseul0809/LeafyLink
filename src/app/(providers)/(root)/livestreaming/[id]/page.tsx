import React from 'react';
import { getStream, getSellerData } from '../actions';
import { notFound } from 'next/navigation';
import { createClient } from '@/supabase/supabaseServer';
import Image from 'next/image';
import Link from 'next/link';
import LiveQuitButton from '../_components/LiveQuitButton';

export default async function StreamingPage({ params }: { params: { id: string } }) {
  const supabaseServer = createClient();
  const streamId = params.id.split('_')[1];
  const stream = await getStream(streamId);

  if (!stream) {
    return notFound();
  }
  const sellerData = await getSellerData(stream.livestream_seller_id);
  const sessionData = await supabaseServer.auth.getUser();
  const sessionId = sessionData.data.user?.id;

  return (
    <div className="pt-[80px] pb-[180px]">
      <div className="flex items-center my-6 gap-3">
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
          src={`https://${process.env.CLOUDFLARE_DOMAIN}/${streamId}/iframe`}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          className="w-full h-full rounded-2xl"
        ></iframe>
      </div>
      <div className="flex items-center gap-3 justify-between mt-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-[#F9F3CF] px-4 py-1">{stream.category}</div>
            <p className="text-[20px] font-semibold">{stream.stream_title}</p>
          </div>
          <p>{stream.description}</p>
        </div>
        <Link href={`/products/${stream.livestream_product_id}`} className="cursor-pointer">
          <button>구매하러 가기</button>
        </Link>
      </div>

      {stream.livestream_seller_id === sessionId! ? (
        <div className="bg-yellow-200 text-black p-5 rounded-md">
          <div className="flex gap-2">
            <span className="font-semibold">Stream URL:</span>
            <span>rtmps://live.cloudflare.com:443/live/</span>
          </div>
          <div className="flex flex-wrap">
            <span className="font-semibold">Secret Key:</span>
            <span>{stream.stream_key}</span>
          </div>
          <LiveQuitButton streamId={streamId} />
        </div>
      ) : null}
    </div>
  );
}
