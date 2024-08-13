import ProductForm from '../_components/ProductForm';

async function ProductRegisterPage() {
  return (
    <div className="mx-auto flex flex-col max-w-[1240px] w-full">
      <h1 className="text-[32px] font-semibold pt-[80px] pb-[24px] text-center">상품 등록</h1>
      <ProductForm />
    </div>
  );
}

export default ProductRegisterPage;
