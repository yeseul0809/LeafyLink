import { createClient } from '@/supabase/supabaseServer';
import { Product } from '@/types/product';
import Link from 'next/link';
import { getSellerName } from './actions';
import Image from 'next/image';

const setRecommendPlant = (products: Product[]) => {
  // 0이 아닌 가장 먼저 나오는 데이터 ?
  const findData = products.find((data) => data.stock !== 0 && data.stock < 50);
  return findData;
};

async function Recommend() {
  const supabase = createClient();
  const { data: products, error: productError } = await supabase
    .from('Product')
    .select('*')
    .or('category.eq.씨앗, category.eq.모종');

  if (productError) throw productError;

  // console.log('product', products);

  const myPrd = products as unknown; // type 임시방편
  const recommendProduct = myPrd as Product[]; // type 임시방편

  const recommendedData = setRecommendPlant(recommendProduct);
  //
  // 추천된 상품의 유저 정보를 불러오고 싶음 오 오 굿굿
  const { user_name } = await getSellerName(recommendedData?.product_seller_id!);
  // console.log('==================================', user_name);

  // 데이터 베이스에서 식물카테고리만 가져와서 재고 없는 순으로 근데 아예 없으면 안됨 그 중에 하나
  return (
    <section className="w-[1240px] mx-auto mt-[140px]">
      <h2 className="text-[32px] text-center mb-[34px]">이 달의 추천 식물</h2>
      <div className=" grid grid-cols-2 gap-x-[20px] justify-items-center">
        <div className="w-[610px] h-[342px] bg-zinc-300 rounded-2xl object-cover">
          <Image
            className="object-cover  h-[342px] rounded-2xl"
            src={recommendedData?.thumbnail_url!}
            width={610}
            height={342}
            alt="추천식물"
          />
        </div>
        <div>
          <p className="mb-[5px]">{user_name}</p>
          <h3 className="text-[32px] mb-[10px]">{recommendedData?.title}</h3>
          <h3 className="text-[32px] font-semibold mb-[15px]">{recommendedData?.price}원</h3>
          <p className="line-clamp-3 text-ellipsis overflow-hidden text-[#555555]">
            {recommendedData?.description}
          </p>
          <Link href={`products/${recommendedData?.product_id}`}>
            <button className="w-[610px] h-[56px] mt-[32px] rounded-md bg-[#3BB873] text-white">
              바로가기
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Recommend;
