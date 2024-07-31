import ProductCard from './_components/ProductCard';
import { createClient } from '@/supabase/supabaseServer';
import { getOrderData } from '../payment/actions';
import { getBestSellerProducts, getOrderInfo } from './actions';

// 1. Supabase 클라이언트를 설정하고 데이터 가져오기
// 2. 데이터를 가져와 주문 수를 계산하고 상위 4개 상품을 선택
// 3. Next.js 컴포넌트에서 데이터 표시하기

async function BestSeller() {
  // 저중에 가장 많이 팔린 productId를 4개를 추리기.
  // 추린 4개의 id로 product 데이터 불러오기.
  // product 데이터 뿌리기.

  // order 상품들 불러오기
  const orderinfoData = await getOrderInfo(); // 이 안에 productId가 있을거에요
  const orderData = orderinfoData.slice(0, 4);
  const BestSellerProductsData = await getBestSellerProducts(orderData);
  // console.log('========BestSellerProductsData=======', BestSellerProductsData);

  return (
    <section className="w-[1240px] mx-auto mt-[140px] mb-[180px]">
      <h2 className="text-[32px] text-center mb-[34px]">베스트 셀러</h2>
      <div className=" grid grid-cols-4 gap-x-[20px] gap-y-[24px] justify-items-center">
        {BestSellerProductsData.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default BestSeller;
