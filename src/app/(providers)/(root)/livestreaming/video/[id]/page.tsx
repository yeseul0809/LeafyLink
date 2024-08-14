import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createClient } from '@/supabase/supabaseServer';
import { getSellerData, getStream } from '../../actions';
import LiveQuitButton from '../../_components/LiveQuitButton';
import TruncatedText from '../../_components/TruncatedText';

export default async function RecodedVideoPage({ params }: { params: { id: string } }) {
  const supabaseServer = createClient();
  // const productId = params.id.split('_')[0];
  const streamId = params.id.split('_')[1];
  const videoId = params.id.split('_')[2];
  const stream = await getStream(streamId);

  if (!stream) {
    return notFound();
  }
  const sellerData = await getSellerData(stream.livestream_seller_id);
  const sessionData = await supabaseServer.auth.getUser();
  const sessionId = sessionData.data.user?.id;

  return (
    <div className="pt-[80px] pb-[180px] max_sm:pt-[24px] max_sm:pb-[188px] px-[20px]">
      <div className="flex items-center mb-[40px] gap-3 xs_max:mb-[12px]">
        <Image
          src={sellerData![0].avatar_url}
          alt="판매자프로필사진"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <span className="font-bold">{`${sellerData![0].user_name}`} </span>
          <span>님의 {stream.is_live ? '라이브' : '녹화'}방송입니다.</span>
        </div>
      </div>
      <div className="relative aspect-video">
        <iframe
          src={`https://${process.env.CLOUDFLARE_DOMAIN}/${videoId}/iframe`}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          className="w-full rounded-2xl lg:h-[698px] md:h-[480px] sm:h-[380px] xs_max:h-[188px]"
        ></iframe>
      </div>
      <div className="flex justify-between mt-[32px] max_sm:mt-[20px] max_sm:flex-col w-full items-start max_lg:flex-col">
        <div className="flex gap-[32px] justify-between items-start xs_max:mb-[24px] w-[88%] xs_max:w-full">
          <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[16px] items-center mb-[20px] xs_max:mb-[16px]">
              <div className="rounded-full bg-[#F9F3CF] px-[16px] py-[9px] text-[13px] h-[36px] text-center xs:py-[9px] xs:px-[8px] xs:w-[68px]">
                {stream.category}
              </div>
              <div>
                <p className="text-[20px] font-semibold xs:text-[16px]">{stream.stream_title}</p>
              </div>
            </div>
            <TruncatedText
              description={stream.description}
              lines={'2'}
              textSize={'14'}
              fontBold={false}
            />
          </div>
        </div>
        <Link
          href={`/products/${stream.livestream_product_id}`}
          className="cursor-pointer w-[12%] xs:w-full max_lg:w-full"
        >
          <button className="bg-primary-green-500 text-white p-[16px] rounded-[6px] flex items-center gap-[4px] hover:bg-primary-green-700 transition-colors xs_max:w-full">
            <div className="flex gap-[4px] w-full justify-center">
              <p className="text-[16px] font-semibold ">구매하러 가기</p>
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
