import ProductReviewList from './_components/ReviewList';
import TopSection from './_components/TopSection';
import ActiveTabWrapper from './_components/ActiveTabWrapper';
import { getProduct } from './_actions/productActions';
import Image from 'next/image';
import ButtonsWrapper from './_components/ButtonsWrapper';

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
      <section className="flex flex-col md:flex-row my-8 gap-12">
        <div className="md:w-1/2 flex justify-center mb-4 md:mb-0">
          <Image
            src={product.thumbnail_url}
            alt={product.title}
            width={640}
            height={640}
            className="rounded-lg"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <TopSection product={product} />
          <ButtonsWrapper
            productId={product.product_id}
            productPrice={product.price}
            productTitle={product.title}
          />
        </div>
      </section>
      <ActiveTabWrapper productDescription={product.description} reviewProductId={id} />
      <ProductReviewList reviewProductId={id} />
    </div>
  );
}

export default ProductDetailPage;
