import { createPostponedAbortSignal } from 'next/dist/server/app-render/dynamic-rendering';
import ProductCard from './_components/ProductCard';
import { getProducts } from './actions';

async function NewProduct() {
  const newProductsData = await getProducts();
  const sortedProducts = newProductsData.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <section className="lg:w-[1240px] mx-auto lg:mt-[93px] mt-[55px]">
      <h2 className="text-[32px] text-center mb-[43px]">신제품</h2>
      <div className=" grid grid-cols-1 gap-x-[20px] gap-y-[24px] justify-items-center sm:grid-cols-2 lg:grid-cols-4">
        {sortedProducts.slice(0, 8).map((product) => (
          <div key={product.product_id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewProduct;
