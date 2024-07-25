import ProductReviewList from './_components/ReviewList';
import TopSection from './_components/TopSection';
import ActiveTabWrapper from './_components/ActiveTabWrapper';
import { createClient } from '@/supabase/supabaseServer';

interface ParamsProps {
  params: { id: string };
}

async function ProductDetailPage({ params }: ParamsProps) {
  const { id } = params;
  const supabaseServer = createClient();
  const { data: product, error } = await supabaseServer
    .from('Product')
    .select('*')
    .eq('product_id', id)
    .single();

  if (error || !product) {
    return <p>해당 상품이 없습니다.</p>;
  }

  console.log(product);

  return (
    <div className="container mx-auto max-w-screen-lg p-4">
      <TopSection product={product} />
      <ActiveTabWrapper productDescription={product.description} reviewProductId={id} />
      <ProductReviewList reviewProductId={id} />
    </div>
  );
}

export default ProductDetailPage;
