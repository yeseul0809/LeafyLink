import React from 'react';
import { getStream, getProductPrice } from '../actions';
import { notFound } from 'next/navigation';
import { createClient } from '@/supabase/supabaseServer';
import Image from 'next/image';
import Link from 'next/link';

export default async function StreamingPage({ params }: { params: { id: string } }) {
  const supabaseServer = createClient();
  const streamId = params.id.split('_')[1];
  const stream = await getStream(streamId);
  if (!stream) {
    return notFound();
  }
  const sessionData = await supabaseServer.auth.getUser();
  const sessionId = sessionData.data.user?.id;
  // console.log(sessionData.data.user?.user_metadata.full_name);
  // console.log(stream);
  const productPrice = await getProductPrice(stream.livestream_product_id);
  console.log(productPrice);

  return (
    <div className="p-10">
      <div className="flex items-center">
        <Image
          src={sessionData.data.user?.user_metadata.avatar_url}
          alt="판매자프로필사진"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <span className="font-bold">{`${sessionData.data.user?.user_metadata.full_name}`} </span>
          <span>님의 라이브 방송입니다.</span>
        </div>
      </div>
      <div className="relative aspect-video">
        <iframe
          src={`https://${process.env.CLOUDFLARE_DOMAIN}/${stream.video_uid}/iframe`}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          className="w-full h-full rounded-md"
        ></iframe>
      </div>
      <div className="p-5 flex items-center gap-3">
        <div>{stream.category}</div>
        <p>{stream.stream_title}</p>
        {productPrice && <p>{productPrice[0].price} 원</p>}
      </div>
      <div className="flex justify-between">
        <p>{stream.description}</p>
        <Link href={`/products/${stream.livestream_product_id}`} className="cursor-pointer">
          상품 구매하러 가기
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
        </div>
      ) : null}
    </div>
  );
}
