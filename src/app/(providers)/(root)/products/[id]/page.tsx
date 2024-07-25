import ProductReviewList from './_components/ReviewList';
import TopSection from './_components/TopSection';
import ActiveTabWrapper from './_components/ActiveTabWrapper';
import { getProduct } from './_actions/productActions';
import BottomTab from './_components/BottomTab';
import TopButtons from './_components/TopButtons';
import Image from 'next/image';

interface ParamsProps {
  params: { id: string };
}

async function ProductDetailPage({ params }: ParamsProps) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) {
    return <p>해당 상품이 없습니다.</p>;
  }

  return (
    <div className="container mx-auto max-w-screen-lg p-4">
      <section className="flex flex-col md:flex-row my-8">
        <div className="md:w-1/2 flex justify-center mb-4 md:mb-0">
          <Image
            src={product.thumbnail_url}
            alt={product.title}
            width={320}
            height={320}
            className="rounded-lg"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-between">
          <TopSection product={product} />
          <TopButtons productId={product.product_id} productPrice={product.price} />
        </div>
      </section>
      <BottomTab product={product} />
      <ActiveTabWrapper productDescription={product.description} reviewProductId={id} />
      <ProductReviewList reviewProductId={id} />
    </div>
  );
}

export default ProductDetailPage;
