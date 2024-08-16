import { Product } from '@/types/product';
import ProductCard from './_components/ProductCard';
import { getGoodsproducts } from './actions';

async function Goods() {
  const goodsProductsData = await getGoodsproducts();

  return (
    <section className="px-[20px]" id="goods">
      <h2 className="text-32-n-42-80 max_md:text-[20px] font-semibold mb-6 text-center mt-[60px] pb-[20px] md:pt-[140px]">
        식집사 필수템
      </h2>
      <div className="grid  grid-cols-2 md:grid-cols-4 gap-px-7 gap-px-20 md:gap-px-20">
        {goodsProductsData.slice(0, 4).map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Goods;
