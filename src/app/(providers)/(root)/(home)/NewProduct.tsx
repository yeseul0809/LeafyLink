import ProductCard from './_components/ProductCard';
import { getProducts } from './actions';

async function NewProduct() {
  const newProductsData = await getProducts();
  const sortedProducts = newProductsData.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <section className="px-[20px]">
      <h2 className="text-32-n-42-80 max_md:text-[20px] font-semibold mb-6 text-center mt-[60px] mb-[20px] md:mt-[140px] ">
        신제품
      </h2>
      <div className="grid  grid-cols-2 md:grid-cols-4 gap-x-px-7 gap-y-px-20 md:gap-px-20">
        {sortedProducts.slice(0, 8).map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default NewProduct;
