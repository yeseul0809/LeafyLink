import Image from 'next/image';
import Link from 'next/link';

interface RecommendMobileProps {
  recommendProps: {
    business_name: string;
    title: string;
    price: number;
    product_id: string;
    thumbnail_url: string;
  };
}

export default function RecommendMobile({ recommendProps }: RecommendMobileProps) {
  const { business_name, title, price, product_id, thumbnail_url } = recommendProps;
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };
  return (
    <>
      <h2 className="text-20-n-28-50 text-center text-font/main mt-[70px] mb-[20px]">
        이 달의 추천 식물
      </h2>
      <div className="w-full h-[366px] relative px-[20px]">
        <div className="w-full h-[202px] px-[36px] pt-12 pb-4 left-0 top-[164px] absolute bg-primary-green-50 rounded-[20px] flex flex-col justify-center items-end gap-4 z-0 ">
          <div className="self-stretch h-[86px] flex-col justify-start items-end gap-3 flex">
            <div className="self-stretch flex-col justify-start items-start gap-0.5 flex">
              <div className="self-stretch text-right text-[#111111] text-14-n-20-35">
                {business_name}
              </div>
              <div className="self-stretch text-right text-[#111111] text-18-n-26-45">{title}</div>
            </div>
            <div className="self-stretch text-right text-[#111111] text-18-sb-26-45">
              {formatPrice(price)}원
            </div>
          </div>
          <Link
            href={`products/${product_id}`}
            className="w-[104px] px-[12px] py-[9px] bg-primary-green-500 rounded justify-center items-center gap-2.5 flex"
          >
            <div className="text-center text-white text-13-n-18-325 ">바로가기</div>
          </Link>
        </div>
        <div className="w-full h-[188px] relative">
          <Image
            className="rounded-[20px] object-cover"
            src={thumbnail_url}
            layout="fill" // Fill 레이아웃으로 변경
            alt="추천식물"
          />
        </div>
      </div>
    </>
  );
}
