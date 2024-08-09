import { createPostponedAbortSignal } from 'next/dist/server/app-render/dynamic-rendering';
import ProductCard from './_components/ProductCard';
import { getProducts } from './actions';
import { getAllProduct } from '@/apis/product/products';

async function NewProduct() {
  const newProductsData = await getProducts();
  const sortedProducts = newProductsData.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-6">신제품</h2>
      <div className="grid  grid-cols-2 md:grid-cols-4 gap-4">
        {sortedProducts.slice(0, 8).map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default NewProduct;
