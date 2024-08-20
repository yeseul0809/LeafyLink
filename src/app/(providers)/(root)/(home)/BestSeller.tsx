import ProductCard from './_components/ProductCard';
import { getBestSellerProducts, getOrderInfo } from './actions';

async function BestSeller() {
  const orderinfoData = await getOrderInfo();
  const orderData = orderinfoData.slice(0, 5);
  const BestSellerProductsData = await getBestSellerProducts(orderData);

  return (
    <section className="px-[20px]" id="bestSeller">
      <h2 className="text-32-n-42-80 max_md:text-[20px] font-semibold mb-6 text-center pt-[60px] mb-[20px] md:pt-[140px]">
        베스트 셀러
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-px-7 gap-px-20 md:gap-px-20">
        {BestSellerProductsData.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default BestSeller;
