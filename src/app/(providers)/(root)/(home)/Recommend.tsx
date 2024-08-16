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
      <section className="w-full max-w-[1240px] mx-auto mt-[140px] hidden md:block px-[20px]">
        <h2 className="text-32-n-42-80 text-center mb-[32px] font-semibold">이 달의 추천 식물</h2>
        <div className="flex bg-primary-green-50 rounded-2xl overflow-hidden h-[342px]">
          <div className="relative w-[50%] h-full">
            {' '}
            <Image
              className="rounded-[20px] object-cover"
              src={recommendedData?.thumbnail_url!}
              layout="fill"
              alt="추천식물"
            />
          </div>

          <div className="flex flex-col justify-center w-[50%] pt-[24px] pr-[24px] pb-[16px] bg-primary-green-50 rounded-r-2xl">
            <p className="text-right text-font/main text-16-n-24-40 ">{business_name}</p>
            <h3 className="text-right text-font/main text-32-n-42-80 mb-[12px]">
              {recommendedData?.title}
            </h3>
            <h3 className="text-right text-font/main text-32-sb-42-80 mb-[32px]">
              {formatPrice(recommendedData?.price!)}원
            </h3>
            <div className="flex justify-end">
              <Link href={`products/${recommendedData?.product_id}`}>
                <button className="w-[271px] h-[56px] rounded-md bg-primary-green-500 ">
                  <label className="text-16-sb-24-40 text-white">바로가기</label>
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
