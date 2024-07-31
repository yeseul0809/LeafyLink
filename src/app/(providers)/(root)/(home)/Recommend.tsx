import { Product } from '@/types/product';
import Link from 'next/link';
import { getRecommendPlant, getSellerName } from './actions';
import Image from 'next/image';

const setRecommendPlant = (products: Product[]) => {
  // 0이 아닌 가장 먼저 나오는 데이터 ?
  const findData = products.find((data) => data.stock !== 0 && data.stock < 50);
  return findData;
};

async function Recommend() {
  const products = await getRecommendPlant();
  const myPrd = products as unknown; // type 임시방편
  const recommendProduct = myPrd as Product[]; // type 임시방편

  const recommendedData = setRecommendPlant(recommendProduct);
  const { user_name } = await getSellerName(recommendedData?.product_seller_id!);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  return (
    <section className="lg:w-[1240px] mx-auto mt-[140px] ">
      <h2 className="text-[32px] text-center mb-[34px]">이 달의 추천 식물</h2>
      <div className=" lg:grid lg:grid-cols-2 lg:gap-x-[20px] justify-items-center md:block sm:block">
        <div className="lg:w-[610px] lg:h-[342px] md:w-[500px] md:h-[300px] h-[206px] w-[335px] bg-zinc-300 rounded-2xl object-cover mx-auto">
          <Image
            className="object-cover lg:w-[610px] lg:h-[342px] rounded-2xl md:w-[500px] md:h-[300px] h-[206px] w-[335px]"
            src={recommendedData?.thumbnail_url!}
            width={610}
            height={342}
            alt="추천식물"
          />
        </div>
        <div className="pt-4 lg:w-[610px] md:w-[500px] w-[335px] mx-auto">
          <p className="mb-[5px] sm:text-xs">{user_name}</p>
          <h3 className="lg:text-[32px] mb-[10px] sm:text-[13px]">{recommendedData?.title}</h3>
          <h3 className="lg:text-[32px] font-semibold mb-[15px] sm:text-sm sm:mb-[8px]">
            {formatPrice(recommendedData?.price!)}원
          </h3>
          <p className="line-clamp-3 text-ellipsis overflow-hidden text-[#555555]">
            {recommendedData?.description}
          </p>
          <Link
            href={`products/${recommendedData?.product_id}`}
            className="hidden lg:block md:hidden sm:hidden"
          >
            <button className="w-[610px] h-[56px] mt-[32px] rounded-md bg-[#3BB873] text-white ">
              바로가기
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Recommend;
