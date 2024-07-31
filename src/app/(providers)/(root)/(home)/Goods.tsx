import { Product } from '@/types/product';
import ProductCard from './_components/ProductCard';
import { getGoodsproducts } from './actions';

async function Goods() {
  const goodsProductsData = await getGoodsproducts();

  return (
    <section className="lg:w-[1240px] mx-auto lg:mt-[93px] mt-[55px] mb-[180px] ">
      <h2 className="text-[32px] text-center mb-[43px]">식집사 필수템</h2>
      <div className="grid grid-cols-1 gap-x-[20px] gap-y-[24px] justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {goodsProductsData.slice(0, 4).map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Goods;
