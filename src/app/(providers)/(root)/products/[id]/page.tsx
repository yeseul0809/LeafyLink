import ProductReviewList from './_components/ReviewList';
import TopSection from './_components/TopSection';
import ActiveTabWrapper from './_components/ActiveTabWrapper';
import { getProduct } from './_actions/productActions';
import BottomTab from './_components/BottomTab';
import TopButtons from './_components/TopButtons';

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
      <TopSection product={product} />
      <TopButtons productId={product.product_id} productPrice={product.price} />
      <BottomTab product={product} />
      <ActiveTabWrapper productDescription={product.description} reviewProductId={id} />
      <ProductReviewList reviewProductId={id} />
    </div>
  );
}

export default ProductDetailPage;
