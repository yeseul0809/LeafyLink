import { getProductRequest } from '@/app/(providers)/(root)/products/[id]/_actions/productActions';
import ProductEditForm from './_components/ProductEditForm';

interface ParamsProps {
  params: { id: string };
}

async function ProductEditPage({ params }: ParamsProps) {
  const { id: productId } = params;
  const product = await getProductRequest(productId);

  if (!product) {
    return <p>해당 상품이 없습니다.</p>;
  }

  return (
    <div className="mx-auto flex flex-col max-w-[1240px] w-full">
      <h1 className="text-[26px] md:text-[32px] font-semibold pt-[80px] pb-[24px] text-center">
        상품 수정
      </h1>
      <div className="lg:max-w-[1240px] md:max-w-[744px]">
        <ProductEditForm product={product} />
      </div>
    </div>
  );
}

export default ProductEditPage;
