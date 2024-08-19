import Image from 'next/image';
import Link from 'next/link';

interface RecommendMobileProps {
  recommendProps1: {
    business_name: string;
    title: string;
    price: number;
    product_id: string;
    thumbnail_url: string;
  };
  recommendProps2: {
    business_name: string;
    title: string;
    price: number;
    product_id: string;
    thumbnail_url: string;
  };
}

export default function RecommendMobile({
  recommendProps1,
  recommendProps2
}: RecommendMobileProps) {
  const {
    business_name: business_name1,
    title: title1,
    price: price1,
    product_id: product_id1,
    thumbnail_url: thumbnail_url1
  } = recommendProps1;
  const {
    business_name: business_name2,
    title: title2,
    price: price2,
    product_id: product_id2,
    thumbnail_url: thumbnail_url2
  } = recommendProps2;
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };
  return (
    <>
      <h2 className="text-20-n-28-50 max_md:text-[20px] font-semibold text-center text-font/main mt-[70px] mb-[20px]">
        이 달의 추천 식물
      </h2>
      <div className="w-full h-[366px] relative px-[20px]">
        <div className="w-[335px] h-auto px-[36px] pt-12 pb-4 top-[158px] absolute bg-primary-green-50 rounded-[20px] flex flex-col justify-center items-end gap-4 z-0 ">
          <div className="self-stretch h-[86px] flex-col justify-start items-end gap-3 flex">
            <div className="self-stretch flex-col justify-start items-start gap-0.5 flex">
              <div className="self-stretch text-right text-[#111111] text-14-n-20-35">
                {business_name1}
              </div>
              <div className="self-stretch text-right text-[#111111] text-18-n-26-45">{title1}</div>
            </div>
            <div className="self-stretch text-right text-[#111111] text-18-sb-26-45">
              {formatPrice(price1)}원
            </div>
          </div>
          <Link
            href={`products/${product_id1}`}
            className="w-[104px] px-[12px] py-[9px] bg-primary-green-500 hover:bg-[#236C44] rounded justify-center items-center gap-2.5 flex"
          >
            <div className="text-center text-white text-13-n-18-325 ">바로가기</div>
          </Link>
        </div>
        <div className="w-full h-[188px] relative">
          <Image
            className="rounded-[20px] object-cover"
            src={thumbnail_url1}
            layout="fill"
            alt="추천식물"
          />
        </div>
      </div>
      <div className="w-full h-[366px] relative px-[20px]">
        <div className="w-[335px] h-auto px-[36px] pt-12 pb-4 top-[158px] absolute bg-primary-green-50 rounded-[20px] flex flex-col justify-center items-start gap-4 z-0 ">
          <div className="self-stretch h-[86px] flex-col justify-start items-start gap-3 flex">
            <div className="self-stretch flex-col justify-start items-start gap-0.5 flex">
              <div className="self-stretch text-left text-[#111111] text-14-n-20-35">
                {business_name2}
              </div>
              <div className="self-stretch text-left text-[#111111] text-18-n-26-45">{title2}</div>
            </div>
            <div className="self-stretch text-left text-[#111111] text-18-sb-26-45">
              {formatPrice(price2)}원
            </div>
          </div>
          <Link
            href={`products/${product_id2}`}
            className="w-[104px] px-[12px] py-[9px] bg-primary-green-500 hover:bg-[#236C44] rounded justify-center items-center gap-2.5 flex"
          >
            <div className="text-center text-white text-13-n-18-325 ">바로가기</div>
          </Link>
        </div>
        <div className="w-full h-[188px] relative">
          <Image
            className="rounded-[20px] object-cover"
            src={thumbnail_url2}
            layout="fill"
            alt="추천식물"
          />
        </div>
      </div>
    </>
  );
}
