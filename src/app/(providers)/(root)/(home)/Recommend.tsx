import { Product } from '@/types/product';
import Link from 'next/link';
import { getRecommendPlant, getSellerName } from './actions';
import Image from 'next/image';
import RecommendMobile from './_components/RecommendMobile';

const setRecommendPlant = (products: Product[]) => {
  const findData = products.find(
    (data) => data.stock !== null && data.stock !== 0 && data.stock < 50
  );
  return findData;
};

async function Recommend() {
  const products = await getRecommendPlant();
  const myPrd = products as unknown; // type 임시방편
  const recommendProduct = myPrd as Product[]; // type 임시방편

  const recommendedData = setRecommendPlant(recommendProduct);
  // console.log('recommendedData::', recommendedData);

  const { business_name } = await getSellerName(recommendedData?.product_seller_id!);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };
  const recommendProps = {
    business_name,
    title: recommendedData?.title || '제목 없음', // 기본값 설정
    price: recommendedData?.price || 0, // 기본값 설정
    product_id: recommendedData?.product_id || '', // 기본값 설정
    thumbnail_url: recommendedData?.thumbnail_url || '/default-thumbnail.jpg' // 기본값 설정
  };

  return (
    <>
      <section className="w-full max-w-[1240px] mx-auto mt-[140px] hidden md:block">
        <h2 className="text-[32px] text-center mb-[34px]">이 달의 추천 식물</h2>
        <div className="flex bg-[#F7FDFA] rounded-2xl overflow-hidden h-[342px]">
          <div className="relative w-[50%] h-full">
            {' '}
            <Image
              className="rounded-[20px] object-cover"
              src={recommendedData?.thumbnail_url!}
              layout="fill"
              alt="추천식물"
            />
          </div>

          <div className="flex flex-col justify-center w-[50%] p-6 bg-[#f7fcf9] rounded-r-2xl">
            <p className="text-right text-[#111111] text-base font-normal leading-normal mb-2">
              {business_name}
            </p>
            <h3 className="text-right text-[#111111] text-[32px] font-normal leading-[42px] mb-2">
              {recommendedData?.title}
            </h3>
            <h3 className="text-right text-[#111111] text-[32px] font-semibold leading-[42px] mb-4">
              {formatPrice(recommendedData?.price!)}원
            </h3>
            <div className="flex justify-end">
              <Link href={`products/${recommendedData?.product_id}`}>
                <button className="w-[271px] h-[56px] rounded-md bg-[#3BB873] text-white">
                  바로가기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 추천식물 모바일 환경에서만 보이게 */}
      <div className="block md:hidden">
        <RecommendMobile recommendProps={recommendProps} />
      </div>
    </>
  );
}

export default Recommend;
