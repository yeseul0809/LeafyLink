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
    <div className="w-full h-[366px] relative ">
      <div className="w-full h-[202px] px-[20px] pt-12 pb-4 left-0 top-[164px] absolute bg-[#f7fcf9] rounded-[20px] flex flex-col justify-center items-end gap-4 z-0 ">
        <div className="self-stretch h-[86px] flex-col justify-start items-end gap-3 flex">
          <div className="self-stretch flex-col justify-start items-start gap-0.5 flex">
            <div className="self-stretch text-right text-[#111111] text-sm font-normal font-['Pretendard'] leading-tight">
              {business_name}
            </div>
            <div className="self-stretch text-right text-[#111111] text-lg font-normal font-['Pretendard'] leading-relaxed">
              {title}
            </div>
          </div>
          <div className="self-stretch text-right text-[#111111] text-lg font-semibold font-['Pretendard'] leading-relaxed">
            {formatPrice(price)}원
          </div>
        </div>
        <Link
          href={`products/${product_id}`}
          className="w-[104px] px-3 py-[9px] bg-[#3bb873] rounded justify-center items-center gap-2.5 flex"
        >
          <div className="text-center text-white text-[13px] font-normal leading-[18px]">
            바로가기
          </div>
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
  );
}
